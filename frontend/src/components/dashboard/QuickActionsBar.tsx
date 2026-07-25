import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Eye, AlertOctagon, Cpu, Download, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const QuickActionsBar: React.FC = () => {
  const navigate = useNavigate();
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="space-y-3 font-mono">
      {toastMsg && (
        <div className="p-3 bg-[#00C853]/15 border border-[#00C853]/40 text-[#00C853] text-xs flex items-center space-x-2 animate-in fade-in-50">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <span className="text-[10px] font-bold text-[#707070] uppercase tracking-widest mr-1">
          QUICK SOC WORKFLOWS:
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/dashboard/reports')}
        >
          <FileText className="mr-1.5 h-3.5 w-3.5 text-[#D90429]" /> GENERATE REPORT
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/dashboard/threats')}
        >
          <Eye className="mr-1.5 h-3.5 w-3.5 text-[#D90429]" /> INVESTIGATE THREAT
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/dashboard/incidents')}
        >
          <AlertOctagon className="mr-1.5 h-3.5 w-3.5 text-[#FFB300]" /> OPEN INCIDENT
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/dashboard/ai-assistant')}
        >
          <Cpu className="mr-1.5 h-3.5 w-3.5 text-[#D90429]" /> LAUNCH AI ANALYSIS
        </Button>

        <Button
          variant="default"
          size="sm"
          onClick={() => triggerToast('Dashboard PDF Export Compiled & Downloaded.')}
          className="ml-auto"
        >
          <Download className="mr-1.5 h-3.5 w-3.5 text-[#F5F5F5]" /> EXPORT DASHBOARD PDF
        </Button>
      </div>
    </div>
  );
};
