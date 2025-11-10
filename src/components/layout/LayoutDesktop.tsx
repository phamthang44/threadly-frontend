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
        <div className="flex h-screen overflow-y-auto bg-light-50 dark:bg-[#0A0A0A]">
            {/* LEFT SIDEBAR */}
            {sidebar}

            {/* MAIN CONTENT */}
            {/*overflow-y-auto h-screen pr-100 flex-1 flex justify-center*/}
            <main className="flex-1 flex justify-center overflow-y-auto pr-60">
                <div className="max-w-2xl mx-auto w-full">
                    {header}
                    {children}
                </div>
            </main>

            {/* RIGHT SIDEBAR (FIXED) */}
            {rightSidebar}
        </div>
    );
};

export default LayoutDesktop;
