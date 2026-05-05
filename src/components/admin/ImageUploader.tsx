"use client"

import { useState, useCallback } from 'react'

interface ImageUploaderProps {
  value?: string
  onChange: (url: string) => void
  label: string
  description?: string
}

export function ImageUploader({ value, onChange, label, description }: ImageUploaderProps) {
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
      <label className="block text-sm font-medium mb-1 dark:text-white">{label}</label>
      {description && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{description}</p>
      )}
      {value ? (
        <div className="relative inline-block max-w-full rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          {/* Native <img> so the browser sizes the box from the file's
              natural aspect ratio, no cropping. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt={label}
            className="block max-w-full h-auto max-h-[60vh] w-auto"
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
            aria-label="Remove image"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-xl overflow-hidden transition-colors min-h-[220px] ${
            dragOver ? 'border-primary bg-primary/5' : 'border-gray-300 dark:border-gray-600'
          }`}
        >
          <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
            {uploading ? (
              <div className="text-primary">Uploading...</div>
            ) : (
              <>
                <span className="material-symbols-outlined text-4xl text-gray-400 dark:text-gray-500 mb-2">cloud_upload</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Click or drag to upload</span>
                <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">JPG, PNG, WebP (Max 15MB) — Original aspect preserved</span>
              </>
            )}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/x-png"
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
        </div>
      )}
    </div>
  )
}
