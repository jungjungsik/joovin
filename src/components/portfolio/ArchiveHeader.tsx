interface ArchiveHeaderProps {
  title?: string;
  description?: string;
}

export function ArchiveHeader({
  title = "The Archive",
  description = "A collection of explorations, finished works, and the raw process of creation."
}: ArchiveHeaderProps) {
  return (
    <div className="px-6 pt-6 pb-4">
      <h1 className="text-3xl font-bold tracking-tight mb-2">{title}</h1>
      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
