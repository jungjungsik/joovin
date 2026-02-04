import Image from "next/image";
import Link from "next/link";
import { Artwork } from "@/types";

interface SelectedWorksProps {
  artworks: Artwork[];
}

export function SelectedWorks({ artworks = [] }: SelectedWorksProps) {
  if (!artworks || artworks.length === 0) {
    return null;
  }

  return (
    <section className="px-6 pb-12">
      <h3 className="text-muted-gray dark:text-white text-[10px] font-bold uppercase tracking-[0.3em] mb-6 text-center">
        Selected Works
      </h3>
      <div className="grid grid-cols-1 gap-12">
        {artworks.map((artwork) => (
          <Link
            key={artwork.id}
            href={`/portfolio/${artwork.slug}`}
            className="flex flex-col space-y-3 group"
          >
            <div className="w-full aspect-square relative rounded-lg overflow-hidden">
              <Image
                src={artwork.thumbnail}
                alt={artwork.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs font-semibold tracking-wide">{artwork.title}</span>
              <span className="text-[10px] text-gray-600 dark:text-white italic">
                {artwork.medium}, {artwork.year}
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex px-4 py-12 justify-center">
        <Link
          href="/portfolio"
          className="group flex items-center justify-center h-10 px-4 bg-transparent text-muted-gray dark:text-gray-50 text-xs font-bold uppercase tracking-[0.2em]"
        >
          <span className="border-b-2 border-primary pb-1">View Full Portfolio</span>
        </Link>
      </div>
    </section>
  );
}
