import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, ArrowRight, Eye, Radio } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  return (
    <div className="relative pt-16 lg:pt-20 pb-12 overflow-hidden bg-[#0A0A0A] border-b border-[#2A2A2A]">
      {/* Background Interactive Layers: Industrial Grid, Scanline, Subtle Red Glow */}
      <div className="absolute inset-0 bg-industrial-grid opacity-35 pointer-events-none" />

      {/* Laser Scanline Beam */}
      <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D90429] to-transparent animate-laser-scan pointer-events-none z-10" />

      <div className="w-full max-w-[100rem] mx-auto px-6 sm:px-10 lg:px-16 relative z-20">
        {/* Two-Column Balanced Hero Grid Layout - Shifted Upward */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start pt-2">
          
          {/* LEFT COLUMN: Hospital Name Badge at Top-Left, Followed by Typography */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Hospital Name Badge Positioned Top-Left */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-3 bg-[#171717] border border-[#D90429]/50 px-4 py-2 text-xs font-mono text-[#F5F5F5] uppercase tracking-widest"
            >
              <Radio className="h-4 w-4 text-[#D90429] animate-pulse" />
              <span>Quaid-e-Azam Int. Hospital Cyber Defense</span>
              <span className="h-2 w-2 rounded-full bg-[#00C853] inline-block" />
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-[52px] xl:text-[60px] leading-[1.08] text-[#F5F5F5] tracking-tight uppercase"
            >
              AUTONOMOUS CYBER DEFENSE <br />
              <span className="text-[#D90429]">
                FOR HEALTHCARE INFRASTRUCTURE
              </span>
            </motion.h1>

            {/* Left-Aligned Body Text */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg lg:text-[19px] text-[#F5F5F5]/90 leading-relaxed font-sans font-light max-w-2xl"
            >
              Protecting 400+ hospital beds, EMR databases, DICOM imaging archives, and IoMT life-support networks with sub-450ms zero-trust VLAN isolation against ransomware and zero-day threats.
            </motion.p>

            {/* Telemetry Metric Highlights Bar */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-3 gap-4 pt-2 font-mono text-xs max-w-xl"
            >
              <div className="p-4 bg-[#171717] border border-[#2A2A2A] space-y-1">
                <span className="text-[10px] text-[#888888] uppercase block font-bold">CAPACITY</span>
                <span className="font-bold text-base text-[#F5F5F5]">400 Wards</span>
              </div>
              <div className="p-4 bg-[#171717] border border-[#2A2A2A] space-y-1">
                <span className="text-[10px] text-[#888888] uppercase block font-bold">ISOLATION</span>
                <span className="font-bold text-base text-[#D90429]">&lt; 450ms</span>
              </div>
              <div className="p-4 bg-[#171717] border border-[#2A2A2A] space-y-1">
                <span className="text-[10px] text-[#888888] uppercase block font-bold">RELIABILITY</span>
                <span className="font-bold text-base text-[#00C853]">99.99% SLA</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Command Center Render & Action Buttons */}
          <div className="lg:col-span-6 space-y-6">
            {/* Command Center Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-[#171717] border border-[#2A2A2A] p-4 relative overflow-hidden shadow-2xl shadow-black group"
            >
              {/* Frame Top Telemetry Bar */}
              <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-3 mb-3 px-2 font-mono text-xs">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-[#D90429]" />
                  <span className="font-bold text-[#F5F5F5] uppercase tracking-wider text-xs">
                    QIH SOC COMMAND CENTER • FIREWALL ACTIVE
                  </span>
                </div>
                <span className="text-[#00C853] bg-[#0A0A0A] border border-[#00C853]/40 px-3 py-1 text-[10px] tracking-widest font-bold">
                  LIVE MONITORED
                </span>
              </div>

              {/* Render Image */}
              <div className="relative h-[380px] sm:h-[460px] lg:h-[500px] xl:h-[540px] w-full bg-[#0A0A0A] border border-[#2A2A2A] overflow-hidden">
                <img
                  src="/images/hospital_soc_cyber_defense_center.png"
                  alt="Cyber Security for Hospital Systems - Command Center"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-transparent to-transparent" />

                {/* Badges */}
                <div className="absolute top-4 left-4 p-3 bg-[#0A0A0A]/90 border border-[#2A2A2A] font-mono text-xs space-y-0.5 text-[#F5F5F5]">
                  <p className="text-[#D90429] font-bold text-xs">[PACS DICOM VAULT] SHIELDED</p>
                  <p className="text-[#888888] text-[11px]">10.45.0.0/16 • ZERO PATIENT DOWNTIME</p>
                </div>

                <div className="absolute bottom-4 right-4 p-3 bg-[#0A0A0A]/90 border border-[#00C853]/60 font-mono text-xs text-[#00C853] flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#00C853] animate-ping" />
                  <span className="font-bold text-xs">GPT-4o NEURAL DETECTOR: ONLINE</span>
                </div>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-end gap-4"
            >
              <Link to="/dashboard" className="w-full sm:w-auto">
                <button className="relative w-full sm:w-auto px-8 py-4 text-xs font-mono font-bold tracking-widest text-[#F5F5F5] bg-transparent border border-[#F5F5F5]/40 hover:border-[#D90429] hover:text-[#0A0A0A] overflow-hidden group transition-colors duration-500 flex items-center justify-center space-x-3">
                  <span className="absolute inset-0 w-full h-full bg-[#F5F5F5] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out -z-10" />
                  <Eye className="h-4 w-4 text-[#D90429] group-hover:text-[#0A0A0A] transition-colors" />
                  <span>VIEW LIVE THREAT DEMO</span>
                </button>
              </Link>

              <Link to="/register" className="w-full sm:w-auto">
                <button className="group relative w-full sm:w-auto px-8 py-4 text-xs font-mono font-bold tracking-widest text-[#F5F5F5] bg-[#0A0A0A] border border-[#D90429] shadow-[0_0_20px_rgba(217,4,41,0.25)] hover:shadow-[0_0_35px_rgba(217,4,41,0.6)] transition-all duration-300 flex items-center justify-center space-x-3">
                  <span>START PROTECTING HOSPITAL</span>
                  <ArrowRight className="h-4 w-4 text-[#D90429] group-hover:translate-x-1.5 transition-transform duration-300" />
                </button>
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};
