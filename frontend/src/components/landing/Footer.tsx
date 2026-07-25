import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Github, Twitter, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#2A2A2A] bg-[#0A0A0A] text-[#888888] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#2A2A2A]">
        {/* Column 1: Brand & Academic Scope */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center h-10 w-10 bg-[#171717] border border-[#2A2A2A] text-[#D90429]">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <span className="font-heading font-bold text-[#F5F5F5] text-base uppercase">AEGIS GUARDIAN AI</span>
              <p className="text-[10px] text-[#D90429] font-mono">QIH Cyber Defense</p>
            </div>
          </div>
          <p className="text-xs text-[#888888] font-sans leading-relaxed">
            Autonomous AI cyber defense system protecting EMR, PACS diagnostic imaging, and IoMT life-safety subnets.
          </p>
          <div className="flex items-center space-x-3 pt-2">
            <a href="#" className="p-2 bg-[#171717] border border-[#2A2A2A] text-[#F5F5F5] hover:text-[#D90429] hover:border-[#D90429] transition-colors" aria-label="GitHub">
              <Github className="h-4 w-4" />
            </a>
            <a href="#" className="p-2 bg-[#171717] border border-[#2A2A2A] text-[#F5F5F5] hover:text-[#D90429] hover:border-[#D90429] transition-colors" aria-label="Twitter">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" className="p-2 bg-[#171717] border border-[#2A2A2A] text-[#F5F5F5] hover:text-[#D90429] hover:border-[#D90429] transition-colors" aria-label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Column 2: System Features & Pages */}
        <div className="space-y-3 font-mono text-xs">
          <h4 className="font-bold text-[#F5F5F5] uppercase tracking-wider">PLATFORM GATEWAY</h4>
          <ul className="space-y-2">
            <li><a href="#threat-engine" className="hover:text-[#D90429] transition-colors">Threat Engine</a></li>
            <li><a href="#soar" className="hover:text-[#D90429] transition-colors">SOAR Automation</a></li>
            <li><a href="#solutions" className="hover:text-[#D90429] transition-colors">Hospital Scenarios</a></li>
            <li><a href="#pricing" className="hover:text-[#D90429] transition-colors">Deployment Tiers</a></li>
            <li><a href="#contact" className="hover:text-[#D90429] transition-colors">Enterprise Inquiry</a></li>
          </ul>
        </div>

        {/* Column 3: Security & Access */}
        <div className="space-y-3 font-mono text-xs">
          <h4 className="font-bold text-[#F5F5F5] uppercase tracking-wider">OPERATOR ACCESS</h4>
          <ul className="space-y-2">
            <li><Link to="/login" className="hover:text-[#D90429] transition-colors">SOC Portal Login</Link></li>
            <li><Link to="/register" className="hover:text-[#D90429] transition-colors">Operator Registration</Link></li>
            <li><Link to="/forgot-password" className="hover:text-[#D90429] transition-colors">Credential Reset</Link></li>
            <li><Link to="/403" className="hover:text-[#D90429] transition-colors">RBAC Governance</Link></li>
          </ul>
        </div>

        {/* Column 4: Client & Location Info */}
        <div className="space-y-3 font-mono text-xs">
          <h4 className="font-bold text-[#F5F5F5] uppercase tracking-wider">Quaid-e-Azam Int. Hospital</h4>
          <div className="space-y-2 text-[#888888]">
            <p className="flex items-start space-x-2">
              <MapPin className="h-4 w-4 text-[#D90429] shrink-0 mt-0.5" />
              <span>Near Golra Morr, Peshawar Road, Islamabad, Pakistan</span>
            </p>
            <p className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-[#D90429] shrink-0" />
              <span>+92 51 8449100</span>
            </p>
            <p className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-[#D90429] shrink-0" />
              <span>sec-ops@qih.hospital</span>
            </p>
          </div>
        </div>
      </div>

      {/* Academic Disclaimer & Copyright Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-xs font-mono">
        <div className="space-y-1">
          <p className="text-[#888888]">
            © 2026 Quaid-e-Azam International Hospital / Aegis Guardian AI. All rights reserved.
          </p>
          <p className="text-[10px] text-[#D90429]">
            ⚠️ Aegis Guardian AI is an enterprise cyber defense platform engineered for Quaid-e-Azam International Hospital.
          </p>
        </div>
      </div>
    </footer>
  );
};
