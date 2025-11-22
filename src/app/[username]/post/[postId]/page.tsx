import React from 'react';
import { notFound } from "next/navigation";
import ThreadDetailView from "@/features/thread/components/ThreadDetailView";

import { sampleThreads } from "@/utils/mockData";

interface PageProps {
    params: Promise<{
        username: string;
        postId: string;
    }>;
}


const ThreadsPage = async ({ params }: PageProps) => {
    // 2. Lấy dữ liệu từ params
    const resolvedParams = await params;
    const { username, postId } = resolvedParams;
    const decodedUsername = decodeURIComponent(username).replace('@', ''); // Bỏ @ nếu cần

    // 3. GIẢ LẬP FETCH DATA TỪ DB
    // Tìm thread có id trùng với postId trên URL
    const foundThread = sampleThreads.find(t => t.id === postId);
    // 4. Xử lý trường hợp không tìm thấy (404)
    if (!foundThread) {
        return notFound(); // Next.js sẽ tự render trang not-found.tsx
    }

    // 5. (Optional) Validate Username
    // Kiểm tra xem bài viết này có đúng là của user trên URL không
    // Nếu không đúng, có thể redirect hoặc 404 tùy logic
    if (foundThread.author.handle !== decodedUsername) {
        console.warn(`URL username (${decodedUsername}) does not match thread author (${foundThread.author.handle})`);
        // return notFound(); // Uncomment nếu muốn chặt chẽ
    }

    // 6. Truyền dữ liệu tìm được vào View
    return <ThreadDetailView rootThread={foundThread} />;
}

export default ThreadsPage;