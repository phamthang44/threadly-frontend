// src/components/layout/LayoutMobile.tsx
import React from 'react';

interface LayoutMobileProps {
    children: React.ReactNode;
    header?: React.ReactNode;
    mobileNavBar?: React.ReactNode;
}

const LayoutMobile: React.FC<LayoutMobileProps> = ({ children, header, mobileNavBar }) => {
    return (
        <div className="flex flex-col h-screen dark:bg-[#101010] relative">
            {/* Header */}
            {header}

            {/* Main Content with padding for fixed elements */}
            <main className="flex-1 pt-16 pb-20 overflow-y-auto">
                {children}
            </main>

            {/* Sidebar (Bottom Navigation) */}
            {mobileNavBar}
        </div>
    );
};

export default LayoutMobile;
