"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageGallery } from "./ImageGallery";

interface GenesisSectionProps {
  images: string[];
  description?: string;
}

export function GenesisSection({ images, description }: GenesisSectionProps) {
  const [viewMode, setViewMode] = useState<"gallery" | "grid">(
    images.length > 4 ? "gallery" : "grid"
  );

  const toggleView = () => {
    setViewMode((prev) => (prev === "gallery" ? "grid" : "gallery"));
  };

  const showToggle = images.length > 4;

  return (
    <section className="bg-gray-50 dark:bg-[#2a2618] py-12">
      <div className="px-6 lg:px-0 max-w-6xl mx-auto space-y-6">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            {/* Section Label */}
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold-muted dark:text-gray-400">
              The Genesis
            </h3>

            {/* Section Title */}
            <h2 className="text-2xl font-bold text-muted-gray dark:text-white">
              Preliminary Ideation
            </h2>
          </div>

          {/* View Toggle Button */}
          {showToggle && (
            <button
              onClick={toggleView}
              aria-label={`Switch to ${viewMode === "gallery" ? "grid" : "gallery"} view`}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-black/40 ios-shadow hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-200 group"
              style={{
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <span className="text-sm font-medium text-muted-gray dark:text-gray-200 group-hover:text-primary transition-colors">
                {viewMode === "gallery" ? "Grid" : "Gallery"}
              </span>
              <span
                className="material-symbols-outlined text-muted-gray dark:text-gray-200 group-hover:text-primary transition-all duration-300"
                style={{
                  transform: viewMode === "gallery" ? "rotate(0deg)" : "rotate(180deg)",
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {viewMode === "gallery" ? "grid_view" : "view_carousel"}
              </span>
            </button>
          )}
        </div>

        {/* Content: Gallery or Grid */}
        {viewMode === "gallery" && images.length > 4 ? (
          <ImageGallery images={images} aspectRatio="aspect-[4/5]" />
        ) : (
          /* Process Images Grid */
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {images.map((src, index) => (
              <div
                key={index}
                className="relative aspect-[3/4] rounded-xl overflow-hidden ios-shadow"
              >
                <Image
                  src={src}
                  alt={`Process image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
            ))}
          </div>
        )}

        {/* Description */}
        {description && (
          <p className="text-gray-800 dark:text-gray-50 leading-relaxed text-sm">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
