import Image from "next/image";
import Link from "next/link";
import { Artwork, ItemTag } from "@/types";

interface ArtworkCardProps {
  artwork: Artwork;
}

const tagLabels: Record<ItemTag, string> = {
  "selected-works": "SELECTED",
  "drawings": "DRAWINGS",
  "paintings": "PAINTINGS",
  "digital": "DIGITAL",
  "wip": "WIP",
  "sketchbook": "SKETCHBOOK",
};

export function ArtworkCard({ artwork }: ArtworkCardProps) {
  return (
    <Link
      href={`/portfolio/${artwork.slug}`}
      className="flex flex-col group"
    >
      <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={artwork.thumbnail}
          alt={artwork.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="mt-3 text-center">
        <h3 className="text-sm font-semibold dark:text-white">{artwork.title}</h3>
        <p className="text-[10px] text-primary uppercase tracking-wider mt-1">
          {tagLabels[artwork.tag]}
        </p>
      </div>
    </Link>
  );
}
