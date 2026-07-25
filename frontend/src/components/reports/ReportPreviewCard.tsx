import React from 'react';
import { ReportItem, useDeleteReport } from '@/services/reportService';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Trash2, Calendar, User } from 'lucide-react';
import { formatDate } from '@/utils/formatters';
import { generateExecutiveDashboardPDF } from '@/utils/pdfExporter';

interface ReportPreviewCardProps {
  report: ReportItem;
}

export const ReportPreviewCard: React.FC<ReportPreviewCardProps> = ({ report }) => {
  const deleteReport = useDeleteReport();

  const handleDownload = () => {
    generateExecutiveDashboardPDF({
      title: report.title.toUpperCase(),
      reportType: report.reportType.replace(/_/g, ' '),
      generatedBy: report.generatedByName,
    });
  };

  return (
    <Card className="p-5 hover:border-[#D90429] bg-[#1B1B1B] border-[#2A2A2A] transition-colors flex flex-col justify-between space-y-4 font-mono text-xs">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-[#0A0A0A] border border-[#2A2A2A] text-[#D90429]">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#F5F5F5] uppercase line-clamp-1">{report.title}</h3>
            <p className="text-[10px] text-[#A0A0A0]">{report.reportType.replace(/_/g, ' ')}</p>
          </div>
        </div>
        <Badge variant="info" className="text-[9px]">
          {report.format}
        </Badge>
      </div>

      <div className="space-y-1 text-xs text-[#A0A0A0]">
        <div className="flex items-center space-x-1">
          <User className="h-3 w-3 text-[#D90429]" />
          <span className="truncate">{report.generatedByName}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Calendar className="h-3 w-3 text-[#D90429]" />
          <span>{formatDate(report.createdAt)}</span>
        </div>
      </div>

      <div className="pt-3 border-t border-[#2A2A2A] flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={handleDownload}>
          <Download className="mr-1.5 h-3.5 w-3.5 text-[#D90429]" /> DOWNLOAD REAL PDF
        </Button>

        <button
          onClick={() => deleteReport.mutate(report.id)}
          className="p-1.5 text-[#707070] hover:text-[#FF1744] transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </Card>
  );
};
