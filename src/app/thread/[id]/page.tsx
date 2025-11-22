'use client';
import React from 'react';
import ThreadDetailView from "../../../features/thread/components/ThreadDetailView";
import {useParams} from "next/navigation";

const ThreadsPage = () => {
    const params = useParams();
    const threadId = params.id as string;

    const mockThread = {
        id: threadId,
        author: {
            id: 'user-1',
            name: 'momoland22_',
            handle: 'momoland22',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=momoland',
        },
        content: 'Giờ t mới hiểu tại sao ba mẹ hay cấm t đi khuya @thank #mommy. \nHnay bạn t tốt nghiệp, tuỳ t có hen đi ăn sau lễ những bạn t phải đi với gia đình trước, đao SG để ngày mai về quê nên tuỳ t chỉ dội dưa quả cho bà thời. 11h10 bà về ks, tuỳ t mới chạy qua thị 2 nhó đi chung với t rê đường khác tại nhìn nhầm xe t, t rê đường khác. Tối lúc lạc tuỳ t mới gọi nhau và gặp được nhau r thì 2 nhó mới kê t là có ông kia xin, dĩ theo tuỳ nó cả đoạn, cứ chạy kê bên r nhìn chầm chầm mãi',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
        timestamp: "2025-11-19T10:13:21.000Z",
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
            content: 'nên tuỳ nó phải tập độ trợ công bệnh viện có vai người cho dỡ sơ. Ông đó tập độ theo luôn, đầu kê bên và văn nhìn chầm chầm tuỳ nó.',
            timestamp: "2025-11-19T09:10:00.000Z",
            likes: 45,
            replies: 3,
            isLiked: false,
            level: 2, // Direct reply to main thread
            parentId: threadId,
            children: [
                {
                    id: '1-1',
                    author: {
                        id: 'user-5',
                        name: 'reply_user',
                        handle: 'replyuser',
                        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=reply1',
                    },
                    content: 'This is a reply to comment 1',
                    timestamp: "2025-11-20T09:10:00.000Z",
                    likes: 12,
                    replies: 1,
                    isLiked: false,
                    level: 3, // Reply to a comment
                    parentId: '1',
                    children: [
                        {
                            id: '1-1-1',
                            author: {
                                id: 'user-6',
                                name: 'nested_user',
                                handle: 'nesteduser',
                                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nested1',
                            },
                            content: 'Maximum level nested reply',
                            timestamp: "2025-11-20T10:10:00.000Z",
                            likes: 5,
                            replies: 0,
                            isLiked: false,
                            level: 3, // Maximum level
                            parentId: '1-1',
                            children: [], // No more nesting allowed
                        },
                        {
                            id: '1-1-2',
                            author: {
                                id: 'user-6',
                                name: 'nested_user',
                                handle: 'nesteduser',
                                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nested1',
                            },
                            content: 'Maximum level nested reply',
                            timestamp: "2025-11-14T11:30:00.000Z",
                            likes: 5,
                            replies: 0,
                            isLiked: false,
                            level: 3, // Maximum level
                            parentId: '1-1-1',
                            children: [], // No more nesting allowed
                        }
                    ],
                }
            ],
        },
        {
            id: '2',
            author: {
                id: 'user-3',
                name: 'different_user',
                handle: 'aaaa',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=momoland',
            },
            content: 'abc 123 @gmail.com',
            timestamp: '21/11/2025 6:30 PM', //logic nếu vuot qua 7 ngay thi hien thi ngay thang nam
            likes: 45,
            replies: 0,
            isLiked: false,
            level: 2,
            parentId: threadId,
            children: [],
        },
    ];


    return <ThreadDetailView threadId={threadId} thread={mockThread} comments={mockComments} />;
}

export default ThreadsPage;