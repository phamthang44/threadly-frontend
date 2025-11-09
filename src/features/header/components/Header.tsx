'use client';
import { HeaderDesktop } from './HeaderDesktop';
import { HeaderMobile } from './HeaderMobile';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import React from "react";

export const Header: React.FC = () => {
    const isMobile = useMediaQuery('(max-width: 767px)'); // md breakpoint
    return isMobile ? <HeaderMobile /> : <HeaderDesktop />;
};
