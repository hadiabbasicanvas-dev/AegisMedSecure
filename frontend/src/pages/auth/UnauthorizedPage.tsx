import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const UnauthorizedPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] text-center p-6 space-y-6">
      <div className="rounded-full bg-red-500/10 p-4 border border-red-500/20">
        <ShieldAlert className="h-16 w-16 text-red-400 animate-pulse" />
      </div>
      <h1 className="text-3xl font-extrabold text-slate-50">403 - Access Restricted</h1>
      <p className="text-slate-400 max-w-md text-sm">
        Your assigned role lacks the RBAC permission required to view or execute operations on this medical subnet resource.
      </p>
      <Link to="/dashboard">
        <Button variant="cyan-accent">
          <ArrowLeft className="mr-2 h-4 w-4" /> Return to Safety
        </Button>
      </Link>
    </div>
  );
};
