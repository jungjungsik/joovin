import "server-only";

import type { User } from "@supabase/supabase-js";

// Returns the email allowlist parsed from env. Empty array means
// "no allowlist configured" — callers must decide whether to fall
// back to permissive auth or fail closed.
export function getAdminEmails(): string[] {
  const raw = process.env.ADMIN_EMAILS;
  if (!raw) return [];
  return raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter((e) => e.length > 0);
}

// Whether the given Supabase user passes the admin gate.
//
// Policy: when ADMIN_EMAILS is configured, only those emails count as admin.
// When it isn't configured, any authenticated user is treated as admin so
// existing dev/preview environments don't break. A warning is logged once
// per process to surface the missing config in production.
let warned = false;

export function isAdminUser(user: User | null | undefined): boolean {
  if (!user || !user.email) return false;

  const allowlist = getAdminEmails();
  if (allowlist.length === 0) {
    if (!warned && process.env.NODE_ENV === "production") {
      warned = true;
      console.warn(
        "[auth] ADMIN_EMAILS is not set — any authenticated Supabase user can access /admin. Configure ADMIN_EMAILS to lock this down.",
      );
    }
    return true;
  }

  return allowlist.includes(user.email.toLowerCase());
}
