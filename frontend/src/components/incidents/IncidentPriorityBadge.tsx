import React from 'react';
import { cn } from '@/utils/cn';

interface IncidentPriorityBadgeProps {
  priority: 'P1_CRITICAL' | 'P2_HIGH' | 'P3_MEDIUM' | 'P4_LOW' | string;
  className?: string;
}

export const IncidentPriorityBadge: React.FC<IncidentPriorityBadgeProps> = ({ priority, className }) => {
  const styles: Record<string, { label: string; style: string }> = {
    P1_CRITICAL: { label: 'P1 - CRITICAL', style: 'bg-red-500/20 text-red-400 border-red-500/40 font-bold' },
    P2_HIGH: { label: 'P2 - HIGH', style: 'bg-amber-500/20 text-amber-400 border-amber-500/40 font-semibold' },
    P3_MEDIUM: { label: 'P3 - MEDIUM', style: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' },
    P4_LOW: { label: 'P4 - LOW', style: 'bg-slate-800 text-slate-400 border-slate-700' },
  };

  const current = styles[priority] || { label: priority, style: 'bg-slate-800 text-slate-300 border-slate-700' };

  return (
    <span className={cn('inline-flex items-center rounded-md border px-2 py-0.5 text-[9px] font-mono font-extrabold uppercase tracking-wider', current.style, className)}>
      {current.label}
    </span>
  );
};
