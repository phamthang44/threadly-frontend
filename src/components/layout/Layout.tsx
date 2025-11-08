import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, header, sidebar }) => {
  return (
    <div className="flex h-screen bg-light-50 dark:bg-dark-900">
      {/* Sidebar */}
      {sidebar}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        {header}

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

