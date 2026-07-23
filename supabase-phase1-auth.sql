-- EMPRENDE — FASE 1: perfil automático al crear una cuenta
-- Ejecutar en Supabase SQL Editor.
-- Si ya existe el trigger, se reemplaza de forma segura.

create or replace function public.generate_emprende_public_id()
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  candidate text;
begin
  loop
    candidate := 'EMP-' || upper(substr(encode(gen_random_bytes(6), 'hex'), 1, 8));
    exit when not exists (
      select 1 from public.profiles where public_id = candidate
    );
  end loop;
  return candidate;
end;
$$;

create or replace function public.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, public_id, role)
  values (new.id, public.generate_emprende_public_id(), 'user')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user_profile();

-- Si gen_random_bytes no está habilitado, ejecutar una vez:
-- create extension if not exists pgcrypto;
