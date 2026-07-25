import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { useUIStore } from '@/store/useUIStore';

export const DashboardLayout: React.FC = () => {
  const { sidebarOpen } = useUIStore();

  return (
    <div className="flex h-screen bg-[#0A0A0A] text-[#F5F5F5] overflow-hidden selection:bg-[#D90429] selection:text-[#F5F5F5]">
      {/* Sidebar Frame */}
      <Sidebar />

      {/* Main Workspace Frame */}
      <div className={`flex flex-col flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Top Command Bar */}
        <TopNav />

        {/* Dynamic Outlet */}
        <main className="flex-1 overflow-y-auto bg-[#0A0A0A] p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
