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
        <div className="flex flex-col divide-y divide-[var(--search-view-border)]">
            {searchQuery ? (
                <>
                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <div
                                className="h-8 w-8 animate-spin rounded-full border-2 border-solid"
                                style={{
                                    borderColor: 'var(--search-view-text-secondary)hôi',
                                    borderTopColor: 'var(--search-view-text-primary)',
                                }}
                            />
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
                            <p
                                className="text-sm"
                                style={{ color: 'var(--search-view-text-secondary)' }}
                            >
                                No results found for &quot;{searchQuery}&quot;
                            </p>
                        </div>
                    )}
                </>
            ) : (
                <div className="py-12 text-center">
                    <p
                        className="text-sm"
                        style={{ color: 'var(--search-view-text-secondary)' }}
                    >
                        Search for people, threads, or tags
                    </p>
                </div>
            )}
        </div>
    );
};

export default SearchResultsList;
