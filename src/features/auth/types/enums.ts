/**
 * TypeScript Enums matching Backend Java Enums
 * These enums must exactly match the backend enum values
 */

/**
 * Authentication Status Enum
 * Matches: com.thang.threadly.common.enums.AuthStatus
 */
export enum AuthStatus {
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAILED = "LOGIN_FAILED",
  OTP_SENT = "OTP_SENT",
  OTP_VERIFIED = "OTP_VERIFIED",
  REQUIRE_REGISTRATION = "REQUIRE_REGISTRATION",
}

/**
 * Gender Enum
 * Matches: com.thang.threadly.common.enums.Gender
 * Note: Backend uses @JsonProperty annotations, so values are lowercase in JSON
 */
export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

/**
 * Privacy Enum
 * Matches: com.thang.threadly.common.enums.Privacy
 * Note: Backend uses @JsonProperty annotations, so values are lowercase in JSON
 */
export enum Privacy {
  PUBLIC = "public",
  PRIVATE = "private",
}

