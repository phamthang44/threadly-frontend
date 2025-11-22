'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar } from '@/features/profile/components/Avatar';
import { ThreadHeader } from './ThreadHeader';
import { ThreadContent } from "@/features/thread/components/index";
import ThreadActionBar from "@/features/thread/components/ThreadActionBar";
import { ThreadProps } from '@/features/thread/types';

// Import Icons (Giả sử bạn đã có các component này như các bài trước)
import {
    LikeIcon, LikeIconFilled,
    ReplyIcon, RepostIcon, RepostedIcon, ShareIcon
} from "@/components/ui";

export const Thread: React.FC<ThreadProps> = ({ thread, className, ...props }) => {
    const router = useRouter();

    // --- 1. LOCAL STATE ---
    // Để tạo hiệu ứng phản hồi tức thì (Optimistic UI)
    const [isLiked, setIsLiked] = useState(thread.isLiked || false);
    const [likeCount, setLikeCount] = useState(thread.likes || 0);
    const [isReposted, setIsReposted] = useState(false); // Ví dụ thêm repost

    // --- 2. HANDLERS ---
    const handleLike = useCallback((e: React.MouseEvent) => {
        // Không cần e.stopPropagation() ở đây vì ThreadActionBar đã xử lý rồi,
        // nhưng nếu muốn chắc chắn thì cứ để cũng không sao.

        // Cập nhật UI ngay lập tức
        setIsLiked((prev) => {
            const newState = !prev;
            setLikeCount((c) => newState ? c + 1 : c - 1);
            return newState;
        });

        // Gọi API thực tế (Fire and forget)
        // threadApi.like(thread.id); 
    }, [thread.id]);

    const handleRepost = useCallback(() => {
        setIsReposted((prev) => !prev);
    }, []);

    const navigateToDetail = () => {
        router.push(`/thread/${thread.id}`);
    };

    // --- 3. ACTIONS CONFIG ---
    // Dùng useMemo để tránh tạo lại array mỗi lần render
    const threadActionsData = useMemo(() => [
        {
            key: 'like',
            icon: <LikeIcon />,
            filledIcon: <LikeIconFilled />,
            interactionsNumber: likeCount,
            isActive: isLiked,
            activeColor: "text-[#ff0033]",
            onClick: handleLike
        },
        {
            key: 'reply',
            icon: <ReplyIcon />,
            interactionsNumber: thread.comments, // Reply thường không có state toggle ở đây
            onClick: () => console.log('Open reply modal')
        },
        {
            key: 'repost',
            icon: <RepostIcon />,
            filledIcon: <RepostedIcon />, // Ví dụ repost xanh
            interactionsNumber: thread.reposts,
            isActive: isReposted,
            activeColor: "text-green-500",
            onClick: handleRepost
        },
        {
            key: 'share',
            icon: <ShareIcon />,
            interactionsNumber: '', // Share thường không hiện số
            onClick: () => console.log('Share clicked')
        },
    ], [likeCount, isLiked, thread.comments, thread.reposts, isReposted, handleLike, handleRepost]);

    return (
        <article
            className={`cursor-pointer p-4 border-b border-[#2a2a2a] ${className || ""}`}
            onClick={navigateToDetail} // Bấm vào thread thì vào chi tiết
            {...props}
        >
            <div className="flex gap-3">
                {/* Cột trái: Avatar + Line (nếu cần) */}
                <div className="flex flex-col items-center">
                    <Avatar
                        src={thread.avatar}
                        alt={thread.username}
                        size="md"
                    />
                    {/* Nếu muốn vẽ đường line nối xuống dưới giống Threads ở HomeFeed, thêm logic ở đây */}
                </div>

                {/* Cột phải: Content */}
                <div className="flex-1 min-w-0">
                    <ThreadHeader
                        username={thread.username}
                        timestamp={thread.timestamp}
                        verified={thread.verified}
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
                    <ThreadActionBar actions={threadActionsData} className="mt-1" />
                </div>
            </div>
        </article>
    );
};