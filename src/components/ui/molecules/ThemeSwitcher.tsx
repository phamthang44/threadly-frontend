"use client";

import React from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

/**
 * ThemeSwitcher Component
 *
 * Allows users to switch between light, dark, and system theme preferences.
 * Uses `theme` (not `resolvedTheme`) because it needs to show which preference
 * is selected, not what the actual resolved theme is.
 */
const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  // Theme options matching next-themes values
  const options = [
    { id: "light" as const, icon: <Sun size={20} />, label: null },
    { id: "dark" as const, icon: <Moon size={20} />, label: null },
    { id: "system" as const, icon: <Monitor size={20} />, label: "Auto" },
  ];

  // Handle hydration mismatch - wait for client mount
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="bg-[var(--theme-switcher-bg)] rounded-xl flex items-center justify-between relative h-12 w-full">
        {/* Placeholder to prevent layout shift */}
        {options.map((option) => (
          <div key={option.id} className="flex-1 h-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-[var(--theme-switcher-bg)] rounded-xl flex items-center justify-between relative h-12 w-full">
      {options.map((option) => {
        const isActive = theme === option.id;
        return (
          <button
            key={option.id}
            onClick={() => setTheme(option.id)} // <--- Chỉ cần gọi hàm này là xong
            className={`cursor-pointer relative z-10 flex-1 flex items-center justify-center h-full rounded-lg text-sm font-semibold transition-colors duration-200 ${
              isActive
                ? "text-[var(--theme-switcher-active-text)]"
                : "text-[var(--theme-switcher-text-primary)] hover:text-[var(--theme-switcher-text-hover)]"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="active-theme-bg"
                className="absolute inset-0 bg-[var(--theme-swithcer-button-active-bg)] rounded-lg shadow-sm border border-[var(--theme-swithcer-button-active-border)]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                style={{ zIndex: -1 }}
              />
            )}
            <div className="flex items-center gap-2">
              <span>{option.icon}</span>
              <span>{option.label}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default ThemeSwitcher;
