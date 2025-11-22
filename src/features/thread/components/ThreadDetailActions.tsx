'use client';

import React, { useState, useCallback, useMemo } from "react";
import ThreadActionBar from "./ThreadActionBar";
import {
    LikeIcon, LikeIconFilled,
    ReplyIcon,
    RepostedIcon, RepostIcon,
    ShareIcon
} from "@/components/ui";
import {Thread} from "@/features/thread/types";

interface ThreadDetailActionsProps {
    thread: Thread
}

const ThreadDetailActions: React.FC<ThreadDetailActionsProps> = ({ thread }) => {
    // --- 1. LOCAL STATE ---
    const [isLiked, setIsLiked] = useState(thread.isLiked);
    const [likeCount, setLikeCount] = useState(thread.likes);

    const [isReposted, setIsReposted] = useState(thread.isReposted || false);
    const [repostCount, setRepostCount] = useState(thread.reposts || 0);

    // --- FIX HANDLER LIKE ---
    const handleLike = useCallback(() => {
        if (isLiked) {
            // Đang like -> Bấm cái nữa là Unlike
            setIsLiked(false);
            setLikeCount(prev => prev - 1);
        } else {
            // Chưa like -> Bấm là Like
            setIsLiked(true);
            setLikeCount(prev => prev + 1);
        }
        // API call here...
    }, [isLiked]); // Thêm isLiked vào dependency

    // --- FIX HANDLER REPOST ---
    const handleRepost = useCallback(() => {
        if (isReposted) {
            setIsReposted(false);
            setRepostCount(prev => prev - 1);
        } else {
            setIsReposted(true);
            setRepostCount(prev => prev + 1);
        }
        // API call here...
    }, [isReposted]); // Thêm isReposted vào dependency

    // --- 3. CONFIGURATION ---
    const actionsData = useMemo(() => [
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
            interactionsNumber: thread.replies,
            onClick: () => console.log('Reply')
        },
        {
            key: 'repost',
            icon: <RepostIcon />,
            filledIcon: <RepostedIcon />, // Icon khác khi active (nếu có)
            // Quan trọng: Dùng state repostCount để hiển thị số động
            interactionsNumber: repostCount > 0 ? repostCount : '',
            isActive: isReposted,
            activeColor: "text-[var(--barcelona-primary-text)]", // Hoặc màu xanh/đen đậm tùy design
            onClick: handleRepost
        },
        {
            key: 'share',
            icon: <ShareIcon />,
            interactionsNumber: '',
            onClick: () => console.log('Share')
        },
    ], [likeCount, isLiked, thread.replies, repostCount, isReposted, handleLike, handleRepost]);

    return (
        <ThreadActionBar
            actions={actionsData}
            // className giữ nguyên css gốc của detail action cũ để khớp vị trí
            className="mt-1.5 -mb-1 -ml-2"
        />
    );
};

export default ThreadDetailActions;