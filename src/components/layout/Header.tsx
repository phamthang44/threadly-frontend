'use client';

import React, { useState, useEffect } from 'react';
import ThreadLogoBrandWhite from "@/components/ui/ThreadLogoBrandWhite";

export const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`sticky top-0  px-4 py-5 z-40 transition-all duration-200 ${
            isScrolled
                ? 'backdrop-blur-sm bg-[#101010]/10 md:backdrop-blur-none md:bg-[#0A0A0A]'
                : 'bg-[#0A0A0A]'
        }`}>
            <div className="max-w-xl mr-auto flex items-center justify-between md:justify-between ">
                <a className="w-8 h-8 flex items-center justify-center cursor-pointer ml-2">
                    <ThreadLogoBrandWhite className="w-8 h-8"/>
                </a>
                <h1 className="text-white font-semibold hidden md:block md:absolute md:left-1/2 md:transform md:-translate-x-1/2">Home</h1>
                <button className="md:hidden px-4 py-2 bg-white text-black rounded-lg text-sm font-semibold">
                    Log in
                </button>
            </div>
        </header>
    );
};
