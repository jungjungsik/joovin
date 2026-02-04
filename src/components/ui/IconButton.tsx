import Link from "next/link";

interface IconButtonProps {
  icon: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  ariaLabel?: string;
}

export function IconButton({ icon, onClick, href, className = "", ariaLabel }: IconButtonProps) {
  const baseClasses = "flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer";

  if (href) {
    return (
      <Link href={href} className={`${baseClasses} ${className}`} aria-label={ariaLabel}>
        <span className="material-symbols-outlined">{icon}</span>
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`${baseClasses} ${className}`} aria-label={ariaLabel}>
      <span className="material-symbols-outlined">{icon}</span>
    </button>
  );
}
