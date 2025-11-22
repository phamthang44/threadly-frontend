import { User } from '@/features/profile/types';

export interface Thread {
    id: string;
    author: User;
    content: string;
    image?: string; // Ảnh đính kèm (nếu có)
    timestamp: string;

    // Stats (Thống kê)
    likes: number;
    replies: number; // Số lượng reply
    reposts: number;

    // User State (Trạng thái của người đang xem)
    isLiked: boolean;
    isReposted: boolean;

    // Hierarchy (Cấu trúc cây)
    parentId: string | null; // null nếu là bài gốc
    children?: Thread[]; // Đệ quy: Một thread chứa danh sách các thread con

    // UI Helper (Optional - dùng để hỗ trợ render)
    level?: number; // 0: Root, 1: Reply, 2: Nested...
    badge?: string; // Ví dụ: "Author", "Pinned"
    hashtags?: string[]; // Danh sách hashtag trong nội dung
}