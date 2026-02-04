import Image from "next/image";

interface TechnicalInsightProps {
  quote: string;
  detailImage?: string;
}

export function TechnicalInsight({ quote, detailImage }: TechnicalInsightProps) {
  return (
    <section className="px-6 py-10 space-y-6">
      {/* Detail Image */}
      {detailImage && (
        <div className="relative aspect-square rounded-xl overflow-hidden ios-shadow">
          <Image
            src={detailImage}
            alt="Technical detail of the artwork"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}

      {/* Section Label */}
      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
        Technical Insight
      </h3>

      {/* Quote */}
      <blockquote className="serif-text text-lg italic text-muted-gray dark:text-gray-200 leading-relaxed">
        &ldquo;{quote}&rdquo;
      </blockquote>
    </section>
  );
}
