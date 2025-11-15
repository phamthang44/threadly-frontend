'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button, Input, ThreadlyBackground } from '@/components/ui';
import { useAuthLogin } from '@/features/auth/hooks/useAuthLogin';
import {InstagramButtonLogin} from "@/features/auth/components";


type LoginState = 'instagram' | 'manual';

export const LoginPage = () => {
    const [loginState, setLoginState] = useState<LoginState>('instagram');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const { login } = useAuthLogin();

    const handleManualLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const success = await login({ email, password });
            if (success) {
                router.push('/');
            } else {
                setError('Invalid credentials. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInstagramLogin = async () => {
        setIsLoading(true);
        try {
            // This would typically redirect to Instagram OAuth or your backend auth endpoint
            // For now, this is a placeholder for the Instagram login flow
            window.location.href = '/api/auth/instagram';
        } catch (err) {
            setError('Instagram login failed. Please try again.');
            console.error(err);
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#101010] flex flex-col items-center justify-center relative overflow-hidden">
            {/* Circular text background pattern */}
            {/*<CircularThreadlyBackground />*/}
            <ThreadlyBackground loops={5} size={1000} />

            {/* Main content container */}
            <div className="relative z-10 w-full max-w-md px-4 mt-50">
                {loginState === 'instagram' ? (
                    // Instagram Login State
                    <div className="text-center space-y-8">
                        {/* Logo/Title */}
                        <div className="space-y-4">
                            <h1 className="text-4xl font-bold text-white">Say more with Threads</h1>
                            <p className="text-gray-400 text-sm">
                                Join Threads to share thoughts, find out what&#39;s going on, follow your people and more.
                            </p>
                        </div>

                        {/* Instagram Login Button */}
                        <InstagramButtonLogin
                            onClick={handleInstagramLogin}
                            disabled={isLoading}
                            className="w-full border-1 border-[#383939] hover:scale-[101%] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-between group"
                        />


                        {/* Divider */}
                        <div className="flex items-center gap-4">
                            <div className="flex-1 h-px bg-gray-700"></div>
                            <span className="text-gray-500 text-sm">or</span>
                            <div className="flex-1 h-px bg-gray-700"></div>
                        </div>

                        {/* Manual Login Link */}
                        <button
                            onClick={() => setLoginState('manual')}
                            className="w-full text-blue-400 hover:text-blue-300 font-medium transition duration-200 cursor-pointer"
                        >
                            Log in with username instead
                        </button>

                        {/* Footer text */}
                        <p className="text-xs text-gray-500">
                            It&#39;s better in the app
                            <br />
                            Download Threads on your phone for a faster experience.
                        </p>
                    </div>
                ) : (
                    // Manual Login State
                    <div className="text-center space-y-6 mt-20">
                        {/* Header */}
                        <div className="space-y-2 mb-8">
                            <h1 className="text-xl font-bold text-white">Log in with your Instagram account</h1>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleManualLogin} className="space-y-4">
                            {/* Email/Username Input */}
                            <Input
                                type="text"
                                placeholder="Username, phone or email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#1e1e1e] border-1 border-[#383939] focus:border-[#b8b8b8] rounded-lg px-4 py-4 text-white placeholder-[#777777] focus:outline-none transition"
                                required
                            />

                            {/* Password Input */}
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#1e1e1e] border-1 border-[#383939] focus:border-[#b8b8b8] rounded-xl px-4 py-4 text-white placeholder-[#777777] focus:outline-none transition"
                                required
                            />

                            {/* Error message */}
                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            {/* Login Button */}
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#ffffff] border-1 border-[#383939] cursor-pointer text-black hover:scale-[101%] disabled:opacity-50 disabled:cursor-not-allowed font-semibold py-3 rounded-lg transition duration-200"
                            >
                                {isLoading ? 'Logging in...' : 'Log in'}
                            </Button>
                        </form>

                        {/* Links */}
                        <div className="space-y-3 pt-4">
                            <Link href="/forgot-password" className="block text-blue-400 hover:text-blue-300 text-sm transition duration-200">
                                Forgot password?
                            </Link>

                            <div className="flex items-center gap-2 justify-center">
                                <div className="h-px w-12 bg-gray-700"></div>
                                <span className="text-gray-500 text-sm">or</span>
                                <div className="h-px w-12 bg-gray-700"></div>
                            </div>

                            {/* Back to Instagram Login */}
                            {/*<button*/}
                            {/*    onClick={() => setLoginState('instagram')}*/}
                            {/*    className="block w-full text-blue-400 hover:text-blue-300 font-medium transition duration-200 py-2"*/}
                            {/*>*/}
                            {/*    Back to Instagram login*/}
                            {/*</button>*/}
                            <InstagramButtonLogin
                                onClick={handleInstagramLogin}
                                disabled={isLoading}
                                className="w-full border-1 border-[#383939] hover:scale-[101%] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-between group"
                            />
                        </div>

                        {/*/!* Sign up link *!/*/}
                        {/*<p className="text-gray-400 text-sm pt-4">*/}
                        {/*    Don&#39;t have an account?{' '}*/}
                        {/*    <Link href="/signup" className="text-blue-400 hover:text-blue-300 transition duration-200">*/}
                        {/*        Sign up*/}
                        {/*    </Link>*/}
                        {/*</p>*/}
                    </div>
                )}
            </div>

            {/* QR Code area (bottom right) */}
            <div className="absolute bottom-8 right-8 hidden lg:flex">
                <div className="bg-white p-2 rounded-lg">
                    <div className="w-24 h-24 bg-gray-300 rounded flex items-center justify-center">
                        <span className="text-gray-600 text-xs">QR Code</span>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 text-xs text-gray-500">
                <span>© 2025</span>
                <Link href="/terms" className="hover:text-gray-400 transition">Threads Terms</Link>
                <Link href="/privacy" className="hover:text-gray-400 transition">Privacy Policy</Link>
                <Link href="/cookies" className="hover:text-gray-400 transition">Cookies Policy</Link>
                <Link href="/report" className="hover:text-gray-400 transition">Report a problem</Link>
            </div>
        </div>
    );
};

