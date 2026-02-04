"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ImageUploader } from './ImageUploader'

interface ArtworkFormData {
  title: string
  subtitle?: string
  year: number
  tag: 'selected-works' | 'sketchbook' | 'process'
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
        <h2 className="text-lg font-semibold mb-4">기본 정보</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">제목 *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => updateField('title', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">부제목</label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => updateField('subtitle', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">연도 *</label>
            <input
              type="number"
              value={formData.year}
              onChange={(e) => updateField('year', parseInt(e.target.value))}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">카테고리 *</label>
            <select
              value={formData.tag}
              onChange={(e) => updateField('tag', e.target.value as ArtworkFormData['tag'])}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            >
              <option value="selected-works">Selected Works</option>
              <option value="sketchbook">Sketchbook</option>
              <option value="process">Process</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">시즌</label>
            <input
              type="text"
              value={formData.season}
              onChange={(e) => updateField('season', e.target.value)}
              placeholder="예: Fall 2024"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">매체 *</label>
            <input
              type="text"
              value={formData.medium}
              onChange={(e) => updateField('medium', e.target.value)}
              placeholder="예: Oil on Canvas"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">크기 *</label>
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
            <label className="block text-sm font-medium mb-1">설명 *</label>
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
        <h2 className="text-lg font-semibold mb-4">이미지</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageUploader
            label="썸네일 (1:1) *"
            description="포트폴리오 목록에 표시되는 정사각형 이미지입니다. 작품의 전체 모습이 잘 보이도록 해주세요."
            value={formData.thumbnail}
            onChange={(url) => updateField('thumbnail', url)}
            aspectRatio="aspect-square"
          />
          <ImageUploader
            label="히어로 이미지 (4:5) *"
            description="작품 상세 페이지 상단에 크게 표시되는 메인 이미지입니다. 세로형 비율로 작품을 가장 잘 보여주는 사진을 선택하세요."
            value={formData.hero_image}
            onChange={(url) => updateField('hero_image', url)}
            aspectRatio="aspect-[4/5]"
          />
          <ImageUploader
            label="스튜디오 이미지 (16:9)"
            description="작업실이나 제작 환경을 보여주는 가로형 이미지입니다. 작품이 만들어진 공간의 분위기를 전달해주세요."
            value={formData.studio_image}
            onChange={(url) => updateField('studio_image', url)}
            aspectRatio="aspect-video"
          />
        </div>
      </section>

      {/* Optional Details */}
      <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">추가 정보 (선택)</h2>
        <div className="space-y-4">
          <ImageUploader
            label="기법 상세 이미지 (1:1)"
            description="작품의 붓터치, 질감, 세부 기법을 클로즈업한 정사각형 이미지입니다. 기술적 특징을 강조하는 부분을 촬영해주세요."
            value={formData.technical_insight_image}
            onChange={(url) => updateField('technical_insight_image', url)}
            aspectRatio="aspect-square"
          />
          <div>
            <label className="block text-sm font-medium mb-1">기법 설명</label>
            <textarea
              value={formData.technical_insight}
              onChange={(e) => updateField('technical_insight', e.target.value)}
              rows={3}
              placeholder="작품의 기법적 특징을 설명해주세요"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">스튜디오 설명</label>
            <textarea
              value={formData.studio_text}
              onChange={(e) => updateField('studio_text', e.target.value)}
              rows={2}
              placeholder="작업 환경에 대해 설명해주세요"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">작가 회고</label>
            <textarea
              value={formData.reflection}
              onChange={(e) => updateField('reflection', e.target.value)}
              rows={2}
              placeholder="작품에 대한 개인적인 생각"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            />
          </div>
        </div>
      </section>

      {/* Settings */}
      <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">설정</h2>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => updateField('featured', e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span>홈페이지에 표시 (Featured)</span>
          </label>
          <div className="flex items-center gap-2">
            <label className="text-sm">정렬 순서:</label>
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
          {loading ? '저장 중...' : artworkId ? '수정하기' : '등록하기'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          취소
        </button>
      </div>
    </form>
  )
}
