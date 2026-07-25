import React from 'react';
import { SectionWrapper } from '@/components/landing/SectionWrapper';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Shield, Building2, MapPin, Award, Terminal } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-12 space-y-12">
      {/* Header Banner */}
      <SectionWrapper className="text-center space-y-4">
        <Badge variant="info" className="uppercase font-mono tracking-widest text-[10px]">
          Academic & Technical Scope
        </Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-50">
          Project Aegis Guardian AI Vision
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl mx-auto">
          An academic demonstration initiative designed to pioneer autonomous AI cyber defense for Quaid-e-Azam International Hospital, Rawalpindi / Islamabad, Pakistan.
        </p>
      </SectionWrapper>

      {/* Hospital & Project Overview */}
      <SectionWrapper className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="space-y-4 p-8">
          <div className="flex items-center space-x-3">
            <Building2 className="h-8 w-8 text-cyan-400" />
            <div>
              <h3 className="text-lg font-bold text-slate-100">Quaid-e-Azam International Hospital</h3>
              <p className="text-xs text-slate-400 font-mono">Peshawar Road, Islamabad / Rawalpindi</p>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            QIH is a premier 400-bed tertiary healthcare facility featuring 24/7 emergency care, advanced surgical operating theatres, intensive care units, and a fully digitized EMR/PACS infrastructure.
          </p>
          <div className="pt-2 border-t border-slate-800 text-xs space-y-1 text-slate-400">
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-cyan-400" /> Near Golra Morr, Islamabad, Pakistan</p>
            <p className="flex items-center gap-2"><Award className="h-4 w-4 text-cyan-400" /> Academic Research & SOC Cybersecurity Blueprint</p>
          </div>
        </Card>

        <Card className="space-y-4 p-8">
          <div className="flex items-center space-x-3">
            <Terminal className="h-8 w-8 text-cyan-400" />
            <div>
              <h3 className="text-lg font-bold text-slate-100">System Objectives</h3>
              <p className="text-xs text-slate-400 font-mono">Autonomous SOAR Engine</p>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Engineered to demonstrate sub-second ransomware quarantine, OpenAI GPT-4o threat intelligence, and HIPAA audit log automation with zero impact on hospital clinical care.
          </p>
          <div className="rounded-lg bg-navy-950 p-3 border border-slate-800 text-[11px] font-mono text-cyan-400">
            [NOTE] All live events, telemetry feeds, and threat profiles are 100% simulated for academic evaluation.
          </div>
        </Card>
      </SectionWrapper>
    </div>
  );
};
