import { SearchResultItem } from "@/features/search/components";
import React from "react";
import { SearchResult } from "@/features/search/types";

interface SearchResultListProps {
    searchQuery: string;
    filteredResults: SearchResult[];
    isLoading: boolean;
    isAuthenticated: boolean;
    handleResultClick: (result: SearchResult) => void;
}

const SearchResultsList: React.FC<SearchResultListProps> = ({
                                                                searchQuery,
                                                                isLoading,
                                                                filteredResults,
                                                                handleResultClick,
                                                                isAuthenticated,
                                                            }) => {
    return (
        <div className="divide-y divide-[#383939] px-4 py-4">
            {searchQuery ? (
                <>
                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                        </div>
                    ) : filteredResults.length > 0 ? (
                        filteredResults.map((result) => (
                            <SearchResultItem
                                key={result.id}
                                result={result}
                                onClick={() => handleResultClick(result)}
                                isAuthenticated={isAuthenticated}
                            />
                        ))
                    ) : (
                        <div className="py-12 text-center">
                            <p className="text-[#808080] text-sm">
                                No results found for &quot;{searchQuery}&quot;
                            </p>
                        </div>
                    )}
                </>
            ) : (
                <div className="py-12 text-center">
                    <p className="text-[#808080] text-sm">
                        Search for people, threads, or tags
                    </p>
                </div>
            )}
        </div>
    );
};

export default SearchResultsList;
