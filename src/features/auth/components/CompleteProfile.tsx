"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, CustomDatePicker } from "@/components/ui";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/authSlice";
import { EyeIcon, EyeClosed } from "lucide-react";
import { authService } from "@/features/auth/services/authService";
import { userService } from "@/features/user/services/userService";
import { Gender } from "@/features/auth/types";
import dayjs from "dayjs";
import type { CompleteProfileProps } from "@/features/auth/types/completeProfile";

type CompleteProfileFields = {
  password: string;
  confirmPassword: string;
  displayName: string;
  dateOfBirth: string;
  gender: Gender;
};

// Helper function to calculate age from date string (YYYY-MM-DD)
const calculateAge = (dateString: string | null | undefined): number => {
  if (!dateString) return 0;
  const date = dayjs(dateString);
  if (!date.isValid()) return 0;
  const today = dayjs();
  let age = today.year() - date.year();
  const monthDiff = today.month() - date.month();
  if (monthDiff < 0 || (monthDiff === 0 && today.date() < date.date())) {
    age--;
  }
  return age;
};

// Get max date (13 years ago) in YYYY-MM-DD format
const getMaxDate = (): string => {
  return dayjs().subtract(13, "year").format("YYYY-MM-DD");
};

const schema = yup.object({
  displayName: yup
    .string()
    .required("Display name is required!")
    .min(3, "Display name must be at least 3 characters")
    .max(50, "Display name must be at most 50 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain uppercase, lowercase, and numbers"
    ),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
  dateOfBirth: yup
    .string()
    .required("Date of birth is required")
    .test("age", "Must be at least 13 years old", function (value) {
      if (!value) return false;
      const age = calculateAge(value);
      return age >= 13;
    }),
  gender: yup
    .mixed<Gender>()
    .oneOf(
      [Gender.MALE, Gender.FEMALE, Gender.OTHER],
      "Please select a valid gender"
    )
    .required("Gender is required"),
});

