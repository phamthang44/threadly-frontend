"use client";

import { useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setCredentials, logout, setLoading } from "@/store/authSlice";
import { authService } from "@/features/auth/services/authService";
import AuthLoader from "@/components/AuthLoader";

/**
 * AuthInitializer Component
 *
 * SECURITY: Implements in-memory access token pattern.
 * - On app mount, checks if accessToken is null (lost on page reload)
 * - If user was previously authenticated (user data persisted), attempts token refresh
 * - Refresh token is sent automatically via httpOnly cookie (handled by browser)
 * - On success: Restores accessToken in Redux (in-memory only)
 * - On failure: Clears auth state and redirects to login
 * - Shows Loader during token refresh (F5 scenario) via AuthLoader component
 * - Prevents duplicate refreshToken calls using useRef flag
 */
export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, accessToken } = useAppSelector((s) => s.auth);
  const isRefreshingRef = useRef(false);

  useEffect(() => {
    const tryRefresh = async () => {
      // If accessToken is null but user exists (was authenticated before page reload)
      // This means the token was lost (not persisted for security) and needs refresh
      if (!accessToken && user && isAuthenticated) {
        // Prevent duplicate calls - check if refresh is already in progress
        if (isRefreshingRef.current) {
          console.log(
            "Token refresh already in progress, skipping duplicate call"
          );
          return;
        }

        // Set flag to prevent duplicate calls
        isRefreshingRef.current = true;
        dispatch(setLoading(true));

        try {
          // Call auth service to refresh token
          // Refresh token cookie is sent automatically by browser (httpOnly)
          const authData = await authService.refreshToken();

          if (authData?.accessToken) {
            // Restore accessToken in Redux (in-memory only, not persisted)
            dispatch(
              setCredentials({
                user: user, // Keep existing user data
                accessToken: authData.accessToken,
              })
            );
          } else {
            // No token in response, logout
            dispatch(logout());
          }
        } catch (err) {
          console.error("Token refresh failed:", err);
          // Refresh failed - clear auth state
          dispatch(logout());
        } finally {
          // Reset flag and loading state
          isRefreshingRef.current = false;
          dispatch(setLoading(false));
        }
      }
    };

    tryRefresh();
  }, [accessToken, user, isAuthenticated, dispatch]);

  return (
    <>
      <AuthLoader />
      {children}
    </>
  );
}
