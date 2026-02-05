"use client";

import { FilterCategory } from "@/types";

interface FilterPillsProps {
  categories: { value: FilterCategory; label: string }[];
  active: FilterCategory;
  onChange: (category: FilterCategory) => void;
}

export function FilterPills({ categories, active, onChange }: FilterPillsProps) {
  return (
    <div className="max-w-6xl mx-auto flex gap-2 px-6 py-4 overflow-x-auto lg:justify-center">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            active === cat.value
              ? "bg-primary text-white"
              : "bg-transparent border border-gray-400 dark:border-gray-500 text-gray-800 dark:text-gray-50 hover:border-primary"
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
  { value: "selected-works", label: "SELECTED" },
  { value: "drawings", label: "DRAWINGS" },
  { value: "paintings", label: "PAINTINGS" },
  { value: "digital", label: "DIGITAL" },
  { value: "wip", label: "WIP" },
  { value: "sketchbook", label: "SKETCHBOOK" },
];
