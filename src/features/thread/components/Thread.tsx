'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Avatar } from '@/features/profile/components/Avatar';
import { ThreadHeader } from './ThreadHeader';
import { ThreadContent } from "@/features/thread/components/index";
import { ThreadProps } from '@/features/thread/types';

import HomeThreadActions from "@/features/thread/components/HomeThreadActions";

export const Thread: React.FC<ThreadProps> = ({ thread, className, ...props }) => {
    const router = useRouter();

    const navigateToDetail = () => {
        router.push(`/@${thread.author.handle}/post/${thread.id}`);
    };

    return (
        <article
            className={`cursor-pointer p-4 border-b border-[#2a2a2a] ${className || ""}`}
            onClick={navigateToDetail}
            {...props}
        >
            <div className="flex gap-3">
                {/* Cột trái: Avatar + Line (nếu cần) */}
                <div className="flex flex-col items-center">
                    <Avatar
                        src={thread.author.avatar}
                        alt={thread.author.name}
                        size="md"
                    />
                    {/* Nếu muốn vẽ đường line nối xuống dưới giống Threads ở HomeFeed, thêm logic ở đây */}
                </div>

                {/* Cột phải: Content */}
                <div className="flex-1 min-w-0">
                    <ThreadHeader
                        username={thread.author.name}
                        timestamp={thread.timestamp}
                        verified={thread.author.verified}
                    />

                    {/* Badge (Ví dụ: Breaking news, Pinned...) */}
                    {thread.badge && (
                        <div className="inline-flex items-center gap-1 mb-1">
                            {/* Bạn có thể tạo component Badge riêng */}
                            <span className="text-red-500 text-xs">🚨</span>
                            <span className="text-red-500 font-bold text-xs">{thread.badge}</span>
                        </div>
                    )}

                    <div className="mb-2">
                        <ThreadContent content={thread.content} />

                        {/* Hashtags */}
                        {thread.hashtags && thread.hashtags.length > 0 && (
                            <p className="text-[var(--barcelona-secondary-text)] mt-1 text-[15px]">
                                {thread.hashtags.map((tag, i) => (
                                    <span key={i} className="mr-1 hover:underline text-[#0095f6]">#{tag}</span>
                                ))}
                            </p>
                        )}
                    </div>

                    {/* Image Attachment */}
                    {thread.image && (
                        <div className="rounded-xl overflow-hidden mb-3 border border-[#383838] w-fit max-w-full">
                            <img
                                src={thread.image}
                                alt="Thread content"
                                className="max-h-[450px] object-cover w-auto h-auto"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // Mở Lightbox xem ảnh to
                                }}
                            />
                        </div>
                    )}

                    {/* Actions Bar (Dùng component xịn xò mới làm) */}
                    <HomeThreadActions thread={thread} />
                </div>
            </div>
        </article>
    );
};