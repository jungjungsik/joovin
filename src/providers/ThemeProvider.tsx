"use client";

import { useEffect } from "react";

/**
 * ThemeProvider handles initial theme setup before hydration
 * to prevent flash of wrong theme (FOUC)
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // This runs on mount to ensure theme is applied
    const storedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    const theme = storedTheme || systemTheme;

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return <>{children}</>;
}
