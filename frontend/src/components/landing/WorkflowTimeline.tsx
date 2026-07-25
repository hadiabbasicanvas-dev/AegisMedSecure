import React, { useState } from 'react';
import { Activity, Cpu, AlertTriangle, ShieldCheck, FileCheck } from 'lucide-react';

export const WorkflowTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      step: '01',
      title: 'Telemetry Ingestion',
      subtitle: 'Real-time syslog & packet capture',
      description: 'Continuously streams syslog events and network traffic from 400+ hospital beds, EMR servers, PACS imaging workstations, and ICU monitors.',
      icon: Activity,
      status: 'Live Stream Ingestion',
    },
    {
      step: '02',
      title: 'AI Anomaly Analysis',
      subtitle: 'GPT-4o neural threat inspection',
      description: 'Evaluates packet payloads against known ransomware signatures and zero-day behavioral anomalies using fine-tuned OpenAI LLM models.',
      icon: Cpu,
      status: 'Neural Analysis Active',
    },
    {
      step: '03',
      title: 'Dynamic Risk Scoring',
      subtitle: 'Contextual threat matrix rating',
      description: 'Calculates dynamic threat severity (CRITICAL, HIGH, MEDIUM, LOW) factoring in clinical criticality (e.g. ICU ventilator vs. billing server).',
      icon: AlertTriangle,
      status: 'Score Calculated',
    },
    {
      step: '04',
      title: 'Automated Micro-Segmentation',
      subtitle: 'SOAR sub-second VLAN containment',
      description: 'Triggers software-defined VLAN isolation to quarantine infected hosts without interrupting adjacent life-support equipment.',
      icon: ShieldCheck,
      status: 'Target Isolated',
    },
    {
      step: '05',
      title: 'Forensic Report Generation',
      subtitle: 'Compliance PDF & CSV export',
      description: 'Compiles complete incident timelines, affected asset metadata, and AI root-cause analysis into HIPAA-compliant forensic audit logs.',
      icon: FileCheck,
      status: 'Audit Log Compiled',
    },
  ];

  return (
    <div id="soar" className="space-y-12 py-12">
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D90429] bg-[#171717] border border-[#D90429]/40 px-3 py-1">
          SOAR AUTOMATION LIFECYCLE
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F5F5F5] uppercase">
          5-STEP AUTONOMOUS RESPONSE
        </h2>
        <p className="text-xs md:text-sm text-[#888888] font-sans leading-relaxed">
          From initial packet ingestion to instant micro-segmentation and forensic reporting in sub-450ms.
        </p>
      </div>

      {/* Interactive Step Bar */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          const isSelected = activeStep === idx;
          return (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`p-5 text-left transition-all ${
                isSelected
                  ? 'bg-[#171717] border border-[#D90429] shadow-lg shadow-[#D90429]/20'
                  : 'bg-[#0A0A0A] border border-[#2A2A2A] hover:border-[#888888]'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-[#D90429]">{item.step}</span>
                <Icon className={`h-5 w-5 ${isSelected ? 'text-[#D90429]' : 'text-[#888888]'}`} />
              </div>
              <h4 className="font-heading text-xs font-bold text-[#F5F5F5] uppercase">{item.title}</h4>
              <p className="text-[10px] text-[#888888] mt-1 line-clamp-1 font-mono">{item.subtitle}</p>
            </button>
          );
        })}
      </div>

      {/* Selected Step Active Detail Box */}
      <div className="bg-[#171717] border border-[#2A2A2A] p-8 text-left relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-[#0A0A0A] border border-[#D90429]/50 px-3 py-1 text-xs font-mono text-[#D90429]">
              <span>STEP {steps[activeStep].step} OF 05</span>
              <span>•</span>
              <span>{steps[activeStep].status}</span>
            </div>

            <h3 className="font-heading text-2xl font-bold text-[#F5F5F5] uppercase">{steps[activeStep].title}</h3>
            <p className="text-xs text-[#888888] font-sans leading-relaxed">{steps[activeStep].description}</p>
          </div>

          <div className="w-full md:w-auto p-6 bg-[#0A0A0A] border border-[#2A2A2A] space-y-2 text-xs font-mono">
            <p className="text-[#888888]">// Aegis Lifecycle Trigger</p>
            <p className="text-[#D90429]">STATE: EXEC_ACTIVE</p>
            <p className="text-[#F5F5F5]">LATENCY: &lt; 450ms</p>
            <p className="text-[#00C853]">STATUS: VERIFIED_SAFE</p>
          </div>
        </div>
      </div>
    </div>
  );
};
