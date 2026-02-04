interface ArtworkDescriptionProps {
  text: string;
}

export function ArtworkDescription({ text }: ArtworkDescriptionProps) {
  return (
    <section className="px-6 py-4">
      <p className="text-muted-gray/80 dark:text-gray-300 leading-relaxed">
        {text}
      </p>
    </section>
  );
}
