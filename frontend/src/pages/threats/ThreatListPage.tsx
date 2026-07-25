import React, { useState } from 'react';
import { useThreats } from '@/services/threatService';
import { PageContainer } from '@/components/common/PageContainer';
import { ThreatFilterBar } from '@/components/threats/ThreatFilterBar';
import { ThreatTable } from '@/components/threats/ThreatTable';
import { ThreatExportButton } from '@/components/threats/ThreatExportButton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Activity, ShieldAlert, AlertTriangle, CheckCircle2, History } from 'lucide-react';

export const ThreatListPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState('');
  const [severity, setSeverity] = useState('');
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const [department, setDepartment] = useState('');
  const [viewMode, setViewMode] = useState<'ACTIVE' | 'HISTORY'>('ACTIVE');

  const activeFilterStatus = status || viewMode;

  const { data, isLoading } = useThreats({
    page,
    limit,
    search,
    severity,
    status: activeFilterStatus,
    category,
    department,
  });

  const handleReset = () => {
    setSearch('');
    setSeverity('');
    setStatus('');
    setCategory('');
    setDepartment('');
    setPage(1);
  };

  const threats = data?.data || [];
  const meta = data?.meta || { page: 1, limit: 10, total: 0, totalPages: 1 };

  return (
    <PageContainer
      title="REAL-TIME THREAT TELEMETRY MONITORING"
      description="Live threat log stream & anomaly inspection across Quaid-e-Azam Int. Hospital subnets"
      actions={
        <div className="flex items-center space-x-3">
          <Badge variant="info" className="text-[9px]">
            SIMULATED DEMO TELEMETRY
          </Badge>
          <ThreatExportButton />
        </div>
      }
    >
      {/* View Mode Toggle Bar (Active Threats vs Threat History) */}
      <div className="flex items-center justify-between p-2 bg-[#171717] border border-[#2A2A2A]">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => { setViewMode('ACTIVE'); setPage(1); }}
            className={`px-4 py-2 text-xs font-mono font-bold uppercase transition-all flex items-center space-x-2 ${
              viewMode === 'ACTIVE'
                ? 'bg-[#0A0A0A] border border-[#D90429] text-[#F5F5F5] shadow-[0_0_15px_rgba(217,4,41,0.3)]'
                : 'text-[#A0A0A0] hover:text-[#F5F5F5] hover:bg-[#1B1B1B]'
            }`}
          >
            <ShieldAlert className="h-4 w-4 text-[#D90429]" />
            <span>ACTIVE THREATS ({viewMode === 'ACTIVE' ? meta.total : 'STREAM'})</span>
          </button>

          <button
            onClick={() => { setViewMode('HISTORY'); setPage(1); }}
            className={`px-4 py-2 text-xs font-mono font-bold uppercase transition-all flex items-center space-x-2 ${
              viewMode === 'HISTORY'
                ? 'bg-[#0A0A0A] border border-[#00C853] text-[#00C853] shadow-[0_0_15px_rgba(0,200,83,0.3)]'
                : 'text-[#A0A0A0] hover:text-[#F5F5F5] hover:bg-[#1B1B1B]'
            }`}
          >
            <History className="h-4 w-4 text-[#00C853]" />
            <span>THREAT HISTORY / RESOLVED ARCHIVES</span>
          </button>
        </div>

        <span className="text-[10px] font-mono text-[#A0A0A0] px-3 hidden sm:inline uppercase">
          {viewMode === 'ACTIVE' ? '🟢 SHOWING ACTIVE TELEMETRY STREAM' : '✅ SHOWING RESOLVED THREAT ARCHIVES'}
        </span>
      </div>

      {/* Metric Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono">
        <div className="p-4 bg-[#1B1B1B] border border-[#2A2A2A] flex items-center space-x-3">
          <div className="p-2.5 bg-[#FF1744]/15 border border-[#FF1744]/40 text-[#FF1744]">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[9px] text-[#707070] uppercase">CRITICAL THREATS</p>
            <p className="text-xl font-bold font-heading text-[#F5F5F5]">8 ACTIVE</p>
          </div>
        </div>

        <div className="p-4 bg-[#1B1B1B] border border-[#2A2A2A] flex items-center space-x-3">
          <div className="p-2.5 bg-[#FFB300]/15 border border-[#FFB300]/40 text-[#FFB300]">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[9px] text-[#707070] uppercase">UNDER INVESTIGATION</p>
            <p className="text-xl font-bold font-heading text-[#F5F5F5]">14 THREATS</p>
          </div>
        </div>

        <div className="p-4 bg-[#1B1B1B] border border-[#2A2A2A] flex items-center space-x-3">
          <div className="p-2.5 bg-[#00C853]/15 border border-[#00C853]/40 text-[#00C853]">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[9px] text-[#707070] uppercase">CONTAINED / RESOLVED</p>
            <p className="text-xl font-bold font-heading text-[#F5F5F5]">18 RECORDS</p>
          </div>
        </div>

        <div className="p-4 bg-[#1B1B1B] border border-[#2A2A2A] flex items-center space-x-3">
          <div className="p-2.5 bg-[#D90429]/15 border border-[#D90429]/40 text-[#D90429]">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[9px] text-[#707070] uppercase">INGESTION VELOCITY</p>
            <p className="text-xl font-bold font-heading text-[#F5F5F5]">10.4K EVENTS/S</p>
          </div>
        </div>
      </div>

      {/* Filter Control Bar */}
      <ThreatFilterBar
        search={search}
        onSearchChange={setSearch}
        severity={severity}
        onSeverityChange={setSeverity}
        status={status}
        onStatusChange={setStatus}
        category={category}
        onCategoryChange={setCategory}
        department={department}
        onDepartmentChange={setDepartment}
        onReset={handleReset}
      />

      {/* Datatable */}
      <ThreatTable threats={threats} isLoading={isLoading} />

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 font-mono">
        <div className="text-xs text-[#A0A0A0]">
          SHOWING <span className="font-bold text-[#F5F5F5]">{threats.length}</span> OF{' '}
          <span className="font-bold text-[#F5F5F5]">{meta.total}</span> TOTAL THREAT RECORDS ({viewMode})
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
    </PageContainer>
  );
};
