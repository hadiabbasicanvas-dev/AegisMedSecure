import React from 'react';
import { cn } from '@/utils/cn';

interface IncidentSeverityBadgeProps {
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | string;
  className?: string;
}

export const IncidentSeverityBadge: React.FC<IncidentSeverityBadgeProps> = ({ severity, className }) => {
  const styles: Record<string, string> = {
    CRITICAL: 'bg-[#FF1744]/15 text-[#FF1744] border-[#FF1744]/40 font-extrabold shadow-[0_0_10px_rgba(255,23,68,0.2)]',
    HIGH: 'bg-[#FF9100]/15 text-[#FF9100] border-[#FF9100]/40 font-bold',
    MEDIUM: 'bg-[#FFB300]/15 text-[#FFB300] border-[#FFB300]/40',
    LOW: 'bg-[#78909C]/15 text-[#78909C] border-[#78909C]/40',
  };

  const style = styles[severity] || 'bg-[#171717] text-[#A0A0A0] border-[#2A2A2A]';

  return (
    <span className={cn('inline-flex items-center border px-2.5 py-0.5 text-[9px] font-mono uppercase tracking-widest', style, className)}>
      {severity}
    </span>
  );
};
