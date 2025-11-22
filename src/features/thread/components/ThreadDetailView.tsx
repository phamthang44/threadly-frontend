'use client';

import React, { useState } from 'react';
import { PlusIcon, MoreHorizontal } from 'lucide-react';
import { Avatar, LikeIcon, ReplyIcon, RepostIcon, ShareIcon, MoreIconDown } from "@/components/ui"; // Giả sử path này đúng
import TimeAgo from "@/components/TimeAgo";
import { ThreadContent } from "@/features/thread/components/index";
import ReplyComment from '@/features/thread/components/ReplyComment';
import ThreadActionBar from '@/features/thread/components/ThreadActionBar';

// --- TYPES ---
interface Comment {
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
    level: number;
    parentId: string;
    children: Comment[];
}

interface ThreadDetailProps {
    threadId: string; // Nếu cần dùng để fetch
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
    comments: Comment[];
}

// --- CONFIG ---
const ACTIONS_DATA = [
    { key: 'like', icon: <LikeIcon />, interactionsNumber: '2.1K' },
    { key: 'reply', icon: <ReplyIcon />, interactionsNumber: '117' },
    { key: 'repost', icon: <RepostIcon />, interactionsNumber: '121' },
    { key: 'share', icon: <ShareIcon />, interactionsNumber: '' },
];

// --- SUB-COMPONENTS (Để code gọn hơn) ---

const ThreadHeader = ({ author, timestamp }: { author: any, timestamp: string }) => (
    <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
            {/* Avatar & Follow Button */}
            <div className="relative cursor-pointer group">
                <Avatar
                    src={author.avatar}
                    alt={author.name}
                    size="nm"
                    className="w-9 h-9 rounded-full border border-[var(--barcelona-secondary-text)]"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full border-[2px] border-[#181818] flex items-center justify-center">
                    <PlusIcon size={10} className="text-black" strokeWidth={4} />
                </div>
            </div>

            {/* Name & Time */}
            <div className="flex items-center gap-2 text-[15px]">
                <span className="font-semibold hover:underline cursor-pointer text-[var(--barcelona-primary-text)]">
                    {author.name}
                </span>
                <span className="text-[var(--barcelona-secondary-text)] font-normal">
                    <TimeAgo datetime={timestamp} />
                </span>
            </div>
        </div>

        {/* More Options */}
        <button className="p-2 rounded-full hover:bg-[#1d1d1d] text-[var(--barcelona-secondary-text)] transition-colors">
            <MoreHorizontal size={20} />
        </button>
    </div>
);

const SortDropdown = ({ currentSort, onToggle }: { currentSort: string, onToggle: () => void }) => (
    <div className="flex w-full border-t border-[var(--barcelona-primary-outline)] pt-3 mt-2">
        <button
            onClick={onToggle}
            className="flex items-center gap-1 text-[15px] font-semibold text-[var(--barcelona-primary-text)] cursor-pointer hover:opacity-80 transition-opacity"
        >
            <span>{currentSort}</span>
            <MoreIconDown className="w-4 h-4" />
        </button>
    </div>
);

// --- MAIN COMPONENT ---

const ThreadDetailView: React.FC<ThreadDetailProps> = ({ thread, comments }) => {
    const [sortOption, setSortOption] = useState<'Top' | 'Recent'>('Top');

    const handleSortToggle = () => {
        setSortOption(prev => prev === 'Top' ? 'Recent' : 'Top');
    };

    return (
        <div className="w-full bg-[#181818] min-h-screen relative md:border-t-0 border-[#383939]">

            {/* 1. MAIN THREAD SECTION */}
            <div className="px-4 pt-4 pb-2 border-b border-[#2a2a2a]">

                {/* A. Header Info */}
                <ThreadHeader author={thread.author} timestamp={thread.timestamp} />

                {/* B. Content Body */}
                <div className="text-[15px] leading-relaxed text-[var(--barcelona-primary-text)] whitespace-pre-line">
                    <ThreadContent content={thread.content} />
                </div>

                {/* C. Image Attachment */}
                {thread.image && (
                    <div className="mt-3 rounded-xl overflow-hidden border border-[var(--barcelona-primary-outline)]">
                        <img
                            src={thread.image}
                            alt="Thread attachment"
                            className="w-full h-auto object-cover max-h-[500px]"
                        />
                    </div>
                )}

                {/* D. Interaction Actions (Like, Reply...) */}
                {/* Sử dụng component ThreadDetailActions đã refactor ở bài trước */}
                <div className="mt-2">
                    <ThreadActionBar actions={ACTIONS_DATA} className="mt-1 -ml-2" />
                </div>

                {/* E. Sort Filter */}
                <SortDropdown currentSort={sortOption} onToggle={handleSortToggle} />
            </div>

            {/* 2. COMMENTS SECTION */}
            <div className="flex flex-col">
                {comments.map((comment, index) => {
                    const isLastChild = index === comments.length - 1;
                    return (
                        <ReplyComment
                            key={comment.id}
                            comment={comment}
                            hasReplies={comment.children.length > 0}
                            position={index}
                            isLastChild={isLastChild}
                        />
                    );
                })}

                {/* Empty State (Optional) */}
                {comments.length === 0 && (
                    <div className="py-8 text-center text-[var(--barcelona-secondary-text)] text-sm">
                        No replies yet. Be the first to say something.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ThreadDetailView;