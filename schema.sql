-- DSA Roadmap community sync schema
-- Paste and run this entire file in the Supabase SQL Editor.
-- No Supabase Auth required: users claim a profile with a private sync code.

create extension if not exists pgcrypto;

create table if not exists public.community_profiles (
  id uuid primary key,
  username text not null default 'DSA Pilot',
  total_solved integer not null default 0,
  chapter_progress jsonb not null default '{}'::jsonb,
  difficulty_breakdown jsonb not null default '{}'::jsonb,
  solved_problems jsonb not null default '[]'::jsonb,
  bookmarked_problems jsonb not null default '[]'::jsonb,
  tracker_progress jsonb not null default '{}'::jsonb,
  avatar_url text,
  avatar_path text,
  avatar_updated_at timestamp with time zone,
  leaderboard_opt_in boolean not null default false,
  profile_claimed boolean not null default false,
  sync_code_hash text,
  sync_code_hint text,
  created_at timestamp with time zone not null default timezone('utc'::text, now()),
  last_active timestamp with time zone not null default timezone('utc'::text, now())
);

alter table public.community_profiles add column if not exists difficulty_breakdown jsonb not null default '{}'::jsonb;
alter table public.community_profiles add column if not exists solved_problems jsonb not null default '[]'::jsonb;
alter table public.community_profiles add column if not exists bookmarked_problems jsonb not null default '[]'::jsonb;
alter table public.community_profiles add column if not exists tracker_progress jsonb not null default '{}'::jsonb;
alter table public.community_profiles add column if not exists avatar_url text;
alter table public.community_profiles add column if not exists avatar_path text;
alter table public.community_profiles add column if not exists avatar_updated_at timestamp with time zone;
alter table public.community_profiles add column if not exists leaderboard_opt_in boolean not null default false;
alter table public.community_profiles add column if not exists profile_claimed boolean not null default false;
alter table public.community_profiles add column if not exists sync_code_hash text;
alter table public.community_profiles add column if not exists sync_code_hint text;
alter table public.community_profiles add column if not exists created_at timestamp with time zone not null default timezone('utc'::text, now());
alter table public.community_profiles add column if not exists last_active timestamp with time zone not null default timezone('utc'::text, now());

alter table public.community_profiles enable row level security;

drop policy if exists "Public profiles are viewable by everyone." on public.community_profiles;
drop policy if exists "Anyone can insert a profile." on public.community_profiles;
drop policy if exists "Anyone can update their profile." on public.community_profiles;
drop policy if exists "Anyone can delete their profile." on public.community_profiles;
drop policy if exists "Opted-in profiles are public." on public.community_profiles;

create policy "Opted-in profiles are public."
  on public.community_profiles
  for select
  using (leaderboard_opt_in = true);

create index if not exists community_profiles_total_solved_idx
  on public.community_profiles (total_solved desc)
  where leaderboard_opt_in = true;

create index if not exists community_profiles_sync_code_hash_idx
  on public.community_profiles (sync_code_hash);

create or replace function public.sync_code_digest(p_sync_code text)
returns text
language sql
immutable
as $$
  select encode(digest(upper(trim(coalesce(p_sync_code, ''))), 'sha256'), 'hex')
$$;

