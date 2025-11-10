'use client';
import React from "react";
import { Thread as ThreadComponent } from "@/features/threads/components/Thread";
import { Thread } from "@/types";

interface HomeFeedProps {
    sampleThreads: Thread[];
}

const HomeFeed: React.FC<HomeFeedProps> = ({ sampleThreads }) => {
    return (
        <div className="w-full rounded-t-3xl bg-[#101010] md:border md:border-[#383939] md:rounded-t-3xl md:mt-2">
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
    );
};

export default HomeFeed;
