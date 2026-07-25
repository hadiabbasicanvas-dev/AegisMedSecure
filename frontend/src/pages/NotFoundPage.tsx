import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] text-center p-6 space-y-6 font-mono">
      <div className="p-4 bg-[#171717] border border-[#2A2A2A] text-[#D90429] shadow-2xl">
        <ShieldAlert className="h-16 w-16 text-[#D90429] animate-pulse" />
      </div>
      <h1 className="font-heading text-4xl font-extrabold text-[#F5F5F5] uppercase">404 - ENDPOINT NOT FOUND</h1>
      <p className="text-xs text-[#A0A0A0] max-w-md font-sans font-light leading-relaxed">
        The requested route does not exist or has been quarantined by Aegis Guardian AI.
      </p>
      <Link to="/dashboard">
        <Button variant="cyan-accent" size="lg">
          <ArrowLeft className="mr-2 h-4 w-4 text-[#D90429]" /> RETURN TO SOC DASHBOARD
        </Button>
      </Link>
    </div>
  );
};
