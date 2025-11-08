'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faSearch, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Header, Sidebar, Layout } from '@/components/layout';
import { Card, Input, Button } from '@/components/ui';
import Avatar from '@/components/ui/Avatar';

interface Message {
  id: string;
  user: {
    name: string;
    handle: string;
    avatar?: string;
    initials: string;
  };
  lastMessage: string;
  timestamp: string;
  unread: number;
}

interface ChatMessage {
  id: string;
  sender: 'me' | 'other';
  content: string;
  timestamp: string;
}

const MessagesPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState<string | null>('chat-1');
  const [messageText, setMessageText] = useState('');

  const currentUser = {
    name: 'John Doe',
    initials: 'JD',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe',
  };

  const chats: Message[] = [
    {
      id: 'chat-1',
      user: {
        name: 'Sarah Johnson',
        handle: 'sarahj',
        initials: 'SJ',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      },
      lastMessage: 'That sounds great! Let\'s connect soon.',
      timestamp: '5 minutes ago',
      unread: 2,
    },
    {
      id: 'chat-2',
      user: {
        name: 'Alex Chen',
        handle: 'alexchen',
        initials: 'AC',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
      },
      lastMessage: 'Thanks for the advice on React!',
      timestamp: '1 hour ago',
      unread: 0,
    },
    {
      id: 'chat-3',
      user: {
        name: 'Maria Garcia',
        handle: 'mgarcia',
        initials: 'MG',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
      },
      lastMessage: 'See you at the meetup!',
      timestamp: '3 hours ago',
      unread: 0,
    },
  ];

  const chatMessages: ChatMessage[] = [
    {
      id: '1',
      sender: 'other',
      content: 'Hey! How are you doing?',
      timestamp: '10 minutes ago',
    },
    {
      id: '2',
      sender: 'me',
      content: 'I\'m doing great! Just working on some projects.',
      timestamp: '9 minutes ago',
    },
    {
      id: '3',
      sender: 'other',
      content: 'That sounds great! Let\'s connect soon.',
      timestamp: '5 minutes ago',
    },
  ];

  return (
    <Layout
      header={<Header user={currentUser} onMenuClick={() => setSidebarOpen(!sidebarOpen)} />}
      sidebar={<Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} user={currentUser} />}
    >
      <div className="min-h-screen bg-light-50 dark:bg-dark-900">
        <div className="flex h-[calc(100vh-64px)]">
          {/* Chat List */}
          <div className="w-full sm:w-80 border-r border-light-200 dark:border-dark-700 flex flex-col bg-white dark:bg-dark-800">
            {/* Header */}
            <div className="p-4 border-b border-light-200 dark:border-dark-700">
              <h1 className="text-2xl font-bold text-dark-900 dark:text-light-50 mb-4">
                <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6 mr-2" />
                Messages
              </h1>
              <Input
                placeholder="Search conversations"
                icon={<FontAwesomeIcon icon={faSearch} className="w-4 h-4" />}
              />
            </div>

            {/* Chats */}
            <div className="flex-1 overflow-y-auto">
              {chats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  className={`w-full p-4 border-b border-light-100 dark:border-dark-700 text-left hover:bg-light-100 dark:hover:bg-dark-700 transition-colors ${
                    selectedChat === chat.id
                      ? 'bg-primary-50 dark:bg-primary-900 dark:bg-opacity-20'
                      : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar
                        src={chat.user.avatar}
                        initials={chat.user.initials}
                        size="md"
                      />
                      {chat.unread > 0 && (
                        <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                          {chat.unread}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-dark-900 dark:text-light-50">
                        {chat.user.name}
                      </p>
                      <p className="text-sm text-dark-600 dark:text-dark-300 truncate">
                        {chat.lastMessage}
                      </p>
                    </div>
                    <span className="text-xs text-dark-500 dark:text-dark-400 flex-shrink-0">
                      {chat.timestamp}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Window */}
          {selectedChat ? (
            <div className="hidden sm:flex flex-1 flex-col bg-light-50 dark:bg-dark-900">
              {/* Chat Header */}
              <div className="p-4 border-b border-light-200 dark:border-dark-700 bg-white dark:bg-dark-800">
                <div className="flex items-center gap-3">
                  <Avatar
                    src={chats.find(c => c.id === selectedChat)?.user.avatar}
                    initials={chats.find(c => c.id === selectedChat)?.user.initials || 'U'}
                    size="md"
                  />
                  <div>
                    <p className="font-semibold text-dark-900 dark:text-light-50">
                      {chats.find(c => c.id === selectedChat)?.user.name}
                    </p>
                    <p className="text-sm text-dark-500 dark:text-dark-400">
                      @{chats.find(c => c.id === selectedChat)?.user.handle}
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <Card
                      className={`max-w-xs px-4 py-2 ${
                        msg.sender === 'me'
                          ? 'bg-primary-600 text-white'
                          : 'bg-light-100 dark:bg-dark-700'
                      }`}
                    >
                      <p>{msg.content}</p>
                      <p className={`text-xs mt-1 ${
                        msg.sender === 'me'
                          ? 'text-primary-100'
                          : 'text-dark-500 dark:text-dark-400'
                      }`}>
                        {msg.timestamp}
                      </p>
                    </Card>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-light-200 dark:border-dark-700 bg-white dark:bg-dark-800">
                <div className="flex gap-3">
                  <Input
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                  />
                  <Button
                    size="md"
                    icon={<FontAwesomeIcon icon={faPaperPlane} className="w-4 h-4" />}
                    disabled={!messageText.trim()}
                  ><></></Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden sm:flex flex-1 items-center justify-center bg-light-50 dark:bg-dark-900">
              <div className="text-center">
                <div className="text-6xl mb-4">💬</div>
                <p className="text-dark-600 dark:text-dark-300">
                  Select a chat to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MessagesPage;

