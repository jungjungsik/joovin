interface GoldUnderlineProps {
  width?: string;
  className?: string;
}

export function GoldUnderline({ width = "w-8", className = "" }: GoldUnderlineProps) {
  return (
    <div className={`h-1 ${width} bg-primary rounded-full ${className}`} />
  );
}
