"use client";

import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/store";
import {
  setCredentials,
  setLoading as setAuthLoading,
} from "@/store/authSlice";
import { authService } from "@/features/auth/services/authService";
import { userService } from "@/features/user/services/userService";
import { AuthStatus } from "@/features/auth/types";

/**
 * useOTPLogin Hook
 *
 * Handles OTP-based login flow:
 * 1. Request OTP code to be sent to email
 * 2. Verify OTP code and login
 *
 * SECURITY: Implements in-memory access token pattern.
 * - Access token is stored ONLY in Redux state (RAM), not in localStorage
 * - Token is lost on page reload and must be refreshed via AuthInitializer
 */
export const useOTPLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  /**
   * Request OTP code to be sent to email
   */
  const requestOtp = useCallback(async (email: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      await authService.requestOtp({ email });
      return true;
    } catch (err: any) {
      const message =
        err?.response?.data?.error?.message ||
        err?.message ||
        "Failed to send OTP. Please try again.";
      setError(message);
      console.error("Request OTP error:", err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Verify OTP code and complete login
   * Returns true if login successful, false otherwise
   * If user needs registration, returns false and registerToken is available
   */
  const verifyOtp = useCallback(
    async (
      email: string,
      code: string
    ): Promise<{ success: boolean; registerToken?: string | null }> => {
      setLoading(true);
      setError(null);

      try {
        // Call auth service to verify OTP
        const authData = await authService.verifyOtp({ email, code });

        // SCENARIO A: User needs to complete registration
        if (authData.registerToken) {
          return {
            success: false,
            registerToken: authData.registerToken,
          };
        }

        // SCENARIO B: User has account -> Direct login
        if (
          authData.status === AuthStatus.LOGIN_SUCCESS &&
          authData.accessToken
        ) {
          // Set global loading state while fetching user profile
          dispatch(setAuthLoading(true));

          // Fetch user profile after successful OTP verification
          let userProfile;
          try {
            userProfile = await userService.getCurrentUserProfile();
          } catch (profileError) {
            console.warn("Failed to fetch user profile:", profileError);
            // Use minimal user data from email
            userProfile = {
              userId: 0,
              username: email.split("@")[0],
              email: email,
              displayName: email.split("@")[0],
            } as any;
          }

          // SECURITY: Store token and user in Redux ONLY (in-memory, not persisted)
          // setCredentials already sets isLoading to false
          dispatch(
            setCredentials({
              user: {
                id: userProfile.userId.toString(),
                name: userProfile.displayName,
                email: userProfile.email,
                avatarUrl: userProfile.avatarUrl,
              },
              accessToken: authData.accessToken,
            })
          );

          // Redirect to home
          router.push("/");
          return { success: true };
        }

        throw new Error("Invalid response from server");
      } catch (err: any) {
        const message =
          err?.response?.data?.error?.message ||
          err?.message ||
          "OTP verification failed. Please try again.";
        setError(message);
        console.error("Verify OTP error:", err);
        return { success: false };
      } finally {
        setLoading(false);
      }
    },
    [dispatch, router]
  );

  return { requestOtp, verifyOtp, loading, error };
};
