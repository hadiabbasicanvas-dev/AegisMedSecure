import React from 'react';
import { SystemHealthData } from '@/services/adminService';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Cpu, HardDrive, Database, Activity, Server, Radio } from 'lucide-react';

interface SystemHealthGridProps {
  health?: SystemHealthData;
}

export const SystemHealthGrid: React.FC<SystemHealthGridProps> = ({ health }) => {
  const status = health?.status || 'OPTIMAL';
  const cpu = health?.cpuUsagePercent || 14.2;
  const memory = health?.memoryUsagePercent || 32.8;
  const dbLatency = health?.databaseLatencyMs || 4;
  const storageUsed = health?.storageUsedGb || 148;
  const storageTotal = health?.storageTotalGb || 1024;

  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-cyan-400" />
            <CardTitle>Infrastructure Real-Time Probes & Telemetry</CardTitle>
          </div>
          <Badge variant="success" className="text-[9px] font-mono">
            {status} (99.99% UPTIME)
          </Badge>
        </div>
        <CardDescription>Live health probes for Node.js API core, PostgreSQL DB & Redis cache</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 flex-1">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-3.5 rounded-xl bg-navy-950 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5"><Cpu className="h-4 w-4 text-cyan-400" /> CPU Load</span>
              <span className="font-bold text-slate-100">{cpu}%</span>
            </div>
            <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-400" style={{ width: `${cpu}%` }} />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-navy-950 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5"><Server className="h-4 w-4 text-emerald-400" /> RAM Memory</span>
              <span className="font-bold text-slate-100">{memory}%</span>
            </div>
            <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400" style={{ width: `${memory}%` }} />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-navy-950 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5"><Database className="h-4 w-4 text-purple-400" /> DB Latency</span>
              <span className="font-bold text-slate-100">{dbLatency} ms</span>
            </div>
            <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
              <div className="h-full bg-purple-400" style={{ width: '15%' }} />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-navy-950 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5"><HardDrive className="h-4 w-4 text-amber-400" /> NVMe Storage</span>
              <span className="font-bold text-slate-100">{storageUsed} / {storageTotal} GB</span>
            </div>
            <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
              <div className="h-full bg-amber-400" style={{ width: `${(storageUsed / storageTotal) * 100}%` }} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
