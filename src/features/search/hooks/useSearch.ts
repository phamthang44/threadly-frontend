import { useState, useCallback, useEffect } from 'react';
import { searchService, SearchResult, SearchResponse } from '@/features/search/services/searchService';

interface UseSearchOptions {
  debounceMs?: number;
  saveHistory?: boolean;
}

export const useSearch = (options: UseSearchOptions = {}) => {
  const { debounceMs = 300, saveHistory = false } = options;

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResponse>({
    users: [],
    threads: [],
    tags: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Debounced search function
  useEffect(() => {
    if (!query.trim()) {
      setResults({ users: [], threads: [], tags: [] });
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await searchService.searchAll(query);
        setResults(data);

        if (saveHistory) {
          await searchService.saveSearch(query);
        }
      } catch (err) {
        setError('Failed to search. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs, saveHistory]);

  // Load recent searches
  useEffect(() => {
    const loadRecent = async () => {
      try {
        const recent = await searchService.getRecentSearches();
        setRecentSearches(recent);
      } catch (err) {
        console.error('Failed to load recent searches:', err);
      }
    };

    loadRecent();
  }, []);

  const clearSearch = useCallback(() => {
    setQuery('');
    setResults({ users: [], threads: [], tags: [] });
    setError(null);
  }, []);

  const clearHistory = useCallback(async () => {
    try {
      await searchService.clearSearchHistory();
      setRecentSearches([]);
    } catch (err) {
      console.error('Failed to clear history:', err);
    }
  }, []);

  return {
    query,
    setQuery,
    results,
    isLoading,
    error,
    recentSearches,
    clearSearch,
    clearHistory,
    allResults: [...results.users, ...results.threads, ...results.tags],
  };
};

// Hook for individual search type
export const useSearchUsers = (query: string) => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setIsLoading(true);
        const data = await searchService.searchUsers(query);
        setResults(data);
      } catch (err) {
        setError('Failed to search users');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return { results, isLoading, error };
};

export const useSearchThreads = (query: string) => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setIsLoading(true);
        const data = await searchService.searchThreads(query);
        setResults(data);
      } catch (err) {
        setError('Failed to search threads');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return { results, isLoading, error };
};

export const useSearchTags = (query: string) => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setIsLoading(true);
        const data = await searchService.searchTags(query);
        setResults(data);
      } catch (err) {
        setError('Failed to search tags');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return { results, isLoading, error };
};

