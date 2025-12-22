// src/components/layout/Layout.tsx
"use client";
import React from "react";
import LayoutDesktop from "./LayoutDesktop";
import LayoutMobile from "./LayoutMobile";

interface LayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  rightSidebar?: React.ReactNode;
  mobileNavbar?: React.ReactNode;
  isAuthenticated?: boolean;
}

/**
 * Layout Component
 *
 * Uses CSS-based responsive switching (Strategy A) to avoid SSR/hydration issues.
 * Both LayoutMobile and LayoutDesktop are rendered in the DOM, but visibility
 * is controlled by Tailwind breakpoint classes:
 * - LayoutMobile: visible on mobile (<768px), hidden on desktop (>=768px)
 * - LayoutDesktop: hidden on mobile (<768px), visible on desktop (>=768px)
 *
 * Benefits:
 * - Zero layout shift (no JS needed for initial render)
 * - No hydration mismatches
 * - Better performance (CSS handles visibility)
 * - Works correctly on SSR
 */
const Layout: React.FC<LayoutProps> = ({
  children,
  header,
  sidebar,
  rightSidebar,
  mobileNavbar,
  isAuthenticated,
}) => {
  return (
    <>
      {/* Mobile Layout - Visible on screens < 768px (md breakpoint) */}
      <div className="block md:hidden">
        <LayoutMobile header={header} mobileNavBar={mobileNavbar}>
          {children}
        </LayoutMobile>
      </div>

      {/* Desktop Layout - Visible on screens >= 768px (md breakpoint) */}
      <div className="hidden md:block">
        <LayoutDesktop
          header={header}
          sidebar={sidebar}
          rightSidebar={rightSidebar}
          isAuthenticated={isAuthenticated}
        >
          {children}
        </LayoutDesktop>
      </div>
    </>
  );
};

export default Layout;
