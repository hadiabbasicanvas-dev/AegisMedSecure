import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, CheckCircle2 } from 'lucide-react';
import { apiClient } from '@/services/apiClient';

export const ThreatExportButton: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const response = await apiClient.get('/threats/export', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `aegis_threat_telemetry_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (e) {
      alert('Failed to export CSV file.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleExport}
      isLoading={isExporting}
      className="text-xs border-slate-800 text-slate-300 hover:text-white"
    >
      <Download className="mr-1.5 h-3.5 w-3.5 text-cyan-400" /> Export Threat Telemetry CSV
    </Button>
  );
};
