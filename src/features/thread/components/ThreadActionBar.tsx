'use client';

import React from "react";
import { useThreadActionBase, ActionInput } from "../hooks/useThreadActionBase";

interface ThreadActionBarProps {
    actions: ActionInput[];
    className?: string;
}

const ThreadActionBar: React.FC<ThreadActionBarProps> = ({ actions, className }) => {
    const { enrichedActions, onHoverStart, onHoverEnd } = useThreadActionBase(actions);

    return (
        <div className={`flex items-center -ml-2 ${className || ""}`}>
            {enrichedActions.map((action) => {
                const {
                    key, icon, filledIcon, interactionsNumber,
                    isHovered, hasCount, displayWidth, displayOpacity,
                    isActive, activeColor, onClick
                } = action;

                // 1. Logic Icon: Active thì dùng Filled, không thì dùng Icon thường
                const IconToRender = (isActive && filledIcon) ? filledIcon : icon;

                // 2. Logic Màu Sắc (QUAN TRỌNG):
                // - Nếu Active: Dùng màu active (ví dụ: đỏ/xanh)
                // - Nếu Inactive: Dùng màu xám 'charcoal' CỐ ĐỊNH.
                //   (Bỏ group-hover đổi màu đi để tránh bị nháy, giống bản gốc)
                const finalColorClass = isActive && activeColor
                    ? activeColor
                    : "text-[var(--barcelona-charcoal-text)]";

                return (
                    <div
                        key={key}
                        onMouseEnter={() => onHoverStart(key)}
                        onMouseLeave={onHoverEnd}
                        onClick={(e) => {
                            e.stopPropagation();
                            onClick?.(e);
                        }}
                        className={`
                            group relative flex items-center justify-center 
                            h-9 cursor-pointer touch-manipulation transition-all duration-200 select-none
                            ${hasCount ? "w-auto px-3" : "w-9"} 
                        `}
                    >
                        {/* LAYER 1: BACKGROUND BUBBLE (Giữ nguyên) */}
                        <div
                            className={`
                                absolute inset-0 bg-[#1e1e1e] rounded-full transition-all duration-200 ease-out
                                ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-50"}
                            `}
                        />

                        {/* LAYER 2: CONTENT */}
                        <div className="relative z-10 flex items-center justify-center">
                            {/* Icon Wrapper: Gán màu trực tiếp tại đây giống bản gốc */}
                            <div className={`flex items-center justify-center ${finalColorClass} transition-colors duration-200`}>
                                {IconToRender}
                            </div>

                            {/* Number Container */}
                            <div
                                style={{
                                    width: displayWidth,
                                    opacity: displayOpacity,
                                }}
                                className={`
                                    overflow-hidden flex items-center
                                    transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]
                                    ${hasCount ? "ml-1" : "ml-0"} 
                                `}
                            >
                                {/* Number Text: Gán màu trực tiếp tại đây giống bản gốc */}
                                <span className={`text-[13px] font-normal whitespace-nowrap ${finalColorClass} transition-colors duration-200`}>
                                    {interactionsNumber}
                                </span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ThreadActionBar;