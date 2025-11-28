'use client';

import React, { useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuthLogin } from '@/features/auth/hooks/useAuthLogin';
import { InstagramButtonLogin, LoginForm } from '@/features/auth/components';

type LoginMode = 'instagram' | 'manual';

interface LoginFields {
    email: string;
    password: string;
}

export const LoginView: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const modeParam = (searchParams.get('mode') === 'manual' ? 'manual' : 'instagram') as LoginMode;

    const { login } = useAuthLogin();

    const setMode = useCallback(
        (mode: LoginMode) => {
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

    const handleManualLogin = async (data: LoginFields) => {
        const success = await login(data);
        if (success) router.push('/');
    };

    const handleInstagramLogin = () => {
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
                                Say more with Threadly
                            </h1>
                            <p
                                className="text-sm"
                                style={{ color: 'var(--login-view-text-secondary)' }}
                            >
                                Join Threadly to share thoughts, find out what&#x27;s going on, follow your people and more.
                            </p>
                        </div>
                        <InstagramButtonLogin
                            onClick={handleInstagramLogin}
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
                            Log in with username instead
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
                                Log in with your Instagram account
                            </h1>
                        </div>
                        <LoginForm handleManualLogin={handleManualLogin} />
                        <div className="space-y-3 pt-4">
                            <Link
                                href="/forgot-password"
                                className="block text-sm transition duration-200"
                                style={{ color: 'var(--login-view-button-text)' }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--login-view-button-text-hover)')}
                                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--login-view-button-text)')}
                            >
                                <span className="select-none">Forgot password?</span>
                            </Link>
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
                            {/*<button*/}
                            {/*    onClick={() => setMode('instagram')}*/}
                            {/*    className="block w-full font-medium transition duration-200 py-2 cursor-pointer"*/}
                            {/*    style={{*/}
                            {/*        color: 'var(--login-view-button-text)',*/}
                            {/*    }}*/}
                            {/*    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--login-view-button-text-hover)')}*/}
                            {/*    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--login-view-button-text)')}*/}
                            {/*>*/}
                            {/*    Back to Instagram login*/}
                            {/*</button>*/}
                            <InstagramButtonLogin
                                onClick={handleInstagramLogin}
                                className="w-full cursor-pointer hover:scale-[101%] font-semibold py-3 px-4 rounded-2xl transition duration-200 flex items-center justify-between group"
                                style={{
                                    borderWidth: '1px',
                                    borderColor: 'var(--login-view-border)',
                                    color: 'var(--login-view-text-primary)',
                                }}
                            />
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
                <Link
                    href="/cookies"
                    className="transition duration-200"
                    style={{ color: 'var(--login-view-button-text)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--login-view-button-text-hover)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--login-view-button-text)')}
                >
                    Cookies Policy
                </Link>
                <Link
                    href="/report"
                    className="transition duration-200"
                    style={{ color: 'var(--login-view-button-text)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--login-view-button-text-hover)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--login-view-button-text)')}
                >
                    Report a problem
                </Link>
            </div>
        </div>
    );
};
