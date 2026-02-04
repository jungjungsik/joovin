import { Artwork, ItemTag } from "@/types";
import { createClient } from "@/lib/supabase/client";

// Database row type (snake_case)
interface ArtworkRow {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  year: number;
  tag: ItemTag;
  medium: string;
  dimensions: string;
  season?: string;
  description: string;
  thumbnail: string;
  hero_image: string;
  process_images?: string[];
  technical_insight?: string;
  technical_insight_image?: string;
  studio_image?: string;
  studio_text?: string;
  reflection?: string;
  featured?: boolean;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}

// Transform database row to frontend type
function transformArtwork(row: ArtworkRow): Artwork {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle,
    year: row.year,
    tag: row.tag,
    medium: row.medium,
    dimensions: row.dimensions,
    season: row.season,
    description: row.description,
    thumbnail: row.thumbnail,
    heroImage: row.hero_image,
    processImages: row.process_images,
    technicalInsight: row.technical_insight,
    technicalInsightImage: row.technical_insight_image,
    studioImage: row.studio_image,
    studioText: row.studio_text,
    reflection: row.reflection,
    featured: row.featured,
    order: row.sort_order,
  };
}

// Fetch all artworks from Supabase
export async function getArtworks(): Promise<Artwork[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("artworks")
    .select("*")
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
    .single();

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

  let query = supabase.from("artworks").select("*");

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

// Get all slugs for static generation
export async function getAllSlugs(): Promise<string[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("artworks")
    .select("slug");

  if (error) {
    console.error("Error fetching slugs:", error);
    return [];
  }

  return (data || []).map((row) => row.slug);
}
