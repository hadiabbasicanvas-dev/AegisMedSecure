import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Cpu, Sparkles, AlertOctagon, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface IncidentAIAnalysisCardProps {
  incidentCode: string;
  departmentName: string;
  affectedAsset: string;
}

export const IncidentAIAnalysisCard: React.FC<IncidentAIAnalysisCardProps> = ({
  incidentCode,
  departmentName,
  affectedAsset,
}) => {
  const navigate = useNavigate();

  const playbooks = [
    `Confirm sub-second VLAN micro-segmentation rule on target asset ${affectedAsset}.`,
    `Verify PACS DICOM vault secondary backup snapshots to ensure zero file corruption.`,
    `Dispatch automated incident summary report digest to QIH SOC Manager.`,
  ];

  return (
    <Card className="border-cyan-500/30 bg-gradient-to-b from-slate-900 via-slate-900 to-navy-950 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 h-32 w-32 bg-cyan-500/10 blur-2xl pointer-events-none" />

      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-cyan-400 animate-pulse" />
            <CardTitle>GPT-4o Incident Neural Synthesis</CardTitle>
          </div>
          <Badge variant="info" className="text-[9px] font-mono">
            98.4% CONFIDENCE
          </Badge>
        </div>
        <CardDescription>Automated root-cause analysis for {incidentCode}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Executive Summary Box */}
        <div className="p-4 rounded-xl bg-navy-950 border border-cyan-500/30 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400">
            <AlertOctagon className="h-4 w-4 text-amber-400 shrink-0" />
            <span>Root-Cause Evaluation Summary</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">
            "SMB extension mutation signatures on {affectedAsset} in {departmentName} match lateral ransomware propagation vectors. Micro-segmentation isolation prevented exfiltration."
          </p>
        </div>

        {/* Recommended Mitigation Steps */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-slate-200">Recommended SOAR Recovery Playbook</h4>
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
          onClick={() => navigate(`/dashboard/ai-assistant?incidentId=${incidentCode}`)}
        >
          <span className="flex items-center gap-1.5">
            <Cpu className="h-4 w-4" /> Continue Investigation in AI Copilot
          </span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
