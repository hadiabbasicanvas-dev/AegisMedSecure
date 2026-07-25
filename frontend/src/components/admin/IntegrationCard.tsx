import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Network, CheckCircle2, RefreshCw } from 'lucide-react';

interface IntegrationCardProps {
  name: string;
  category: string;
  description: string;
  status: 'CONNECTED' | 'DISCONNECTED' | 'CONFIGURING';
  icon: any;
}

export const IntegrationCard: React.FC<IntegrationCardProps> = ({
  name,
  category,
  description,
  status,
  icon: Icon,
}) => {
  return (
    <Card className="p-5 flex flex-col justify-between space-y-4 hover:border-cyan-500/40 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100">{name}</h3>
            <span className="text-[10px] text-slate-400 font-mono uppercase">{category}</span>
          </div>
        </div>
        <Badge variant={status === 'CONNECTED' ? 'success' : 'warning'} className="text-[9px] font-mono">
          {status}
        </Badge>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed">{description}</p>

      <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
        <Button variant="outline" size="sm" className="text-xs">
          Configure Connector
        </Button>
        <span className="text-[9px] font-mono text-slate-500">SIMULATED ADAPTER</span>
      </div>
    </Card>
  );
};
