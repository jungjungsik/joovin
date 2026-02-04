"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { BottomTabBar, PORTFOLIO_TABS } from "@/components/layout/BottomTabBar";
import { ArchiveHeader } from "@/components/portfolio/ArchiveHeader";
import { FilterPills, FILTER_CATEGORIES } from "@/components/portfolio/FilterPills";
import { ArtworkGrid } from "@/components/portfolio/ArtworkGrid";
import { getArtworks } from "@/lib/data/artworks";
import { Artwork, FilterCategory } from "@/types";

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArtworks().then((data) => {
      setArtworks(data);
      setLoading(false);
    });
  }, []);

  const filteredArtworks = activeFilter === "all"
    ? artworks
    : artworks.filter(a => a.tag === activeFilter);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <PageHeader variant={{ type: "back-search", title: "PORTFOLIO" }} />

      <main className="flex-1">
        <ArchiveHeader />

        <FilterPills
          categories={FILTER_CATEGORIES}
          active={activeFilter}
          onChange={setActiveFilter}
        />

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="text-gray-700 dark:text-gray-100">Loading...</div>
          </div>
        ) : filteredArtworks.length === 0 ? (
          <div className="flex justify-center py-12">
            <div className="text-gray-700 dark:text-gray-100">등록된 작품이 없습니다.</div>
          </div>
        ) : (
          <ArtworkGrid artworks={filteredArtworks} />
        )}
      </main>

      <BottomTabBar tabs={PORTFOLIO_TABS} />
    </div>
  );
}
