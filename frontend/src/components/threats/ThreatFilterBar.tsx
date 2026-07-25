import React from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ThreatFilterBarProps {
  search: string;
  onSearchChange: (val: string) => void;
  severity: string;
  onSeverityChange: (val: string) => void;
  status: string;
  onStatusChange: (val: string) => void;
  category: string;
  onCategoryChange: (val: string) => void;
  department: string;
  onDepartmentChange: (val: string) => void;
  onReset: () => void;
}

export const ThreatFilterBar: React.FC<ThreatFilterBarProps> = ({
  search,
  onSearchChange,
  severity,
  onSeverityChange,
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
            placeholder="Search code, threat name, asset, IP..."
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
            <option value="INFORMATIONAL">INFORMATIONAL</option>
          </select>

          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="h-9 rounded-lg border border-slate-800 bg-slate-950 px-3 py-1 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
          >
            <option value="">All Statuses</option>
            <option value="OPEN">OPEN</option>
            <option value="INVESTIGATING">INVESTIGATING</option>
            <option value="CONTAINED">CONTAINED</option>
            <option value="RESOLVED">RESOLVED</option>
            <option value="CLOSED">CLOSED</option>
          </select>

          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="h-9 rounded-lg border border-slate-800 bg-slate-950 px-3 py-1 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
          >
            <option value="">All Categories</option>
            <option value="RANSOMWARE">RANSOMWARE</option>
            <option value="SQL_INJECTION">SQL INJECTION</option>
            <option value="BRUTE_FORCE">BRUTE FORCE</option>
            <option value="MALWARE">MALWARE</option>
            <option value="PHISHING">PHISHING</option>
            <option value="INSIDER_THREAT">INSIDER THREAT</option>
            <option value="DATA_EXFILTRATION">DATA EXFILTRATION</option>
            <option value="SUSPICIOUS_USB">SUSPICIOUS USB</option>
            <option value="PORT_SCANNING">PORT SCANNING</option>
            <option value="UNAUTHORIZED_ACCESS">UNAUTHORIZED ACCESS</option>
          </select>

          <select
            value={department}
            onChange={(e) => onDepartmentChange(e.target.value)}
            className="h-9 rounded-lg border border-slate-800 bg-slate-950 px-3 py-1 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
          >
            <option value="">All Departments</option>
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
