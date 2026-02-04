"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface TabItem {
  icon: string;
  label: string;
  href: string;
}

interface BottomTabBarProps {
  tabs: TabItem[];
}

export function BottomTabBar({ tabs }: BottomTabBarProps) {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 px-8 py-3 flex justify-between items-center safe-area-bottom z-40">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex flex-col items-center transition-colors duration-200 ${
              isActive ? "text-primary" : "text-gray-600 hover:text-gray-800 dark:text-white dark:hover:text-primary"
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">{tab.icon}</span>
            <span className="text-[10px] mt-0.5 uppercase tracking-tighter font-medium">
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

// Preset tab configurations
export const PORTFOLIO_TABS: TabItem[] = [
  { icon: "grid_view", label: "Gallery", href: "/portfolio" },
  { icon: "face", label: "Profile", href: "/about" },
  { icon: "museum", label: "Exhibits", href: "/exhibits" },
  { icon: "mail", label: "Contact", href: "/contact" },
];

export const ABOUT_TABS: TabItem[] = [
  { icon: "grid_view", label: "Work", href: "/portfolio" },
  { icon: "face", label: "About", href: "/about" },
  { icon: "mail", label: "Connect", href: "/contact" },
];
