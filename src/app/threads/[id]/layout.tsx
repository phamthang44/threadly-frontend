import React from "react";

interface ThreadDetailPageLayoutProps {
    children: React.ReactNode;
}

export default function ThreadDetailPageLayout({ children }: ThreadDetailPageLayoutProps) {
    return <>{children}</>;
}