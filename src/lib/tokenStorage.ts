/**
 * @deprecated This file is DEPRECATED and should not be used.
 *
 * SECURITY REFACTOR: In-Memory Access Token Pattern
 *
 * This file previously stored access tokens in localStorage, which is vulnerable to XSS attacks.
 * The authentication flow has been refactored to use an in-memory token pattern for better security.
 *
 * **What Changed:**
 * - Access tokens are now stored ONLY in Redux state (RAM), not in localStorage
 * - Tokens are lost on page reload (by design) and must be refreshed via AuthInitializer
 * - Refresh tokens are handled automatically via httpOnly cookies (backend manages this)
 *
 * **Migration Guide:**
 * - ❌ DO NOT use: getAccessToken(), setAccessToken(), clearAuthData()
 * - ✅ USE INSTEAD:
 *   - Get token: `store.getState().auth.accessToken`
 *   - Set token: Dispatch `setCredentials()` action to Redux
 *   - Clear auth: Dispatch `logout()` action to Redux
 *
 * **Files Updated:**
 * - `src/lib/axiosClient.ts` - Now gets token from Redux store
 * - `src/components/AuthInitializer.tsx` - Handles token refresh on mount
 * - `src/store/index.ts` - accessToken excluded from persistence
 *
 * This file will be removed in a future version.
 *
 * @see src/lib/axiosClient.ts for token retrieval in request interceptor
 * @see src/components/AuthInitializer.tsx for token refresh logic
 * @see src/store/authSlice.ts for token storage in Redux
 */

// All exports are deprecated - do not use
export const getAccessToken = (): string | null => {
  console.warn(
    "getAccessToken() is deprecated. Use store.getState().auth.accessToken instead."
  );
  return null;
};

export const setAccessToken = (_token: string): void => {
  console.warn(
    "setAccessToken() is deprecated. Dispatch setCredentials() to Redux instead."
  );
};

export const removeAccessToken = (): void => {
  console.warn(
    "removeAccessToken() is deprecated. Dispatch logout() to Redux instead."
  );
};

export const clearAuthData = (): void => {
  console.warn(
    "clearAuthData() is deprecated. Dispatch logout() to Redux instead."
  );
};
