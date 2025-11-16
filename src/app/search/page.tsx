'use client';

import React, { useState } from 'react';
import NextImage from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSliders, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from '@/store/hooks';
import {LoginRequiredModalDesktop} from '@/features/auth/components';
import { useIsMobile } from '@/hooks/useIsMobile';
import MobileSearchPage from './mobile';
import {LoginSidebar} from "@/components/layout/LoginSidebar";
import {Sidebar} from "@/features/navigation/components/Sidebar";
import { useRouter } from 'next/navigation';
import SearchTabs from "@/features/search/components/SearchTabs";
import mockResults from '@/features/search/seed/mockresults';

interface SearchResult {
    id: string;
    type: 'user' | 'thread' | 'tag';
    title: string;
    description?: string;
    avatar?: string;
    timestamp?: string;
}

export default function SearchPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [activeFilter, setActiveFilter] = useState<'all' | 'users' | 'threads' | 'tags'>('all');
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
    const isMobile = useIsMobile();
    const router = useRouter();

    const handleSearch = async (query: string) => {
        setSearchQuery(query);

        if (!query.trim()) {
            setSearchResults([]);
            return;
        }

        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));

        setSearchResults(mockResults);
        setIsLoading(false);
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setSearchResults([]);
    };

    const handleResultClick = (result: SearchResult) => {
        if (!isAuthenticated) {
            setShowLoginModal(true);
            return;
        }

        // Handle authenticated user navigation
        const routes: Record<string, string> = {
            'user': `/profile/${result.id}`,
            'thread': `/thread/${result.id}`,
            'tag': `/explore/${result.title.replace('#', '')}`,
        };

        router.push(routes[result.type] || "/");
    };

    const filteredResults = searchResults.filter((result) => {
        if (activeFilter === 'all') return true;
        return result.type === activeFilter.slice(0, -1);
    });

    // let authenticated = true; // For testing purposes

    if (isMobile) {
        return <MobileSearchPage />;
    }

    return (
        <>
            <div className={`flex h-screen bg-[#0A0A0A] justify-center ${isAuthenticated ? '' : 'pr-60'}`}>
                <Sidebar />

                {/* Main Search Column */}
                <div className="flex-1 max-w-2xl flex flex-col min-h-0">
                    {/* Header with rounded corners */}
                    <div className="sticky top-0 z-30 bg-[#0A0A0A] backdrop-blur-md">
                        <div className="px-6 py-6 ">
                            {/* Title */}
                            <h1 className="text-white font-bold text-2xl mb-6 text-center">Search</h1>

                            {/* Search Bar with rounded styling */}
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
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col min-h-0 rounded-xl bg-[#181818] border border-[#383939]">
                        <div className="rounded-xl flex-1 overflow-hidden">
                            <div className="flex-1 overflow-y-auto custom-scrollbar-search max-h-full">
                                {/* Filter Tabs with smooth transitions */}
                                {searchQuery && (
                                    <SearchTabs activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
                                )}

                                {/* Results Section */}
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
                                                    <p className="text-[#808080] text-sm">No results found for &quot;{searchQuery}&quot;</p>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="py-12 text-center">
                                            <p className="text-[#808080] text-sm">Search for people, threads, or tags</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Login/Info Panel */}
                {!isAuthenticated && (
                    <LoginSidebar isAuthenticated={isAuthenticated} />
                )}

                {/* Right Column - Padding for authenticated users */}
                {isAuthenticated && (
                    <div className="w-80 border-l border-[#383939]"></div>
                )}
            </div>

            <LoginRequiredModalDesktop
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                featureName="Viewing this content"
            />
        </>
    );
}

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
