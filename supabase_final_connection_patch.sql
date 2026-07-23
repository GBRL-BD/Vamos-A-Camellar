-- VAMOS A CAMELLAR / EMPRENDE
-- Parche final de conexión. No borra datos. Ejecutar una vez en Supabase SQL Editor.

create extension if not exists pgcrypto;

-- Asegura que los usuarios autenticados puedan leer el contenido activo.
alter table public.opportunities enable row level security;
alter table public.missions enable row level security;

drop policy if exists "opportunities_read_active" on public.opportunities;
create policy "opportunities_read_active"
on public.opportunities for select to authenticated
using (is_active = true or exists (
  select 1 from public.profiles p
  where p.id = auth.uid() and p.role in ('admin','moderator')
));

drop policy if exists "missions_read_active" on public.missions;
create policy "missions_read_active"
on public.missions for select to authenticated
using (is_active = true or exists (
  select 1 from public.profiles p
  where p.id = auth.uid() and p.role in ('admin','moderator')
));

-- Asegura ID público para perfiles existentes.
alter table public.profiles add column if not exists public_id text;
alter table public.profiles add column if not exists role text default 'user';

update public.profiles
set public_id = 'EMP-' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,8))
where public_id is null or public_id = '';

create unique index if not exists profiles_public_id_unique
on public.profiles(public_id)
where public_id is not null;

-- Asegura que el administrador pueda cambiar roles mediante la función segura.
-- Si ya existe, se reemplaza de forma idempotente.
create or replace function public.admin_set_user_role(target_user_id uuid, new_role text)
returns public.profiles
language plpgsql
security definer
set search_path = public
as $$
declare result public.profiles;
begin
  if not exists (select 1 from public.profiles where id = auth.uid() and role = 'admin') then
    raise exception 'No tienes permisos de administrador';
  end if;
  if new_role not in ('user','distributor','verifier','moderator','admin') then
    raise exception 'Rol no válido';
  end if;
  update public.profiles set role = new_role where id = target_user_id returning * into result;
  if result.id is null then raise exception 'Usuario no encontrado'; end if;
  return result;
end;
$$;

revoke all on function public.admin_set_user_role(uuid,text) from public;
grant execute on function public.admin_set_user_role(uuid,text) to authenticated;

select 1 as connection_patch_ok;
