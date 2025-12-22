"use client";

import { Button, Input } from "@/components/ui";
import React, { useState } from "react";
import { EyeIcon, EyeClosed } from "lucide-react";
import { ErrorBanner } from "@/features/auth/components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type SignUpFields = {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object({
  displayName: yup
    .string()
    .required("Display name is required!")
    .min(3, "Display name must be at least 3 characters")
    .max(50, "Display name must be at most 50 characters"),
  email: yup
    .string()
    .required("Email is required!")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please enter a valid email address"
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

interface SignUpFormProps {
  handleManualSignup: (data: SignUpFields) => Promise<void>;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ handleManualSignup }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
    watch,
  } = useForm<SignUpFields>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const displayName = watch("displayName");
  const email = watch("email");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const isFormValid = isDirty && isValid && !isSubmitting;

  const onSubmit = async (data: SignUpFields) => {
    await handleManualSignup(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {errors && Object.keys(errors).length > 0 && <ErrorBanner />}

        <div>
          <Input
            {...register("displayName")}
            name="displayName"
            type="text"
            placeholder="Full name"
            autoComplete="name"
            className="w-full rounded-lg px-4 py-3 md:py-4 border-1 transition-all duration-200 focus:outline-none min-h-[44px]"
            style={{
              backgroundColor: "var(--login-form-input-bg)",
              borderColor: displayName
                ? "var(--login-form-input-border-focus)"
                : "var(--login-form-input-border)",
              color: "var(--login-form-input-text)",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor =
                "var(--login-form-input-border-focus)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = displayName
                ? "var(--login-form-input-border-focus)"
                : "var(--login-form-input-border)";
            }}
          />
          {errors.displayName && (
            <p
              className="text-left ml-2 mt-2 text-xs font-medium"
              style={{ color: "var(--login-form-error-text)" }}
            >
              {errors.displayName.message}
            </p>
          )}
        </div>

        <div>
          <Input
            {...register("email")}
            name="email"
            type="text"
            placeholder="Email address"
            autoComplete="email"
            className="w-full rounded-lg px-4 py-3 md:py-4 border-1 transition-all duration-200 focus:outline-none min-h-[44px]"
            style={{
              backgroundColor: "var(--login-form-input-bg)",
              borderColor: email
                ? "var(--login-form-input-border-focus)"
                : "var(--login-form-input-border)",
              color: "var(--login-form-input-text)",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor =
                "var(--login-form-input-border-focus)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = email
                ? "var(--login-form-input-border-focus)"
                : "var(--login-form-input-border)";
            }}
          />
          {errors.email && (
            <p
              className="text-left ml-2 mt-2 text-xs font-medium"
              style={{ color: "var(--login-form-error-text)" }}
            >
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <div className="relative">
            <Input
              {...register("password")}
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              autoComplete="new-password"
              className="w-full rounded-lg px-4 py-4 pr-12 border-1 transition-all duration-200 focus:outline-none"
              style={{
                backgroundColor: "var(--login-form-input-bg)",
                borderColor: password
                  ? "var(--login-form-input-border-focus)"
                  : "var(--login-form-input-border)",
                color: "var(--login-form-input-text)",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor =
                  "var(--login-form-input-border-focus)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = password
                  ? "var(--login-form-input-border-focus)"
                  : "var(--login-form-input-border)";
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer transition-colors duration-200 p-1"
              style={{
                color: "var(--login-form-icon-color)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget.firstChild as SVGElement).style.color =
                  "var(--login-form-input-text)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget.firstChild as SVGElement).style.color =
                  "var(--login-form-icon-color)";
              }}
            >
              {showPassword ? <EyeIcon size={20} /> : <EyeClosed size={20} />}
            </button>
          </div>
          {errors.password && (
            <p
              className="text-left ml-2 mt-2 text-xs font-medium"
              style={{ color: "var(--login-form-error-text)" }}
            >
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <div className="relative">
            <Input
              {...register("confirmPassword")}
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              autoComplete="new-password"
              className="w-full rounded-lg px-4 py-4 pr-12 border-1 transition-all duration-200 focus:outline-none"
              style={{
                backgroundColor: "var(--login-form-input-bg)",
                borderColor: confirmPassword
                  ? "var(--login-form-input-border-focus)"
                  : "var(--login-form-input-border)",
                color: "var(--login-form-input-text)",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor =
                  "var(--login-form-input-border-focus)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = confirmPassword
                  ? "var(--login-form-input-border-focus)"
                  : "var(--login-form-input-border)";
              }}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer transition-colors duration-200 p-1"
              style={{
                color: "var(--login-form-icon-color)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget.firstChild as SVGElement).style.color =
                  "var(--login-form-input-text)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget.firstChild as SVGElement).style.color =
                  "var(--login-form-icon-color)";
              }}
            >
              {showConfirmPassword ? (
                <EyeIcon size={20} />
              ) : (
                <EyeClosed size={20} />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p
              className="text-left ml-2 mt-2 text-xs font-medium"
              style={{ color: "var(--login-form-error-text)" }}
            >
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className="w-full rounded-lg px-4 py-3 md:py-4 font-semibold transition-all duration-200 flex items-center justify-center min-h-[44px]"
          style={{
            backgroundColor: isFormValid
              ? "var(--login-form-button-bg)"
              : "var(--login-form-button-bg-disabled)",
            color: isFormValid
              ? "var(--login-form-button-text)"
              : "var(--login-form-button-text-disabled)",
            cursor: isFormValid ? "pointer" : "not-allowed",
          }}
          onMouseEnter={(e) => {
            if (isFormValid) {
              (e.currentTarget as HTMLButtonElement).style.transform =
                "scale(1.01)";
            }
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          }}
        >
          <span className="pointer-events-none select-none">
            {isSubmitting ? "Creating account..." : "Create account"}
          </span>
        </Button>
      </form>
    </>
  );
};

export default SignUpForm;
