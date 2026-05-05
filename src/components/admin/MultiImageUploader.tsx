"use client"

import { useState, useCallback, useEffect, useRef } from 'react'
import { toast } from 'sonner'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { compressImage } from '@/lib/utils/imageCompress'

interface MultiImageUploaderProps {
  value: string[]
  onChange: (urls: string[]) => void
  label: string
  description?: string
  maxImages?: number
}

// We pair each url with a stable internal id so dnd-kit can track items
// across reorders/uploads/deletes. The parent only sees urls.
interface Slot {
  id: string
  url: string
}

function freshId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `slot-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function buildSlots(urls: string[]): Slot[] {
  return urls.map((url) => ({ id: freshId(), url }))
}

export function MultiImageUploader({
  value = [],
  onChange,
  label,
  description,
  maxImages = 30,
}: MultiImageUploaderProps) {
  const [slots, setSlots] = useState<Slot[]>(() => buildSlots(value))
  const [uploadingId, setUploadingId] = useState<string | null>(null)
  const [dragOverId, setDragOverId] = useState<string | null>(null)
  const lastEmitted = useRef<string[]>(value)

  // If the parent passes in a different value than what we emitted (typical
  // on initial form hydration / artwork switch), rebuild slots from scratch.
  useEffect(() => {
    const sameAsEmitted =
      lastEmitted.current.length === value.length &&
      lastEmitted.current.every((u, i) => u === value[i])
    if (sameAsEmitted) return
    setSlots(buildSlots(value))
    lastEmitted.current = value
  }, [value])

  const emit = useCallback(
    (next: Slot[]) => {
      setSlots(next)
      const urls = next.map((s) => s.url)
      lastEmitted.current = urls
      onChange(urls)
    },
    [onChange],
  )

  const sensors = useSensors(
    useSensor(PointerSensor, {
      // Require a small drag distance so quick clicks (delete, upload)
      // don't get swallowed.
      activationConstraint: { distance: 6 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = slots.findIndex((s) => s.id === active.id)
    const newIndex = slots.findIndex((s) => s.id === over.id)
    if (oldIndex < 0 || newIndex < 0) return
    emit(arrayMove(slots, oldIndex, newIndex))
  }

  const handleUpload = useCallback(
    async (file: File, slotId: string) => {
      setUploadingId(slotId)
      const prepared = await compressImage(file)
      const formData = new FormData()
      formData.append('file', prepared)

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })
        const data = await res.json()
        if (data.url) {
          setSlots((prev) => {
            const next = prev.map((s) => (s.id === slotId ? { ...s, url: data.url } : s))
            const urls = next.map((s) => s.url)
            lastEmitted.current = urls
            onChange(urls)
            return next
          })
        } else {
          toast.error(data.error || 'Upload failed')
        }
      } catch {
        toast.error('Upload failed')
      } finally {
        setUploadingId(null)
      }
    },
    [onChange],
  )

  const handleAdd = () => {
    if (slots.length >= maxImages) return
    emit([...slots, { id: freshId(), url: '' }])
  }

  const handleDelete = (id: string) => {
    emit(slots.filter((s) => s.id !== id))
  }

  const clearUrl = (id: string) => {
    emit(slots.map((s) => (s.id === id ? { ...s, url: '' } : s)))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div>
          <label className="block text-sm font-medium dark:text-white">{label}</label>
          {description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>
          )}
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Drag the handle on each card to reorder.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          disabled={slots.length >= maxImages}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-primary text-background-dark rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-base">add</span>
          Add Image
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={slots.map((s) => s.id)} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {slots.map((slot, index) => (
              <SortableSlot
                key={slot.id}
                slot={slot}
                index={index}
                isUploading={uploadingId === slot.id}
                isDragOver={dragOverId === slot.id}
                onDragOver={() => setDragOverId(slot.id)}
                onDragLeave={() => setDragOverId(null)}
                onFileDrop={(file) => {
                  setDragOverId(null)
                  handleUpload(file, slot.id)
                }}
                onFileSelect={(file) => handleUpload(file, slot.id)}
                onDelete={() => handleDelete(slot.id)}
                onClear={() => clearUrl(slot.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {slots.length === 0 && (
        <div className="text-center py-12 text-gray-400 dark:text-gray-500 text-sm">
          Click the &quot;Add Image&quot; button above to add images
        </div>
      )}

      {slots.length > 0 && (
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-right">
          {slots.length} / {maxImages} images
        </div>
      )}
    </div>
  )
}

interface SortableSlotProps {
  slot: Slot
  index: number
  isUploading: boolean
  isDragOver: boolean
  onDragOver: () => void
  onDragLeave: () => void
  onFileDrop: (file: File) => void
  onFileSelect: (file: File) => void
  onDelete: () => void
  onClear: () => void
}

function SortableSlot({
  slot,
  index,
  isUploading,
  isDragOver,
  onDragOver,
  onDragLeave,
  onFileDrop,
  onFileSelect,
  onDelete,
  onClear,
}: SortableSlotProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: slot.id })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-500 dark:text-gray-400 touch-none"
            aria-label="Drag to reorder"
          >
            <span className="material-symbols-outlined text-lg">drag_indicator</span>
          </button>
          <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
            {index + 1}
          </div>
        </div>
        <button
          type="button"
          onClick={onDelete}
          className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 rounded-lg transition-colors"
          aria-label="Delete"
        >
          <span className="material-symbols-outlined text-lg">delete</span>
        </button>
      </div>

      {/* Image Upload Area */}
      {slot.url ? (
        <div className="relative rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slot.url}
            alt={`Image ${index + 1}`}
            className="block max-w-full h-auto max-h-[50vh] w-auto mx-auto"
          />
          <button
            type="button"
            onClick={onClear}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
            aria-label="Remove image"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault()
            onDragOver()
          }}
          onDragLeave={onDragLeave}
          onDrop={(e) => {
            e.preventDefault()
            const file = e.dataTransfer.files[0]
            if (file && file.type.startsWith('image/')) {
              onFileDrop(file)
            }
          }}
          className={`relative border-2 border-dashed rounded-xl overflow-hidden transition-colors min-h-[200px] ${
            isDragOver
              ? 'border-primary bg-primary/5'
              : 'border-gray-300 dark:border-gray-600'
          }`}
        >
          <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            {isUploading ? (
              <div className="text-primary font-medium">Uploading...</div>
            ) : (
              <>
                <span className="material-symbols-outlined text-4xl text-gray-400 dark:text-gray-500 mb-2">
                  cloud_upload
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Click to upload or drag
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  JPG, PNG, WebP
                </span>
              </>
            )}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/x-png"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) onFileSelect(file)
              }}
              className="hidden"
            />
          </label>
        </div>
      )}
    </div>
  )
}
