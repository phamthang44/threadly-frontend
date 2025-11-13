'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSliders, faTimes } from '@fortawesome/free-solid-svg-icons';
import Layout from '@/components/layout/Layout';
import { useAppSelector } from '@/store/hooks';
import { LoginRequiredModal } from '@/components/ui';
import ThreadLogoBrandWhite from "@/components/ui/ThreadLogoBrandWhite";
import {MobileNav} from "@/components/layout/MobileNav";

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
      <div className="w-full max-w-2xl mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-30 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#383939]">
          <div className="px-4 py-4 md:px-6">
            {/* Top Bar - Logo and Login */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {/*<div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">*/}
                {/*  */}
                {/*</div>*/}
                  <button className="w-8 h-8 cursor-pointer absolute left-50">
                      <ThreadLogoBrandWhite className="w-8 h-8" />
                  </button>
                <span className="text-white font-bold text-lg hidden sm:inline">Threads</span>
              </div>

              {!isAuthenticated && (
                <button
                  onClick={() => window.location.href = '/login'}
                  className="
                    bg-white text-black
                    px-6 py-2
                    rounded-full
                    font-semibold
                    text-sm
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
                  "
                />
                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#808080] hover:text-white transition-colors"
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
                  p-3
                  rounded-full
                  border border-[#383939]
                  hover:border-[#505050]
                  transition-all
                  flex items-center justify-center
                "
              >
                <FontAwesomeIcon icon={faSliders} size="lg" />
              </button>

              {/* Cancel Button */}
              <button
                onClick={handleClearSearch}
                className="
                  text-white
                  font-semibold
                  text-sm
                  hover:text-[#A0A0A0]
                  transition-colors
                  md:hidden
                "
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        {searchQuery && (
          <div className="sticky top-[88px] md:top-[100px] z-20 bg-[#0A0A0A]/90 backdrop-blur-sm border-b border-[#383939]">
            <div className="flex gap-6 px-4 md:px-6 overflow-x-auto scrollbar-hide">
              {['all', 'users', 'threads', 'tags'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter as typeof activeFilter)}
                  className={`
                    py-4 px-2 font-semibold text-sm
                    border-b-2 transition-all
                    capitalize
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
                  <p className="text-[#808080] text-sm">No results found for "{searchQuery}"</p>
                </div>
              )}
            </>
          ) : (
            <div className="py-12 text-center">
              <p className="text-[#808080] text-sm">Search for people, threads, or tags</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[#383939] py-6 px-4 md:px-6">
          <div className="flex flex-wrap gap-4 justify-center text-xs text-[#808080]">
            <a href="#" className="hover:text-white transition-colors">
              © 2025 Threads Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookies Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Report a problem
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isAuthenticated && (
        <></>
      )}
        <div className="md:hidden">
            <MobileNav />
        </div>
      <LoginRequiredModal
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
    <button className="w-full px-4 md:px-6 py-4 hover:bg-[#161616] transition-colors text-left">
      <div className="flex items-start gap-3">
        {result.type === 'user' && result.avatar ? (
          <img
            src={result.avatar}
            alt={result.title}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
            {result.type === 'tag' && <span className="text-white font-bold">#</span>}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-white font-semibold truncate">{result.title}</h3>
          </div>
          {result.description && (
            <p className="text-[#808080] text-sm mt-1 truncate">{result.description}</p>
          )}
        </div>

        {result.timestamp && <p className="text-[#808080] text-xs flex-shrink-0">{result.timestamp}</p>}
      </div>
    </button>
  );
};

interface NavIconProps {
  icon: any;
  label: string;
  active?: boolean;
}

const NavIcon: React.FC<NavIconProps> = ({ icon, label, active }) => (
  <button
    className={`flex flex-col items-center gap-1 p-2 transition-colors ${
      active ? 'text-white' : 'text-[#808080]'
    }`}
    title={label}
  >
    <FontAwesomeIcon icon={icon} size="lg" />
    <span className="text-xs">{label}</span>
  </button>
);

