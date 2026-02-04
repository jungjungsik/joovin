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
    <section className="px-6 py-6 space-y-4">
      <h1 className="text-[32px] font-bold leading-tight text-muted-gray dark:text-gray-100">
        {title}
      </h1>

      <GoldUnderline width="w-12" />

      {subtitle && (
        <ArtworkTag label={subtitle} />
      )}

      <p className="text-gold-muted text-sm tracking-wide">
        {metaParts}
      </p>
    </section>
  );
}
