"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageGallery } from "./ImageGallery";
import { Lightbox } from "../ui/Lightbox";

interface GenesisSectionProps {
  images: string[];
  description?: string;
}

export function GenesisSection({ images, description }: GenesisSectionProps) {
  const [viewMode, setViewMode] = useState<"gallery" | "grid">(
    images.length > 4 ? "gallery" : "grid"
  );
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

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
          <ImageGallery
            images={images}
            aspectRatio="aspect-[4/5]"
            onImageClick={openLightbox}
          />
        ) : (
          /* Process Images Grid */
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {images.map((src, index) => (
              <button
                key={index}
                onClick={() => openLightbox(index)}
                className="relative aspect-[3/4] rounded-xl overflow-hidden ios-shadow cursor-pointer group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label={`View process image ${index + 1} full screen`}
              >
                <Image
                  src={src}
                  alt={`Process image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    fullscreen
                  </span>
                </div>
              </button>
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

      {/* Lightbox */}
      <Lightbox
        images={images}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
      />
    </section>
  );
}
