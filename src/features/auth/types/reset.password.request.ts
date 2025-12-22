/**
 * Reset Password Request
 * Matches: com.thang.threadly.auth.api.dto.request.ResetPasswordRequest
 */
export interface ResetPasswordRequest {
  email: string; // Required - Email address (max 255 chars, must be valid email format)
  otp: string; // Required - OTP code (exactly 6 characters)
  newPassword: string; // Required - New password (min 10 chars, must contain uppercase, lowercase, digit, special char)
}
