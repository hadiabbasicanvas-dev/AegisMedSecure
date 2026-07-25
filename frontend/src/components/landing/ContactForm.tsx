import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle2, Mail, Building, User, MessageSquare } from 'lucide-react';

const contactSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Please enter a valid email address'),
  organization: z.string().min(2, 'Organization / Hospital name is required'),
  inquiryType: z.enum([
    'DEMO_REQUEST',
    'ACADEMIC_RESEARCH',
    'SECURITY_AUDIT',
    'PARTNERSHIP',
    'GENERAL',
  ]),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      inquiryType: 'DEMO_REQUEST',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setSubmitted(true);
    reset();
  };

  return (
    <div id="contact" className="space-y-8 max-w-3xl mx-auto py-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D90429] bg-[#171717] border border-[#D90429]/40 px-3 py-1">
          ENTERPRISE INQUIRY & DEMO
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F5F5F5] uppercase">
          REQUEST HOSPITAL DEFENSE DEMO
        </h2>
        <p className="text-xs md:text-sm text-[#888888] font-sans max-w-xl mx-auto">
          Connect with the Aegis Guardian AI cybersecurity & SOC team at Quaid-e-Azam International Hospital.
        </p>
      </div>

      <div className="bg-[#171717] border border-[#2A2A2A] p-8 text-left relative overflow-hidden">
        {submitted ? (
          <div className="py-10 text-center space-y-4 text-[#00C853]">
            <CheckCircle2 className="h-16 w-16 mx-auto text-[#00C853] animate-bounce" />
            <h3 className="font-heading text-xl font-bold text-[#F5F5F5] uppercase">Inquiry Successfully Received</h3>
            <p className="text-xs text-[#888888] font-sans max-w-md mx-auto">
              Thank you for contacting Project Aegis. Our SOC team at QIH Islamabad will process your request shortly.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-2.5 text-xs font-mono tracking-wider text-[#F5F5F5] bg-[#0A0A0A] border border-[#2A2A2A] hover:border-[#D90429] transition-colors"
            >
              SEND ANOTHER INQUIRY
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 font-mono text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#F5F5F5] uppercase tracking-wider flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-[#D90429]" /> Full Name
                </label>
                <input
                  type="text"
                  placeholder="Dr. Zain Ahmed"
                  {...register('fullName')}
                  className="w-full h-10 bg-[#0A0A0A] border border-[#2A2A2A] px-3 text-[#F5F5F5] focus:border-[#D90429] focus:outline-none"
                />
                {errors.fullName && <p className="text-[10px] text-[#D90429]">{errors.fullName.message}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#F5F5F5] uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-[#D90429]" /> Hospital Email
                </label>
                <input
                  type="email"
                  placeholder="zain.ahmed@qih.hospital"
                  {...register('email')}
                  className="w-full h-10 bg-[#0A0A0A] border border-[#2A2A2A] px-3 text-[#F5F5F5] focus:border-[#D90429] focus:outline-none"
                />
                {errors.email && <p className="text-[10px] text-[#D90429]">{errors.email.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#F5F5F5] uppercase tracking-wider flex items-center gap-1.5">
                  <Building className="h-3.5 w-3.5 text-[#D90429]" /> Facility Name
                </label>
                <input
                  type="text"
                  placeholder="Quaid-e-Azam Int. Hospital"
                  {...register('organization')}
                  className="w-full h-10 bg-[#0A0A0A] border border-[#2A2A2A] px-3 text-[#F5F5F5] focus:border-[#D90429] focus:outline-none"
                />
                {errors.organization && <p className="text-[10px] text-[#D90429]">{errors.organization.message}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#F5F5F5] uppercase tracking-wider">
                  Inquiry Type
                </label>
                <select
                  {...register('inquiryType')}
                  className="w-full h-10 bg-[#0A0A0A] border border-[#2A2A2A] px-3 text-[#F5F5F5] focus:border-[#D90429] focus:outline-none"
                >
                  <option value="DEMO_REQUEST">Academic Demonstration Request</option>
                  <option value="ACADEMIC_RESEARCH">Cybersecurity Research Collaboration</option>
                  <option value="SECURITY_AUDIT">HIPAA Architecture Audit</option>
                  <option value="PARTNERSHIP">Technology Partnership</option>
                  <option value="GENERAL">General Inquiry</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-[#F5F5F5] uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="h-3.5 w-3.5 text-[#D90429]" /> Technical Requirements
              </label>
              <textarea
                rows={4}
                placeholder="Describe your inquiry or hospital subnet configuration details..."
                {...register('message')}
                className="w-full bg-[#0A0A0A] border border-[#2A2A2A] p-3 text-[#F5F5F5] placeholder:text-[#888888] focus:border-[#D90429] focus:outline-none"
              />
              {errors.message && <p className="text-[10px] text-[#D90429]">{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 text-xs font-mono font-bold tracking-widest text-[#F5F5F5] bg-[#0A0A0A] border border-[#D90429] shadow-[0_0_15px_rgba(217,4,41,0.2)] hover:shadow-[0_0_25px_rgba(217,4,41,0.5)] transition-all flex items-center justify-center space-x-2"
            >
              <Send className="h-4 w-4 text-[#D90429]" />
              <span>{isSubmitting ? 'SUBMITTING INQUIRY...' : 'SUBMIT ENTERPRISE INQUIRY'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
