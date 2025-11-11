// // src/features/threads/components/HomeFeed.tsx
// 'use client';
// import React from "react";
// import { Thread as ThreadComponent } from "@/features/threads/components/Thread";
// import { Thread } from "@/types";
//
// interface HomeFeedProps {
//     sampleThreads: Thread[];
// }
//
// const HomeFeed: React.FC<HomeFeedProps> = ({ sampleThreads }) => {
//     return (
//         <div
//             className="
//                 md:mt-2
//                 md:max-w-2xl
//                 md:mx-auto
//                 md:rounded-t-3xl
//                 bg-[#101010]
//                 md:border md:border-[#383939]
//                 md:h-[calc(100vh-80px)]  /* cao cố định */
//                 md:sticky md:top-[70px]  /* đứng yên theo viewport khi cha scroll */
//               "
//         >
//
//         <div className="w-full rounded-t-3xl">
//                 {sampleThreads.map((thread: Thread, index: number) => (
//                     <div key={thread.id} className="w-full">
//                         <ThreadComponent
//                             thread={thread}
//                             className={
//                                 index === 0
//                                     ? "transition-colors px-3 py-4 md:px-6 bg-[#101010]"
//                                     : "px-3 py-4 md:px-6 bg-[#101010]"
//                             }
//                         />
//                         <div className="h-[0.5px] border-b-1 border-[#383939]" />
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };
//
// export default HomeFeed;


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

    // Handle scroll + load more
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = container;

            // Tính chiều cao và vị trí của thumb
            const ratio = clientHeight / scrollHeight;
            const thumbHeight = Math.max(clientHeight * ratio, 30); // min 30px
            const thumbTop = (scrollTop / scrollHeight) * clientHeight;

            setScrollInfo({ height: thumbHeight, top: thumbTop });

            // Load more khi gần cuối
            if (scrollHeight - (scrollTop + clientHeight) < scrollHeight * 0.2) {
                onLoadMore?.();
            }
        };

        handleScroll(); // init
        container.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);
        return () => {
            container.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, [onLoadMore]);

    return (
        <div className="w-full max-w-2xl mx-auto h-full">
            <div className="relative w-full h-full md:sticky md:top-[70px] md:border md:border-[#383939] md:mt-2 md:rounded-t-3xl bg-[#101010] md:h-[calc(100vh-80px)] overflow-hidden">
                {/* Nội dung cuộn */}
                <div ref={scrollContainerRef} className="w-full h-full overflow-y-auto custom-scrollbar">
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

                {/* Scrollbar ảo absolute */}
                <div className="custom-scrollbar-wrapper">
                    <div
                        ref={thumbRef}
                        className="custom-scrollbar-thumb"
                        style={{ height: scrollInfo.height, top: scrollInfo.top, right: '-2px' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default HomeFeed;
