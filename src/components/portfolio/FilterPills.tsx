"use client";

import { FilterCategory } from "@/types";

interface FilterPillsProps {
  categories: { value: FilterCategory; label: string }[];
  active: FilterCategory;
  onChange: (category: FilterCategory) => void;
}

export function FilterPills({ categories, active, onChange }: FilterPillsProps) {
  return (
    <div className="flex gap-2 px-6 py-4 overflow-x-auto">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            active === cat.value
              ? "bg-primary text-white"
              : "bg-transparent border border-gray-300 dark:border-gray-600 text-muted-gray dark:text-gray-200 hover:border-primary"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}

export const FILTER_CATEGORIES: { value: FilterCategory; label: string }[] = [
  { value: "all", label: "ALL" },
  { value: "selected-works", label: "SELECTED WORKS" },
  { value: "sketchbook", label: "SKETCHBOOK" },
];
