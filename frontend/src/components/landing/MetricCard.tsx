import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Activity, Building, Lock, CheckCircle2, Award } from 'lucide-react';

export const MetricCard: React.FC = () => {
  const trustBadges = [
    { name: 'Quaid-e-Azam Int. Hospital', role: 'Primary Healthcare Partner' },
    { name: 'HIPAA COMPLIANT', role: 'Patient Data Privacy Standard' },
    { name: 'ISO 27001 / 27701', role: 'Certified ISMS Framework' },
    { name: 'SOC 2 TYPE II', role: 'Enterprise Security Audit' },
    { name: '99.99% UPTIME SLA', role: 'Zero Patient Care Interruption' },
  ];

  const metrics = [
    {
      label: 'AI Neural Detection Accuracy',
      value: '99.94%',
      subtext: 'GPT-4o anomaly classification precision model',
      icon: ShieldCheck,
      color: 'text-[#00C853]',
    },
    {
      label: 'SOAR Micro-Segmentation Latency',
      value: '< 450 ms',
      subtext: 'Instant software VLAN quarantine execution',
      icon: Zap,
      color: 'text-[#D90429]',
    },
    {
      label: 'Telemetry Stream Velocity',
      value: '10,000+',
      subtext: 'Syslog events ingested per second',
      icon: Activity,
      color: 'text-[#F5F5F5]',
    },
    {
      label: 'Protected Clinical Capacity',
      value: '400 Beds',
      subtext: 'Quaid-e-Azam Int. Hospital active wards',
      icon: Building,
      color: 'text-[#888888]',
    },
  ];

  return (
    <div className="space-y-16 py-12">
      {/* Enterprise Trust Indicators Strip */}
      <div className="space-y-6">
        <p className="text-[10px] font-mono uppercase tracking-widest text-[#888888] text-center">
          ENTERPRISE HEALTHCARE COMPLIANCE & TRUST STANDARDS
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {trustBadges.map((badge, idx) => (
            <div
              key={idx}
              className="p-4 bg-[#171717] border border-[#2A2A2A] hover:border-[#D90429] transition-colors text-center space-y-1 group"
            >
              <Award className="h-5 w-5 text-[#D90429] mx-auto group-hover:scale-110 transition-transform" />
              <p className="text-xs font-mono font-bold text-[#F5F5F5]">{badge.name}</p>
              <p className="text-[9px] font-mono text-[#888888]">{badge.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Industrial Metric Cards */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-[#D90429] uppercase tracking-widest bg-[#171717] border border-[#D90429]/40 px-3 py-1">
            BENCHMARK PERFORMANCE METRICS
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F5F5F5] uppercase">
            REAL-TIME TELEMETRY PERFOMANCE
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div
                key={idx}
                className="matte-card p-6 flex flex-col justify-between space-y-6 relative group"
              >
                <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#888888]">
                    BENCHMARK #{idx + 1}
                  </span>
                  <Icon className={`h-6 w-6 ${metric.color} group-hover:rotate-12 transition-transform`} />
                </div>

                <div className="space-y-1">
                  <div className="text-4xl font-heading font-extrabold text-[#F5F5F5] tracking-tight">
                    {metric.value}
                  </div>
                  <p className="text-xs font-mono font-bold text-[#F5F5F5] uppercase">{metric.label}</p>
                  <p className="text-[11px] text-[#888888] font-sans">{metric.subtext}</p>
                </div>

                <div className="pt-3 border-t border-[#2A2A2A] flex items-center justify-between font-mono text-[10px] text-[#888888]">
                  <span>QIH TELEMETRY OK</span>
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#00C853]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
