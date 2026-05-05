import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { deleteManyFromR2 } from '@/lib/r2/client'
import {
  ALLOWED_ARTWORK_FIELDS,
  pickArtworkFields,
  generateUniqueSlug,
  collectImageUrls,
  diffImageUrls,
} from '../_helpers'

type Params = { params: Promise<{ id: string }> }

// GET /api/artworks/[id]
export async function GET(request: NextRequest, { params }: Params) {
  const { id } = await params
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('artworks')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 })
  }

  return NextResponse.json(data)
}

// PUT /api/artworks/[id]
export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const payload: Record<string, unknown> = pickArtworkFields(body, ALLOWED_ARTWORK_FIELDS)

  // Fetch existing row for slug comparison and orphan-image cleanup.
  const { data: before, error: fetchError } = await supabase
    .from('artworks')
    .select('*')
    .eq('id', id)
    .single()

  if (fetchError || !before) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  // Regenerate slug only if title actually changed.
  if (typeof payload.title === 'string' && payload.title !== before.title) {
    payload.slug = await generateUniqueSlug(supabase, payload.title, id)
  }

  const { data, error } = await supabase
    .from('artworks')
    .update(payload)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Best-effort: delete any image URLs that were dropped or replaced.
  const removed = diffImageUrls(before, data)
  if (removed.length > 0) {
    await deleteManyFromR2(removed)
  }

  // Revalidate cached pages. If slug changed, the old path also needs invalidation.
  revalidatePath('/portfolio')
  revalidatePath(`/portfolio/${data.slug}`)
  if (before.slug && before.slug !== data.slug) {
    revalidatePath(`/portfolio/${before.slug}`)
  }
  revalidatePath('/')

  return NextResponse.json(data)
}

// DELETE /api/artworks/[id]
export async function DELETE(request: NextRequest, { params }: Params) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Fetch row first so we can clean up R2 and invalidate the slug path.
  const { data: artwork } = await supabase
    .from('artworks')
    .select('*')
    .eq('id', id)
    .single()

  const { error } = await supabase
    .from('artworks')
    .delete()
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (artwork) {
    const urls = collectImageUrls(artwork)
    if (urls.length > 0) {
      await deleteManyFromR2(urls)
    }
  }

  // Revalidate cached pages
  revalidatePath('/portfolio')
  if (artwork?.slug) {
    revalidatePath(`/portfolio/${artwork.slug}`)
  }
  revalidatePath('/')

  return NextResponse.json({ success: true })
}
