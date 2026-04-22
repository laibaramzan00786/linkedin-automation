
'use client'

import React from 'react';
import Header from '../../components/dashboard/Header'; 
import Sidebar from '../../components/dashboard/Sidebar';
import { ThemeProvider } from 'next-themes';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <div
        className="flex min-h-screen relative overflow-hidden transition-colors duration-300"
        style={{
          background: "var(--bg)",
          color: "var(--text)"
        }}
      >
       
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(37,99,235,0.08), transparent 50%)",
          }}
        />

        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <div className="flex-1 flex flex-col relative z-10">
          <Header onMenuClick={() => setIsSidebarOpen(true)} />

          <main className="p-4 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default DashboardLayout;