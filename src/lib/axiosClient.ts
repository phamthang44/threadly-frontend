/**
 * Configured Axios Client
 *
 * Features:
 * - Base URL from environment variable
 * - Automatic Bearer token injection from cookies/localStorage
 * - Response data extraction from ApiResult structure
 * - Global 401 error handling with automatic logout and redirect
 */

import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { ApiResult } from "./types/api.types";
import { store } from "@/store";
import { logout } from "@/store/authSlice";

/**
 * Get base URL from environment variable
 * Falls back to a default if not set
 */
const getBaseURL = (): string => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  if (!baseURL) {
    console.warn(
      "NEXT_PUBLIC_API_URL is not set. Please configure it in your .env file."
    );
    return "http://localhost:8080"; // Default fallback
  }

  return baseURL;
};

/**
 * Create configured Axios instance
 */
const axiosClient: AxiosInstance = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true, // Important for httpOnly cookies (refresh token)
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 seconds
});

/**
 * Request Interceptor
 * Automatically attaches Bearer token to Authorization header
 * SECURITY: Token is retrieved from Redux store (in-memory only, not persisted)
 */
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Only run in browser environment
    if (typeof window !== "undefined") {
      // Get access token from Redux store (in-memory only)
      const state = store.getState();
      const accessToken = state.auth.accessToken;

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * - Extracts data from ApiResult structure
 * - Handles global error cases (especially 401)
 */
axiosClient.interceptors.response.use(
  /**
   * Success Response Handler
   * Extracts and returns the data directly from ApiResult structure
   */
  (response: AxiosResponse<ApiResult>) => {
    const { data } = response;

    // If the response has an error field, treat it as an error
    if (data?.error) {
      const error = new Error(data.error.message || "An error occurred");
      (error as any).code = data.error.code;
      (error as any).traceId = data.error.traceId;
      (error as any).details = data.error.details;
      return Promise.reject(error);
    }

    // Return the data directly (extracted from ApiResult.data)
    // Also preserve meta information if needed
    return {
      ...response,
      data: data?.data ?? data, // Extract data field, fallback to full response
      meta: data?.meta, // Preserve meta for pagination, etc.
    };
  },

  /**
   * Error Response Handler
   * Handles 401 Unauthorized errors globally
   */
  async (error: AxiosError<ApiResult>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      // Prevent infinite retry loops
      if (originalRequest?._retry) {
        // Already retried, clear auth and redirect
        handleUnauthorized();
        return Promise.reject(error);
      }

      // Mark request as retried
      if (originalRequest) {
        originalRequest._retry = true;
      }

      // Clear authentication data
      handleUnauthorized();

      // Reject the promise to prevent the request from continuing
      return Promise.reject(error);
    }

    // Handle other errors
    // Extract error details from ApiResult if available
    if (error.response?.data?.error) {
      const apiError = error.response.data.error;
      const customError = new Error(apiError.message || "An error occurred");
      (customError as any).code = apiError.code;
      (customError as any).traceId = apiError.traceId;
      (customError as any).details = apiError.details;
      return Promise.reject(customError);
    }

    // Fallback to original error
    return Promise.reject(error);
  }
);

/**
 * Handle Unauthorized (401) errors
 * Clears user session and redirects to login page
 * SECURITY: Only clears Redux state (in-memory). No localStorage cleanup needed.
 */
const handleUnauthorized = (): void => {
  // Only run in browser environment
  if (typeof window === "undefined") {
    return;
  }

  // Clear Redux store (this clears in-memory accessToken and user data)
  try {
    store.dispatch(logout());
  } catch (e) {
    console.warn("Could not clear Redux store:", e);
  }

  // Redirect to login page
  // Using window.location for reliable redirect in interceptors
  const currentPath = window.location.pathname;
  const loginPath = "/login";

  // Only redirect if not already on login page
  if (currentPath !== loginPath && !currentPath.startsWith("/login")) {
    // Optionally preserve the intended destination
    const redirectTo = encodeURIComponent(currentPath);
    window.location.href = `${loginPath}${
      redirectTo !== "/" ? `?redirect=${redirectTo}` : ""
    }`;
  }
};

export default axiosClient;
