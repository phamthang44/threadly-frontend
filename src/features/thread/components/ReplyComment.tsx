'use client';

import React from "react";
import Link from "next/link";
import { Avatar, FollowIcon, LikeIcon, ReplyIcon, RepostIcon, ShareIcon } from "@/components/ui";
import TimeAgo from "@/components/TimeAgo";
import ThreadDetailActions from "@/features/thread/components/ThreadDetailActions";
import { useRouter } from "next/navigation";

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

interface ReplyCommentProps {
    comment: Comment;
    position: number;
    isLastChild?: boolean;
    hasReplies?: boolean;
}

const ReplyComment: React.FC<ReplyCommentProps> = ({
                                                       comment,
                                                       position,
                                                       isLastChild = false
                                                   }) => {
    const router = useRouter();
    const hasChildren = comment.children && comment.children.length > 0;

    // --- LOGIC 1: SINGLE LINEAR CHAIN (QUAN TRỌNG) ---
    // Logic: Chỉ hiển thị comment con NGAY LẬP TỨC nếu:
    // 1. Có con (hasChildren)
    // 2. Số lượng con ĐÚNG BẰNG 1 (comment.children.length === 1). Nếu có 2 người reply, ẩn đi.
    // 3. position < 1: Chỉ áp dụng cho cấp Reply đầu tiên (Cha -> Con). Cấp cháu chắt (Level sâu hơn) sẽ ẩn để tránh dài dòng.
    const isSingleReplyChain = hasChildren && comment.children.length === 1 && position < 1;

    // --- LOGIC 2: BORDER ---
    // Chỉ kẻ vạch phân cách giữa các cụm Level 2 (Reply trực tiếp Thread).
    const isRootReply = comment.level === 2;
    const showSeparator = isRootReply && !isLastChild;

    // --- LOGIC 3: ACTIONS DATA ĐỘNG ---
    // Cần hiển thị số liệu thật, nhất là khi replies bị ẩn
    const dynamicActions = [
        { key: 'like', icon: <LikeIcon />, interactionsNumber: comment.likes > 0 ? comment.likes.toString() : '' },
        // Nếu replies > 0 thì hiện số, để user biết đường bấm vào xem (khi bị ẩn)
        { key: 'reply', icon: <ReplyIcon />, interactionsNumber: comment.replies > 0 ? comment.replies.toString() : '' },
        { key: 'repost', icon: <RepostIcon />, interactionsNumber: '121' }, // Mock
        { key: 'share', icon: <ShareIcon />, interactionsNumber: '' },
    ];

    const handleDrillDown = (e: React.MouseEvent) => {
        // Ngăn chặn nếu user bấm vào link/button con bên trong
        if ((e.target as HTMLElement).closest('a, button')) return;
        router.push(`/thread/${comment.id}`);
    };

    return (
        <div
            className={`relative w-full flex flex-col cursor-pointer ${showSeparator ? 'border-b border-[#383939]' : ''}`}
            onClick={handleDrillDown}
        >

            {/* --- MAIN CONTENT (GRID LAYOUT) --- */}
            <div className="grid grid-cols-[48px_1fr] px-4 pt-3 pb-2">

                {/* --- COL 1: AVATAR & THREAD LINE --- */}
                <div className="flex flex-col items-center h-full relative">
                    {/* Avatar Wrapper */}
                    <div className="relative z-10">
                        <Link href={`/${comment.author.handle}`} className="block cursor-pointer">
                            <Avatar
                                src={comment.author.avatar}
                                className="w-9 h-9 rounded-full border border-[var(--barcelona-primary-outline)]"
                            />
                        </Link>

                        {/* Follow Button */}
                        <div className="absolute -bottom-1 -right-1 rounded-full bg-[#181818] p-[2px]">
                            <div className="w-4 h-4 rounded-full bg-[var(--barcelona-primary-button)] flex items-center justify-center text-black">
                                <FollowIcon className="w-3 h-3" />
                            </div>
                        </div>
                    </div>

                    {/* Thread Line (Đường nối) */}
                    {/* CHỈ HIỆN KHI LÀ SINGLE CHAIN (Khi con được render ra thì mới cần dây nối) */}
                    {isSingleReplyChain && (
                        <div className="w-[2px] bg-[var(--barcelona-primary-outline)] flex-grow mt-4 mb-0 min-h-[10px]" />
                    )}
                </div>

                {/* --- COL 2: CONTENT --- */}
                <div className="min-w-0 flex flex-col gap-1 ml-2">

                    {/* Header: Name & Time */}
                    <div className="flex items-center gap-2 text-[15px] leading-5">
                        <Link href={`/${comment.author.handle}`} className="font-semibold hover:underline text-[var(--barcelona-primary-text)] truncate">
                            {comment.author.name}
                        </Link>
                        <span className="text-[var(--barcelona-secondary-text)] font-normal text-sm whitespace-nowrap">
                            <TimeAgo datetime={comment.timestamp} />
                        </span>
                    </div>

                    {/* Body Content */}
                    <div className="text-[15px] leading-relaxed text-[var(--barcelona-primary-text)] whitespace-pre-wrap break-words font-normal">
                        {comment.content}
                    </div>

                    {/* Actions */}
                    {/* Sử dụng dynamicActions để hiện số reply */}
                    <div className="-ml-2 mt-1">
                        <ThreadDetailActions actions={dynamicActions} />
                    </div>
                </div>
            </div>

            {/* --- RECURSIVE CHILDREN --- */}
            {/* Thay thế điều kiện cũ bằng isSingleReplyChain */}
            {isSingleReplyChain && (
                <div className="w-full">
                    {comment.children.map((child, index) => (
                        <ReplyComment
                            key={child.id}
                            comment={child}
                            position={position + 1}
                            // Logic cũ của bạn: child level 3 -> không tạo border -> Đúng logic
                            isLastChild={index === comment.children.length - 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReplyComment;