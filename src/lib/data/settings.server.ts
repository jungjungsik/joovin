import "server-only";

import { getAnonClient } from "@/lib/supabase/anon";

// Settings live in a flat key/value table (`site_settings`). The admin form
// JSON.stringifies array fields before storing them; this loader parses them
// back so callers receive proper types.
export interface PublicSettings {
  siteName: string;
  artistStatement: string;

  // Home
  homeHeroImage: string;

  // About
  name: string;
  title: string;
  classYear: string;
  school: string;
  graduationDate: string;
  interests: string[];
  processTitle: string;
  processText: string[];
  closingQuote: string;
  profileImages: string[];

  // Contact
  contactHeadline: string;
  email: string;
  instagramUrl: string;
  tiktokUrl: string;
  youtubeUrl: string;
  twitterUrl: string;
  behanceUrl: string;
  pinterestUrl: string;
  linkedinUrl: string;
  facebookUrl: string;
}

const DEFAULTS: PublicSettings = {
  siteName: "Joovin NAM",
  artistStatement:
    "My work explores the intersection of creative process and authenticity, using traditional mediums to express contemporary themes of human connection.",
  homeHeroImage: "",
  name: "",
  title: "",
  classYear: "",
  school: "",
  graduationDate: "",
  interests: [],
  processTitle: "",
  processText: [],
  closingQuote: "",
  profileImages: [],
  contactHeadline: "Let's talk art.",
  email: "",
  instagramUrl: "",
  tiktokUrl: "",
  youtubeUrl: "",
  twitterUrl: "",
  behanceUrl: "",
  pinterestUrl: "",
  linkedinUrl: "",
  facebookUrl: "",
};

const ARRAY_KEYS = ["interests", "processText", "profileImages"] as const;

function parseMaybeJsonArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((v) => typeof v === "string" && v.length > 0);
  if (typeof value === "string" && value) {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.filter((v) => typeof v === "string" && v.length > 0);
      }
    } catch {
      return [];
    }
  }
  return [];
}

export async function getSettingsServer(): Promise<PublicSettings> {
  const supabase = getAnonClient();
  const { data, error } = await supabase.from("site_settings").select("key, value");

  if (error || !data) {
    return DEFAULTS;
  }

  const raw: Record<string, string> = {};
  for (const row of data) {
    if (row.key) raw[row.key] = row.value;
  }

  const settings: PublicSettings = { ...DEFAULTS };
  for (const key of Object.keys(DEFAULTS) as Array<keyof PublicSettings>) {
    const v = raw[key];
    if (v === undefined) continue;

    if ((ARRAY_KEYS as readonly string[]).includes(key)) {
      (settings as unknown as Record<string, unknown>)[key] = parseMaybeJsonArray(v);
    } else {
      (settings as unknown as Record<string, unknown>)[key] = v;
    }
  }
  return settings;
}
