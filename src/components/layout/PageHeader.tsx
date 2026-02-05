"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

type HeaderVariant =
  | { type: "home"; title: string; aboutLink?: boolean }
  | { type: "back-title"; title: string }
  | { type: "back-search"; title: string; onSearch?: () => void }
  | { type: "back-actions"; showShare?: boolean; showFavorite?: boolean; onShare?: () => void; onFavorite?: () => void; isFavorited?: boolean }
  | { type: "back-only" };

interface PageHeaderProps {
  variant: HeaderVariant;
}

export function PageHeader({ variant }: PageHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  // Home variant: Title (left) | Theme Toggle + About link (right)
  if (variant.type === "home") {
    return (
      <header className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-6 lg:px-8 py-4 pb-2 justify-between">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
          <Link
            href="/"
            className="text-muted-gray dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] uppercase tracking-widest hover:text-primary transition-colors"
          >
            {variant.title}
          </Link>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {variant.aboutLink && (
              <Link
                href="/about"
                className="text-primary text-sm font-bold leading-normal tracking-[0.015em] shrink-0 hover:opacity-70 transition-opacity"
              >
                About
              </Link>
            )}
          </div>
        </div>
      </header>
    );
  }

  // Back-title variant: Back arrow | Title (center) | Home button (desktop only)
  if (variant.type === "back-title") {
    return (
      <header className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-6 lg:px-8 py-4 pb-2 justify-between">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
          <button
            onClick={handleBack}
            className="text-muted-gray dark:text-gray-200 flex size-12 shrink-0 items-center justify-center hover:opacity-70 transition-opacity"
            aria-label="Go back"
          >
            <span className="material-symbols-outlined text-2xl">arrow_back_ios</span>
          </button>

          <h1 className="text-muted-gray dark:text-gray-100 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center px-4">
            {variant.title}
          </h1>

          <Link
            href="/"
            className="hidden lg:flex text-muted-gray dark:text-gray-200 size-12 shrink-0 items-center justify-center hover:text-primary transition-colors"
            aria-label="Home"
          >
            <span className="material-symbols-outlined text-2xl">home</span>
          </Link>
          <div className="w-12 shrink-0 lg:hidden" />
        </div>
      </header>
    );
  }

  // Back-search variant: Back arrow | Title (center) | Search icon + Home button (desktop)
  if (variant.type === "back-search") {
    return (
      <header className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-6 lg:px-8 py-4 pb-2 justify-between">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
          <button
            onClick={handleBack}
            className="text-muted-gray dark:text-gray-50 flex size-12 shrink-0 items-center justify-center hover:opacity-70 transition-opacity"
            aria-label="Go back"
          >
            <span className="material-symbols-outlined text-2xl">arrow_back_ios</span>
          </button>

          <h1 className="text-muted-gray dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center px-4">
            {variant.title}
          </h1>

          <div className="flex items-center gap-1">
            <button
              onClick={variant.onSearch}
              className="text-muted-gray dark:text-gray-50 flex size-12 shrink-0 items-center justify-center hover:opacity-70 transition-opacity"
              aria-label="Search"
            >
              <span className="material-symbols-outlined text-2xl">search</span>
            </button>
            <Link
              href="/"
              className="hidden lg:flex text-muted-gray dark:text-gray-50 size-12 shrink-0 items-center justify-center hover:text-primary transition-colors"
              aria-label="Home"
            >
              <span className="material-symbols-outlined text-2xl">home</span>
            </Link>
          </div>
        </div>
      </header>
    );
  }

  // Back-actions variant: Back arrow | Share + Favorite + Home buttons
  if (variant.type === "back-actions") {
    return (
      <header className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-6 lg:px-8 py-4 pb-2 justify-between">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
          <button
            onClick={handleBack}
            className="text-muted-gray dark:text-gray-50 flex size-12 shrink-0 items-center justify-center hover:opacity-70 transition-opacity"
            aria-label="Go back"
          >
            <span className="material-symbols-outlined text-2xl">arrow_back_ios</span>
          </button>

          <div className="flex-1" />

          <div className="flex items-center gap-2">
            {variant.showShare && (
              <button
                onClick={variant.onShare}
                className="text-muted-gray dark:text-gray-50 flex size-10 items-center justify-center hover:opacity-70 transition-opacity"
                aria-label="Share"
              >
                <span className="material-symbols-outlined text-xl">share</span>
              </button>
            )}
            {variant.showFavorite && (
              <button
                onClick={variant.onFavorite}
                className={`favorite-btn flex size-10 items-center justify-center hover:opacity-70 transition-all ${
                  variant.isFavorited ? "text-primary favorited" : "text-muted-gray dark:text-gray-50"
                }`}
                aria-label={variant.isFavorited ? "Remove from favorites" : "Add to favorites"}
              >
                <span className={`material-symbols-outlined text-xl ${variant.isFavorited ? "fill" : ""}`}>
                  favorite
                </span>
              </button>
            )}
            <Link
              href="/"
              className="hidden lg:flex text-muted-gray dark:text-gray-50 size-10 items-center justify-center hover:text-primary transition-colors"
              aria-label="Home"
            >
              <span className="material-symbols-outlined text-xl">home</span>
            </Link>
          </div>
        </div>
      </header>
    );
  }

  // Back-only variant: Back arrow + Home button (desktop)
  if (variant.type === "back-only") {
    return (
      <header className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-6 lg:px-8 py-4 pb-2">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
          <button
            onClick={handleBack}
            className="text-muted-gray dark:text-gray-50 flex size-12 shrink-0 items-center justify-center hover:opacity-70 transition-opacity"
            aria-label="Go back"
          >
            <span className="material-symbols-outlined text-2xl">arrow_back_ios</span>
          </button>

          <Link
            href="/"
            className="hidden lg:flex text-muted-gray dark:text-gray-50 size-12 shrink-0 items-center justify-center hover:text-primary transition-colors"
            aria-label="Home"
          >
            <span className="material-symbols-outlined text-2xl">home</span>
          </Link>
        </div>
      </header>
    );
  }

  return null;
}
