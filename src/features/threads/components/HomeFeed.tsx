'use client';
import React, { useEffect, useRef, useState } from "react";
import { Thread as ThreadComponent } from "@/features/threads/components/Thread";
import { Thread } from "@/types";

interface HomeFeedProps {
    sampleThreads: Thread[];
    onLoadMore?: () => void;
}

const HomeFeed: React.FC<HomeFeedProps> = ({ sampleThreads, onLoadMore }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);
    const [scrollInfo, setScrollInfo] = useState({ height: 0, top: 0 });

    const SCROLL_SPEED_MULTIPLIER = 4;
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        // let lastTouchY: number | null = null;

        // Handle global wheel event
        const handleGlobalScroll = (e: WheelEvent) => {

            e.preventDefault();
            // container.scrollTop += e.deltaY;
            container.scrollBy({
                top: e.deltaY * SCROLL_SPEED_MULTIPLIER, // tăng tốc độ
                behavior: "smooth"
            })
        };

        // const handleTouchStart = (e: TouchEvent) => {
        //     lastTouchY = e.touches[0]?.clientY ?? null;
        // };
        //
        // const handleTouchMove = (e: TouchEvent) => {
        //     if (lastTouchY == null) return;
        //     const currentY = e.touches[0]?.clientY ?? lastTouchY;
        //     const delta = lastTouchY - currentY;
        //     lastTouchY = currentY;
        //
        //     // prevent native page scroll when intentionally dragging
        //     e.preventDefault();
        //
        //     container.scrollBy({
        //         top: delta * 4,
        //         behavior: 'auto'
        //     });
        // };

        // Listen globally (so it works anywhere on the page)
        // Desktop wheel
        window.addEventListener('wheel', handleGlobalScroll, { passive: false });
        // Mobile touch
        // container.addEventListener('touchstart', handleTouchStart, { passive: true });
        // container.addEventListener('touchmove', handleTouchMove, { passive: false });

        return () => {
            window.removeEventListener("wheel", handleGlobalScroll);
            // container.removeEventListener('touchstart', handleTouchStart);
            // container.removeEventListener('touchmove', handleTouchMove);
        }
    }, []);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = container;
            const ratio = clientHeight / scrollHeight;
            const thumbHeight = Math.max(clientHeight * ratio, 30);
            const thumbTop = (scrollTop / scrollHeight) * clientHeight;

            setScrollInfo({ height: thumbHeight, top: thumbTop });

            if (scrollHeight - (scrollTop + clientHeight) < scrollHeight * 0.2) {
                onLoadMore?.();
            }
        };

        handleScroll();
        container.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);
        return () => {
            container.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, [onLoadMore]);

    const handleThumbMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        const container = scrollContainerRef.current;
        if (!container) return;

        const startY = e.clientY;
        const startScrollTop = container.scrollTop;
        const { scrollHeight, clientHeight } = container;
        const ratio = clientHeight / scrollHeight;

        const handleMouseMove = (moveEvent: MouseEvent) => {
            const deltaY = moveEvent.clientY - startY;
            const newScrollTop = startScrollTop + deltaY / ratio;
            container.scrollTop = newScrollTop;
        };

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    return (
        <div className="w-full max-w-2xl mx-auto relative">
            <div className="md:relative w-full md:top-[2px] md:border-t-0 md:border-[#383939] bg-[#0A0A0A] md:h-[calc(100vh-80px)] md:overflow-hidden">
                {/* Nội dung cuộn */}
                <div ref={scrollContainerRef} className="custom-scrollbar w-full h-full overflow-y-auto md:mt-6">
                    {sampleThreads.map((thread: Thread, index: number) => (
                        <div key={thread.id} className="w-full">
                            <ThreadComponent
                                thread={thread}
                                className={`px-3 py-4 md:px-6 bg-[#101010] ${index === 0 ? 'transition-colors' : ''}
                                    ${index === sampleThreads.length - 1 ? 'mb-6 md:pb-10' : ''}
                                `}
                            />
                            {index < sampleThreads.length - 1 && <div className="h-px bg-[#383939]" />}
                        </div>
                    ))}
                </div>
            </div>

            {/* Custom scrollbar positioned outside */}
            <div
                className="absolute xl:-top-16 lg:top-8 w-2 h-[calc(100vh)] md:block hidden xl:right-[-633px] lg:right-0 right-2 bg-[#1A1A1A] rounded"
            >
                <div
                    ref={thumbRef}
                    className="w-2 bg-[#444444] rounded cursor-pointer hover:bg-[#555555] transition-colors"
                    style={{
                        height: `${scrollInfo.height}px`,
                        top: `${scrollInfo.top}px`,
                        position: 'absolute'
                    }}
                    onMouseDown={handleThumbMouseDown}
                />
            </div>
        </div>
    );
};

export default HomeFeed;
