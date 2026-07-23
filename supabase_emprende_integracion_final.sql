-- Ejecutar una sola vez si tu proyecto todavía usa el esquema original.
-- Este script NO borra datos.

create table if not exists public.mission_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  opportunity_id text not null,
  mission_id text not null,
  answer jsonb not null default '{}'::jsonb,
  evidence jsonb not null default '{}'::jsonb,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

create unique index if not exists mission_submissions_user_mission_unique
on public.mission_submissions(user_id, mission_id);

alter table public.mission_submissions enable row level security;

drop policy if exists "Users can read own submissions" on public.mission_submissions;
create policy "Users can read own submissions"
on public.mission_submissions for select to authenticated
using (auth.uid()=user_id);

drop policy if exists "Users can insert own submissions" on public.mission_submissions;
create policy "Users can insert own submissions"
on public.mission_submissions for insert to authenticated
with check (auth.uid()=user_id);

-- Si profiles existe pero aún no tiene rol/ID público:
alter table public.profiles add column if not exists public_id text;
alter table public.profiles add column if not exists role text not null default 'user';

-- Genera IDs públicos para perfiles existentes.
update public.profiles
set public_id='EMP-'||upper(substr(replace(gen_random_uuid()::text,'-',''),1,8))
where public_id is null;

-- Oportunidades y misiones públicas para usuarios autenticados.
alter table public.opportunities enable row level security;
alter table public.missions enable row level security;

drop policy if exists "opportunities_read_active" on public.opportunities;
create policy "opportunities_read_active" on public.opportunities
for select to authenticated using (is_active=true or exists(
  select 1 from public.profiles p where p.id=auth.uid() and p.role in ('admin','moderator')
));

drop policy if exists "missions_read_active" on public.missions;
create policy "missions_read_active" on public.missions
for select to authenticated using (is_active=true or exists(
  select 1 from public.profiles p where p.id=auth.uid() and p.role in ('admin','moderator')
));
