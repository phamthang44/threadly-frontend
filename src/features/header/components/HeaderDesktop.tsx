// src/features/header/components/HeaderDesktop.tsx
'use client';
import React from "react";

type TabType = 'foryou' | 'following';

interface HeaderDesktopProps {
    isAuthenticated: boolean;
    activeTab?: TabType;
    onTabChange?: (tab: TabType) => void;
}

export const HeaderDesktop: React.FC<HeaderDesktopProps> = ({
                                                                isAuthenticated,
                                                                activeTab = 'foryou',
                                                                onTabChange
                                                            }) => {
    const tabs: { id: TabType; label: string }[] = [
        { id: 'foryou', label: 'For you' },
        { id: 'following', label: 'Following' },
    ];


    if (!isAuthenticated) {
        return (
            <header className="sticky top-0 z-20 bg-[#0A0A0A]">
                <div className="flex gap-8 px-4 h-16 items-center justify-center">
                    <h1 className="text-xl font-bold text-white">Home</h1>
                </div>
            </header>
        );
    }

    return (
        <header className="sticky top-0 z-20 bg-[#0A0A0A]">
            <div className="flex gap-8 px-4 h-16 items-center justify-center">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange?.(tab.id)}
                        className={`pb-4 font-semibold transition-colors border-b-2 cursor-pointer ${
                            activeTab === tab.id
                                ? 'text-white border-white'
                                : 'text-gray-500 border-transparent hover:text-gray-300'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </header>
    );
};
