import { Thread } from "@/features/thread/types";

// --- HELPERS ---

// 1. Helper tạo Avatar ngẫu nhiên (Ảnh thật .jpg để tránh lỗi SVG của Next.js)
const getAvatar = (seed: string) => `https://i.pravatar.cc/150?u=${seed}`;

// 2. Helper tạo thời gian quá khứ dựa trên giờ hiện tại (Tránh lỗi thời gian âm)
const getPastTime = (hoursAgo: number) => {
    const date = new Date();
    // Trừ đi số giờ mong muốn
    date.setHours(date.getHours() - hoursAgo);
    return date.toISOString();
};

// --- DATA ---

export const sampleThreads: Thread[] = [
    {
        id: '1',
        parentId: null,
        level: 0,
        author: {
            id: 'u1',
            name: 'Control Racing',
            handle: 'controlracing_th',
            avatar: getAvatar('controlracing'),
            verified: false,
        },
        content: 'CE28 is always a legend. JDM vibes only! 🚗💨',
        image: 'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?w=800&q=80', // Ảnh xe thật
        timestamp: getPastTime(2), // 2 giờ trước
        hashtags: ['controlracing', 'honda', 'civic', 'jdm', 'ce28', 'vtec'],

        likes: 225,
        replies: 5,
        reposts: 5,

        isLiked: true,
        isReposted: false,

        children: []
    },
    {
        id: '2',
        parentId: null,
        level: 0,
        author: {
            id: 'u2',
            name: 'Sportskeeda Cricket',
            handle: 'sportskeedacricket',
            avatar: getAvatar('sportskeeda'),
            verified: true,
        },
        badge: 'BREAKING',
        content: "Kane Williamson is set to play for Durban's Super Giants in the SA20 2025-26 season. 🏏 What a signing!",
        image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&fit=crop',
        timestamp: getPastTime(5), // 5 giờ trước
        hashtags: ['Cricket', 'DSG', 'Williamson', 'Sportskeeda'],

        likes: 342,
        replies: 12,
        reposts: 8,

        isLiked: false,
        isReposted: true,

        children: []
    },
    {
        id: '3',
        parentId: null,
        level: 0,
        author: {
            id: 'u3',
            name: 'Dev Life',
            handle: 'coding_daily',
            avatar: getAvatar('devlife'),
            verified: false,
        },
        content: 'Debugging production on a Friday evening be like... 🥲☕️ #coding #developer',
        timestamp: getPastTime(12),
        hashtags: ['coding', 'developer', 'buglife'],

        likes: 1205,
        replies: 45,
        reposts: 102,

        isLiked: false,
        isReposted: false,

        children: []
    },
    {
        id: '4',
        parentId: null,
        level: 0,
        author: {
            id: 'u4',
            name: 'Photography Soul',
            handle: 'photo_art',
            avatar: getAvatar('photo'),
            verified: true,
        },
        content: 'Caught this beautiful sunset yesterday. Nature is amazing. 🌅',
        image: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=800&q=80',
        timestamp: getPastTime(24), // 1 ngày trước
        hashtags: ['sunset', 'photography', 'nature'],

        likes: 8900,
        replies: 120,
        reposts: 450,

        isLiked: true,
        isReposted: false,

        children: []
    },
    {
        // --- TEST CASE SINGLE CHAIN ---
        // Thread này có đúng 1 con -> Sẽ hiển thị dây nối và comment con ở Home Feed
        id: '5',
        parentId: null,
        level: 0,
        author: {
            id: 'u5',
            name: 'Tech Reviewer',
            handle: 'tech_guru',
            avatar: getAvatar('tech'),
            verified: true,
        },
        content: 'Just got my hands on the new M3 Macbook. The performance is insane! 🚀 Will drop a review soon.',
        timestamp: getPastTime(0.5), // 30 phút trước
        hashtags: ['apple', 'macbook', 'tech'],

        likes: 56,
        replies: 2,
        reposts: 0,

        isLiked: false,
        isReposted: false,

        children: [
            {
                id: 'reply-5-1',
                parentId: '5',
                level: 1,
                author: {
                    id: 'u6',
                    name: 'Apple Fan',
                    handle: 'apple_fanboy',
                    avatar: getAvatar('fan'),
                    verified: false
                },
                content: 'Is it worth upgrading from M1?',
                timestamp: getPastTime(0.3), // 18 phút trước
                likes: 2,
                replies: 0,
                reposts: 0,
                isLiked: false,
                isReposted: false,
                children: []
            }
        ]
    }
];

export const mockThreadDetail: Thread = {
    id: 'root-1',
    parentId: null,
    level: 0,
    author: {
        id: 'u1',
        name: 'nguyennnn972',
        handle: 'nguyennnn972',
        avatar: getAvatar('u1'),
        verified: true
    },
    content: 'Hài zị bà 🤣',
    timestamp: getPastTime(4), // 4 giờ trước
    likes: 3300,
    replies: 50,
    reposts: 12,
    isLiked: true,
    isReposted: false,
    hashtags: ['funny'],

    // Danh sách reply (Comment)
    children: [
        {
            id: 'reply-1',
            parentId: 'root-1',
            level: 1,
            author: {
                id: 'u2',
                name: 'truog.hv',
                handle: 'truog.hv',
                avatar: getAvatar('u2')
            },
            content: 'Xin lỗi văng tục.\nDcme đang bị rạn 2c xương sườn...',
            timestamp: getPastTime(3), // 3 giờ trước (sau bài gốc)
            likes: 118,
            replies: 1,
            reposts: 0,
            isLiked: false,
            isReposted: false,
            children: [
                {
                    id: 'reply-1-1',
                    parentId: 'reply-1',
                    level: 2,
                    author: {
                        id: 'u1',
                        name: 'nguyennnn972',
                        handle: 'nguyennnn972',
                        avatar: getAvatar('u1')
                    },
                    content: 'Đâu có biết đâu. Bác sĩ bảo về nhà ăn được cái gì thì ăn...',
                    // Thay ảnh ảo bằng ảnh thật để test UI hiển thị ảnh trong comment
                    image: 'https://images.unsplash.com/photo-1586775490184-b7913be163a9?w=800&q=80',
                    timestamp: getPastTime(2), // 2 giờ trước
                    likes: 110,
                    replies: 0,
                    reposts: 0,
                    isLiked: false,
                    isReposted: false,
                    children: []
                }
            ]
        }
    ]
};