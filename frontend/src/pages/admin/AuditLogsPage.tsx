import React, { useState } from 'react';
import { useAdminAuditLogs } from '@/services/adminService';
import { PageContainer } from '@/components/common/PageContainer';
import { AuditLogTable } from '@/components/admin/AuditLogTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Download } from 'lucide-react';
import { apiClient } from '@/services/apiClient';

export const AuditLogsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const { data: logs = [], isLoading } = useAdminAuditLogs(search);

  const handleExportCSV = async () => {
    try {
      await apiClient.get('/reports/generate', {
        params: { reportType: 'COMPLIANCE_AUDIT', format: 'CSV' },
      });
      alert('Audit log CSV export generated successfully.');
    } catch (e) {
      alert('Failed to export audit log CSV.');
    }
  };

  return (
    <PageContainer
      title="SECURITY AUDIT TRAIL & GOVERNANCE LOGS"
      description="Immutable operational audit logs capturing login activity, SOAR isolations & setting updates"
      actions={
        <Button variant="outline" size="sm" onClick={handleExportCSV}>
          <Download className="mr-1.5 h-3.5 w-3.5 text-[#D90429]" /> EXPORT AUDIT CSV
        </Button>
      }
    >
      <div className="bg-[#171717] border border-[#2A2A2A] p-4 flex items-center justify-between font-mono">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#D90429]" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search action event, module, user..."
            className="pl-9 text-xs h-9 bg-[#0A0A0A] border-[#2A2A2A] focus:border-[#D90429]"
          />
        </div>

        <Badge variant="info" className="text-[9px]">
          HIPAA TITLE II COMPLIANT
        </Badge>
      </div>

      <AuditLogTable logs={logs} isLoading={isLoading} />
    </PageContainer>
  );
};
