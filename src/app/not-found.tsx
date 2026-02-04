import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <PageHeader variant={{ type: "back-only" }} />

      <main className="flex flex-col items-center justify-center px-6 py-20">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-display font-light text-primary mb-4">
            404
          </h1>
          <h2 className="text-2xl font-display font-medium text-muted-gray dark:text-white mb-4">
            Page Not Found
          </h2>
          <p className="font-serif text-muted-gray/70 dark:text-white mb-8">
            The artwork you're looking for seems to have wandered off the canvas.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary text-background-dark px-6 py-3 rounded-lg font-display font-medium hover:bg-primary/90 transition-colors"
          >
            <span className="material-symbols-outlined text-xl">home</span>
            Return Home
          </Link>
        </div>
      </main>
    </div>
  );
}
