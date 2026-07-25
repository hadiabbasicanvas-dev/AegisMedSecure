import React from 'react';
import { UserRole } from '@/types/ui';
import { cn } from '@/utils/cn';

interface RoleBadgeProps {
  role: UserRole | string;
  className?: string;
}

export const RoleBadge: React.FC<RoleBadgeProps> = ({ role, className }) => {
  const roleStyles: Record<string, { label: string; style: string }> = {
    SUPER_ADMINISTRATOR: {
      label: 'Super Administrator',
      style: 'bg-red-500/10 text-red-400 border-red-500/30',
    },
    SOC_MANAGER: {
      label: 'SOC Manager',
      style: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    },
    SECURITY_ANALYST: {
      label: 'Security Analyst',
      style: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    },
    IT_ADMINISTRATOR: {
      label: 'IT Administrator',
      style: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    },
    COMPLIANCE_OFFICER: {
      label: 'Compliance Officer',
      style: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    },
  };

  const current = roleStyles[role] || { label: role, style: 'bg-slate-800 text-slate-300 border-slate-700' };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider',
        current.style,
        className
      )}
    >
      {current.label}
    </span>
  );
};
