import React from 'react';
import InstagramIconBrand from "@/components/ui/InstagramIconBrand";
export const LoginSidebar: React.FC = () => {
    return (
        <aside className="hidden lg:block lg:fixed 2xl:right-70 xl:right-30 max-[1300px]:right-2 top-14 w-80 h-80 mt-4 rounded-4xl bg-[#1E1E1E] border-1 border-[#383939] p-4">
            <div className="flex flex-col items-center justify-center h-full">
                <h2 className="text-white text-xl font-bold mb-2 text-center">Log in or sign up for Threadly</h2>
                <p className="text-[#777777] text-center mb-6 text-[16px] font-[450]">
                    See what people are talking about and join the conversation.
                </p>
                <button className="w-full bg-[#0A0A0A] text-[#ECEEF0] rounded-3xl py-7 font-semibold flex items-center justify-center gap-2 mb-4 cursor-pointer transition-colors">
                    <InstagramIconBrand />
                    Continue with Instagram
                </button>
                <button className="text-[#777777] text-center mt-4 text-[16px] font-[450] cursor-pointer">
                    Log in with username instead
                </button>
            </div>
        </aside>
    );
};