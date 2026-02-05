import Link from "next/link";
import { Artwork } from "@/types";

interface UpNextSectionProps {
  artwork: Artwork;
}

export function UpNextSection({ artwork }: UpNextSectionProps) {
  return (
    <section className="border-t border-gray-200 dark:border-gray-700">
      <Link
        href={`/portfolio/${artwork.slug}`}
        className="block p-8 bg-gray-50 dark:bg-[#1a170e] hover:bg-gray-100 dark:hover:bg-[#252113] transition-colors group"
      >
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            {/* Label */}
            <p className="text-xs font-bold uppercase tracking-widest text-gold-muted dark:text-gray-400">
              Up Next
            </p>

            {/* Title */}
            <span className="text-xl font-bold text-muted-gray dark:text-white group-hover:text-primary transition-colors">
              {artwork.title}
            </span>

            {/* Subtitle */}
            {artwork.subtitle && (
              <p className="text-sm text-gold-muted dark:text-gray-400">
                {artwork.subtitle}
              </p>
            )}
          </div>

          {/* Arrow Icon */}
          <span className="material-symbols-outlined text-primary text-2xl group-hover:translate-x-1 transition-transform">
            arrow_forward_ios
          </span>
        </div>
      </Link>
    </section>
  );
}
