import { Thread } from '@/types/thread';

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
    post: Thread;
}
