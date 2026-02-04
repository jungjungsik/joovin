"use client"

import { useState, useCallback } from 'react'
import Image from 'next/image'

interface ImageUploaderProps {
  value?: string
  onChange: (url: string) => void
  label: string
  description?: string
  aspectRatio?: string
}

export function ImageUploader({ value, onChange, label, description, aspectRatio = "aspect-square" }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const handleUpload = useCallback(async (file: File) => {
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.url) {
        onChange(data.url)
      } else {
        alert(data.error || 'Upload failed')
      }
    } catch {
      alert('Upload failed')
    } finally {
      setUploading(false)
    }
  }, [onChange])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      handleUpload(file)
    }
  }, [handleUpload])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleUpload(file)
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      {description && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{description}</p>
      )}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl overflow-hidden transition-colors ${
          dragOver ? 'border-primary bg-primary/5' : 'border-gray-300 dark:border-gray-600'
        } ${aspectRatio}`}
      >
        {value ? (
          <div className="relative w-full h-full">
            <Image src={value} alt={label} fill className="object-cover" />
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        ) : (
          <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
            {uploading ? (
              <div className="text-primary">Uploading...</div>
            ) : (
              <>
                <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">cloud_upload</span>
                <span className="text-sm text-gray-500">클릭하거나 드래그하여 업로드</span>
                <span className="text-xs text-gray-400 mt-1">JPG, PNG, WebP (최대 5MB)</span>
              </>
            )}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
        )}
      </div>
    </div>
  )
}
