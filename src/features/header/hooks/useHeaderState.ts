// src/hooks/useHeaderState.ts
'use client';
import { useEffect, useState } from 'react';

export const useHeaderState = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // placeholder

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 0);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return { isScrolled, isAuthenticated };
};
