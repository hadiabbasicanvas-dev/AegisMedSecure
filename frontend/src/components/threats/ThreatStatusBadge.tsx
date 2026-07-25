import React from 'react';
import { cn } from '@/utils/cn';

interface ThreatStatusBadgeProps {
  status: 'OPEN' | 'INVESTIGATING' | 'CONTAINED' | 'RESOLVED' | 'CLOSED' | string;
  className?: string;
}

export const ThreatStatusBadge: React.FC<ThreatStatusBadgeProps> = ({ status, className }) => {
  const styles: Record<string, { label: string; style: string }> = {
    OPEN: { label: 'OPEN', style: 'bg-[#FFB300]/15 text-[#FFB300] border-[#FFB300]/40' },
    INVESTIGATING: { label: 'INVESTIGATING', style: 'bg-[#D90429]/15 text-[#F5F5F5] border-[#D90429]/40' },
    CONTAINED: { label: 'CONTAINED', style: 'bg-[#FF9100]/15 text-[#FF9100] border-[#FF9100]/40' },
    RESOLVED: { label: 'RESOLVED', style: 'bg-[#00C853]/15 text-[#00C853] border-[#00C853]/40' },
    CLOSED: { label: 'CLOSED', style: 'bg-[#707070]/15 text-[#707070] border-[#707070]/40' },
  };

  const current = styles[status] || { label: status, style: 'bg-[#171717] text-[#A0A0A0] border-[#2A2A2A]' };

  return (
    <span className={cn('inline-flex items-center border px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-widest', current.style, className)}>
      {current.label}
    </span>
  );
};
