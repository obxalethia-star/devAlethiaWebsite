-- Run this once in Supabase Dashboard → SQL Editor

-- DevAlethia CRM: clients, inquiries, and activity log

create extension if not exists "pgcrypto";

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  full_name text not null,
  business_name text,
  phone text,
  status text not null default 'lead'
    check (status in ('lead', 'prospect', 'active', 'inactive')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  package_interest text,
  message text not null,
  summary text,
  source text not null default 'contact_form',
  status text not null default 'new'
    check (status in ('new', 'contacted', 'qualified', 'proposal_sent', 'won', 'lost')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.inquiry_activities (
  id uuid primary key default gen_random_uuid(),
  inquiry_id uuid not null references public.inquiries (id) on delete cascade,
  activity_type text not null default 'note'
    check (activity_type in ('note', 'email', 'call', 'status_change')),
  description text not null,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists clients_set_updated_at on public.clients;
create trigger clients_set_updated_at
  before update on public.clients
  for each row execute function public.set_updated_at();

drop trigger if exists inquiries_set_updated_at on public.inquiries;
create trigger inquiries_set_updated_at
  before update on public.inquiries
  for each row execute function public.set_updated_at();

create index if not exists inquiries_client_id_idx on public.inquiries (client_id);
create index if not exists inquiries_status_idx on public.inquiries (status);
create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);
create index if not exists clients_status_idx on public.clients (status);
create index if not exists clients_email_idx on public.clients (email);

alter table public.clients enable row level security;
alter table public.inquiries enable row level security;
alter table public.inquiry_activities enable row level security;

drop policy if exists "Staff can read clients" on public.clients;
create policy "Staff can read clients"
  on public.clients for select
  to authenticated
  using (true);

drop policy if exists "Staff can update clients" on public.clients;
create policy "Staff can update clients"
  on public.clients for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Staff can read inquiries" on public.inquiries;
create policy "Staff can read inquiries"
  on public.inquiries for select
  to authenticated
  using (true);

drop policy if exists "Staff can update inquiries" on public.inquiries;
create policy "Staff can update inquiries"
  on public.inquiries for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Staff can read inquiry activities" on public.inquiry_activities;
create policy "Staff can read inquiry activities"
  on public.inquiry_activities for select
  to authenticated
  using (true);

drop policy if exists "Staff can insert inquiry activities" on public.inquiry_activities;
create policy "Staff can insert inquiry activities"
  on public.inquiry_activities for insert
  to authenticated
  with check (true);

create or replace function public.submit_lead_request(
  p_name text,
  p_email text,
  p_business text default null,
  p_package text default null,
  p_message text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_client_id uuid;
  v_inquiry_id uuid;
  v_summary text;
  v_package_label text;
begin
  if p_name is null or trim(p_name) = '' then
    raise exception 'Name is required';
  end if;

  if p_email is null or trim(p_email) = '' then
    raise exception 'Email is required';
  end if;

  if p_message is null or trim(p_message) = '' then
    raise exception 'Message is required';
  end if;

  v_package_label := coalesce(nullif(trim(p_package), ''), 'Not specified');

  v_summary := format(
    E'New DevAlethia contact form submission\n\nName: %s\nEmail: %s\nBusiness: %s\nPackage: %s\n\nMessage:\n%s',
    trim(p_name),
    lower(trim(p_email)),
    coalesce(nullif(trim(p_business), ''), 'Not provided'),
    v_package_label,
    trim(p_message)
  );

  insert into public.clients (email, full_name, business_name, status)
  values (lower(trim(p_email)), trim(p_name), nullif(trim(p_business), ''), 'lead')
  on conflict (email) do update
    set full_name = excluded.full_name,
        business_name = coalesce(excluded.business_name, public.clients.business_name),
        updated_at = now()
  returning id into v_client_id;

  insert into public.inquiries (client_id, package_interest, message, summary, source, status)
  values (
    v_client_id,
    nullif(trim(p_package), ''),
    trim(p_message),
    v_summary,
    'contact_form',
    'new'
  )
  returning id into v_inquiry_id;

  insert into public.inquiry_activities (inquiry_id, activity_type, description)
  values (v_inquiry_id, 'note', 'Lead captured from website contact form.');

  return jsonb_build_object('success', true, 'inquiryId', v_inquiry_id);
end;
$$;

revoke all on function public.submit_lead_request(text, text, text, text, text) from public;
grant execute on function public.submit_lead_request(text, text, text, text, text) to anon, authenticated, service_role;
