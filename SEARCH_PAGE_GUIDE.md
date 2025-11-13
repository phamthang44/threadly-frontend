# Search Page Implementation Guide

## Overview
Complete search functionality with a dedicated search page, search components, hooks, and backend integration.

## Files Created

### 1. **Search Page** (`src/app/search/page.tsx`)
Full-featured search page with:
- Sticky search header with logo and login button
- Real-time search input with clear button
- Filter tabs (All, Users, Threads, Tags)
- Search results display
- Mock data (replace with API calls)
- Mobile responsive
- Authentication checks

### 2. **Search Input Component** (`src/components/molecules/SearchInput.tsx`)
Reusable search input component with:
- Search icon
- Clear button
- Keyboard support
- Customizable placeholder
- Compact mode option

### 3. **Search Service** (`src/features/search/services/searchService.ts`)
API integration service with methods for:
- `searchAll()` - Search everything
- `searchUsers()` - Search users
- `searchThreads()` - Search threads
- `searchTags()` - Search hashtags
- `getTrendingSearches()` - Get trending searches
- `getRecentSearches()` - Get recent search history
- `saveSearch()` - Save to search history
- `clearSearchHistory()` - Clear search history

### 4. **Search Hooks** (`src/features/search/hooks/useSearch.ts`)
Custom React hooks:
- `useSearch()` - Main hook with all search types
- `useSearchUsers()` - Search users only
- `useSearchThreads()` - Search threads only
- `useSearchTags()` - Search tags only

Features:
- Debounced search (300ms default)
- Loading and error states
- Search history management
- Automatic API caching

## Usage Examples

### Basic Search Page
Already implemented in `/search` route.

### Using Search Input Component

```typescriptreact
import SearchInput from '@/components/molecules/SearchInput';

export default function Header() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <SearchInput
      value={searchValue}
      onChange={setSearchValue}
      placeholder="Search Threadly"
      compact
    />
  );
}
```

### Using Search Hooks

```typescriptreact
import { useSearch } from '@/features/search/hooks/useSearch';

export default function SearchResults() {
  const { query, setQuery, results, isLoading, clearSearch } = useSearch({
    debounceMs: 300,
    saveHistory: true,
  });

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />

      {isLoading && <div>Loading...</div>}

      {results.users.map((user) => (
        <div key={user.id}>{user.title}</div>
      ))}
    </div>
  );
}
```

### Using Search Service Directly

```typescript
import { searchService } from '@/features/search/services/searchService';

// Search all types
const results = await searchService.searchAll('web development');

// Search specific type
const users = await searchService.searchUsers('john');

// Get trending
const trending = await searchService.getTrendingSearches();

// Save to history
await searchService.saveSearch('web development');
```

## Features

✅ **Real-time Search** - Debounced API calls
✅ **Multiple Search Types** - Users, threads, tags
✅ **Search History** - Save and clear recent searches
✅ **Trending** - Display trending searches
✅ **Mobile Responsive** - Works on all devices
✅ **Dark Theme** - Matches Threadly design
✅ **Loading States** - Spinner during search
✅ **Error Handling** - User-friendly error messages
✅ **Authentication Integration** - Auth checks and modals
✅ **Reusable Components** - Use search input anywhere

## API Endpoints Required

Your backend should implement these endpoints:

```
GET  /search?q={query}              - Search all types
GET  /search/users?q={query}        - Search users
GET  /search/threads?q={query}      - Search threads
GET  /search/tags?q={query}         - Search tags
GET  /search/trending               - Get trending searches
GET  /search/recent                 - Get recent searches
POST /search/history                - Save search
DELETE /search/history              - Clear search history
```

## Styling

Uses Tailwind CSS with Threadly's color scheme:
- Background: `#0A0A0A`
- Borders: `#383939`
- Text: `#A0A0A0` - `#FFFFFF`
- Accents: Purple/Pink gradients

## Customization

### Change Debounce Time
```typescript
const { query } = useSearch({ debounceMs: 500 });
```

### Disable Search History
```typescript
const { query } = useSearch({ saveHistory: false });
```

### Customize Search Input
```typescript
<SearchInput
  value={query}
  onChange={setQuery}
  placeholder="Find people..."
  compact={true}
  className="max-w-md"
/>
```

## Mobile Navigation

The search page includes mobile navigation icons at the bottom. Add more icons as needed by extending the `NavIcon` component.

## Next Steps

1. Replace mock data with real API calls
2. Implement trending searches section
3. Add search history dropdown
4. Create user/thread/tag detail pages (linked from results)
5. Add advanced filters
6. Implement search suggestions/autocomplete

