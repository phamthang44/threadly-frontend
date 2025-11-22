// src/app/page.tsx
'use client';

import React, { useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { Sidebar } from '@/features/navigation/components/Sidebar';
import { Header } from '@/features/header/components/Header';
import { LoginSidebar } from '@/components/ui/organisms/LoginSidebar';
import Layout from '@/components/layout/Layout';
import { sampleThreads } from '@/utils/mockData';
import HomeFeed from "@/features/feed/components/HomeFeed";
import {MobileNav} from "@/features/navigation/components/MobileNav";
type TabType = 'foryou' | 'following';
const ThreadsApp: React.FC = () => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const [activeTab, setActiveTab] = useState<TabType>('foryou');




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
