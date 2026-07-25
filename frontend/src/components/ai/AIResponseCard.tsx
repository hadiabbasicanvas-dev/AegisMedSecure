import React from 'react';
import { StructuredDataPayload } from '@/services/aiService';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertOctagon, Server, ShieldCheck } from 'lucide-react';

interface AIResponseCardProps {
  data: StructuredDataPayload;
}

export const AIResponseCard: React.FC<AIResponseCardProps> = ({ data }) => {
  return (
    <div className="my-4 rounded-xl border border-cyan-500/30 bg-slate-950/80 p-4 shadow-xl space-y-4 font-sans">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="h-4 w-4 text-cyan-400" />
          <span className="text-xs font-bold text-slate-100 font-mono uppercase tracking-wider">
            Structured Neural Assessment
          </span>
        </div>
        <Badge
          variant={data.riskScore >= 80 ? 'critical' : data.riskScore >= 60 ? 'warning' : 'info'}
          className="text-[9px] font-mono"
        >
          {data.riskClassification} ({data.riskScore}/100)
        </Badge>
      </div>

      <div className="space-y-1">
        <span className="text-[10px] text-slate-500 font-mono">EXECUTIVE SUMMARY</span>
        <p className="text-xs text-slate-200 leading-relaxed font-medium">{data.executiveSummary}</p>
      </div>

      {data.playbookSteps && data.playbookSteps.length > 0 && (
        <div className="space-y-2">
          <span className="text-[10px] text-slate-500 font-mono">RECOMMENDED PLAYBOOK STEPS</span>
          <div className="space-y-1.5">
            {data.playbookSteps.map((step, idx) => (
              <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300 bg-navy-950/80 p-2 rounded-lg border border-slate-800/80">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.affectedAssets && data.affectedAssets.length > 0 && (
        <div className="flex items-center space-x-2 pt-1 text-[11px] font-mono text-slate-400">
          <Server className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
          <span>Target Assets:</span>
          <span className="text-slate-200 font-semibold">{data.affectedAssets.join(', ')}</span>
        </div>
      )}
    </div>
  );
};
