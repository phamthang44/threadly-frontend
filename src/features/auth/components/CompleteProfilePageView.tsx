"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CompleteProfile } from "@/features/auth/components";

/**
 * CompleteProfilePageView Component
 *
 * Client Component that handles:
 * - Token retrieval from URL params, sessionStorage, or localStorage
 * - Loading and error states
 * - Navigation logic
 *
 * This component is used by the Server Component page.tsx
 */
export const CompleteProfilePageView: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [registerToken, setRegisterToken] = useState<string>("");
  const [tokenError, setTokenError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Try to get registerToken from multiple sources
    // Note: registerToken is a temporary token for registration completion, not a security token
    const tokenFromQuery = searchParams.get("token");
    const tokenFromSession = sessionStorage.getItem("registerToken");
    // Fallback to localStorage if not in sessionStorage (for backward compatibility)
    const tokenFromLocal = localStorage.getItem("registerToken");

    const token = tokenFromQuery || tokenFromSession || tokenFromLocal;

    if (!token) {
      setTokenError(
        "Registration token is missing. Please complete OTP verification first."
      );
      setTimeout(() => {
        router.push("/login?mode=otp");
      }, 2000);
      setIsLoading(false);
      return;
    }

    setRegisterToken(token);
    setIsLoading(false);
  }, [router, searchParams]);

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--login-view-bg)" }}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (tokenError) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4"
        style={{ backgroundColor: "var(--login-view-bg)" }}
      >
        <picture className="absolute top-0 left-0 pointer-events-none select-none w-full">
          <source srcSet="/background-login.avif" type="image/avif" />
          <source srcSet="/threadly-background-webp.webp" type="image/webp" />
          <img
            alt="threadly-background"
            height={510}
            width={1785}
            src="/tRm8c5IuJJa.png"
            className="w-full h-auto"
          />
        </picture>

        <div className="relative z-10 w-full max-w-md text-center">
          <h1
            className="text-3xl font-bold mb-4"
            style={{ color: "var(--login-view-text-primary)" }}
          >
            Error
          </h1>
          <p
            className="text-base mb-8"
            style={{ color: "var(--login-view-text-secondary)" }}
          >
            {tokenError}
          </p>
          <Link
            href="/login?mode=otp"
            className="inline-block px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:opacity-90"
            style={{
              backgroundColor: "var(--login-form-button-bg)",
              color: "var(--login-form-button-text)",
            }}
          >
            Back to OTP Verification
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4"
      style={{ backgroundColor: "var(--login-view-bg)" }}
    >
      {/* Background Image */}
      <picture className="absolute top-0 left-0 pointer-events-none select-none w-full">
        <source srcSet="/background-login.avif" type="image/avif" />
        <source srcSet="/threadly-background-webp.webp" type="image/webp" />
        <img
          alt="threadly-background"
          height={510}
          width={1785}
          src="/tRm8c5IuJJa.png"
          className="w-full h-auto"
        />
      </picture>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md">
        <div className="space-y-2 mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                style={{ color: "var(--login-view-text-primary)" }}
              >
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
            </div>
          </div>
          <h1
            className="text-3xl font-bold text-center"
            style={{ color: "var(--login-view-text-primary)" }}
          >
            Complete Your Profile
          </h1>
          <p
            className="text-center text-sm"
            style={{ color: "var(--login-view-text-secondary)" }}
          >
            Set your display name and password to finish your registration
          </p>
        </div>

        {/* Complete Profile Component */}
        <div className="bg-opacity-50 backdrop-blur-sm">
          <CompleteProfile
            registerToken={registerToken}
            onCancel={() => router.back()}
            inputBgColor="var(--login-form-input-bg)"
            inputBorderColor="var(--login-form-input-border)"
            inputBorderColorFocus="var(--login-form-input-border-focus)"
            inputTextColor="var(--login-form-input-text)"
            buttonBgColor="var(--login-form-button-bg)"
            buttonTextColor="var(--login-form-button-text)"
            buttonBgColorDisabled="var(--login-form-button-bg-disabled)"
            buttonTextColorDisabled="var(--login-form-button-text-disabled)"
            errorTextColor="var(--login-form-error-text)"
          />
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center">
          <p
            className="text-xs"
            style={{ color: "var(--login-view-text-secondary)" }}
          >
            Already have an account?{" "}
            <Link
              href="/login"
              className="transition duration-200"
              style={{ color: "var(--login-view-button-text)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color =
                  "var(--login-view-button-text-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--login-view-button-text)")
              }
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 text-xs">
        <span style={{ color: "var(--login-view-text-secondary)" }}>
          © 2025
        </span>
        <Link
          href="/terms"
          className="transition duration-200"
          style={{ color: "var(--login-view-button-text)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color =
              "var(--login-view-button-text-hover)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--login-view-button-text)")
          }
        >
          Threadly Terms
        </Link>
        <Link
          href="/privacy"
          className="transition duration-200"
          style={{ color: "var(--login-view-button-text)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color =
              "var(--login-view-button-text-hover)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--login-view-button-text)")
          }
        >
          Privacy Policy
        </Link>
      </div>
    </div>
  );
};
