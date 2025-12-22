/**
 * OTP Verify Request
 * Matches: com.thang.threadly.auth.api.dto.request.OtpVerifyRequest
 */
export interface OtpVerifyRequest {
  email: string; // Required - Email address (max 255 chars, must be valid email format)
  code: string; // Required - OTP code (exactly 6 characters)
}
