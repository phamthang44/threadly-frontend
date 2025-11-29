'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar } from '@/features/profile/components/Avatar';
import { ThreadHeader } from './ThreadHeader';
import { ThreadContent } from "@/features/thread/components/index";
import { ThreadProps } from '@/features/thread/types';

import HomeThreadActions from "@/features/thread/components/HomeThreadActions";
import {useSelector} from "react-redux";
import {useAppSelector} from "@/store/hooks";
import {ZoomIn} from "lucide-react";
import {LightBox} from "@/components/ui";
import {useLightBox} from "@/features/thread/hooks/useLightBox";
import {LoginRequiredModalDesktop} from "@/features/auth/components";

const IMAGES = [
    {
        id: 1,
        url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
        type: "Dọc (Portrait)",
        desc: "Ảnh mẫu dọc - Cô gái"
    },
    {
        id: 2,
        url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop",
        type: "Ngang (Landscape)",
        desc: "Ảnh mẫu ngang - Thung lũng"
    },
    {
        id: 3,
        url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop",
        type: "Dọc (Portrait)",
        desc: "Ảnh mẫu dọc - Chân dung"
    },
    {
        id: 4,
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop",
        type: "Ngang (Landscape)",
        desc: "Ảnh mẫu ngang - Yosemite"
    },
];


export const Thread: React.FC<ThreadProps> = ({ thread, className, ...props }) => {
    const router = useRouter();
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
    const { lightboxOpen, photoIndex, handleImageLoad, openLightbox, scrollContainerRef, handleMouseDown, handleMouseMove, handleMouseUpOrLeave, setLightboxOpen } = useLightBox();
    const [showLoginModal, setShowLoginModal] = useState(false);


    const navigateToDetail = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;

        // Check if click is on lightbox controls
        if (target.closest('[role="button"][aria-label*="Previous"], [role="button"][aria-label*="Next"], [role="button"][aria-label*="Close"]')) {
            return;
        }

        if (target.closest('.image-attachments')) {
            return;
        }

        const selection = window.getSelection();
        if (selection && selection.toString().length > 0) return;

        if (target.closest('a, button, svg, path, img, [role="button"], span')) {
            return;
        }

        if (!isAuthenticated) {
            setShowLoginModal(true);
            return;
        }

        router.push(`/@${thread.author.handle}/post/${thread.id}`);
    };


    return (
        <article
            className={`p-4 border-b border-[var(--thread-primary-border)] ${className || ""}`}
            {...props}
            onClick={navigateToDetail}
        >
            <div className="flex gap-3">
                {/* Cột trái: Avatar + Line (nếu cần) */}
                <div className="flex flex-col items-center">
                    <Avatar
                        src={thread.author.avatar}
                        alt={thread.author.name}
                        size="md"
                    />
                    {/* Nếu muốn vẽ đường line nối xuống dưới giống Threads ở HomeFeed, thêm logic ở đây */}
                </div>

                {/* Cột phải: Content */}
                <div className="flex-1 min-w-0" >
                    <ThreadHeader
                        username={thread.author.name}
                        timestamp={thread.timestamp}
                        verified={thread.author.verified}
                        thread={thread}
                    />

                    <div className="mb-2">
                        <ThreadContent content={thread.content} />

                        {/* Hashtags */}
                        {/*{thread.hashtags && thread.hashtags.length > 0 && (*/}
                        {/*    <p className="text-[var(--barcelona-secondary-text)] mt-1 text-[15px]">*/}
                        {/*        {thread.hashtags.map((tag, i) => (*/}
                        {/*            <span key={i} className="mr-1 hover:underline text-[var(--thread-hashtag-text)]">#{tag}</span>*/}
                        {/*        ))}*/}
                        {/*    </p>*/}
                        {/*)}*/}
                    </div>

                    {/* Image Attachment */}
                    {thread.image && thread.image.length > 0 && (
                        <div
                            // 1. Logic ẩn hiện Scrollbar:
                            // Nếu chỉ có 1 ảnh: dùng 'overflow-hidden' (tắt scroll tuyệt đối).
                            // Nếu > 1 ảnh: dùng 'overflow-x-auto' (hiện scroll nếu cần).
                            className={`w-full mb-2 h-64 lg:h-80 image-attachments
        ${thread.image.length > 1 ? 'overflow-x-auto overflow-y-hidden' : 'overflow-hidden'}
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
                                className={`flex gap-4 h-full pb-2 ${thread.image.length === 1 ? 'w-full justify-start' : ''}`}
                            >
                                {thread.image.map((img, index) => (
                                    <div
                                        key={img.id}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openLightbox(index).then();
                                        }}
                                        className="relative group cursor-pointer rounded-lg flex-shrink-0 h-full w-auto max-w-full overflow-hidden"
                                    >
                                        <img
                                            src={img.url}
                                            alt="Thread content"
                                            // 3. Xử lý hiển thị ảnh:
                                            // - object-contain: Nếu ảnh quá to/dài, nó sẽ thu nhỏ lại để hiện ĐỦ TẤM ẢNH trong khung (không bị cắt, không bị scroll).
                                            // - Nếu bạn thích ảnh luôn full khung (chấp nhận bị cắt tí xíu) thì đổi thành object-cover.
                                            className="h-full w-auto max-w-full object-contain bg-black/5 transition-transform duration-500 block mx-auto"

                                            onLoad={(e) => handleImageLoad && handleImageLoad(`avatar-${thread.id}`, e)}
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
                    {thread.image && (
                        <LightBox
                            images={thread.image}
                            initialIndex={photoIndex}
                            isOpen={lightboxOpen}
                            onClose={() => setLightboxOpen(false)}
                        />
                    )}
                    {/* Actions Bar (Dùng component xịn xò mới làm) */}
                    <HomeThreadActions thread={thread}
                                       onLoginRequired={() => setShowLoginModal(true)}
                                       isAuthenticated={isAuthenticated} />
                </div>
            </div>

            <LoginRequiredModalDesktop isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
        </article>
    );
};