import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface AdminKPICardProps {
  title: string;
  value: string | number;
  subtext: string;
  badgeText: string;
  badgeVariant?: 'success' | 'warning' | 'critical' | 'info' | 'default';
  icon: any;
}

export const AdminKPICard: React.FC<AdminKPICardProps> = ({
  title,
  value,
  subtext,
  badgeText,
  badgeVariant = 'info',
  icon: Icon,
}) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-md shadow-xl flex flex-col justify-between space-y-2 group hover:border-cyan-500/40 transition-colors"
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
          {title}
        </span>
        <Icon className="h-4 w-4 text-cyan-400 shrink-0" />
      </div>

      <div>
        <div className="text-xl font-extrabold text-slate-50 font-mono">{value}</div>
        <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{subtext}</p>
      </div>

      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
        <Badge variant={badgeVariant} className="text-[9px] px-2 py-0">
          {badgeText}
        </Badge>
        <span className="text-[9px] font-mono text-slate-500">QIH ADMIN</span>
      </div>
    </motion.div>
  );
};
