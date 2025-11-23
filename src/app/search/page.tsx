'use client';

import React, { useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import {LoginRequiredModalDesktop} from '@/features/auth/components';
import { useIsMobile } from '@/hooks/useIsMobile';
import MobileSearchPage from './mobile';
import {LoginSidebar} from "@/components/ui/organisms/LoginSidebar";
import {Sidebar} from "@/features/navigation/components/Sidebar";
import { useRouter } from 'next/navigation';
import SearchTabs from "@/features/search/components/SearchTabs";
import mockResults from '@/features/search/seed/mockresults';
import { SearchResultsList, SearchBar } from '@/features/search/components';
import {SearchResult} from "@/features/search/types";

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
                <main className="flex-1 max-w-2xl flex flex-col min-h-0">
                    {/* Header with rounded corners */}
                    <div className="sticky top-0 z-30 bg-[#0A0A0A] backdrop-blur-md">
                        <div className="px-6 py-6 ">
                            {/* Title */}
                            <h1 className="text-white font-bold text-2xl mb-6 text-center">Search</h1>

                            {/* Search Bar with rounded styling */}
                            <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} handleClearSearch={handleClearSearch} />
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
                                <SearchResultsList searchQuery={searchQuery} filteredResults={filteredResults} isAuthenticated={isAuthenticated} handleResultClick={handleResultClick} isLoading={isLoading} />
                            </div>
                        </div>
                    </div>
                </main>

                {/* Right Column - Login/Info Panel */}
                {!isAuthenticated && (
                    <LoginSidebar />
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


