"use client"

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

interface AdminSidebarProps {
  user: User
}

export function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  const navItems = [
    { href: '/admin', label: '대시보드', icon: 'dashboard' },
    { href: '/admin/artworks/new', label: '작품 등록', icon: 'add_photo_alternate' },
  ]

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:block">
      <div className="p-6">
        <Link href="/" className="text-xl font-display font-semibold text-primary">
          Joovin NAM
        </Link>
        <p className="text-xs text-gray-500 mt-1">Admin Panel</p>
      </div>

      <nav className="px-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
              pathname === item.href
                ? 'bg-primary/10 text-primary'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-sm text-gray-500 mb-2 truncate">{user.email}</div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors"
        >
          <span className="material-symbols-outlined text-xl">logout</span>
          로그아웃
        </button>
      </div>
    </aside>
  )
}
