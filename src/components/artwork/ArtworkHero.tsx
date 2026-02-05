import Image from "next/image";

interface ArtworkHeroProps {
  src: string;
  alt: string;
}

export function ArtworkHero({ src, alt }: ArtworkHeroProps) {
  return (
    <section className="relative w-full min-h-[500px] lg:max-h-[80vh] overflow-hidden">
      <div className="max-w-6xl mx-auto relative w-full h-full min-h-[500px] lg:max-h-[80vh]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
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
