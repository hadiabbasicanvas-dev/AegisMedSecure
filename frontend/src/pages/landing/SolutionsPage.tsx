import React from 'react';
import { SectionWrapper } from '@/components/landing/SectionWrapper';
import { SolutionCard } from '@/components/landing/SolutionCard';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Building2, HeartPulse, HardDrive, ShieldCheck } from 'lucide-react';

export const SolutionsPage: React.FC = () => {
  return (
    <div className="py-12 space-y-12">
      {/* Header Banner */}
      <SectionWrapper className="text-center space-y-4">
        <Badge variant="info" className="uppercase font-mono tracking-widest text-[10px]">
          Healthcare Environment Profiles
        </Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-50">
          Quaid-e-Azam Int. Hospital Solution Blueprint
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl mx-auto">
          Tailored security architectures protecting PACS diagnostic imaging, EMR clinical databases, and IoMT life-safety device subnets.
        </p>
      </SectionWrapper>

      {/* Solutions Showcase */}
      <SectionWrapper>
        <SolutionCard />
      </SectionWrapper>

      {/* Subnet Defense Detail Cards */}
      <SectionWrapper className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-50">Protected QIH Subnet Categories</h2>
          <p className="text-xs text-slate-400">Non-intrusive security boundaries across clinical environments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center space-x-3 pb-2">
              <HeartPulse className="h-6 w-6 text-red-400" />
              <CardTitle>ICU / CCU Life-Support Subnets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-slate-300">
              <p>• Monitors ventilator networks, infusion pumps, and central bed telemetry.</p>
              <p>• Enforces strict host-level micro-segmentation without severing vital patient streams.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-x-3 pb-2">
              <HardDrive className="h-6 w-6 text-cyan-400" />
              <CardTitle>PACS / RIS Diagnostic Imaging Vault</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-slate-300">
              <p>• Shields high-throughput DICOM imaging transmissions (MRI, CT, Ultrasound).</p>
              <p>• Prevents ransomware encryption of diagnostic archives and patient imaging logs.</p>
            </CardContent>
          </Card>
        </div>
      </SectionWrapper>
    </div>
  );
};
