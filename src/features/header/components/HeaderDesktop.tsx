// src/features/header/components/HeaderDesktop.tsx
'use client';
import React from "react";
import Link from "next/link";

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
            <>
            <div className="flex [padding-inline-start:8px] items-center justify-start">
                <div className="w-[36px]"></div>
            </div>
            <div className="flex justify-center [column-gap:8px] items-center">
                <Link href="/"
                    className="
                   pb-[8px]
                   [border-bottom-color: var(--always-dark-overlay)]
                   min-w-0
                   mt-0
                   mb-0
                   border-t-0
                   min-h-0
                   pt-[8px]
                   border-b-0
                   [border-bottom-style: solid;]
                   max-w-full
                   [border-top-style: solid;]
                   [border-start-end-radius: inherit;]
                   [border-end-start-radius: inherit;]
                   [padding-inline-start: 8px;]
                   justify-center
                   bg-transparent
                   [touch-action: manipulation;]
                   [padding-inline-end: 8px;]
                   flex-col
                   [flex-basis: auto;]
                   [border-inline-end-color: var(--always-dark-overlay);]
                   box-border
                   [-webkit-user-select: none;]
                   flex
                   items-center
                   [list-style-type: none;]
                   [flex-shrink: 0;]
                   cursor-pointer
                   [border-inline-start-style: solid;]
                   [outline-style: none;]
                   [border-inline-start-color: var(--always-dark-overlay);]
                   relative
                   [margin-inline-start: 0;]
                   z-0
                   [-webkit-tap-highlight-color: transparent;]
                   [border-start-start-radius: inherit;]
                   [border-inline-end-style: solid;]
                   [text-align: inherit;]
                   [margin-inline-end: 0;]
                   [border-inline-start-width: 0;]
                   [border-end-end-radius: inherit;]
                   [transition-duration: .2s;]
                   [transition-property: transform;]
                   [border-inline-end-width: 0;]
                   [text-decoration: none;]
                   [outline: none;]
                ">
                    <h1 className="heading"
                        style={{
                        '--x---base-line-clamp-line-height': 'calc(1.4 * 1em)',
                        '--x-lineHeight': 'calc(1.4 * 1em)',
                        } as React.CSSProperties}>
                        <span className="overflow-hidden max-w-full whitespace-nowrap [text-overflow: ellipsis;] block">Home</span>
                    </h1>
                </Link>
            </div>
            <div className="h-[60px]
                [column-gap:8px]
                [padding-inline-end:8px]
                flex
                items-center
                justify-end
            ">
                <div className="
                    [border-start-end-radius:50%]
                    [animation-duration:.3s;]
                    [border-end-start-radius:50%]
                    [border-end-end-radius:50%;]
                    [border-start-start-radius:50%;]
                    [animation-name:xekv6nw-B;]
                ">
                </div>
            </div>
            </>
        );
    }

    return (
        <div className="flex gap-8 px-4 h-15 items-center justify-center">
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
    );
};
