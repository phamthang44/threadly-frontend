'use client';

import React, { useState } from 'react';
import NextImage from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSliders, faTimes } from '@fortawesome/free-solid-svg-icons';
import Layout from '@/components/layout/Layout';
import { useAppSelector } from '@/store/hooks';
import { LoginRequiredModalMobile } from '@/features/auth/components';
import { MobileNav } from "@/features/navigation/components/MobileNav";

interface SearchResult {
  id: string;
  type: 'user' | 'thread' | 'tag';
  title: string;
  description?: string;
  avatar?: string;
  timestamp?: string;
}

export default function MobileSearchView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'users' | 'threads' | 'tags'>('all');
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  // Simulate search
  const handleSearch = async (query: string) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock search results
    const mockResults: SearchResult[] = [
      {
        id: '1',
        type: 'user',
        title: 'John Doe',
        description: '@johndoe • Verified',
        avatar: 'https://via.placeholder.com/48',
      },
      {
        id: '2',
        type: 'thread',
        title: 'Latest Web Development Trends',
        description: 'Discussing the future of web development...',
        timestamp: '2h ago',
      },
      {
        id: '3',
        type: 'tag',
        title: '#WebDevelopment',
        description: '15.2K posts',
      },
    ];

    setSearchResults(mockResults);
    setIsLoading(false);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const filteredResults = searchResults.filter((result) => {
    if (activeFilter === 'all') return true;
    return result.type === activeFilter.slice(0, -1);
  });

  return (
    <Layout>
      <div className="w-full pb-20">
        {/* Header */}
        <div className="sticky top-0 z-30 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#383939]">
          <div className="px-4 py-4">
            {/* Top Bar - Logo and Login */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-lg">Search</span>
              </div>

              {!isAuthenticated && (
                <button
                  onClick={() => window.location.href = '/login'}
                  className="
                    bg-white text-black
                    px-4 py-1.5
                    rounded-full
                    font-semibold
                    text-xs
                    hover:bg-gray-200
                    transition-colors
                  "
                >
                  Log in
                </button>
              )}
            </div>

            {/* Search Bar */}
            <div className="relative flex items-center gap-3">
              <div className="flex-1 relative">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#808080]"
                />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="
                    w-full
                    bg-[#262626]
                    text-white
                    placeholder-[#808080]
                    px-4 py-3 pl-12 pr-4
                    rounded-full
                    border border-[#383939]
                    focus:border-[#505050]
                    focus:outline-none
                    focus:ring-1 focus:ring-[#505050]
                    transition-all
                    text-sm
                  "
                />
                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#808080] hover:text-white transition-colors"
                  >
                    <FontAwesomeIcon icon={faTimes} size="sm" />
                  </button>
                )}
              </div>

              {/* Filter Button */}
              <button
                className="
                  bg-[#262626]
                  text-[#A0A0A0]
                  hover:text-white
                  p-2
                  rounded-full
                  border border-[#383939]
                  hover:border-[#505050]
                  transition-all
                  flex items-center justify-center
                "
              >
                <FontAwesomeIcon icon={faSliders} size="sm" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        {searchQuery && (
          <div className="sticky top-[88px] z-20 bg-[#0A0A0A]/90 backdrop-blur-sm border-b border-[#383939]">
            <div className="flex gap-4 px-4 overflow-x-auto scrollbar-hide">
              {['all', 'users', 'threads', 'tags'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter as typeof activeFilter)}
                  className={`
                    py-4 px-2 font-semibold text-xs
                    border-b-2 transition-all
                    capitalize
                    whitespace-nowrap
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
          </div>
        )}

        {/* Results Section */}
        <div className="divide-y divide-[#383939]">
          {searchQuery ? (
            <>
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              ) : filteredResults.length > 0 ? (
                filteredResults.map((result) => (
                  <SearchResultItem key={result.id} result={result} />
                ))
              ) : (
                <div className="py-12 text-center">
                  <p className="text-[#808080] text-xs">No results found for &quot;{searchQuery}&quot;</p>
                </div>
              )}
            </>
          ) : (
            <div className="py-12 text-center">
              <p className="text-[#808080] text-xs">Search for people, threads, or tags</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div>
        <MobileNav />
      </div>

      <LoginRequiredModalMobile
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        featureName="Searching"
      />
    </Layout>
  );
}

interface SearchResultItemProps {
  result: SearchResult;
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({ result }) => {
  return (
    <button className="w-full px-4 py-3 hover:bg-[#161616] transition-colors text-left">
      <div className="flex items-start gap-3">
        {result.type === 'user' && result.avatar ? (
          <NextImage
            src={result.avatar}
            alt={result.title}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
            {result.type === 'tag' && <span className="text-white font-bold text-sm">#</span>}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-white font-semibold text-sm truncate">{result.title}</h3>
          </div>
          {result.description && (
            <p className="text-[#808080] text-xs mt-1 truncate">{result.description}</p>
          )}
        </div>
      </div>
    </button>
  );
};

