import React from 'react';
import { Home, Search, Plus, Heart, User } from 'lucide-react';

export const MobileNav: React.FC = () => {
    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 backdrop-blur-sm bg-[#101010]/10 border-t border-gray-800 px-6 py-2 z-50">
            <div className="flex items-center justify-around">
                <button className="text-white p-2" aria-label="Home">
                    <Home className="w-6 h-6" />
                </button>
                <button className="text-gray-400 p-2" aria-label="Search">
                    <Search className="w-6 h-6" />
                </button>
                <button className="text-gray-400 px-5 py-1 rounded-lg backdrop-blur-sm bg-[#3A3A3A]/50" aria-label="Create">
                    <Plus className="w-8 h-8 rounded-lg text-[#4D4D4D]" />
                </button>
                <button className="text-gray-400 p-2" aria-label="Activity">
                    <Heart className="w-6 h-6" />
                </button>
                <button className="text-gray-400 p-2" aria-label="Profile">
                    <User className="w-6 h-6" />
                </button>
            </div>
        </nav>
    );
};