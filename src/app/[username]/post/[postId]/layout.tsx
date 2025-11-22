import React from "react";
import {Sidebar} from "@/features/navigation/components/Sidebar";
import {Header} from "@/features/header/components/Header";
import Layout from "@/components/layout/Layout";
import HomeFeedAuthenticated from "@/features/thread/components/HomeFeedAuthenticated";
import {ThreadDetailHeader} from "@/features/thread/components";

interface ThreadDetailPageLayoutProps {
    children: React.ReactNode;
}

export default function ThreadDetailPageLayout({ children }: ThreadDetailPageLayoutProps) {
    return (
        <Layout
            sidebar={<Sidebar />}
            header={<ThreadDetailHeader />}
        >
            {children}
        </Layout>
    );
}