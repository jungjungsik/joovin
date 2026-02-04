"use client";

import { useTheme } from "@/lib/hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative text-muted-gray dark:text-gray-50 flex size-12 shrink-0 items-center justify-center hover:opacity-70 transition-opacity group"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      type="button"
    >
      {/* Sun Icon - visible in dark mode */}
      <span
        className={`material-symbols-outlined text-2xl absolute transition-all duration-500 ${
          theme === "dark"
            ? "opacity-100 rotate-0 scale-100"
            : "opacity-0 rotate-90 scale-0"
        }`}
      >
        light_mode
      </span>

      {/* Moon Icon - visible in light mode */}
      <span
        className={`material-symbols-outlined text-2xl absolute transition-all duration-500 ${
          theme === "light"
            ? "opacity-100 rotate-0 scale-100"
            : "opacity-0 -rotate-90 scale-0"
        }`}
      >
        dark_mode
      </span>
    </button>
  );
}
