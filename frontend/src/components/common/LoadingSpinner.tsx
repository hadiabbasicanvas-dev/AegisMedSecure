import React from 'react';
import { Shield } from 'lucide-react';
import { cn } from '@/utils/cn';

export const LoadingSpinner: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('flex flex-col items-center justify-center min-h-[300px] space-y-4', className)}>
      <div className="relative flex items-center justify-center">
        <Shield className="h-10 w-10 text-cyan-500 animate-pulse" />
        <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 border-t-cyan-500 animate-spin h-14 w-14 -top-2 -left-2" />
      </div>
      <p className="text-xs font-mono tracking-wider text-slate-400 uppercase">Loading Aegis Platform...</p>
    </div>
  );
};

export const Skeleton: React.FC<{ className?: string }> = ({ className }) => {
  return <div className={cn('animate-pulse rounded-lg bg-slate-800/80', className)} />;
};
