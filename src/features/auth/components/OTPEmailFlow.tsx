"use client";

import React, { useState, useCallback } from "react";
import { Button, Input } from "@/components/ui";
import OTPInput from "@/components/ui/atoms/OTPInput";
import { useOTPTimer } from "@/features/auth/hooks/useOTPTimer";
import { useOTPLogin } from "@/features/auth/hooks/useOTPLogin";
import { Mail, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

type OTPFlowStep = "email" | "otp" | "verify";

interface OTPEmailFlowProps {
  onSubmit?: (email: string, otp: string) => Promise<boolean>;
  onCancel?: () => void;
  onRegistrationRequired?: (email: string, registerToken: string) => void;
  emailInputBgColor?: string;
  emailInputBorderColor?: string;
  emailInputBorderColorFocus?: string;
  emailInputTextColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  buttonBgColorDisabled?: string;
  buttonTextColorDisabled?: string;
  timerTextColor?: string;
  successTextColor?: string;
  errorTextColor?: string;
  otpResendWaitSeconds?: number;
  otpExpireSeconds?: number;
}

const OTPEmailFlow: React.FC<OTPEmailFlowProps> = ({
  onSubmit,
  onCancel,
  onRegistrationRequired,
  emailInputBgColor = "var(--login-form-input-bg)",
  emailInputBorderColor = "var(--login-form-input-border)",
  emailInputBorderColorFocus = "var(--login-form-input-border-focus)",
  emailInputTextColor = "var(--login-form-input-text)",
  buttonBgColor = "var(--login-form-button-bg)",
  buttonTextColor = "var(--login-form-button-text)",
  buttonBgColorDisabled = "var(--login-form-button-bg-disabled)",
  buttonTextColorDisabled = "var(--login-form-button-text-disabled)",
  timerTextColor = "var(--login-view-text-secondary)",
  successTextColor = "#10b981",
  errorTextColor = "var(--login-form-error-text)",
  otpResendWaitSeconds = 60,
  otpExpireSeconds = 300,
}) => {
  const router = useRouter();
  const {
    requestOtp,
    verifyOtp,
    loading: authLoading,
    error: authError,
  } = useOTPLogin();
  const [step, setStep] = useState<OTPFlowStep>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [otpTouched, setOtpTouched] = useState(false); // Track if user has attempted to verify

  // Timer for OTP expiration (5 minutes)
  const otpTimer = useOTPTimer({
    initialSeconds: otpExpireSeconds,
    onComplete: () => {
      setError("OTP expired. Please request a new one.");
      setStep("email");
    },
  });

  // Timer for resend button (60 seconds)
  const resendTimer = useOTPTimer({
    initialSeconds: otpResendWaitSeconds,
  });

  const handleRequestOTP = async () => {
    setError("");
    setSuccessMessage("");

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      // Call authService to send OTP via backend
      const success = await requestOtp(email.trim());

      if (success) {
        setStep("otp");
        setSuccessMessage("OTP sent to your email. Check your inbox!");
        otpTimer.start();
        resendTimer.start();
      } else {
        // Error is set by the hook
        setError(authError || "Failed to send OTP. Please try again.");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to send OTP. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError("");
    setSuccessMessage("");
    setOtp("");
    setOtpTouched(false); // Reset touched state when resending

    setIsLoading(true);

    try {
      // Call authService to resend OTP via backend
      const success = await requestOtp(email.trim());

      if (success) {
        setSuccessMessage("OTP resent to your email!");
        otpTimer.reset();
        otpTimer.start();
        resendTimer.reset();
        resendTimer.start();
      } else {
        // Error is set by the hook
        setError(authError || "Failed to resend OTP. Please try again.");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to resend OTP. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (otpValue?: string) => {
    setError("");
    setSuccessMessage("");
    setOtpTouched(true); // Mark as touched when user attempts to verify

    // Use the passed value or fall back to state (for button click)
    const currentOtp = (otpValue || otp).trim();

    // Validate OTP length - check the actual value being verified
    if (!currentOtp || currentOtp.length !== 6) {
      setError("Please enter the complete OTP code");
      return;
    }

    setIsLoading(true);

    try {
      setStep("verify");

      // If custom onSubmit is provided, use it (for backward compatibility)
      if (onSubmit) {
        const success = await onSubmit(email, currentOtp);
        if (success) {
          setSuccessMessage("Email verified successfully!");
          otpTimer.stop();
          resendTimer.stop();
        } else {
          setError("Invalid OTP. Please try again.");
          setStep("otp");
        }
        return;
      }

      // Otherwise, use the hook's verifyOtp method
      const result = await verifyOtp(email.trim(), currentOtp);

      if (result.success) {
        // Login successful - user is redirected by the hook
        setSuccessMessage("Email verified successfully!");
        otpTimer.stop();
        resendTimer.stop();
      } else if (result.registerToken) {
        // User needs to complete registration
        otpTimer.stop();
        resendTimer.stop();

        if (onRegistrationRequired) {
          onRegistrationRequired(email, result.registerToken);
        } else {
          // Store registerToken in sessionStorage and redirect to complete-profile
          sessionStorage.setItem("registerToken", result.registerToken);
          sessionStorage.setItem("registrationEmail", email);
          router.push("/complete-profile");
        }
      } else {
        // Verification failed
        setError(authError || "Invalid OTP. Please try again.");
        setStep("otp");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Verification failed. Please try again."
      );
      setStep("otp");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setError("");
    setSuccessMessage("");
    setOtp("");
    setEmail("");
    setOtpTouched(false); // Reset touched state
    setStep("email");
    otpTimer.stop();
    resendTimer.stop();
  };

  return (
    <div className="w-full space-y-6">
      {step === "email" && (
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <Mail
              size={40}
              style={{ margin: "0 auto", color: buttonBgColor }}
            />
            <h2
              className="text-lg font-semibold"
              style={{ color: emailInputTextColor }}
            >
              Email Verification
            </h2>
            <p className="text-sm" style={{ color: timerTextColor }}>
              Enter your email to receive an OTP code
            </p>
          </div>

          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            disabled={isLoading}
            autoComplete="email"
            className="w-full rounded-lg px-4 py-4 border-1 transition-all duration-200 focus:outline-none"
            style={{
              backgroundColor: emailInputBgColor,
              borderColor: email
                ? emailInputBorderColorFocus
                : emailInputBorderColor,
              color: emailInputTextColor,
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = emailInputBorderColorFocus;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = email
                ? emailInputBorderColorFocus
                : emailInputBorderColor;
            }}
          />

          {(error || authError) && (
            <div
              className="flex items-center gap-2"
              style={{ color: errorTextColor }}
            >
              <AlertCircle size={18} />
              <span className="text-sm">{error || authError}</span>
            </div>
          )}

          <Button
            onClick={handleRequestOTP}
            disabled={!email.trim() || isLoading || authLoading}
            className="w-full rounded-lg px-4 py-3 font-semibold transition-all duration-200 flex items-center justify-center"
            style={{
              backgroundColor:
                !email.trim() || isLoading || authLoading
                  ? buttonBgColorDisabled
                  : buttonBgColor,
              color:
                !email.trim() || isLoading || authLoading
                  ? buttonTextColorDisabled
                  : buttonTextColor,
              cursor:
                !email.trim() || isLoading || authLoading
                  ? "not-allowed"
                  : "pointer",
            }}
            onMouseEnter={(e) => {
              if (email.trim() && !isLoading && !authLoading) {
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "scale(1.01)";
              }
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform =
                "scale(1)";
            }}
          >
            {isLoading || authLoading ? "Sending OTP..." : "Send OTP"}
          </Button>

          {onCancel && (
            <Button
              onClick={onCancel}
              className="w-full rounded-lg px-4 py-3 font-semibold transition-all duration-200 flex items-center justify-center"
              style={{
                backgroundColor: "transparent",
                color: buttonBgColor,
                border: `1px solid ${buttonBgColor}`,
                cursor: "pointer",
              }}
            >
              Cancel
            </Button>
          )}
        </div>
      )}

      {step === "otp" && (
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <CheckCircle
              size={40}
              style={{ margin: "0 auto", color: successTextColor }}
            />
            <h2
              className="text-lg font-semibold"
              style={{ color: emailInputTextColor }}
            >
              Enter OTP Code
            </h2>
            <p className="text-sm" style={{ color: timerTextColor }}>
              We sent a code to <span className="font-semibold">{email}</span>
            </p>
          </div>

          {successMessage && (
            <div
              className="flex items-center gap-2 bg-green-500/10 p-3 rounded-lg"
              style={{
                color: successTextColor,
                borderLeft: `3px solid ${successTextColor}`,
              }}
            >
              <CheckCircle size={18} />
              <span className="text-sm">{successMessage}</span>
            </div>
          )}

          <OTPInput
            length={6}
            onChange={(value) => {
              setOtp(value);
              // Clear error immediately when user types, especially when OTP becomes complete
              if (error) {
                // Clear validation errors immediately when user types
                if (error === "Please enter the complete OTP code") {
                  setError("");
                  setOtpTouched(false); // Reset touched state when user corrects
                }
              }
              // If OTP becomes complete, clear any validation errors
              if (
                value.length === 6 &&
                error === "Please enter the complete OTP code"
              ) {
                setError("");
                setOtpTouched(false);
              }
            }}
            onComplete={(value) => {
              // Pass the value directly to avoid state timing issues
              // Only auto-verify if OTP is complete and valid
              if (value && value.length === 6) {
                // Clear any existing validation errors before verifying
                if (error === "Please enter the complete OTP code") {
                  setError("");
                }
                setOtpTouched(false); // Reset touched since we have valid input
                // Update state and verify with the actual value
                setOtp(value);
                // Pass value directly to avoid state timing issues
                handleVerifyOTP(value);
              }
            }}
            disabled={isLoading || authLoading}
            // Only show error in OTPInput if it's a validation error AND user has attempted to verify
            // Don't show API errors in the input borders (only show in error message below)
            error={
              otpTouched && error === "Please enter the complete OTP code"
                ? error
                : undefined
            }
            inputBgColor={emailInputBgColor}
            inputBorderColor={emailInputBorderColor}
            inputBorderColorFocus={emailInputBorderColorFocus}
            inputTextColor={emailInputTextColor}
            errorTextColor={errorTextColor}
          />

          {/* Show error message only once, below the OTP input */}
          {(error || authError) && (
            <div
              className="flex items-center gap-2"
              style={{ color: errorTextColor }}
            >
              <AlertCircle size={18} />
              <span className="text-sm">{error || authError}</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-1"
              style={{ color: timerTextColor }}
            >
              <Clock size={16} />
              <span className="text-sm">
                OTP expires in:{" "}
                <span style={{ color: buttonBgColor }}>
                  {otpTimer.formatTime()}
                </span>
              </span>
            </div>
            {otpTimer.seconds < 30 && (
              <span
                className="text-xs font-semibold"
                style={{ color: errorTextColor }}
              >
                Expiring soon!
              </span>
            )}
          </div>

          <Button
            onClick={() => handleVerifyOTP()} // Button click uses state value
            disabled={
              !otp ||
              otp.length !== 6 ||
              isLoading ||
              authLoading ||
              !otpTimer.isRunning
            }
            className="w-full rounded-lg px-4 py-3 font-semibold transition-all duration-200 flex items-center justify-center"
            style={{
              backgroundColor:
                !otp ||
                otp.length !== 6 ||
                isLoading ||
                authLoading ||
                !otpTimer.isRunning
                  ? buttonBgColorDisabled
                  : buttonBgColor,
              color:
                !otp ||
                otp.length !== 6 ||
                isLoading ||
                authLoading ||
                !otpTimer.isRunning
                  ? buttonTextColorDisabled
                  : buttonTextColor,
              cursor:
                !otp ||
                otp.length !== 6 ||
                isLoading ||
                authLoading ||
                !otpTimer.isRunning
                  ? "not-allowed"
                  : "pointer",
            }}
            onMouseEnter={(e) => {
              if (
                otp &&
                otp.length === 6 &&
                !isLoading &&
                !authLoading &&
                otpTimer.isRunning
              ) {
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "scale(1.01)";
              }
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform =
                "scale(1)";
            }}
          >
            {isLoading || authLoading ? "Verifying..." : "Verify OTP"}
          </Button>

          <div className="text-center space-y-3">
            <p className="text-sm" style={{ color: timerTextColor }}>
              Didn&#x27;t receive the code?
            </p>
            <Button
              onClick={handleResendOTP}
              disabled={resendTimer.isRunning || isLoading || authLoading}
              className="w-full rounded-lg px-4 py-3 font-semibold transition-all duration-200"
              style={{
                backgroundColor: "transparent",
                color:
                  resendTimer.isRunning || authLoading
                    ? timerTextColor
                    : buttonBgColor,
                border: `1px solid ${
                  resendTimer.isRunning || authLoading
                    ? timerTextColor
                    : buttonBgColor
                }`,
                cursor:
                  resendTimer.isRunning || authLoading
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              {resendTimer.isRunning
                ? `Resend in ${resendTimer.formatTime()}`
                : authLoading
                ? "Resending..."
                : "Resend OTP"}
            </Button>

            <Button
              onClick={handleBackToEmail}
              className="w-full rounded-lg px-4 py-2 font-semibold transition-all duration-200 text-sm"
              style={{
                backgroundColor: "transparent",
                color: timerTextColor,
                cursor: "pointer",
              }}
            >
              Change email
            </Button>
          </div>
        </div>
      )}

      {step === "verify" && (
        <div className="text-center space-y-4">
          <div className="space-y-3">
            <div style={{ fontSize: "3rem" }}>✓</div>
            <h2
              className="text-lg font-semibold"
              style={{ color: emailInputTextColor }}
            >
              {successMessage || "Verification Complete!"}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default OTPEmailFlow;
