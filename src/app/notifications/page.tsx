'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faHeart, faComment, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Header, Sidebar, Layout } from '@/components/layout';
import { Card, Button } from '@/components/ui';
import Avatar from '@/components/ui/Avatar';
import Link from 'next/link';

interface Notification {
  id: string;
  type: 'like' | 'reply' | 'follow' | 'repost';
  user: {
    name: string;
    handle: string;
    avatar?: string;
    initials: string;
  };
  message: string;
  timestamp: string;
  read: boolean;
  icon: any;
  relatedId?: string;
}

const NotificationsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentUser = {
    name: 'John Doe',
    initials: 'JD',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe',
  };

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'like',
      user: {
        name: 'Sarah Johnson',
        handle: 'sarahj',
        initials: 'SJ',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      },
      message: 'liked your threads',
      timestamp: '2 minutes ago',
      read: false,
      icon: faHeart,
      relatedId: 'threads-1',
    },
    {
      id: '2',
      type: 'reply',
      user: {
        name: 'Alex Chen',
        handle: 'alexchen',
        initials: 'AC',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
      },
      message: 'replied to your threads',
      timestamp: '1 hour ago',
      read: false,
      icon: faComment,
      relatedId: 'threads-2',
    },
    {
      id: '3',
      type: 'follow',
      user: {
        name: 'Maria Garcia',
        handle: 'mgarcia',
        initials: 'MG',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
      },
      message: 'started following you',
      timestamp: '3 hours ago',
      read: true,
      icon: faUserPlus,
    },
    {
      id: '4',
      type: 'like',
      user: {
        name: 'James Wilson',
        handle: 'jwilson',
        initials: 'JW',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=james',
      },
      message: 'liked your threads',
      timestamp: '5 hours ago',
      read: true,
      icon: faHeart,
      relatedId: 'threads-3',
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
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-dark-900 dark:text-light-50">
                <FontAwesomeIcon icon={faBell} className="w-6 h-6 mr-2" />
                Notifications
              </h1>
              <Button variant="ghost" size="sm">
                Mark all as read
              </Button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="divide-y divide-light-200 dark:divide-dark-700">
            {notifications.map((notification) => (
              <Link key={notification.id} href={notification.relatedId ? `/threads/${notification.relatedId}` : '#'}>
                <Card
                  className={`m-0 p-4 rounded-none border-none cursor-pointer hover:bg-light-100 dark:hover:bg-dark-700 transition-colors ${
                    !notification.read ? 'bg-primary-50 dark:bg-primary-900 dark:bg-opacity-20' : ''
                  }`}
                  hover={false}
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <Avatar
                      src={notification.user.avatar}
                      initials={notification.user.initials}
                      size="md"
                    />

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="text-dark-900 dark:text-light-50">
                        <strong>{notification.user.name}</strong>{' '}
                        <span className="text-dark-600 dark:text-dark-300">
                          @{notification.user.handle}
                        </span>
                      </p>
                      <p className="text-dark-700 dark:text-light-100 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-sm text-dark-500 dark:text-dark-400 mt-2">
                        {notification.timestamp}
                      </p>
                    </div>

                    {/* Icon */}
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        notification.type === 'like'
                          ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'
                          : notification.type === 'reply'
                          ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                          : 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
                      }`}
                    >
                      <FontAwesomeIcon icon={notification.icon} className="w-4 h-4" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {notifications.length === 0 && (
            <div className="p-8 sm:p-12 text-center">
              <div className="text-6xl mb-4">🔔</div>
              <h3 className="text-xl font-semibold text-dark-900 dark:text-light-50">
                No notifications
              </h3>
              <p className="text-dark-600 dark:text-dark-300 mt-2">
                You're all caught up!
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default NotificationsPage;

