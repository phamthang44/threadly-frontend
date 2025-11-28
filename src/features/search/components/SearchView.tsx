'use client';

import React, { useState, useCallback } from 'react';
import { useAppSelector } from '@/store/hooks';
import { LoginRequiredModalDesktop } from '@/features/auth/components';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useRouter } from 'next/navigation';
import MobileSearchPage from './mobile';
import { LoginSidebar } from '@/components/ui/organisms/LoginSidebar';
import { Sidebar } from '@/features/navigation/components/Sidebar';
import SearchTabs from '@/features/search/components/SearchTabs';
import { SearchResultsList, SearchBar } from '@/features/search/components';
import mockResults from '@/features/search/seed/mockresults';
import { SearchResult, FilterType } from '@/features/search/types';

const ROUTE_MAP: Record<string, (id: string) => string> = {
    user: (id) => `/profile/${id}`,
    thread: (id) => `/thread/${id}`,
    tag: (title) => `/explore/${title.replace('#', '')}`,
};

export default function SearchView() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');

    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
    const isMobile = useIsMobile();
    const router = useRouter();

    const handleSearch = useCallback(async (query: string) => {
        setSearchQuery(query);

        if (!query.trim()) {
            setSearchResults([]);
            return;
        }

        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        setSearchResults(mockResults);
        setIsLoading(false);
    }, []);

    const handleClearSearch = useCallback(() => {
        setSearchQuery('');
        setSearchResults([]);
    }, []);

    const handleResultClick = useCallback(
        (result: SearchResult) => {
            if (!isAuthenticated) {
                setShowLoginModal(true);
                return;
            }

            const routeBuilder = ROUTE_MAP[result.type];
            const route = routeBuilder?.(result.id) || '/';
            router.push(route);
        },
        [isAuthenticated, router]
    );

    const filteredResults = searchResults.filter((result) => {
        if (activeFilter === 'all') return true;
        return result.type === activeFilter.slice(0, -1) as string;
    });

    if (isMobile) {
        return <MobileSearchPage />;
    }

    return (
        <>
            <div
                className={`flex h-screen justify-center bg-[var(--search-view-bg)] ${!isAuthenticated ? 'pr-60' : ''}`}
            >
                <Sidebar />

                <main className="flex-1 max-w-2xl flex flex-col min-h-0">
                    <div
                        className="sticky top-0 z-30 backdrop-blur-md bg-[var(--search-view-header-bg)]"
                    >
                        <div className="px-6 py-6">
                            <h1 className="font-bold text-2xl mb-6 text-center" style={{ color: 'var(--search-view-text-primary)' }}>
                                Search
                            </h1>
                            <SearchBar
                                searchQuery={searchQuery}
                                handleSearch={handleSearch}
                                handleClearSearch={handleClearSearch}
                            />
                        </div>
                    </div>

                    <div
                        className="flex-1 flex flex-col min-h-0 rounded-xl border"
                        style={{
                            backgroundColor: 'var(--search-view-bg)',
                            borderColor: 'var(--search-view-border)',
                        }}
                    >
                        <div className="rounded-xl flex-1 overflow-hidden bg-[var(--search-result-section-bg)]">
                            <div className="flex-1 overflow-y-auto custom-scrollbar-search max-h-full">
                                {searchQuery && (
                                    <SearchTabs activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
                                )}

                                <SearchResultsList
                                    searchQuery={searchQuery}
                                    filteredResults={filteredResults}
                                    isAuthenticated={isAuthenticated}
                                    handleResultClick={handleResultClick}
                                    isLoading={isLoading}
                                />
                            </div>
                        </div>
                    </div>
                </main>

                {!isAuthenticated && <LoginSidebar />}

                {isAuthenticated && (
                    <div
                        className="w-80 border-l"
                        style={{ borderColor: 'var(--search-view-border)' }}
                    />
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
