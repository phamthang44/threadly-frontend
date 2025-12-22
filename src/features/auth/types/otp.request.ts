/**
 * OTP Request
 * Matches: com.thang.threadly.auth.api.dto.request.OtpRequest
 */
export interface OtpRequest {
  email: string; // Required - Email address (max 255 chars, must be valid email format)
}
