// src/features/header/components/HeaderDesktop.tsx
'use client';
import React from "react";

export const HeaderDesktop: React.FC = () => {
    return (
        <header
            className="hidden md:flex h-16 px-4 bg-[#0A0A0A] border-[#383939] flex-shrink-0"
        >
            <div className="max-w-xl w-full mx-auto h-full flex items-center justify-center relative">
                <h1 className="text-white font-semibold">Home</h1>
            </div>
        </header>
    );
};
