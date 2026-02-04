interface ArtworkDescriptionProps {
  text: string;
}

export function ArtworkDescription({ text }: ArtworkDescriptionProps) {
  return (
    <section className="px-6 py-4">
      <p className="text-gray-800 dark:text-gray-50 leading-relaxed">
        {text}
      </p>
    </section>
  );
}
