interface InterestTagsProps {
  interests: string[];
}

export function InterestTags({ interests }: InterestTagsProps) {
  return (
    <div className="px-6 lg:px-0 space-y-4 lg:space-y-6 pt-4 max-w-4xl mx-auto">
      <h3 className="text-lg lg:text-xl xl:text-2xl font-bold leading-tight uppercase tracking-widest border-l-4 border-primary pl-3 lg:pl-4 dark:text-white">
        Creative Interests
      </h3>
      <div className="flex flex-wrap gap-2 lg:gap-3 justify-start lg:justify-center">
        {interests.map((interest) => (
          <span
            key={interest}
            className="px-4 lg:px-6 py-2 lg:py-3 bg-primary/10 dark:bg-primary/20 rounded-full text-sm lg:text-base xl:text-lg font-medium border border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-colors duration-200 dark:text-white"
          >
            {interest}
          </span>
        ))}
      </div>
    </div>
  );
}
