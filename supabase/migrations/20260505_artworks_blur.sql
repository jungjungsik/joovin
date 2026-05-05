-- Tiny base64 blur placeholders for next/image's `placeholder="blur"`. We
-- generate these in /api/upload via sharp and store them alongside the URLs.
-- Nullable so existing rows keep working until they're re-saved.
--
-- Apply via Supabase Dashboard → SQL Editor.

alter table public.artworks
  add column if not exists thumbnail_blur text,
  add column if not exists hero_blur text;
