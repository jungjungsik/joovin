import { MetadataRoute } from "next";
import { getArtworksServer } from "@/lib/data/artworks.server";
import { getSiteUrl } from "@/lib/siteUrl";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();
  const artworks = await getArtworksServer();

  const artworkUrls = artworks.map((artwork) => ({
    url: `${baseUrl}/portfolio/${artwork.slug}`,
    // Use the row's updated_at when available so search engines only re-crawl
    // entries that actually changed — falling back to the build time keeps
    // freshly-imported rows visible.
    lastModified: artwork.updatedAt ? new Date(artwork.updatedAt) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    ...artworkUrls,
  ];
}
