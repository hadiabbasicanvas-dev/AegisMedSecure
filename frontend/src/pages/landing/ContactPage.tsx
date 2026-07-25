import React from 'react';
import { SectionWrapper } from '@/components/landing/SectionWrapper';
import { ContactForm } from '@/components/landing/ContactForm';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock, ShieldAlert } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <div className="py-12 space-y-12">
      {/* Header Banner */}
      <SectionWrapper className="text-center space-y-4">
        <Badge variant="info" className="uppercase font-mono tracking-widest text-[10px]">
          Inquiry & Support Hotline
        </Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-50">
          Contact Aegis Security Team
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl mx-auto">
          Get in touch with the cybersecurity research team at Quaid-e-Azam International Hospital.
        </p>
      </SectionWrapper>

      {/* Info Cards Row */}
      <SectionWrapper className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <CardContent className="p-0 space-y-2 text-center">
            <MapPin className="h-8 w-8 text-cyan-400 mx-auto" />
            <h3 className="text-sm font-bold text-slate-100">Hospital Location</h3>
            <p className="text-xs text-slate-400">Near Golra Morr, Peshawar Road, Islamabad, Pakistan</p>
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardContent className="p-0 space-y-2 text-center">
            <Phone className="h-8 w-8 text-cyan-400 mx-auto" />
            <h3 className="text-sm font-bold text-slate-100">Direct Hotline</h3>
            <p className="text-xs text-slate-400">+92 51 8449100</p>
            <p className="text-[10px] text-cyan-400 font-mono">24/7 SOC Emergency Line</p>
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardContent className="p-0 space-y-2 text-center">
            <Mail className="h-8 w-8 text-cyan-400 mx-auto" />
            <h3 className="text-sm font-bold text-slate-100">Electronic Mail</h3>
            <p className="text-xs text-slate-400">sec-ops@qih.hospital</p>
            <p className="text-[10px] text-slate-500 font-mono">Encrypted PGP Key Available</p>
          </CardContent>
        </Card>
      </SectionWrapper>

      {/* Form Section */}
      <SectionWrapper>
        <ContactForm />
      </SectionWrapper>
    </div>
  );
};
