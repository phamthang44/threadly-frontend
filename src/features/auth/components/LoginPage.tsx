'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { InstagramIconBrand, Button, Input, CircularThreadsBackground } from '@/components/ui';
import { useAuthLogin } from '@/features/auth/hooks/useAuthLogin';

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
            <div className="absolute inset-0 pointer-events-none">
                <CircularThreadsBackground className="absolute top-[-150px] left-[10%] scale-125 opacity-20 rotate-12" />
                <CircularThreadsBackground className="absolute top-[-260px] left-[40%] rotate-[90deg]"/>
                {/*<CircularThreadsBackground className="absolute top-[200px] left-[0%] scale-[1.8] opacity-15 rotate-[50deg]"/>*/}
                {/*<CircularThreadsBackground className="absolute top-[250px] left-[0%] scale-[1.8] opacity-15 rotate-[50deg]"/>*/}
            </div>
            {/*<div className="absolute inset-0 flex items-center justify-center">*/}
            {/*    <div className="w-[350px] h-[350px] relative">*/}
            {/*        { /* SVG circular text */ }
            {/*        <svg*/}
            {/*            width="350"*/}
            {/*            height="350"*/}
            {/*            viewBox="0 0 350 350"*/}
            {/*            className="absolute inset-0 opacity-10 top-[-360px]"*/}
            {/*        >*/}
            {/*            <defs>*/}
            {/*                <path*/}
            {/*                    id="circlePath"*/}
            {/*                    d="*/}
            {/*                        M 175, 175*/}
            {/*                        m -150, 0*/}
            {/*                        a 150,150 0 1,1 300,0*/}
            {/*                        a 150,150 0 1,1 -300,0*/}
            {/*                    "*/}
            {/*                />*/}
            {/*            </defs>*/}

            {/*            <text fill="white" fontSize="26" fontWeight="bold">*/}
            {/*                <textPath href="#circlePath" startOffset="0%">*/}
            {/*                    THREADS SAVE THE THREADS SAVE THE THREADS*/}
            {/*                </textPath>*/}
            {/*            </text>*/}
            {/*        </svg>*/}
            {/*    </div>*/}
            {/*</div>*/}


            {/* Main content container */}
            <div className="relative z-10 w-full max-w-md px-4">
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
                        <button
                            onClick={handleInstagramLogin}
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-between group"
                        >
                            <div className="flex items-center gap-3 flex-1">
                                <div className="rounded-lg p-2">
                                    <InstagramIconBrand />
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-semibold">Continue with Instagram</p>
                                    <p className="text-xs text-purple-100">bee.twins44</p>
                                </div>
                            </div>
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Divider */}
                        <div className="flex items-center gap-4">
                            <div className="flex-1 h-px bg-gray-700"></div>
                            <span className="text-gray-500 text-sm">or</span>
                            <div className="flex-1 h-px bg-gray-700"></div>
                        </div>

                        {/* Manual Login Link */}
                        <button
                            onClick={() => setLoginState('manual')}
                            className="w-full text-blue-400 hover:text-blue-300 font-medium transition duration-200"
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
                    <div className="text-center space-y-6">
                        {/* Header */}
                        <div className="space-y-2 mb-8">
                            <h1 className="text-2xl font-bold text-white">Log in with your Instagram account</h1>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleManualLogin} className="space-y-4">
                            {/* Email/Username Input */}
                            <Input
                                type="text"
                                placeholder="Username, phone or email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-gray-500 focus:outline-none transition"
                                required
                            />

                            {/* Password Input */}
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-gray-500 focus:outline-none transition"
                                required
                            />

                            {/* Error message */}
                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            {/* Login Button */}
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#101010]/40 text-black hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed font-semibold py-3 rounded-lg transition duration-200"
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
                            <button
                                onClick={() => setLoginState('instagram')}
                                className="block w-full text-blue-400 hover:text-blue-300 font-medium transition duration-200 py-2"
                            >
                                Back to Instagram login
                            </button>
                        </div>

                        {/* Sign up link */}
                        <p className="text-gray-400 text-sm pt-4">
                            Don&#39;t have an account?{' '}
                            <Link href="/signup" className="text-blue-400 hover:text-blue-300 transition duration-200">
                                Sign up
                            </Link>
                        </p>
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

