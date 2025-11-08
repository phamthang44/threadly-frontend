import React from 'react';
import Avatar from '@/components/ui/Avatar';
import { ThreadHeader } from './ThreadHeader';
import { ThreadActions } from './ThreadActions';
import { ThreadProps } from '@/types';

export const ThreadCard: React.FC<ThreadProps> = ({ thread }) => {
    return (
        <div className="border border-gray-200 p-4 cursor-pointer">
            <div className="flex gap-3">
                <Avatar src={thread.avatar} alt={thread.username} />
                <div className="flex-1">
                    <ThreadHeader
                        username={thread.username}
                        timestamp={thread.timestamp}
                        verified={thread.verified}
                    />
                    <div className="mt-2">
                        <p className="text-gray-900">{thread.content}</p>
                        {thread.hashtags && thread.hashtags.length > 0 && (
                            <div className="mt-2 flex gap-2">
                                {thread.hashtags.map((tag, index) => (
                                    <span key={index} className="text-blue-500">#{tag}</span>
                                ))}
                            </div>
                        )}
                        {thread.image && (
                            <img src={thread.image} alt="Thread content" className="mt-3 rounded-lg max-w-full" />
                        )}
                    </div>
                    <ThreadActions
                        likes={thread.likes}
                        comments={thread.comments}
                        reposts={thread.reposts}
                        shares={thread.shares}
                    />
                </div>
            </div>
        </div>
    );
};
