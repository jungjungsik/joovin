import "server-only";

import { createClient as createSupabaseClient, SupabaseClient } from "@supabase/supabase-js";

// Cookie-less anonymous client for SSG/ISR of public pages.
//
// Why a separate client? `@supabase/ssr`'s `createServerClient` reads
// cookies() to manage user sessions, which forces Next.js to opt the
// route into dynamic rendering. Public reads (artworks, site_settings)
// don't need a session, so we use the plain anon-key client here and
// keep prerendering enabled.

let cached: SupabaseClient | null = null;

export function getAnonClient(): SupabaseClient {
  if (cached) return cached;
  cached = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    },
  );
  return cached;
}
