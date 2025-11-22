'use client';

import React, {useState, useCallback, useMemo} from "react";
import ThreadActionBar from "./ThreadActionBar"; // Component vừa tạo ở trên
import {LikeIcon, LikeIconFilled, ReplyIcon, RepostedIcon, RepostIcon, ShareIcon} from "@/components/ui";
import {useRouter} from "next/navigation";
import {Thread} from "@/features/thread/types"; // Giả sử bạn có icon filled

interface HomeThreadActionsProps {
    thread: Thread
}

const HomeThreadActions: React.FC<HomeThreadActionsProps> = ({ thread }) => {

    // --- 1. LOCAL STATE ---
    // Để tạo hiệu ứng phản hồi tức thì (Optimistic UI)
    const [isLiked, setIsLiked] = useState(thread.isLiked || false);
    const [likeCount, setLikeCount] = useState(thread.likes || 0);
    const [isReposted, setIsReposted] = useState(false); // Ví dụ thêm repost
    const [repostCount, setRepostCount] = useState(thread.reposts || 0);
    const [isShared, setIsShared] = useState(false); // Ví dụ thêm share
    const [shareCount, setShareCount] = useState(0); // Giả sử ban đầu là 0

    const handleShare = useCallback(() => {
        // Ví dụ logic share đơn giản
        setIsShared(true);
        setShareCount(prev => prev + 1);
        // API call here...
    }, []);

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

    // Cấu hình Actions Data để truyền vào UI
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
            interactionsNumber: thread.replies, // Reply thường không có state toggle ở đây
            onClick: () => console.log('Open reply modal')
        },
        {
            key: 'repost',
            icon: <RepostIcon />,
            filledIcon: <RepostedIcon />, // Ví dụ repost xanh
            interactionsNumber: repostCount > 0 ? repostCount : '',
            isActive: isReposted,
            activeColor: "",
            onClick: handleRepost
        },
        {
            key: 'share',
            icon: <ShareIcon />,
            interactionsNumber: shareCount > 0 ? shareCount : '',
            onClick: () => console.log('Share clicked')
        },
    ], [likeCount, isLiked, handleLike, thread.replies, repostCount, isReposted, handleRepost, shareCount]);

    return (
        // Chỉ cần gọi 1 dòng này là có giao diện xịn xò
        <ThreadActionBar actions={threadActionsData} className="mt-3" />
    );
};

export default HomeThreadActions