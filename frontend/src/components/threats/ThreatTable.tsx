import React from 'react';
import { ThreatItem } from '@/services/threatService';
import { ThreatSeverityBadge } from './ThreatSeverityBadge';
import { ThreatStatusBadge } from './ThreatStatusBadge';
import { ThreatActionMenu } from './ThreatActionMenu';
import { UserAvatar } from '@/components/auth/UserAvatar';
import { formatDate } from '@/utils/formatters';
import { Link } from 'react-router-dom';

interface ThreatTableProps {
  threats: ThreatItem[];
  isLoading: boolean;
}

export const ThreatTable: React.FC<ThreatTableProps> = ({ threats, isLoading }) => {
  if (isLoading) {
    return (
      <div className="py-16 text-center space-y-3 bg-[#1B1B1B] border border-[#2A2A2A]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#D90429] border-t-transparent mx-auto" />
        <p className="text-xs font-mono text-[#A0A0A0]">Loading Threat Telemetry Database...</p>
      </div>
    );
  }

  if (threats.length === 0) {
    return (
      <div className="py-16 text-center space-y-2 bg-[#1B1B1B] border border-[#2A2A2A] font-mono">
        <p className="text-sm font-bold text-[#F5F5F5] uppercase">No Threat Records Match Filter Criteria</p>
        <p className="text-xs text-[#707070]">Try adjusting your search or category filters.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#1B1B1B] border border-[#2A2A2A] overflow-hidden shadow-2xl font-mono text-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#2A2A2A] bg-[#0A0A0A] text-[#707070] uppercase text-[10px]">
              <th className="py-3 px-4">THREAT CODE</th>
              <th className="py-3 px-4">THREAT NAME & CATEGORY</th>
              <th className="py-3 px-4">SEVERITY</th>
              <th className="py-3 px-4">STATUS</th>
              <th className="py-3 px-4">TARGET ASSET & SUBNET</th>
              <th className="py-3 px-4">AI SCORE</th>
              <th className="py-3 px-4">ASSIGNED ANALYST</th>
              <th className="py-3 px-4">DETECTED TIME</th>
              <th className="py-3 px-4 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2A2A2A]/60">
            {threats.map((item) => (
              <tr key={item.id} className="hover:bg-[#171717] transition-colors group">
                {/* Code */}
                <td className="py-3.5 px-4 font-bold text-[#D90429]">
                  <Link to={`/dashboard/threats/${item.id}`} className="hover:underline">
                    {item.threatCode}
                  </Link>
                </td>

                {/* Name & Category */}
                <td className="py-3.5 px-4 max-w-xs font-sans font-medium">
                  <Link to={`/dashboard/threats/${item.id}`} className="font-bold text-[#F5F5F5] group-hover:text-[#D90429] transition-colors block truncate uppercase">
                    {item.name}
                  </Link>
                  <span className="text-[10px] font-mono text-[#707070] block uppercase">{item.category}</span>
                </td>

                {/* Severity */}
                <td className="py-3.5 px-4">
                  <ThreatSeverityBadge severity={item.severity} />
                </td>

                {/* Status */}
                <td className="py-3.5 px-4">
                  <ThreatStatusBadge status={item.status} />
                </td>

                {/* Target Asset & Dept */}
                <td className="py-3.5 px-4 max-w-xs">
                  <span className="text-[#F5F5F5] font-bold text-[11px] block truncate">{item.affectedAsset}</span>
                  <span className="text-[10px] text-[#A0A0A0] block truncate">{item.departmentName} ({item.sourceIp})</span>
                </td>

                {/* AI Score */}
                <td className="py-3.5 px-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-[#F5F5F5] font-bold">{item.aiRiskScore}/100</span>
                      <span className="text-[#D90429]">{item.aiConfidence}%</span>
                    </div>
                    <div className="h-1.5 w-16 bg-[#0A0A0A] overflow-hidden border border-[#2A2A2A]">
                      <div
                        className={`h-full ${
                          item.aiRiskScore >= 80
                            ? 'bg-[#FF1744]'
                            : item.aiRiskScore >= 60
                            ? 'bg-[#FFB300]'
                            : 'bg-[#D90429]'
                        }`}
                        style={{ width: `${item.aiRiskScore}%` }}
                      />
                    </div>
                  </div>
                </td>

                {/* Assigned Analyst */}
                <td className="py-3.5 px-4">
                  {item.assignedToName ? (
                    <div className="flex items-center space-x-2">
                      <UserAvatar firstName={item.assignedToName.split(' ')[0]} lastName={item.assignedToName.split(' ')[1] || 'A'} size="sm" />
                      <span className="text-[11px] text-[#F5F5F5] truncate uppercase font-bold">{item.assignedToName}</span>
                    </div>
                  ) : (
                    <span className="text-[10px] text-[#707070] italic">Unassigned</span>
                  )}
                </td>

                {/* Detected Time */}
                <td className="py-3.5 px-4 text-[11px] text-[#A0A0A0]">
                  {formatDate(item.createdAt)}
                </td>

                {/* Actions */}
                <td className="py-3.5 px-4 text-right">
                  <ThreatActionMenu threat={item} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
