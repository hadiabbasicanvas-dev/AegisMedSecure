import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Check, ArrowRight } from 'lucide-react';

export const PricingSection: React.FC = () => {
  const tiers = [
    {
      name: 'CLINICAL COMMUNITY TIER',
      badge: 'ACADEMIC & LOCAL HOSPITALS',
      price: 'FREE / DEMO',
      period: 'Full Academic Demonstration License',
      description: 'Pre-configured autonomous threat defense for single hospital facilities and academic medical centers.',
      features: [
        'Up to 400 Hospital Beds Covered',
        'OpenAI GPT-4o Threat Analysis',
        'Sub-450ms Software VLAN Isolation',
        'PACS / EMR Telemetry Ingestion',
        '5-Tier RBAC Access Control',
        'HIPAA & ISO PDF Export',
      ],
      isPopular: false,
    },
    {
      name: 'ENTERPRISE SOC SHIELD',
      badge: 'MOST POPULAR',
      price: '$4,800',
      period: 'per facility / month',
      description: 'Comprehensive 24/7 autonomous defense for tertiary care hospitals and regional healthcare hubs.',
      features: [
        'Unlimited Hospital Beds & Subnets',
        'Dedicated AI Agent Fine-Tuning',
        'Zero-Latency Micro-Segmentation',
        'IoMT Device Behavior Profiling',
        'Custom SOAR Playbook Execution',
        '24/7 Incident Escalation Support',
        'Automated Regulatory Auditing',
      ],
      isPopular: true,
    },
    {
      name: 'FEDERATED NETWORK SHIELD',
      badge: 'MULTI-SITE HEALTHCARE',
      price: 'CUSTOM',
      period: 'Enterprise SLA & On-Premises Deployment',
      description: 'Multi-tenant SOC command architecture tailored for hospital networks and nationwide healthcare systems.',
      features: [
        'Multi-Site Federated SOC Command',
        'Air-Gapped On-Premises AI Deployment',
        'Custom Hardware VLAN Appliance',
        'Dedicated Technical Account Manager',
        '99.99% Uptime Service Level Agreement',
        'Direct EHR Integration API',
      ],
      isPopular: false,
    },
  ];

  return (
    <div id="pricing" className="space-y-12 py-12">
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D90429] bg-[#171717] border border-[#D90429]/40 px-3 py-1">
          ENTERPRISE DEPLOYMENT TIERS
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F5F5F5] uppercase">
          TRANSPARENT HOSPITAL PRICING
        </h2>
        <p className="text-xs md:text-sm text-[#888888] font-sans leading-relaxed">
          Scalable security tiers tailored for single clinical sites, regional tertiary care hospitals, and multi-tenant networks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier, idx) => (
          <div
            key={idx}
            className={`matte-card p-8 flex flex-col justify-between space-y-8 relative ${
              tier.isPopular ? 'border-[#D90429] shadow-2xl shadow-[#D90429]/10 bg-[#171717]' : 'bg-[#0A0A0A]'
            }`}
          >
            {tier.isPopular && (
              <div className="absolute -top-3 right-6 bg-[#D90429] text-[#F5F5F5] px-3 py-1 text-[10px] font-mono font-bold tracking-widest uppercase">
                {tier.badge}
              </div>
            )}

            <div className="space-y-6">
              <div className="border-b border-[#2A2A2A] pb-4 space-y-1">
                <span className="text-[10px] font-mono text-[#888888] uppercase tracking-widest">{tier.badge}</span>
                <h3 className="font-heading text-xl font-bold text-[#F5F5F5] uppercase">{tier.name}</h3>
              </div>

              <div>
                <div className="text-4xl font-heading font-extrabold text-[#F5F5F5]">{tier.price}</div>
                <p className="text-[11px] font-mono text-[#888888] mt-1">{tier.period}</p>
              </div>

              <p className="text-xs text-[#888888] font-sans leading-relaxed">{tier.description}</p>

              <div className="space-y-3 pt-2 border-t border-[#2A2A2A]">
                {tier.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center space-x-3 text-xs font-mono text-[#F5F5F5]">
                    <Check className="h-4 w-4 text-[#D90429] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link to="/register">
              <button
                className={`w-full py-4 text-xs font-mono font-bold tracking-widest uppercase transition-all flex items-center justify-center space-x-2 ${
                  tier.isPopular
                    ? 'bg-[#0A0A0A] border border-[#D90429] text-[#F5F5F5] shadow-[0_0_15px_rgba(217,4,41,0.3)] hover:shadow-[0_0_25px_rgba(217,4,41,0.6)]'
                    : 'bg-[#171717] border border-[#2A2A2A] text-[#F5F5F5] hover:border-[#D90429]'
                }`}
              >
                <span>DEPLOY TO HOSPITAL</span>
                <ArrowRight className="h-4 w-4 text-[#D90429]" />
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
