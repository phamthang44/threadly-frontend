// src/app/page.tsx
import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/features/header/components/Header';
import { LoginSidebar } from '@/components/layout/LoginSidebar';
import Layout from '@/components/layout/Layout';
import { Thread as ThreadType } from '@/types/thread';
import HomeFeed from "@/features/threads/components/HomeFeed";
import {MobileNav} from "@/components/layout/MobileNav";

const ThreadsApp: React.FC = () => {
    const sampleThreads: ThreadType[] = [
        {
            id: 1,
            username: 'controlracing_th',
            avatar: '',
            timestamp: '1d',
            verified: false,
            content: 'CE28"',
            hashtags: ['controlracing', 'godung88', 'honda', 'civic', 'ef', 'ef9', 'vtec', 'jdm', 'ce28', 'bseries', 'hondanation', 'fblifestyle'],
            image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop',
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
            header={<Header />}
            mobileNavbar={<MobileNav />}
            rightSidebar={<LoginSidebar />}
        >
            <HomeFeed sampleThreads={sampleThreads} />
            {/*<div className="flex gap-0">*/}
            {/*    <div className="flex-1">*/}
            {/*        */}
            {/*    </div>*/}
            {/*    <div className="hidden lg:block w-80 flex-shrink-0">*/}
            {/*        */}
            {/*    </div>*/}
            {/*</div>*/}
        </Layout>
    );
};

export default ThreadsApp;
