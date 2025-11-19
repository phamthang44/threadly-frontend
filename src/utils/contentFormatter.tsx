// src/utils/contentFormatter.ts
import React from 'react';

type ChunkType = 'text' | 'hashtag' | 'mention';

interface ContentChunk {
    type: ChunkType;
    value: string;
}

const chunkRegex = /(#\w+)|(@\w+)/g;

export const prepareContentPayload = (content: string) =>
    content.trim().replace(/\r\n/g, '\n');

const chunkLine = (line: string): ContentChunk[] => {
    const chunks: ContentChunk[] = [];
    let lastIndex = 0;

    line.replace(chunkRegex, (match, hashtag, mention, offset) => {
        if (offset > lastIndex) {
            chunks.push({ type: 'text', value: line.slice(lastIndex, offset) });
        }
        chunks.push({
            type: hashtag ? 'hashtag' : 'mention',
            value: match,
        });
        lastIndex = offset + match.length;
        return match;
    });

    if (lastIndex < line.length) {
        chunks.push({ type: 'text', value: line.slice(lastIndex) });
    }

    return chunks.length ? chunks : [{ type: 'text', value: line }];
};

const renderChunk = (chunk: ContentChunk, key: string) => {
    if (chunk.type === 'hashtag') {
        return (
            <span
                key={key}
        onClick={() => console.log('hashtag click', chunk.value)}
        className="font-bold cursor-pointer hover:underline"
            >
            {chunk.value}
            </span>
    );
    }

    if (chunk.type === 'mention') {
        return (
            <span
                key={key}
        onClick={() => console.log('mention click', chunk.value)}
        className="text-blue-500 cursor-pointer hover:underline"
            >
            {chunk.value}
            </span>
    );
    }

    return (
        <span key={key}>
            {chunk.value}
            </span>
    );
};

export const renderContentSpans = (content: string) =>
    prepareContentPayload(content)
        .split('\n')
        .map((line, lineIdx) => (
            <span key={`line-${lineIdx}`} className={`block ${lineIdx > 0 ? 'mt-2' : ''}`}>
    {chunkLine(line).map((chunk, chunkIdx) =>
            renderChunk(chunk, `line-${lineIdx}-chunk-${chunkIdx}`),
        )}
    </span>
));
