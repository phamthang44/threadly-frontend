import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faSliders, faTimes} from "@fortawesome/free-solid-svg-icons";
import React from "react";

interface SearchBarProps {
    searchQuery: string;
    handleSearch: (query: string) => void;
    handleClearSearch: () => void;
}


const SearchBar:React.FC<SearchBarProps> = ({ searchQuery, handleSearch, handleClearSearch }) => {
    return (
        <div className="relative flex items-center gap-3">
            <div className="flex-1 relative group">
                <FontAwesomeIcon
                    icon={faSearch}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#808080] group-focus-within:text-white transition-colors"
                />
                <input
                    type="text"
                    placeholder="Search people, threads, or tags..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="
                                          w-full
                                          bg-[#262626]
                                          text-white
                                          placeholder-[#808080]
                                          px-4 py-3.5 pl-12 pr-12
                                          rounded-2xl
                                          border border-[#383939]
                                          hover:border-[#505050]
                                          focus:border-[#505050]
                                          focus:outline-none
                                          focus:ring-1 focus:ring-[#505050]
                                          transition-all duration-200
                                        "
                />
                {searchQuery && (
                    <button
                        onClick={handleClearSearch}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#808080] hover:text-white hover:scale-110 transition-all duration-200"
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                )}
            </div>

            {/* Filter Button */}
            <button
                className="
                                        bg-[#262626]
                                        text-[#A0A0A0]
                                        hover:text-white
                                        hover:bg-[#2a2a2a]
                                        p-3.5
                                        rounded-2xl
                                        border border-[#383939]
                                        hover:border-[#505050]
                                        transition-all duration-200
                                        flex items-center justify-center
                                      "
            >
                <FontAwesomeIcon icon={faSliders} size="lg" />
            </button>
        </div>
    );
}

export default SearchBar;