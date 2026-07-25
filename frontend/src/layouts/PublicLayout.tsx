import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';

export const PublicLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-navy-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      {/* Sticky Enterprise Navigation Bar */}
      <Navbar />

      {/* Public Page View Outlet */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Enterprise Footer */}
      <Footer />
    </div>
  );
};
