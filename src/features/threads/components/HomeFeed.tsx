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

    const SCROLL_SPEED_MULTIPLIER = 0.8;
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        // Handle global wheel event
        const handleGlobalScroll = (e: WheelEvent) => {

            e.preventDefault();
            // container.scrollTop += e.deltaY;
            container.scrollBy({
                top: e.deltaY * 4, // tăng tốc độ
                behavior: "smooth"
            })
        };

        // Listen globally (so it works anywhere on the page)
        window.addEventListener("wheel", handleGlobalScroll, { passive: false });

        return () => window.removeEventListener("wheel", handleGlobalScroll);
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
            <div className="md:relative w-full md:top-[2px] md:border md:border-[#383939] md:mt-2 md:rounded-t-3xl bg-[#101010] md:h-[calc(100vh-80px)] overflow-hidden">
                {/* Nội dung cuộn */}
                <div ref={scrollContainerRef} className="custom-scrollbar w-full h-full overflow-y-auto">
                    {sampleThreads.map((thread: Thread, index: number) => (
                        <div key={thread.id} className="w-full">
                            <ThreadComponent
                                thread={thread}
                                className={`px-3 py-4 md:px-6 bg-[#101010] ${index === 0 ? 'transition-colors' : ''}`}
                            />
                            {index < sampleThreads.length - 1 && <div className="h-px bg-[#383939]" />}
                        </div>
                    ))}
                </div>
            </div>

            {/* Custom scrollbar positioned outside */}
            <div
                className="absolute -top-17 w-2 h-[calc(100vh-80px)] md:block hidden"
                style={{
                    right: 'calc(-39rem - 8px)',
                    height: 'calc(100vh - 80px - 64px)'
                }}
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
