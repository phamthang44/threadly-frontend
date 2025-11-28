import React from 'react';
import NextImage from 'next/image';
import {SearchResult} from "@/features/search/types";

interface SearchResultItemProps {
    result: SearchResult;
    onClick: () => void;
    isAuthenticated: boolean;
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({ result, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="w-full px-4 md:px-6 py-4 rounded-xl transition-all duration-200 text-left group cursor-pointer"
            style={{ backgroundColor: 'transparent' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--search-view-result-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
            <div className="flex items-start gap-4">
                {result.type === 'user' && result.avatar ? (
                    <NextImage
                        src={result.avatar}
                        alt={result.title}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover flex-shrink-0 transition-all duration-200"
                        style={{
                            boxShadow: 'none',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px var(--search-view-border)`)}
                        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
                    />
                ) : (
                    <div
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0 transition-all duration-200"
                        style={{
                            boxShadow: 'none',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px var(--search-view-border)`)}
                        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
                    >
                        {result.type === 'tag' && <span className="text-white font-bold text-lg">#</span>}
                    </div>
                )}

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <h3
                            className="text-sm font-semibold truncate transition-colors duration-200"
                            style={{ color: 'var(--search-view-text-primary)' }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--search-view-text-primary)')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--search-view-text-primary)')}
                        >
                            {result.title}
                        </h3>
                    </div>
                    {result.description && (
                        <p
                            className="text-sm mt-1.5 truncate transition-colors duration-200"
                            style={{ color: 'var(--search-view-text-secondary)' }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--search-view-text-secondary)')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--search-view-text-secondary)')}
                        >
                            {result.description}
                        </p>
                    )}
                </div>

                {result.timestamp && (
                    <p
                        className="text-xs flex-shrink-0 transition-colors duration-200"
                        style={{ color: 'var(--search-view-text-secondary)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--search-view-text-secondary)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--search-view-text-secondary)')}
                    >
                        {result.timestamp}
                    </p>
                )}
            </div>
        </button>
    );
};

export default SearchResultItem;
