'use client';

import React from "react";
import { ArrowLeft, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
const ThreadDetailHeaderDesktop: React.FC = () => {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };
    return (
        <>
            <div className="flex [padding-inline-start:8px] items-center justify-start">
                <div className="w-[36px]"></div>
            </div>
            <div className="flex justify-between [column-gap:8px] items-center w-full relative">
                <button className="rounded-full hover:bg-[#1d1d1d] cursor-pointer p-2 transition absolute -left-10" onClick={handleBack}>
                    <ArrowLeft size={20}/>
                </button>
                <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <h1 className="text-sm font-bold">ThreadLy</h1>
                    <p className="text-[12px] text-[var(--barcelona-secondary-text)]">259K views</p>
                </div>
                <button className="rounded-full hover:bg-[#1d1d1d] cursor-pointer p-2 transition absolute -right-10">
                    <MoreHorizontal size={20}/>
                </button>
            </div>
            <div className="h-[60px]
                [column-gap:8px]
                [padding-inline-end:8px]
                flex
                items-center
                justify-end
            ">
                <div className="
                    [border-start-end-radius:50%]
                    [animation-duration:.3s;]
                    [border-end-start-radius:50%]
                    [border-end-end-radius:50%;]
                    [border-start-start-radius:50%;]
                    [animation-name:xekv6nw-B;]
                ">
                </div>
            </div>
        </>
    );
}

export default ThreadDetailHeaderDesktop;