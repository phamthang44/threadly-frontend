// src/components/layout/LayoutDesktop.tsx
import React from "react";

interface LayoutDesktopProps {
    children: React.ReactNode;
    header?: React.ReactNode;
    sidebar?: React.ReactNode;
    rightSidebar?: React.ReactNode;
    isAuthenticated?: boolean;
}

const LayoutDesktop: React.FC<LayoutDesktopProps> = ({
                                                         children,
                                                         header,
                                                         sidebar,
                                                         rightSidebar,
                                                         isAuthenticated = false,
                                                     }) => {
    return (
        <div className="flex h-screen overflow-hidden bg-light-50 dark:bg-[#0A0A0A]">
            {/* LEFT SIDEBAR */}
            {sidebar}

            {/* MAIN CONTENT */}
            <main className={`flex-1 flex justify-center ${isAuthenticated ? '' : 'pr-60'}`}>
                <div className="max-w-2xl mx-auto w-full bg-[#0A0A0A] min-h-screen relative">
                    {header}
                    <div className="absolute top-17 w-full h-6 bg-[#181818] rounded-t-full border-t border-l border-r border-[#383939] z-12"></div>
                    <div className="border-l border-r border-t-0 border-[#383939] rounded-t-4xl pb-3 bg-[#0A0A0A] h-full">
                        {children}
                    </div>
                </div>
            </main>

            {/* RIGHT SIDEBAR (FIXED) */}
            {isAuthenticated ? null : rightSidebar}
        </div>
    );
};

export default LayoutDesktop;
