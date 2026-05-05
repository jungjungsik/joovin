"use client";

import { useState } from "react";
import { FilterPills, FILTER_CATEGORIES } from "./FilterPills";
import { ArtworkGrid } from "./ArtworkGrid";
import type { Artwork, FilterCategory } from "@/types";

interface FilterableArtworkGridProps {
  artworks: Artwork[];
}

export function FilterableArtworkGrid({ artworks }: FilterableArtworkGridProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");

  const filtered =
    activeFilter === "all"
      ? artworks
      : artworks.filter((a) => a.tag === activeFilter);

  return (
    <>
      <FilterPills
        categories={FILTER_CATEGORIES}
        active={activeFilter}
        onChange={setActiveFilter}
      />

      {filtered.length === 0 ? (
        <div className="flex justify-center py-12">
          <div className="text-gray-700 dark:text-white">No artworks available.</div>
        </div>
      ) : (
        <ArtworkGrid artworks={filtered} />
      )}
    </>
  );
}
