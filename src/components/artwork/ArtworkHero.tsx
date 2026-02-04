import Image from "next/image";

interface ArtworkHeroProps {
  src: string;
  alt: string;
}

export function ArtworkHero({ src, alt }: ArtworkHeroProps) {
  return (
    <section className="relative w-full min-h-[500px] overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      {/* Gradient overlay for text legibility */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
