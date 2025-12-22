import { Metadata } from "next";
import { OTPVerifyPageView } from "@/features/auth/components/OTPVerifyPageView";

/**
 * OTP Verification Page
 *
 * Server Component - Handles two scenarios:
 * A: User without account -> Gets registerToken -> Redirects to complete-profile
 * B: User with account -> Gets accessToken -> Redirects to home
 *
 * This page is a Server Component for SEO benefits and initial render performance.
 * All client-side logic (state, effects, Redux, browser APIs) is handled by OTPVerifyPageView.
 */
export const metadata: Metadata = {
  title: "Verify Your Email | Threadly",
  description:
    "Verify your email address with a one-time password to complete your Threadly account setup or login.",
  robots: {
    index: false, // Don't index verification pages
    follow: false,
  },
};

export default function OTPVerifyPage() {
  return <OTPVerifyPageView />;
}
