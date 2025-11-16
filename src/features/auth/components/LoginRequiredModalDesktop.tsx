'use client';

import React from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';
import InstagramIconBrand from "@/components/ui/atoms/InstagramIconBrand";
import {InstagramButtonLogin} from "@/features/auth/components";

interface LoginRequiredModalDesktopProps {
    isOpen: boolean;
    onClose: () => void;
    featureName?: string;
}

const LoginRequiredModalDesktop: React.FC<LoginRequiredModalDesktopProps> = ({
                                                                                 isOpen,
                                                                                 onClose,
                                                                                 featureName = 'This feature',
                                                                             }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-md rounded-3xl bg-[#1a1a1a] border border-[#383939] shadow-2xl overflow-hidden">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-[#808080] hover:text-white transition-colors duration-200 z-10 cursor-pointer"
                    aria-label="Close modal"
                >
                    <X size={24} />
                </button>

                {/* Content */}
                <div className="px-8 py-10">
                    {/* Icon */}
                    <div className="mb-6 flex justify-center">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
                            <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Heading */}
                    <h2 className="text-center text-2xl font-bold text-white mb-3">
                        Say more with a Threadly account
                    </h2>

                    {/* Description */}
                    <p className="text-center text-[#808080] text-sm mb-8 leading-relaxed">
                        Join Threadly to share your thoughts, find out
                        what&#39;s going on, follow your people and more.
                    </p>

                    {/* Divider */}
                    <div className="w-full h-px bg-[#383939] mb-8" />

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 mx-auto">
                        {/* Sign In Button */}
                        {/* CTA Button - Instagram Login */}
                        <InstagramButtonLogin
                            onClick={() => {console.log("Instagram login clicked")}}
                            className="flex items-center
                            bg-[#262626]
                            border border-[#383939]
                            rounded-2xl py-1 px-4
                            cursor-pointer hover:border-[#505050]
                            hover:bg-[#2a2a2a]" />

                        {/* Sign Up Button */}
                        <Link
                            href="/login?mode=manual"
                            className="
                                w-full
                                py-4 px-4
                                rounded-2xl
                                bg-[#262626]
                                text-white
                                font-semibold
                                text-sm
                                text-center
                                border border-[#383939]
                                hover:border-[#505050]
                                hover:bg-[#2a2a2a]
                                transition-all duration-200
                              "
                        >
                            Continue with username instead
                        </Link>
                    </div>

                    {/* Footer Text */}
                    <p className="text-center text-[#808080] text-xs mt-6">
                        By signing in, you agree to our{' '}
                        <Link href="/terms" className="text-white hover:underline">
                            Terms of Service
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginRequiredModalDesktop;
