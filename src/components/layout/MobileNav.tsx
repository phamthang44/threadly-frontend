'use client';

import React, { useState } from 'react';
import { Search, Plus, Heart, User } from 'lucide-react';
import HomeIconFilled from "@/components/ui/HomeIconFilled";
import HomeIcon from "@/components/ui/HomeIcon";

export const MobileNav: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'home' | 'search' | 'create' | 'activity' | 'profile'>('home');

    const tabs = [
        { id: 'home', icon: HomeIcon, label: 'Home' },
        { id: 'search', icon: Search, label: 'Search' },
        { id: 'create', icon: Plus, label: 'Create' },
        { id: 'activity', icon: Heart, label: 'Activity' },
        { id: 'profile', icon: User, label: 'Profile' },
    ] as const;

    return (
        <nav className={`absolute bottom-0 left-0 right-0 bg-[#101010]/40 backdrop-blur-sm border-t border-[#383939] px-6 py-2 z-50 transition-colors duration-200`}>
            <div className="flex items-center justify-around">
                {tabs.map(({ id, icon: Icon, label }) => (
                    <button
                        key={id}
                        onClick={() => setActiveTab(id)}
                        className={`p-2 transition-colors ${
                            activeTab === id ? 'text-white' : 'text-gray-400'
                        } ${id === 'create' ? 'px-5 py-1 rounded-lg backdrop-blur-sm bg-[#3A3A3A]/50' : ''}`}
                        aria-label={label}
                    >
                        {id === 'home' && activeTab === 'home' ? (
                            <HomeIconFilled />
                        ) : (
                            <Icon
                                className={`${id === 'create' ? 'w-8 h-8' : 'w-6 h-6'}`}
                                fill={id !== 'search' && activeTab === id ? 'currentColor' : 'none'}
                            />
                        )}
                    </button>
                ))}
            </div>
        </nav>
    );
};
