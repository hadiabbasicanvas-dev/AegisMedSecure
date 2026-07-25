import React from 'react';
import { Card } from '@/components/ui/card';
import { ShieldAlert, Cpu, HardDrive, FileText } from 'lucide-react';

interface SuggestedPromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

export const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({ onSelectPrompt }) => {
  const prompts = [
    {
      title: "Analyze PACS Ransomware Vector",
      prompt: "Analyze the recent SMB encryption telemetry on PACS-SERVER-02 and recommend containment playbooks.",
      icon: ShieldAlert,
    },
    {
      title: "Summarize QIH Subnet Risk Matrix",
      prompt: "Provide an executive summary of risk exposure across all 12 QIH hospital wards (Adult ICU, PACS, EMR, Pathology).",
      icon: Cpu,
    },
    {
      title: "ICU Ventilator Subnet Playbook",
      prompt: "What zero-downtime micro-segmentation steps protect ICU bedside monitors without disconnecting patient feeds?",
      icon: HardDrive,
    },
    {
      title: "Generate HIPAA Compliance Report",
      prompt: "Draft an audit summary for recent threat mitigations suitable for HIPAA compliance submission.",
      icon: FileText,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto my-8">
      {prompts.map((p, idx) => {
        const Icon = p.icon;
        return (
          <Card
            key={idx}
            onClick={() => onSelectPrompt(p.prompt)}
            className="p-4 cursor-pointer hover:border-cyan-500/40 hover:bg-slate-800/60 transition-all space-y-2 group"
          >
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-100 group-hover:text-cyan-400">
              <Icon className="h-4 w-4 text-cyan-400 shrink-0" />
              <span>{p.title}</span>
            </div>
            <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{p.prompt}</p>
          </Card>
        );
      })}
    </div>
  );
};
