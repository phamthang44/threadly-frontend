// src/components/layout/LayoutDesktop.tsx
import React from "react";

interface LayoutDesktopProps {
    children: React.ReactNode;
    header?: React.ReactNode;
    sidebar?: React.ReactNode;
    rightSidebar?: React.ReactNode;
}

const LayoutDesktop: React.FC<LayoutDesktopProps> = ({
                                                         children,
                                                         header,
                                                         sidebar,
                                                         rightSidebar,
                                                     }) => {
    return (
        <div className="flex h-screen overflow-hidden bg-light-50 dark:bg-[#0A0A0A]">
            {/* LEFT SIDEBAR */}
            {sidebar}

            {/* MAIN CONTENT */}
            <main className="flex-1 flex justify-center pr-60 ">
                <div className="max-w-2xl mx-auto w-full bg-[#0A0A0A] min-h-screen relative">
                    {header}
                    <div className="absolute top-18 w-full h-6 bg-[#101010] rounded-t-full border-t border-l border-r border-[#383939] z-12"></div>
                    <div className="border-l border-r border-t-0 border-[#383939] rounded-t-4xl pb-3 bg-[#0A0A0A] h-full">
                        {/*<div className="h-full overflow-y-scroll hide-scrollbar">*/}
                        {/*    */}
                        {/*</div>*/}
                        {children}
                    </div>
                </div>
            </main>

            {/* RIGHT SIDEBAR (FIXED) */}
            {rightSidebar}
        </div>
    );
};

export default LayoutDesktop;
