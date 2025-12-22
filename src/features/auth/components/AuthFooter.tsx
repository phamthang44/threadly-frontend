"use client";

import React from "react";
import Link from "next/link";

export interface FooterLink {
  href: string;
  label: string;
}

interface AuthFooterProps {
  /**
   * Optional copyright year text (e.g., "© 2025")
   * If provided, will be displayed first
   */
  copyright?: string;
  /**
   * Array of footer links to display
   */
  links?: FooterLink[];
  /**
   * Custom className for the footer container
   */
  className?: string;
}

/**
 * AuthFooter Component
 *
 * Reusable footer component for authentication pages.
 * Displays copyright text and links in a responsive, mobile-friendly layout.
 */
export const AuthFooter: React.FC<AuthFooterProps> = ({
  copyright,
  links = [],
  className = "",
}) => {
  const defaultLinks: FooterLink[] = [
    { href: "/terms", label: "Threadly Terms" },
    { href: "/privacy", label: "Privacy Policy" },
  ];

  const footerLinks = links.length > 0 ? links : defaultLinks;

  return (
    <div
      className={`absolute bottom-2 md:bottom-4 left-0 right-0 flex flex-wrap justify-center gap-2 md:gap-4 text-xs px-4 pb-2 md:pb-0 ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4">
        {copyright && (
          <span style={{ color: "var(--login-view-text-secondary)" }}>
            {copyright}
          </span>
        )}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          {footerLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition duration-200 min-h-[44px] flex items-center"
              style={{ color: "var(--login-view-button-text)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color =
                  "var(--login-view-button-text-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--login-view-button-text)")
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
