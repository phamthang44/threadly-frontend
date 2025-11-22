'use client';

import React, { useState, useCallback } from "react";
import ThreadActionBar from "./ThreadActionBar"; // Component vừa tạo ở trên
import { LikeIcon, LikeIconFilled, ReplyIcon, RepostIcon, ShareIcon } from "@/components/ui"; // Giả sử bạn có icon filled

interface HomeThreadActionsProps {
    likes: number;
    comments: number;
    reposts: number;
    isLikedInitially?: boolean;
}

const HomeThreadActions: React.FC<HomeThreadActionsProps> = ({
                                                                        likes,
                                                                        comments,
                                                                        reposts,
                                                                        isLikedInitially = false
                                                                    }) => {
    // Logic State (Giống component cũ của bạn)
    const [isLiked, setIsLiked] = useState(isLikedInitially);
    const [likeCount, setLikeCount] = useState(likes);
    const [isReposted, setIsReposted] = useState(false); // Thêm ví dụ repost

    const handleLike = useCallback(() => {
        setIsLiked((prev) => {
            const newState = !prev;
            setLikeCount(c => newState ? c + 1 : c - 1);
            return newState;
        });
        // Gọi API like ở đây...
    }, []);

    const handleRepost = useCallback(() => {
        setIsReposted(prev => !prev);
    }, []);

    // Cấu hình Actions Data để truyền vào UI
    const actionsData = [
        {
            key: 'like',
            icon: <LikeIcon />,
            filledIcon: <LikeIconFilled className="text-[#ff0033]" />, // Icon tim đỏ
            interactionsNumber: likeCount,
            isActive: isLiked,
            activeColor: "text-[#ff0033]", // Màu chữ số cũng đỏ theo
            onClick: handleLike
        },
        {
            key: 'reply',
            icon: <ReplyIcon />,
            interactionsNumber: comments,
            // Reply thường không có trạng thái active toggle
            onClick: () => console.log("Open reply modal")
        },
        {
            key: 'repost',
            icon: <RepostIcon />,
            // Ví dụ Repost đổi màu xanh lá hoặc đậm
            filledIcon: <RepostIcon className="text-green-500 font-bold" />,
            interactionsNumber: reposts,
            isActive: isReposted,
            activeColor: "text-green-500",
            onClick: handleRepost
        },
        {
            key: 'share',
            icon: <ShareIcon />,
            interactionsNumber: '',
            onClick: () => console.log("Share")
        },
    ];

    return (
        // Chỉ cần gọi 1 dòng này là có giao diện xịn xò
        <ThreadActionBar actions={actionsData} className="mt-3" />
    );
};

export default HomeThreadActions