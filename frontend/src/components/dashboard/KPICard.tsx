import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, AlertOctagon, AlertTriangle, Activity, HardDrive, Cpu, TrendingUp, TrendingDown } from 'lucide-react';

export interface KPIData {
  title: string;
  value: string;
  subtext: string;
  trend?: string;
  isPositive?: boolean;
  badgeText: string;
  badgeVariant: 'success' | 'warning' | 'critical' | 'info' | 'default';
  icon: any;
}

export const KPICardMatrix: React.FC = () => {
  const kpis: KPIData[] = [
    {
      title: 'Hospital Security Score',
      value: '94 / 100',
      subtext: 'Calculated across 12 QIH subnets',
      trend: '+2.4%',
      isPositive: true,
      badgeText: 'OPTIMAL',
      badgeVariant: 'success',
      icon: ShieldCheck,
    },
    {
      title: 'Active Threats',
      value: '3 Active',
      subtext: 'EMR & PACS telemetry channels',
      trend: '-1 from last hour',
      isPositive: true,
      badgeText: 'CRITICAL',
      badgeVariant: 'critical',
      icon: AlertOctagon,
    },
    {
      title: 'Critical Alerts',
      value: '12 Alerts',
      subtext: 'Flagged for analyst review',
      trend: '+3 today',
      isPositive: false,
      badgeText: 'ATTENTION',
      badgeVariant: 'warning',
      icon: AlertTriangle,
    },
    {
      title: 'Open Incidents',
      value: '2 Incidents',
      subtext: 'Under active SOAR investigation',
      trend: '0 pending quarantine',
      isPositive: true,
      badgeText: 'INVESTIGATING',
      badgeVariant: 'info',
      icon: Activity,
    },
    {
      title: 'Protected IoMT Assets',
      value: '1,248 Units',
      subtext: 'Ventilators, MRI, CT & Pumps',
      trend: '99.8% Online',
      isPositive: true,
      badgeText: 'MONITORED',
      badgeVariant: 'success',
      icon: HardDrive,
    },
    {
      title: 'AI Precision Score',
      value: '98.2%',
      subtext: 'GPT-4o neural anomaly scoring',
      trend: '+0.5% evaluation',
      isPositive: true,
      badgeText: 'HIGH CONFIDENCE',
      badgeVariant: 'info',
      icon: Cpu,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 font-mono">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <motion.div
            key={idx}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="bg-[#1B1B1B] border border-[#2A2A2A] p-4 flex flex-col justify-between space-y-3 relative group hover:border-[#D90429] transition-all"
          >
            <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-2">
              <span className="text-[10px] text-[#A0A0A0] uppercase tracking-wider font-bold truncate">
                {kpi.title}
              </span>
              <Icon className="h-4 w-4 text-[#D90429] shrink-0" />
            </div>

            <div>
              <div className="text-xl font-bold text-[#F5F5F5] tracking-tight font-heading">
                {kpi.value}
              </div>
              <div className="flex items-center space-x-1.5 mt-1">
                {kpi.trend && (
                  <span className={`text-[10px] flex items-center ${kpi.isPositive ? 'text-[#00C853]' : 'text-[#FF1744]'}`}>
                    {kpi.isPositive ? <TrendingUp className="h-3 w-3 mr-0.5" /> : <TrendingDown className="h-3 w-3 mr-0.5" />}
                    {kpi.trend}
                  </span>
                )}
              </div>
              <p className="text-[10px] text-[#707070] mt-1 line-clamp-1 font-sans">{kpi.subtext}</p>
            </div>

            <div className="pt-2 border-t border-[#2A2A2A] flex items-center justify-between">
              <Badge variant={kpi.badgeVariant} className="text-[8px] px-1.5 py-0">
                {kpi.badgeText}
              </Badge>
              <span className="text-[8px] text-[#707070]">QIH TELEMETRY</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
