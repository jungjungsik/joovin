import Link from "next/link";

export function HomeFooter() {
  return (
    <footer className="p-8 border-t border-gray-100 dark:border-gray-800 flex flex-col items-center gap-4">
      <div className="flex gap-6">
        <Link href="/portfolio" className="text-primary/80 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">palette</span>
        </Link>
        <button className="text-primary/80 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">share</span>
        </button>
        <Link href="/contact" className="text-primary/80 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">mail</span>
        </Link>
        <Link href="/admin/login" className="text-primary/80 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">login</span>
        </Link>
      </div>
      <p className="text-[10px] uppercase tracking-widest text-gray-600 dark:text-gray-400">
        © 2024 Joovin NAM Portfolio
      </p>
      <div className="h-8" /> {/* Safe area for iOS home indicator */}
    </footer>
  );
}
