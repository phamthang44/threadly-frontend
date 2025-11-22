'use client';
import React, {useEffect, useRef, useState} from "react";
import {Thread as ThreadComponent} from "@/features/thread/components/Thread";
import {Thread} from "@/features/thread/types";
import ThreadlyComposer from "../../thread/components/ThreadlyComposer";

interface HomeFeedProps {
    sampleThreads: Thread[];
    isAuthenticated?: boolean;
}

const HomeFeed: React.FC<HomeFeedProps> = ({ sampleThreads, isAuthenticated = false }) => {

    const onClickAThread = (id: number) => {
        console.log("Clicked thread with id:", id);
    }

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
