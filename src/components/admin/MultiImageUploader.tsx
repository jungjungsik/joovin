"use client"

import { useState, useCallback } from 'react'
import Image from 'next/image'

interface MultiImageUploaderProps {
  value: string[]
  onChange: (urls: string[]) => void
  label: string
  description?: string
  maxImages?: number
}

export function MultiImageUploader({
  value = [],
  onChange,
  label,
  description,
  maxImages = 20
}: MultiImageUploaderProps) {
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  const handleUpload = useCallback(async (file: File, index: number) => {
    setUploadingIndex(index)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.url) {
        const newUrls = [...value]
        newUrls[index] = data.url
        onChange(newUrls)
      } else {
        alert(data.error || 'Upload failed')
      }
    } catch {
      alert('Upload failed')
    } finally {
      setUploadingIndex(null)
    }
  }, [value, onChange])

  const handleDrop = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault()
    setDragOverIndex(null)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      handleUpload(file, index)
    }
  }, [handleUpload])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0]
    if (file) {
      handleUpload(file, index)
    }
  }

  const handleAdd = () => {
    if (value.length < maxImages) {
      onChange([...value, ''])
    }
  }

  const handleDelete = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  const handleMoveUp = (index: number) => {
    if (index === 0) return
    const newUrls = [...value]
    ;[newUrls[index - 1], newUrls[index]] = [newUrls[index], newUrls[index - 1]]
    onChange(newUrls)
  }

  const handleMoveDown = (index: number) => {
    if (index === value.length - 1) return
    const newUrls = [...value]
    ;[newUrls[index], newUrls[index + 1]] = [newUrls[index + 1], newUrls[index]]
    onChange(newUrls)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div>
          <label className="block text-sm font-medium dark:text-white">{label}</label>
          {description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>
          )}
        </div>
        <button
          type="button"
          onClick={handleAdd}
          disabled={value.length >= maxImages}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-primary text-background-dark rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-base">add</span>
          Add Image
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {value.map((url, index) => (
          <div
            key={index}
            className="relative bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Move up"
                >
                  <span className="material-symbols-outlined text-lg">arrow_upward</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleMoveDown(index)}
                  disabled={index === value.length - 1}
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Move down"
                >
                  <span className="material-symbols-outlined text-lg">arrow_downward</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(index)}
                  className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 rounded-lg transition-colors"
                  aria-label="Delete"
                >
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            </div>

            {/* Image Upload Area */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOverIndex(index) }}
              onDragLeave={() => setDragOverIndex(null)}
              onDrop={(e) => handleDrop(e, index)}
              className={`relative border-2 border-dashed rounded-xl overflow-hidden transition-colors aspect-square ${
                dragOverIndex === index
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              {url ? (
                <div className="relative w-full h-full">
                  <Image src={url} alt={`Image ${index + 1}`} fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => {
                      const newUrls = [...value]
                      newUrls[index] = ''
                      onChange(newUrls)
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg">close</span>
                  </button>
                </div>
              ) : (
                <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  {uploadingIndex === index ? (
                    <div className="text-primary font-medium">Uploading...</div>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-4xl text-gray-400 dark:text-gray-500 mb-2">cloud_upload</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Click to upload or drag</span>
                      <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">JPG, PNG, WebP</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(e) => handleFileSelect(e, index)}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
        ))}
      </div>

      {value.length === 0 && (
        <div className="text-center py-12 text-gray-400 dark:text-gray-500 text-sm">
          Click the "Add Image" button above to add images
        </div>
      )}

      {value.length > 0 && (
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-right">
          {value.length} / {maxImages} images
        </div>
      )}
    </div>
  )
}
