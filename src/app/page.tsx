"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { PageHeader } from "@/components/layout/PageHeader";
import { ArtistStatement } from "@/components/home/ArtistStatement";
import { SelectedWorks } from "@/components/home/SelectedWorks";
import { HomeFooter } from "@/components/home/HomeFooter";
import { getFeaturedArtworks } from "@/lib/data/artworks";
import { Artwork } from "@/types";

interface Settings {
  homeHeroImage?: string;
  artistStatement?: string;
}

export default function HomePage() {
  const [featuredArtworks, setFeaturedArtworks] = useState<Artwork[]>([]);
  const [settings, setSettings] = useState<Settings>({});

  useEffect(() => {
    getFeaturedArtworks().then(setFeaturedArtworks);

    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch((error) => console.error("Failed to fetch settings:", error));
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark">
      <PageHeader
        variant={{ type: "home", title: "Joovin NAM", aboutLink: true }}
      />

      <main className="flex flex-col flex-1">
        {settings.homeHeroImage && (
          <div className="relative w-full max-w-6xl mx-auto lg:px-8">
            <div className="relative w-full aspect-[4/5] lg:aspect-[3/2] lg:rounded-2xl overflow-hidden">
              <Image
                src={settings.homeHeroImage}
                alt="Hero"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        <ArtistStatement
          quote={
            settings.artistStatement ||
            "My work explores the intersection of creative process and authenticity, using traditional mediums to express contemporary themes of human connection."
          }
        />

        <SelectedWorks artworks={featuredArtworks} />
      </main>

      <HomeFooter />
    </div>
  );
}
