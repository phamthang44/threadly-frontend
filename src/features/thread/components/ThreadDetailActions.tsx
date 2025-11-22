// components/ThreadDetailActions.tsx
import React from "react";
import { useThreadActionBase } from "../hooks/useThreadActionBase";

interface ThreadDetailActionsProps {
    actions: {
        key: string;
        icon: React.ReactNode;
        interactionsNumber: string;
    }[];
}

const ThreadDetailActions: React.FC<ThreadDetailActionsProps> = ({ actions }) => {
    const { enrichedActions, onHoverStart, onHoverEnd } = useThreadActionBase(actions);

    return (
        <div className="flex items-center mt-1.5 -mb-1 -ml-2">
            {enrichedActions.map((action) => {
                const {
                    key, icon, interactionsNumber,
                    isHovered, hasCount, displayWidth, displayOpacity
                } = action;

                return (
                    <div
                        key={key}
                        onMouseEnter={() => onHoverStart(key)}
                        onMouseLeave={onHoverEnd}
                        // CONTAINER CHÍNH
                        // - Nếu không có số (hasCount=false): Ép cứng w-9 h-9 để luôn tròn và icon luôn giữa.
                        // - Nếu có số: w-auto để giãn theo nội dung + padding horizontal (px-2).
                        className={`
                            group relative flex items-center justify-center 
                            h-9 cursor-pointer touch-manipulation transition-all duration-200
                            ${hasCount ? "w-auto px-3" : "w-9"} 
                        `}
                    >
                        {/* --- LAYER 1: BACKGROUND BUBBLE --- */}
                        {/* - inset-0: Lấp đầy container cha.
                           - rounded-full: Tự động bo tròn (nếu vuông) hoặc bo pill (nếu chữ nhật).
                           - Fix lỗi lệch: Vì nó lấp đầy cha, cha ở đâu nó ở đó, không bao giờ lệch.
                        */}
                        <div
                            className={`
                                absolute inset-0 bg-[#1e1e1e] rounded-full transition-all duration-200 ease-out
                                ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-50"}
                            `}
                        />

                        {/* --- LAYER 2: CONTENT --- */}
                        <div className="relative z-10 flex items-center justify-center">
                            {/* Icon Wrapper: Giữ icon ổn định */}
                            <div className="text-[var(--barcelona-charcoal-text)] flex items-center justify-center">
                                {icon}
                            </div>

                            {/* Number Container: Slide Animation */}
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
                                <span className="text-[13px] font-normal text-[var(--barcelona-charcoal-text)] whitespace-nowrap">
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

export default ThreadDetailActions;