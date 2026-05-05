import "server-only";

import { Artwork, ItemTag } from "@/types";
import { getAnonClient } from "@/lib/supabase/anon";

// Database row type (snake_case)
interface ArtworkRow {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  year: number;
  tag: string;
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

const VALID_TAGS: ItemTag[] = [
  "selected-works",
  "drawings",
  "paintings",
  "digital",
  "wip",
  "sketchbook",
];
const TAG_MAPPING: Record<string, ItemTag> = {
  process: "wip",
};

function normalizeTag(tag: string): ItemTag {
  if (VALID_TAGS.includes(tag as ItemTag)) {
    return tag as ItemTag;
  }
  return TAG_MAPPING[tag] || "sketchbook";
}

function cleanUrlList(list?: string[]): string[] | undefined {
  if (!list) return undefined;
  const filtered = list.filter(
    (u): u is string => typeof u === "string" && u.length > 0,
  );
  return filtered.length > 0 ? filtered : undefined;
}

function nonEmpty(value: string | undefined | null): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function transformArtwork(row: ArtworkRow): Artwork & { updatedAt?: string } {
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
    updatedAt: row.updated_at,
  };
}

export async function getArtworksServer(): Promise<Array<Artwork & { updatedAt?: string }>> {
  const supabase = getAnonClient();
  // Public read path: drafts (published=false) are hidden. Rows with a
  // null published column are treated as published so the site keeps working
  // before/during the column-add migration.
  const { data, error } = await supabase
    .from("artworks")
    .select("*")
    .or("published.eq.true,published.is.null")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching artworks (server):", error);
    return [];
  }
  return (data || []).map(transformArtwork);
}

export async function getFeaturedArtworksServer(): Promise<Artwork[]> {
  const supabase = getAnonClient();
  const { data, error } = await supabase
    .from("artworks")
    .select("*")
    .eq("featured", true)
    .or("published.eq.true,published.is.null")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching featured artworks (server):", error);
    return [];
  }
  return (data || []).map(transformArtwork);
}
