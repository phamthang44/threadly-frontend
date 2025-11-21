'use client';

import React from 'react';
import { PlusIcon, MoreHorizontal, Heart, MessageCircle, Repeat2, Share } from 'lucide-react';
import {Avatar, FollowIcon} from "@/components/ui";
import { Thread } from '@/features/thread/components/Thread';
import {ThreadContent} from "@/features/thread/components/index";
import { LikeIcon, LikeIconFilled, ReplyIcon, RepostedIcon, RepostIcon, ShareIcon, MoreIconDown} from "@/components/ui";
import Link from "next/link";
import ReplyComment from '@/features/thread/components/ReplyComment';
import ThreadDetailActions from "@/features/thread/components/ThreadDetailActions";
interface Comment {
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
    level: number;
    parentId: string;
    children: Comment[];
}

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
    comments: Comment[];
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

    const [sortOption, setSortOption] = React.useState<'Top' | 'Recent'>('Top');
    const [hoveredActionKey, setHoveredActionKey] = React.useState<string | null>(null);


    return (
        <div className="w-full md:top-0 md:border-t-0 md:border-[#383939] bg-[#181818] relative
        ">
            {/* Main Thread */}
            <div className="flex flex-col relative flex-grow">
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
                            <ThreadDetailActions actions={actions} hoveredActionKey={hoveredActionKey} setHoveredActionKey={setHoveredActionKey} />
                        </div>
                    </div>
                </div>
                {/* Sort Dropdown */}
                <div className="h-full flex items-end">
                    <div className="flex flex-grow flex-col [border-top-style:solid] pt-4 border-t-[.5px] mt-2 border-t-[var(--barcelona-primary-outline)]">
                        <div className="pb-1 w-full flex flex-row items-baseline flex-grow">
                            <div className="flex-grow">
                                <div aria-expanded="false" aria-haspopup="menu" className="border-b-[var(--always-dark-overlay)] border-t-[var(--always-dark-overlay)] pt-0 min-w-0 mt-0 mb-0 border-t-0 min-h-0 border-b-0 [border-bottom-style:solid] pb-0 [border-top-style:solid] [padding-inline-end:0] [border-start-end-radius:inherit] [border-end-start-radius:inherit] bg-transparent touch-manipulation [flex-basis:auto] [border-inline-end-color:var(--always-dark-overlay)] box-border select-none list-none flex flex-shrink items-center cursor-pointer [border-inline-start-style:solid] outline-none flex-row [border-inline-start-color:var(--always-dark-overlay)] relative [margin-inline-start:0] z-0 [-webkit-tap-highlight-color:transparent] [border-start-start-radius:inherit] [padding-inline-start:0] [border-inline-end-style:solid] [text-align:inherit] [column-gap:4px] [margin-inline-end:0] [border-inline-start-width:0] [border-end-end-radius:inherit] [border-inline-end-width:0] [text-decoration:none] [outline:none]">
                                <span style={
                                    {
                                        '--x---base-line-clamp-line-height': 'calc(1.4 * 1em)',
                                        '--x-lineHeight': 'calc(1.4 * 1em)',
                                    } as React.CSSProperties
                                } className="overflow-y-visible min-w-0 overflow-x-visible max-w-full text-[var(--barcelona-primary-text)] [font-size:var(--system-15-font-size)] text-start [word-wrap:break-word] relative block [font-family:var(--font-family-system)] whitespace-pre-line font-semibold leading-[var(--x-lineHeight)] [word-break:break-word] [--base-line-clamp-line-height:var(--x---base-line-clamp-line-height)] select-none list-none cursor-pointer [-webkit-tap-highlight-color:transparent] action-text">{sortOption}</span>
                                    <MoreIconDown />
                                </div>
                            </div>
                            <div className=""></div>
                        </div>
                    </div>
                </div>
            </div>
                <div className="relative">
                    {/* Comments */}
                    {comments.map((comment, index) => {
                        console.log(index)
                        const isLastChild = index === comments.length - 1;
                        return <ReplyComment key={comment.id} comment={comment} hasReplies={comment.children.length > 0} position={index} isLastChild={isLastChild} />
                    }
                    )}
                </div>
            </div>
        </div>
    );
};

