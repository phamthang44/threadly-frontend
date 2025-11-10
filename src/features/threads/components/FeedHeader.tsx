// src/features/threads/components/FeedHeader.tsx
'use client';
import React from "react";

const FeedHeader: React.FC = () => {
    return (
        <div className="hidden md:block sticky top-0 z-10 bg-black/80 backdrop-blur-sm border-b px-4 py-3 ">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Home</h2>
                {/* Optional: Add icons or controls here */}
            </div>
        </div>

    );
};

export default FeedHeader;
