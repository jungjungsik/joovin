interface ProcessSectionProps {
  title: string;
  paragraphs: string[];
}

export function ProcessSection({ title, paragraphs }: ProcessSectionProps) {
  return (
    <div className="px-6 space-y-4">
      <h3 className="text-2xl font-bold tracking-tight custom-serif">{title}</h3>
      {paragraphs.map((text, i) => (
        <p key={i} className="text-lg font-normal leading-relaxed custom-serif text-muted-gray dark:text-gray-300">
          {text}
        </p>
      ))}
    </div>
  );
}
