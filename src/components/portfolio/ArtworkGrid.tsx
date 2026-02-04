import { Artwork } from "@/types";
import { ArtworkCard } from "./ArtworkCard";

interface ArtworkGridProps {
  artworks: Artwork[];
}

export function ArtworkGrid({ artworks }: ArtworkGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 px-6 pb-24">
      {artworks.map((artwork) => (
        <ArtworkCard key={artwork.id} artwork={artwork} />
      ))}
    </div>
  );
}
