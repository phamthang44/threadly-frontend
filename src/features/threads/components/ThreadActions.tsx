'use client';

import React, { useState } from 'react';
import { Heart, MessageCircle, Repeat2, Send } from 'lucide-react';
import { ThreadActionsProps } from '@/types';

export const ThreadActions: React.FC<ThreadActionsProps> = ({
                                                            likes,
                                                            comments,
                                                            reposts,
                                                            shares
                                                        }) => {
    const [liked, setLiked] = useState<boolean>(false);
    const [likeCount, setLikeCount] = useState<number>(likes);

    const handleLike = () => {
        setLiked(!liked);
        setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    };

    return (
        <div className="flex items-center gap-4 mt-3">
            <button
                onClick={handleLike}
                className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors"
                aria-label={liked ? "Unlike" : "Like"}
            >
                <Heart className={`w-5 h-5 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
                <span className="text-sm">{likeCount}</span>
            </button>

            <button
                className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-colors"
                aria-label="Comment"
            >
                <MessageCircle className="w-5 h-5" />
                {comments > 0 && <span className="text-sm">{comments}</span>}
            </button>

            <button
                className="flex items-center gap-2 text-gray-400 hover:text-green-500 transition-colors"
                aria-label="reposts"
            >
                <Repeat2 className="w-5 h-5" />
                {reposts > 0 && <span className="text-sm">{reposts}</span>}
            </button>

            <button
                className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-colors"
                aria-label="Share"
            >
                <Send className="w-5 h-5" />
                {shares > 0 && <span className="text-sm">{shares}</span>}
            </button>
        </div>
    );
};
