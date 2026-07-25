import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Cpu, Activity, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const LandingPage: React.FC = () => {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 px-6 max-w-7xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-400">
          <Shield className="h-4 w-4" />
          <span>Quaid-e-Azam International Hospital Defense Engine</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-50 max-w-4xl mx-auto leading-tight">
          AI-Powered <span className="text-cyan-400">Autonomous Cyber Defense</span> for Healthcare Infrastructure
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
          Protecting clinical EMR, PACS diagnostic imaging, and life-safety IoMT subnets with real-time neural telemetry analysis and instant SOAR micro-segmentation.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link to="/login">
            <Button variant="cyan-accent" size="lg" className="w-full sm:w-auto">
              Access Security Operations Center <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/about">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              System Architecture
            </Button>
          </Link>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="space-y-4">
          <Activity className="h-10 w-10 text-cyan-400" />
          <h3 className="text-xl font-bold text-slate-100">Live Telemetry Ingestion</h3>
          <p className="text-sm text-slate-400">
            Real-time non-intrusive log inspection across 400+ inpatient bed subnets, ICU monitors, and central diagnostic labs.
          </p>
        </Card>

        <Card className="space-y-4">
          <Cpu className="h-10 w-10 text-cyan-400" />
          <h3 className="text-xl font-bold text-slate-100">OpenAI GPT-4o Intelligence</h3>
          <p className="text-sm text-slate-400">
            Generative AI root-cause analysis and plain-language threat summaries for rapid analyst incident triage.
          </p>
        </Card>

        <Card className="space-y-4">
          <Lock className="h-10 w-10 text-cyan-400" />
          <h3 className="text-xl font-bold text-slate-100">Autonomous SOAR Isolation</h3>
          <p className="text-sm text-slate-400">
            Millisecond-level software VLAN micro-segmentation that isolates compromised hosts without interrupting life support.
          </p>
        </Card>
      </section>
    </div>
  );
};
