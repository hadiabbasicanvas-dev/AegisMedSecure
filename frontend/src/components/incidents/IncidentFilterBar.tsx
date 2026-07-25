import React from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface IncidentFilterBarProps {
  search: string;
  onSearchChange: (val: string) => void;
  severity: string;
  onSeverityChange: (val: string) => void;
  priority: string;
  onPriorityChange: (val: string) => void;
  status: string;
  onStatusChange: (val: string) => void;
  category: string;
  onCategoryChange: (val: string) => void;
  department: string;
  onDepartmentChange: (val: string) => void;
  onReset: () => void;
}

export const IncidentFilterBar: React.FC<IncidentFilterBarProps> = ({
  search,
  onSearchChange,
  severity,
  onSeverityChange,
  priority,
  onPriorityChange,
  status,
  onStatusChange,
  category,
  onCategoryChange,
  department,
  onDepartmentChange,
  onReset,
}) => {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-md space-y-4">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full lg:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search incident code, title, asset, IP..."
            className="pl-9 text-xs h-9 bg-slate-950 border-slate-800 focus:border-cyan-500"
          />
        </div>

        {/* Filter Dropdowns Group */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <select
            value={severity}
            onChange={(e) => onSeverityChange(e.target.value)}
            className="h-9 rounded-lg border border-slate-800 bg-slate-950 px-3 py-1 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
          >
            <option value="">All Severities</option>
            <option value="CRITICAL">CRITICAL</option>
            <option value="HIGH">HIGH</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="LOW">LOW</option>
          </select>

          <select
            value={priority}
            onChange={(e) => onPriorityChange(e.target.value)}
            className="h-9 rounded-lg border border-slate-800 bg-slate-950 px-3 py-1 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
          >
            <option value="">All Priorities</option>
            <option value="P1_CRITICAL">P1 - Critical</option>
            <option value="P2_HIGH">P2 - High</option>
            <option value="P3_MEDIUM">P3 - Medium</option>
            <option value="P4_LOW">P4 - Low</option>
          </select>

          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="h-9 rounded-lg border border-slate-800 bg-slate-950 px-3 py-1 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
          >
            <option value="">All Workflow Stages</option>
            <option value="NEW">NEW</option>
            <option value="ASSIGNED">ASSIGNED</option>
            <option value="INVESTIGATING">INVESTIGATING</option>
            <option value="CONTAINED">CONTAINED</option>
            <option value="ERADICATED">ERADICATED</option>
            <option value="RECOVERED">RECOVERED</option>
            <option value="CLOSED">CLOSED</option>
          </select>

          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="h-9 rounded-lg border border-slate-800 bg-slate-950 px-3 py-1 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
          >
            <option value="">All Categories</option>
            <option value="PACS_IMAGE_ENCRYPTION">PACS IMAGE ENCRYPTION</option>
            <option value="EMR_UNAUTHORIZED_ACCESS">EMR UNAUTHORIZED ACCESS</option>
            <option value="IOMT_MALWARE_INFECTION">IOMT MALWARE INFECTION</option>
            <option value="DATA_EXFILTRATION_BREACH">DATA EXFILTRATION BREACH</option>
            <option value="PHISHING_EXPLOIT">PHISHING EXPLOIT</option>
            <option value="NETWORK_BRUTE_FORCE">NETWORK BRUTE FORCE</option>
          </select>

          <select
            value={department}
            onChange={(e) => onDepartmentChange(e.target.value)}
            className="h-9 rounded-lg border border-slate-800 bg-slate-950 px-3 py-1 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
          >
            <option value="">All Hospital Subnets</option>
            <option value="PACS">Radiology / PACS</option>
            <option value="EMR">EMR Core Vault</option>
            <option value="ICU">Adult ICU</option>
            <option value="Lab">Pathology Lab</option>
            <option value="Pharmacy">OPD Pharmacy</option>
            <option value="Emergency">Emergency Care</option>
          </select>

          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="h-9 text-xs border-slate-800 text-slate-400 hover:text-white"
          >
            <RotateCcw className="mr-1 h-3.5 w-3.5" /> Reset
          </Button>
        </div>
      </div>
    </div>
  );
};
