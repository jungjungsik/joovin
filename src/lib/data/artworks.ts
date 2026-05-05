import { Artwork, ItemTag } from "@/types";
import { createClient } from "@/lib/supabase/client";

// Database row type (snake_case)
interface ArtworkRow {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  year: number;
  tag: string; // Allow any string from DB, will be normalized
  medium: string;
  dimensions: string;
  season?: string;
  description: string;
  thumbnail: string;
  thumbnail_blur?: string;
  hero_image: string;
  hero_blur?: string;
  process_images?: string[];
  technical_insight?: string;
  technical_insight_image?: string;
  studio_image?: string;
  studio_text?: string;
  reflection?: string;
  featured?: boolean;
  published?: boolean;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}

// Valid tags - map legacy values to new ones
const VALID_TAGS: ItemTag[] = ['selected-works', 'drawings', 'paintings', 'digital', 'wip', 'sketchbook'];
const TAG_MAPPING: Record<string, ItemTag> = {
  'process': 'wip', // Legacy mapping
};

function normalizeTag(tag: string): ItemTag {
  if (VALID_TAGS.includes(tag as ItemTag)) {
    return tag as ItemTag;
  }
  return TAG_MAPPING[tag] || 'sketchbook'; // Default fallback
}

// Drop empty / non-string entries that may have been persisted by older
// versions of the admin form (e.g. an "Add Image" slot saved without an upload).
function cleanUrlList(list?: string[]): string[] | undefined {
  if (!list) return undefined;
  const filtered = list.filter((u): u is string => typeof u === "string" && u.length > 0);
  return filtered.length > 0 ? filtered : undefined;
}

function nonEmpty(value: string | undefined | null): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

// Transform database row to frontend type
function transformArtwork(row: ArtworkRow): Artwork {
  // Fall back to thumbnail when hero is missing so the detail page never
  // hands an empty src to next/image.
  const heroImage = nonEmpty(row.hero_image) ?? row.thumbnail;

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle,
    year: row.year,
    tag: normalizeTag(row.tag),
    medium: row.medium,
    dimensions: row.dimensions,
    season: row.season,
    description: row.description,
    thumbnail: row.thumbnail,
    thumbnailBlur: nonEmpty(row.thumbnail_blur),
    heroImage,
    heroBlur: nonEmpty(row.hero_blur) ?? nonEmpty(row.thumbnail_blur),
    processImages: cleanUrlList(row.process_images),
    technicalInsight: nonEmpty(row.technical_insight),
    technicalInsightImage: nonEmpty(row.technical_insight_image),
    studioImage: nonEmpty(row.studio_image),
    studioText: nonEmpty(row.studio_text),
    reflection: nonEmpty(row.reflection),
    featured: row.featured,
    published: row.published,
    order: row.sort_order,
  };
}

// Public read filter: hide drafts. Rows whose `published` column is null are
// treated as published so the site keeps working before/during the
// column-add migration.
const PUBLISHED_FILTER = "published.eq.true,published.is.null";

// Fetch all artworks from Supabase
export async function getArtworks(): Promise<Artwork[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("artworks")
    .select("*")
    .or(PUBLISHED_FILTER)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching artworks:", error);
    return [];
  }

  return (data || []).map(transformArtwork);
}

// Fetch single artwork by slug
export async function getArtworkBySlug(slug: string): Promise<Artwork | undefined> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("artworks")
    .select("*")
    .eq("slug", slug)
    .or(PUBLISHED_FILTER)
    .maybeSingle();

  if (error || !data) {
    return undefined;
  }

  return transformArtwork(data);
}

// Fetch featured artworks
export async function getFeaturedArtworks(): Promise<Artwork[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("artworks")
    .select("*")
    .eq("featured", true)
    .or(PUBLISHED_FILTER)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching featured artworks:", error);
    return [];
  }

  return (data || []).map(transformArtwork);
}

// Fetch artworks by tag
export async function getArtworksByTag(tag: string): Promise<Artwork[]> {
  const supabase = createClient();

  let query = supabase.from("artworks").select("*").or(PUBLISHED_FILTER);

  if (tag !== "all") {
    query = query.eq("tag", tag);
  }

  const { data, error } = await query
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching artworks by tag:", error);
    return [];
  }

  return (data || []).map(transformArtwork);
}

// Get adjacent artworks for navigation
export async function getAdjacentArtworks(slug: string): Promise<{ prev?: Artwork; next?: Artwork }> {
  const artworks = await getArtworks();
  const index = artworks.findIndex((a) => a.slug === slug);

  return {
    prev: index > 0 ? artworks[index - 1] : undefined,
    next: index < artworks.length - 1 ? artworks[index + 1] : undefined,
  };
}

// Get all slugs for static generation (published only)
export async function getAllSlugs(): Promise<string[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("artworks")
    .select("slug")
    .or(PUBLISHED_FILTER);

  if (error) {
    console.error("Error fetching slugs:", error);
    return [];
  }

  return (data || []).map((row) => row.slug);
}
