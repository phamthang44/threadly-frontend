import {Thread} from "./index";
import React from "react";

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
    thread: Thread;
}

export interface ThreadProps {
    thread: Thread;
    className?: string;
}

export type ThreadAction = {
    key: string;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    tooltip: string;
    count?: number;
    onClick?: () => void;
    className?: string;
};