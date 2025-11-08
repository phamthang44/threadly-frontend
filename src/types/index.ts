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

export interface AvatarProps {
    src?: string;
    alt: string;
    size?: 'sm' | 'md' | 'lg';
    verified?: boolean;
}

export interface ThreadActionsProps {
    likes: number;
    comments: number;
    reposts: number;
    shares: number;
}

export interface ThreadHeaderProps {
    username: string;
    timestamp: string;
    verified?: boolean;
}

export interface ThreadProps {
    thread: Thread;
    className?: string;
}

