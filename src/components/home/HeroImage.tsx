import Image from "next/image";

interface HeroImageProps {
  src: string;
  alt: string;
}

export function HeroImage({ src, alt }: HeroImageProps) {
  return (
    <section className="px-6 py-4">
      <div className="w-full aspect-[4/5] relative rounded-xl overflow-hidden ios-shadow">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
}
