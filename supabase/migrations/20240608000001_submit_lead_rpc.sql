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
