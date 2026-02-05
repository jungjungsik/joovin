"use client";

import Link from "next/link";

export function BackToPortfolio() {
  return (
    <section className="py-12 px-6 lg:px-0">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/portfolio"
          className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-primary text-background-dark font-semibold text-lg rounded-xl hover:bg-primary/90 transition-colors shadow-lg"
        >
          <span className="material-symbols-outlined text-2xl">grid_view</span>
          Back to Portfolio
        </Link>
      </div>
    </section>
  );
}
