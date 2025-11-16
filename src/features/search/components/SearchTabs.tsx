import React from "react";

interface SearchTabProps {
    activeFilter: 'all' | 'users' | 'threads' | 'tags';
    setActiveFilter: (filter: 'all' | 'users' | 'threads' | 'tags') => void;
}

const SearchTabs: React.FC<SearchTabProps> = ({ activeFilter, setActiveFilter}) => {
    return (
    <div className="bg-[#181818] backdrop-blur-sm">
        <div className="flex gap-8 px-6 overflow-x-auto scrollbar-hide">
            {['all', 'users', 'threads', 'tags'].map((filter) => (
                <button
                    key={filter}
                    onClick={() => setActiveFilter(filter as typeof activeFilter)}
                    className={`
                                              py-4 px-1 font-semibold text-sm
                                              border-b-2 transition-all duration-200
                                              capitalize
                                              whitespace-nowrap
                                              cursor-pointer
                                              ${
                        activeFilter === filter
                            ? 'border-white text-white'
                            : 'border-transparent text-[#808080] hover:text-white'
                    }
                                            `}
                >
                    {filter}
                </button>
            ))}
        </div>
    </div>);
}

export default SearchTabs;