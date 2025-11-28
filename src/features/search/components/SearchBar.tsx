import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faSliders, faTimes} from "@fortawesome/free-solid-svg-icons";
import React from "react";

interface SearchBarProps {
    searchQuery: string;
    handleSearch: (query: string) => void;
    handleClearSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, handleSearch, handleClearSearch }) => {
    return (
        <div className="relative flex items-center gap-3">
            <div className="flex-1 relative group">
                <FontAwesomeIcon
                    icon={faSearch}
                    className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-white"
                    style={{
                        color: 'var(--search-view-text-secondary)',
                    }}
                />
                <input
                    type="text"
                    placeholder="Search people, threads, or tags..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full px-4 py-3.5 pl-12 pr-12 rounded-2xl border transition-all duration-200 focus:outline-none focus:ring-1"
                    style={{
                        backgroundColor: 'var(--search-view-bg)',
                        color: 'var(--search-view-text-primary)',
                        borderColor: 'var(--search-view-border)',
                    }}
                    onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'var(--search-view-text-secondary)';
                        e.currentTarget.style.boxShadow = '0 0 0 1px var(--search-view-text-secondary)';
                    }}
                    onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'var(--search-view-border)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                />
                {searchQuery && (
                    <button
                        onClick={handleClearSearch}
                        className="absolute right-4 top-1/2 -translate-y-1/2 hover:scale-110 transition-all duration-200"
                        style={{
                            color: 'var(--search-view-text-secondary)',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--search-view-text-primary)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--search-view-text-secondary)')}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                )}
            </div>

            {/* Filter Button */}
            <button
                className="p-3.5 rounded-2xl border transition-all duration-200 flex items-center justify-center"
                style={{
                    backgroundColor: 'var(--search-view-bg)',
                    color: 'var(--search-view-text-secondary)',
                    borderColor: 'var(--search-view-border)',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--search-view-text-primary)';
                    e.currentTarget.style.borderColor = 'var(--search-view-text-secondary)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--search-view-text-secondary)';
                    e.currentTarget.style.borderColor = 'var(--search-view-border)';
                }}
            >
                <FontAwesomeIcon icon={faSliders} size="lg" />
            </button>
        </div>
    );
};

export default SearchBar;
