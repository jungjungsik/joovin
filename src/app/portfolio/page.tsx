import { PageHeader } from "@/components/layout/PageHeader";
import { BottomTabBar, PORTFOLIO_TABS } from "@/components/layout/BottomTabBar";
import { ArchiveHeader } from "@/components/portfolio/ArchiveHeader";
import { FilterableArtworkGrid } from "@/components/portfolio/FilterableArtworkGrid";
import { getArtworksServer } from "@/lib/data/artworks.server";

export const revalidate = 60;

export default async function PortfolioPage() {
  const artworks = await getArtworksServer();

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark">
      <PageHeader variant={{ type: "back-search", title: "PORTFOLIO" }} />

      <main className="flex-1">
        <ArchiveHeader />
        <FilterableArtworkGrid artworks={artworks} />
      </main>

      <BottomTabBar tabs={PORTFOLIO_TABS} />
    </div>
  );
}
