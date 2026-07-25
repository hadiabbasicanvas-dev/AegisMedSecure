import React, { useState } from 'react';
import { IncidentItem } from '@/services/incidentService';
import { IncidentSeverityBadge } from './IncidentSeverityBadge';
import { IncidentPriorityBadge } from './IncidentPriorityBadge';
import { IncidentStatusBadge } from './IncidentStatusBadge';
import { UserAvatar } from '@/components/auth/UserAvatar';
import { formatDate } from '@/utils/formatters';
import { Link, useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface IncidentTableProps {
  incidents: IncidentItem[];
  isLoading: boolean;
}

export const IncidentTable: React.FC<IncidentTableProps> = ({ incidents, isLoading }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(incidents.map((i) => i.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  if (isLoading) {
    return (
      <div className="py-16 text-center space-y-3 bg-[#1B1B1B] border border-[#2A2A2A]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#D90429] border-t-transparent mx-auto" />
        <p className="text-xs font-mono text-[#A0A0A0]">Loading Incident Management Database...</p>
      </div>
    );
  }

  if (incidents.length === 0) {
    return (
      <div className="py-16 text-center space-y-2 bg-[#1B1B1B] border border-[#2A2A2A] font-mono">
        <p className="text-sm font-bold text-[#F5F5F5] uppercase">No Incident Records Match Filter Criteria</p>
        <p className="text-xs text-[#707070]">Try adjusting your search query or workflow status filters.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#1B1B1B] border border-[#2A2A2A] overflow-hidden shadow-2xl space-y-3 font-mono text-xs">
      {selectedIds.length > 0 && (
        <div className="p-3 bg-[#171717] border-b border-[#2A2A2A] flex items-center justify-between text-xs font-mono">
          <span className="text-[#D90429] font-bold">{selectedIds.length} INCIDENTS SELECTED</span>
          <div className="space-x-2">
            <Button variant="outline" size="sm" onClick={() => alert(`Bulk updated ${selectedIds.length} incidents`)}>
              BULK STATUS UPDATE
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setSelectedIds([])} className="text-[#A0A0A0]">
              CLEAR SELECTION
            </Button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#2A2A2A] bg-[#0A0A0A] text-[#707070] uppercase text-[10px]">
              <th className="py-3 px-3 w-8">
                <input
                  type="checkbox"
                  checked={selectedIds.length === incidents.length && incidents.length > 0}
                  onChange={handleSelectAll}
                  className="rounded-none border-[#2A2A2A] bg-[#0A0A0A] text-[#D90429] focus:ring-[#D90429]"
                />
              </th>
              <th className="py-3 px-4">INCIDENT CODE</th>
              <th className="py-3 px-4">TITLE & CATEGORY</th>
              <th className="py-3 px-4">SEVERITY</th>
              <th className="py-3 px-4">PRIORITY</th>
              <th className="py-3 px-4">WORKFLOW STATUS</th>
              <th className="py-3 px-4">TARGET ASSET & WARD</th>
              <th className="py-3 px-4">ASSIGNED ANALYST</th>
              <th className="py-3 px-4">CREATED DATE</th>
              <th className="py-3 px-4 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2A2A2A]/60">
            {incidents.map((item) => {
              const isSelected = selectedIds.includes(item.id);
              return (
                <tr
                  key={item.id}
                  className={`hover:bg-[#171717] transition-colors group ${
                    isSelected ? 'bg-[#171717]' : ''
                  }`}
                >
                  <td className="py-3.5 px-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleSelectOne(item.id)}
                      className="rounded-none border-[#2A2A2A] bg-[#0A0A0A] text-[#D90429] focus:ring-[#D90429]"
                    />
                  </td>

                  {/* Code */}
                  <td className="py-3.5 px-4 font-bold text-[#D90429]">
                    <Link to={`/dashboard/incidents/${item.id}`} className="hover:underline">
                      {item.incidentCode}
                    </Link>
                  </td>

                  {/* Title & Category */}
                  <td className="py-3.5 px-4 max-w-xs font-sans font-medium">
                    <Link
                      to={`/dashboard/incidents/${item.id}`}
                      className="font-bold text-[#F5F5F5] group-hover:text-[#D90429] transition-colors block truncate uppercase"
                    >
                      {item.title}
                    </Link>
                    <span className="text-[10px] font-mono text-[#707070] block uppercase">{item.category.replace(/_/g, ' ')}</span>
                  </td>

                  {/* Severity */}
                  <td className="py-3.5 px-4">
                    <IncidentSeverityBadge severity={item.severity} />
                  </td>

                  {/* Priority */}
                  <td className="py-3.5 px-4">
                    <IncidentPriorityBadge priority={item.priority} />
                  </td>

                  {/* Workflow Status */}
                  <td className="py-3.5 px-4">
                    <IncidentStatusBadge status={item.status} />
                  </td>

                  {/* Target Asset & Dept */}
                  <td className="py-3.5 px-4 max-w-xs">
                    <span className="text-[#F5F5F5] font-bold text-[11px] block truncate">{item.affectedAsset}</span>
                    <span className="text-[10px] text-[#A0A0A0] block truncate">{item.departmentName}</span>
                  </td>

                  {/* Assigned Analyst */}
                  <td className="py-3.5 px-4">
                    {item.assignedToName ? (
                      <div className="flex items-center space-x-2">
                        <UserAvatar firstName={item.assignedToName.split(' ')[0]} lastName={item.assignedToName.split(' ')[1] || 'A'} size="sm" />
                        <span className="text-[11px] text-[#F5F5F5] truncate font-bold uppercase">{item.assignedToName}</span>
                      </div>
                    ) : (
                      <span className="text-[10px] text-[#707070] italic">Unassigned</span>
                    )}
                  </td>

                  {/* Created Date */}
                  <td className="py-3.5 px-4 text-[11px] text-[#A0A0A0]">
                    {formatDate(item.createdAt)}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/dashboard/incidents/${item.id}`)}
                      className="text-[#A0A0A0] hover:text-[#D90429]"
                    >
                      <Eye className="h-3.5 w-3.5 mr-1 text-[#D90429]" /> VIEW CANVAS
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
