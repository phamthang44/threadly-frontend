'use client';

import React, {useEffect, useState} from 'react';
import { PlusIcon, MoreHorizontal } from 'lucide-react';
import {Avatar, LightBox, MoreIconDown} from "@/components/ui";
import TimeAgo from "@/components/TimeAgo";
import { ThreadContent } from "@/features/thread/components/index";
import ReplyComment from '@/features/thread/components/ReplyComment';
import ThreadDetailActions from "@/features/thread/components/ThreadDetailActions";
import {Thread} from "@/features/thread/types";
import {User} from "@/features/profile/types";
import {useLightBox} from "@/features/thread/hooks/useLightBox";
import {useAppSelector} from "@/store/hooks";
import {useRouter} from "next/navigation";

interface ThreadDetailProps {
    rootThread: Thread;
}

// --- SUB-COMPONENTS (Để code gọn hơn) ---

const ThreadHeader = ({ author, timestamp }: { author: User, timestamp: string }) => (
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
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full border-[2px] border-[var(--thread-detail-border)] flex items-center justify-center">
                    <PlusIcon size={10} className="text-[var(--thread-detail-primary-icon)]" strokeWidth={4} />
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
        <button className="p-2 rounded-full hover:bg-[var(--thread-detail-btn-bg-hover)] text-[var(--barcelona-secondary-text)] transition-colors">
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

const ThreadDetailView: React.FC<ThreadDetailProps> = ({ rootThread }) => {
    const [sortOption, setSortOption] = useState<'Top' | 'Recent'>('Top');
    const { lightboxOpen, photoIndex, handleImageClick, openLightbox, scrollContainerRef, handleMouseDown, handleMouseMove, handleMouseUpOrLeave, setLightboxOpen } = useLightBox();
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
    const router = useRouter();
    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, router])

    const handleSortToggle = () => {
        setSortOption(prev => prev === 'Top' ? 'Recent' : 'Top');
    };

    const replies = rootThread.children || [];

    return (
        <div className="w-full bg-[var(--thread-detail-bg)] min-h-screen relative md:border-t-0 border-[var(--thread-detail-secondary-border)]">

            {/* 1. MAIN THREAD SECTION */}
            <div className="px-4 pt-4 pb-2 border-b border-[var(--thread-detail-third-border)]">

                {/* A. Header Info */}
                <ThreadHeader author={rootThread.author} timestamp={rootThread.timestamp} />

                {/* B. Content Body */}
                <div className="text-[15px] leading-relaxed text-[var(--barcelona-primary-text)] whitespace-pre-line">
                    <ThreadContent content={rootThread.content} />
                    {rootThread.hashtags && rootThread.hashtags.length > 0 && (
                        <p className="text-[var(--barcelona-secondary-text)] mt-1 text-[15px]">
                            {rootThread.hashtags.map((tag, i) => (
                                <span key={i} className="mr-1 hover:underline text-[#0095f6]">#{tag}</span>
                            ))}
                        </p>
                    )}
                </div>

                {/* C. Image Attachment */}
                {rootThread.image && rootThread.image.length > 0 && (
                    <div
                        // 1. Logic ẩn hiện Scrollbar:
                        // Nếu chỉ có 1 ảnh: dùng 'overflow-hidden' (tắt scroll tuyệt đối).
                        // Nếu > 1 ảnh: dùng 'overflow-x-auto' (hiện scroll nếu cần).
                        className={`w-full mb-2 h-64 lg:h-80 image-attachments
        ${rootThread.image.length > 1 ? 'overflow-x-auto overflow-y-hidden' : 'overflow-hidden'}
        no-scrollbar cursor-grab active:cursor-grabbing select-none`}
                        aria-label="Thread image attachments"
                        ref={scrollContainerRef}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseUpOrLeave}
                        onMouseUp={handleMouseUpOrLeave}
                        onMouseMove={handleMouseMove}
                    >
                        <div
                            // Nếu chỉ có 1 ảnh, dùng w-full và justify-center để căn giữa ảnh cho đẹp
                            className={`flex gap-4 h-full pb-2 ${rootThread.image.length === 1 ? 'w-full justify-start' : ''}`}
                        >
                            {rootThread.image.map((img, index) => (
                                <div
                                    key={img.id}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openLightbox(index).then();
                                    }}
                                    className="relative group cursor-pointer bg-gray-100 rounded-lg flex-shrink-0 h-full w-auto max-w-full overflow-hidden border border-gray-200"
                                >
                                    <img
                                        src={img.url}
                                        alt="Thread content"
                                        // 3. Xử lý hiển thị ảnh:
                                        // - object-contain: Nếu ảnh quá to/dài, nó sẽ thu nhỏ lại để hiện ĐỦ TẤM ẢNH trong khung (không bị cắt, không bị scroll).
                                        // - Nếu bạn thích ảnh luôn full khung (chấp nhận bị cắt tí xíu) thì đổi thành object-cover.
                                        className="h-full w-auto max-w-full object-contain bg-black/5 transition-transform duration-500 block mx-auto"

                                        onLoad={() => handleImageClick(0)}
                                    />

                                    {/* Overlay hiệu ứng */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                                    {/* Badge */}
                                    {img.type && (
                                        <span className="absolute bottom-2 left-2 text-[10px] font-bold bg-black/60 text-white px-1.5 py-0.5 rounded backdrop-blur-md">
                                            {img.type}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* LightBox - Moved outside the loop */}
                {rootThread.image && (
                    <LightBox
                        images={rootThread.image}
                        initialIndex={photoIndex}
                        isOpen={lightboxOpen}
                        onClose={() => setLightboxOpen(false)}
                    />
                )}

                {/* D. Interaction Actions (Like, Reply...) */}
                {/* Sử dụng component ThreadDetailActions đã refactor ở bài trước */}
                <div className="mt-2 px-3">
                    <ThreadDetailActions thread={rootThread} />
                </div>

                {/* E. Sort Filter */}
                <SortDropdown currentSort={sortOption} onToggle={handleSortToggle} />
            </div>

            {/* 2. COMMENTS SECTION */}
            <div className="flex flex-col">
                {replies.map((reply, index) => {
                    const isLastChild = index === replies.length - 1;
                    return (
                        <ReplyComment
                            key={reply.id}
                            data={reply}
                            position={0}
                            isLastChild={isLastChild}
                        />
                    );
                })}

                {/* Empty State (Optional) */}
                {replies.length === 0 && (
                    <div className="py-8 text-center text-[var(--barcelona-secondary-text)] text-sm">
                        No replies yet. Be the first to say something.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ThreadDetailView;