-- Add `published` column to artworks. Default true so every existing row stays
-- visible after the migration runs; new rows still default to published unless
-- the admin form sends `false`.
--
-- Apply via Supabase Dashboard → SQL Editor, or `supabase db push` if you've
-- linked the project locally.

alter table public.artworks
  add column if not exists published boolean not null default true;

-- Index for the common public read path: WHERE published = true ORDER BY sort_order.
create index if not exists artworks_published_sort_order_idx
  on public.artworks (published, sort_order);
