'use client';

import React from 'react';
import { renderContentSpans } from "@/utils/contentFormatter";

interface ThreadContentProps {
    content: string;
    className?: string;
}

const ThreadContent: React.FC<ThreadContentProps> = ({ content, className }) => {
    return (
        <div
            className={`
                mt-1                     
                text-[15px]              
                leading-[21px]           
                font-normal              
                text-[var(--barcelona-primary-text)] 
                whitespace-pre-wrap      
                break-words              
                text-pretty              
                ${className || ""}
            `}
        >
            {renderContentSpans(content)}
        </div>
    );
};

export default ThreadContent;