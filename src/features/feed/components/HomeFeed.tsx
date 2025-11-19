'use client';
import React, {useEffect, useRef, useState} from "react";
import {Thread as ThreadComponent} from "@/features/thread/components/Thread";
import {Thread} from "@/features/thread/types";
import ThreadlyComposer from "../../thread/components/ThreadlyComposer";

interface HomeFeedProps {
    sampleThreads: Thread[];
    onLoadMore?: () => void;
    isAuthenticated?: boolean;
}

const HomeFeed: React.FC<HomeFeedProps> = ({ sampleThreads, onLoadMore, isAuthenticated = false }) => {
    // const scrollContainerRef = useRef<HTMLDivElement>(null);
    // const thumbRef = useRef<HTMLDivElement>(null);
    // const [scrollInfo, setScrollInfo] = useState({ height: 0, top: 0 });
    //
    //
    // useEffect(() => {
    //     const container = scrollContainerRef.current;
    //     if (!container) return;
    //
    //     const handleScroll = () => {
    //         const { scrollTop, scrollHeight, clientHeight } = container;
    //         const ratio = clientHeight / scrollHeight;
    //         const thumbHeight = Math.max(clientHeight * ratio, 30);
    //         const thumbTop = (scrollTop / scrollHeight) * clientHeight;
    //
    //         setScrollInfo({ height: thumbHeight, top: thumbTop });
    //
    //         if (scrollHeight - (scrollTop + clientHeight) < scrollHeight * 0.2) {
    //             onLoadMore?.();
    //         }
    //     };
    //
    //     handleScroll();
    //     container.addEventListener("scroll", handleScroll);
    //     window.addEventListener("resize", handleScroll);
    //     return () => {
    //         container.removeEventListener("scroll", handleScroll);
    //         window.removeEventListener("resize", handleScroll);
    //     };
    // }, [onLoadMore]);

    const onClickAThread = (id: number) => {
        console.log("Clicked thread with id:", id);
    }

    // console.log("isAuthenticated:", isAuthenticated);
    // isAuthenticated = true; //testing
    return (
        <>
            <div className="w-full md:top-0 md:border-t-0 md:border-[#383939] bg-[#181818] relative">
                {/* Tab Navigation & Compose Area */}
                <div className="w-full h-full md:mt-6">
                    {/* Compose area - only for authenticated users */}
                    {isAuthenticated && (
                        <div className="border-b border-[#383939] px-5 bg-[#181818] pb-3">
                            {/* Your compose area JSX */}
                            <ThreadlyComposer />
                        </div>
                    )}
                    {/* Threads feed */}
                    {sampleThreads.map((thread: Thread, index: number) => (
                        <div key={thread.id} className="w-full" onClick={() => onClickAThread(thread.id)}>
                            <ThreadComponent
                                thread={thread}
                                className={`px-3 py-4 md:px-4 bg-[#181818] cursor-pointer ${index === 0 ? 'transition-colors' : ''}
                                    ${index === sampleThreads.length - 1 ? 'mb-6 md:pb-10' : ''}
                                `}
                            />
                            {index < sampleThreads.length - 1 && <div className="h-px bg-[#383939]" />}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default HomeFeed;
