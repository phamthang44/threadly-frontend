// src/app/page.tsx
import React from 'react';
import { Sidebar } from '@/features/navigation/components/Sidebar';
import { Header } from '@/features/header/components/Header';
import { LoginSidebar } from '@/components/ui/organisms/LoginSidebar';
import Layout from '@/components/layout/Layout';
import { sampleThreads } from '@/utils/mockData';
import HomeFeed from "@/features/feed/components/HomeFeed";
import {MobileNav} from "@/features/navigation/components/MobileNav";
const ThreadsApp: React.FC = () => {

    return (
        <Layout
            sidebar={<Sidebar />}
            header={<Header />}
            mobileNavbar={<MobileNav />}
            rightSidebar={<LoginSidebar />}
        >
            <HomeFeed sampleThreads={sampleThreads} />
        </Layout>
    );
};

export default ThreadsApp;
