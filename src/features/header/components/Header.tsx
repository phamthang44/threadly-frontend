'use client';
import { HeaderDesktop } from './HeaderDesktop';
import { HeaderMobile } from './HeaderMobile';
import { useMediaQuery } from '@/hooks/useMediaQuery';

type TabType = 'foryou' | 'following';

interface HeaderProps {
    // You can add props if needed
    isAuthenticated: boolean;
    activeTab?: TabType;
    onTabChange: (tab: TabType) => void;
}

import React from "react";

export const Header: React.FC<HeaderProps> = ({isAuthenticated, activeTab, onTabChange}) => {
    const isMobile = useMediaQuery('(max-width: 767px)'); // md breakpoint
    return isMobile ? <HeaderMobile /> : <HeaderDesktop isAuthenticated={isAuthenticated} activeTab={activeTab} onTabChange={onTabChange} />;
};
