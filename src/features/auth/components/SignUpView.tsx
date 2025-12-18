'use client';

import React, { useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuthSignup } from '@/features/auth/hooks/useAuthSignup';
import { InstagramButtonLogin, SignUpForm } from '@/features/auth/components';

type SignUpMode = 'instagram' | 'manual';

interface SignUpFields {
    displayName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const SignUpView: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const modeParam = (searchParams.get('mode') === 'manual' ? 'manual' : 'instagram') as SignUpMode;

    const { signup } = useAuthSignup();

    const setMode = useCallback(
        (mode: SignUpMode) => {
            const params = new URLSearchParams(searchParams.toString());
            if (mode === 'instagram') {
                params.delete('mode');
            } else {
                params.set('mode', 'manual');
            }
            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        },
        [router, pathname, searchParams]
    );

    const toggleMode = useCallback(() => {
        setMode(modeParam === 'instagram' ? 'manual' : 'instagram');
    }, [modeParam, setMode]);

    const handleManualSignup = async (data: SignUpFields) => {
        const { confirmPassword, ...signupData } = data;
        const success = await signup(signupData);
        if (success) router.push('/');
    };

    const handleInstagramSignup = () => {
        window.location.href = '/api/auth/instagram';
    };

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
            style={{ backgroundColor: 'var(--login-view-bg)' }}
        >
            <picture className="absolute top-0 left-0 pointer-events-none select-none">
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

            <div className="relative z-10 w-full max-w-1/4 px-4 mt-10">
                {modeParam === 'instagram' ? (
                    <div className="text-center space-y-8">
                        <div className="space-y-4">
                            <h1
                                className="text-4xl font-bold"
                                style={{ color: 'var(--login-view-text-primary)' }}
                            >
                                Join Threadly
                            </h1>
                            <p
                                className="text-sm"
                                style={{ color: 'var(--login-view-text-secondary)' }}
                            >
                                Create your account to share thoughts, find out what&#x27;s going on, follow people and more.
                            </p>
                        </div>
                        <InstagramButtonLogin
                            onClick={handleInstagramSignup}
                            className="w-full cursor-pointer hover:scale-[101%] font-semibold py-3 px-4 rounded-2xl transition duration-200 flex items-center justify-between group"
                            style={{
                                borderWidth: '1px',
                                borderColor: 'var(--login-view-border)',
                                color: 'var(--login-view-text-primary)',
                            }}
                        />
                        <div className="flex items-center gap-4">
                            <div
                                className="flex-1 h-px"
                                style={{ backgroundColor: 'var(--login-view-divider)' }}
                            />
                            <span
                                className="text-sm"
                                style={{ color: 'var(--login-view-text-secondary)' }}
                            >
                                or
                            </span>
                            <div
                                className="flex-1 h-px"
                                style={{ backgroundColor: 'var(--login-view-divider)' }}
                            />
                        </div>
                        <button
                            onClick={() => setMode('manual')}
                            className="w-full font-medium transition duration-200 cursor-pointer"
                            style={{
                                color: 'var(--login-view-button-text)',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--login-view-button-text-hover)')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--login-view-button-text)')}
                        >
                            Sign up with email instead
                        </button>
                        <p
                            className="text-xs"
                            style={{ color: 'var(--login-view-text-secondary)' }}
                        >
                            It&#x27;s better in the app
                            <br />
                            Download Threadly on your phone for a faster experience.
                        </p>
                    </div>
                ) : (
                    <div className="text-center space-y-6">
                        <div className="space-y-2 mt-30">
                            <h1
                                className="text-md font-bold"
                                style={{ color: 'var(--login-view-text-primary)' }}
                            >
                                Create your account
                            </h1>
                        </div>
                        <SignUpForm handleManualSignup={handleManualSignup} />
                        <div className="space-y-3 pt-4">
                            <div className="flex items-center gap-2 justify-center">
                                <div
                                    className="h-px w-12"
                                    style={{ backgroundColor: 'var(--login-view-divider)' }}
                                />
                                <span
                                    className="text-sm"
                                    style={{ color: 'var(--login-view-text-secondary)' }}
                                >
                                    or
                                </span>
                                <div
                                    className="h-px w-12"
                                    style={{ backgroundColor: 'var(--login-view-divider)' }}
                                />
                            </div>
                            <InstagramButtonLogin
                                onClick={handleInstagramSignup}
                                className="w-full cursor-pointer hover:scale-[101%] font-semibold py-3 px-4 rounded-2xl transition duration-200 flex items-center justify-between group"
                                style={{
                                    borderWidth: '1px',
                                    borderColor: 'var(--login-view-border)',
                                    color: 'var(--login-view-text-primary)',
                                }}
                            />
                            <p
                                className="text-xs pt-2"
                                style={{ color: 'var(--login-view-text-secondary)' }}
                            >
                                Already have an account?{' '}
                                <Link
                                    href="/login"
                                    className="transition duration-200"
                                    style={{ color: 'var(--login-view-button-text)' }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--login-view-button-text-hover)')}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--login-view-button-text)')}
                                >
                                    Log in
                                </Link>
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <div className="absolute bottom-8 right-8 hidden lg:flex">
                <div className="w-32 h-32 flex items-center justify-center">
                    <img
                        src="/githubprofile-1024.png"
                        alt="github-profile-phamthang44"
                        className="w-full h-auto"
                    />
                </div>
            </div>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 text-xs">
                <Link
                    href="/"
                    className="transition duration-200"
                    style={{ color: 'var(--login-view-text-secondary)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--login-view-text-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--login-view-text-secondary)')}
                >
                    About
                </Link>
                <Link
                    href="/"
                    className="transition duration-200"
                    style={{ color: 'var(--login-view-text-secondary)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--login-view-text-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--login-view-text-secondary)')}
                >
                    Help
                </Link>
                <Link
                    href="/"
                    className="transition duration-200"
                    style={{ color: 'var(--login-view-text-secondary)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--login-view-text-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--login-view-text-secondary)')}
                >
                    Terms
                </Link>
                <Link
                    href="/"
                    className="transition duration-200"
                    style={{ color: 'var(--login-view-text-secondary)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--login-view-text-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--login-view-text-secondary)')}
                >
                    Privacy
                </Link>
            </div>
        </div>
    );
};

