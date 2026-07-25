import React from 'react';
import { SectionWrapper } from '@/components/landing/SectionWrapper';
import { FeatureCard } from '@/components/landing/FeatureCard';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Cpu, ShieldCheck, Database, Zap, Lock, Server } from 'lucide-react';

export const FeaturesPage: React.FC = () => {
  return (
    <div className="py-12 space-y-12">
      {/* Header Banner */}
      <SectionWrapper className="text-center space-y-4">
        <Badge variant="info" className="uppercase font-mono tracking-widest text-[10px]">
          Technical Capabilities Spec
        </Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-50">
          Aegis Platform Deep-Dive Architecture
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl mx-auto">
          Detailed technical specifications of the non-intrusive telemetry pipeline, OpenAI GPT-4o threat scoring, and automated VLAN quarantine engine.
        </p>
      </SectionWrapper>

      {/* Primary Feature Matrix */}
      <SectionWrapper>
        <FeatureCard />
      </SectionWrapper>

      {/* Technology Stack Specifications */}
      <SectionWrapper className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-50">Core Technical Architecture Stack</h2>
          <p className="text-xs text-slate-400">Enterprise engineering components driving Aegis Guardian AI</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center space-x-3 pb-2">
              <Cpu className="h-6 w-6 text-cyan-400" />
              <CardTitle>AI Neural Scoring</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-slate-300">
              <p>• OpenAI GPT-4o Fine-Tuned Threat Classification</p>
              <p>• Zero-Day Ransomware Anomaly Vector Scoring</p>
              <p>• Natural Language Incident Root-Cause Summaries</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-x-3 pb-2">
              <Zap className="h-6 w-6 text-cyan-400" />
              <CardTitle>SOAR VLAN Engine</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-slate-300">
              <p>• Sub-450ms Software-Defined VLAN Quarantine</p>
              <p>• Micro-segmentation preventing lateral malware movement</p>
              <p>• Zero interruption to patient life-support equipment</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-x-3 pb-2">
              <Database className="h-6 w-6 text-cyan-400" />
              <CardTitle>Telemetry Storage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-slate-300">
              <p>• PostgreSQL 16 + Prisma ORM High-Speed Ingestion</p>
              <p>• Time-Series B-tree & GIN Indexing for Packet Logs</p>
              <p>• Encrypted HIPAA Audit Storage & Point-In-Time Recovery</p>
            </CardContent>
          </Card>
        </div>
      </SectionWrapper>
    </div>
  );
};
