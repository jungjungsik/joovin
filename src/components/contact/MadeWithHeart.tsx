export function MadeWithHeart() {
  return (
    <div className="flex flex-col items-center justify-center space-y-1">
      <p className="text-gold-muted text-sm font-normal leading-normal tracking-widest uppercase">
        Made with heart
      </p>
      <div className="flex items-center gap-2 mt-4">
        <div className="size-2 bg-primary/40 rounded-full" />
        <div className="size-2 bg-primary rounded-full" />
        <div className="size-2 bg-primary/40 rounded-full" />
      </div>
    </div>
  );
}
