// src/features/header/components/HeaderDesktop.tsx
'use client';
import React, {useState, useRef, useEffect} from "react";
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
    const [activeTabState, setActiveTabState] = useState<TabType>(activeTab);
    const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
    const tabsContainerRef = useRef<HTMLDivElement | null>(null);
    const tabRefs = useRef<Record<TabType, HTMLSpanElement | null>>({
        foryou: null,
        following: null,
    });

    const UNDERLINE_WIDTH = 90;

    useEffect(() => {
        const activeElement = tabRefs.current[activeTabState];
        const container = tabsContainerRef.current;
        if (!activeElement || !container) return;

        const { left, width } = activeElement.getBoundingClientRect();
        const containerLeft = container.getBoundingClientRect().left;
        setUnderlineStyle({
            left: left - containerLeft + (width - UNDERLINE_WIDTH) / 2,
            width: UNDERLINE_WIDTH,
        });
    }, [activeTabState]);

    const tabs: { id: TabType; label: string }[] = [
        { id: 'foryou', label: 'For you' },
        { id: 'following', label: 'Following' },
    ];

    const handleTabChange = (tab: TabType) => {
        setActiveTabState(tab);
        onTabChange?.(tab);
    };

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
        <>
            <div className="flex [padding-inline-start:8px] items-center justify-start">
                <div className="w-[36px]"></div>
            </div>
            <div className="flex justify-center [column-gap:8px] items-center">
                <div ref={tabsContainerRef} className="relative pt-0 mt-0 mb-0 [padding-inline-end:0] flex items-center flex-row [margin-inline-start:0] [padding-inline-start:0] [margin-inline-end:0]">
                {tabs.map((tab) => (
                            <div
                                key={tab.id}
                                onClick={() => handleTabChange(tab.id)}
                                className={`pt-0 mt-0 mb-0 pb-0 
                                 font-semibold transition-colors cursor-pointer 
                                 [padding-inline-end:0]
                                 flex-shrink
                                 [flex-basis:0]
                                 [margin-inline-start:0]
                                 flex-grow
                                 [padding-inline-start:0]
                                 [margin-inline-end:0]
                                 `}
                            >
                                <div className={` 
                                    [padding-inline-end:16px]
                                    [padding-inline-start:16px]
                                    text-center
                                    relative
                                    flex-grow
                                `}>
                                    <Link href={tab.id === 'foryou' ? '/' : '/following'} aria-label={tab.label} className="
                                        h-[60px]
                                        pt-0
                                        mt-0
                                        mb-0
                                        bt-0
                                        [border-bottom-style:solid]
                                        border-b-0
                                        [border-top-style:none]
                                        pb-0
                                        max-w-[150px]
                                        [border-inline-start-style:none;]
                                        [padding-inline-start:8px]
                                        justify-center
                                        bg-transparent
                                        [touch-action: manipulation;]
                                        [padding-inline-end:8px]
                                        flex-col
                                        box-border
                                        [-webkit-user-select:none]
                                        flex
                                        items-center
                                        [list-style-type:none;]
                                        cursor-pointer
                                        [margin-inline-start:0]
                                        [-webkit-tap-highlight-color:transparent]
                                        [border-inline-end-style:none]
                                        [text-align:inherit]
                                        [margin-inline-end:0]
                                        [border-inline-start-width:0;]
                                        [border-inline-end-width:0;]
                                        [text-decoration:none]
                                        outline-none
                                    ">
                                        <div className="max-w-[125px] w-full overflow-hidden whitespace-nowrap [text-overflow:ellipsis;]
                                            [column-gap:12px]
                                            flex
                                            items-center
                                            justify-center
                                            flex-row
                                        ">
                                            <span
                                                ref={(el) => {
                                                    if (el) tabRefs.current[tab.id] = el;
                                                }}
                                                style={{
                                                '--x---base-line-clamp-line-height': 'calc(1.4 * 1em)',
                                                '--x-lineHeight': 'calc(1.4 * 1em)',
                                            } as React.CSSProperties}
                                            className={
                                                `
                                                overflow-visible
                                                min-w-0
                                                max-w-full
                                                ${activeTab === tab.id ? 'text-[var(--barcelona-primary-text)]' : 'text-[var(--barcelona-secondary-text)]'}
                                                [font-size:var(--system-15-font-size)]
                                                text-center
                                                [word-wrap:break-word]
                                                font-semibold
                                                relative
                                                block
                                                [font-family:var(--font-family-system)]
                                                whitespace-pre-line
                                                leading-[var(--x-lineHeight)]
                                                [word-break:break-word]
                                                [--base-line-clamp-line-height:var(--x---base-line-clamp-line-height);]
                                                [-webkit-user-select:none]
                                                [list-style-type:none
                                                cursor-pointer
                                                [-webkit-tap-highlight-color:transparent]
                                                tab-button
                                            `
                                            }
                                            >
                                                <span className="overflow-x-hidden max-w-full whitespace-nowrap [text-overflow:ellipsis] block">
                                                    {tab.label}
                                                </span>
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    <div className="
                                            border-b bottom-[-1px] border-b-[var(--barcelona-primary-text)] [border-bottom-style:solid]
                                            [inset-inline-end:0] [will-change:transform] [inset-inline-start:0] absolute transition-all duration-300
                                        "
                         style={{
                             left: `${underlineStyle.left}px`,
                             width: `${underlineStyle.width}px`,
                         }}
                    ></div>
                </div>
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
};
