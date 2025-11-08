'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Header, Sidebar, Layout } from '@/components/layout';
import { UserProfile } from '@/features/profile/components';

const ProfilePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const params = useParams();
  const userId = params.id as string;

  const currentUser = {
    name: 'John Doe',
    initials: 'JD',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe',
  };

  const isOwnProfile = userId === 'me' || userId === currentUser.name.toLowerCase().replace(' ', '');

  const mockProfile = {
    name: 'Sarah Johnson',
    handle: 'sarahj',
    initials: 'SJ',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    bio: '🚀 Full-stack developer | Design enthusiast | Coffee lover ☕ | Building cool stuff with React & Tailwind CSS',
    location: 'San Francisco, CA',
    website: 'sarahj.dev',
    joinDate: 'March 2023',
    followers: 2451,
    following: 834,
    isFollowing: false,
  };

  const mockThreads = [
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
        id: 'user-1',
        name: 'Sarah Johnson',
        handle: 'sarahj',
        initials: 'SJ',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      },
      content: 'Tailwind CSS is a game-changer for rapid UI development. The utility-first approach just makes sense!',
      timestamp: '1 day ago',
      likes: 156,
      replies: 23,
      reposts: 45,
      isLiked: false,
    },
  ];

  return (
    <Layout
      header={<Header user={currentUser} onMenuClick={() => setSidebarOpen(!sidebarOpen)} />}
      sidebar={<Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} user={currentUser} />}
    >
      <UserProfile userId={userId} isOwnProfile={isOwnProfile} profile={mockProfile} threads={mockThreads} />
    </Layout>
  );
};

export default ProfilePage;

