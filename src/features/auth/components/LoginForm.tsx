"use client";

import { Button, Input } from "@/components/ui";
import React, { useState } from "react";
import { EyeIcon, EyeClosed } from "lucide-react";
import { ErrorBanner } from "@/features/auth/components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type LoginFields = { identifier: string; password: string };

const schema = yup.object({
  identifier: yup
    .string()
    .required("Email or username is required!")
    .min(1, "Please enter your email or username"),
  password: yup.string().required("Password is required"),
});

interface LoginFormProps {
  handleManualLogin: (data: LoginFields) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

const LoginForm: React.FC<LoginFormProps> = ({
  handleManualLogin,
  isLoading = false,
  error: externalError = null,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
    watch,
  } = useForm<LoginFields>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const [show, setShow] = useState(false);
  const identifier = watch("identifier");
  const password = watch("password");

  const isFormValid = isDirty && isValid && !isSubmitting && !isLoading;
  const hasError =
    (errors && Object.keys(errors).length > 0) || !!externalError;

  const onSubmit = async (data: LoginFields) => {
    await handleManualLogin(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Display external error from API */}
        {externalError && (
          <div
            className="p-3 rounded-lg text-sm font-medium text-center"
            style={{
              backgroundColor: "var(--login-form-error-text)20",
              color: "var(--login-form-error-text)",
            }}
          >
            {externalError}
          </div>
        )}
        {/* Display form validation errors */}
        {errors && Object.keys(errors).length > 0 && !externalError && (
          <ErrorBanner />
        )}

        <div>
          <Input
            {...register("identifier")}
            name="identifier"
            type="text"
            placeholder="Username, or email"
            autoComplete="username"
            className="w-full rounded-lg px-4 py-4 border-1 transition-all duration-200 focus:outline-none"
            style={{
              backgroundColor: "var(--login-form-input-bg)",
              borderColor: identifier
                ? "var(--login-form-input-border-focus)"
                : "var(--login-form-input-border)",
              color: "var(--login-form-input-text)",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor =
                "var(--login-form-input-border-focus)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = identifier
                ? "var(--login-form-input-border-focus)"
                : "var(--login-form-input-border)";
            }}
          />
          {errors.identifier && (
            <p
              className="text-left ml-2 mt-2 text-xs font-medium"
              style={{ color: "var(--login-form-error-text)" }}
            >
              {errors.identifier.message}
            </p>
          )}
        </div>

        <div>
          <div className="relative">
            <Input
              {...register("password")}
              name="password"
              type={show ? "text" : "password"}
              placeholder="Enter your password"
              autoComplete="off"
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
              onClick={() => setShow(!show)}
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
              {show ? <EyeIcon size={20} /> : <EyeClosed size={20} />}
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

        <Button
          type="submit"
          disabled={!isFormValid || isSubmitting || isLoading}
          className="w-full rounded-lg px-4 py-3 font-semibold transition-all duration-200 flex items-center justify-center gap-2"
          style={{
            backgroundColor:
              isFormValid && !isLoading
                ? "var(--login-form-button-bg)"
                : "var(--login-form-button-bg-disabled)",
            color:
              isFormValid && !isLoading
                ? "var(--login-form-button-text)"
                : "var(--login-form-button-text-disabled)",
            cursor: isFormValid && !isLoading ? "pointer" : "not-allowed",
          }}
          onMouseEnter={(e) => {
            if (isFormValid && !isLoading) {
              (e.currentTarget as HTMLButtonElement).style.transform =
                "scale(1.01)";
            }
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          }}
        >
          {isLoading && (
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          <span className="pointer-events-none select-none">
            {isLoading || isSubmitting ? "Logging in..." : "Log in"}
          </span>
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
