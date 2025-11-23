import React from "react";
import { IconProps } from "@/components/ui/atoms/IconProps";

const MoreIcon: React.FC<IconProps> = ({ className, ...props }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            role="img"
            aria-label="More"
            // Mặc định w-6 h-6 (24px), fill-current để ăn theo màu text
            className={`w-6 h-6 fill-current flex-shrink-0 ${className || ''}`}
            {...props}
        >
            <title>More</title>
            {/* Dùng thuộc tính SVG chuẩn thay vì class tailwind cho các hình khối bên trong */}
            <rect x="3" y="7" width="21" height="2.5" rx="1.25" />
            <rect x="3" y="15" width="14" height="2.5" rx="1.25" />
        </svg>
    );
}

export default MoreIcon;