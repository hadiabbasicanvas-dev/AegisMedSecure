import React, { useState } from 'react';
import { useCreateIncident } from '@/services/incidentService';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast';
import { AlertOctagon, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface IncidentCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IncidentCreateModal: React.FC<IncidentCreateModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('RANSOMWARE_CONTAINMENT');
  const [severity, setSeverity] = useState('HIGH');
  const [priority, setPriority] = useState('P2_HIGH');
  const [departmentName, setDepartmentName] = useState('Radiology / PACS');
  const [affectedAsset, setAffectedAsset] = useState('PACS-SERVER-02');
  const [sourceIp, setSourceIp] = useState('10.45.12.89');

  const createInc = useCreateIncident();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createInc.mutate(
      {
        title: title.trim(),
        description: description.trim() || 'Manual incident record created by operator.',
        category: category as any,
        severity: severity as any,
        priority: priority as any,
        departmentName,
        affectedAsset,
        sourceIp,
      },
      {
        onSuccess: (data: any) => {
          showSuccess('Incident Initialized', `Incident ${data.incidentCode} initialized successfully.`);
          onClose();
          setTitle('');
          setDescription('');
          if (data.id) {
            navigate(`/dashboard/incidents/${data.id}`);
          }
        },
        onError: () => {
          showError('Creation Failed', 'Failed to initialize incident record.');
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-[#1B1B1B] border-[#2A2A2A] text-[#F5F5F5] font-mono">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <AlertOctagon className="h-4 w-4 text-[#D90429]" />
            <DialogTitle>INITIALIZE SECURITY INCIDENT</DialogTitle>
          </div>
          <DialogDescription className="text-xs text-[#A0A0A0] font-sans font-light">
            Escalate a security threat into a formal SOAR Incident record
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2 text-xs">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-[#F5F5F5] uppercase tracking-wider">INCIDENT TITLE *</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. PACS Workstation #4 Ransomware Vector"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-[#F5F5F5] uppercase tracking-wider">DETAILED DESCRIPTION</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe threat payload, target subnet impact, and initial findings..."
              rows={2}
              className="w-full bg-[#0A0A0A] border border-[#2A2A2A] p-2 text-xs text-[#F5F5F5] resize-none focus:outline-none focus:border-[#D90429]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-[#F5F5F5] uppercase tracking-wider">CATEGORY</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-10 bg-[#0A0A0A] border border-[#2A2A2A] px-3 text-xs text-[#F5F5F5] focus:border-[#D90429] focus:outline-none"
              >
                <option value="RANSOMWARE_CONTAINMENT">Ransomware Containment</option>
                <option value="PACS_IMAGE_ENCRYPTION">PACS Image Encryption</option>
                <option value="EMR_UNAUTHORIZED_ACCESS">EMR Unauthorized Access</option>
                <option value="IOMT_MALWARE_INFECTION">IoMT Malware Infection</option>
                <option value="DATA_EXFILTRATION_BREACH">Data Exfiltration Breach</option>
                <option value="PHISHING_EXPLOIT">Phishing Exploit</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-[#F5F5F5] uppercase tracking-wider">PRIORITY TIER</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full h-10 bg-[#0A0A0A] border border-[#2A2A2A] px-3 text-xs text-[#F5F5F5] focus:border-[#D90429] focus:outline-none"
              >
                <option value="P1_CRITICAL">P1 - Critical (Immediate SLA)</option>
                <option value="P2_HIGH">P2 - High</option>
                <option value="P3_MEDIUM">P3 - Medium</option>
                <option value="P4_LOW">P4 - Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-[#F5F5F5] uppercase tracking-wider">DEPARTMENT</label>
              <Input
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-[#F5F5F5] uppercase tracking-wider">AFFECTED ASSET</label>
              <Input
                value={affectedAsset}
                onChange={(e) => setAffectedAsset(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-[#F5F5F5] uppercase tracking-wider">SOURCE IP</label>
              <Input
                value={sourceIp}
                onChange={(e) => setSourceIp(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" size="sm" onClick={onClose} type="button">
              CANCEL
            </Button>
            <Button
              variant="cyan-accent"
              size="sm"
              type="submit"
              isLoading={createInc.isPending}
            >
              <Plus className="mr-1.5 h-3.5 w-3.5 text-[#D90429]" /> INITIALIZE INCIDENT
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
