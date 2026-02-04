interface EducationCardProps {
  school: string;
  graduationDate: string;
}

export function EducationCard({ school, graduationDate }: EducationCardProps) {
  return (
    <div className="mx-6 bg-white/50 dark:bg-white/5 p-5 rounded-xl border border-gray-100 dark:border-gray-800 flex items-start gap-4">
      <span className="material-symbols-outlined text-primary mt-1">school</span>
      <div>
        <h4 className="font-bold text-sm uppercase tracking-wider text-gray-700 dark:text-gray-300">
          Education
        </h4>
        <p className="text-lg font-medium">{school}</p>
        <p className="text-gray-700 dark:text-gray-300">
          Expected Graduation: {graduationDate}
        </p>
      </div>
    </div>
  );
}
