"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuLinks = [
  { href: "/", label: "HOME" },
  { href: "/portfolio", label: "PORTFOLIO" },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  // Close menu only on actual route change (not initial mount)
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      onClose();
      prevPathname.current = pathname;
    }
  }, [pathname, onClose]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-background-light dark:bg-background-dark shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-300 dark:border-gray-700">
            <h2 className="text-lg font-bold text-muted-gray dark:text-white uppercase tracking-widest">
              Menu
            </h2>
            <button
              onClick={onClose}
              className="text-muted-gray dark:text-gray-50 flex size-10 items-center justify-center hover:opacity-70 transition-opacity"
              aria-label="Close menu"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-4">
              {menuLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block py-3 px-4 rounded-lg text-lg font-semibold tracking-wide transition-all ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-gray dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="px-4 py-4 border-t border-gray-300 dark:border-gray-700">
            <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
              © 2026 Joovin NAM · Dev by Jungsik Jung
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
