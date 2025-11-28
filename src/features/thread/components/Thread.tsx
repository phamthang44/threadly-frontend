'use client';

import React, { useState } from 'react';
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
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    const openLightbox = (index: number) => {
        setPhotoIndex(index);
        setLightboxOpen(true);
    };


    const navigateToDetail = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;

        // 1. Nếu user đang bôi đen văn bản -> Không chuyển trang
        const selection = window.getSelection();
        if (selection && selection.toString().length > 0) return;

        // 2. QUAN TRỌNG: Kiểm tra xem user có bấm vào phần tử tương tác nào không
        // .closest(...) sẽ kiểm tra chính phần tử đó VÀ các cha của nó
        // Nếu bấm vào: Link (a), Button, Icon (svg, path), Ảnh (img) -> THÌ DỪNG LẠI
        if (target.closest('a, button, svg, path, img, [role="button"], span')) {
            return;
        }

        // 3. Nếu bấm vào vùng trống (background) -> Mới chuyển trang
        if (!isAuthenticated) {
            router.push('/login');
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

                    {/* Badge (Ví dụ: Breaking news, Pinned...) */}
                    {/*{thread.badge && (*/}
                    {/*    <div className="inline-flex items-center gap-1 mb-1">*/}
                    {/*        /!* Bạn có thể tạo component Badge riêng *!/*/}
                    {/*        <span className="text-red-500 text-xs">🚨</span>*/}
                    {/*        <span className="text-red-500 font-bold text-xs">{thread.badge}</span>*/}
                    {/*    </div>*/}
                    {/*)}*/}

                    <div className="mb-2">
                        <ThreadContent content={thread.content} />

                        {/* Hashtags */}
                        {thread.hashtags && thread.hashtags.length > 0 && (
                            <p className="text-[var(--barcelona-secondary-text)] mt-1 text-[15px]">
                                {thread.hashtags.map((tag, i) => (
                                    <span key={i} className="mr-1 hover:underline text-[var(--thread-hashtag-text)]">#{tag}</span>
                                ))}
                            </p>
                        )}
                    </div>

                    {/* Image Attachment */}
                    {thread.image && thread.image.length > 0 && (
                        <div className="mb-3 w-full">
                            <div
                                className={`
                                    grid gap-0.5 rounded-xl overflow-hidden border border-[var(--thread-border-image)]
                                    ${thread.image.length === 1 ? 'grid-cols-1' : ''}
                                    ${thread.image.length === 2 ? 'grid-cols-2' : ''}
                                    ${thread.image.length >= 3 ? 'grid-cols-3' : ''} 
                                `}
                                // Điều chỉnh chiều cao khung hình dựa trên số lượng ảnh để đẹp nhất
                                style={{
                                    height: thread.image.length === 1 ? 'auto' : '300px' // 300px cho layout nhiều cột để ảnh trông dọc như hình
                                }}
                            >
                                {thread.image && thread.image.map((img, index) => (
                                    <div
                                        key={img.id}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openLightbox(index);
                                        }}
                                        className="relative group cursor-pointer w-full h-full bg-gray-100"
                                    >
                                        <img
                                            src={img.url}
                                            alt="Thread content"
                                            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${thread.image.length === 1 ? 'max-h-[500px] object-center' : ''} `}
                                        />

                                        {/* Overlay hiệu ứng tối đi khi hover */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                                        {/* Badge loại ảnh (nếu cần giữ lại) */}
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
                    <HomeThreadActions thread={thread} />
                </div>
            </div>


        </article>
    );
};