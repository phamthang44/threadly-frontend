import React from "react";

interface SearchTabProps {
    activeFilter: 'all' | 'users' | 'threads' | 'tags';
    setActiveFilter: (filter: 'all' | 'users' | 'threads' | 'tags') => void;
}

const SearchTabs: React.FC<SearchTabProps> = ({ activeFilter, setActiveFilter }) => {
    return (
        <div
            className="backdrop-blur-sm"
            style={{ backgroundColor: 'var(--search-tab-bg)' }}
        >
            <div className="flex gap-8 px-6 overflow-x-auto scrollbar-hide">
                {['all', 'users', 'threads', 'tags'].map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter as typeof activeFilter)}
                        className="py-4 px-1 font-semibold text-sm border-b-2 transition-all duration-200 capitalize whitespace-nowrap cursor-pointer"
                        style={{
                            borderColor: activeFilter === filter ? 'var(--search-view-tab-active)' : 'transparent',
                            color: activeFilter === filter ? 'var(--search-view-tab-active)' : 'var(--search-view-tab-inactive)',
                        }}
                        onMouseEnter={(e) => {
                            if (activeFilter !== filter) {
                                e.currentTarget.style.color = 'var(--search-view-text-primary)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (activeFilter !== filter) {
                                e.currentTarget.style.color = 'var(--search-view-tab-inactive)';
                            }
                        }}
                    >
                        {filter}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SearchTabs;
