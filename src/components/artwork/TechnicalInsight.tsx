import Image from "next/image";

interface TechnicalInsightProps {
  quote?: string;
  detailImage?: string;
}

export function TechnicalInsight({ quote, detailImage }: TechnicalInsightProps) {
  return (
    <section className="px-6 lg:px-0 py-10 max-w-4xl mx-auto space-y-6">
      {/* Detail Image */}
      {detailImage && (
        <div className="relative aspect-square lg:max-w-2xl lg:mx-auto rounded-xl overflow-hidden ios-shadow">
          <Image
            src={detailImage}
            alt="Technical detail of the artwork"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
          />
        </div>
      )}

      {/* Section Label */}
      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
        Technical Insight
      </h3>

      {/* Quote - only show if exists */}
      {quote && (
        <blockquote className="serif-text text-lg italic text-gray-800 dark:text-gray-50 leading-relaxed">
          &ldquo;{quote}&rdquo;
        </blockquote>
      )}
    </section>
  );
}
