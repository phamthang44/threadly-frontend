import React from "react";
import { IconProps } from "@/components/ui/atoms/IconProps";

const MoreIconDown: React.FC<IconProps> = ({className}) => {
    //style="--x-fill: currentColor; --x-height: 12px; --x-width: 12px;"
    return (
        <svg aria-label="More" role="img" viewBox="0 0 13 12"
             className={className ? className : `w-[var(--x-width)] h-[var(--x-height)] fill-[var(--x-fill)] flex-shrink relative block 
             text-[var(--barcelona-secondary-icon)] forced-color-adjust-auto
             `}
             style={{
                 '--x-fill': 'currentColor',
                 '--x-height': '12px',
                 '--x-width': '12px',
             } as React.CSSProperties}>
            <title>More</title>
            <path d="m2.5 4.2 4 4 4-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth="1.5"></path>
        </svg>
    );
}

export default MoreIconDown;