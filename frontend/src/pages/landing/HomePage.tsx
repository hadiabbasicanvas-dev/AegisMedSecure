import React from 'react';
import { HeroBanner } from '@/components/landing/HeroBanner';
import { MetricCard } from '@/components/landing/MetricCard';
import { FeatureCard } from '@/components/landing/FeatureCard';
import { WorkflowTimeline } from '@/components/landing/WorkflowTimeline';
import { SolutionCard } from '@/components/landing/SolutionCard';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { PricingSection } from '@/components/landing/PricingSection';
import { FAQAccordion } from '@/components/landing/FAQAccordion';
import { ContactForm } from '@/components/landing/ContactForm';
import { SectionWrapper } from '@/components/landing/SectionWrapper';

export const HomePage: React.FC = () => {
  return (
    <div className="bg-[#0A0A0A] text-[#F5F5F5] space-y-16 overflow-hidden selection:bg-[#D90429] selection:text-[#F5F5F5]">
      {/* 1. Hero Section: Cinematic 3D Hospital Holographic Telemetry */}
      <HeroBanner />

      {/* 2. Trust Indicators & Benchmark Performance Metrics */}
      <SectionWrapper id="metrics" delay={0.1}>
        <MetricCard />
      </SectionWrapper>

      {/* 3. Threat Detection Engine */}
      <SectionWrapper id="threat-engine" delay={0.2}>
        <FeatureCard />
      </SectionWrapper>

      {/* 4. SOAR Response Lifecycle */}
      <SectionWrapper id="soar" delay={0.2}>
        <WorkflowTimeline />
      </SectionWrapper>

      {/* 5. Hospital Subnet Architecture */}
      <SectionWrapper id="solutions" delay={0.2}>
        <SolutionCard />
      </SectionWrapper>

      {/* 6. Executive Testimonials */}
      <SectionWrapper id="testimonials" delay={0.2}>
        <TestimonialsSection />
      </SectionWrapper>

      {/* 7. Enterprise Deployment Tiers */}
      <SectionWrapper id="pricing" delay={0.2}>
        <PricingSection />
      </SectionWrapper>

      {/* 8. Capability & Audit FAQ */}
      <SectionWrapper id="faq" delay={0.2}>
        <FAQAccordion />
      </SectionWrapper>

      {/* 9. Industrial Contact & Inquiry Form */}
      <SectionWrapper id="contact" delay={0.2}>
        <ContactForm />
      </SectionWrapper>
    </div>
  );
};
