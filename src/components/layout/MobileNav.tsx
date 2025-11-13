'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Plus, Heart, User } from 'lucide-react';
import HomeIconFilled from "@/components/ui/HomeIconFilled";
import HomeIcon from "@/components/ui/HomeIcon";
import { useLoginRequired } from '@/hooks/useLoginRequired';
import { LoginRequiredModal } from '@/components/ui';

export const MobileNav: React.FC = () => {
    const pathname = usePathname();
    const { isOpen, closeModal, featureName, checkAuthAndProceed } = useLoginRequired();

    const tabs = [
        { id: 'home', icon: HomeIcon, label: 'Home', href: '/', protected: false },
        { id: 'search', icon: Search, label: 'Search', href: '/search', protected: false },
        { id: 'create', icon: Plus, label: 'Create', href: '/create', protected: true },
        { id: 'activity', icon: Heart, label: 'Activity', href: '/activity', protected: true },
        { id: 'profile', icon: User, label: 'Profile', href: '/profile', protected: true },
    ] as const;

    const isActive = (href: string) => {
        return pathname === href || pathname.startsWith(href + '/');
    };

    const handleClick = (tab: typeof tabs[number]) => {
        if (tab.protected) {
            checkAuthAndProceed(() => {}, tab.label);
        }
    };

    return (
        <nav className={`absolute bottom-0 left-0 right-0 bg-[#101010]/40 backdrop-blur-sm border-t border-[#383939] px-6 py-2 z-50 transition-colors duration-200`}>
            <div className="flex items-center justify-around">
                {tabs.map(({ id, icon: Icon, label, href, protected: isProtected }) => {
                    const active = isActive(href);

                    return (
                        <Link
                            key={id}
                            href={href}
                            onClick={(e) => isProtected && handleClick(tabs.find(t => t.id === id)!)}
                            className={`p-2 transition-colors ${
                                active ? 'text-white' : 'text-gray-400'
                            } ${id === 'create' ? 'px-5 py-1 rounded-lg backdrop-blur-sm bg-[#3A3A3A]/50' : ''}`}
                            aria-label={label}
                        >
                            {id === 'home' && active ? (
                                <HomeIconFilled />
                            ) : (
                                <Icon
                                    className={`${id === 'create' ? 'w-8 h-8' : 'w-6 h-6'}`}
                                    fill={id !== 'search' && active ? 'currentColor' : 'none'}
                                />
                            )}
                        </Link>
                    );
                })}
            </div>
            <LoginRequiredModal isOpen={isOpen} onClose={closeModal} featureName={featureName} />
        </nav>
    );
};
