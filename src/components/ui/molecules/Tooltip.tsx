'use client';

import React, {
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { createPortal } from 'react-dom';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps {
    content: string | React.ReactNode;
    position?: TooltipPosition;
    delay?: number;
    children: React.ReactNode;
    className?: string;
}

type TooltipCoords = {
    top: number;
    left: number;
    transform: string;
};

const getCoords = (rect: DOMRect, position: TooltipPosition): TooltipCoords => {
    const offset = 8;
    switch (position) {
        case 'bottom':
            return {
                top: rect.bottom + offset,
                left: rect.left + rect.width / 2,
                transform: 'translate(-50%, 0)',
            };
        case 'left':
            return {
                top: rect.top + rect.height / 2,
                left: rect.left - offset,
                transform: 'translate(-100%, -50%)',
            };
        case 'right':
            return {
                top: rect.top + rect.height / 2,
                left: rect.right + offset,
                transform: 'translate(0, -50%)',
            };
        case 'top':
        default:
            return {
                top: rect.top - offset,
                left: rect.left + rect.width / 2,
                transform: 'translate(-50%, -100%)',
            };
    }
};

const Tooltip: React.FC<TooltipProps> = ({
                                             content,
                                             position = 'top',
                                             delay = 200,
                                             children,
                                             className = '',
                                         }) => {
    const triggerRef = useRef<HTMLDivElement | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [coords, setCoords] = useState<TooltipCoords>({
        top: 0,
        left: 0,
        transform: 'translate(-50%, -100%)',
    });
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const updatePosition = useCallback(() => {
        if (!triggerRef.current) return;
        const rect = triggerRef.current.getBoundingClientRect();
        setCoords(getCoords(rect, position));
    }, [position]);

    useEffect(() => {
        if (!isVisible) return;
        updatePosition();
        const handle = () => updatePosition();
        window.addEventListener('scroll', handle, true);
        window.addEventListener('resize', handle);
        return () => {
            window.removeEventListener('scroll', handle, true);
            window.removeEventListener('resize', handle);
        };
    }, [isVisible, updatePosition]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const handleMouseEnter = () => {
        timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsVisible(false);
    };

    const overlay = (
        <div
            className="fixed z-50 px-3 py-2 text-sm text-white border-1 bg-[#181818] dark:bg-[#181818] rounded-md whitespace-nowrap pointer-events-none"
            style={{ top: coords.top, left: coords.left, transform: coords.transform }}
        >
            {content}
            <div
                className={`absolute w-2 h-2 bg-[#181818] dark:bg-[#181818] border-l-1 border-b-1 rotate-45 ${
                    position === 'top'
                        ? 'left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2'
                        : position === 'bottom'
                            ? 'left-1/2 -translate-x-1/2 top-0 -translate-y-1/2'
                            : position === 'left'
                                ? 'top-1/2 -translate-y-1/2 right-0 translate-x-1/2'
                                : 'top-1/2 -translate-y-1/2 left-0 -translate-x-1/2'
                }`}
            />
        </div>
    );

    return (
        <div
            ref={triggerRef}
            className={`${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            {mounted && isVisible && createPortal(overlay, document.body)}
        </div>
    );
};

export default Tooltip;