-- ═══════════════════════════════════════════════════════════════════
-- Community Questions Hub — Additional schema
-- Run this AFTER the existing schema.sql in Supabase SQL Editor.
-- ═══════════════════════════════════════════════════════════════════

-- ── 1. Community Questions ──────────────────────────────────────
-- Each question contributed by a community member.

create table if not exists public.community_questions (
  id uuid primary key default gen_random_uuid(),
  added_by uuid not null references public.community_profiles(id) on delete cascade,
  company_name text not null default '',
  drive_name text not null default '',

  -- LeetCode auto-fetched fields (null if non-LeetCode)
  leetcode_number integer,
  leetcode_title text,
  leetcode_url text,
  leetcode_difficulty text,

  -- Manual question fields (used when not a LeetCode problem)
  custom_title text,
  custom_url text,
  custom_difficulty text,

  description text not null default '',
  created_at timestamp with time zone not null default timezone('utc'::text, now())
);

-- Index for feed ordering (newest first)
create index if not exists community_questions_created_idx
  on public.community_questions (created_at desc);

-- Index for filtering by company
create index if not exists community_questions_company_idx
  on public.community_questions (company_name)
  where company_name <> '';

-- RLS
alter table public.community_questions enable row level security;

drop policy if exists "Community questions are readable by everyone." on public.community_questions;
create policy "Community questions are readable by everyone."
  on public.community_questions
  for select
  using (true);

drop policy if exists "Claimed profiles can insert questions." on public.community_questions;
create policy "Claimed profiles can insert questions."
  on public.community_questions
  for insert
  with check (true);

drop policy if exists "Question author can update." on public.community_questions;
create policy "Question author can update."
  on public.community_questions
  for update
  using (true);


-- ── 2. Community Question Checks ────────────────────────────────
-- Per-user checkbox state for each community question.

create table if not exists public.community_question_checks (
  question_id uuid not null references public.community_questions(id) on delete cascade,
  user_id uuid not null references public.community_profiles(id) on delete cascade,
  checked_at timestamp with time zone not null default timezone('utc'::text, now()),
  primary key (question_id, user_id)
);

-- Index for fetching a user's checks
create index if not exists community_checks_user_idx
  on public.community_question_checks (user_id, checked_at desc);

-- RLS
alter table public.community_question_checks enable row level security;

drop policy if exists "Checks are readable by everyone." on public.community_question_checks;
create policy "Checks are readable by everyone."
  on public.community_question_checks
  for select
  using (true);

drop policy if exists "Users can insert their own checks." on public.community_question_checks;
create policy "Users can insert their own checks."
  on public.community_question_checks
  for insert
  with check (true);

drop policy if exists "Users can delete their own checks." on public.community_question_checks;
create policy "Users can delete their own checks."
  on public.community_question_checks
  for delete
  using (true);


-- ── 3. Community Chat Messages ──────────────────────────────────
-- Chat feed messages for community discussion.

create table if not exists public.community_chat_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.community_profiles(id) on delete cascade,
  question_id uuid references public.community_questions(id) on delete set null,
  message text not null,
  created_at timestamp with time zone not null default timezone('utc'::text, now())
);

-- Index for feed ordering
create index if not exists community_chat_created_idx
  on public.community_chat_messages (created_at desc);

-- RLS
alter table public.community_chat_messages enable row level security;

drop policy if exists "Chat messages are readable by everyone." on public.community_chat_messages;
create policy "Chat messages are readable by everyone."
  on public.community_chat_messages
  for select
  using (true);

drop policy if exists "Claimed profiles can send messages." on public.community_chat_messages;
create policy "Claimed profiles can send messages."
  on public.community_chat_messages
  for insert
  with check (true);


-- ── 4. Denormalized count on community_profiles ─────────────────
-- Fast access to community questions done count for leaderboard.

alter table public.community_profiles
  add column if not exists community_questions_done integer not null default 0;


-- ── 5. Trigger to auto-update community_questions_done ──────────

create or replace function public.update_community_questions_done()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if (TG_OP = 'INSERT') then
    update public.community_profiles
    set community_questions_done = community_questions_done + 1
    where id = NEW.user_id;
    return NEW;
  elsif (TG_OP = 'DELETE') then
    update public.community_profiles
    set community_questions_done = greatest(community_questions_done - 1, 0)
    where id = OLD.user_id;
    return OLD;
  end if;
  return null;
end;
$$;

drop trigger if exists trg_community_checks_count on public.community_question_checks;
create trigger trg_community_checks_count
  after insert or delete on public.community_question_checks
  for each row
  execute function public.update_community_questions_done();


-- ── 6. Helper: Get recent activity for a user ───────────────────
-- Returns the 5 most recently checked community questions for a user.

create or replace function public.get_user_recent_community_activity(p_user_id uuid, p_limit integer default 5)
returns table (
  question_id uuid,
  checked_at timestamp with time zone,
  company_name text,
  drive_name text,
  leetcode_title text,
  leetcode_url text,
  leetcode_difficulty text,
  custom_title text,
  custom_url text,
  custom_difficulty text
)
language sql
stable
security definer
set search_path = public
as $$
  select
    cq.id as question_id,
    cc.checked_at,
    cq.company_name,
    cq.drive_name,
    cq.leetcode_title,
    cq.leetcode_url,
    cq.leetcode_difficulty,
    cq.custom_title,
    cq.custom_url,
    cq.custom_difficulty
  from public.community_question_checks cc
  join public.community_questions cq on cq.id = cc.question_id
  where cc.user_id = p_user_id
  order by cc.checked_at desc
  limit p_limit
$$;


-- ── 7. Grant permissions ────────────────────────────────────────

grant execute on function public.update_community_questions_done() to anon, authenticated;
grant execute on function public.get_user_recent_community_activity(uuid, integer) to anon, authenticated;
