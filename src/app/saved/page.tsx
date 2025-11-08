'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { Header, Sidebar, Layout } from '@/components/layout';
import ThreadCard from '@/components/ThreadCard';

const SavedPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentUser = {
    name: 'John Doe',
    initials: 'JD',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe',
  };

  const savedThreads = [
    {
      id: '1',
      author: {
        id: 'user-1',
        name: 'Sarah Johnson',
        handle: 'sarahj',
        initials: 'SJ',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      },
      content: 'Just launched my new project! So excited to share it with the community. Check it out and let me know what you think! 🚀',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
      timestamp: '2 hours ago',
      likes: 234,
      replies: 45,
      reposts: 67,
      isLiked: false,
    },
    {
      id: '2',
      author: {
        id: 'user-2',
        name: 'Alex Chen',
        handle: 'alexchen',
        initials: 'AC',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
      },
      content: 'Finally mastered Tailwind CSS flexbox! The docs are so helpful. If you\'re struggling with it, just read the examples carefully.',
      timestamp: '6 hours ago',
      likes: 412,
      replies: 78,
      reposts: 145,
      isLiked: false,
    },
  ];

  return (
    <Layout
      header={<Header user={currentUser} onMenuClick={() => setSidebarOpen(!sidebarOpen)} />}
      sidebar={<Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} user={currentUser} />}
    >
      <div className="min-h-screen bg-light-50 dark:bg-dark-900">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="sticky top-16 z-20 bg-white dark:bg-dark-800 border-b border-light-200 dark:border-dark-700 p-4">
            <h1 className="text-2xl font-bold text-dark-900 dark:text-light-50">
              <FontAwesomeIcon icon={faBookmark} className="w-6 h-6 mr-2" />
              Saved Threads
            </h1>
          </div>

          {/* Threads */}
          <div className="divide-y divide-light-200 dark:divide-dark-700">
            {savedThreads.map((thread) => (
              <ThreadCard
                key={thread.id}
                {...thread}
                onLike={(id) => console.log('Like:', id)}
                onReply={(id) => console.log('Reply:', id)}
                onRepost={(id) => console.log('Repost:', id)}
              />
            ))}
          </div>

          {/* Empty State */}
          {savedThreads.length === 0 && (
            <div className="p-8 sm:p-12 text-center">
              <div className="text-6xl mb-4">🔖</div>
              <h3 className="text-xl font-semibold text-dark-900 dark:text-light-50">
                No saved threads
              </h3>
              <p className="text-dark-600 dark:text-dark-300 mt-2">
                Save threads to read them later
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SavedPage;

