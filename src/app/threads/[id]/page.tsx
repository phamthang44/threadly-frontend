'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Header, Sidebar, Layout } from '@/components/layout';
import { ThreadDetail } from '@/features/threads/components';

const ThreadDetailPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const params = useParams();
  const threadId = params.id as string;

  const currentUser = {
    name: 'John Doe',
    initials: 'JD',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe',
  };

  const mockThread = {
    id: threadId,
    author: {
      id: 'user-1',
      name: 'Sarah Johnson',
      handle: 'sarahj',
      initials: 'SJ',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    },
    content: 'Just launched my new project! So excited to share it with the community. Check it out and let me know what you think! This is a longer post with more details about the amazing features we\'ve built. 🚀',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
    timestamp: '2 hours ago',
    likes: 234,
    replies: 45,
    reposts: 67,
    isLiked: false,
  };

  const mockComments = [
    {
      id: '1',
      author: {
        id: 'user-2',
        name: 'Alex Chen',
        handle: 'alexchen',
        initials: 'AC',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
      },
      content: 'This looks amazing! I\'d love to try it out. Great work on the design!',
      timestamp: '1 hour ago',
      likes: 45,
      replies: 3,
      isLiked: false,
    },
    {
      id: '2',
      author: {
        id: 'user-3',
        name: 'Maria Garcia',
        handle: 'mgarcia',
        initials: 'MG',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
      },
      content: 'The UI is clean and intuitive. Can\'t wait to see this in production!',
      timestamp: '45 minutes ago',
      likes: 32,
      replies: 2,
      isLiked: false,
    },
  ];

  return (
    <Layout
      header={<Header user={currentUser} onMenuClick={() => setSidebarOpen(!sidebarOpen)} />}
      sidebar={<Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} user={currentUser} />}
    >
      <ThreadDetail threadId={threadId} thread={mockThread} comments={mockComments} />
    </Layout>
  );
};

export default ThreadDetailPage;

