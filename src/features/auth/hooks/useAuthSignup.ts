"use client";

import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { setCredentials } from "@/store/authSlice";
import { RegisterRequest } from "@/features/auth/types";
import { authService } from "@/features/auth/services/authService";
import { userService } from "@/features/user/services/userService";

/**
 * useAuthSignup Hook
 *
 * SECURITY: Implements in-memory access token pattern.
 * - Access token is stored ONLY in Redux state (RAM), not in localStorage
 * - Token is lost on page reload and must be refreshed via AuthInitializer
 * - This prevents XSS attacks that could steal tokens from localStorage
 */
export const useAuthSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const signup = useCallback(
    async (credentials: RegisterRequest): Promise<boolean> => {
      setLoading(true);
      setError(null);

      try {
        // Call auth service - returns AuthResponse (data already extracted from ApiResult)
        const authData = await authService.register(credentials);

        // Extract access token from response
        const accessToken = authData?.accessToken;

        if (!accessToken) {
          throw new Error("No access token received");
        }

        // Fetch user profile after successful registration
        // AuthResponse doesn't include user data, so we fetch it separately
        let userProfile;
        try {
          userProfile = await userService.getCurrentUserProfile();
        } catch (profileError) {
          console.warn("Failed to fetch user profile:", profileError);
          // Use minimal user data from registration
          userProfile = {
            userId: 0,
            username: credentials.email.split("@")[0],
            email: credentials.email,
            displayName: credentials.displayName,
          } as any;
        }

        // SECURITY: Store token and user in Redux ONLY (in-memory, not persisted)
        // Token is stored in RAM and will be lost on page reload
        // AuthInitializer will automatically refresh token on app mount if needed
        dispatch(
          setCredentials({
            user: {
              id: userProfile.userId.toString(),
              name: userProfile.displayName,
              email: userProfile.email,
              avatarUrl: userProfile.avatarUrl,
            },
            accessToken: accessToken,
          })
        );

        return true;
      } catch (err: any) {
        const message =
          err?.response?.data?.error?.message ||
          err?.message ||
          "Registration failed. Please try again.";
        setError(message);
        console.error("Signup error:", err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  return { signup, loading, error };
};
