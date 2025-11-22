import React, { useState, useMemo, useCallback } from "react";

// Interface mở rộng để hỗ trợ logic tương tác
export interface ActionInput {
    key: string;
    icon: React.ReactNode;
    filledIcon?: React.ReactNode; // Icon khi active (đã like/repost)
    interactionsNumber: string | number;
    isActive?: boolean; // Trạng thái đã kích hoạt chưa
    activeColor?: string; // Màu khi active (vd: text-red-600)
    onClick?: (e: React.MouseEvent) => void;
}

export function useThreadActionBase(actions: ActionInput[]) {
    const [hoverKey, setHoverKey] = useState<string | null>(null);

    const enrichedActions = useMemo(() => {
        return actions.map((action) => {
            const isHovered = hoverKey === action.key;

            // Xử lý số lượng (chấp nhận cả number và string)
            const numStr = action.interactionsNumber.toString();
            const count = parseInt(numStr || "0");
            const hasCount = !isNaN(count) && count > 0;

            // Logic tính toán Width animation (Giữ nguyên logic Threads xịn xò của bạn)
            let displayWidth = "0px";
            let displayOpacity = 0;

            if (!hasCount) {
                displayWidth = "0px";
                displayOpacity = 0;
            } else {
                const textLen = numStr.length;
                const baseVal = textLen === 1 ? 1 : textLen * 0.8;

                if (isHovered) {
                    displayWidth = `${baseVal + 1.5}ch`;
                } else {
                    displayWidth = `${baseVal + 0.6}ch`;
                }
                displayOpacity = 1;
            }

            return {
                ...action, // Pass hết các props cũ (onClick, isActive...) ra ngoài
                hasCount,
                isHovered,
                displayWidth,
                displayOpacity,
                interactionsNumber: numStr // Chuẩn hóa về string để render
            };
        });
    }, [actions, hoverKey]);

    const onHoverStart = useCallback((key: string) => setHoverKey(key), []);
    const onHoverEnd = useCallback(() => setHoverKey(null), []);

    return { enrichedActions, onHoverStart, onHoverEnd };
}