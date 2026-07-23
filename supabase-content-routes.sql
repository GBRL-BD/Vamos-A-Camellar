-- EMPRENDE: contenido editable y rutas de 7 días
-- Ejecutar una sola vez en Supabase SQL Editor si estas tablas aún no existen.

create extension if not exists pgcrypto;

create table if not exists public.opportunities (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  category text,
  icon text,
  investment text,
  first_goal text,
  rules jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.missions (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid references public.opportunities(id) on delete set null,
  day_number integer not null check (day_number between 1 and 7),
  title text not null,
  description text not null default '',
  tip text,
  type text not null default 'text',
  placeholder text,
  options jsonb not null default '[]'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists missions_opportunity_day_idx
on public.missions(opportunity_id, day_number);

alter table public.opportunities enable row level security;
alter table public.missions enable row level security;

drop policy if exists "opportunities_read_active" on public.opportunities;
create policy "opportunities_read_active" on public.opportunities
for select to authenticated using (is_active = true or exists (
  select 1 from public.profiles p where p.id=auth.uid() and p.role in ('admin','moderator')
));

drop policy if exists "opportunities_manage_staff" on public.opportunities;
create policy "opportunities_manage_staff" on public.opportunities
for all to authenticated using (exists (
  select 1 from public.profiles p where p.id=auth.uid() and p.role in ('admin','moderator')
)) with check (exists (
  select 1 from public.profiles p where p.id=auth.uid() and p.role in ('admin','moderator')
));

drop policy if exists "missions_read_active" on public.missions;
create policy "missions_read_active" on public.missions
for select to authenticated using (is_active = true or exists (
  select 1 from public.profiles p where p.id=auth.uid() and p.role in ('admin','moderator')
));

drop policy if exists "missions_manage_staff" on public.missions;
create policy "missions_manage_staff" on public.missions
for all to authenticated using (exists (
  select 1 from public.profiles p where p.id=auth.uid() and p.role in ('admin','moderator')
)) with check (exists (
  select 1 from public.profiles p where p.id=auth.uid() and p.role in ('admin','moderator')
));

-- Evita dos misiones activas en el mismo día para una misma oportunidad.
create unique index if not exists missions_unique_active_day
on public.missions(opportunity_id, day_number)
where is_active = true and opportunity_id is not null;
