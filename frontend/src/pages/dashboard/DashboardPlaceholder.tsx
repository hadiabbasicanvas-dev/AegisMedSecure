import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Clock, Lock } from 'lucide-react';

interface DashboardPlaceholderProps {
  title: string;
  description: string;
  modulePhase: string;
  icon: any;
}

export const DashboardPlaceholder: React.FC<DashboardPlaceholderProps> = ({
  title,
  description,
  modulePhase,
  icon: Icon,
}) => {
  return (
    <div className="max-w-4xl mx-auto py-8 space-y-6">
      <Card className="border-slate-800 bg-slate-900/60 p-8 backdrop-blur-xl shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-50">{title} Module</h2>
              <p className="text-xs text-slate-400">{description}</p>
            </div>
          </div>
          <Badge variant="info" className="font-mono text-xs">
            {modulePhase}
          </Badge>
        </div>

        <CardContent className="space-y-4 p-0">
          <div className="rounded-xl bg-navy-950 p-6 border border-slate-800 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-amber-400">
              <Clock className="h-4 w-4" />
              <span>Under Active Architecture Development</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              This module is scheduled for implementation in <strong>{modulePhase}</strong>. The Phase 4 SOC Dashboard shell layout, RBAC routing rules, and Zustand state bindings are active and verified.
            </p>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] text-cyan-400 space-y-1">
              <p>[STATUS] Protected Route Guard Verified</p>
              <p>[RBAC] Role Validation Enforced</p>
              <p>[TARGET] {modulePhase} Integration Ready</p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-0 pt-4 border-t border-slate-800/80 flex justify-between items-center">
          <span className="text-xs text-slate-500 font-mono">Quaid-e-Azam Int. Hospital SOC Platform</span>
          <Button variant="outline" size="sm" disabled className="opacity-50 cursor-not-allowed text-xs">
            <Lock className="mr-1.5 h-3.5 w-3.5" /> Module Preview Locked ({modulePhase})
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
