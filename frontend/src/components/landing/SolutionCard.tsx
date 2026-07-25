import React from 'react';
import { Building2, Network, ShieldCheck, Database, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SolutionCard: React.FC = () => {
  const solutions = [
    {
      title: 'Tertiary Care Hospitals',
      caseStudy: 'Quaid-e-Azam Int. Hospital Reference Architecture',
      description: 'Comprehensive SOC coverage across 400 inpatient beds, emergency subnets, 24/7 operating theatres, and central ICU monitors.',
      icon: Building2,
      specs: ['400 Bed Capacity Protected', 'EMR & PACS Isolation', 'Zero Life-Support Interruption'],
      tag: 'QIH Reference Model',
    },
    {
      title: 'Healthcare Multi-Site Networks',
      caseStudy: 'Federated Regional Clinic Networks',
      description: 'Unified multi-tenant threat intelligence aggregating telemetry from outpatient clinics, urgent care centers, and central command.',
      icon: Network,
      specs: ['Multi-Tenant SOC Architecture', 'Centralized AI Threat Intelligence', 'Global Policy Enforcement'],
      tag: 'Enterprise Federation',
    },
    {
      title: 'Diagnostic Imaging Centers',
      caseStudy: 'PACS / RIS / DICOM Security Vault',
      description: 'Dedicated non-intrusive inspection shielding high-volume MRI, CT scanner, and X-ray DICOM image transmission protocols.',
      icon: ShieldCheck,
      specs: ['DICOM Protocol Inspection', 'Zero Bandwidth Overhead', 'Anti-Ransomware Shield'],
      tag: 'Imaging Subnet',
    },
    {
      title: 'Clinical Research Labs',
      caseStudy: 'Genomic & Patient Trial Vaults',
      description: 'HIPAA & GDPR compliant data perimeter shielding sensitive patient genomic research databases and clinical trial repositories.',
      icon: Database,
      specs: ['HIPAA Data Perimeter', 'Air-Gapped Quarantine', 'Automated Audit Logs'],
      tag: 'Research Vault',
    },
  ];

  return (
    <div id="solutions" className="space-y-12 py-12">
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D90429] bg-[#171717] border border-[#D90429]/40 px-3 py-1">
          HOSPITAL DEPLOYMENT SCENARIOS
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F5F5F5] uppercase">
          TAILORED ENVIRONMENT SUBNETS
        </h2>
        <p className="text-xs md:text-sm text-[#888888] font-sans leading-relaxed">
          Pre-configured security architectures optimized for hospital subnets, clinical wards, and IoMT device networks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {solutions.map((sol, idx) => {
          const Icon = sol.icon;
          return (
            <div
              key={idx}
              className="matte-card p-8 flex flex-col justify-between space-y-6 relative group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-4">
                  <div className="p-3 bg-[#0A0A0A] border border-[#2A2A2A] group-hover:border-[#D90429] transition-colors">
                    <Icon className="h-6 w-6 text-[#D90429]" />
                  </div>
                  <span className="text-[10px] font-mono text-[#F5F5F5] bg-[#0A0A0A] border border-[#2A2A2A] px-3 py-1 uppercase tracking-wider">
                    {sol.tag}
                  </span>
                </div>

                <div>
                  <h3 className="font-heading text-xl font-bold text-[#F5F5F5] uppercase group-hover:text-[#D90429] transition-colors">
                    {sol.title}
                  </h3>
                  <p className="text-xs font-mono text-[#888888] mt-1">{sol.caseStudy}</p>
                </div>

                <p className="text-xs text-[#888888] leading-relaxed font-sans font-light">
                  {sol.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-[#2A2A2A]/60">
                  {sol.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex items-center space-x-2 text-xs font-mono text-[#F5F5F5]">
                      <span className="h-1.5 w-1.5 bg-[#D90429]" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#2A2A2A] flex items-center justify-between font-mono text-xs">
                <Link to="/solutions" className="text-[#F5F5F5] hover:text-[#D90429] font-bold inline-flex items-center group-hover:translate-x-1 transition-transform">
                  DEPLOYMENT SPEC <ArrowRight className="ml-1 h-4 w-4 text-[#D90429]" />
                </Link>
                <span className="text-[10px] text-[#888888]">PROFILE #{idx + 1}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
