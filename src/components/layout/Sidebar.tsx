import React from 'react';
import { Home, Search, Plus, Heart, User } from 'lucide-react';

export const Sidebar: React.FC = () => {
    return (
        <aside className="hidden md:flex flex-col justify-center items-center fixed left-0 top-0 h-screen w-25 bg-[#0A0A0A] py-6 gap-8">
            <nav className="flex flex-col gap-6">
                <button className="text-white py-4 px-6 hover:bg-[#1D1D1D] rounded-2xl cursor-pointer" aria-label="Home">
                    <Home className="w-7 h-7" />
                </button>
                <button className="text-gray-400 py-4 px-6 hover:bg-[#1D1D1D] rounded-2xl cursor-pointer" aria-label="Search">
                    <Search className="w-7 h-7" />
                </button>
                <button className="text-gray-400 py-4 px-6 hover:bg-[#1D1D1D] rounded-2xl cursor-pointer" aria-label="Create">
                    <Plus className="w-7 h-7" />
                </button>
                <button className="text-gray-400 py-4 px-6 hover:bg-[#1D1D1D] rounded-2xl cursor-pointer" aria-label="Activity">
                    <Heart className="w-7 h-7" />
                </button>
                <button className="text-gray-400 py-4 px-6 hover:bg-[#1D1D1D] rounded-2xl cursor-pointer" aria-label="Profile">
                    <User className="w-7 h-7" />
                </button>
            </nav>
        </aside>
    );
};
