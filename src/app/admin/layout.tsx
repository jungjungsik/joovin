import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AdminSidebar } from '@/components/admin/AdminSidebar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Allow login page without auth
  // Middleware handles redirect for other pages

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background-dark">
      {user ? (
        <div className="flex">
          <AdminSidebar user={user} />
          <main className="flex-1 p-6 md:p-8 ml-0 md:ml-64 pt-20 md:pt-6">
            {children}
          </main>
        </div>
      ) : (
        children
      )}
    </div>
  )
}
