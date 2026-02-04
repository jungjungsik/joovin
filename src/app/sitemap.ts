import { MetadataRoute } from "next";
import { artworks } from "@/lib/data/artworks";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://asterling.art";

  const artworkUrls = artworks.map((artwork) => ({
    url: `${baseUrl}/portfolio/${artwork.slug}`,
    lastModified: new Date(),
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
