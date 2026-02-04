"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { useFavorites } from "@/lib/hooks/useFavorites";

interface ArtworkPageHeaderProps {
  slug: string;
}

export function ArtworkPageHeader({ slug }: ArtworkPageHeaderProps) {
  const { isFavorited, toggleFavorite } = useFavorites();

  const handleShare = async () => {
    const url = window.location.href;
    const title = document.title;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (e) {
        // User cancelled or share failed
        if ((e as Error).name !== "AbortError") {
          // Fallback to clipboard
          await navigator.clipboard.writeText(url);
          alert("Link copied to clipboard!");
        }
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      } catch {
        // Final fallback
        prompt("Copy this link:", url);
      }
    }
  };

  const handleFavorite = () => {
    toggleFavorite(slug);
  };

  return (
    <PageHeader
      variant={{
        type: "back-actions",
        showShare: true,
        showFavorite: true,
        onShare: handleShare,
        onFavorite: handleFavorite,
        isFavorited: isFavorited(slug),
      }}
    />
  );
}
