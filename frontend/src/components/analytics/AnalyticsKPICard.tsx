import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface AnalyticsKPICardProps {
  title: string;
  value: string | number;
  subtext: string;
  trend?: string;
  isPositive?: boolean;
  badgeText: string;
  badgeVariant?: 'success' | 'warning' | 'critical' | 'info' | 'default';
  icon: any;
}

export const AnalyticsKPICard: React.FC<AnalyticsKPICardProps> = ({
  title,
  value,
  subtext,
  trend,
  isPositive = true,
  badgeText,
  badgeVariant = 'info',
  icon: Icon,
}) => {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md shadow-xl flex flex-col justify-between space-y-3 relative group hover:border-cyan-500/40 transition-colors"
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
          {title}
        </span>
        <Icon className="h-5 w-5 text-cyan-400 shrink-0" />
      </div>

      <div>
        <div className="text-2xl font-extrabold text-slate-50 font-mono tracking-tight">{value}</div>
        <div className="flex items-center space-x-1.5 mt-1">
          {trend && (
            <span
              className={`text-[10px] font-mono flex items-center ${
                isPositive ? 'text-emerald-400' : 'text-red-400'
              }`}
            >
              {isPositive ? <TrendingUp className="h-3 w-3 mr-0.5" /> : <TrendingDown className="h-3 w-3 mr-0.5" />}
              {trend}
            </span>
          )}
        </div>
        <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{subtext}</p>
      </div>

      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
        <Badge variant={badgeVariant} className="text-[9px] px-2 py-0">
          {badgeText}
        </Badge>
        <span className="text-[9px] font-mono text-slate-500">QIH TELEMETRY</span>
      </div>
    </motion.div>
  );
};
