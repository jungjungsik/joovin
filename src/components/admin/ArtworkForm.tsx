"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ImageUploader } from './ImageUploader'
import { MultiImageUploader } from './MultiImageUploader'

interface ArtworkFormData {
  title: string
  subtitle?: string
  year: number
  tag: 'selected-works' | 'drawings' | 'paintings' | 'digital' | 'wip' | 'sketchbook'
  medium: string
  dimensions: string
  season?: string
  description: string
  thumbnail: string
  hero_image: string
  process_images?: string[]
  technical_insight?: string
  technical_insight_image?: string
  studio_image?: string
  studio_text?: string
  reflection?: string
  featured: boolean
  sort_order: number
}

interface ArtworkFormProps {
  initialData?: Partial<ArtworkFormData>
  artworkId?: string
}

export function ArtworkForm({ initialData, artworkId }: ArtworkFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<ArtworkFormData>({
    title: initialData?.title || '',
    subtitle: initialData?.subtitle || '',
    year: initialData?.year || new Date().getFullYear(),
    tag: initialData?.tag || 'selected-works',
    medium: initialData?.medium || '',
    dimensions: initialData?.dimensions || '',
    season: initialData?.season || '',
    description: initialData?.description || '',
    thumbnail: initialData?.thumbnail || '',
    hero_image: initialData?.hero_image || '',
    process_images: initialData?.process_images || [],
    technical_insight: initialData?.technical_insight || '',
    technical_insight_image: initialData?.technical_insight_image || '',
    studio_image: initialData?.studio_image || '',
    studio_text: initialData?.studio_text || '',
    reflection: initialData?.reflection || '',
    featured: initialData?.featured || false,
    sort_order: initialData?.sort_order || 0,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const url = artworkId ? `/api/artworks/${artworkId}` : '/api/artworks'
    const method = artworkId ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        const data = await res.json()
        alert(data.error || 'Failed to save')
      }
    } catch {
      alert('Failed to save')
    } finally {
      setLoading(false)
    }
  }

  const updateField = <K extends keyof ArtworkFormData>(field: K, value: ArtworkFormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Info */}
      <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1 dark:text-white">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => updateField('title', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white">Subtitle</label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => updateField('subtitle', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white">Year *</label>
            <input
              type="number"
              value={formData.year}
              onChange={(e) => updateField('year', parseInt(e.target.value))}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white">Category *</label>
            <select
              value={formData.tag}
              onChange={(e) => updateField('tag', e.target.value as ArtworkFormData['tag'])}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            >
              <option value="selected-works">Selected Works</option>
              <option value="drawings">Drawings</option>
              <option value="paintings">Paintings</option>
              <option value="digital">Digital Art</option>
              <option value="wip">Work in Progress</option>
              <option value="sketchbook">Sketchbook</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white">Season</label>
            <input
              type="text"
              value={formData.season}
              onChange={(e) => updateField('season', e.target.value)}
              placeholder="e.g., Fall 2024"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white">Medium *</label>
            <input
              type="text"
              value={formData.medium}
              onChange={(e) => updateField('medium', e.target.value)}
              placeholder="e.g., Oil on Canvas"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white">Dimensions *</label>
            <input
              type="text"
              value={formData.dimensions}
              onChange={(e) => updateField('dimensions', e.target.value)}
              placeholder='예: 36" x 48"'
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1 dark:text-white">Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
              required
            />
          </div>
        </div>
      </section>

      {/* Images */}
      <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">Images</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageUploader
            label="Thumbnail (1:1) *"
            description="Square image displayed in the portfolio list. Ensure the full artwork is clearly visible."
            value={formData.thumbnail}
            onChange={(url) => updateField('thumbnail', url)}
            aspectRatio="aspect-square"
          />
          <ImageUploader
            label="Hero Image (4:5) *"
            description="Main image displayed prominently at the top of the artwork detail page. Choose a portrait-oriented photo that best showcases your work."
            value={formData.hero_image}
            onChange={(url) => updateField('hero_image', url)}
            aspectRatio="aspect-[4/5]"
          />
          <ImageUploader
            label="Studio Image (16:9)"
            description="Landscape image showing your studio or working environment. Convey the atmosphere of the space where your artwork was created."
            value={formData.studio_image}
            onChange={(url) => updateField('studio_image', url)}
            aspectRatio="aspect-video"
          />
          <div className="md:col-span-2">
            <MultiImageUploader
              label="Artwork Images (Cartoon/Comic/Series)"
              description="Upload multi-page works in order. Use the up/down buttons to rearrange the sequence."
              value={formData.process_images || []}
              onChange={(urls) => updateField('process_images', urls)}
              maxImages={30}
            />
          </div>
        </div>
      </section>

      {/* Optional Details */}
      <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">Additional Details (Optional)</h2>
        <div className="space-y-4">
          <ImageUploader
            label="Technique Detail Image (1:1)"
            description="Square close-up image showing brushwork, texture, and detailed techniques. Capture sections that emphasize technical characteristics."
            value={formData.technical_insight_image}
            onChange={(url) => updateField('technical_insight_image', url)}
            aspectRatio="aspect-square"
          />
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white">Technique Description</label>
            <textarea
              value={formData.technical_insight}
              onChange={(e) => updateField('technical_insight', e.target.value)}
              rows={3}
              placeholder="Describe the technical characteristics of your artwork"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white">Studio Description</label>
            <textarea
              value={formData.studio_text}
              onChange={(e) => updateField('studio_text', e.target.value)}
              rows={2}
              placeholder="Describe your working environment"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white">Artist Reflection</label>
            <textarea
              value={formData.reflection}
              onChange={(e) => updateField('reflection', e.target.value)}
              rows={2}
              placeholder="Your personal thoughts about the artwork"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            />
          </div>
        </div>
      </section>

      {/* Settings */}
      <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">Settings</h2>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => updateField('featured', e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="dark:text-white">Show on Homepage (Featured)</span>
          </label>
          <div className="flex items-center gap-2">
            <label className="text-sm dark:text-white">Sort Order:</label>
            <input
              type="number"
              value={formData.sort_order}
              onChange={(e) => updateField('sort_order', parseInt(e.target.value) || 0)}
              className="w-20 px-2 py-1 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            />
          </div>
        </div>
      </section>

      {/* Submit */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-background-dark px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {loading ? 'Saving...' : artworkId ? 'Update' : 'Create'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors dark:text-white"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
