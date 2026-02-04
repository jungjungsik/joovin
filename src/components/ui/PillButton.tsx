interface PillButtonProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function PillButton({ children, active = false, onClick, className = "" }: PillButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
        active
          ? "bg-primary text-white"
          : "bg-transparent border border-gray-300 dark:border-gray-600 text-muted-gray dark:text-gray-200 hover:border-primary"
      } ${className}`}
    >
      {children}
    </button>
  );
}
