'use client';
import ThreadLogoBrandWhite from "@/components/ui/ThreadLogoBrandWhite";
import { useHeaderState } from "@/features/header/hooks/useHeaderState";
import React from "react";

export const HeaderDesktop: React.FC = () => {
    const { isScrolled } = useHeaderState();

    return (
        <header
            className={`hidden md:flex fixed top-0 left-0 right-0 w-full h-16 px-4 z-40 transition-all duration-200 bg-[#0A0A0A]`}
        >
            <div className="max-w-xl w-full mx-auto h-full flex items-center justify-between">
                <button className="w-8 h-8 cursor-pointer absolute md:left-8">
                    <ThreadLogoBrandWhite className="w-8 h-8" />
                </button>
                <h1 className="hidden md:block absolute lg:left-120 xl:left-190 transform -translate-x-1/2 text-white font-semibold">Home</h1>
                <div /> {/* placeholder cho right buttons nếu cần */}
            </div>
        </header>
    );
};
