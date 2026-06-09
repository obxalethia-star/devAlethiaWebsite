create schema if not exists private;

create table if not exists private.app_secrets (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

revoke all on schema private from public;
revoke all on table private.app_secrets from public;

create extension if not exists pg_net with schema extensions;

create or replace function public.send_inquiry_email()
returns trigger
language plpgsql
security definer
set search_path = public, private, extensions
as $$
declare
  v_client record;
  v_resend_key text;
  v_notify_to text;
  v_notify_from text;
begin
  select value into v_resend_key
  from private.app_secrets
  where key = 'resend_api_key';

  if v_resend_key is null or v_resend_key = '' then
    return new;
  end if;

  select value into v_notify_to
  from private.app_secrets
  where key = 'notify_to_email';

  select value into v_notify_from
  from private.app_secrets
  where key = 'notify_from_email';

  v_notify_to := coalesce(v_notify_to, 'admin@obxalethia.art');
  v_notify_from := coalesce(v_notify_from, 'DevAlethia <onboarding@resend.dev>');

  select * into v_client from public.clients where id = new.client_id;

  perform net.http_post(
    url := 'https://api.resend.com/emails',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || v_resend_key
    ),
    body := jsonb_build_object(
      'from', v_notify_from,
      'to', jsonb_build_array(v_notify_to),
      'reply_to', v_client.email,
      'subject', 'New lead: ' || v_client.full_name || ' (' || coalesce(v_client.business_name, v_client.email) || ')',
      'text', coalesce(new.summary, new.message)
    )
  );

  insert into public.inquiry_activities (inquiry_id, activity_type, description)
  values (new.id, 'email', 'Notification email queued for ' || v_notify_to || '.');

  return new;
end;
$$;

drop trigger if exists inquiries_send_email on public.inquiries;
create trigger inquiries_send_email
  after insert on public.inquiries
  for each row execute function public.send_inquiry_email();
