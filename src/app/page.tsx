import Image from "next/image";
import { PageHeader } from "@/components/layout/PageHeader";
import { ArtistStatement } from "@/components/home/ArtistStatement";
import { SelectedWorks } from "@/components/home/SelectedWorks";
import { HomeFooter } from "@/components/home/HomeFooter";
import { getFeaturedArtworksServer } from "@/lib/data/artworks.server";
import { getSettingsServer } from "@/lib/data/settings.server";

export const revalidate = 60;

export default async function HomePage() {
  const [featuredArtworks, settings] = await Promise.all([
    getFeaturedArtworksServer(),
    getSettingsServer(),
  ]);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark">
      <PageHeader
        variant={{ type: "home", title: "JN Portfolio", aboutLink: true }}
      />

      <main className="flex flex-col flex-1">
        {settings.homeHeroImage && (
          <div className="relative w-full max-w-6xl mx-auto lg:px-8">
            <div className="relative w-full aspect-[4/5] lg:aspect-[3/2] lg:rounded-2xl overflow-hidden">
              <Image
                src={settings.homeHeroImage}
                alt="Hero"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        <ArtistStatement quote={settings.artistStatement} />

        <SelectedWorks artworks={featuredArtworks} />
      </main>

      <HomeFooter />
    </div>
  );
}
