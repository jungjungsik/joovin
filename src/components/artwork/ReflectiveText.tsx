import Link from "next/link";

interface ReflectiveTextProps {
  text: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function ReflectiveText({
  text,
  ctaLabel = "View Full Series",
  ctaHref = "/portfolio",
}: ReflectiveTextProps) {
  return (
    <section className="px-6 py-12">
      <div className="flex flex-col items-center text-center space-y-8">
        {/* Vertical Decorative Line */}
        <div
          className="w-px h-12 bg-gray-300 dark:bg-gray-600"
          aria-hidden="true"
        />

        {/* Reflective Text */}
        <p className="serif-text text-lg text-gray-800 dark:text-gray-50 leading-relaxed max-w-md italic">
          &ldquo;{text}&rdquo;
        </p>

        {/* CTA Button */}
        <Link
          href={ctaHref}
          className="px-8 py-3 bg-primary text-white font-bold rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-105 transition-all duration-200"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