const CompleteProfile: React.FC<CompleteProfileProps> = ({
  registerToken,
  onCancel,
  inputBgColor = "var(--login-form-input-bg)",
  inputBorderColor = "var(--login-form-input-border)",
  inputBorderColorFocus = "var(--login-form-input-border-focus)",
  inputTextColor = "var(--login-form-input-text)",
  buttonBgColor = "var(--login-form-button-bg)",
  buttonTextColor = "var(--login-form-button-text)",
  buttonBgColorDisabled = "var(--login-form-button-bg-disabled)",
  buttonTextColorDisabled = "var(--login-form-button-text-disabled)",
  errorTextColor = "var(--login-form-error-text)",
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty, isValid },
    watch,
    setValue,
    setError: setFormError,
  } = useForm<CompleteProfileFields>({
    resolver: yupResolver(schema) as any,
    mode: "onChange",
    defaultValues: {
      displayName: "",
      password: "",
      confirmPassword: "",
      dateOfBirth: "",
      gender: "" as Gender,
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiError, setApiError] = useState("");

  const displayName = watch("displayName");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const dateOfBirth = watch("dateOfBirth");
  const gender = watch("gender");

  const isFormValid = isDirty && isValid && !isSubmitting;

  // Get max date for date input (13 years ago)
  const maxDate = useMemo(() => getMaxDate(), []);

  const onSubmit = async (data: CompleteProfileFields) => {
    setApiError("");

    try {
      // Get email from sessionStorage (set during OTP verification)
      const registrationEmail =
        sessionStorage.getItem("registrationEmail") || "";

      // dateOfBirth is already in YYYY-MM-DD format from native date input
      const formattedDateOfBirth = data.dateOfBirth || "";

      // Call auth service to complete registration
      // RegisterFinishRequest must include registerToken, email, password, displayName, dateOfBirth, gender
      const authData = await authService.finishRegistration({
        registerToken: registerToken,
        email: registrationEmail,
        password: data.password,
        displayName: data.displayName,
        dateOfBirth: formattedDateOfBirth,
        gender: data.gender,
      });

      // Extract access token from response
      const accessToken = authData?.accessToken;

      if (!accessToken) {
        throw new Error("No access token received");
      }

      // IMPORTANT: Set credentials FIRST so the accessToken is available in Redux
      // This ensures subsequent API calls (like getCurrentUserProfile) will have the token
      // We'll use minimal user data initially, then update it after fetching the full profile
      dispatch(
        setCredentials({
          user: {
            id: "0", // Temporary, will be updated below
            name: data.displayName,
            email: registrationEmail,
            avatarUrl: undefined,
          },
          accessToken: accessToken,
        })
      );

      // Now fetch user profile after credentials are set (token is now available in Redux)
      let userProfile;
      try {
        userProfile = await userService.getCurrentUserProfile();
        // Update credentials with full user profile data
        dispatch(
          setCredentials({
            user: {
              id: userProfile.userId.toString(),
              name: userProfile.displayName,
              email: userProfile.email,
              avatarUrl: userProfile.avatarUrl,
            },
            accessToken: accessToken,
          })
        );
      } catch (profileError) {
        console.warn("Failed to fetch user profile:", profileError);
        // Keep the credentials we already set with the minimal data
        // The user is still authenticated, just with limited profile data
      }

      // Redirect to home page
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      console.error("Registration completion error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred during registration";
      setApiError(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Display error banner if there's an API error */}
      {apiError && (
        <div
          className="p-3 rounded-lg text-sm font-medium text-center"
          style={{
            backgroundColor: `${errorTextColor}20`,
            color: errorTextColor,
          }}
        >
          {apiError}
        </div>
      )}

      {/* Display Name Input */}
      <div>
        <label
          htmlFor="displayName"
          className="block text-sm font-medium mb-2"
          style={{ color: inputTextColor }}
        >
          Display Name
        </label>
        <Input
          {...register("displayName")}
          id="displayName"
          name="displayName"
          type="text"
          placeholder="Enter your display name"
          autoComplete="name"
          disabled={isSubmitting}
          className="w-full rounded-lg px-4 py-3.5 border-1 transition-all duration-200 focus:outline-none disabled:opacity-50"
          style={{
            backgroundColor: inputBgColor,
            borderColor: displayName ? inputBorderColorFocus : inputBorderColor,
            color: inputTextColor,
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = inputBorderColorFocus;
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = displayName
              ? inputBorderColorFocus
              : inputBorderColor;
          }}
        />
        {errors.displayName && (
          <p
            className="text-left ml-2 mt-1.5 text-xs font-medium"
            style={{ color: errorTextColor }}
          >
            {errors.displayName.message}
          </p>
        )}
      </div>

      {/* Date of Birth and Gender - Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Date of Birth Input */}
        <div>
          <label
            htmlFor="dateOfBirth"
            className="block text-sm font-medium mb-2"
            style={{ color: inputTextColor }}
          >
            Date of Birth
          </label>
          <CustomDatePicker
            value={dateOfBirth || ""}
            onChange={(value) => {
              setValue("dateOfBirth", value, { shouldValidate: true });
            }}
            maxDate={maxDate}
            disabled={isSubmitting}
            inputBgColor={inputBgColor}
            inputBorderColor={inputBorderColor}
            inputBorderColorFocus={inputBorderColorFocus}
            inputTextColor={inputTextColor}
            errorTextColor={errorTextColor}
            id="dateOfBirth"
            name="dateOfBirth"
          />
          {errors.dateOfBirth && (
            <p
              className="text-left ml-2 mt-1.5 text-xs font-medium"
              style={{ color: errorTextColor }}
            >
              {errors.dateOfBirth.message}
            </p>
          )}
        </div>

        {/* Gender Select */}
        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-medium mb-2"
            style={{ color: inputTextColor }}
          >
            Gender
          </label>
          <select
            {...register("gender")}
            id="gender"
            name="gender"
            disabled={isSubmitting}
            className="w-full rounded-lg px-4 py-3.5 border-1 transition-all duration-200 focus:outline-none disabled:opacity-50 appearance-none bg-no-repeat bg-right pr-10"
            style={{
              backgroundColor: inputBgColor,
              borderColor: gender ? inputBorderColorFocus : inputBorderColor,
              color: inputTextColor,
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='${encodeURIComponent(
                inputTextColor
              )}' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundPosition: "right 1rem center",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = inputBorderColorFocus;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = gender
                ? inputBorderColorFocus
                : inputBorderColor;
            }}
          >
            <option value="">Select gender</option>
            <option value={Gender.MALE}>Male</option>
            <option value={Gender.FEMALE}>Female</option>
            <option value={Gender.OTHER}>Other</option>
          </select>
          {errors.gender && (
            <p
              className="text-left ml-2 mt-1.5 text-xs font-medium"
              style={{ color: errorTextColor }}
            >
              {errors.gender.message}
            </p>
          )}
        </div>
      </div>

      {/* Password Input */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium mb-2"
          style={{ color: inputTextColor }}
        >
          Password
        </label>
        <div className="relative">
          <Input
            {...register("password")}
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter a secure password"
            autoComplete="new-password"
            disabled={isSubmitting}
            className="w-full rounded-lg px-4 py-3.5 border-1 transition-all duration-200 focus:outline-none disabled:opacity-50 pr-12"
            style={{
              backgroundColor: inputBgColor,
              borderColor: password ? inputBorderColorFocus : inputBorderColor,
              color: inputTextColor,
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = inputBorderColorFocus;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = password
                ? inputBorderColorFocus
                : inputBorderColor;
            }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 focus:outline-none"
            disabled={isSubmitting}
            style={{
              color: inputTextColor,
              opacity: isSubmitting ? 0.5 : 1,
            }}
          >
            {showPassword ? <EyeClosed size={18} /> : <EyeIcon size={18} />}
          </button>
        </div>
        {errors.password && (
          <p
            className="text-left ml-2 mt-1.5 text-xs font-medium"
            style={{ color: errorTextColor }}
          >
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Confirm Password Input */}
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium mb-2"
          style={{ color: inputTextColor }}
        >
          Confirm Password
        </label>
        <div className="relative">
          <Input
            {...register("confirmPassword")}
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Re-enter your password"
            autoComplete="new-password"
            disabled={isSubmitting}
            className="w-full rounded-lg px-4 py-3.5 border-1 transition-all duration-200 focus:outline-none disabled:opacity-50 pr-12"
            style={{
              backgroundColor: inputBgColor,
              borderColor: confirmPassword
                ? inputBorderColorFocus
                : inputBorderColor,
              color: inputTextColor,
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = inputBorderColorFocus;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = confirmPassword
                ? inputBorderColorFocus
                : inputBorderColor;
            }}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 focus:outline-none"
            disabled={isSubmitting}
            style={{
              color: inputTextColor,
              opacity: isSubmitting ? 0.5 : 1,
            }}
          >
            {showConfirmPassword ? (
              <EyeClosed size={18} />
            ) : (
              <EyeIcon size={18} />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p
            className="text-left ml-2 mt-1.5 text-xs font-medium"
            style={{ color: errorTextColor }}
          >
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Submit and Cancel Buttons */}
      <div className="flex gap-3 mt-6">
        {onCancel && (
          <Button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex-1 rounded-lg py-3.5 font-medium transition-all duration-200 hover:opacity-90 disabled:opacity-50"
            style={{
              backgroundColor: inputBorderColor,
              color: inputTextColor,
            }}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={!isFormValid}
          className="flex-1 rounded-lg py-3.5 font-medium transition-all duration-200 hover:opacity-90 disabled:opacity-50 cursor-pointer"
          style={{
            backgroundColor: isFormValid
              ? buttonBgColor
              : buttonBgColorDisabled,
            color: isFormValid ? buttonTextColor : buttonTextColorDisabled,
          }}
        >
          {isSubmitting ? "Completing Profile..." : "Complete Registration"}
        </Button>
      </div>
    </form>
  );
};

export default CompleteProfile;
