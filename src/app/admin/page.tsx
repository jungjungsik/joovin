"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Artwork {
  id: string
  title: string
  thumbnail: string
  tag: string
  year: number
  featured: boolean
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

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this artwork?')) return

    await fetch(`/api/artworks/${id}`, { method: 'DELETE' })
    setArtworks(artworks.filter(a => a.id !== id))
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-display font-semibold">Artwork Management</h1>
        <Link
          href="/admin/artworks/new"
          className="bg-primary text-background-dark px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-xl">add</span>
          New Artwork
        </Link>
      </div>

      {artworks.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No artworks available.
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">Image</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Title</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Tag</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Year</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Featured</th>
                <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
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
                  <td className="px-4 py-3 font-medium">{artwork.title}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      {artwork.tag}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{artwork.year}</td>
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
                      onClick={() => handleDelete(artwork.id)}
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
