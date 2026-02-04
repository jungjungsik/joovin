export function GrainBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] z-[-1]">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grain" patternUnits="userSpaceOnUse" width="100" height="100">
            <circle cx="2" cy="2" r="1" fill="#e8ba30" />
            <circle cx="50" cy="80" r="1" fill="#e8ba30" />
            <circle cx="90" cy="20" r="1" fill="#e8ba30" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grain)" />
      </svg>
    </div>
  );
}
