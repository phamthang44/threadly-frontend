'use client';

/**
 * EXAMPLE: Standalone OTP Verification Page
 *
 * This file shows a complete example of using OTPEmailFlow as a standalone page.
 * You can adapt this for your routes like /otp-verify or /email-verification
 */

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { OTPEmailFlow } from '@/features/auth/components';

export default function OTPVerificationPage() {
    const router = useRouter();

    const handleVerifyOTP = async (email: string, otp: string): Promise<boolean> => {
        try {
            const response = await fetch('/api/auth/verify-otp', {
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

            // Store authentication data
            if (data.token) {
                localStorage.setItem('authToken', data.token);
            }

            if (data.user) {
                localStorage.setItem('user', JSON.stringify(data.user));
            }

            // Redirect to home or next step
            setTimeout(() => {
                router.push('/');
            }, 1500);

            return true;
        } catch (error) {
            console.error('OTP verification error:', error);
            return false;
        }
    };

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
                        Verify Your Email
                    </h1>
                    <p
                        className="text-center text-sm"
                        style={{ color: 'var(--login-view-text-secondary)' }}
                    >
                        Enter your email and we&#x27;ll send you a code to verify your account
                    </p>
                </div>

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
                        Having trouble? Contact{' '}
                        <Link
                            href="/support"
                            className="transition duration-200"
                            style={{ color: 'var(--login-view-button-text)' }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--login-view-button-text-hover)')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--login-view-button-text)')}
                        >
                            support
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
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--login-view-button-text-hover)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--login-view-button-text)')}
                >
                    Threadly Terms
                </Link>
                <Link
                    href="/privacy"
                    className="transition duration-200"
                    style={{ color: 'var(--login-view-button-text)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--login-view-button-text-hover)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--login-view-button-text)')}
                >
                    Privacy Policy
                </Link>
            </div>
        </div>
    );
}

