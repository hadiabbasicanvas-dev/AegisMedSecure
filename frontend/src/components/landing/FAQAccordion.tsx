import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What is the primary scope and goal of Aegis Guardian AI?',
      answer: 'Aegis Guardian AI is an enterprise-grade autonomous cyber defense platform engineered for Quaid-e-Azam International Hospital (QIH). Its goal is to demonstrate sub-second ransomware isolation and AI-driven telemetry analysis across clinical subnets (EMR, PACS, IoMT) without affecting life-critical patient monitoring equipment.',
    },
    {
      question: 'How does the OpenAI GPT-4o neural model score threats?',
      answer: 'The system ingests high-volume network syslog streams, parses packet headers, and presents anomalous behavior vectors to a fine-tuned GPT-4o inference pipeline. The model calculates a contextual risk score (0-100) factoring in host criticality (e.g. ICU ventilator vs administrative workstation).',
    },
    {
      question: 'How does SOAR micro-segmentation guarantee zero patient downtime?',
      answer: 'Instead of shutting down physical network switches, Aegis executes software VLAN isolation at the host network interface level. Infected IP addresses are quarantined into restricted software VLANs while life-support communication protocols remain unhindered.',
    },
    {
      question: 'Is real patient data processed or compromised during live operations?',
      answer: 'No. As an academic demonstration, all telemetry events, network IP addresses, patient records, and threat scenarios are 100% simulated in accordance with strict academic research safeguards and HIPAA data privacy guidelines.',
    },
    {
      question: 'What operator roles are supported under the 5-Tier RBAC governance model?',
      answer: 'The platform enforces granular permissions for Super Administrators, SOC Managers, Security Analysts, IT Administrators, and Compliance Officers to ensure strict separation of duty.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div id="faq" className="space-y-12 max-w-4xl mx-auto py-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D90429] bg-[#171717] border border-[#D90429]/40 px-3 py-1">
          FREQUENTLY ASKED QUESTIONS
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F5F5F5] uppercase">
          SYSTEM CAPABILITY & AUDIT FAQ
        </h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`bg-[#171717] border transition-colors overflow-hidden ${
                isOpen ? 'border-[#D90429]' : 'border-[#2A2A2A] hover:border-[#888888]'
              }`}
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-6 text-left flex items-center justify-between space-x-4 focus:outline-none"
              >
                <span className="font-heading text-sm font-bold text-[#F5F5F5] uppercase tracking-wide">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-[#D90429] shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6 text-xs text-[#888888] font-sans leading-relaxed border-t border-[#2A2A2A] pt-4"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};
