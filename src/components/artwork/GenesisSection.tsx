import Image from "next/image";

interface GenesisSectionProps {
  images: string[];
  description?: string;
}

export function GenesisSection({ images, description }: GenesisSectionProps) {
  return (
    <section className="bg-gray-50 dark:bg-[#2a2618] py-12">
      <div className="px-6 space-y-6">
        {/* Section Label */}
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold-muted">
          The Genesis
        </h3>

        {/* Section Title */}
        <h2 className="text-2xl font-bold text-muted-gray dark:text-white">
          Preliminary Ideation
        </h2>

        {/* Process Images Grid */}
        <div className="grid grid-cols-2 gap-4">
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
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>

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
