"use client";

import React from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Threadly Loader Component
 *
 * Displays Threadly icon and text with theme-based colors.
 * Used during authentication states (login, logout, token refresh).
 */
const Loader: React.FC<LoaderProps> = ({ size = "lg", className = "" }) => {
  const { theme, systemTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [detectedTheme, setDetectedTheme] = React.useState<"light" | "dark">(
    "light"
  );

  // Handle hydration mismatch and detect theme from DOM
  React.useEffect(() => {
    setMounted(true);

    // Detect theme from DOM class (next-themes sets class on html element)
    const detectThemeFromDOM = () => {
      if (typeof window !== "undefined") {
        const htmlElement = document.documentElement;
        const isDark = htmlElement.classList.contains("dark");
        return isDark ? "dark" : "light";
      }
      return "light";
    };

    // Initial detection
    setDetectedTheme(detectThemeFromDOM());

    // Watch for theme changes via MutationObserver
    const observer = new MutationObserver(() => {
      setDetectedTheme(detectThemeFromDOM());
    });

    if (typeof window !== "undefined") {
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }

    return () => observer.disconnect();
  }, []);

  // Determine current theme (handle system theme)
  // Use DOM detection as fallback when next-themes values are undefined
  const currentTheme = React.useMemo(() => {
    if (!mounted) {
      return "light"; // Default during SSR/hydration
    }

    // Priority 1: If resolvedTheme is available, use it (most reliable)
    if (resolvedTheme === "light" || resolvedTheme === "dark") {
      return resolvedTheme;
    }

    // Priority 2: If theme is "system", use systemTheme
    if (theme === "system") {
      if (systemTheme === "light" || systemTheme === "dark") {
        return systemTheme;
      }
    }

    // Priority 3: If theme is directly "light" or "dark", use it
    if (theme === "light" || theme === "dark") {
      return theme;
    }

    // Priority 4: Check if systemTheme is available as fallback
    if (systemTheme === "light" || systemTheme === "dark") {
      return systemTheme;
    }

    // Priority 5: Fallback to DOM detection (when next-themes hasn't initialized yet)
    // This is critical for the Loader which renders very early
    return detectedTheme;
  }, [mounted, resolvedTheme, theme, systemTheme, detectedTheme]);

  const sizeClasses = {
    sm: "text-xl sm:text-2xl",
    md: "text-3xl sm:text-4xl",
    lg: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
  };

  const iconSizes = {
    sm: { mobile: 24, desktop: 32 },
    md: { mobile: 36, desktop: 48 },
    lg: { mobile: 48, desktop: 64 },
  };

  // Theme-based text color
  const textColor = currentTheme === "dark" ? "text-white" : "text-gray-900";

  const iconUrl =
    currentTheme === "dark"
      ? "/Threads-Brand-Resource-Center/Threads-Brand-Resource-Center/01-White/Logo/threads-logo-white.svg"
      : "/Threads-Brand-Resource-Center/Threads-Brand-Resource-Center/02-Black/Logo/threads-logo-black.svg";

  const currentIconSize = iconSizes[size];

  // Responsive icon size classes
  const iconSizeClasses = {
    sm: "w-6 h-6 sm:w-8 sm:h-8",
    md: "w-9 h-9 sm:w-12 sm:h-12",
    lg: "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 sm:gap-4 px-4 ${className}`}
      style={{ minHeight: "100vh" }}
    >
      <div className="text-center flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
        {/* Threadly Icon */}
        <Image
          src={iconUrl}
          alt="Threadly logo"
          width={currentIconSize.desktop}
          height={currentIconSize.desktop}
          className={`object-contain object-center ${iconSizeClasses[size]}`}
          sizes="(max-width: 640px) 48px, (max-width: 768px) 56px, 64px"
        />

        {/* Threadly Text */}
        <h1
          className={`font-bold ${sizeClasses[size]} tracking-tight ${textColor}`}
        >
          Threadly
        </h1>
      </div>
    </div>
  );
};

export default Loader;
