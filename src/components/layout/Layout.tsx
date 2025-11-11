// src/components/layout/Layout.tsx
'use client';
import React, { useState, useEffect } from 'react';
import LayoutDesktop from './LayoutDesktop';
import LayoutMobile from './LayoutMobile';

interface LayoutProps {
    children: React.ReactNode;
    header?: React.ReactNode;
    sidebar?: React.ReactNode;
    rightSidebar?: React.ReactNode;
    mobileNavbar?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, header, sidebar, rightSidebar, mobileNavbar }) => {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile ? (
        <LayoutMobile header={header} mobileNavBar={mobileNavbar}>
            {children}
        </LayoutMobile>
    ) : (
        <LayoutDesktop header={header} sidebar={sidebar} rightSidebar={rightSidebar}>
            {children}
        </LayoutDesktop>
    );
};

export default Layout;
