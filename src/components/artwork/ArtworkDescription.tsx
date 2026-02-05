interface ArtworkDescriptionProps {
  text: string;
}

export function ArtworkDescription({ text }: ArtworkDescriptionProps) {
  return (
    <section className="px-6 lg:px-0 py-4 max-w-3xl mx-auto">
      <p className="text-gray-800 dark:text-gray-50 leading-relaxed">
        {text}
      </p>
    </section>
  );
}
