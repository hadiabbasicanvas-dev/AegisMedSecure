import React from 'react';
import { AuditLogItem } from '@/services/adminService';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/utils/formatters';

interface AuditLogTableProps {
  logs: AuditLogItem[];
  isLoading: boolean;
}

export const AuditLogTable: React.FC<AuditLogTableProps> = ({ logs, isLoading }) => {
  if (isLoading) {
    return (
      <div className="py-12 text-center text-xs font-mono text-[#A0A0A0]">Loading Security Audit Trail...</div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="py-12 text-center text-xs font-mono text-[#707070]">No audit log entries match filter.</div>
    );
  }

  return (
    <div className="bg-[#1B1B1B] border border-[#2A2A2A] overflow-hidden shadow-2xl font-mono text-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#2A2A2A] bg-[#0A0A0A] text-[#707070] uppercase text-[10px]">
              <th className="py-3 px-4">ACTION EVENT</th>
              <th className="py-3 px-4">MODULE</th>
              <th className="py-3 px-4">DESCRIPTION & DETAILS</th>
              <th className="py-3 px-4">OPERATOR USER</th>
              <th className="py-3 px-4">IP ADDRESS</th>
              <th className="py-3 px-4">RESULT</th>
              <th className="py-3 px-4 text-right">TIMESTAMP</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2A2A2A]/60">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-[#171717] transition-colors">
                <td className="py-3 px-4 font-bold text-[#D90429]">{log.action}</td>
                <td className="py-3 px-4 text-[#A0A0A0]">{log.module}</td>
                <td className="py-3 px-4 text-[#F5F5F5] font-sans max-w-sm truncate">{log.details}</td>
                <td className="py-3 px-4 text-[#F5F5F5] font-bold uppercase">{log.userName}</td>
                <td className="py-3 px-4 text-[#A0A0A0]">{log.ipAddress || '10.45.0.254'}</td>
                <td className="py-3 px-4">
                  <Badge variant={log.result === 'SUCCESS' ? 'success' : 'critical'} className="text-[9px]">
                    {log.result}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-right text-[#707070]">{formatDate(log.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
