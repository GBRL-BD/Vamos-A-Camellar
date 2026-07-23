-- EMPRENDE BACKEND — Supabase
-- Ejecuta este archivo en Supabase SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    display_name text,
    created_at timestamptz not null default now()
);

create table if not exists public.mission_submissions (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    opportunity_id text not null,
    mission_id text not null,
    answer jsonb not null,
    evidence jsonb not null default '{}'::jsonb,
    status text not null default 'approved'
        check (status in ('pending', 'approved', 'rejected')),
    validation_method text,
    reviewer_note text,
    created_at timestamptz not null default now(),
    reviewed_at timestamptz
);

create unique index if not exists mission_submissions_user_mission_unique
on public.mission_submissions(user_id, mission_id);

alter table public.profiles enable row level security;
alter table public.mission_submissions enable row level security;

drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
on public.profiles for select
using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
on public.profiles for update
using (auth.uid() = id);

drop policy if exists "Users can read own submissions" on public.mission_submissions;
create policy "Users can read own submissions"
on public.mission_submissions for select
using (auth.uid() = user_id);

-- No se permite insertar directamente desde el navegador.
-- Las entregas se crean mediante la Edge Function submit-mission.
revoke insert, update, delete on public.mission_submissions from anon, authenticated;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
    insert into public.profiles (id, display_name)
    values (new.id, new.raw_user_meta_data ->> 'display_name');
    return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();


-- =========================================================
-- STORAGE PRIVADO PARA EVIDENCIAS DE MISIONES
-- =========================================================

insert into storage.buckets (id, name, public)
values ('mission-evidence', 'mission-evidence', false)
on conflict (id) do update set public = false;

drop policy if exists "Users can upload own mission evidence" on storage.objects;
create policy "Users can upload own mission evidence"
on storage.objects for insert
to authenticated
with check (
    bucket_id = 'mission-evidence'
    and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Users can read own mission evidence" on storage.objects;
create policy "Users can read own mission evidence"
on storage.objects for select
to authenticated
using (
    bucket_id = 'mission-evidence'
    and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Users can delete own mission evidence" on storage.objects;
create policy "Users can delete own mission evidence"
on storage.objects for delete
to authenticated
using (
    bucket_id = 'mission-evidence'
    and (storage.foldername(name))[1] = auth.uid()::text
);
