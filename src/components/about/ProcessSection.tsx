interface ProcessSectionProps {
  title: string;
  paragraphs: string[];
}

export function ProcessSection({ title, paragraphs }: ProcessSectionProps) {
  return (
    <div className="px-6 space-y-4 lg:space-y-6 lg:px-12 max-w-6xl mx-auto">
      <h3 className="text-2xl lg:text-4xl xl:text-5xl font-bold tracking-tight custom-serif dark:text-white">{title}</h3>
      <div className="space-y-4 lg:space-y-6 max-w-prose lg:max-w-4xl">
        {paragraphs.map((text, i) => (
          <p key={i} className="text-lg lg:text-xl xl:text-2xl font-normal leading-relaxed lg:leading-relaxed custom-serif text-muted-gray dark:text-gray-100">
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}
