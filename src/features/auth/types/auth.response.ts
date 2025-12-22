import { AuthStatus } from "./enums";

/**
 * Authentication Response
 * Matches: com.thang.threadly.auth.api.dto.response.AuthResponse
 *
 * NOTE: This response does NOT include user data.
 * User data must be fetched separately from /api/v1/users/me endpoint.
 */
export interface AuthResponse {
  status: AuthStatus; // Required - AuthStatus enum value
  accessToken: string; // Required - JWT access token
  refreshToken: string; // Required - Refresh token (also sent as httpOnly cookie)
  registerToken: string | null; // Nullable - Present when user needs to complete registration
}
