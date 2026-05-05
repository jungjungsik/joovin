"use client";

import Link from "next/link";

export function HomeFooter() {
  const handleShare = async () => {
    const shareData = {
      title: "Joovin NAM | Art Portfolio",
      text: "Check out this art portfolio by Joovin NAM",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch {
      // User cancelled or error - silent
    }
  };

  return (
    <footer className="p-8 border-t border-gray-100 dark:border-gray-800 flex flex-col items-center gap-4">
      <div className="flex gap-6">
        <Link href="/portfolio" className="text-primary/80 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">palette</span>
        </Link>
        <button
          onClick={handleShare}
          className="text-primary/80 hover:text-primary transition-colors"
          aria-label="Share this portfolio"
        >
          <span className="material-symbols-outlined">share</span>
        </button>
        <Link href="/contact" className="text-primary/80 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">mail</span>
        </Link>
        <Link href="/admin/login" className="text-primary/80 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">login</span>
        </Link>
      </div>
      <p className="text-[10px] uppercase tracking-widest text-gray-600 dark:text-white">
        © 2026 Joovin NAM Portfolio · Developed by Jungsik Jung
      </p>
      <div className="h-8" /> {/* Safe area for iOS home indicator */}
    </footer>
  );
}
