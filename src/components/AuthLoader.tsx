"use client";

import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/molecules/Loader";

/**
 * AuthLoader Component
 *
 * Global loader that displays during authentication operations:
 * - After login (while fetching user profile)
 * - After logout (while clearing state)
 * - On F5 refresh (while refreshing token)
 *
 * This component checks the global isLoading state from Redux
 * and displays the Threadly loader when active.
 *
 * Includes minimum display duration (800ms) to prevent flickering.
 */
export default function AuthLoader() {
  const { isLoading } = useAppSelector((state) => state.auth);
  const [showLoader, setShowLoader] = useState(false);
  const [loaderStartTime, setLoaderStartTime] = useState<number | null>(null);

  useEffect(() => {
    if (isLoading) {
      // When loading starts, record the start time and show loader
      const startTime = Date.now();
      setLoaderStartTime(startTime);
      setShowLoader(true);
    } else {
      // When loading ends, ensure minimum display duration
      if (loaderStartTime !== null) {
        const elapsed = Date.now() - loaderStartTime;
        const minDuration = 1000; // Minimum 1000ms display time

        if (elapsed < minDuration) {
          // Wait for remaining time before hiding
          const remaining = minDuration - elapsed;
          const timeout = setTimeout(() => {
            setShowLoader(false);
            setLoaderStartTime(null);
          }, remaining);

          return () => clearTimeout(timeout);
        } else {
          // Already shown long enough, hide immediately
          setShowLoader(false);
          setLoaderStartTime(null);
        }
      } else {
        setShowLoader(false);
      }
    }
  }, [isLoading, loaderStartTime]);

  if (!showLoader) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-[var(--bg-body)]">
      <Loader size="lg" />
    </div>
  );
}
