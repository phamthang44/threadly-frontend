// src/app/page.tsx
'use client';

import React, { useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { Sidebar } from '@/features/navigation/components/Sidebar';
import { Header } from '@/features/header/components/Header';
import { LoginSidebar } from '@/components/layout/LoginSidebar';
import Layout from '@/components/layout/Layout';
import { Thread as ThreadType } from '@/types/thread';
import HomeFeed from "@/features/threads/components/HomeFeed";
import {MobileNav} from "@/features/navigation/components/MobileNav";
type TabType = 'foryou' | 'following';
const ThreadsApp: React.FC = () => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const [activeTab, setActiveTab] = useState<TabType>('foryou');
    const sampleThreads: ThreadType[] = [
        {
            id: 1,
            username: 'controlracing_th',
            avatar: '',
            timestamp: '1d',
            verified: false,
            content: 'CE28"',
            hashtags: ['controlracing', 'godung88', 'honda', 'civic', 'ef', 'ef9', 'vtec', 'jdm', 'ce28', 'bseries', 'hondanation', 'fblifestyle'],
            image: '',
            likes: 225,
            comments: 5,
            reposts: 5,
            shares: 2
        },
        {
            id: 2,
            username: 'sportskeedacricket',
            avatar: '',
            timestamp: '13h',
            verified: true,
            badge: 'BREAKING',
            content: 'Kane Williamson is set to play for Durban\'s Super Giants in the SA20 2025-26 season. 🏏',
            hashtags: ['Cricket', 'DSG', 'Williamson', 'Sportskeeda'],
            image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&h=600&fit=crop',
            likes: 342,
            comments: 12,
            reposts: 8,
            shares: 5
        },
        {
            id: 3,
            username: 'sportskeedacricket',
            avatar: '',
            timestamp: '13h',
            verified: true,
            badge: 'BREAKING',
            content: 'Kane Williamson is set to play for Durban\'s Super Giants in the SA20 2025-26 season. 🏏',
            hashtags: ['Cricket', 'DSG', 'Williamson', 'Sportskeeda'],
            image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&h=600&fit=crop',
            likes: 342,
            comments: 12,
            reposts: 8,
            shares: 5
        },
        {
            id: 4,
            username: 'sportskeedacricket',
            avatar: '',
            timestamp: '13h',
            verified: true,
            badge: 'BREAKING',
            content: 'Kane Williamson is set to play for Durban\'s Super Giants in the SA20 2025-26 season. 🏏',
            hashtags: ['Cricket', 'DSG', 'Williamson', 'Sportskeeda'],
            image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&h=600&fit=crop',
            likes: 342,
            comments: 12,
            reposts: 8,
            shares: 5
        }
    ];



    return (
        <Layout
            sidebar={<Sidebar />}
            header={<Header isAuthenticated={isAuthenticated} activeTab={activeTab} onTabChange={setActiveTab} />}
            mobileNavbar={<MobileNav />}
            rightSidebar={<LoginSidebar isAuthenticated={isAuthenticated} />}
            isAuthenticated={isAuthenticated}
        >
            <HomeFeed sampleThreads={sampleThreads} isAuthenticated={isAuthenticated} />

        </Layout>
    );
};

export default ThreadsApp;
