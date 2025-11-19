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



    return <ThreadDetailView threadId={threadId} thread={mockThread} comments={mockComments} />;
}

export default ThreadsPage;