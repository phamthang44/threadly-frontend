'use client';

import React from 'react';
import { PlusIcon, MoreHorizontal, Heart, MessageCircle, Repeat2, Share } from 'lucide-react';
import {Avatar} from "@/components/ui";
import { Thread } from '@/features/thread/components/Thread';
import {ThreadContent} from "@/features/thread/components/index";
import { LikeIcon, LikeIconFilled, ReplyIcon, RepostedIcon, RepostIcon, ShareIcon} from "@/components/ui";

interface ThreadDetailProps {
    threadId: string;
    thread: {
        id: string;
        author: {
            id: string;
            name: string;
            handle: string;
            avatar: string;
        };
        content: string;
        image?: string;
        timestamp: string;
        likes: number;
        replies: number;
        reposts: number;
        isLiked: boolean;
    };
    comments: Array<{
        id: string;
        author: {
            id: string;
            name: string;
            handle: string;
            avatar: string;
        };
        content: string;
        timestamp: string;
        likes: number;
        replies: number;
        isLiked: boolean;
    }>;
}
// <>
//     <button className="flex items-center gap-2 hover:text-[#1d9bf0] transition">
//         <Heart size={18} fill={thread.isLiked ? 'currentColor' : 'none'}/>
//         <span>{thread.likes}K</span>
//     </button>
//     <button className="flex items-center gap-2 hover:text-[#1d9bf0] transition">
//         <MessageCircle size={18}/>
//         <span>{thread.replies}</span>
//     </button>
//     <button className="flex items-center gap-2 hover:text-[#1d9bf0] transition">
//         <Repeat2 size={18}/>
//         <span>{thread.reposts}</span>
//     </button>
//     <button className="flex items-center gap-2 hover:text-[#1d9bf0] transition">
//         <Share size={18}/>
//         <span>620</span>
//     </button>
// </>
const actions = [
    { key: 'like',icon: <LikeIcon />, interactionsNumber: '2.1K' },
    { key: 'reply', icon: <ReplyIcon />, interactionsNumber: '117' },
    { key: 'repost', icon: <RepostIcon />, interactionsNumber: '121' },
    { key: 'share', icon: <ShareIcon />,interactionsNumber: '' },
]

