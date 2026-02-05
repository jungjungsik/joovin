import { createClient } from "@/lib/supabase/client";

export interface SiteSettings {
  profileImage: string;
  homeHeroImage: string;
  siteName: string;
  artistStatement: string;
}

const DEFAULT_SETTINGS: SiteSettings = {
  profileImage: "",
  homeHeroImage: "",
  siteName: "Joovin NAM",
  artistStatement: "My work explores the intersection of creative process and authenticity, using traditional mediums to express contemporary themes of human connection.",
};

// Fetch all settings
export async function getSettings(): Promise<SiteSettings> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("key, value");

  if (error || !data) {
    console.error("Failed to fetch settings:", error);
    return DEFAULT_SETTINGS;
  }

  const settings = { ...DEFAULT_SETTINGS };
  data.forEach((row: { key: string; value: string }) => {
    if (row.key in settings) {
      (settings as Record<string, string>)[row.key] = row.value;
    }
  });

  return settings;
}

// Update a single setting
export async function updateSetting(key: string, value: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from("site_settings")
    .upsert({ key, value }, { onConflict: "key" });

  if (error) {
    console.error("Failed to update setting:", error);
    return false;
  }

  return true;
}

// Update multiple settings
export async function updateSettings(settings: Partial<SiteSettings>): Promise<boolean> {
  const supabase = createClient();
  const updates = Object.entries(settings).map(([key, value]) => ({
    key,
    value: value || "",
  }));

  const { error } = await supabase
    .from("site_settings")
    .upsert(updates, { onConflict: "key" });

  if (error) {
    console.error("Failed to update settings:", error);
    return false;
  }

  return true;
}
