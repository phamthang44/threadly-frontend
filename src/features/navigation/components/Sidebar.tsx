'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Plus, Heart, User } from 'lucide-react';
import { HomeIconFilled, HomeIcon, ThreadLogoBrandWhite } from '@/components/ui';
import {LoginRequiredModalDesktop} from "@/features/auth/components";
import { usePathname } from "next/navigation";
import { useLoginRequired } from "@/features/auth/hooks/useLoginRequired";

export const Sidebar: React.FC = () => {
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

    const handleClick = (tab: (typeof tabs)[number], e: React.MouseEvent) => {
        if (tab.protected) {
            e.preventDefault();
            checkAuthAndProceed(() => {}, tab.label);
        }
    };

    return (
        <>
            <aside className="hidden md:flex flex-col justify-center items-center fixed left-0 top-0 h-screen w-25 bg-[#0A0A0A] py-6 gap-8">
                <Link href="/" className="w-8 h-8 cursor-pointer">
                    <ThreadLogoBrandWhite className="w-8 h-8" />
                </Link>
                <nav className="flex flex-col gap-6">
                    {tabs.map((tab) => {
                        const active = isActive(tab.href);
                        const Icon = tab.icon;

                        return (
                            <Link
                                key={tab.id}
                                href={tab.href}
                                onClick={(e) => handleClick(tab, e)}
                                className={`py-4 px-6 hover:bg-[#1D1D1D] rounded-2xl cursor-pointer transition-colors ${
                                    active ? 'text-white' : 'text-gray-400'
                                }`}
                                aria-label={tab.label}
                            >
                                {tab.id === 'home' && active ? (
                                    <HomeIconFilled />
                                ) : (
                                    <Icon
                                        className="w-7 h-7"
                                        fill={tab.id !== 'search' && active ? 'currentColor' : 'none'}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Modal */}
            <LoginRequiredModalDesktop
                isOpen={isOpen}
                onClose={closeModal}
                featureName={featureName}
            />
        </>
    );
};
