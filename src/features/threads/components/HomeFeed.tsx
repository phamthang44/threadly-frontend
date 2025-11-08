import React from "react";
import { Thread as ThreadComponent } from "@/features/threads/components/Thread";
import { Thread } from "@/types";

interface HomeFeedProps {
    sampleThreads: Thread[];
}

const HomeFeed: React.FC<HomeFeedProps> = ({ sampleThreads }) => {
    return (
        <div className="max-w-2xl mx-auto rounded-t-3xl fixed left-100 bg-[#181818] border-1 border-[#383939] h-screen overflow-hidden">
            <div className="h-full overflow-y-auto no-scrollbar">
                {sampleThreads.map((thread: Thread, index: number) => (
                    <div key={thread.id} className="w-full">
                        <ThreadComponent
                            thread={thread}
                            className={index === 0 ? 'transition-colors px-6 py-4' : "px-6 py-4"}
                        />
                        <div className="h-[0.5px] my-4 bg-[#383939]"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeFeed;
