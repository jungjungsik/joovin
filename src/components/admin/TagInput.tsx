"use client"

import { useState, KeyboardEvent, useRef } from 'react'

interface TagInputProps {
  value: string[]
  onChange: (tags: string[]) => void
  label: string
  description?: string
  placeholder?: string
}

export function TagInput({ value = [], onChange, label, description, placeholder = "Add a tag..." }: TagInputProps) {
  const [inputValue, setInputValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input when container is clicked
  const handleContainerClick = () => {
    inputRef.current?.focus()
  }

  // Add tag handler with validation
  const addTag = (tag: string) => {
    const trimmedTag = tag.trim()

    // Validation: non-empty and no duplicates
    if (trimmedTag && !value.includes(trimmedTag)) {
      onChange([...value, trimmedTag])
      setInputValue('')
    } else if (value.includes(trimmedTag)) {
      // Visual feedback for duplicate - shake animation
      inputRef.current?.classList.add('shake')
      setTimeout(() => inputRef.current?.classList.remove('shake'), 500)
    }
  }

  // Handle Enter key and comma
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(inputValue)
    } else if (e.key === 'Backspace' && inputValue === '' && value.length > 0) {
      // Delete last tag on backspace when input is empty
      const newTags = [...value]
      newTags.pop()
      onChange(newTags)
    }
  }

  // Remove specific tag
  const removeTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove))
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
        {label}
      </label>
      {description && (
        <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">{description}</p>
      )}

      <div
        onClick={handleContainerClick}
        className={`relative min-h-[3rem] w-full rounded-lg border-2 transition-all duration-200 cursor-text bg-white dark:bg-gray-900 ${isFocused ? 'border-primary shadow-[0_0_0_3px_rgba(232,186,48,0.1)]' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}
      >
        <div className="flex flex-wrap gap-2 p-2.5 pr-20">
          {/* Tag Pills */}
          {value.map((tag, index) => (
            <div
              key={`${tag}-${index}`}
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/90 to-primary text-background-dark font-medium text-sm shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 border border-primary/20"
            >
              <span className="select-none">{tag}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  removeTag(tag)
                }}
                className="flex items-center justify-center w-4 h-4 rounded-full bg-background-dark/20 hover:bg-background-dark/40 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-background-dark/50"
                aria-label={`Remove ${tag}`}
              >
                <svg
                  className="w-3 h-3 text-background-dark"
                  fill="none"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}

          {/* Input Field */}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={value.length === 0 ? placeholder : ''}
            className="flex-1 min-w-[120px] bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm py-1"
          />
        </div>

        {/* Add Button */}
        {inputValue.trim() && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              addTag(inputValue)
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-md bg-primary hover:bg-primary/90 text-background-dark text-sm font-medium shadow-sm hover:shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            Add
          </button>
        )}
      </div>

      {/* Helper Text */}
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Press Enter or comma to add. Click × to remove.
      </p>

      {/* Shake animation style */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  )
}
