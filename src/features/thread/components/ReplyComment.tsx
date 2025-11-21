'use client';
import React from "react";
import {Avatar, FollowIcon, LikeIcon, ReplyIcon, RepostIcon, ShareIcon} from "@/components/ui";
import Link from "next/link";
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

interface ReplyCommentProps {
    comment: Comment;
    hasReplies?: boolean;
    position: number;
    isLastChild?: boolean;
}
const actions = [
    { key: 'like',icon: <LikeIcon />, interactionsNumber: '2.1K' },
    { key: 'reply', icon: <ReplyIcon />, interactionsNumber: '117' },
    { key: 'repost', icon: <RepostIcon />, interactionsNumber: '121' },
    { key: 'share', icon: <ShareIcon />,interactionsNumber: '' },
]
const ReplyComment: React.FC<ReplyCommentProps> = ({comment, hasReplies, position, isLastChild = false}) => {
    const hasChildren = comment.children && comment.children.length > 0;
    const [hoveredActionKey, setHoveredActionKey] = React.useState<string | null>(null);
    return (
        <div className={`relative ${isLastChild ? hasChildren ? 'border-b border-[#383939]' : null : ''}`}>
            <div className="flex flex-col relative">
                <div className="relative box-border z-0 px-4 pt-3">
                    <div className="relative [outline:none]">
                        <div style={{
                            '--x-6wlwus': 'var(--barcelona-columns-item-horizontal-padding);',
                            '--x-115c6n6': 'var(--barcelona-columns-item-horizontal-padding);',
                        } as React.CSSProperties}
                             className="pt-3 border-t-0 pb-3 border-t-[var(--barcelona-primary-outline)] [border-top-style:solid] cursor-pointer relative">
                            <div className="grid [grid-template-columns:var(--barcelona-threadline-column-width)_minmax(0,_1fr)]">
                                <div className="pt-1 [grid-row-end:span_2] [grid-column-start:1] relative [grid-row-start:1]">
                                    <div className="border-b-[var(--always-dark-overlay)] border-t-[var(--always-dark-overlay)] pt-0 min-w-0 mt-0 mb-0 border-t-0 min-h-0 border-b-0 [border-bottom-style:solid] pb-0 [border-top-style:solid] [padding-inline-end:0] [border-start-end-radius:50%] touch-manipulation [flex-basis:auto] [border-inline-end-color:var(--always-dark-overlay)] box-border select-none list-none inline-flex flex-shrink-0 cursor-pointer [border-inline-start-style:solid] outline-none items-stretch flex-row [border-inline-start-color:var(--always-dark-overlay)] [border-end-end-radius:50%] relative [margin-inline-start:0] z-0 [-webkit-tap-highlight-color:transparent] [border-start-start-radius:50%] [border-end-start-radius:50%] [padding-inline-start:0] [border-inline-end-style:solid] [text-align:inherit] [margin-inline-end:0] [border-inline-start-width:0] [border-inline-end-width:0] [text-decoration:none] [outline:none]">
                                        {/* Avatar */}
                                        <div className="w-9 h-9 bg-[rgb(var(--grey-1)] [border-start-start-radius:18px] [border-end-end-radius:18px] [border-start-end-radius:18px] [border-end-start-radius:18px] relative">
                                            <div style={{
                                                '--x-height': '36px',
                                                '--x-width': '36px',
                                            } as React.CSSProperties} className="w-[var(--x-width)] h-[var(--x-height)] pt-0 pb-0 mt-0 mb-0 [padding-inline-end:0] bg-[var(--barcelona-tertiary-background)] select-none flex [margin-inline-start:0] [border-start-start-radius:999px] [padding-inline-start:0] [border-end-start-radius:999px] [border-end-end-radius:999px] [margin-inline-end:0] [border-start-end-radius:999px]">
                                                <Avatar src={comment.author.avatar} className="[outline-width:.5px] [outline-style:solid] [outline-color:var(--barcelona-primary-outline)] [border-start-start-radius:999px] [outline-offset:-.5px] [border-end-end-radius:999px] [border-start-end-radius:999px] [border-end-start-radius:999px]"/>
                                            </div>
                                        </div>
                                        {/* Follow button */}
                                        <div className="bottom-[-1px] border-b-[var(--always-dark-overlay)] border-t-[var(--always-dark-overlay)] pt-0 min-w-0 mt-0 mb-0 border-t-0 min-h-0 border-b-0 [border-bottom-style:solid] pb-0 [border-top-style:solid] [padding-inline-end:0] [border-start-end-radius:inherit] [border-end-start-radius:inherit] bg-transparent touch-manipulation [flex-basis:auto] [border-inline-end-color:var(--always-dark-overlay)] box-border select-none list-none flex-shrink-0 inline-flex cursor-pointer [border-inline-start-style:solid] outline-none items-stretch flex-row [border-inline-start-color:var(--always-dark-overlay)] [margin-inline-start:0] z-0 [-webkit-tap-highlight-color:transparent] [border-start-start-radius:inherit] [inset-inline-end:-2px] [padding-inline-start:0] [border-inline-end-style:solid] [text-align:inherit] [border-end-end-radius:inherit] [border-inline-end-width:0] [text-decoration:none] [outline:none] absolute">
                                            <div className="w-4 h-4">
                                                <div className="w-full h-full flex justify-center [border-start-end-radius:50%] outline-solid text-[var(--barcelona-primary-background)] items-center [outline-color:var(--barcelona-elevated-background)] [border-end-end-radius:50%] [border-end-start-radius:50%] [outline-width:2px] [border-start-start-radius:50%] bg-[var(--barcelona-primary-button)] [transition-duration:.2s] [transition-property:transform] relative">
                                                    <FollowIcon className={"w-3 h-3"} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="[grid-column-start:2] [grid-row-start:1] self-start">
                                    <div className="h-full grid [grid-template-columns:_1fr_max-content]">
                                        <div style={{'--x-columnGap' : '6px'} as React.CSSProperties} className="overflow-hidden max-w-full whitespace-nowrap [text-overflow:ellipsis] leading-[21px] items-center [column-gap:var(--x-columnGap)] flex">
                                            <span className="flex items-center flex-row">
                                                <div>
                                                    <span className="contents">
                                                        <div>
                                                            <Link href={`/${comment.author.name}`} className="pt-0 mt-0 mb-0 border-t-0 border-b-0 [border-bottom-style:solid] pb-0 [padding-inline-end:0] inline [border-inline-start-style:none] text-[var(--barcelona-primary-text)] bg-transparent touch-manipulation box-border list-none cursor-pointer [margin-inline-start:0] [padding-inline-start:0] [-webkit-tap-highlight-color:transparent] [border-inline-end-style:none] [text-align:inherit] [margin-inline-end:0] [border-inline-start-width:0] [border-inline-end-width:0] [text-decoration:none] [outline:none]">
                                                                <span className="overflow-visible min-w-0 max-w-full text-[var(--barcelona-primary-text)] [font-size:var(--system-15-font-size)] text-start [word-wrap:break-word] relative block font-semibold [font-family:var(--font-family-system)] whitespace-pre-line leading-[var(--x-lineHeight)] [word-break:break-word] [--base-line-clamp-line-height:var(--x---base-line-clamp-line-height)] [text-wrap:_nowrap_!important] action-text" style={{
                                                                    '--x---base-line-clamp-line-height': 'calc(1.4 * 1em)',
                                                                    '--x-lineHeight': 'calc(1.4 * 1em)',
                                                                } as React.CSSProperties}>
                                                                    <span className="overflow-hidden max-w-full whitespace-nowrap [text-overflow:ellipsis] block">
                                                                        {comment.author.name}
                                                                    </span>
                                                                </span>
                                                            </Link>
                                                        </div>
                                                    </span>
                                                </div>
                                            </span>
                                            <div className="w-full overflow-hidden h-full [column-gap:6px] flex items-center">
                                                <div className="flex flex-shrink-0 flex-grow-0">
                                                    <span
                                                        className="overflow-visible max-w-full font-normal [font-size:var(--system-15-font-size)] text-start [word-wrap:break-word] relative block [font-family:var(--font-family-system)] whitespace-pre-line leading-[var(--x--lineHeight)] [word-break:break-word] text-[var(--barcelona-secondary-text)] [--base-line-clamp-line-height:var(--x---base-line-clamp-line-height)] action-text"
                                                        style={{
                                                            '--x---base-line-clamp-line-height': 'calc(1.4 * 1em)',
                                                            '--x-lineHeight': 'calc(1.4 * 1em)',
                                                        } as React.CSSProperties}>
                                                        <time className="min-w-6 whitespace-nowrap text-center inline-block"
                                                              dateTime={comment.timestamp}
                                                              title={comment.timestamp}
                                                              data-visualcompletion="ignore-dynamic">
                                                            {comment.timestamp}
                                                        </time>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Vertical connecting line - only show if this is a nested reply (position > 0) */}
                                {position >= 0 && (
                                    <div style={{
                                        '--x-bottom': isLastChild && !hasChildren ? '50%' : '0px',
                                        '--x-top': '60px',
                                        '--x-qjlhbe': 'calc(18px + var(--barcelona-columns-item-horizontal-padding))',
                                        '--x-1oaafo8': 'calc(18px + var(--barcelona-columns-item-horizontal-padding))'
                                    } as React.CSSProperties } className="top-[var(--x-top)] bottom-[var(--x-bottom)] [grid-row-end:span_2] absolute">
                                        <div className="bottom-0 top-[10px] h-[calc(100%-4px)] [inset-inline-start:calc(50%-1px)] absolute">
                                            <div className="w-[2px] pt-0 mt-0 mb-0 h-full pb-0 [padding-inline-end:0] [border-start-start-radius:2px] [border-end-start-radius:2px] [border-end-end-radius:2px] [margin-inline-start:0] [border-start-end-radius:2px] bg-[var(--barcelona-primary-outline)] [padding-inline-start:0] [margin-inline-end:0] absolute [inset-inline-start:18px]"></div>
                                        </div>
                                    </div>
                                )}
                                {/* Content */}
                                <div className="[grid-row-end:span_3] [grid-column-start:2] [grid-row-start:2]">
                                    <div>
                                        <div className="mb-[-2px] mt-[3px] overflow-hidden [word-wrap:anywhere] [font-size:.9375rem] leading-[140%] whitespace-pre-wrap">
                                            <span className="overflow-visible min-w-0 mt-0 mb-0 max-w-full text-[var(--barcelona-primary-text)] font-normal [font-size:var(--system-15-font-size)] [text-wrap:_pretty_!important] text-start [word-wrap:break-word] relative block [font-family:var(--font-family-system)] whitespace-pre-line leading-[var(--x-lineHeight)] [word-break:break-word] [--base-line-clamp-line-height:var(--x---base-line-clamp-line-height)] action-text" style={{
                                                '--x---base-line-clamp-line-height': 'calc(1.4 * 1em)',
                                                '--x-lineHeight': 'calc(1.4 * 1em)',
                                            } as React.CSSProperties}>
                                                {comment.content}
                                            </span>
                                        </div>
                                        <ThreadDetailActions actions={actions} hoveredActionKey={hoveredActionKey} setHoveredActionKey={setHoveredActionKey} />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Render children recursively */}
            {hasChildren && (
                <div className="">
                    {comment.children.map((child, index) => (
                        <ReplyComment
                            key={child.id}
                            comment={child}
                            hasReplies={child.children.length > 0}
                            position={position + 1}
                            isLastChild={index === comment.children.length - 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ReplyComment;
