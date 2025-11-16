import React from 'react';
import NextImage from 'next/image';
import {SearchResult} from "@/features/search/types";

interface SearchResultItemProps {
    result: SearchResult;
    onClick: () => void;
    isAuthenticated: boolean;
}


const SearchResultItem: React.FC<SearchResultItemProps> = ({ result, onClick, isAuthenticated }) => {
    return (
        <button
            onClick={onClick}
            className="w-full px-4 md:px-6 py-4 hover:bg-[#161616] rounded-xl transition-all duration-200 text-left group cursor-pointer"
        >
            <div className="flex items-start gap-4">
                {result.type === 'user' && result.avatar ? (
                    <NextImage
                        src={result.avatar}
                        alt={result.title}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover flex-shrink-0 group-hover:ring-2 group-hover:ring-[#505050] transition-all duration-200"
                    />
                ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0 group-hover:ring-2 group-hover:ring-[#505050] transition-all duration-200">
                        {result.type === 'tag' && <span className="text-white font-bold text-lg">#</span>}
                    </div>
                )}

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <h3 className="text-white font-semibold truncate group-hover:text-[#e0e0e0] transition-colors duration-200">{result.title}</h3>
                    </div>
                    {result.description && (
                        <p className="text-[#808080] text-sm mt-1.5 truncate group-hover:text-[#a0a0a0] transition-colors duration-200">{result.description}</p>
                    )}
                </div>

                {result.timestamp && <p className="text-[#808080] text-xs flex-shrink-0 group-hover:text-[#a0a0a0] transition-colors duration-200">{result.timestamp}</p>}
            </div>
        </button>
    );
};

export default SearchResultItem;