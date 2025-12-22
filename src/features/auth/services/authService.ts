/**
 * Authentication Service
 *
 * SECURITY: In-Memory Access Token Pattern
 * - This service handles all authentication API calls
 * - Returns raw data/response - does NOT store tokens
 * - Token storage is handled by Redux (in-memory only, not persisted)
 * - No localStorage usage - tokens exist only in RAM
 *
 * Architecture:
 * - Decoupled from React state management
 * - Uses configured axiosClient with interceptors
 * - Returns ApiResult<T> structure (extracted by axios interceptor)
 */

import axiosClient from "@/lib/axiosClient";
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  RegisterFinishRequest,
  OtpRequest,
  OtpVerifyRequest,
  ResetPasswordRequest,
} from "../types";

/**
 * Authentication Service
 * All methods return promises that resolve to the response data
 * (ApiResult structure is already extracted by axios interceptor)
 */
export const authService = {
  /**
   * Login with email/username and password
   * @param credentials Login credentials
   * @returns Promise resolving to AuthResponse
   */
  login: (credentials: LoginRequest): Promise<AuthResponse> => {
    return axiosClient
      .post<AuthResponse>("/api/v1/auth/login", credentials)
      .then((response) => response.data);
  },

  /**
   * Register a new user
   * @param data Registration data
   * @returns Promise resolving to AuthResponse
   */
  register: (data: RegisterRequest): Promise<AuthResponse> => {
    return axiosClient
      .post<AuthResponse>("/api/v1/auth/register", data)
      .then((response) => response.data);
  },

  /**
   * Refresh access token using refresh token from httpOnly cookie
   * @returns Promise resolving to AuthResponse with new access token
   */
  refreshToken: (): Promise<AuthResponse> => {
    return axiosClient
      .post<AuthResponse>("/api/v1/auth/refresh", {})
      .then((response) => response.data);
  },

  /**
   * Logout current user
   * Clears refresh token cookie on backend
   * @returns Promise resolving to void
   */
  logout: (): Promise<void> => {
    return axiosClient.post("/api/v1/auth/logout", {}).then(() => undefined);
  },

  /**
   * Request OTP code to be sent to email
   * @param request OTP request with email
   * @returns Promise resolving to void
   */
  requestOtp: (request: OtpRequest): Promise<void> => {
    return axiosClient
      .post("/api/v1/auth/otp/request", request)
      .then(() => undefined);
  },

  /**
   * Verify OTP code
   * @param request OTP verification with email and code
   * @returns Promise resolving to AuthResponse (may include registerToken if new user)
   */
  verifyOtp: (request: OtpVerifyRequest): Promise<AuthResponse> => {
    return axiosClient
      .post<AuthResponse>("/api/v1/auth/otp/verify", request)
      .then((response) => response.data);
  },

  /**
   * Complete registration after OTP verification
   * Matches: POST /api/v1/auth/register
   *
   * @param data Registration completion data (includes registerToken, email, password, displayName, etc.)
   * @returns Promise resolving to AuthResponse
   *
   * NOTE: The registerToken is included in the request body, not as a separate parameter.
   * The backend expects the full RegisterFinishRequest payload.
   */
  finishRegistration: (data: RegisterFinishRequest): Promise<AuthResponse> => {
    return axiosClient
      .post<AuthResponse>("/api/v1/auth/register", data)
      .then((response) => response.data);
  },

  /**
   * Request password reset OTP
   * @param request Request with email
   * @returns Promise resolving to void
   */
  forgotPassword: (request: OtpRequest): Promise<void> => {
    return axiosClient
      .post("/api/v1/auth/forgot-password", request)
      .then(() => undefined);
  },

  /**
   * Reset password using OTP code
   * @param request Reset password request
   * @returns Promise resolving to void
   */
  resetPassword: (request: ResetPasswordRequest): Promise<void> => {
    return axiosClient
      .post("/api/v1/auth/reset-password", request)
      .then(() => undefined);
  },
};
