interface EducationCardProps {
  school: string;
  graduationDate: string;
}

export function EducationCard({ school, graduationDate }: EducationCardProps) {
  return (
    <div className="mx-6 lg:mx-0 max-w-4xl lg:w-full lg:max-w-2xl xl:max-w-3xl lg:self-center bg-white/50 dark:bg-white/5 p-5 lg:p-6 xl:p-8 rounded-xl lg:rounded-2xl border border-gray-100 dark:border-gray-800 flex items-start gap-4 lg:gap-6">
      <span className="material-symbols-outlined text-primary mt-1 text-2xl lg:text-3xl xl:text-4xl">school</span>
      <div>
        <h4 className="font-bold text-sm lg:text-base uppercase tracking-wider text-gray-700 dark:text-gray-100">
          Education
        </h4>
        <p className="text-lg lg:text-xl xl:text-2xl font-medium dark:text-white">{school}</p>
        <p className="text-gray-700 dark:text-gray-100 lg:text-lg">
          Expected Graduation: {graduationDate}
        </p>
      </div>
    </div>
  );
}
