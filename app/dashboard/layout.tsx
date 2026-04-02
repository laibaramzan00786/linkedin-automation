"use client"
import React from 'react';
import Header from '../../components/dashboard/Header'; 
import Sidebar from '../../components/dashboard/Sidebar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen bg-[#050505] text-white relative overflow-hidden">
     
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.08),transparent_50%)] pointer-events-none" />
      
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col relative z-10">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;