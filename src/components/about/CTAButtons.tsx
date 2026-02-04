import Link from "next/link";

interface CTAButtonsProps {
  portfolioHref?: string;
  contactHref?: string;
}

export function CTAButtons({
  portfolioHref = "/portfolio",
  contactHref = "/contact"
}: CTAButtonsProps) {
  return (
    <div className="px-6 pt-10 space-y-3">
      <Link
        href={portfolioHref}
        className="block w-full bg-muted-gray dark:bg-white text-white dark:text-muted-gray py-4 rounded-xl font-bold text-base text-center transition-colors hover:bg-gray-700 dark:hover:bg-gray-100"
      >
        View My Portfolio
      </Link>
      <Link
        href={contactHref}
        className="block w-full bg-primary/10 dark:bg-primary/20 text-muted-gray dark:text-white py-4 rounded-xl font-bold text-base text-center border border-primary/30"
      >
        Get in Touch
      </Link>
    </div>
  );
}
