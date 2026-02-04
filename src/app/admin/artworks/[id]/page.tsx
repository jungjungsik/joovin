import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ArtworkForm } from '@/components/admin/ArtworkForm'

interface EditArtworkPageProps {
  params: Promise<{ id: string }>
}

export default async function EditArtworkPage({ params }: EditArtworkPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: artwork } = await supabase
    .from('artworks')
    .select('*')
    .eq('id', id)
    .single()

  if (!artwork) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-2xl font-display font-semibold mb-6">작품 수정</h1>
      <ArtworkForm initialData={artwork} artworkId={id} />
    </div>
  )
}
