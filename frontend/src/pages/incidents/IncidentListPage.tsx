import React, { useState } from 'react';
import { useIncidents } from '@/services/incidentService';
import { PageContainer } from '@/components/common/PageContainer';
import { IncidentFilterBar } from '@/components/incidents/IncidentFilterBar';
import { IncidentTable } from '@/components/incidents/IncidentTable';
import { IncidentCreateModal } from '@/components/incidents/IncidentCreateModal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Plus, Download, AlertOctagon, ShieldAlert, Activity, Clock } from 'lucide-react';
import { apiClient } from '@/services/apiClient';

export const IncidentListPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState('');
  const [severity, setSeverity] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const [department, setDepartment] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useIncidents({
    page,
    limit,
    search,
    severity,
    priority,
    status,
    category,
    department,
  });

  const handleReset = () => {
    setSearch('');
    setSeverity('');
    setPriority('');
    setStatus('');
    setCategory('');
    setDepartment('');
    setPage(1);
  };

  const handleExportCSV = async () => {
    try {
      const response = await apiClient.get('/incidents/export', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `aegis_incidents_export_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (e) {
      alert('Failed to export incidents CSV.');
    }
  };

  const incidents = data?.data || [];
  const meta = data?.meta || { page: 1, limit: 10, total: 0, totalPages: 1 };

  return (
    <PageContainer
      title="ENTERPRISE INCIDENT MANAGEMENT HUB"
      description="Autonomous SOAR incident containment, evidence vault & workflow lifecycle tracking"
      actions={
        <div className="flex items-center space-x-3">
          <Badge variant="info" className="text-[9px]">
            SIMULATED DEMO TELEMETRY
          </Badge>
          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            <Download className="mr-1.5 h-3.5 w-3.5 text-[#D90429]" /> EXPORT CSV
          </Button>
          <Button variant="cyan-accent" size="sm" onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-1.5 h-4 w-4 text-[#D90429]" /> INITIALIZE INCIDENT
          </Button>
        </div>
      }
    >
      {/* Metric Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono">
        <div className="p-4 bg-[#1B1B1B] border border-[#2A2A2A] flex items-center space-x-3">
          <div className="p-2.5 bg-[#FF1744]/15 border border-[#FF1744]/40 text-[#FF1744]">
            <AlertOctagon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[9px] text-[#707070] uppercase">P1 CRITICAL INCIDENTS</p>
            <p className="text-xl font-bold font-heading text-[#F5F5F5]">4 ACTIVE</p>
          </div>
        </div>

        <div className="p-4 bg-[#1B1B1B] border border-[#2A2A2A] flex items-center space-x-3">
          <div className="p-2.5 bg-[#FFB300]/15 border border-[#FFB300]/40 text-[#FFB300]">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[9px] text-[#707070] uppercase">UNDER INVESTIGATION</p>
            <p className="text-xl font-bold font-heading text-[#F5F5F5]">8 INCIDENTS</p>
          </div>
        </div>

        <div className="p-4 bg-[#1B1B1B] border border-[#2A2A2A] flex items-center space-x-3">
          <div className="p-2.5 bg-[#D90429]/15 border border-[#D90429]/40 text-[#D90429]">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[9px] text-[#707070] uppercase">VLAN CONTAINED</p>
            <p className="text-xl font-bold font-heading text-[#F5F5F5]">14 HOSTS</p>
          </div>
        </div>

        <div className="p-4 bg-[#1B1B1B] border border-[#2A2A2A] flex items-center space-x-3">
          <div className="p-2.5 bg-[#00C853]/15 border border-[#00C853]/40 text-[#00C853]">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[9px] text-[#707070] uppercase">AVG RESOLUTION MTTR</p>
            <p className="text-xl font-bold font-heading text-[#F5F5F5]">4.5 MINS</p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <IncidentFilterBar
        search={search}
        onSearchChange={setSearch}
        severity={severity}
        onSeverityChange={setSeverity}
        priority={priority}
        onPriorityChange={setPriority}
        status={status}
        onStatusChange={setStatus}
        category={category}
        onCategoryChange={setCategory}
        department={department}
        onDepartmentChange={setDepartment}
        onReset={handleReset}
      />

      {/* Datatable */}
      <IncidentTable incidents={incidents} isLoading={isLoading} />

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 font-mono">
        <div className="text-xs text-[#A0A0A0]">
          SHOWING <span className="font-bold text-[#F5F5F5]">{incidents.length}</span> OF{' '}
          <span className="font-bold text-[#F5F5F5]">{meta.total}</span> TOTAL INCIDENTS
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1 text-[#D90429]" /> PREVIOUS
          </Button>

          <span className="text-xs font-bold text-[#F5F5F5] px-3 py-1 bg-[#171717] border border-[#2A2A2A]">
            PAGE {meta.page} OF {meta.totalPages || 1}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
            disabled={page >= meta.totalPages}
          >
            NEXT <ChevronRight className="h-4 w-4 ml-1 text-[#D90429]" />
          </Button>
        </div>
      </div>

      {/* Create Modal */}
      <IncidentCreateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </PageContainer>
  );
};
