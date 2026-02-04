"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { HeroIllustration } from "@/components/home/HeroIllustration";
import { ArtistStatement } from "@/components/home/ArtistStatement";
import { SelectedWorks } from "@/components/home/SelectedWorks";
import { HomeFooter } from "@/components/home/HomeFooter";
import { getFeaturedArtworks } from "@/lib/data/artworks";
import { Artwork } from "@/types";

export default function HomePage() {
  const [featuredArtworks, setFeaturedArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    getFeaturedArtworks().then(setFeaturedArtworks);
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark">
      <PageHeader
        variant={{ type: "home", title: "Joovin NAM", aboutLink: true }}
      />

      <main className="flex flex-col flex-1">
        <HeroIllustration />

        <ArtistStatement
          quote="My work explores the intersection of creative process and authenticity, using traditional mediums to express contemporary themes of human connection."
        />

        <SelectedWorks artworks={featuredArtworks} />
      </main>

      <HomeFooter />
    </div>
  );
}
