"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'

interface Artwork {
  id: string
  title: string
  thumbnail: string
  tag: string
  year: number
  featured: boolean
  published?: boolean
}

export default function AdminDashboard() {
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/artworks')
      .then(res => res.json())
      .then(data => {
        setArtworks(data)
        setLoading(false)
      })
  }, [])

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This also removes its uploaded images from R2.`)) return

    const request = fetch(`/api/artworks/${id}`, { method: 'DELETE' }).then(async (res) => {
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Delete failed')
      }
    })

    toast.promise(request, {
      loading: 'Deleting…',
      success: () => {
        setArtworks((prev) => prev.filter((a) => a.id !== id))
        return `Deleted "${title}"`
      },
      error: (err: Error) => err.message,
    })
  }

  if (loading) {
    return <div className="text-center py-12 dark:text-white">Loading...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-display font-semibold dark:text-white">Artwork Management</h1>
        <Link
          href="/admin/artworks/new"
          className="bg-primary text-background-dark px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-xl">add</span>
          New Artwork
        </Link>
      </div>

      {artworks.length === 0 ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          No artworks available.
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium dark:text-white">Image</th>
                <th className="px-4 py-3 text-left text-sm font-medium dark:text-white">Title</th>
                <th className="px-4 py-3 text-left text-sm font-medium dark:text-white">Tag</th>
                <th className="px-4 py-3 text-left text-sm font-medium dark:text-white">Year</th>
                <th className="px-4 py-3 text-left text-sm font-medium dark:text-white">Featured</th>
                <th className="px-4 py-3 text-right text-sm font-medium dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {artworks.map((artwork) => (
                <tr key={artwork.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-4 py-3">
                    <div className="w-12 h-12 relative rounded overflow-hidden">
                      <Image
                        src={artwork.thumbnail}
                        alt={artwork.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium dark:text-white">
                    <span className="flex items-center gap-2">
                      {artwork.title}
                      {artwork.published === false && (
                        <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
                          Draft
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      {artwork.tag}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{artwork.year}</td>
                  <td className="px-4 py-3">
                    {artwork.featured && (
                      <span className="material-symbols-outlined text-primary">star</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/artworks/${artwork.id}`}
                      className="text-primary hover:underline mr-3"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(artwork.id, artwork.title)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
