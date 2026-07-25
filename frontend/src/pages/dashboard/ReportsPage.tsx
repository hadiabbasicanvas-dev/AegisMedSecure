import React, { useState } from 'react';
import { useReports } from '@/services/reportService';
import { PageContainer } from '@/components/common/PageContainer';
import { ReportGeneratorModal } from '@/components/reports/ReportGeneratorModal';
import { ReportPreviewCard } from '@/components/reports/ReportPreviewCard';
import { ScheduledReportCard } from '@/components/reports/ScheduledReportCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileText, Plus, Clock } from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'catalog' | 'scheduled'>('catalog');

  const { data: reports = [], isLoading } = useReports();

  const templates = [
    { title: 'Executive Security Summary', type: 'EXECUTIVE_SUMMARY', format: 'PDF', desc: 'High-level CISO overview of QIH security score, threat trends & MTTR.' },
    { title: 'Threat Intelligence Briefing', type: 'THREAT_INTELLIGENCE', format: 'PDF', desc: 'Detailed breakdown of ransomware SMB vectors, SQL injection, & IP sources.' },
    { title: 'HIPAA Compliance Audit Export', type: 'COMPLIANCE_AUDIT', format: 'CSV', desc: 'Audit-ready data logs satisfying HIPAA Title II administrative safeguards.' },
    { title: 'IoMT Medical Asset Health Audit', type: 'ASSET_HEALTH', format: 'PDF', desc: 'Connectivity status & firmware integrity for all 1,248 hospital endpoints.' },
  ];

  return (
    <PageContainer
      title="ENTERPRISE SECURITY REPORTS & DOCUMENT LIBRARY"
      description="Compile, export, and schedule branded audit reports for Quaid-e-Azam Int. Hospital"
      actions={
        <Button variant="cyan-accent" size="sm" onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-1.5 h-4 w-4 text-[#D90429]" /> GENERATE NEW REPORT
        </Button>
      }
    >
      {/* Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-[#2A2A2A] pb-3 font-mono">
        <button
          onClick={() => setActiveTab('catalog')}
          className={`flex items-center space-x-2 px-4 py-2 text-xs font-bold uppercase transition-all ${
            activeTab === 'catalog'
              ? 'bg-[#171717] text-[#F5F5F5] border border-[#D90429]'
              : 'text-[#A0A0A0] hover:text-[#F5F5F5] hover:bg-[#171717]'
          }`}
        >
          <FileText className="h-4 w-4 text-[#D90429]" />
          <span>REPORT CATALOG ({reports.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('scheduled')}
          className={`flex items-center space-x-2 px-4 py-2 text-xs font-bold uppercase transition-all ${
            activeTab === 'scheduled'
              ? 'bg-[#171717] text-[#F5F5F5] border border-[#D90429]'
              : 'text-[#A0A0A0] hover:text-[#F5F5F5] hover:bg-[#171717]'
          }`}
        >
          <Clock className="h-4 w-4 text-[#D90429]" />
          <span>AUTOMATED DELIVERY SCHEDULES (3)</span>
        </button>
      </div>

      {activeTab === 'catalog' ? (
        <div className="space-y-8 font-mono">
          {/* Quick Template Launch Bar */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#707070]">
              POPULAR REPORT TEMPLATES:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {templates.map((tpl, idx) => (
                <Card
                  key={idx}
                  onClick={() => setIsModalOpen(true)}
                  className="p-4 cursor-pointer hover:border-[#D90429] bg-[#1B1B1B] border-[#2A2A2A] transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-2">
                    <span className="text-xs font-bold text-[#F5F5F5] group-hover:text-[#D90429] truncate uppercase">
                      {tpl.title}
                    </span>
                    <Badge variant="info" className="text-[8px] shrink-0">
                      {tpl.format}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-[#A0A0A0] font-sans font-light leading-relaxed line-clamp-2">{tpl.desc}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Generated Reports List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#707070]">
                GENERATED DOCUMENT LIBRARY
              </h3>
              <Badge variant="info" className="text-[9px]">
                HIPAA AUDIT COMPLIANT
              </Badge>
            </div>

            {isLoading ? (
              <div className="py-12 text-center text-xs text-[#A0A0A0]">Loading Document Catalog...</div>
            ) : reports.length === 0 ? (
              <div className="py-12 text-center space-y-2 bg-[#1B1B1B] border border-[#2A2A2A]">
                <p className="text-sm font-bold text-[#F5F5F5] uppercase">No Reports Generated Yet</p>
                <p className="text-xs text-[#707070]">Click &ldquo;Generate New Report&rdquo; to compile a PDF or CSV brief.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.map((report) => (
                  <ReportPreviewCard key={report.id} report={report} />
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono">
          <div className="lg:col-span-2">
            <ScheduledReportCard />
          </div>
          <div className="lg:col-span-1 space-y-4">
            <Card className="p-6 space-y-3">
              <h4 className="font-heading text-sm font-bold text-[#F5F5F5] uppercase">SCHEDULE NEW DELIVERY</h4>
              <p className="text-xs text-[#A0A0A0] font-sans font-light leading-relaxed">
                Configure automated daily, weekly, or monthly report dispatches sent directly to SOC leadership and compliance auditors.
              </p>
              <Button variant="outline" size="sm" onClick={() => alert('Scheduled report creator triggered.')} className="w-full">
                CONFIGURE NEW SCHEDULE
              </Button>
            </Card>
          </div>
        </div>
      )}

      {/* Generator Modal */}
      <ReportGeneratorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </PageContainer>
  );
};
