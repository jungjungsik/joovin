// Resolve the canonical public URL for this deployment.
//
// Order of precedence:
//   1. NEXT_PUBLIC_SITE_URL  — explicit override (use this in production)
//   2. VERCEL_URL            — auto-set by Vercel for preview deployments
//                              (no scheme, so we prepend https://)
//   3. localhost fallback    — for `next dev`
//
// Always returns a value with no trailing slash.
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return stripTrailing(explicit);

  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${stripTrailing(vercel)}`;

  return "http://localhost:3000";
}

function stripTrailing(url: string): string {
  return url.replace(/\/+$/, "");
}
