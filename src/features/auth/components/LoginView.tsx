'use client';

import React, { useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuthLogin } from '@/features/auth/hooks/useAuthLogin';
import {InstagramButtonLogin, LoginForm} from '@/features/auth/components';

type LoginMode = 'instagram' | 'manual';



export const LoginView:React.FC = () => {
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

    const handleManualLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const email = String(formData.get('email') || '');
        const password = String(formData.get('password') || '');
        const success = await login({ email, password });
        if (success) router.push('/');
    };

    const handleInstagramLogin = () => {
        window.location.href = '/api/auth/instagram';
    };

    return (
        <div className="min-h-screen bg-[#101010] flex flex-col items-center justify-center relative overflow-hidden">
            <picture className="absolute top-0 left-0 pointer-events-none select-none">
                <source srcSet="/background-login.avif" type="image/avif" />
                <source srcSet="/threadly-background-webp.webp" type="image/webp" />
                <img alt="threadly-background" height={510} width={1785} src="/tRm8c5IuJJa.png" />
            </picture>

            <div className="relative z-10 w-full max-w-md px-4">
                {modeParam === 'instagram' ? (
                    <div className="text-center space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl font-bold text-white">Say more with Threadly</h1>
                            <p className="text-gray-400 text-sm">
                                Join Threadly to share thoughts, find out what&#x27;s going on, follow your people and more.
                            </p>
                        </div>
                        <InstagramButtonLogin
                            onClick={handleInstagramLogin}
                            className="
                            w-full cursor-pointer
                            border-1 border-[#383939]
                            hover:scale-[101%] text-white
                            font-semibold py-3 px-4
                            rounded-2xl transition
                            duration-200 flex
                            items-center justify-between group"
                        />
                        <div className="flex items-center gap-4">
                            <div className="flex-1 h-px bg-[#383939]" />
                            <span className="text-gray-500 text-sm">or</span>
                            <div className="flex-1 h-px bg-[#383939]" />
                        </div>
                        <button
                            onClick={() => setMode('manual')}
                            className="w-full text-[#555658] hover:text-white cursor-pointer font-medium transition duration-200"
                        >
                            Log in with username instead
                        </button>
                        <p className="text-xs text-gray-500">
                            It&#x27;s better in the app
                            <br />
                            Download Threadly on your phone for a faster experience.
                        </p>
                    </div>
                ) : (
                    <div className="text-center space-y-6 mt-45">
                        <div className="space-y-2 mb-8">
                            <h1 className="text-xl font-bold text-white">Log in with your Instagram account</h1>
                        </div>
                        <LoginForm handleManualLogin={handleManualLogin} />
                        <div className="space-y-3 pt-4">
                            <Link
                                href="/forgot-password"
                                className="block text-[#555658] hover:text-white text-sm transition duration-200"
                            >
                                <span className="select-none">Forgot password?</span>
                            </Link>
                            <div className="flex items-center gap-2 justify-center">
                                <div className="h-px w-12 bg-[#383939]" />
                                <span className="text-gray-500 text-sm">or</span>
                                <div className="h-px w-12 bg-[#383939]" />
                            </div>
                            <button
                                onClick={() => setMode('instagram')}
                                className="block w-full text-[#555658] hover:text-white cursor-pointer font-medium transition duration-200 py-2"
                            >
                                Back to Instagram login
                            </button>
                            <InstagramButtonLogin
                                onClick={handleInstagramLogin}
                                className="
                                w-full cursor-pointer
                                border-1 border-[#383939]
                                hover:scale-[101%] text-white
                                font-semibold py-3 px-4
                                rounded-2xl transition
                                duration-200 flex
                                items-center justify-between group"
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="absolute bottom-8 right-8 hidden lg:flex">
                <div className="w-32 h-32 flex items-center justify-center">
                    <img src="/githubprofile-1024.png" alt="github-profile-phamthang44" />
                </div>
            </div>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 text-xs text-gray-500">
                <span>© 2025</span>
                <Link href="/terms" className="hover:text-gray-400 transition">Threadly Terms</Link>
                <Link href="/privacy" className="hover:text-gray-400 transition">Privacy Policy</Link>
                <Link href="/cookies" className="hover:text-gray-400 transition">Cookies Policy</Link>
                <Link href="/report" className="hover:text-gray-400 transition">Report a problem</Link>
            </div>
        </div>
    );
};
