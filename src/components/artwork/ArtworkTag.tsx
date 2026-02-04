interface ArtworkTagProps {
  label: string;
  className?: string;
}

export function ArtworkTag({ label, className = "" }: ArtworkTagProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="h-[2px] w-8 bg-primary" aria-hidden="true" />
      <p className="text-primary text-xs font-bold uppercase tracking-widest">
        {label}
      </p>
    </div>
  );
}
