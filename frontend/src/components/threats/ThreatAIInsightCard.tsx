import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Cpu, Sparkles, ShieldAlert, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ThreatAIInsightCardProps {
  threatCode: string;
  aiRiskScore: number;
  aiConfidence: number;
  aiSummary?: string;
}

export const ThreatAIInsightCard: React.FC<ThreatAIInsightCardProps> = ({
  threatCode,
  aiRiskScore,
  aiConfidence,
  aiSummary,
}) => {
  const navigate = useNavigate();

  const playbooks = [
    'Trigger automated software VLAN micro-segmentation on source IP.',
    'Revoke active session tokens for affected host credential handles.',
    'Dispatch automated incident notification digest to SOC Manager.',
  ];

  return (
    <Card className="border-cyan-500/30 bg-gradient-to-b from-slate-900 via-slate-900 to-navy-950 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 h-32 w-32 bg-cyan-500/10 blur-2xl pointer-events-none" />

      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-cyan-400 animate-pulse" />
            <CardTitle>GPT-4o Neural Threat Assessment</CardTitle>
          </div>
          <Badge variant="info" className="text-[9px] font-mono">
            {aiConfidence}% CONFIDENCE
          </Badge>
        </div>
        <CardDescription>Automated threat analysis for {threatCode}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Risk Score Gauge Meter */}
        <div className="p-4 rounded-xl bg-navy-950 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-mono">QUANTITATIVE RISK SCORE</span>
            <div className="text-3xl font-extrabold text-slate-50 font-mono mt-0.5">
              {aiRiskScore} <span className="text-xs text-slate-500 font-normal">/ 100</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-mono">CLASSIFICATION</span>
            <Badge
              variant={aiRiskScore >= 80 ? 'critical' : aiRiskScore >= 60 ? 'warning' : 'info'}
              className="block mt-1 text-[10px]"
            >
              {aiRiskScore >= 80 ? 'CRITICAL RISK' : aiRiskScore >= 60 ? 'HIGH RISK' : 'MODERATE RISK'}
            </Badge>
          </div>
        </div>

        {/* AI Summary */}
        <div className="space-y-1.5">
          <h4 className="text-xs font-semibold text-slate-200">Neural Summary</h4>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
            {aiSummary || 'OpenAI GPT-4o analysis detected behavioral ransomware encryption vectors matching known lateral attack patterns.'}
          </p>
        </div>

        {/* Recommended Playbook Steps */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-slate-200">Recommended SOAR Playbooks</h4>
          <div className="space-y-1.5 text-xs text-slate-300">
            {playbooks.map((step, idx) => (
              <div key={idx} className="flex items-start space-x-2 bg-navy-950/60 p-2.5 rounded-lg border border-slate-800/60">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t border-slate-800/80">
        <Button
          variant="cyan-accent"
          size="sm"
          className="w-full justify-between"
          onClick={() => navigate('/dashboard/ai-assistant')}
        >
          <span className="flex items-center gap-1.5">
            <Cpu className="h-4 w-4" /> Query AI Copilot Drawer
          </span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
