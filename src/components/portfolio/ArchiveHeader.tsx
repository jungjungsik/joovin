interface ArchiveHeaderProps {
  title?: string;
  description?: string;
}

export function ArchiveHeader({
  title = "The Archive",
  description = "A collection of explorations, finished works, and the raw process of creation."
}: ArchiveHeaderProps) {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-6 pb-4">
      <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-2 dark:text-white">{title}</h1>
      <p className="text-gray-700 dark:text-white text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
