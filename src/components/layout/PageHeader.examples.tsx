/**
 * PageHeader Component - Usage Examples
 *
 * This file demonstrates all 5 variants of the PageHeader component.
 * Do not import this file - it's for reference only.
 */

import { PageHeader } from './PageHeader';

// ============================================================================
// VARIANT 1: HOME
// ============================================================================
// Use case: Main landing page with title and about link
// Layout: Title (left) | Theme Toggle + About link (right)

export function HomePageExample() {
  return (
    <PageHeader
      variant={{
        type: "home",
        title: "A. STERLING",
        aboutLink: true,
      }}
    />
  );
}

// ============================================================================
// VARIANT 2: BACK-TITLE
// ============================================================================
// Use case: Detail pages with a title
// Layout: Back arrow | Title (center) | Empty space

export function DetailPageExample() {
  return (
    <PageHeader
      variant={{
        type: "back-title",
        title: "Artwork Details",
      }}
    />
  );
}

// ============================================================================
// VARIANT 3: BACK-SEARCH
// ============================================================================
// Use case: Searchable collection or gallery pages
// Layout: Back arrow | Title (center) | Search icon

export function GalleryPageExample() {
  const handleSearch = () => {
    console.log('Open search modal');
  };

  return (
    <PageHeader
      variant={{
        type: "back-search",
        title: "Gallery",
        onSearch: handleSearch,
      }}
    />
  );
}

// ============================================================================
// VARIANT 4: BACK-ACTIONS
// ============================================================================
// Use case: Artwork detail with social actions
// Layout: Back arrow | Spacer | Share + Favorite buttons

export function ArtworkDetailExample() {
  const handleShare = () => {
    console.log('Share artwork');
  };

  const handleFavorite = () => {
    console.log('Toggle favorite');
  };

  return (
    <>
      {/* Not favorited */}
      <PageHeader
        variant={{
          type: "back-actions",
          showShare: true,
          showFavorite: true,
          onShare: handleShare,
          onFavorite: handleFavorite,
          isFavorited: false,
        }}
      />

      {/* Favorited (icon filled with primary color) */}
      <PageHeader
        variant={{
          type: "back-actions",
          showShare: true,
          showFavorite: true,
          onShare: handleShare,
          onFavorite: handleFavorite,
          isFavorited: true,
        }}
      />

      {/* Only share button */}
      <PageHeader
        variant={{
          type: "back-actions",
          showShare: true,
          showFavorite: false,
          onShare: handleShare,
        }}
      />

      {/* Only favorite button */}
      <PageHeader
        variant={{
          type: "back-actions",
          showShare: false,
          showFavorite: true,
          onFavorite: handleFavorite,
          isFavorited: false,
        }}
      />
    </>
  );
}

// ============================================================================
// VARIANT 5: BACK-ONLY
// ============================================================================
// Use case: Minimal pages that only need navigation back
// Layout: Back arrow only

export function MinimalPageExample() {
  return (
    <PageHeader
      variant={{
        type: "back-only",
      }}
    />
  );
}

// ============================================================================
// INTEGRATION EXAMPLES
// ============================================================================

// Example: Using in a Next.js page component
export function PortfolioPage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        variant={{
          type: "back-search",
          title: "Portfolio",
          onSearch: () => {/* Open search */},
        }}
      />

      <main className="p-4">
        {/* Page content */}
      </main>
    </div>
  );
}

// Example: Conditional rendering based on user state
export function ArtworkPage({ isLoggedIn }: { isLoggedIn: boolean }) {
  if (!isLoggedIn) {
    return (
      <>
        <PageHeader variant={{ type: "back-only" }} />
        <main>{/* Content */}</main>
      </>
    );
  }

  return (
    <>
      <PageHeader
        variant={{
          type: "back-actions",
          showShare: true,
          showFavorite: true,
          onShare: () => {/* Share */},
          onFavorite: () => {/* Favorite */},
        }}
      />
      <main>{/* Content */}</main>
    </>
  );
}
