import { Metadata } from "next";
import { CompleteProfilePageView } from "@/features/auth/components/CompleteProfilePageView";

/**
 * Complete Profile Page
 *
 * Server Component - Final step for users without an account.
 * After OTP verification, users complete their profile here.
 *
 * This page is a Server Component for SEO benefits and initial render performance.
 * All client-side logic (state, effects, browser APIs) is handled by CompleteProfilePageView.
 */
export const metadata: Metadata = {
  title: "Complete Your Profile | Threadly",
  description:
    "Finish your Threadly registration by setting your display name and password.",
  robots: {
    index: false, // Don't index registration pages
    follow: false,
  },
};

export default function CompleteProfilePage() {
  return <CompleteProfilePageView />;
}
