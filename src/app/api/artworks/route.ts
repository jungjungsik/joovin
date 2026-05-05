import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { isAdminUser } from '@/lib/auth/admin'
import { ALLOWED_ARTWORK_FIELDS, pickArtworkFields, generateUniqueSlug } from './_helpers'

// GET /api/artworks - Get all artworks
export async function GET() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('artworks')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

// POST /api/artworks - Create artwork
export async function POST(request: NextRequest) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!isAdminUser(user)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await request.json()
  const payload = pickArtworkFields(body, ALLOWED_ARTWORK_FIELDS)

  if (!payload.title || typeof payload.title !== 'string') {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 })
  }

  const slug = await generateUniqueSlug(supabase, payload.title as string)

  const { data, error } = await supabase
    .from('artworks')
    .insert({ ...payload, slug })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Revalidate cached pages
  revalidatePath('/portfolio')
  revalidatePath('/')

  return NextResponse.json(data, { status: 201 })
}
