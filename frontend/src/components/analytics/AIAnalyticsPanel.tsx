import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Cpu, Sparkles, Activity, ShieldCheck } from 'lucide-react';

export const AIAnalyticsPanel: React.FC = () => {
  return (
    <Card className="h-full flex flex-col justify-between border-cyan-500/30 bg-gradient-to-b from-slate-900 via-slate-900 to-navy-950 shadow-2xl">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-cyan-400" />
            <CardTitle>GPT-4o Neural Model Benchmarks</CardTitle>
          </div>
          <Badge variant="info" className="text-[9px] font-mono">
            BENCHMARK
          </Badge>
        </div>
        <CardDescription>Simulated accuracy, confidence & playbook acceptance</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-navy-950 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 font-mono">ACCURACY RATE</span>
            <p className="text-xl font-bold font-mono text-emerald-400">99.94%</p>
            <p className="text-[10px] text-slate-500">Zero false positives</p>
          </div>
          <div className="p-3.5 rounded-xl bg-navy-950 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 font-mono">AVG CONFIDENCE</span>
            <p className="text-xl font-bold font-mono text-cyan-400">98.2%</p>
            <p className="text-[10px] text-slate-500">High confidence index</p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-navy-950 border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-200">
            <span>Playbook Recommendation Acceptance</span>
            <span className="text-cyan-400 font-mono">96.8%</span>
          </div>
          <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-400" style={{ width: '96.8%' }} />
          </div>
          <p className="text-[10px] text-slate-400">SOC analysts accepted 142 of 147 AI SOAR isolation recommendations.</p>
        </div>
      </CardContent>
    </Card>
  );
};
