import { GoldUnderline } from "@/components/ui/GoldUnderline";
import { ArtworkTag } from "./ArtworkTag";

interface ArtworkMetaProps {
  title: string;
  subtitle?: string;
  medium: string;
  dimensions: string;
  season?: string;
}

export function ArtworkMeta({
  title,
  subtitle,
  medium,
  dimensions,
  season,
}: ArtworkMetaProps) {
  const metaParts = [medium, dimensions, season].filter(Boolean).join(" • ");

  return (
    <section className="px-6 lg:px-0 py-6 max-w-6xl mx-auto">
      <div className="space-y-4">
        <h1 className="text-[32px] lg:text-4xl font-bold leading-tight text-muted-gray dark:text-white">
          {title}
        </h1>

        <GoldUnderline width="w-12" />

        {subtitle && (
          <ArtworkTag label={subtitle} />
        )}

        <p className="text-gold-muted text-sm tracking-wide">
          {metaParts}
        </p>
      </div>
    </section>
  );
}
