interface EducationCardProps {
  school: string;
  graduationDate: string;
}

export function EducationCard({ school, graduationDate }: EducationCardProps) {
  return (
    <div className="mx-6 lg:mx-auto max-w-xl lg:max-w-2xl">
      <div className="relative bg-gradient-to-br from-primary/5 via-white to-primary/10 dark:from-primary/10 dark:via-gray-900 dark:to-primary/5 p-6 lg:p-8 xl:p-10 rounded-2xl lg:rounded-3xl border border-primary/20 shadow-lg shadow-primary/5 text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-primary/10 dark:bg-primary/20 mb-4 lg:mb-6">
          <span className="material-symbols-outlined text-primary text-3xl lg:text-4xl">school</span>
        </div>

        {/* Label */}
        <h4 className="font-bold text-xs lg:text-sm uppercase tracking-[0.2em] text-primary mb-3 lg:mb-4">
          Education
        </h4>

        {/* School Name */}
        <p className="text-xl lg:text-2xl xl:text-3xl font-semibold text-gray-900 dark:text-white mb-2 lg:mb-3 leading-tight">
          {school}
        </p>

        {/* Graduation */}
        <p className="text-sm lg:text-base text-gray-600 dark:text-gray-300">
          Expected Graduation: <span className="font-medium text-gray-800 dark:text-gray-100">{graduationDate}</span>
        </p>
      </div>
    </div>
  );
}