create or replace function public.apply_profile_payload(
  p_id uuid,
  p_username text,
  p_leaderboard_opt_in boolean,
  p_payload jsonb
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.community_profiles
  set
    username = coalesce(left(nullif(trim(coalesce(p_username, '')), ''), 32), 'DSA Pilot'),
    leaderboard_opt_in = coalesce(p_leaderboard_opt_in, false),
    total_solved = greatest(coalesce((p_payload->>'total_solved')::integer, 0), 0),
    chapter_progress = coalesce(p_payload->'chapter_progress', '{}'::jsonb),
    difficulty_breakdown = coalesce(p_payload->'difficulty_breakdown', '{}'::jsonb),
    solved_problems = coalesce(p_payload->'solved_problems', '[]'::jsonb),
    bookmarked_problems = coalesce(p_payload->'bookmarked_problems', '[]'::jsonb),
    tracker_progress = coalesce(p_payload->'tracker_progress', '{}'::jsonb),
    profile_claimed = true,
    last_active = timezone('utc'::text, now())
  where id = p_id;
end;
$$;

create or replace function public.claim_community_profile(
  p_id uuid,
  p_username text,
  p_sync_code text,
  p_leaderboard_opt_in boolean,
  p_payload jsonb
)
returns public.community_profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  v_clean_code text := upper(trim(coalesce(p_sync_code, '')));
  v_hash text := public.sync_code_digest(p_sync_code);
  v_hint text := right(upper(trim(coalesce(p_sync_code, ''))), 4);
  v_profile public.community_profiles;
begin
  if length(v_clean_code) < 10 then
    raise exception 'Invalid sync code';
  end if;

  if exists (
    select 1
    from public.community_profiles
    where sync_code_hash = v_hash
      and id <> p_id
  ) then
    raise exception 'Sync code already exists';
  end if;

  if exists (
    select 1
    from public.community_profiles
    where id = p_id
      and sync_code_hash is not null
      and sync_code_hash <> v_hash
  ) then
    raise exception 'Profile already claimed with a different sync code';
  end if;

  insert into public.community_profiles (
    id,
    username,
    sync_code_hash,
    sync_code_hint,
    leaderboard_opt_in,
    profile_claimed
  )
  values (
    p_id,
    coalesce(left(nullif(trim(coalesce(p_username, '')), ''), 32), 'DSA Pilot'),
    v_hash,
    v_hint,
    coalesce(p_leaderboard_opt_in, false),
    true
  )
  on conflict (id) do update
  set
    username = excluded.username,
    sync_code_hash = coalesce(public.community_profiles.sync_code_hash, excluded.sync_code_hash),
    sync_code_hint = coalesce(public.community_profiles.sync_code_hint, excluded.sync_code_hint),
    leaderboard_opt_in = excluded.leaderboard_opt_in,
    profile_claimed = true;

  perform public.apply_profile_payload(p_id, p_username, p_leaderboard_opt_in, coalesce(p_payload, '{}'::jsonb));

  select * into v_profile
  from public.community_profiles
  where id = p_id;

  return v_profile;
end;
$$;

create or replace function public.sync_community_profile(
  p_id uuid,
  p_sync_code text,
  p_username text,
  p_leaderboard_opt_in boolean,
  p_payload jsonb
)
returns public.community_profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  v_profile public.community_profiles;
begin
  if not exists (
    select 1
    from public.community_profiles
    where id = p_id
      and sync_code_hash = public.sync_code_digest(p_sync_code)
  ) then
    raise exception 'Invalid profile or sync code';
  end if;

  perform public.apply_profile_payload(p_id, p_username, p_leaderboard_opt_in, coalesce(p_payload, '{}'::jsonb));

  select * into v_profile
  from public.community_profiles
  where id = p_id;

  return v_profile;
end;
$$;

create or replace function public.set_community_profile_avatar(
  p_id uuid,
  p_sync_code text,
  p_avatar_url text,
  p_avatar_path text
)
returns public.community_profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  v_profile public.community_profiles;
begin
  if not exists (
    select 1
    from public.community_profiles
    where id = p_id
      and sync_code_hash = public.sync_code_digest(p_sync_code)
  ) then
    raise exception 'Invalid profile or sync code';
  end if;

  update public.community_profiles
  set
    avatar_url = nullif(trim(coalesce(p_avatar_url, '')), ''),
    avatar_path = nullif(trim(coalesce(p_avatar_path, '')), ''),
    avatar_updated_at = case
      when nullif(trim(coalesce(p_avatar_url, '')), '') is null then null
      else timezone('utc'::text, now())
    end,
    last_active = timezone('utc'::text, now())
  where id = p_id;

  select * into v_profile
  from public.community_profiles
  where id = p_id;

  return v_profile;
end;
$$;

drop function if exists public.restore_community_profile(text);

create function public.restore_community_profile(p_sync_code text)
returns table (
  id uuid,
  username text,
  total_solved integer,
  chapter_progress jsonb,
  difficulty_breakdown jsonb,
  solved_problems jsonb,
  bookmarked_problems jsonb,
  tracker_progress jsonb,
  avatar_url text,
  avatar_path text,
  avatar_updated_at timestamp with time zone,
  leaderboard_opt_in boolean,
  last_active timestamp with time zone
)
language sql
security definer
set search_path = public
as $$
  select
    cp.id,
    cp.username,
    cp.total_solved,
    cp.chapter_progress,
    cp.difficulty_breakdown,
    cp.solved_problems,
    cp.bookmarked_problems,
    cp.tracker_progress,
    cp.avatar_url,
    cp.avatar_path,
    cp.avatar_updated_at,
    cp.leaderboard_opt_in,
    cp.last_active
  from public.community_profiles cp
  where cp.sync_code_hash = public.sync_code_digest(p_sync_code)
  limit 1
$$;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'profile-avatars',
  'profile-avatars',
  true,
  2097152,
  array['image/webp', 'image/png', 'image/jpeg']
)
on conflict (id) do update
set
  public = true,
  file_size_limit = 2097152,
  allowed_mime_types = array['image/webp', 'image/png', 'image/jpeg'];

drop policy if exists "Public profile avatar reads." on storage.objects;
drop policy if exists "Public profile avatar uploads." on storage.objects;
drop policy if exists "Public profile avatar updates." on storage.objects;
drop policy if exists "Public profile avatar deletes." on storage.objects;

create policy "Public profile avatar reads."
  on storage.objects
  for select
  using (bucket_id = 'profile-avatars');

grant execute on function public.claim_community_profile(uuid, text, text, boolean, jsonb) to anon, authenticated;
grant execute on function public.sync_community_profile(uuid, text, text, boolean, jsonb) to anon, authenticated;
grant execute on function public.set_community_profile_avatar(uuid, text, text, text) to anon, authenticated;
grant execute on function public.restore_community_profile(text) to anon, authenticated;
