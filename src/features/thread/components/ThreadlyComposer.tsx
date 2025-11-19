import {Avatar, Tooltip} from "@/components/ui";
import React from "react";

const ThreadlyComposer = () => (
    <div className="flex items-center bg-[#181818]">
        <div className="flex items-center gap-4 flex-1">
            <Avatar
                src="/default-avatar.png"
                alt="User Avatar"
                size="lg"
                className="cursor-pointer"
            />
            <button className="text-[#777777] cursor-text w-full py-2 flex">
                <span>
                    What&#39;s new?
                </span>
            </button>
        </div>
        <div className="ml-auto flex items-center justify-center bg-[#181818] border-1 border-[#383939] rounded-xl px-4 py-2 cursor-pointer">
            <div className="text-white font-semibold">Post</div>
        </div>
    </div>
)

export default ThreadlyComposer;