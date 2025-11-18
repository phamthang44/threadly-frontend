'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { LoginRequiredModalDesktop } from '@/features/auth/components';
import Layout from '@/components/layout/Layout';
import { Sidebar } from '@/features/navigation/components/Sidebar';
import { Header } from '@/features/header/components/Header';
import { useIsMobile } from '@/hooks/useIsMobile';
import ThreadDetail from '@/features/threads/components/ThreadDetail';

const ThreadDetailPage = () => {
    const isMobile = useIsMobile();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);
    const params = useParams();
    const threadId = params.id as string;

    const { isAuthenticated, user } = useAppSelector((state) => state.auth);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    useEffect(() => {
        if (!isHydrated) return;
        if (!isAuthenticated && !isMobile) {
            setShowLoginModal(true);
        }
    }, [isAuthenticated, isMobile, isHydrated]);

    const mockThread = {
        id: threadId,
        author: {
            id: 'user-1',
            name: 'momoland22_',
            handle: 'momoland22',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=momoland',
        },
        content: 'Giờ t mới hiểu tại sao ba mẹ hay cẩm t đi khuya. Hnay bạn t tốt nghiệp, tuỳ t có hen đi ăn sau lễ những bạn t phải đi với gia đình trước, đao SG để ngày mai về quê nên tuỳ t chỉ dội dưa quả cho bà thời. 11h10 bà về ks, tuỳ t mới chạy qua thị 2 nhó đi chung với t rê đường khác tại nhìn nhầm xe t, t rê đường khác. Tối lúc lạc tuỳ t mới gọi nhau và gặp được nhau r thì 2 nhó mới kê t là có ông kia xin, dĩ theo tuỳ nó cả đoạn, cứ chạy kê bên r nhìn chầm chầm mãi',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
        timestamp: '2d',
        likes: 2100,
        replies: 117,
        reposts: 121,
        isLiked: false,
    };

    const mockComments = [
        {
            id: '1',
            author: {
                id: 'user-2',
                name: 'momoland22_',
                handle: 'momoland22',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=momoland',
            },
            content: 'nên tuỳ nó phải tập độ trợ công bệnh viện có vai người cho dỡ sơ. Ông đó tập độ theo luôn, đầu kê bên và văn nhìn chầm chầm tuỳ nó. Mãi 1 lúc ông vừa bổ đi là t cùng vừa chạy tới, t nghe kê r cùng thời chắc kh có gì đâu.',
            timestamp: '2d',
            likes: 45,
            replies: 3,
            isLiked: false,
        },
    ];

    const currentUser = user
        ? {
            name: user.name,
            id: user.id,
            avatar: user.avatarUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default',
        }
        : {
            name: 'Guest',
            id: '',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=guest',
        };

    // Mobile unauthenticated view
    // if (isHydrated && !isAuthenticated && isMobile) {
    //     return (
    //         <LayoutMobile>
    //             <div className="flex flex-col items-center justify-center min-h-screen bg-[#101010] text-center px-4 py-8">
    //                 <h1 className="text-2xl font-bold text-white mb-4">Login Required</h1>
    //                 <p className="text-gray-400 mb-6">You need to log in to view this thread.</p>
    //                 <button
    //                     onClick={() => router.push('/login')}
    //                     className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-200"
    //                 >
    //                     Go to Login
    //                 </button>
    //             </div>
    //         </LayoutMobile>
    //     );
    // }

    // Desktop layout
    if (isHydrated && !isMobile) {
        return (
            <>
                <div>
                    <Sidebar />
                    <ThreadDetail threadId={threadId} thread={mockThread} comments={mockComments} />
                </div>
                {showLoginModal && !isAuthenticated && (
                    <LoginRequiredModalDesktop isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
                )}
            </>
        );
    }

    // Mobile layout (authenticated)
    // if (isHydrated && isMobile) {
    //     return (
    //         <LayoutMobile>
    //             <ThreadDetail threadId={threadId} thread={mockThread} comments={mockComments} />
    //         </LayoutMobile>
    //     );
    // }

    return <div className="w-full h-screen bg-[#101010]" />;
};

export default ThreadDetailPage;
