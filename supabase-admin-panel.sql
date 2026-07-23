-- EMPrende: panel de administración y reportes
begin;

create table if not exists public.help_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  report_type text not null check (report_type in ('bug','improvement','user_report')),
  message text not null,
  reported_user_id text,
  status text not null default 'pending' check (status in ('pending','reviewing','resolved','dismissed')),
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.help_reports enable row level security;

-- Un usuario solo puede crear y ver sus propios reportes.
drop policy if exists "help_reports_insert_own" on public.help_reports;
create policy "help_reports_insert_own" on public.help_reports
for insert to authenticated
with check (user_id = auth.uid());

drop policy if exists "help_reports_select_own_or_admin" on public.help_reports;
create policy "help_reports_select_own_or_admin" on public.help_reports
for select to authenticated
using (
  user_id = auth.uid()
  or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','moderator'))
);

drop policy if exists "help_reports_update_admin" on public.help_reports;
create policy "help_reports_update_admin" on public.help_reports
for update to authenticated
using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','moderator')))
with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','moderator')));

-- Un administrador puede consultar todos los perfiles; el usuario normal solo el suyo.
drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin" on public.profiles
for select to authenticated
using (
  id = auth.uid()
  or exists (select 1 from public.profiles admin_profile where admin_profile.id = auth.uid() and admin_profile.role in ('admin','moderator'))
);

commit;
