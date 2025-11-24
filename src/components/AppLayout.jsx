import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function AppLayout({ children, activeTab, onTabChange, isDarkMode, toggleTheme }) {
  return (
    <div className="min-h-screen bg-cookie-bg font-sans text-cookie-text transition-colors duration-300">
      <Sidebar
        activeTab={activeTab}
        onTabChange={onTabChange}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      <Topbar />

      <main className="pl-64 pt-20 min-h-screen">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
