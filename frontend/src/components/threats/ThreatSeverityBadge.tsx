import React from 'react';
import { cn } from '@/utils/cn';

interface ThreatSeverityBadgeProps {
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFORMATIONAL' | string;
  className?: string;
}

export const ThreatSeverityBadge: React.FC<ThreatSeverityBadgeProps> = ({ severity, className }) => {
  const styles: Record<string, string> = {
    CRITICAL: 'bg-red-500/10 text-red-400 border-red-500/30 font-extrabold shadow-sm shadow-red-500/10',
    HIGH: 'bg-amber-500/10 text-amber-400 border-amber-500/30 font-bold',
    MEDIUM: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    LOW: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    INFORMATIONAL: 'bg-slate-800 text-slate-400 border-slate-700',
  };

  const style = styles[severity] || 'bg-slate-800 text-slate-300 border-slate-700';

  return (
    <span className={cn('inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider', style, className)}>
      {severity}
    </span>
  );
};
