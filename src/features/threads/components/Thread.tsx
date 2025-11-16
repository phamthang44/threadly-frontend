import React from 'react';
import { Avatar } from '@/features/profile/components/Avatar';
import { ThreadHeader } from './ThreadHeader';
import { ThreadActions } from './ThreadActions';
import { ThreadProps } from '@/types';

export const Thread: React.FC<ThreadProps> = ({ thread, className, ...props }) => {
    return (
        <article className={className ? className : ""} {...props}>
            <div className="flex gap-3">
                <Avatar
                    src={thread.avatar}
                    alt={thread.username}
                    size="md"
                    verified={thread.verified}
                />

                <div className="flex-1 min-w-0">
                    <ThreadHeader
                        username={thread.username}
                        timestamp={thread.timestamp}
                        verified={thread.verified}
                    />

                    {thread.badge && (
                        <div className="inline-flex items-center gap-1 mb-2">
                            <span className="text-red-500">🚨</span>
                            <span className="text-red-500 font-bold text-sm">{thread.badge}</span>
                            <span className="text-red-500">🚨</span>
                        </div>
                    )}

                    <div className="text-white mb-3">
                        <p className="mb-2">{thread.content}</p>
                        {thread.hashtags && (
                            <p className="text-blue-400 line-clamp-2">
                                {thread.hashtags.map((tag, i) => (
                                    <span key={i} className="mr-1">#{tag}</span>
                                ))}
                            </p>
                        )}
                    </div>

                    {thread.image && (
                        <div className="rounded-2xl overflow-hidden mb-3">
                            <img
                                src={thread.image}
                                alt="Thread content"
                                className="w-full object-cover"
                            />
                        </div>
                    )}

                    <ThreadActions
                        likes={thread.likes}
                        comments={thread.comments}
                        reposts={thread.reposts}
                        shares={thread.shares}
                    />
                </div>
            </div>
        </article>
    );
};