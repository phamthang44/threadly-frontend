import axiosClient from '@/lib/axiosClient';

export interface SearchResult {
  id: string;
  type: 'user' | 'thread' | 'tag';
  title: string;
  description?: string;
  avatar?: string;
  timestamp?: string;
  followersCount?: number;
  postsCount?: number;
}

export interface SearchResponse {
  users: SearchResult[];
  threads: SearchResult[];
  tags: SearchResult[];
}

export const searchService = {
  // Search all content types
  searchAll: async (query: string): Promise<SearchResponse> => {
    try {
      const response = await axiosClient.get('/search', {
        params: { q: query },
      });
      return response.data;
    } catch (error) {
      console.error('Search error:', error);
      throw error;
    }
  },

  // Search users
  searchUsers: async (query: string) => {
    try {
      const response = await axiosClient.get('/search/users', {
        params: { q: query },
      });
      return response.data;
    } catch (error) {
      console.error('User search error:', error);
      throw error;
    }
  },

  // Search threads
  searchThreads: async (query: string) => {
    try {
      const response = await axiosClient.get('/search/threads', {
        params: { q: query },
      });
      return response.data;
    } catch (error) {
      console.error('ThreadModel search error:', error);
      throw error;
    }
  },

  // Search tags/hashtags
  searchTags: async (query: string) => {
    try {
      const response = await axiosClient.get('/search/tags', {
        params: { q: query },
      });
      return response.data;
    } catch (error) {
      console.error('Tag search error:', error);
      throw error;
    }
  },

  // Get trending searches
  getTrendingSearches: async () => {
    try {
      const response = await axiosClient.get('/search/trending');
      return response.data;
    } catch (error) {
      console.error('Trending searches error:', error);
      throw error;
    }
  },

  // Get recent searches
  getRecentSearches: async () => {
    try {
      const response = await axiosClient.get('/search/recent');
      return response.data;
    } catch (error) {
      console.error('Recent searches error:', error);
      throw error;
    }
  },

  // Save search to history
  saveSearch: async (query: string) => {
    try {
      const response = await axiosClient.post('/search/history', { query });
      return response.data;
    } catch (error) {
      console.error('Save search error:', error);
      throw error;
    }
  },

  // Clear search history
  clearSearchHistory: async () => {
    try {
      const response = await axiosClient.delete('/search/history');
      return response.data;
    } catch (error) {
      console.error('Clear history error:', error);
      throw error;
    }
  },
};

