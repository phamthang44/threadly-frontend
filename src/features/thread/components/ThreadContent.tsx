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
        mt-2 overflow-hidden [word-wrap:anywhere] 
        text-[.9375rem] leading-[140%] whitespace-pre-wrap
        ${className || ""}
      `}
        >
      <span
          style={
              {
                  '--x--base-line-clamp-line-height': 'calc(1.4 * 1em)',
                  '--x-lineHeight': 'calc(1.4 * 1em)',
              } as React.CSSProperties
          }
          className="
          min-w-0 mt-0 mb-0 overflow-x-visible max-w-full
          text-[var(--barcelona-primary-text)] font-normal
          [font-size:var(--system-15-font-size)]
          [text-wrap:pretty_!important] text-start
          [word-wrap:break-word] relative block
          [font-family:var(--font-family-system)]
          whitespace-pre-line leading-[var(--x-lineHeight)]
          [word-break:break-word]
          [--base-line-clamp-line-height:var(--x--base-line-clamp-line-height)]
          content-line-thread-detail
        "
      >
        <span>{renderContentSpans(content)}</span>
      </span>
        </div>
    );
};

export default ThreadContent;

