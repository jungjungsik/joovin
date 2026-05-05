import Image from "next/image";

interface ArtworkHeroProps {
  src: string;
  alt: string;
}

export function ArtworkHero({ src, alt }: ArtworkHeroProps) {
  // Bail out cleanly if the row has no usable image. next/image throws on an
  // empty src; the data layer normally falls back to thumbnail, but guarding
  // here keeps the page from crashing if both fields end up empty.
  if (!src) {
    return (
      <section
        className="relative w-full min-h-[500px] lg:max-h-[80vh] overflow-hidden bg-gray-50 dark:bg-[#1a170e] flex items-center justify-center"
        aria-label="Artwork image unavailable"
      >
        <span className="text-sm text-gray-500 dark:text-gray-400">No image available</span>
      </section>
    );
  }

  return (
    <section className="relative w-full min-h-[500px] lg:max-h-[80vh] overflow-hidden bg-gray-50 dark:bg-[#1a170e]">
      <div className="max-w-6xl mx-auto relative w-full h-full min-h-[500px] lg:max-h-[80vh]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          priority
          sizes="(max-width: 1024px) 100vw, 1152px"
        />
        {/* Gradient overlay for text legibility */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
