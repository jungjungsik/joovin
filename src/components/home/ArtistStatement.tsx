import Link from "next/link";

interface ArtistStatementProps {
  quote: string;
  linkText?: string;
  linkHref?: string;
}

export function ArtistStatement({
  quote,
  linkText = "Read the full statement",
  linkHref = "/about"
}: ArtistStatementProps) {
  return (
    <section className="py-10 px-8 lg:py-16 lg:px-0 flex flex-col items-center">
      <div className="max-w-6xl mx-auto w-full flex flex-col items-center">
      <h2 className="text-muted-gray dark:text-white tracking-tight text-sm font-semibold leading-tight pb-4 uppercase tracking-[0.2em]">
        Artist Statement
      </h2>
      <p className="serif-text text-xl italic font-normal leading-relaxed text-center text-gray-800 dark:text-gray-50 max-w-sm">
        "{quote}"
      </p>
      <div className="flex px-4 py-6 justify-center">
        <Link
          href={linkHref}
          className="group flex items-center justify-center h-10 px-4 bg-transparent text-muted-gray dark:text-gray-50 text-sm font-medium tracking-[0.05em]"
        >
          <span className="border-b border-primary/60 group-hover:border-primary transition-colors pb-1">
            {linkText}
          </span>
        </Link>
      </div>
      </div>
    </section>
  );
}
