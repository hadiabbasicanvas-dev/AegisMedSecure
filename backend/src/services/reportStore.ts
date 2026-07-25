export interface ReportRecord {
  id: string;
  title: string;
  reportType: 'EXECUTIVE_SUMMARY' | 'THREAT_INTELLIGENCE' | 'INCIDENT_ANALYSIS' | 'DEPARTMENT_SECURITY' | 'ASSET_HEALTH' | 'AI_PERFORMANCE' | 'COMPLIANCE_AUDIT';
  format: 'PDF' | 'CSV' | 'JSON';
  fileUrl: string;
  filtersApplied: Record<string, any>;
  generatedById: string;
  generatedByName: string;
  createdAt: string;
}

class MemoryReportStore {
  private reports: Map<string, ReportRecord> = new Map();

  constructor() {
    this.seedReports();
  }

  private seedReports() {
    const demoReports: ReportRecord[] = [
      {
        id: 'rep-901',
        title: 'QIH Executive Cybersecurity Summary Q3 2026',
        reportType: 'EXECUTIVE_SUMMARY',
        format: 'PDF',
        fileUrl: '/reports/qih_exec_summary_q3_2026.pdf',
        filtersApplied: { dateRange: '30d', hospital: 'QIH Islamabad' },
        generatedById: 'usr-soc-mgr-01',
        generatedByName: 'Ayesha Malik (SOC Manager)',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      },
      {
        id: 'rep-902',
        title: 'PACS Radiology Subnet Threat Intelligence Briefing',
        reportType: 'THREAT_INTELLIGENCE',
        format: 'PDF',
        fileUrl: '/reports/pacs_threat_intel_briefing.pdf',
        filtersApplied: { department: 'Radiology / PACS', severity: 'CRITICAL' },
        generatedById: 'usr-analyst-01',
        generatedByName: 'Zain Ahmed (Security Analyst)',
        createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
      },
      {
        id: 'rep-903',
        title: 'HIPAA Regulatory Compliance Audit Log Export',
        reportType: 'COMPLIANCE_AUDIT',
        format: 'CSV',
        fileUrl: '/reports/hipaa_audit_export.csv',
        filtersApplied: { compliance: 'HIPAA Title II', scope: 'All 400 Beds' },
        generatedById: 'usr-compliance-01',
        generatedByName: 'Tariq Mahmood (Compliance Officer)',
        createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
      },
    ];

    demoReports.forEach((r) => this.reports.set(r.id, r));
  }

  public async getAllReports(): Promise<ReportRecord[]> {
    const list = Array.from(this.reports.values());
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public async getReportById(id: string): Promise<ReportRecord | undefined> {
    return this.reports.get(id);
  }

  public async generateReport(params: {
    title?: string;
    reportType: ReportRecord['reportType'];
    format: ReportRecord['format'];
    filtersApplied?: Record<string, any>;
    generatedById: string;
    generatedByName: string;
  }): Promise<ReportRecord> {
    const id = `rep-${Date.now().toString().slice(-6)}`;
    const formattedTitle =
      params.title ||
      `QIH ${params.reportType.replace(/_/g, ' ')} (${params.format}) - ${new Date().toLocaleDateString()}`;

    const newReport: ReportRecord = {
      id,
      title: formattedTitle,
      reportType: params.reportType,
      format: params.format,
      fileUrl: `/reports/${id}.${params.format.toLowerCase()}`,
      filtersApplied: params.filtersApplied || { scope: 'Quaid-e-Azam Int. Hospital' },
      generatedById: params.generatedById,
      generatedByName: params.generatedByName,
      createdAt: new Date().toISOString(),
    };

    this.reports.set(id, newReport);
    return newReport;
  }

  public async deleteReport(id: string): Promise<boolean> {
    return this.reports.delete(id);
  }
}

export const reportStore = new MemoryReportStore();
