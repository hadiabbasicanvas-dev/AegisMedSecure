import React from 'react';
import { Outlet } from 'react-router-dom';
import { Shield } from 'lucide-react';

export const AuthLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A] px-4 py-12 relative overflow-hidden">
      {/* Industrial Grid & Laser Scanline Backdrop */}
      <div className="absolute inset-0 bg-industrial-grid opacity-30 pointer-events-none" />
      <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D90429] to-transparent animate-laser-scan pointer-events-none z-10" />

      <div className="w-full max-w-md space-y-8 relative z-20">
        <div className="text-center space-y-2">
          <div className="inline-flex h-14 w-14 items-center justify-center bg-[#171717] border border-[#2A2A2A] shadow-2xl mb-2 group">
            <Shield className="h-7 w-7 text-[#D90429]" />
          </div>
          <h2 className="font-heading text-2xl font-bold tracking-wider text-[#F5F5F5] uppercase">AEGIS GUARDIAN AI</h2>
          <p className="text-xs font-mono text-[#888888] uppercase tracking-widest">Quaid-e-Azam Int. Hospital Cyber Defense</p>
        </div>

        <div className="bg-[#1B1B1B] border border-[#2A2A2A] p-8 shadow-2xl relative">
          <div className="absolute -top-1 -right-1 h-3 w-3 bg-[#D90429]" />
          <Outlet />
        </div>
      </div>
    </div>
  );
};
