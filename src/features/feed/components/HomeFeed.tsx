'use client';
import React from "react";
import {Thread as ThreadComponent} from "@/features/thread/components/Thread";
import {Thread} from "@/features/thread/types";
import ThreadlyComposer from "../../thread/components/ThreadlyComposer";
import {useAppSelector} from "@/store/hooks";

interface HomeFeedProps {
    sampleThreads: Thread[];
}

const HomeFeed: React.FC<HomeFeedProps> = ({ sampleThreads}) => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    return (
        <>
            <div className="w-full md:top-0 md:border-t-0 md:border-[var(--home-feed-border)] bg-[var(--home-feed-bg)] relative">
                {/* Tab Navigation & Compose Area */}
                <div className="w-full h-full md:mt-6">
                    {/* Compose area - only for authenticated users */}
                    {isAuthenticated && (
                        <div className="border-b border-[var(--home-feed-border)] px-5 bg-[var(--home-feed-bg)] pb-3">
                            {/* Your compose area JSX */}
                            <ThreadlyComposer />
                        </div>
                    )}
                    {/* Threads feed */}
                    {sampleThreads.map((thread: Thread, index: number) => (
                        <div key={thread.id} className="w-full">
                            <ThreadComponent
                                thread={thread}
                                className={`px-3 py-4 md:px-4 bg-[var(--home-feed-bg)] cursor-pointer ${index === 0 ? 'transition-colors' : ''}
                                    ${index === sampleThreads.length - 1 ? 'mb-6 md:pb-10' : ''}
                                `}/>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default HomeFeed;
