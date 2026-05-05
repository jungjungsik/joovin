import type { SupabaseClient } from '@supabase/supabase-js'

// Whitelist of columns the client is allowed to write.
// id / slug / created_at / updated_at are server-managed and excluded on purpose.
export const ALLOWED_ARTWORK_FIELDS = [
  'title',
  'subtitle',
  'year',
  'tag',
  'medium',
  'dimensions',
  'season',
  'description',
  'thumbnail',
  'thumbnail_blur',
  'hero_image',
  'hero_blur',
  'process_images',
  'technical_insight',
  'technical_insight_image',
  'studio_image',
  'studio_text',
  'reflection',
  'featured',
  'published',
  'sort_order',
] as const

export type ArtworkField = (typeof ALLOWED_ARTWORK_FIELDS)[number]

export function pickArtworkFields(
  body: Record<string, unknown>,
  fields: readonly string[] = ALLOWED_ARTWORK_FIELDS,
): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const f of fields) {
    if (f in body) out[f] = body[f]
  }
  return out
}

// Image-bearing columns. Used for orphan cleanup on update/delete.
export const IMAGE_SCALAR_FIELDS = [
  'thumbnail',
  'hero_image',
  'studio_image',
  'technical_insight_image',
] as const

export const IMAGE_ARRAY_FIELDS = ['process_images'] as const

export function collectImageUrls(row: Record<string, unknown>): string[] {
  const urls: string[] = []
  for (const f of IMAGE_SCALAR_FIELDS) {
    const v = row[f]
    if (typeof v === 'string' && v.length > 0) urls.push(v)
  }
  for (const f of IMAGE_ARRAY_FIELDS) {
    const v = row[f]
    if (Array.isArray(v)) {
      for (const item of v) {
        if (typeof item === 'string' && item.length > 0) urls.push(item)
      }
    }
  }
  return urls
}

// URLs present in `before` but not in `after`. Used when an image is
// removed/replaced during an update so the orphan can be deleted from R2.
export function diffImageUrls(
  before: Record<string, unknown>,
  after: Record<string, unknown>,
): string[] {
  const stays = new Set(collectImageUrls(after))
  return collectImageUrls(before).filter((u) => !stays.has(u))
}

function baseSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Generate a unique slug for the given title. If `excludeId` is provided
// (used on update), rows with that id are ignored when checking uniqueness.
export async function generateUniqueSlug(
  supabase: SupabaseClient,
  title: string,
  excludeId?: string,
): Promise<string> {
  const base = baseSlug(title) || 'artwork'
  let slug = base
  let attempt = 1

  while (true) {
    let query = supabase.from('artworks').select('id').eq('slug', slug).limit(1)
    if (excludeId) {
      query = query.neq('id', excludeId)
    }
    const { data, error } = await query

    if (error) throw error
    if (!data || data.length === 0) return slug

    attempt += 1
    slug = `${base}-${attempt}`

    if (attempt > 1000) {
      // Pathological fallback - extremely unlikely.
      return `${base}-${Date.now()}`
    }
  }
}
