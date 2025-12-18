'use client';

import React, { useCallback, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { OTPEmailFlow } from '@/features/auth/components';
import { useAppDispatch } from '@/store/hooks';
import { setCredentials } from '@/store/authSlice';

type OTPMode = 'email' | 'verifying' | 'account-check';

/**
 * OTP Verification Page
 *
 * Handles two scenarios:
 * A: User without account -> Gets registerToken -> Redirects to complete-profile
 * B: User with account -> Gets accessToken -> Redirects to home
 */
export default function OTPVerifyPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [otpMode, setOtpMode] = useState<OTPMode>('email');
    const [verifyingEmail, setVerifyingEmail] = useState('');
    const [error, setError] = useState('');

    const handleVerifyOTP = useCallback(
        async (email: string, otp: string): Promise<boolean> => {
            try {
                setOtpMode('verifying');
                setVerifyingEmail(email);
                setError('');

                const response = await fetch('/api/v1/auth/verify-otp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, otp }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'OTP verification failed');
                }

                const data = await response.json();

                // SCENARIO B: User has account -> Direct login
                if (data.accessToken && data.user && !data.registerToken) {
                    // Store tokens
                    localStorage.setItem('accessToken', data.accessToken);
                    if (data.refreshToken) {
                        localStorage.setItem('refreshToken', data.refreshToken);
                    }
                    localStorage.setItem('user', JSON.stringify(data.user));

                    // Save to cookies
                    const setCookie = (name: string, value: string, days: number = 7) => {
                        const date = new Date();
                        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
                        const expires = `expires=${date.toUTCString()}`;
                        const secure = process.env.NODE_ENV === 'production' ? 'Secure;' : '';
                        document.cookie = `${name}=${encodeURIComponent(value)};${expires};Path=/;${secure}SameSite=Strict`;
                    };

                    setCookie('accessToken', data.accessToken, 7);
                    if (data.refreshToken) {
                        setCookie('refreshToken', data.refreshToken, 30);
                    }

                    // Update Redux
                    dispatch(
                        setCredentials({
                            user: data.user,
                            accessToken: data.accessToken,
                        })
                    );

                    // Redirect to home
                    setTimeout(() => {
                        router.push('/');
                    }, 1000);

                    return true;
                }

                // SCENARIO A: User doesn't have account -> Get registerToken
                if (data.registerToken) {
                    // Store register token for next step
                    sessionStorage.setItem('registerToken', data.registerToken);
                    sessionStorage.setItem('registrationEmail', email);

                    // Redirect to complete-profile
                    setTimeout(() => {
                        router.push('/complete-profile');
                    }, 1000);

                    return true;
                }

                throw new Error('Invalid response from server');
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Verification failed';
                setError(errorMessage);
                setOtpMode('email');
                console.error('OTP verification error:', err);
                return false;
            }
        },
        [router, dispatch]
    );

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4"
            style={{ backgroundColor: 'var(--login-view-bg)' }}
        >
            {/* Background Image */}
            <picture className="absolute top-0 left-0 pointer-events-none select-none w-full">
                <source srcSet="/background-login.avif" type="image/avif" />
                <source srcSet="/threadly-background-webp.webp" type="image/webp" />
                <img
                    alt="threadly-background"
                    height={510}
                    width={1785}
                    src="/tRm8c5IuJJa.png"
                    className="w-full h-auto"
                />
            </picture>

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-md">
                <div className="space-y-2 mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                style={{ color: 'var(--login-view-text-primary)' }}
                            >
                                <path d="M2.5 3A1.5 1.5 0 001 4.5v11A1.5 1.5 0 002.5 17h15a1.5 1.5 0 001.5-1.5v-11A1.5 1.5 0 0017.5 3h-15zM0 4.5C0 3.119.895 2 2 2h16c1.105 0 2 1.119 2 2.5v11c0 1.381-.895 2.5-2 2.5H2c-1.105 0-2-1.119-2-2.5v-11z" />
                            </svg>
                        </div>
                    </div>
                    <h1
                        className="text-3xl font-bold text-center"
                        style={{ color: 'var(--login-view-text-primary)' }}
                    >
                        {otpMode === 'verifying' ? 'Verifying...' : 'Verify Your Email'}
                    </h1>
                    <p
                        className="text-center text-sm"
                        style={{ color: 'var(--login-view-text-secondary)' }}
                    >
                        {otpMode === 'verifying'
                            ? `Checking your account for ${verifyingEmail}...`
                            : "Enter your email and we'll send you a code to verify your account"}
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div
                        className="p-3 rounded-lg text-sm font-medium text-center mb-4"
                        style={{
                            backgroundColor: `var(--login-form-error-text)20`,
                            color: 'var(--login-form-error-text)',
                        }}
                    >
                        {error}
                    </div>
                )}

                {/* OTP Flow Component */}
                <div className="bg-opacity-50 backdrop-blur-sm">
                    <OTPEmailFlow
                        onSubmit={handleVerifyOTP}
                        onCancel={() => router.back()}
                        emailInputBgColor="var(--login-form-input-bg)"
                        emailInputBorderColor="var(--login-form-input-border)"
                        emailInputBorderColorFocus="var(--login-form-input-border-focus)"
                        emailInputTextColor="var(--login-form-input-text)"
                        buttonBgColor="var(--login-form-button-bg)"
                        buttonTextColor="var(--login-form-button-text)"
                        buttonBgColorDisabled="var(--login-form-button-bg-disabled)"
                        buttonTextColorDisabled="var(--login-form-button-text-disabled)"
                        timerTextColor="var(--login-view-text-secondary)"
                        successTextColor="#10b981"
                        errorTextColor="var(--login-form-error-text)"
                        otpResendWaitSeconds={60}
                        otpExpireSeconds={300}
                    />
                </div>

                {/* Help Text */}
                <div className="mt-8 text-center">
                    <p
                        className="text-xs"
                        style={{ color: 'var(--login-view-text-secondary)' }}
                    >
                        Don't have email? Try{' '}
                        <Link
                            href="/signup"
                            className="transition duration-200"
                            style={{ color: 'var(--login-view-button-text)' }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.color = 'var(--login-view-button-text-hover)')
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.color = 'var(--login-view-button-text)')
                            }
                        >
                            signing up
                        </Link>
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 text-xs">
                <span style={{ color: 'var(--login-view-text-secondary)' }}>© 2025</span>
                <Link
                    href="/terms"
                    className="transition duration-200"
                    style={{ color: 'var(--login-view-button-text)' }}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.color = 'var(--login-view-button-text-hover)')
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.color = 'var(--login-view-button-text)')
                    }
                >
                    Threadly Terms
                </Link>
                <Link
                    href="/privacy"
                    className="transition duration-200"
                    style={{ color: 'var(--login-view-button-text)' }}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.color = 'var(--login-view-button-text-hover)')
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.color = 'var(--login-view-button-text)')
                    }
                >
                    Privacy Policy
                </Link>
            </div>
        </div>
    );
}

