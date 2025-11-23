// `src/components/layout/LoginSidebar.tsx`
'use client';
import React from 'react';
import Link from 'next/link';
import InstagramIconBrand from "@/components/ui/atoms/InstagramIconBrand";
import {useAppSelector} from "@/store/hooks";



export const LoginSidebar: React.FC = () => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    if (isAuthenticated) {
        return null;
    }

    return (
        <aside className="hidden [@media(min-width:1200px)]:block fixed right-40 top-11
w-80 h-80 mt-4 rounded-4xl bg-[#1E1E1E] border border-[#383939] p-4">
            <div className="flex flex-col items-center justify-center h-full">
                <h2 className="text-white text-xl font-bold mb-2 text-center">Log in or sign up for Threadly</h2>
                <p className="text-[#777777] text-center mb-6 text-[16px] font-[450]">
                    See what people are talking about and join the conversation.
                </p>
                <button className="w-full bg-[#0A0A0A] text-[#ECEEF0] rounded-3xl py-7 font-semibold flex items-center justify-center gap-2 mb-4 cursor-pointer transition-colors">
                    <InstagramIconBrand className="w-6 h-6" />
                    Continue with Instagram
                </button>
                <Link
                    href="/login?mode=manual"
                    className="text-[#777777] text-center mt-4 text-[16px] font-[450] cursor-pointer"
                >
                    Log in with username instead
                </Link>
            </div>
        </aside>
    );
};
