'use client';
import React, { useState, useRef } from 'react';
import {EyeOff, MoreHorizontal} from 'lucide-react';
import {SaveIcon, MuteIcon, ReportIcon, RestrictIcon, ShareThreadIcon, BlockIcon} from '@/components/ui'
import {Thread, ThreadHeaderProps} from '@/features/thread/types';
import {VerifiedBadgeIcon, Tooltip} from "@/components/ui";
import TimeAgo from '@/components/TimeAgo';
import ActionMenu from "@/components/ui/organisms/ActionMenu";
import {useAppSelector} from "@/store/hooks";

export const ThreadHeader: React.FC<ThreadHeaderProps> = ({
                                                              username, thread,
                                                              timestamp,
                                                              verified = false
                                                          }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const handleMoreOptionsClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleClose = () => {
        setIsMenuOpen(false);
    };

    const groups = [
        {
            id: 'actions',
            items: [
                {
                    id: 'save',
                    label: 'Save',
                    icon: <SaveIcon className="text-[var(--barcelona-primary-icon)] w-5 h-5"/>,
                    onClick: () => console.log('Save'),
                    protected: !isAuthenticated,
                },
                {
                    id: 'not-interested',
                    label: 'Not interested',
                    icon: <EyeOff size={20} className="text-[var(--barcelona-primary-icon)]"/>,
                    onClick: () => console.log('Not interested'),
                    protected: !isAuthenticated,
                },
                {
                    id: 'mute',
                    label: 'Mute',
                    icon: <MuteIcon className="text-[var(--barcelona-primary-icon)] w-5 h-5" />,
                    onClick: () => console.log('Mute'),
                    protected: !isAuthenticated,
                },
                {
                    id: 'restrict',
                    label: 'Restrict',
                    icon: <RestrictIcon className="text-[var(--barcelona-primary-icon)] w-5 h-5"/>,
                    onClick: () => console.log('Restrict'),
                    protected: !isAuthenticated,
                },
                {
                    id: 'block',
                    label: 'Block',
                    icon: <BlockIcon className="text-red-500 w-5 h-5"/>,
                    variant: 'danger' as const,
                    onClick: () => console.log('Block'),
                    protected: !isAuthenticated,
                },
                {
                    id: 'report',
                    label: 'Report',
                    icon: <ReportIcon className="text-red-500 w-5 h-5"/>,
                    variant: 'danger' as const,
                    onClick: () => console.log('Report'),
                    protected: !isAuthenticated,
                },
                {
                    id: 'copy-link',
                    label: 'Copy link',
                    icon: <ShareThreadIcon className="text-[var(--barcelona-primary-icon)] w-5 h-5 fill-none" />,
                    onClick: () => console.log('Copy link'),
                },
            ],
        },
    ];

    return (
        <div className="flex items-center justify-center">
            <div className="flex items-center gap-2">
                <span className="font-semibold text-[var(--thread-header-primary-text)] hover:underline">
                    {username}
                </span>
                {verified && (
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <VerifiedBadgeIcon />
                    </div>
                )}
                <span className="text-var(--thread-header-time-text) text-sm">
                    <TimeAgo datetime={timestamp} />
                </span>
            </div>
            <div className="flex items-center gap-3 ml-auto">
                <Tooltip content="More options" delay={500} position={"right"}>
                    <button
                        ref={triggerRef}
                        className="text-[var(--thread-header-secondary-text)] hover:text-[var(--thread-header-secondary-text-hover)] cursor-pointer hover:bg-[var(--thread-header-bg-hover)] rounded-full p-3"
                        aria-label="More options"
                        onClick={handleMoreOptionsClick}
                    >
                        <MoreHorizontal className="w-4 h-4" />
                    </button>
                </Tooltip>
            </div>
            <ActionMenu
                groups={groups}
                isOpen={isMenuOpen}
                onClose={handleClose}
                triggerRef={triggerRef}
            />
        </div>
    );
};
