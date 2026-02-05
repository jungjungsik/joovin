interface InterestTagsProps {
  interests: string[];
}

export function InterestTags({ interests }: InterestTagsProps) {
  return (
    <div className="px-6 space-y-4 pt-4">
      <h3 className="text-lg font-bold leading-tight uppercase tracking-widest border-l-4 border-primary pl-3 dark:text-white">
        Creative Interests
      </h3>
      <div className="flex flex-wrap gap-2">
        {interests.map((interest) => (
          <span
            key={interest}
            className="px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-full text-sm font-medium border border-primary/20 dark:text-white"
          >
            {interest}
          </span>
        ))}
      </div>
    </div>
  );
}
