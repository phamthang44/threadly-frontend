'use client';

import React, {useState, useCallback, useMemo} from "react";
import ThreadActionBar from "./ThreadActionBar";
import {LikeIcon, LikeIconFilled, ReplyIcon, RepostedIcon, RepostIcon, ShareIcon} from "@/components/ui";
import {useRouter} from "next/navigation";
import {Thread} from "@/features/thread/types";
import {useSelector} from "react-redux";
import {useAppSelector} from "@/store/hooks";

interface HomeThreadActionsProps {
    thread: Thread,
    onLoginRequired?: () => void;
    isAuthenticated?: boolean;
}

const HomeThreadActions: React.FC<HomeThreadActionsProps> = ({ thread, onLoginRequired, isAuthenticated }) => {

    const [isLiked, setIsLiked] = useState(thread.isLiked || false);
    const [likeCount, setLikeCount] = useState(thread.likes || 0);
    const [isReposted, setIsReposted] = useState(false);
    const [repostCount, setRepostCount] = useState(thread.reposts || 0);
    const [isShared, setIsShared] = useState(false);
    const [shareCount, setShareCount] = useState(0);

    const handleAuthCheck = useCallback((callback: () => void) => {
        if (!isAuthenticated) {
            onLoginRequired?.();
            return;
        }
        callback();
    }, [isAuthenticated, onLoginRequired]);

    const handleLike = useCallback(() => {
        handleAuthCheck(() => {
            setIsLiked(prev => !prev);
            setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
        });
    }, [isLiked, handleAuthCheck]);

    const handleRepost = useCallback(() => {
        handleAuthCheck(() => {
            setIsReposted(prev => !prev);
            setRepostCount(prev => isReposted ? prev - 1 : prev + 1);
        });
    }, [isReposted, handleAuthCheck]);

    const handleShare = useCallback(() => {
        handleAuthCheck(() => {
            setIsShared(true);
            setShareCount(prev => prev + 1);
        });
    }, [handleAuthCheck]);

    const handleReply = useCallback(() => {
        handleAuthCheck(() => {
            console.log('Open reply modal');
        });
    }, [handleAuthCheck]);

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
            interactionsNumber: thread.replies,
            onClick: handleReply
        },
        {
            key: 'repost',
            icon: <RepostIcon />,
            filledIcon: <RepostedIcon />,
            interactionsNumber: repostCount > 0 ? repostCount : '',
            isActive: isReposted,
            activeColor: "",
            onClick: handleRepost
        },
        {
            key: 'share',
            icon: <ShareIcon />,
            interactionsNumber: shareCount > 0 ? shareCount : '',
            onClick: handleShare
        },
    ], [likeCount, isLiked, handleLike, thread.replies, handleReply, repostCount, isReposted, handleRepost, shareCount, handleShare]);

    return (
        <ThreadActionBar actions={threadActionsData} className="mt-3" />
    );
};

export default HomeThreadActions
