import React from 'react';
import { Cpu, ShieldAlert, HeartPulse, MessageSquare, FileText, UserCheck, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FeatureCard: React.FC = () => {
  const features = [
    {
      title: 'AI Neural Threat Detection Engine',
      description: 'Ingests high-frequency syslog and packet telemetry, utilizing OpenAI GPT-4o to classify ransomware SMB encryption patterns and zero-day exploits.',
      icon: Cpu,
      tag: 'Neural Engine',
    },
    {
      title: 'Autonomous SOAR Isolation',
      description: 'Executes sub-450ms micro-segmentation VLAN quarantine to instantly isolate compromised endpoints without disrupting critical patient life support.',
      icon: ShieldAlert,
      tag: 'SOAR Engine',
    },
    {
      title: 'IoMT Clinical Device Profiling',
      description: 'Passive non-intrusive network behavior profiling for PACS DICOM imaging, MRI scanners, infusion pumps, and central ICU monitors.',
      icon: HeartPulse,
      tag: 'Clinical Security',
    },
    {
      title: 'Conversational Security Copilot',
      description: 'Natural language querying assistant allowing analysts to execute queries like "Analyze packet payload" or "Apply DICOM policy" instantly.',
      icon: MessageSquare,
      tag: 'GPT-4o Copilot',
    },
    {
      title: 'HIPAA & ISO Audit Compiler',
      description: 'Automated forensic audit log compiler and PDF/CSV compliance report exporter tailored for hospital regulatory audits.',
      icon: FileText,
      tag: 'Compliance Engine',
    },
    {
      title: '5-Tier RBAC Governance Matrix',
      description: 'Granular identity access controls enforcing strict permissions across Super Administrators, SOC Managers, Security Analysts, IT Admins, and Auditors.',
      icon: UserCheck,
      tag: 'Identity Guard',
    },
  ];

  return (
    <div id="threat-engine" className="space-y-12 py-12">
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D90429] bg-[#171717] border border-[#D90429]/40 px-3 py-1">
          THREAT DETECTION & SOAR ENGINE
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F5F5F5] uppercase">
          MISSION-CRITICAL HEALTHCARE DEFENSE
        </h2>
        <p className="text-xs md:text-sm text-[#888888] font-sans leading-relaxed">
          Purpose-built cybersecurity architecture designed to mitigate critical vulnerabilities across hospital IT, PACS DICOM archives, and IoMT life-support subnets.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <div
              key={idx}
              className="matte-card p-8 flex flex-col justify-between space-y-6 relative group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-4">
                  <div className="p-3 bg-[#0A0A0A] border border-[#2A2A2A] group-hover:border-[#D90429] transition-colors">
                    <Icon className="h-6 w-6 text-[#D90429] group-hover:rotate-6 transition-transform" />
                  </div>
                  <span className="text-[10px] font-mono text-[#F5F5F5] bg-[#0A0A0A] border border-[#2A2A2A] px-3 py-1 uppercase tracking-wider">
                    {feat.tag}
                  </span>
                </div>

                <h3 className="font-heading text-xl font-bold text-[#F5F5F5] group-hover:text-[#D90429] transition-colors uppercase">
                  {feat.title}
                </h3>

                <p className="text-xs text-[#888888] leading-relaxed font-sans font-light">
                  {feat.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#2A2A2A] flex items-center justify-between font-mono text-xs">
                <Link to="/features" className="text-[#F5F5F5] hover:text-[#D90429] font-bold inline-flex items-center group-hover:translate-x-1 transition-transform">
                  SPECIFICATION <ArrowUpRight className="ml-1 h-4 w-4 text-[#D90429]" />
                </Link>
                <span className="text-[10px] text-[#888888]">MODULE #{idx + 1}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
