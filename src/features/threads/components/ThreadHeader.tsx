import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { ThreadHeaderProps } from '@/types';
import {VerifiedBadgeIcon, Tooltip} from "@/components/ui";

export const ThreadHeader: React.FC<ThreadHeaderProps> = ({
                                                          username,
                                                          timestamp,
                                                          verified = false
                                                      }) => {
    return (
        <div className="flex items-center mb-2 justify-center">
            <div className="flex items-center gap-2">
                <span className="font-semibold text-white">{username}</span>
                {verified && (
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <VerifiedBadgeIcon />
                    </div>
                )}
                <span className="text-gray-500 text-sm">{timestamp}</span>
            </div>
            <div className="flex items-center gap-3 ml-auto relative">
                <Tooltip content="More options" delay={500} position={"right"}>
                    <button className="absolute -left-9 text-gray-400 hover:text-gray-300 cursor-pointer hover:bg-[#1e1e1e] rounded-full p-3" aria-label="More options">
                        <MoreHorizontal className="w-5 h-5" />
                    </button>
                </Tooltip>
            </div>
        </div>
    );
};