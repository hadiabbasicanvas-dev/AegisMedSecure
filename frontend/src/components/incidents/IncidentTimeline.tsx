import React from 'react';
import { IncidentTimelineItem } from '@/services/incidentService';
import { formatDate } from '@/utils/formatters';
import { ShieldCheck, Cpu, User, AlertOctagon } from 'lucide-react';

interface IncidentTimelineProps {
  events: IncidentTimelineItem[];
}

export const IncidentTimeline: React.FC<IncidentTimelineProps> = ({ events }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-mono flex items-center gap-2">
        <AlertOctagon className="h-4 w-4 text-cyan-400" /> Incident Lifecycle & Forensic Audit Timeline
      </h3>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
        {events.map((evt, idx) => (
          <div key={evt.id || idx} className="relative flex items-start space-x-3 group">
            {/* Timeline Dot Icon */}
            <div className="absolute -left-6 top-0.5 h-4 w-4 rounded-full border-2 border-slate-950 bg-cyan-500 flex items-center justify-center text-slate-950 font-bold text-[9px] shadow-md shadow-cyan-500/20">
              {idx + 1}
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-md w-full space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-200">{evt.title}</h4>
                <span className="text-[10px] font-mono text-slate-500">{formatDate(evt.timestamp)}</span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">{evt.description}</p>

              <div className="pt-2 flex items-center space-x-2 text-[10px] font-mono text-cyan-400">
                <span className="text-slate-500">Actor:</span>
                <span className="bg-slate-950 border border-slate-800 px-2 py-0.5 rounded text-slate-300">{evt.actor}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
