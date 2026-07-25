import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Cpu, Sparkles, AlertOctagon, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AIInsightsPanel: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-4 w-4 text-[#D90429]" />
            <CardTitle>AI NEURAL RISK PREDICTION</CardTitle>
          </div>
          <Badge variant="info" className="text-[9px]">GPT-4o ACTIVE</Badge>
        </div>
        <CardDescription>Real-time threat evaluation & SOAR recommendation</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 flex-1 font-mono">
        {/* Top Recommendation Highlight */}
        <div className="p-4 bg-[#0A0A0A] border border-[#D90429]/50 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#D90429] uppercase">
            <AlertOctagon className="h-4 w-4 text-[#FFB300] shrink-0" />
            <span>AUTONOMOUS SOAR RECOMMENDATION</span>
          </div>
          <p className="text-xs text-[#F5F5F5] leading-relaxed font-sans font-light">
            &ldquo;Isolate Software VLAN 104 immediately due to suspected SMB ransomware behavior on PACS-SERVER-02.&rdquo;
          </p>
          <div className="flex items-center justify-between pt-1 text-[10px] text-[#A0A0A0]">
            <span>CONFIDENCE: <strong className="text-[#00C853]">98.4%</strong></span>
            <span>EST. IMPACT: <strong className="text-[#F5F5F5]">0 PATIENTS AFFECTED</strong></span>
          </div>
        </div>

        {/* Prediction Matrix */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-[#0A0A0A] border border-[#2A2A2A] space-y-1">
            <span className="text-[9px] text-[#707070] uppercase">RISK HORIZON</span>
            <p className="font-bold text-[#FFB300] uppercase">Elevated (24h)</p>
          </div>
          <div className="p-3 bg-[#0A0A0A] border border-[#2A2A2A] space-y-1">
            <span className="text-[9px] text-[#707070] uppercase">PRIMARY VECTOR</span>
            <p className="font-bold text-[#F5F5F5] uppercase">SMB / DICOM</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3">
        <Button
          variant="cyan-accent"
          size="sm"
          className="w-full justify-between"
          onClick={() => navigate('/dashboard/ai-assistant')}
        >
          <span className="flex items-center gap-1.5 font-bold">
            <Cpu className="h-4 w-4 text-[#D90429]" /> OPEN AI SECURITY COPILOT
          </span>
          <ArrowRight className="h-4 w-4 text-[#D90429]" />
        </Button>
      </CardFooter>
    </Card>
  );
};
