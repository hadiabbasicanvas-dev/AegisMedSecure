import React, { useState } from 'react';
import { useGenerateReport } from '@/services/reportService';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, Download, CheckCircle2 } from 'lucide-react';

interface ReportGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportGeneratorModal: React.FC<ReportGeneratorModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [reportType, setReportType] = useState('EXECUTIVE_SUMMARY');
  const [format, setFormat] = useState('PDF');
  const [department, setDepartment] = useState('ALL');

  const generateReport = useGenerateReport();

  const handleGenerate = () => {
    generateReport.mutate(
      {
        title: title.trim() || undefined,
        reportType,
        format,
        filtersApplied: { department, scope: 'Quaid-e-Azam Int. Hospital' },
      },
      {
        onSuccess: () => {
          onClose();
          setTitle('');
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-slate-900 border-slate-800 text-slate-100 backdrop-blur-xl">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-cyan-400" />
            <DialogTitle>Generate Enterprise Security Report</DialogTitle>
          </div>
          <DialogDescription className="text-xs text-slate-400">
            Compile audit-ready PDF/CSV compliance briefs with QIH branding
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2 text-xs">
          <div className="space-y-1">
            <label className="text-[11px] font-mono text-slate-300">Report Title (Optional)</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Q3 HIPAA Compliance & Subnet Audit Brief"
              className="bg-slate-950 border-slate-800 text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono text-slate-300">Report Category Template</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full h-9 rounded-lg border border-slate-800 bg-slate-950 px-3 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
            >
              <option value="EXECUTIVE_SUMMARY">Executive Security Summary</option>
              <option value="THREAT_INTELLIGENCE">Threat Intelligence Briefing</option>
              <option value="INCIDENT_ANALYSIS">Incident Analysis & SOAR Response</option>
              <option value="DEPARTMENT_SECURITY">Hospital Ward Security Audit</option>
              <option value="ASSET_HEALTH">IoMT Medical Asset Health Audit</option>
              <option value="AI_PERFORMANCE">AI Neural Performance Benchmark</option>
              <option value="COMPLIANCE_AUDIT">HIPAA Title II Compliance Summary</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-slate-300">Export Document Format</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full h-9 rounded-lg border border-slate-800 bg-slate-950 px-3 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
              >
                <option value="PDF">Formatted PDF Document</option>
                <option value="CSV">Raw Telemetry CSV File</option>
                <option value="JSON">Structured JSON Dataset</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-slate-300">Hospital Ward Scope</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full h-9 rounded-lg border border-slate-800 bg-slate-950 px-3 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
              >
                <option value="ALL">All 12 QIH Subnets</option>
                <option value="PACS">Radiology / PACS</option>
                <option value="ICU">Adult ICU Ward</option>
                <option value="EMR">EMR Database Core</option>
              </select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" size="sm" onClick={onClose} className="text-xs">
            Cancel
          </Button>
          <Button
            variant="cyan-accent"
            size="sm"
            onClick={handleGenerate}
            isLoading={generateReport.isPending}
            className="text-xs"
          >
            <Download className="mr-1.5 h-3.5 w-3.5" /> Compile & Download Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
