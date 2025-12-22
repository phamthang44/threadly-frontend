import { Metadata } from "next";
import { LoginView } from "@/features/auth/components";

/**
 * Login Page
 *
 * Server Component - Handles user authentication with multiple login methods:
 * - Instagram OAuth
 * - Username/Email + Password
 * - OTP via Email
 *
 * This page is a Server Component for SEO benefits and initial render performance.
 * All authentication logic is handled by LoginView component (Client Component)
 * which uses the useAuthLogin hook for actual API calls.
 */
export const metadata: Metadata = {
  title: "Sign In | Threadly",
  description:
    "Sign in to Threadly to share your thoughts, find out what's going on, follow your people and more.",
  robots: {
    index: false, // Don't index login pages
    follow: false,
  },
};

export default function LoginPage() {
  return <LoginView />;
}
