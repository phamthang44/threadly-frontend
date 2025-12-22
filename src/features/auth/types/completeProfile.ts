/**
 * Types for CompleteProfile component and registration flow
 */

/**
 * Fields submitted in the complete profile form
 */
export interface CompleteProfileFormData {
  displayName: string;
  password: string;
  confirmPassword: string;
}

/**
 * Props for the CompleteProfile component
 */
export interface CompleteProfileProps {
  /**
   * Registration token received from OTP verification step
   * Used to authorize the register-finish API call
   */
  registerToken: string;

  /**
   * Optional callback when user clicks cancel button
   */
  onCancel?: () => void;

  // Styling props with CSS variable defaults
  inputBgColor?: string;
  inputBorderColor?: string;
  inputBorderColorFocus?: string;
  inputTextColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  buttonBgColorDisabled?: string;
  buttonTextColorDisabled?: string;
  errorTextColor?: string;
}

/**
 * Response from register-finish API endpoint
 */
export interface RegisterFinishResponse {
  accessToken: string;
  refreshToken?: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

/**
 * Error response from register-finish API endpoint
 */
export interface RegisterFinishErrorResponse {
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
}

import { Gender } from "./enums";

/**
 * Request body for register-finish API endpoint
 * Matches: com.thang.threadly.auth.api.dto.request.RegisterFinishRequest
 */
export interface RegisterFinishRequest {
  registerToken: string; // Required - Token received from OTP verification
  email: string; // Required - Email address of the user
  password: string; // Required - User password (min 10 chars, must contain uppercase, lowercase, digit, special char)
  displayName: string; // Required - Display name (max 100 chars)
  gender?: Gender; // Optional - Gender enum (MALE, FEMALE, OTHER)
  dateOfBirth?: string; // Optional - Date of birth in ISO format (yyyy-MM-dd)
}

/**
 * Complete registration flow context
 */
export interface RegistrationFlowContext {
  /**
   * Email that was verified in OTP step
   */
  email?: string;

  /**
   * Token received after successful OTP verification
   */
  registerToken: string;

  /**
   * Current step in registration flow
   * 'otp' -> 'complete-profile' -> 'success'
   */
  step: "otp" | "complete-profile" | "success";

  /**
   * Timestamp when registration started
   */
  startedAt?: number;
}

/**
 * Validation messages for form fields
 */
export const VALIDATION_MESSAGES = {
  DISPLAY_NAME: {
    REQUIRED: "Display name is required!",
    MIN_LENGTH: "Display name must be at least 3 characters",
    MAX_LENGTH: "Display name must be at most 50 characters",
  },
  PASSWORD: {
    REQUIRED: "Password is required",
    MIN_LENGTH: "Password must be at least 8 characters",
    STRENGTH: "Password must contain uppercase, lowercase, and numbers",
    MISMATCH: "Passwords must match",
  },
  CONFIRM_PASSWORD: {
    REQUIRED: "Please confirm your password",
    MISMATCH: "Passwords must match",
  },
};

/**
 * Password strength levels
 */
export enum PasswordStrength {
  WEAK = "weak",
  MEDIUM = "medium",
  STRONG = "strong",
  VERY_STRONG = "veryStrong",
}

/**
 * Helper function to check password strength
 */
export const getPasswordStrength = (password: string): PasswordStrength => {
  if (!password) return PasswordStrength.WEAK;

  let strength = 0;

  // Check length
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;

  // Check character types
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^a-zA-Z\d]/.test(password)) strength++;

  if (strength <= 2) return PasswordStrength.WEAK;
  if (strength <= 3) return PasswordStrength.MEDIUM;
  if (strength <= 4) return PasswordStrength.STRONG;
  return PasswordStrength.VERY_STRONG;
};
