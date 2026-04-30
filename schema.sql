-- Create the community_profiles table to store public progress
create table public.community_profiles (
  id uuid primary key,
  username text not null,
  total_solved integer default 0,
  chapter_progress jsonb default '{}'::jsonb,
  last_active timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.community_profiles enable row level security;

-- Create policies for public access (Option A: No-Auth)
-- Anyone can read any profile
create policy "Public profiles are viewable by everyone."
  on public.community_profiles for select
  using ( true );

-- Anyone can insert a new profile (since it's a random UUID generated client-side)
create policy "Anyone can insert a profile."
  on public.community_profiles for insert
  with check ( true );

-- Anyone can update a profile if they know the UUID (this is safe enough for Option A)
create policy "Anyone can update their profile."
  on public.community_profiles for update
  using ( true );

-- Create an index to quickly load the leaderboard
create index community_profiles_total_solved_idx on public.community_profiles (total_solved desc);

-- ════════════════════════════════════════════════════════════
-- NEW COLUMNS — Run this block in Supabase SQL Editor
-- ════════════════════════════════════════════════════════════

-- Difficulty breakdown: { easy: N, medium: N, hard: N }
alter table public.community_profiles add column if not exists difficulty_breakdown jsonb default '{}'::jsonb;

-- Array of solved problem IDs
alter table public.community_profiles add column if not exists solved_problems jsonb default '[]'::jsonb;

-- Array of bookmarked problem IDs
alter table public.community_profiles add column if not exists bookmarked_problems jsonb default '[]'::jsonb;

-- Tracker milestone progress: { "arrays-easy": true, ... }
alter table public.community_profiles add column if not exists tracker_progress jsonb default '{}'::jsonb;

-- Allow delete for reset functionality (anyone can delete if they know UUID)
create policy "Anyone can delete their profile."
  on public.community_profiles for delete
  using ( true );
