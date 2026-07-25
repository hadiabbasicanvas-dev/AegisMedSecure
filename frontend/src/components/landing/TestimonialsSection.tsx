import React from 'react';
import { Quote, Star } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote: 'Aegis Guardian AI isolated a simulated ransomware SMB vector on our PACS imaging server in less than 400 milliseconds without disrupting DICOM image feeds to our surgical suites.',
      author: 'Dr. Tariq Mahmood',
      title: 'Chief Information Security Officer (CISO)',
      facility: 'Quaid-e-Azam International Hospital',
    },
    {
      quote: 'The OpenAI GPT-4o integration gives our SOC analysts immediate root-cause clarity during high-severity threat bursts. The zero-trust VLAN micro-segmentation is revolutionary.',
      author: 'Ayesha Malik',
      title: 'Head of SOC Security Operations',
      facility: 'QIH Cyber Defense Command Center',
    },
    {
      quote: 'As a surgeon, uninterrupted access to patient EMR and bedside ICU monitoring is critical. Aegis guarantees full medical continuity while locking down network vectors.',
      author: 'Dr. Zain Ahmed',
      title: 'Head of Surgical Operations & Critical Care',
      facility: 'Quaid-e-Azam International Hospital',
    },
  ];

  return (
    <div id="testimonials" className="space-y-12 py-12">
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D90429] bg-[#171717] border border-[#D90429]/40 px-3 py-1">
          EXECUTIVE TESTIMONIALS
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F5F5F5] uppercase">
          TRUSTED BY HEALTHCARE LEADERS
        </h2>
        <p className="text-xs md:text-sm text-[#888888] font-sans leading-relaxed">
          Operational feedback from hospital security leaders, chief medical officers, and SOC architects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((item, idx) => (
          <div
            key={idx}
            className="matte-card p-8 flex flex-col justify-between space-y-6 relative group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-4">
                <Quote className="h-6 w-6 text-[#D90429]" />
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, sIdx) => (
                    <Star key={sIdx} className="h-3.5 w-3.5 fill-[#D90429] text-[#D90429]" />
                  ))}
                </div>
              </div>

              <p className="text-xs text-[#F5F5F5] font-sans leading-relaxed italic">
                &ldquo;{item.quote}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-[#2A2A2A] space-y-1">
              <p className="font-heading text-sm font-bold text-[#F5F5F5] uppercase">{item.author}</p>
              <p className="text-[11px] font-mono text-[#D90429]">{item.title}</p>
              <p className="text-[10px] font-mono text-[#888888]">{item.facility}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
