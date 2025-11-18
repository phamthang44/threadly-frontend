'use client';

import React from 'react';
import { ArrowLeft, MoreHorizontal, Heart, MessageCircle, Repeat2, Share } from 'lucide-react';

interface ThreadDetailProps {
    threadId: string;
    thread: {
        id: string;
        author: {
            id: string;
            name: string;
            handle: string;
            avatar: string;
        };
        content: string;
        image?: string;
        timestamp: string;
        likes: number;
        replies: number;
        reposts: number;
        isLiked: boolean;
    };
    comments: Array<{
        id: string;
        author: {
            id: string;
            name: string;
            handle: string;
            avatar: string;
        };
        content: string;
        timestamp: string;
        likes: number;
        replies: number;
        isLiked: boolean;
    }>;
}

const ThreadDetail: React.FC<ThreadDetailProps> = ({ thread, comments }) => {
    return (
        <div className="min-h-screen bg-[#101010] text-white border-l border-r border-[#2a2a2a] max-w-2xl mx-auto">
            {/* Header */}
            <div className="sticky top-0 bg-[#101010] bg-opacity-80 backdrop-blur border-b border-[#2a2a2a] px-4 py-3 flex items-center justify-between z-10">
                <button className="rounded-full hover:bg-[#1d1d1d] p-2 transition">
                    <ArrowLeft size={20} />
                </button>
                <div className="text-center">
                    <h1 className="text-xl font-bold">Thread</h1>
                    <p className="text-sm text-gray-500">259K views</p>
                </div>
                <button className="rounded-full hover:bg-[#1d1d1d] p-2 transition">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            {/* Main Thread */}
            <div className="border-b border-[#2a2a2a] px-4 py-4">
                <div className="flex gap-3">
                    {/* Avatar */}
                    <img
                        src={thread.author.avatar}
                        alt={thread.author.name}
                        className="w-12 h-12 rounded-full"
                    />

                    {/* Content */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="font-bold">{thread.author.name}</span>
                                <span className="text-gray-500">@{thread.author.handle}</span>
                                <span className="text-gray-500">{thread.timestamp}</span>
                            </div>
                            <button className="rounded-full hover:bg-[#1d1d1d] p-2 transition">
                                <MoreHorizontal size={16} className="text-gray-500" />
                            </button>
                        </div>

                        {/* Thread Text */}
                        <p className="mt-3 text-base leading-normal text-white">{thread.content}</p>

                        {/* Thread Image */}
                        {thread.image && (
                            <div className="mt-3 rounded-2xl overflow-hidden">
                                <img
                                    src={thread.image}
                                    alt="thread"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        )}

                        {/* Stats */}
                        <div className="mt-4 flex items-center justify-between text-gray-500 text-sm border-b border-[#2a2a2a] pb-4">
                            <div className="flex gap-4">
                                <button className="flex items-center gap-2 hover:text-[#1d9bf0] transition">
                                    <Heart size={18} fill={thread.isLiked ? 'currentColor' : 'none'} />
                                    <span>{thread.likes}K</span>
                                </button>
                                <button className="flex items-center gap-2 hover:text-[#1d9bf0] transition">
                                    <MessageCircle size={18} />
                                    <span>{thread.replies}</span>
                                </button>
                                <button className="flex items-center gap-2 hover:text-[#1d9bf0] transition">
                                    <Repeat2 size={18} />
                                    <span>{thread.reposts}</span>
                                </button>
                                <button className="flex items-center gap-2 hover:text-[#1d9bf0] transition">
                                    <Share size={18} />
                                    <span>620</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sort Dropdown */}
            <div className="border-b border-[#2a2a2a] px-4 py-3 flex items-center justify-between">
                <button className="flex items-center gap-2 text-white font-semibold">
                    Top <span className="text-gray-500">▼</span>
                </button>
                <button className="text-[#1d9bf0] text-sm">View activity &gt;</button>
            </div>

            {/* Comments */}
            <div>
                {comments.map((comment) => (
                    <div
                        key={comment.id}
                        className="border-b border-[#2a2a2a] px-4 py-4 hover:bg-[#0a0a0a] transition cursor-pointer"
                    >
                        <div className="flex gap-3">
                            <img
                                src={comment.author.avatar}
                                alt={comment.author.name}
                                className="w-12 h-12 rounded-full"
                            />

                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold">{comment.author.name}</span>
                                        <span className="text-gray-500">@{comment.author.handle}</span>
                                        <span className="text-gray-500">{comment.timestamp}</span>
                                    </div>
                                    <button className="rounded-full hover:bg-[#1d1d1d] p-2 transition">
                                        <MoreHorizontal size={16} className="text-gray-500" />
                                    </button>
                                </div>

                                <p className="mt-2 text-base text-white">{comment.content}</p>

                                <div className="mt-3 flex items-center gap-8 text-gray-500 text-sm">
                                    <button className="flex items-center gap-2 hover:text-[#1d9bf0] transition">
                                        <Heart size={16} fill={comment.isLiked ? 'currentColor' : 'none'} />
                                        {comment.likes}
                                    </button>
                                    <button className="flex items-center gap-2 hover:text-[#1d9bf0] transition">
                                        <MessageCircle size={16} />
                                        {comment.replies}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ThreadDetail;
