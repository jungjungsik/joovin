"use client"

import { useState } from 'react'

interface MultiTextAreaProps {
  value: string[]
  onChange: (texts: string[]) => void
  label: string
  description?: string
  placeholder?: string
  maxItems?: number
  rows?: number
}

export function MultiTextArea({
  value = [],
  onChange,
  label,
  description,
  placeholder = 'Enter text...',
  maxItems = 5,
  rows = 4
}: MultiTextAreaProps) {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)

  const handleAdd = () => {
    if (value.length < maxItems) {
      onChange([...value, ''])
    }
  }

  const handleDelete = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  const handleMoveUp = (index: number) => {
    if (index === 0) return
    const newTexts = [...value]
    ;[newTexts[index - 1], newTexts[index]] = [newTexts[index], newTexts[index - 1]]
    onChange(newTexts)
  }

  const handleMoveDown = (index: number) => {
    if (index === value.length - 1) return
    const newTexts = [...value]
    ;[newTexts[index], newTexts[index + 1]] = [newTexts[index + 1], newTexts[index]]
    onChange(newTexts)
  }

  const handleChange = (index: number, text: string) => {
    const newTexts = [...value]
    newTexts[index] = text
    onChange(newTexts)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">{label}</label>
          {description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>
          )}
        </div>
        <button
          type="button"
          onClick={handleAdd}
          disabled={value.length >= maxItems}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-primary text-background-dark rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-base">add</span>
          Add Paragraph
        </button>
      </div>

      <div className="space-y-4 mt-4">
        {value.map((text, index) => (
          <div
            key={index}
            className={`relative bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border transition-all ${
              focusedIndex === index
                ? 'border-primary shadow-md'
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            {/* Header with number badge and controls */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Paragraph {index + 1}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Move up"
                  title="Move up"
                >
                  <span className="material-symbols-outlined text-lg">arrow_upward</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleMoveDown(index)}
                  disabled={index === value.length - 1}
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Move down"
                  title="Move down"
                >
                  <span className="material-symbols-outlined text-lg">arrow_downward</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(index)}
                  className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 rounded-lg transition-colors"
                  aria-label="Delete"
                  title="Delete paragraph"
                >
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            </div>

            {/* Text area */}
            <textarea
              value={text}
              onChange={(e) => handleChange(index, e.target.value)}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(null)}
              placeholder={placeholder}
              rows={rows}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 resize-y focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />

            {/* Character count hint */}
            {text.length > 0 && (
              <div className="mt-2 text-xs text-gray-400 dark:text-gray-500 text-right">
                {text.length} characters
              </div>
            )}
          </div>
        ))}
      </div>

      {value.length === 0 && (
        <div className="text-center py-12 text-gray-400 dark:text-gray-500 text-sm bg-gray-50 dark:bg-gray-900 rounded-xl border border-dashed border-gray-300 dark:border-gray-600">
          <span className="material-symbols-outlined text-3xl mb-2 opacity-50 block">edit_note</span>
          Click the "Add Paragraph" button above to add text sections
        </div>
      )}

      {value.length > 0 && (
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-right">
          {value.length} / {maxItems} paragraphs
        </div>
      )}
    </div>
  )
}
