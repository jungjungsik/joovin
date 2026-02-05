import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArtworkHero,
  ArtworkMeta,
  ArtworkDescription,
  GenesisSection,
  TechnicalInsight,
  StudioEnvironmentCard,
  ReflectiveText,
  UpNextSection,
  ArtworkPageHeader,
  BackToPortfolio,
} from "@/components/artwork";
import { getAllSlugs, getArtworkBySlug, getAdjacentArtworks } from "@/lib/data/artworks";

// Revalidate pages every 60 seconds to pick up content changes
export const revalidate = 60;

interface ArtworkPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all artworks
export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({
  params,
}: ArtworkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const artwork = await getArtworkBySlug(slug);

  if (!artwork) {
    return {
      title: "Artwork Not Found",
    };
  }

  return {
    title: `${artwork.title} | A. Sterling`,
    description: artwork.description,
    openGraph: {
      title: artwork.title,
      description: artwork.description,
      images: [artwork.heroImage],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: artwork.title,
      description: artwork.description,
      images: [artwork.heroImage],
    },
  };
}

export default async function ArtworkPage({ params }: ArtworkPageProps) {
  const { slug } = await params;
  const artwork = await getArtworkBySlug(slug);

  if (!artwork) {
    notFound();
  }

  const { next } = await getAdjacentArtworks(slug);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark">
      {/* Sticky Header with Back + Actions */}
      <ArtworkPageHeader slug={slug} />

      <main className="flex flex-col flex-1 pb-24">
        {/* Hero Image */}
        <ArtworkHero src={artwork.heroImage} alt={artwork.title} />

        {/* Title, Tag, and Meta Info */}
        <ArtworkMeta
          title={artwork.title}
          subtitle={artwork.subtitle}
          medium={artwork.medium}
          dimensions={artwork.dimensions}
          season={artwork.season}
        />

        {/* Main Description */}
        <ArtworkDescription text={artwork.description} />

        {/* Genesis Section - Only if process images exist */}
        {artwork.processImages && artwork.processImages.length > 0 && (
          <GenesisSection
            images={artwork.processImages}
            description="Initial sketches and compositional studies exploring the relationship between form and negative space."
          />
        )}

        {/* Technical Insight - Only if insight text exists */}
        {artwork.technicalInsight && (
          <TechnicalInsight
            quote={artwork.technicalInsight}
            detailImage={artwork.technicalInsightImage}
          />
        )}

        {/* Studio Environment Card - Only if studio image exists */}
        {artwork.studioImage && (
          <StudioEnvironmentCard
            image={artwork.studioImage}
            description={artwork.studioText}
          />
        )}

        {/* Reflective Text - Only if reflection exists */}
        {artwork.reflection && (
          <ReflectiveText text={artwork.reflection} />
        )}

        {/* Back to Portfolio Button */}
        <BackToPortfolio />

        {/* Up Next Section - Only if there's a next artwork */}
        {next && <UpNextSection artwork={next} />}
      </main>
    </div>
  );
}
