'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { Heart, MessageCircle, Repeat2, Send } from 'lucide-react';
import { ThreadActionsProps, ThreadAction } from '@/features/thread/types';
import { Tooltip } from '@/components/ui';


export const ThreadActions: React.FC<ThreadActionsProps> = ({
                                                                likes,
                                                                comments,
                                                                reposts,
                                                                shares
                                                            }) => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(likes);

    const handleLike = useCallback(() => {
        setLiked((prevLiked) => {
            setLikeCount((prevCount) => (prevLiked ? prevCount - 1 : prevCount + 1));
            return !prevLiked;
        });
    }, []);

    const actions = useMemo<ThreadAction[]>(() => [
        {
            key: 'like',
            icon: Heart,
            label: liked ? 'Unlike' : 'Like',
            tooltip: `${likeCount} like${likeCount === 1 ? '' : 's'}`,
            count: likeCount,
            onClick: handleLike,
            className: liked ? 'text-red-500 fill-red-500' : 'hover:text-red-500'
        },
        {
            key: 'comment',
            icon: MessageCircle,
            label: 'Comment',
            tooltip: comments ? `${comments} comment${comments === 1 ? '' : 's'}` : 'Add a comment',
            count: comments,
            className: 'hover:text-blue-500'
        },
        {
            key: 'repost',
            icon: Repeat2,
            label: 'Repost',
            tooltip: reposts ? `${reposts} repost${reposts === 1 ? '' : 's'}` : 'Repost thread',
            count: reposts,
            className: 'hover:text-green-500',
            onClick: () => console.log('repost')
        },
        {
            key: 'share',
            icon: Send,
            label: 'Share',
            tooltip: shares ? `${shares} share${shares === 1 ? '' : 's'}` : 'Share thread',
            count: shares,
            className: 'hover:text-blue-500',
            onClick: () => console.log('share')
        }
    ], [liked, likeCount, comments, reposts, shares, handleLike]);

    return (
        <div className="mt-3 flex items-center gap-4">
            {actions.map(({ key, icon: Icon, label, tooltip, count, onClick, className }) => (
                <Tooltip key={key} content={tooltip} position="bottom" delay={500}>
                    <button
                        type="button"
                        onClick={onClick}
                        aria-label={label}
                        className={`flex items-center gap-2 text-gray-400 transition-colors cursor-pointer ${className ?? ''}`}
                    >
                        <Icon className="h-5 w-5" />
                        {typeof count === 'number' && count > 0 && (
                            <span className="text-sm">{count}</span>
                        )}
                    </button>
                </Tooltip>
            ))}
        </div>
    );
};
