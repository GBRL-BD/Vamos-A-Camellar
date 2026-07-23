-- EMPRENDE: SEGURIDAD REAL DE ROLES EN SUPABASE
-- Ejecuta este archivo en Supabase > SQL Editor.
-- Está diseñado para proteger el rango en el servidor, no en el navegador.

begin;

-- 1. Roles permitidos
create table if not exists public.app_roles (
  role text primary key,
  display_name text not null,
  description text not null default ''
);

insert into public.app_roles(role, display_name, description) values
('user','Usuario','Puede completar rutas, misiones y enviar reportes.'),
('distributor','Distribuidor','Puede trabajar con oportunidades aprobadas.'),
('verifier','Verificador','Puede revisar evidencias e incidencias.'),
('moderator','Moderador','Puede revisar reportes y moderar dentro de su alcance.'),
('admin','Administrador','Puede gestionar usuarios, roles y configuración.')
on conflict (role) do update set
  display_name=excluded.display_name,
  description=excluded.description;

-- 2. Asegurar columnas necesarias en profiles
alter table public.profiles
  add column if not exists public_id text;

alter table public.profiles
  add column if not exists role text default 'user';

-- 3. Normalizar valores antiguos antes de crear la restricción
update public.profiles
set role='user'
where role is null
   or role not in ('user','distributor','verifier','moderator','admin');

alter table public.profiles
  alter column role set default 'user';

-- La restricción se crea solo si no existe
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname='profiles_role_check'
      and conrelid='public.profiles'::regclass
  ) then
    alter table public.profiles
      add constraint profiles_role_check
      check (role in ('user','distributor','verifier','moderator','admin'));
  end if;
end $$;

create unique index if not exists profiles_public_id_unique
on public.profiles(public_id)
where public_id is not null;

-- 4. RLS: el usuario solo puede ver su perfil.
-- Los administradores pueden ver todos.
alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin"
on public.profiles
for select
to authenticated
using (
  id = auth.uid()
  or exists (
    select 1 from public.profiles admin_profile
    where admin_profile.id = auth.uid()
      and admin_profile.role = 'admin'
  )
);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles
for insert
to authenticated
with check (
  id = auth.uid()
  and coalesce(role,'user') = 'user'
);

drop policy if exists "profiles_update_own_or_admin" on public.profiles;
create policy "profiles_update_own_or_admin"
on public.profiles
for update
to authenticated
using (
  id = auth.uid()
  or exists (
    select 1 from public.profiles admin_profile
    where admin_profile.id = auth.uid()
      and admin_profile.role = 'admin'
  )
)
with check (
  id = auth.uid()
  or exists (
    select 1 from public.profiles admin_profile
    where admin_profile.id = auth.uid()
      and admin_profile.role = 'admin'
  )
);

-- 5. Bloquear cambios directos de role/public_id desde el navegador.
-- Solo un administrador puede cambiar el role.
create or replace function public.protect_profile_identity()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  caller_is_admin boolean;
begin
  select exists(
    select 1 from public.profiles
    where id = auth.uid()
      and role = 'admin'
  ) into caller_is_admin;

  if not caller_is_admin then
    if tg_op = 'UPDATE' and new.role is distinct from old.role then
      raise exception 'Solo un administrador puede cambiar roles';
    end if;

    if tg_op = 'UPDATE'
       and old.public_id is not null
       and new.public_id is distinct from old.public_id then
      raise exception 'El ID público no puede ser cambiado';
    end if;

    if tg_op = 'INSERT' and coalesce(new.role,'user') <> 'user' then
      raise exception 'Un nuevo usuario siempre comienza como Usuario';
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists protect_profile_identity_trigger on public.profiles;
create trigger protect_profile_identity_trigger
before insert or update on public.profiles
for each row
execute function public.protect_profile_identity();

-- 6. Función segura para que un administrador cambie roles.
create or replace function public.admin_set_user_role(
  target_user_id uuid,
  new_role text
)
returns public.profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  result public.profiles;
begin
  if not exists (
    select 1 from public.profiles
    where id = auth.uid()
      and role = 'admin'
  ) then
    raise exception 'No tienes permisos de administrador';
  end if;

  if new_role not in ('user','distributor','verifier','moderator','admin') then
    raise exception 'Rol no válido';
  end if;

  update public.profiles
  set role = new_role
  where id = target_user_id
  returning * into result;

  if result.id is null then
    raise exception 'Usuario no encontrado';
  end if;

  return result;
end;
$$;

revoke all on function public.admin_set_user_role(uuid,text) from public;
grant execute on function public.admin_set_user_role(uuid,text) to authenticated;

-- 7. Permisos de la tabla de roles
alter table public.app_roles enable row level security;

drop policy if exists "app_roles_read_authenticated" on public.app_roles;
create policy "app_roles_read_authenticated"
on public.app_roles
for select
to authenticated
using (true);

commit;

-- IMPORTANTE:
-- El primer administrador debe asignarse manualmente una sola vez desde SQL:
--
-- update public.profiles
-- set role = 'admin'
-- where id = 'UUID_DEL_USUARIO';
--
-- Después de eso, ese administrador podrá usar:
--
-- select public.admin_set_user_role(
--   'UUID_DEL_USUARIO_OBJETIVO',
--   'moderator'
-- );
--
-- Nunca pongas la service_role key dentro de index.html o JavaScript del navegador.
