import React, { useState, useRef, useEffect } from 'react';
import { ThreatItem, useUpdateThreatStatus, useAssignThreat, useEscalateThreat, useCreateIncidentFromThreat } from '@/services/threatService';
import { useAuthStore } from '@/store/useAuthStore';
import { useToast } from '@/components/ui/toast';
import { MoreVertical, ShieldAlert, UserCheck, ArrowUpRight, AlertOctagon, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ThreatActionMenuProps {
  threat: ThreatItem;
}

export const ThreatActionMenu: React.FC<ThreatActionMenuProps> = ({ threat }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { showSuccess, showError } = useToast();

  const updateStatus = useUpdateThreatStatus();
  const assignThreat = useAssignThreat();
  const escalateThreat = useEscalateThreat();
  const createIncident = useCreateIncidentFromThreat();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isManagerOrAdmin = user?.role === 'SUPER_ADMINISTRATOR' || user?.role === 'SOC_MANAGER';
  const canUpdateStatus = user?.role === 'SUPER_ADMINISTRATOR' || user?.role === 'SOC_MANAGER' || user?.role === 'SECURITY_ANALYST';

  const handleConvertToIncident = () => {
    setIsOpen(false);
    createIncident.mutate(threat.id, {
      onSuccess: (res: any) => {
        const incData = res?.data || res;
        const code = incData?.incidentCode || 'INC-2026-001';
        const incId = incData?.id || incData?.incidentId || 'inc-uuid-1000';
        showSuccess('Incident Created', `Incident ${code} created successfully.`);
        navigate(`/dashboard/incidents/${incId}`);
      },
      onError: (err: any) => {
        showError('Conversion Failed', err.response?.data?.message || 'Failed to convert threat into incident.');
      },
    });
  };

  return (
    <div className="relative font-mono" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 text-[#A0A0A0] hover:text-[#F5F5F5] bg-[#171717] border border-[#2A2A2A] hover:border-[#D90429] transition-colors focus:outline-none"
        aria-label="Threat Actions"
      >
        <MoreVertical className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-56 border border-[#2A2A2A] bg-[#1B1B1B] shadow-2xl p-1.5 z-50 animate-in fade-in-80">
          <button
            onClick={() => {
              setIsOpen(false);
              navigate(`/dashboard/threats/${threat.id}`);
            }}
            className="flex items-center space-x-2 px-3 py-2 text-xs text-[#F5F5F5] hover:bg-[#171717] w-full text-left font-bold uppercase"
          >
            <ShieldAlert className="h-3.5 w-3.5 text-[#D90429]" />
            <span>INVESTIGATE CANVAS</span>
          </button>

          {canUpdateStatus && (
            <button
              onClick={() => {
                setIsOpen(false);
                updateStatus.mutate(
                  { id: threat.id, status: 'CONTAINED' },
                  { onSuccess: () => showSuccess('Threat Contained', `Threat ${threat.threatCode} marked as CONTAINED.`) }
                );
              }}
              className="flex items-center space-x-2 px-3 py-2 text-xs text-[#00C853] hover:bg-[#171717] w-full text-left font-bold uppercase"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-[#00C853]" />
              <span>MARK CONTAINED</span>
            </button>
          )}

          {canUpdateStatus && (
            <button
              onClick={() => {
                setIsOpen(false);
                escalateThreat.mutate(
                  { id: threat.id, severity: 'CRITICAL' },
                  { onSuccess: () => showSuccess('Severity Escalated', `Threat ${threat.threatCode} escalated to CRITICAL.`) }
                );
              }}
              className="flex items-center space-x-2 px-3 py-2 text-xs text-[#FFB300] hover:bg-[#171717] w-full text-left font-bold uppercase"
            >
              <ArrowUpRight className="h-3.5 w-3.5 text-[#FFB300]" />
              <span>ESCALATE TO CRITICAL</span>
            </button>
          )}

          {canUpdateStatus && (
            <button
              onClick={handleConvertToIncident}
              className="flex items-center space-x-2 px-3 py-2 text-xs text-[#D90429] hover:bg-[#171717] w-full text-left font-bold uppercase"
            >
              <AlertOctagon className="h-3.5 w-3.5 text-[#D90429]" />
              <span>CONVERT TO INCIDENT</span>
            </button>
          )}

          {isManagerOrAdmin && (
            <button
              onClick={() => {
                setIsOpen(false);
                assignThreat.mutate(
                  { id: threat.id, analystId: user?.id || 'usr-analyst-01', analystName: `${user?.firstName} ${user?.lastName}` },
                  { onSuccess: () => showSuccess('Threat Assigned', `Threat ${threat.threatCode} assigned to yourself.`) }
                );
              }}
              className="flex items-center space-x-2 px-3 py-2 text-xs text-[#F5F5F5] hover:bg-[#171717] w-full text-left font-bold uppercase border-t border-[#2A2A2A] mt-1 pt-2"
            >
              <UserCheck className="h-3.5 w-3.5 text-[#D90429]" />
              <span>ASSIGN TO MYSELF</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
