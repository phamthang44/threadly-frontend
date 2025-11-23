'use client';
import { HeaderDesktop } from './HeaderDesktop';
import { HeaderMobile } from './HeaderMobile';
import { useMediaQuery } from '@/hooks/useMediaQuery';

type TabType = 'foryou' | 'following';


import React, {useState} from "react";
import {useAppSelector} from "@/store/hooks";

export const Header: React.FC = () => {

    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const [activeTab, setActiveTab] = useState<TabType>('foryou');

    const isMobile = useMediaQuery('(max-width: 767px)'); // md breakpoint
    return isMobile ? <HeaderMobile /> : <HeaderDesktop isAuthenticated={isAuthenticated} activeTab={activeTab} onTabChange={setActiveTab} />;
};
