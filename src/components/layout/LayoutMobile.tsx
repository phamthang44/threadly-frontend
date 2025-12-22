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
            <main className="flex-1 pb-8 overflow-y-auto custom-scrollbar dark:bg-[#101010]">
                {children}
            </main>

            {/* Mobile Navigation - Mobile only (visible on mobile, hidden on desktop) */}
            <div className="block md:hidden">
                {mobileNavBar}
            </div>
        </div>
    );
};

export default LayoutMobile;
