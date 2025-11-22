'use client';

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, FollowIcon } from "@/components/ui";
import TimeAgo from "@/components/TimeAgo";
import ThreadDetailActions from "@/features/thread/components/ThreadDetailActions";
import { Thread } from "@/features/thread/types";

interface ReplyCommentProps {
    data: Thread; // Nhận data chuẩn
    position: number;
    isLastChild?: boolean;
}

const ReplyComment: React.FC<ReplyCommentProps> = ({
                                                       data: thread, // Alias 'data' thành 'thread' để dùng cho thuận tiện
                                                       position,
                                                       isLastChild = false
                                                   }) => {
    const router = useRouter();

    const replies = thread.children || [];
    const hasChildren = replies.length > 0;

    // Logic Single Chain
    const isSingleReplyChain = hasChildren && replies.length === 1 && position < 1;

    // Logic Border
    const isRootReply = thread.level === 2 || thread.level === 1;
    const showSeparator = isRootReply && !isLastChild;

    const handleDrillDown = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('a, button, svg, img')) return;
        router.push(`/thread/${thread.id}`);
    };

    return (
        <div
            className={`relative w-full flex flex-col cursor-pointer hover:bg-[#1e1e1e]/40 transition-colors ${showSeparator ? 'border-b border-[#383939]' : ''}`}
            onClick={handleDrillDown}
        >
            <div className="grid grid-cols-[48px_1fr] px-4 pt-3 pb-2">

                {/* COL 1: Avatar (Giữ nguyên) */}
                <div className="flex flex-col items-center h-full relative">
                    <div className="relative z-10">
                        <Link href={`/${thread.author.handle}`} className="block cursor-pointer">
                            <Avatar
                                src={thread.author.avatar}
                                className="w-9 h-9 rounded-full border border-[var(--barcelona-primary-outline)] bg-gray-800"
                            />
                        </Link>
                        <div className="absolute -bottom-1 -right-1 rounded-full bg-[#181818] p-[2px]">
                            <div className="w-4 h-4 rounded-full bg-[var(--barcelona-primary-button)] flex items-center justify-center text-black">
                                <FollowIcon className="w-3 h-3" />
                            </div>
                        </div>
                    </div>
                    {isSingleReplyChain && (
                        <div className="w-[2px] bg-[#383939] flex-grow mt-2 mb-0 min-h-[10px]" />
                    )}
                </div>

                {/* COL 2: Content */}
                <div className="min-w-0 flex flex-col gap-1 ml-2">
                    {/* Header (Giữ nguyên) */}
                    <div className="flex items-center gap-2 text-[15px] leading-5">
                        <Link href={`/${thread.author.handle}`} className="font-semibold hover:underline text-[var(--barcelona-primary-text)] truncate">
                            {thread.author.name}
                        </Link>
                        <span className="text-[var(--barcelona-secondary-text)] font-normal text-sm whitespace-nowrap">
                            <TimeAgo datetime={thread.timestamp} />
                        </span>
                    </div>

                    {/* Body (Giữ nguyên) */}
                    <div className="text-[15px] leading-relaxed text-[var(--barcelona-primary-text)] whitespace-pre-wrap break-words font-normal">
                        {thread.content}
                    </div>

                    {thread.image && (
                        <div className="mt-2 mb-1 rounded-xl overflow-hidden border border-[#383838] w-fit max-w-full">
                            <img src={thread.image} alt="content" className="max-h-[300px] w-auto object-cover" />
                        </div>
                    )}

                    {/* Actions Bar */}
                    <div className="mt-1">
                        {/* --- SỬA TẠI ĐÂY --- */}
                        {/* Truyền thẳng object thread (đúng Type) vào, không cần tạo biến actionData nữa */}
                        <ThreadDetailActions thread={thread} />
                    </div>
                </div>
            </div>

            {/* Children (Giữ nguyên) */}
            {isSingleReplyChain && (
                <div className="w-full">
                    {replies.map((child, index) => (
                        <ReplyComment
                            key={child.id}
                            data={child}
                            position={position + 1}
                            isLastChild={index === replies.length - 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReplyComment;