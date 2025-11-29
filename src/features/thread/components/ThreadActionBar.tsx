'use client';

import React from "react";
import { useThreadActionBase, ActionInput } from "../hooks/useThreadActionBase";
import {formatNumber} from "@/utils/numberFormatter";

interface ThreadActionBarProps {
    actions: ActionInput[];
    className?: string;
}

const ThreadActionBar: React.FC<ThreadActionBarProps> = ({ actions, className, ...props }) => {
    const { enrichedActions, onHoverStart, onHoverEnd } = useThreadActionBase(actions);

    return (
        // --- FLEX CONTAINER ---
        // - flex: Dùng Flexbox như bản gốc.
        // - w-full max-w-[320px]: Giới hạn chiều rộng để các nút không bị xa nhau quá trên màn hình to.
        // - justify-between: (Không cần thiết nếu dùng flex-1, nhưng để an toàn).
        <div className={`flex items-center w-full max-w-[250px] -ml-2 ${className || ""}`} {...props}>
            {enrichedActions.map((action) => {
                const {
                    key, icon, filledIcon, interactionsNumber,
                    isHovered, hasCount, displayWidth, displayOpacity,
                    isActive, activeColor, onClick
                } = action;

                const IconToRender = (isActive && filledIcon) ? filledIcon : icon;

                const finalColorClass = isActive && activeColor
                    ? activeColor
                    : "text-[var(--barcelona-charcoal-text)]";

                return (
                    // --- ITEM WRAPPER  ---
                    <div key={key} className="flex-1 flex items-center justify-center group/item">

                        <div
                            onMouseEnter={() => onHoverStart(key)}
                            onMouseLeave={onHoverEnd}
                            onClick={(e) => {
                                e.stopPropagation();
                                onClick?.(e);
                            }}
                            // LOGIC BUBBLE & PADDING (Giữ nguyên để fix tâm icon)
                            className={`group relative flex items-center  h-9 cursor-pointer touch-manipulation transition-all duration-200 select-none ${hasCount ? "w-auto px-2" : "w-9 justify-center"}`}>
                            {/* LAYER 1: BACKGROUND BUBBLE */}
                            <div
                                className={`
                                    absolute inset-0 bg-[var(--thread-action-bar-bg)] rounded-full transition-all duration-200 ease-out
                                    ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-50"}
                                `}
                            />

                            {/* LAYER 2: CONTENT */}
                            <div className="relative z-10 flex items-center">
                                <div className={`flex items-center ${finalColorClass} transition-colors duration-200`}>
                                    {IconToRender}
                                </div>

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
                                    <span className={`text-[13px] font-normal whitespace-nowrap ${finalColorClass} transition-colors duration-200`}>
                                        {formatNumber(interactionsNumber)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ThreadActionBar;