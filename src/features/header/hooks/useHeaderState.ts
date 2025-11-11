// src/hooks/useHeaderState.ts
'use client';
import { useEffect, useState } from 'react';

export const useHeaderState = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // placeholder

    useEffect(() => {
        // Find the scrollable main content area
        const scrollContainer = document.querySelector('.scroll-container');

        if (!scrollContainer) return;

        const handleScroll = () => {
            setIsScrolled(scrollContainer.scrollTop > 0);
        };

        scrollContainer.addEventListener('scroll', handleScroll);
        return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }, []);

    return { isScrolled, isAuthenticated };
};
