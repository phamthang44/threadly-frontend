'use client';
import ThreadLogoBrandWhite from "@/components/ui/ThreadLogoBrandWhite";
import { useHeaderState } from "@/features/header/hooks/useHeaderState";
import React from "react";

export const HeaderMobile: React.FC = () => {
    const { isScrolled } = useHeaderState();

    return (
        <>
            <header
                className={`md:hidden fixed top-0 left-0 right-0 w-full h-16 px-4 z-50 transition-all duration-200 ${
                    isScrolled ? 'backdrop-blur-sm bg-[#0A0A0A]/40' : 'bg-[#101010]'
                }`}
            >
                <div className="max-w-xl w-full mx-auto h-full flex items-center justify-between">
                    <button className="w-8 h-8 cursor-pointer absolute left-50">
                        <ThreadLogoBrandWhite className="w-8 h-8" />
                    </button>
                    <button className="px-4 py-2 bg-white text-black rounded-lg text-sm font-semibold absolute right-6">
                        Log in
                    </button>
                </div>
            </header>
            {/* Spacer để tránh cover content */}
            <div className="h-16" aria-hidden />
        </>
    );
};
