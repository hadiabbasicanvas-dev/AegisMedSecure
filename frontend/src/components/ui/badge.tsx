import * as React from 'react';
import { cn } from '@/utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'critical' | 'info' | 'outline' | 'high' | 'medium' | 'low' | 'closed';
}

export const Badge: React.FC<BadgeProps> = ({ className, variant = 'default', ...props }) => {
  const variants = {
    default: 'bg-[#171717] text-[#F5F5F5] border-[#2A2A2A]',
    success: 'bg-[#00C853]/15 text-[#00C853] border-[#00C853]/40',
    warning: 'bg-[#FFB300]/15 text-[#FFB300] border-[#FFB300]/40',
    critical: 'bg-[#FF1744]/15 text-[#FF1744] border-[#FF1744]/40',
    high: 'bg-[#FF9100]/15 text-[#FF9100] border-[#FF9100]/40',
    medium: 'bg-[#FFB300]/15 text-[#FFB300] border-[#FFB300]/40',
    low: 'bg-[#78909C]/15 text-[#78909C] border-[#78909C]/40',
    closed: 'bg-[#707070]/15 text-[#707070] border-[#707070]/40',
    info: 'bg-[#D90429]/15 text-[#F5F5F5] border-[#D90429]/40',
    outline: 'border-[#2A2A2A] text-[#A0A0A0]',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center border px-2.5 py-0.5 text-[10px] font-mono font-bold tracking-widest uppercase transition-all select-none',
        variants[variant],
        className
      )}
      {...props}
    />
  );
};
