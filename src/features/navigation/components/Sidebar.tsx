'use client';

import React, {useRef, useState} from 'react';
import Link from 'next/link';
import {
    Search,
    Plus,
    Heart,
    User,
} from 'lucide-react';
import {HomeIconFilled, HomeIcon, ThreadLogoBrandWhite, Tooltip, ThreadLogoBrandBlack} from '@/components/ui';
import { LoginRequiredModalDesktop } from "@/features/auth/components";
import { usePathname } from "next/navigation";
import { useLoginRequired } from "@/features/auth/hooks";
import MoreIcon from "../../../components/ui/atoms/MoreIcon";
import ActionMenu , {MenuGroup} from "@/components/ui/organisms/ActionMenu";
import ThemeSwitcher from "@/components/ui/molecules/ThemeSwitcher";
import {useTheme} from "next-themes";

export const Sidebar: React.FC = () => {
    const pathname = usePathname();
    const { isOpen, closeModal, featureName, checkAuthAndProceed } = useLoginRequired();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const triggerRef = useRef<HTMLElement | null>(null);
    const theme = useTheme();

    console.log('Current theme:', theme.theme);

    const appearanceSubmenu: MenuGroup[] = [
        {
            id: 'theme-control-group',
            items: [
                {
                    id: 'theme-switcher',
                    label: 'Appearance',
                    subMenuTitle: 'Appearance',
                    customRender: <ThemeSwitcher />
                },
            ]
        }
    ];

    const mainMenu: MenuGroup[] = [
        {
            id: 'settings-group',
            items: [
                {
                    id: 'appearance',
                    label: 'Appearance',
                    submenu: appearanceSubmenu,
                    subMenuTitle: 'Appearance'
                },
                { id: 'insights', label: 'Insights' },
            ]
        },
        {
            id: 'saved-group',
            items: [
                { id: 'saved', label: 'Saved' },
                { id: 'liked', label: 'Liked' },
            ]
        },
        {
            id: 'logout-group',
            items: [
                { id: 'report', label: 'Report a problem' },
                { id: 'logout', label: 'Log out', variant: 'danger' },
            ]
        }
    ];
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
            <aside className="hidden md:flex flex-col justify-center items-center fixed left-0 top-0 h-screen w-25 bg-[var(--bg-body)] py-6 gap-8 z-2">
                <Tooltip content="Threadly" position={"right"} delay={500}>
                    <Link href="/" className="w-8 h-8 cursor-pointer">
                        {theme.theme === 'light' ? <ThreadLogoBrandBlack className="w-8 h-8" /> : <ThreadLogoBrandWhite className="w-8 h-8" />}
                    </Link>
                </Tooltip>
                <nav className="flex flex-col gap-6 flex-1 items-center justify-center">

                    {tabs.map((tab) => {
                        const active = isActive(tab.href);
                        const Icon = tab.icon;
                        const isCreateBtn = tab.id === 'create';

                        return (
                            <Tooltip content={tab.label} position={"right"} delay={500} key={tab.id} className={"flex items-center justify-center"}>
                                <Link
                                    key={tab.id}
                                    href={tab.href}
                                    onClick={(e) => handleClick(tab, e)}
                                    className={`py-4 px-6 rounded-2xl cursor-pointer transition-colors ${
                                        isCreateBtn
                                            ? 'bg-[var(--sidebar-button-bg-primary)] hover:bg-[var(--sidebar-button-bg-primary-hover)] text-[var(--sidebar-text-primary)]'
                                            : `${active ? 'text-[var(--sidebar-text-active)]' : 'text-[var(--sidebar-text-primary)]'} hover:bg-[var(--sidebar-button-bg-primary)]`
                                    }`}
                                    aria-label={tab.label}
                                >
                                    {tab.id === 'home' && active ? (
                                        <HomeIconFilled />
                                    ) : (
                                        <Icon
                                            className={`w-7 h-7 ${isCreateBtn ? 'hover:text-[var(--sidebar-create-button-text-hover)]' : ''}`}
                                            fill={tab.id !== 'search' && active ? 'currentColor' : 'none'}
                                        />
                                    )}
                                </Link>
                            </Tooltip>
                        );
                    })}
                </nav>
                <div>
                    <button className="cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)} ref={(node) => {
                        triggerRef.current = node;
                    }}>
                        <MoreIcon className="text-[var(--barcelona-secondary-icon)] hover:text-[var(--barcelona-primary-icon)]" />
                    </button>
                    <ActionMenu
                        triggerRef={triggerRef}
                        isOpen={isMenuOpen}
                        onClose={() => setIsMenuOpen(false)}
                        groups={mainMenu}
                    />
                </div>
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
