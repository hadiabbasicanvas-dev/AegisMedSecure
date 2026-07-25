import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Mail, CheckCircle2 } from 'lucide-react';

export const ScheduledReportCard: React.FC = () => {
  const schedules = [
    { name: 'Daily Executive Telemetry Brief', frequency: 'Daily at 08:00 PKT', recipients: 'soc-leadership@qih.hospital', status: 'ACTIVE' },
    { name: 'Weekly HIPAA Title II Audit Summary', frequency: 'Mondays at 09:00 PKT', recipients: 'compliance@qih.hospital', status: 'ACTIVE' },
    { name: 'Monthly IoMT Medical Device Health Brief', frequency: '1st of Month', recipients: 'it-infrastructure@qih.hospital', status: 'ACTIVE' },
  ];

  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-cyan-400" />
            <CardTitle>Automated Report Delivery Schedule</CardTitle>
          </div>
          <Badge variant="info" className="text-[9px] font-mono">UI-READY</Badge>
        </div>
        <CardDescription>Configured automated email digests & audit dispatches</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 flex-1">
        {schedules.map((s, idx) => (
          <div key={idx} className="p-3.5 rounded-xl bg-navy-950 border border-slate-800 space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-100">{s.name}</span>
              <Badge variant="success" className="text-[9px] font-mono">{s.status}</Badge>
            </div>
            <div className="flex items-center space-x-2 text-[11px] text-slate-400 font-mono">
              <Clock className="h-3 w-3 text-cyan-400 shrink-0" />
              <span>{s.frequency}</span>
            </div>
            <div className="flex items-center space-x-2 text-[11px] text-slate-400 font-mono">
              <Mail className="h-3 w-3 text-cyan-400 shrink-0" />
              <span className="truncate">{s.recipients}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
