# LoginRequiredModal - Implementation Guide

## Overview
`LoginRequiredModal` is a reusable modal component that appears when unauthenticated users try to access protected features. It matches the Threads design aesthetic and redirects users to login via Instagram.

## Quick Start

### 1. Basic Implementation

```typescriptreact
'use client';

import { useLoginRequired } from '@/hooks/useLoginRequired';
import { LoginRequiredModal } from '@/components/ui';

export default function MyComponent() {
  const { isOpen, openModal, closeModal, featureName } = useLoginRequired();

  const handleProtectedAction = () => {
    // This will show modal if not authenticated, or proceed if authenticated
    checkAuthAndProceed(() => {
      // Your protected action here
      console.log('User is authenticated, proceeding...');
    }, 'Liking posts');
  };

  return (
    <>
      <button onClick={handleProtectedAction}>
        Like Post
      </button>

      <LoginRequiredModal
        isOpen={isOpen}
        onClose={closeModal}
        featureName={featureName}
      />
    </>
  );
}
```

### 2. Using checkAuthAndProceed Hook

The hook provides a utility function to check auth and either show modal or proceed:

```typescriptreact
import { useLoginRequired } from '@/hooks/useLoginRequired';

export default function ThreadComponent() {
  const { isOpen, closeModal, featureName, checkAuthAndProceed } = useLoginRequired();
  const { isOpen: isModalOpen, openModal } = useLoginRequired();

  const handleLike = () => {
    checkAuthAndProceed(() => {
      // Perform like action
      likeThread(threadId);
    }, 'Liking posts');
  };

  const handleComment = () => {
    checkAuthAndProceed(() => {
      // Perform comment action
      openCommentModal(threadId);
    }, 'Commenting on posts');
  };

  return (
    <>
      <button onClick={handleLike}>❤️ Like</button>
      <button onClick={handleComment}>💬 Comment</button>

      <LoginRequiredModal
        isOpen={isOpen}
        onClose={closeModal}
        featureName={featureName}
      />
    </>
  );
}
```

### 3. Manual Modal Control

```typescriptreact
import { useLoginRequired } from '@/hooks/useLoginRequired';

export default function SaveButton() {
  const { isOpen, openModal, closeModal } = useLoginRequired();

  return (
    <>
      <button onClick={() => openModal('Saving posts')}>
        Save
      </button>

      <LoginRequiredModal
        isOpen={isOpen}
        onClose={closeModal}
        featureName="Saving posts"
      />
    </>
  );
}
```

## Features

✅ **Dark Theme** - Matches Threadly's dark aesthetic
✅ **Mobile Responsive** - Slides up from bottom on mobile, centered on desktop
✅ **Instagram Auth** - "Continue with Instagram" button
✅ **Feature Context** - Customizable feature name in modal text
✅ **Smooth Animations** - Backdrop blur and modal transitions
✅ **Close Options** - Backdrop click, close button, or "Not now" button
✅ **Auth Integration** - Uses Redux store for authentication state

## Props

### LoginRequiredModal

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isOpen` | boolean | Yes | Controls modal visibility |
| `onClose` | () => void | Yes | Callback when modal closes |
| `featureName` | string | No | Name of the feature (default: "This feature") |

## Hook: useLoginRequired

Returns an object with:

```typescript
{
  isOpen: boolean;                    // Modal open state
  openModal: (feature: string) => void;  // Open modal with feature name
  closeModal: () => void;             // Close modal
  checkAuthAndProceed: (callback: () => void, featureName: string) => boolean;
  isAuthenticated: boolean;           // Current auth state
  featureName: string;                // Current feature name
}
```

## Common Use Cases

### 1. Like Button
```typescriptreact
const handleLike = () => {
  checkAuthAndProceed(() => {
    likeThread(threadId);
  }, 'Liking posts');
};
```

### 2. Comment Button
```typescriptreact
const handleComment = () => {
  checkAuthAndProceed(() => {
    setShowCommentModal(true);
  }, 'Commenting on posts');
};
```

### 3. Save/Bookmark
```typescriptreact
const handleSave = () => {
  checkAuthAndProceed(() => {
    saveThread(threadId);
  }, 'Saving posts');
};
```

### 4. Share Feature
```typescriptreact
const handleShare = () => {
  checkAuthAndProceed(() => {
    shareThread(threadId);
  }, 'Sharing posts');
};
```

## Styling

The modal uses Tailwind CSS with custom colors matching Threadly's design:
- Background: `#0A0A0A` (dark black)
- Borders: `#383939` (dark gray)
- Text: `#A0A0A0` - `#FFFFFF` (various grays/white)
- Accent: Instagram gradient (purple to pink)

To customize, edit the className values in `LoginRequiredModal.tsx`.

## Notes

- The modal automatically redirects to `/login` when "Continue with Instagram" is clicked
- The modal persists its state across component re-renders
- Redux auth state is used to determine user authentication status
- The modal closes on backdrop click or "Not now" button

