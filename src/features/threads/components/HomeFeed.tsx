// typescript
'use client';
import React, { useRef, useEffect } from "react";
import { Thread as ThreadComponent } from "@/features/threads/components/Thread";
import { Thread } from "@/types";

interface HomeFeedProps {
    sampleThreads: Thread[];
}

const HomeFeed: React.FC<HomeFeedProps> = ({ sampleThreads }) => {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const targetRef = useRef<number | null>(null);

    useEffect(() => {
        const mq = window.matchMedia("(min-width: 768px)"); // only apply on desktop (md)

        const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

        const onWheel = (e: WheelEvent) => {
            if (!mq.matches) return;
            const container = scrollRef.current;
            if (!container) return;

            const delta = e.deltaY;
            const maxScroll = container.scrollHeight - container.clientHeight;

            // start from last target if exists, otherwise current scrollTop
            const start = targetRef.current ?? container.scrollTop;
            // scale delta for a smoother feel (adjust multiplier if needed)
            const scaled = delta * 1.1;

            // compute new target and clamp
            const nextTarget = clamp(start + scaled, 0, maxScroll);
            targetRef.current = nextTarget;

            // prevent body scrolling when container can scroll in this direction
            const atTop = container.scrollTop === 0;
            const atBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 1;
            if ((delta < 0 && !atTop) || (delta > 0 && !atBottom)) {
                e.preventDefault();
                container.scrollTo({ top: nextTarget, behavior: "smooth" });
            }
            // otherwise allow natural page scroll
        };

        window.addEventListener("wheel", onWheel, { passive: false });
        return () => {
            window.removeEventListener("wheel", onWheel);
        };
    }, []);

    return (
        <div
            className="w-full pt-5 md:max-w-2xl md:mx-auto md:rounded-t-3xl md:fixed md:left-0 md:right-55 md:top-18 bg-[#101010] md:border md:border-[#383939] min-h-screen md:h-[calc(100vh-4rem)]"
        >
            <div
                ref={scrollRef}
                className="md:overflow-y-auto no-scrollbar h-full pb-20"
                style={{ scrollBehavior: "smooth" }} // CSS fallback
            >
                {sampleThreads.map((thread: Thread, index: number) => (
                    <div key={thread.id} className="w-full">
                        <ThreadComponent
                            thread={thread}
                            className={
                                index === 0
                                    ? "transition-colors px-3 py-4 md:px-6 bg-[#101010]"
                                    : "px-3 py-4 md:px-6 bg-[#101010]"
                            }
                        />
                        <div className="h-[0.5px] border-b-1 border-[#383939]" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeFeed;
