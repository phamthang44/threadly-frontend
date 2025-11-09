// src/components/layout/Header.tsx
'use client';

import React, { useState, useEffect } from 'react';
import ThreadLogoBrandWhite from "@/components/ui/ThreadLogoBrandWhite";

export const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Placeholder for auth state
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    let headerClass = 'fixed md:sticky top-0 left-0 right-0 w-full h-16 md:h-16 px-4 z-50 md:z-40 transition-all duration-200 ';
    headerClass += isScrolled
        ? 'backdrop-blur-sm bg-[#0A0A0A]/40 md:backdrop-blur-none md:bg-[#0A0A0A]'
        : 'bg-[#101010] md:bg-[#0A0A0A]';
    headerClass += isAuthenticated ? 'h-30 ' : '';

    return (
        <>
            <header
                role="banner"
                className={`fixed md:sticky top-0 left-0 right-0 w-full h-16 md:h-16 px-4 z-50 md:z-40 transition-all duration-200 ${
                    isScrolled
                        ? 'backdrop-blur-sm bg-[#0A0A0A]/40 md:backdrop-blur-none md:bg-[#0A0A0A]'
                        : 'bg-[#101010] md:bg-[#0A0A0A]'
                }`}
            >
                <div className="max-w-xl w-full mx-auto h-full flex items-center justify-between">
                    <button className="w-8 h-8 cursor-pointer absolute left-50 md:left-9">
                        <ThreadLogoBrandWhite className="w-8 h-8" />
                    </button>

                    <h1 className="hidden md:block absolute left-1/2 transform -translate-x-1/2 text-white font-semibold">
                        Home
                    </h1>

                    <button className="md:hidden px-4 py-2 bg-white text-black rounded-lg text-sm font-semibold absolute right-6">
                        Log in
                    </button>
                </div>
            </header>

            {/* Spacer only on small screens to avoid covering the first thread */}
            <div className="md:hidden h-16" aria-hidden />
        </>
    );
};
