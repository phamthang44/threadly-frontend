export interface Thread {
    id: number;
    username: string;
    avatar?: string;
    timestamp: string;
    verified: boolean;
    badge?: string;
    content: string;
    hashtags?: string[];
    image?: string;
    likes: number;
    comments: number;
    reposts: number;
    shares: number;
}