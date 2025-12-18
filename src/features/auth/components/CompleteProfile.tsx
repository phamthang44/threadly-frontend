'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@/components/ui';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch } from '@/store/hooks';
import { setCredentials } from '@/store/authSlice';
import { EyeIcon, EyeClosed } from 'lucide-react';

type CompleteProfileFields = {
    password: string;
    confirmPassword: string;
    displayName: string;
};

const schema = yup.object({
    displayName: yup
        .string()
        .required('Display name is required!')
        .min(3, 'Display name must be at least 3 characters')
        .max(50, 'Display name must be at most 50 characters'),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Password must contain uppercase, lowercase, and numbers'
        ),
    confirmPassword: yup
        .string()
        .required('Please confirm your password')
        .oneOf([yup.ref('password')], 'Passwords must match'),
});

interface CompleteProfileProps {
    registerToken: string;
    onCancel?: () => void;
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

const CompleteProfile: React.FC<CompleteProfileProps> = ({
    registerToken,
    onCancel,
    inputBgColor = 'var(--login-form-input-bg)',
    inputBorderColor = 'var(--login-form-input-border)',
    inputBorderColorFocus = 'var(--login-form-input-border-focus)',
    inputTextColor = 'var(--login-form-input-text)',
    buttonBgColor = 'var(--login-form-button-bg)',
    buttonTextColor = 'var(--login-form-button-text)',
    buttonBgColorDisabled = 'var(--login-form-button-bg-disabled)',
    buttonTextColorDisabled = 'var(--login-form-button-text-disabled)',
    errorTextColor = 'var(--login-form-error-text)',
}) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isDirty, isValid },
        watch,
        setError: setFormError,
    } = useForm<CompleteProfileFields>({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [apiError, setApiError] = useState('');

    const displayName = watch('displayName');
    const password = watch('password');
    const confirmPassword = watch('confirmPassword');

    const isFormValid = isDirty && isValid && !isSubmitting;

    const onSubmit = async (data: CompleteProfileFields) => {
        setApiError('');

        try {
            const response = await fetch('/api/v1/auth/register-finish', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${registerToken}`,
                },
                body: JSON.stringify({
                    displayName: data.displayName,
                    password: data.password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to complete registration');
            }

            const responseData = await response.json();

            // Extract tokens and user data from response
            const { accessToken, refreshToken, user } = responseData;

            if (!accessToken) {
                throw new Error('No access token received');
            }

            // Helper function to set cookie
            const setCookie = (name: string, value: string, days: number = 7) => {
                const date = new Date();
                date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
                const expires = `expires=${date.toUTCString()}`;
                const secure = process.env.NODE_ENV === 'production' ? 'Secure;' : '';
                document.cookie = `${name}=${encodeURIComponent(value)};${expires};Path=/;${secure}SameSite=Strict`;
            };

            // Save tokens to cookies
            setCookie('accessToken', accessToken, 7);
            if (refreshToken) {
                setCookie('refreshToken', refreshToken, 30);
            }

            // Save tokens and user to localStorage for Redux
            localStorage.setItem('accessToken', accessToken);
            if (refreshToken) {
                localStorage.setItem('refreshToken', refreshToken);
            }

            // Dispatch to Redux store
            if (user) {
                dispatch(setCredentials({ user, accessToken }));
                localStorage.setItem('user', JSON.stringify(user));
            }

            // Redirect to home page
            setTimeout(() => {
                router.push('/');
            }, 1000);
        } catch (error) {
            console.error('Registration completion error:', error);
            const errorMessage =
                error instanceof Error ? error.message : 'An error occurred during registration';
            setApiError(errorMessage);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Display error banner if there's an API error */}
            {apiError && (
                <div
                    className="p-3 rounded-lg text-sm font-medium text-center"
                    style={{ backgroundColor: `${errorTextColor}20`, color: errorTextColor }}
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
                    {...register('displayName')}
                    id="displayName"
                    name="displayName"
                    type="text"
                    placeholder="Enter your display name"
                    autoComplete="name"
                    disabled={isSubmitting}
                    className="w-full rounded-lg px-4 py-4 border-1 transition-all duration-200 focus:outline-none disabled:opacity-50"
                    style={{
                        backgroundColor: inputBgColor,
                        borderColor: displayName ? inputBorderColorFocus : inputBorderColor,
                        color: inputTextColor,
                    }}
                    onFocus={(e) => {
                        e.currentTarget.style.borderColor = inputBorderColorFocus;
                    }}
                    onBlur={(e) => {
                        e.currentTarget.style.borderColor = displayName ? inputBorderColorFocus : inputBorderColor;
                    }}
                />
                {errors.displayName && (
                    <p className="text-left ml-2 mt-2 text-xs font-medium" style={{ color: errorTextColor }}>
                        {errors.displayName.message}
                    </p>
                )}
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
                        {...register('password')}
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter a secure password"
                        autoComplete="new-password"
                        disabled={isSubmitting}
                        className="w-full rounded-lg px-4 py-4 border-1 transition-all duration-200 focus:outline-none disabled:opacity-50 pr-12"
                        style={{
                            backgroundColor: inputBgColor,
                            borderColor: password ? inputBorderColorFocus : inputBorderColor,
                            color: inputTextColor,
                        }}
                        onFocus={(e) => {
                            e.currentTarget.style.borderColor = inputBorderColorFocus;
                        }}
                        onBlur={(e) => {
                            e.currentTarget.style.borderColor = password ? inputBorderColorFocus : inputBorderColor;
                        }}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 focus:outline-none"
                        disabled={isSubmitting}
                        style={{ color: inputTextColor, opacity: isSubmitting ? 0.5 : 1 }}
                    >
                        {showPassword ? (
                            <EyeClosed size={18} />
                        ) : (
                            <EyeIcon size={18} />
                        )}
                    </button>
                </div>
                {errors.password && (
                    <p className="text-left ml-2 mt-2 text-xs font-medium" style={{ color: errorTextColor }}>
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
                        {...register('confirmPassword')}
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Re-enter your password"
                        autoComplete="new-password"
                        disabled={isSubmitting}
                        className="w-full rounded-lg px-4 py-4 border-1 transition-all duration-200 focus:outline-none disabled:opacity-50 pr-12"
                        style={{
                            backgroundColor: inputBgColor,
                            borderColor:
                                confirmPassword ? inputBorderColorFocus : inputBorderColor,
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
                        style={{ color: inputTextColor, opacity: isSubmitting ? 0.5 : 1 }}
                    >
                        {showConfirmPassword ? (
                            <EyeClosed size={18} />
                        ) : (
                            <EyeIcon size={18} />
                        )}
                    </button>
                </div>
                {errors.confirmPassword && (
                    <p className="text-left ml-2 mt-2 text-xs font-medium" style={{ color: errorTextColor }}>
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
                        className="flex-1 rounded-lg py-4 font-medium transition-all duration-200 hover:opacity-90 disabled:opacity-50"
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
                    className="flex-1 rounded-lg py-4 font-medium transition-all duration-200 hover:opacity-90 disabled:opacity-50"
                    style={{
                        backgroundColor: isFormValid ? buttonBgColor : buttonBgColorDisabled,
                        color: isFormValid ? buttonTextColor : buttonTextColorDisabled,
                    }}
                >
                    {isSubmitting ? 'Completing Profile...' : 'Complete Registration'}
                </Button>
            </div>
        </form>
    );
};

export default CompleteProfile;

