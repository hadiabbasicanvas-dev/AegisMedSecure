import React from 'react';
import { Calendar, Filter, RotateCcw, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AnalyticsFilterBarProps {
  range: string;
  onRangeChange: (range: string) => void;
  department: string;
  onDepartmentChange: (dept: string) => void;
  severity: string;
  onSeverityChange: (sev: string) => void;
  onReset: () => void;
  onExport: () => void;
}

export const AnalyticsFilterBar: React.FC<AnalyticsFilterBarProps> = ({
  range,
  onRangeChange,
  department,
  onDepartmentChange,
  severity,
  onSeverityChange,
  onReset,
  onExport,
}) => {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Date Range Selector Buttons */}
      <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800 w-full md:w-auto">
        <span className="text-[10px] font-mono font-bold text-slate-500 uppercase px-2">RANGE:</span>
        {['24h', '7d', '30d', '90d'].map((r) => (
          <button
            key={r}
            onClick={() => onRangeChange(r)}
            className={`px-3 py-1 text-xs font-mono font-semibold rounded-lg transition-all ${
              range === r
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {r.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Multi-Select Dropdowns */}
      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
        <select
          value={department}
          onChange={(e) => onDepartmentChange(e.target.value)}
          className="h-9 rounded-lg border border-slate-800 bg-slate-950 px-3 py-1 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
        >
          <option value="">All Hospital Wards</option>
          <option value="PACS">Radiology / PACS</option>
          <option value="EMR">EMR Core Vault</option>
          <option value="ICU">Adult ICU</option>
          <option value="Lab">Pathology Lab</option>
          <option value="Pharmacy">OPD Pharmacy</option>
          <option value="ER">Emergency Care</option>
        </select>

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

        <Button variant="outline" size="sm" onClick={onReset} className="h-9 text-xs border-slate-800 text-slate-400">
          <RotateCcw className="mr-1 h-3.5 w-3.5" /> Reset
        </Button>

        <Button variant="default" size="sm" onClick={onExport} className="h-9 text-xs">
          <Download className="mr-1.5 h-3.5 w-3.5" /> Export Analytics CSV
        </Button>
      </div>
    </div>
  );
};
