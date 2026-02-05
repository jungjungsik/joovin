"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
  title?: string;
  aspectRatio?: string;
  onImageClick?: (index: number) => void;
}

export function ImageGallery({
  images,
  title,
  aspectRatio = "aspect-[4/5]",
  onImageClick,
}: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance (in px) to trigger navigation
  const minSwipeDistance = 50;

  // Navigation functions
  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [images.length, isTransitioning]);

  const goToPrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [images.length, isTransitioning]);

  const goToIndex = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentIndex) return;
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 300);
    },
    [currentIndex, isTransitioning]
  );

  // Touch handlers for swipe detection
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrev();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev]);

  // Handle empty or invalid arrays
  if (!images || images.length === 0) {
    return null;
  }

  const isSingleImage = images.length === 1;

  return (
    <div className="relative w-full group" ref={containerRef}>
      {/* Main Image Container */}
      <div
        className={`relative w-full ${aspectRatio} rounded-xl overflow-hidden ios-shadow`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <button
          onClick={() => onImageClick?.(currentIndex)}
          className={`w-full h-full transition-opacity duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          } ${onImageClick ? "group/image" : ""}`}
          style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }}
          aria-label={`View image ${currentIndex + 1} full screen`}
          disabled={!onImageClick}
        >
          <Image
            src={images[currentIndex]}
            alt={
              title
                ? `${title} - Image ${currentIndex + 1} of ${images.length}`
                : `Image ${currentIndex + 1} of ${images.length}`
            }
            fill
            className="object-cover transition-transform duration-300 group-hover/image:scale-105"
            sizes="(max-width: 768px) 100vw, 90vw"
            priority={currentIndex === 0}
            quality={90}
          />
          {/* Hover overlay for clickable images */}
          {onImageClick && (
            <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-4xl opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
                fullscreen
              </span>
            </div>
          )}
        </button>

        {/* Navigation Arrows - Desktop Only */}
        {!isSingleImage && (
          <>
            {/* Left Arrow */}
            <button
              onClick={goToPrev}
              aria-label="Previous image"
              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 items-center justify-center w-12 h-12 rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-sm ios-shadow opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-primary hover:scale-110 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary"
              style={{
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <span className="material-symbols-outlined text-muted-gray dark:text-white">
                chevron_left
              </span>
            </button>

            {/* Right Arrow */}
            <button
              onClick={goToNext}
              aria-label="Next image"
              className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 items-center justify-center w-12 h-12 rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-sm ios-shadow opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-primary hover:scale-110 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary"
              style={{
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <span className="material-symbols-outlined text-muted-gray dark:text-white">
                chevron_right
              </span>
            </button>
          </>
        )}

        {/* Page Counter */}
        {!isSingleImage && (
          <div className="absolute bottom-4 right-4 px-3 py-1 rounded-lg bg-white/80 dark:bg-black/60 backdrop-blur-sm">
            <p className="font-serif text-sm text-muted-gray dark:text-white">
              {currentIndex + 1} / {images.length}
            </p>
          </div>
        )}
      </div>

      {/* Dot Indicators */}
      {!isSingleImage && (
        <div
          className="flex items-center justify-center gap-2 mt-4"
          role="tablist"
          aria-label="Image navigation"
        >
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              aria-label={`Go to image ${index + 1}`}
              aria-selected={index === currentIndex}
              role="tab"
              className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                index === currentIndex
                  ? "bg-primary scale-110"
                  : "bg-gray-400 dark:bg-gray-600 hover:scale-125"
              }`}
              style={{
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
