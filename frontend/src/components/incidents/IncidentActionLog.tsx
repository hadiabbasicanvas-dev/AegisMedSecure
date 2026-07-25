import React from 'react';
import { IncidentActionItem } from '@/services/incidentService';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, CheckCircle2, ShieldAlert, Cpu } from 'lucide-react';
import { formatDate } from '@/utils/formatters';

interface IncidentActionLogProps {
  actions: IncidentActionItem[];
}

export const IncidentActionLog: React.FC<IncidentActionLogProps> = ({ actions }) => {
  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-amber-400" />
            <CardTitle>SOAR Response Action Execution Log</CardTitle>
          </div>
          <Badge variant="info" className="text-[9px] font-mono">AUTOMATED SOAR</Badge>
        </div>
        <CardDescription>Software-defined VLAN isolations & defensive firewall rules</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 flex-1">
        <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
          {actions.length === 0 ? (
            <p className="text-xs font-mono text-slate-500 text-center py-4">No SOAR response actions executed yet.</p>
          ) : (
            actions.map((act) => (
              <div key={act.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
                <div className="flex items-center justify-between font-mono">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    {act.actionName}
                  </span>
                  <Badge variant="success" className="text-[9px]">
                    {act.resultStatus}
                  </Badge>
                </div>
                {act.comments && <p className="text-[11px] text-slate-400">{act.comments}</p>}
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-900">
                  <span>Executed by: <strong className="text-cyan-400">{act.performedBy}</strong></span>
                  <span>{formatDate(act.createdAt)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
