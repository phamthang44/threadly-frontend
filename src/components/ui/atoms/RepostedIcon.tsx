import React from 'react';
import {IconProps} from "@/components/ui/atoms/IconProps";

const RepostedIcon:React.FC<IconProps> = ({className}) => {
    return (
        <svg aria-label="Repost" role="img" viewBox="0 0 18 18"
             className={className ? className : `
             w-[var(--x-width)] h-[var(--x-height)] fill-[var(--x-fill)] flex-shrink-0 
             relative block text-[var(--barcelona-charcoal-icon)] [forced-color-adjust:auto]
             `}
             style={{
                    '--x-fill': 'currentColor',
                    '--x-height': '18px',
                    '--x-width': '18px',
             } as React.CSSProperties}><title>Repost</title>
            <path
                d="M6.413.735a.625.625 0 0 1 .88-.075l2.672 2.25a.625.625 0 0 1-.402 1.103h-4.36a2.75 2.75 0 0 0-2.75 2.75v4.5a2.75 2.75 0 0 0 2.75 2.75.625.625 0 1 1 0 1.25 4 4 0 0 1-4-4v-4.5a4 4 0 0 1 4-4H7.85L6.488 1.616a.625.625 0 0 1-.075-.88ZM11.587 17.29a.625.625 0 0 1-.88.076l-2.672-2.25a.625.625 0 0 1 .402-1.103h4.36a2.75 2.75 0 0 0 2.75-2.75v-4.5a2.75 2.75 0 0 0-2.75-2.75.625.625 0 1 1 0-1.25 4 4 0 0 1 4 4v4.5a4 4 0 0 1-4 4H10.15l1.362 1.147a.625.625 0 0 1 .075.88Z"></path>
            <path d="m11.733 7.2-3.6 3.6L6.27 8.937" fill="none" stroke="currentColor" stroke-linecap="round"
                  stroke-linejoin="round" stroke-width="1.25"></path>
        </svg>
    );
}
export default RepostedIcon;