// const CommentItem: React.FC<{ comment: Comment; hasChildren: boolean }> = ({ comment, hasChildren }) => {
//     return (
//         <div className="flex flex-col border-b border-[#383839]">
//             <div className="relative box-border z-0 px-4">
//                 <div className="relative [outline:none]">
//                     {hasChildren && (
//                         <div className="absolute top-0 left-8 h-full w-[2px] bg-[var(--barcelona-primary-outline)]"></div>
//                     )}
//                     <div style={{
//                         '--x-6wlwus': 'var(--barcelona-columns-item-horizontal-padding);',
//                         '--x-115c6n6': 'var(--barcelona-columns-item-horizontal-padding);',
//                     } as React.CSSProperties}
//                          className="pt-3 border-t-0 pb-3 border-t-[var(--barcelona-primary-outline)] [border-top-style:solid] cursor-pointer relative">
//                         <div className="grid [grid-template-columns:var(--barcelona-threadline-column-width)_minmax(0,_1fr)]">
//                             <div className="pt-1 [grid-row-end:span_2] [grid-column-start:1] relative [grid-row-start:1]">
//                                 <div className="border-b-[var(--always-dark-overlay)] border-t-[var(--always-dark-overlay)] pt-0 min-w-0 mt-0 mb-0 border-t-0 min-h-0 border-b-0 [border-bottom-style:solid] pb-0 [border-top-style:solid] [padding-inline-end:0] [border-start-end-radius:50%] touch-manipulation [flex-basis:auto] [border-inline-end-color:var(--always-dark-overlay)] box-border select-none list-none inline-flex flex-shrink-0 cursor-pointer [border-inline-start-style:solid] outline-none items-stretch flex-row [border-inline-start-color:var(--always-dark-overlay)] [border-end-end-radius:50%] relative [margin-inline-start:0] z-0 [-webkit-tap-highlight-color:transparent] [border-start-start-radius:50%] [border-end-start-radius:50%] [padding-inline-start:0] [border-inline-end-style:solid] [text-align:inherit] [margin-inline-end:0] [border-inline-start-width:0] [border-inline-end-width:0] [text-decoration:none] [outline:none]">
//                                     <div className="w-9 h-9 bg-[rgb(var(--grey-1)] [border-start-start-radius:18px] [border-end-end-radius:18px] [border-start-end-radius:18px] [border-end-start-radius:18px] relative">
//                                         <div style={{
//                                             '--x-height': '36px',
//                                             '--x-width': '36px',
//                                         } as React.CSSProperties} className="w-[var(--x-width)] h-[var(--x-height)] pt-0 pb-0 mt-0 mb-0 [padding-inline-end:0] bg-[var(--barcelona-tertiary-background)] select-none flex [margin-inline-start:0] [border-start-start-radius:999px] [padding-inline-start:0] [border-end-start-radius:999px] [border-end-end-radius:999px] [margin-inline-end:0] [border-start-end-radius:999px]">
//                                             <Avatar src={comment.author.avatar} className="[outline-width:.5px] [outline-style:solid] [outline-color:var(--barcelona-primary-outline)] [border-start-start-radius:999px] [outline-offset:-.5px] [border-end-end-radius:999px] [border-start-end-radius:999px] [border-end-start-radius:999px]"/>
//                                         </div>
//                                     </div>
//                                     <div className="bottom-[-1px] border-b-[var(--always-dark-overlay)] border-t-[var(--always-dark-overlay)] pt-0 min-w-0 mt-0 mb-0 border-t-0 min-h-0 border-b-0 [border-bottom-style:solid] pb-0 [border-top-style:solid] [padding-inline-end:0] [border-start-end-radius:inherit] [border-end-start-radius:inherit] bg-transparent touch-manipulation [flex-basis:auto] [border-inline-end-color:var(--always-dark-overlay)] box-border select-none list-none flex-shrink-0 inline-flex cursor-pointer [border-inline-start-style:solid] outline-none items-stretch flex-row [border-inline-start-color:var(--always-dark-overlay)] [margin-inline-start:0] z-0 [-webkit-tap-highlight-color:transparent] [border-start-start-radius:inherit] [inset-inline-end:-2px] [padding-inline-start:0] [border-inline-end-style:solid] [text-align:inherit] [border-end-end-radius:inherit] [border-inline-end-width:0] [text-decoration:none] [outline:none] absolute">
//                                         <div className="w-4 h-4">
//                                             <div className="w-full h-full flex justify-center [border-start-end-radius:50%] outline-solid text-[var(--barcelona-primary-background)] items-center [outline-color:var(--barcelona-elevated-background)] [border-end-end-radius:50%] [border-end-start-radius:50%] [outline-width:2px] [border-start-start-radius:50%] bg-[var(--barcelona-primary-button)] [transition-duration:.2s] [transition-property:transform] relative">
//                                                 <FollowIcon className={"w-3 h-3"} />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="[grid-column-start:2] [grid-row-start:1] self-start">
//                                 <div className="h-full grid [grid-template-columns:_1fr_max-content]">
//                                     <div style={{'--x-columnGap' : '6px'} as React.CSSProperties} className="overflow-hidden max-w-full whitespace-nowrap [text-overflow:ellipsis] leading-[21px] items-center [column-gap:var(--x-columnGap)] flex">
//                                         <span className="flex items-center flex-row">
//                                             <div>
//                                                 <span className="contents">
//                                                     <div>
//                                                         <Link href={`/${comment.author.name}`} className="pt-0 mt-0 mb-0 border-t-0 border-b-0 [border-bottom-style:solid] pb-0 [padding-inline-end:0] inline [border-inline-start-style:none] text-[var(--barcelona-primary-text)] bg-transparent touch-manipulation box-border list-none cursor-pointer [margin-inline-start:0] [padding-inline-start:0] [-webkit-tap-highlight-color:transparent] [border-inline-end-style:none] [text-align:inherit] [margin-inline-end:0] [border-inline-start-width:0] [border-inline-end-width:0] [text-decoration:none] [outline:none]">
//                                                             <span className="overflow-visible min-w-0 max-w-full text-[var(--barcelona-primary-text)] [font-size:var(--system-15-font-size)] text-start [word-wrap:break-word] relative block font-semibold [font-family:var(--font-family-system)] whitespace-pre-line leading-[var(--x-lineHeight)] [word-break:break-word] [--base-line-clamp-line-height:var(--x---base-line-clamp-line-height)] [text-wrap:_nowrap_!important] action-text" style={{
//                                                                 '--x---base-line-clamp-line-height': 'calc(1.4 * 1em)',
//                                                                 '--x-lineHeight': 'calc(1.4 * 1em)',
//                                                             } as React.CSSProperties}>
//                                                                 <span className="overflow-hidden max-w-full whitespace-nowrap [text-overflow:ellipsis] block">
//                                                                     {comment.author.name}
//                                                                 </span>
//                                                             </span>
//                                                         </Link>
//                                                     </div>
//                                                 </span>
//                                             </div>
//                                         </span>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="[grid-row-end:span_3] [grid-column-start:2] [grid-row-start:2]">
//                                 <div>
//                                     <div className="mb-[-2px] mt-[3px] overflow-hidden [word-wrap:anywhere] [font-size:.9375rem] leading-[140%] whitespace-pre-wrap">
//                                         <span className="overflow-visible min-w-0 mt-0 mb-0 max-w-full text-[var(--barcelona-primary-text)] font-normal [font-size:var(--system-15-font-size)] [text-wrap:_pretty_!important] text-start [word-wrap:break-word] relative block [font-family:var(--font-family-system)] whitespace-pre-line leading-[var(--x-lineHeight)] [word-break:break-word] [--base-line-clamp-line-height:var(--x---base-line-clamp-line-height)] action-text" style={{
//                                             '--x---base-line-clamp-line-height': 'calc(1.4 * 1em)',
//                                             '--x-lineHeight': 'calc(1.4 * 1em)',
//                                         } as React.CSSProperties}>
//                                             {comment.content}
//                                         </span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//
//             {/* Render nested children recursively with indentation */}
//             {comment.children && comment.children.length > 0 && (
//                 <div className="ml-8">
//                     {comment.children.map((child) => (
//                         <CommentItem
//                             key={child.id}
//                             comment={child}
//                             hasChildren={child.children.length > 0}
//                         />
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };
// <img
//     src={comment.author.avatar}
//     alt={comment.author.name}
//     className="w-12 h-12 rounded-full"
// />
//
// <div className="flex-1">
//     <div className="flex items-center justify-between">
//         <div className="flex items-center gap-2">
//             <span className="font-bold">{comment.author.name}</span>
//             <span className="text-gray-500">@{comment.author.handle}</span>
//             <span className="text-gray-500">{comment.timestamp}</span>
//         </div>
//         <button className="rounded-full hover:bg-[#1d1d1d] p-2 transition">
//             <MoreHorizontal size={16} className="text-gray-500" />
//         </button>
//     </div>
//
//     <p className="mt-2 text-base text-white">{comment.content}</p>
//
//     <div className="mt-3 flex items-center gap-8 text-gray-500 text-sm">
//         <button className="flex items-center gap-2 hover:text-[#1d9bf0] transition">
//             <Heart size={16} fill={comment.isLiked ? 'currentColor' : 'none'} />
//             {comment.likes}
//         </button>
//         <button className="flex items-center gap-2 hover:text-[#1d9bf0] transition">
//             <MessageCircle size={16} />
//             {comment.replies}
//         </button>
//     </div>
// </div>
export default ThreadDetailView;
