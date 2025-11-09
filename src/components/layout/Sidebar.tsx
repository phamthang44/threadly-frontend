'use client';

import React, { useState } from 'react';
import { Search, Plus, Heart, User } from 'lucide-react';
import HomeIconFilled from "@/components/ui/HomeIconFilled";
import HomeIcon from "@/components/ui/HomeIcon";

export const Sidebar: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'home' | 'search' | 'create' | 'activity' | 'profile'>('home');

    const tabs = [
        { id: 'home', icon: HomeIcon, label: 'Home' },
        { id: 'search', icon: Search, label: 'Search' },
        { id: 'create', icon: Plus, label: 'Create' },
        { id: 'activity', icon: Heart, label: 'Activity' },
        { id: 'profile', icon: User, label: 'Profile' },
    ] as const;

    return (
        <aside className="hidden md:flex flex-col justify-center items-center fixed left-0 top-0 h-screen w-25 bg-[#0A0A0A] py-6 gap-8">
            <nav className="flex flex-col gap-6">
                {tabs.map(({ id, icon: Icon, label }) => (
                    <button
                        key={id}
                        onClick={() => setActiveTab(id)}
                        className={`py-4 px-6 hover:bg-[#1D1D1D] rounded-2xl cursor-pointer transition-colors ${
                            activeTab === id ? 'text-white' : 'text-gray-400'
                        }`}
                        aria-label={label}
                    >
                        {id === 'home' && activeTab === 'home' ? (
                            <HomeIconFilled />
                        ) : (
                            <Icon
                                className="w-7 h-7"
                                fill={id !== 'search' && activeTab === id ? 'currentColor' : 'none'}
                            />
                        )}
                    </button>
                ))}
            </nav>
        </aside>
    );
};
