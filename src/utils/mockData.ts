// mockData.ts
import { Thread } from "@/features/thread/types";


// 1. Helper tạo Avatar ngẫu nhiên cho đẹp
const getAvatar = (seed: string) => `https://i.pravatar.cc/150?u=${seed}`;

// 2. Refactor List
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
        image: 'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?w=800&q=80', // Ảnh xe JDM minh hoạ
        timestamp: '2025-11-20T10:00:00Z',
        hashtags: ['controlracing', 'honda', 'civic', 'jdm', 'ce28', 'vtec'],

        // Stats
        likes: 225,
        replies: 5,
        reposts: 5,

        // State
        isLiked: true, // Test trạng thái đã like
        isReposted: false,

        // Children (Empty cho root list ở Home)
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
            verified: true, // Test tích xanh
        },
        badge: 'BREAKING', // Test Badge
        content: "Kane Williamson is set to play for Durban's Super Giants in the SA20 2025-26 season. 🏏 What a signing!",
        image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&fit=crop',
        timestamp: '2025-11-21T08:30:00Z',
        hashtags: ['Cricket', 'DSG', 'Williamson', 'Sportskeeda'],

        likes: 342,
        replies: 12,
        reposts: 8,

        isLiked: false,
        isReposted: true, // Test trạng thái đã repost (màu xanh)

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
        // Không có ảnh (Text only thread)
        timestamp: '2025-11-21T16:45:00Z',
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
        timestamp: '2025-11-21T18:00:00Z',
        hashtags: ['sunset', 'photography', 'nature'],

        likes: 8900,
        replies: 120,
        reposts: 450,

        isLiked: true,
        isReposted: false,

        children: []
    },
    {
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
        timestamp: '2025-11-22T09:00:00Z',
        hashtags: ['apple', 'macbook', 'tech'],

        likes: 56,
        replies: 2,
        reposts: 0,

        isLiked: false,
        isReposted: false,

        // MÔ PHỎNG: Thread này có 1 reply duy nhất -> Sẽ hiển thị luôn ở Home Feed (Logic Single Chain)
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
                timestamp: '2025-11-22T09:05:00Z',
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
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=u1',
        verified: true
    },
    content: 'Hài zị bà 🤣',
    timestamp: '2025-11-21T10:00:00Z',
    likes: 3300,
    replies: 50,
    reposts: 12,
    isLiked: true,
    isReposted: false,
    hashtags: ['funny'],
    // Danh sách reply (Comment) giờ cũng là Thread[]
    children: [
        {
            id: 'reply-1',
            parentId: 'root-1',
            level: 1,
            author: {
                id: 'u2',
                name: 'truog.hv',
                handle: 'truog.hv',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=u2'
            },
            content: 'Xin lỗi văng tục.\nDcme đang bị rạn 2c xương sườn...',
            timestamp: '2025-11-21T11:00:00Z',
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
                    author: { id: 'u1', name: 'nguyennnn972', handle: 'nguyennnn972', avatar: '...' },
                    content: 'Đâu có biết đâu. Bác sĩ bảo về nhà ăn được cái gì thì ăn...',
                    image: 'https://link-anh-sieu-am.jpg', // Reply có ảnh
                    timestamp: '2025-11-21T12:00:00Z',
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