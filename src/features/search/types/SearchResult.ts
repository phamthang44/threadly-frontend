export interface SearchResult {
    id: string;
    type: 'user' | 'thread' | 'tag';
    title: string;
    description?: string;
    avatar?: string;
    timestamp?: string;
}

export type FilterType = 'all' | 'users' | 'threads' | 'tags';