const ThreadDetailView: React.FC<ThreadDetailProps> = ({ thread, comments }) => {
    return (
        <div className="w-full md:top-0 md:border-t-0 md:border-[#383939] bg-[#181818] relative">
            {/* Main Thread */}
            <div className="border-b border-[#2a2a2a] px-4 py-4 ">
                <div>
                    {/* Content */}
                    <div>
                        <div className="flex items-center gap-3">
                            {/* Avatar */}
                            <button className="cursor-pointer relative">
                                <Avatar
                                    src={thread.author.avatar}
                                    alt={thread.author.name}
                                    size={"nm"}
                                    className="w-5 h-5 rounded-full border border-[var(--barcelona-secondary-text)]"
                                />
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full">
                                    <PlusIcon className="w-full h-full text-black bg-white outline-none border-[.5px] p-0 m-0 rounded-full">
                                        <title>Follow</title>
                                    </PlusIcon>
                                </div>
                            </button>
                            <div className="flex items-center">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-sm hover:underline cursor-pointer">{thread.author.name}</span>
                                    <span className="text-sm text-[var(--barcelona-secondary-text)]">@{thread.author.handle}</span>
                                    <span className="text-[var(--barcelona-secondary-text)]">{thread.timestamp}</span>
                                </div>
                            </div>
                            <button className="rounded-full hover:bg-[#1d1d1d] p-2 transition ml-auto cursor-pointer">
                                <MoreHorizontal size={16} className="text-[var(--barcelona-secondary-text)]" />
                            </button>
                        </div>

                        <div className="pt-[10px]">
                            {/* Thread Text */}
                            <ThreadContent content={thread.content} />

                            {/* Thread Image */}
                            {thread.image && (
                                <div className="mt-3 rounded-2xl overflow-hidden">
                                    <img
                                        src={thread.image}
                                        alt="thread"
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            )}

                            {/* Stats */}
                            <div className="mt-[6px] mb-[-4px] [margin-inline-start:-8px]">
                                <div className="flex">
                                    {actions.map((action, i) => {
                                        return (
                                            <div key={i} className="w-max justify-center flex items-center">
                                                <div className="border-b-[var(--always-dark-overlay)] border-t-[var(--always-dark-overlay)] pt-0 min-w-0 mt-0 mb-0
                                                border-t-0 min-h-0 border-b-0 [border-bottom-style:solid] [border-top-style:solid] [padding-inline-end:0] [border-start-end-radius:inherit]
                                                [border-end-start-radius:inherit] bg-transparent touch-manipulation [flex-basis:auto] [border-inline-end-color:var(--always-dark-overlay)]
                                                box-border select-none list-none flex-shrink-0 cursor-pointer [border-inline-starat-style:solid] outline-none items-stretch flex-row [border-inline-start-color:var(--always-dark-overlay)]
                                                relative z-0 [-webkit-tap-highlight-color:transparent] [border-start-start-radius:inherit] [padding-inline-start:0] [border-inline-end-style:solid] [text-align:inherit]
                                                [margin-inline-end:0] [border-inline-start-width:0] [border-end-end-radius:inherit] [border-inline-end-width:0] [text-decoration:none] [outline:none]
                                            ">
                                                    <div className="h-9 w-auto transition-[.15s] [border-end-end-radius:1000px] [padding-inline-end:12px] justify-center
                                                flex items-center [transform:scale(1)] [border-start-end-radius:1000px] [padding-inline-start:12px] [border-start-start-radius:1000px] relative
                                                [transition-property:transform] [border-end-start-radius:1000px]
                                                ">
                                                        <div></div>
                                                        <div className="flex justify-center items-center [column-gap:4px]">
                                                            {action.icon}
                                                            <span style={{'--x--base-line-clamp-line-heigh' : 'calc(1.4*1em)', '--x-lineHeight' : 'calc(1.4*1em)'} as React.CSSProperties} className="
                                                            overflow-visible min-w-0 max-w-full font-normal text-[var(--barcelona-charcoal-text)] [font-size:var(--system-13-font-size)] text-start
                                                            [word-wrap:break-word] relative block [font-family:var(--system-font-family)] whitespace-pre-line leading-[var(--x-lineHeight)]
                                                            [word-break:break-word] [--base-line-clamp-line-height:var(--x---base-line-clamp-line-height)] select-none
                                                            list-none cursor-pointer [-webkit-tap-highlight-color:transparent] action-text
                                                        ">
                                                            <div className="h-[1.4em] w-[var(--x-width)] whitespace-nowrap [transition:width] [transition-duration:.5s]" style={{'--x-width' : '3.5ch'} as React.CSSProperties}>
                                                                {(action.interactionsNumber && parseInt(action.interactionsNumber) > 0) ? (<span className="top-0 absolute [inset-inline-start:0]">{action.interactionsNumber}</span>) : null}
                                                            </div>
                                                        </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Sort Dropdown */}
            <div className="border-b border-[#2a2a2a] px-4 py-3 flex items-center justify-between">
                <button className="flex items-center gap-2 text-white font-semibold">
                    Top <span className="text-gray-500">▼</span>
                </button>
                <button className="text-[#1d9bf0] text-sm">View activity &gt;</button>
            </div>

            {/* Comments */}
            <div>
                {comments.map((comment) => (
                    <div
                        key={comment.id}
                        className="border-b border-[#2a2a2a] px-4 py-4 hover:bg-[#0a0a0a] transition cursor-pointer"
                    >
                        <div className="flex gap-3">
                            <img
                                src={comment.author.avatar}
                                alt={comment.author.name}
                                className="w-12 h-12 rounded-full"
                            />

                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold">{comment.author.name}</span>
                                        <span className="text-gray-500">@{comment.author.handle}</span>
                                        <span className="text-gray-500">{comment.timestamp}</span>
                                    </div>
                                    <button className="rounded-full hover:bg-[#1d1d1d] p-2 transition">
                                        <MoreHorizontal size={16} className="text-gray-500" />
                                    </button>
                                </div>

                                <p className="mt-2 text-base text-white">{comment.content}</p>

                                <div className="mt-3 flex items-center gap-8 text-gray-500 text-sm">
                                    <button className="flex items-center gap-2 hover:text-[#1d9bf0] transition">
                                        <Heart size={16} fill={comment.isLiked ? 'currentColor' : 'none'} />
                                        {comment.likes}
                                    </button>
                                    <button className="flex items-center gap-2 hover:text-[#1d9bf0] transition">
                                        <MessageCircle size={16} />
                                        {comment.replies}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ThreadDetailView;
