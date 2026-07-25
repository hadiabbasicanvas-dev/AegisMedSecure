import React, { useState } from 'react';
import { useAddIncidentAction } from '@/services/incidentService';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { Zap } from 'lucide-react';

interface IncidentActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  incidentId: string;
}

export const IncidentActionModal: React.FC<IncidentActionModalProps> = ({ isOpen, onClose, incidentId }) => {
  const [actionType, setActionType] = useState('VLAN_ISOLATION');
  const [actionName, setActionName] = useState('Software-Defined Subnet Micro-Segmentation');
  const [comments, setComments] = useState('');

  const addAction = useAddIncidentAction();
  const { showSuccess, showError } = useToast();

  const handleExecute = () => {
    addAction.mutate(
      {
        id: incidentId,
        actionType,
        actionName,
        comments: comments.trim() || 'Sub-second SOAR mitigation action verified.',
      },
      {
        onSuccess: () => {
          showSuccess('SOAR Action Executed', `${actionName} deployed & verified successfully.`);
          onClose();
          setComments('');
        },
        onError: () => {
          showError('Execution Failed', `Failed to execute ${actionName}.`);
        },
      }
    );
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setActionType(val);
    switch (val) {
      case 'VLAN_ISOLATION':
        setActionName('Software-Defined Subnet Micro-Segmentation');
        break;
      case 'MALWARE_REMOVAL':
        setActionName('Automated Antivirus & Ransomware Purge');
        break;
      case 'PASSWORD_RESET':
        setActionName('Emergency Operator Credential Reset');
        break;
      case 'ACCOUNT_LOCK':
        setActionName('Suspicious Account Active Session Lock');
        break;
      case 'FIREWALL_RULE':
        setActionName('Gateway Firewall Rule Drop Execution');
        break;
      case 'DEVICE_SCAN':
        setActionName('Full End-to-End Host Telemetry Scan');
        break;
      default:
        setActionName('SOAR Defense Execution');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-[#1B1B1B] border-[#2A2A2A] text-[#F5F5F5] font-mono">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-[#D90429]" />
            <DialogTitle>EXECUTE SOAR RESPONSE ACTION</DialogTitle>
          </div>
          <DialogDescription className="text-xs text-[#A0A0A0] font-sans font-light">
            Deploy automated network defense playbooks to mitigate threat vectors
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2 text-xs">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-[#F5F5F5] uppercase tracking-wider">ACTION TYPE</label>
            <select
              value={actionType}
              onChange={handleTypeChange}
              className="w-full h-9 bg-[#0A0A0A] border border-[#2A2A2A] px-3 text-xs text-[#F5F5F5] focus:border-[#D90429] focus:outline-none"
            >
              <option value="VLAN_ISOLATION">Subnet VLAN Isolation (Micro-segmentation)</option>
              <option value="MALWARE_REMOVAL">Malware Purge & Endpoint Remediation</option>
              <option value="FIREWALL_RULE">Deploy Gateway Firewall Rule</option>
              <option value="ACCOUNT_LOCK">Lock Suspicious User Account</option>
              <option value="PASSWORD_RESET">Force Password Reset</option>
              <option value="DEVICE_SCAN">Trigger Full Endpoint Scan</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-[#F5F5F5] uppercase tracking-wider">ACTION IDENTIFIER NAME</label>
            <input
              type="text"
              value={actionName}
              onChange={(e) => setActionName(e.target.value)}
              className="w-full h-9 bg-[#0A0A0A] border border-[#2A2A2A] px-3 text-xs text-[#F5F5F5] focus:border-[#D90429] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-[#F5F5F5] uppercase tracking-wider">OPERATOR AUDIT COMMENTS</label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Record operational rationale or router rule parameters..."
              rows={2}
              className="w-full bg-[#0A0A0A] border border-[#2A2A2A] p-2 text-xs text-[#F5F5F5] resize-none focus:outline-none focus:border-[#D90429]"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" size="sm" onClick={onClose}>
            CANCEL
          </Button>
          <Button
            variant="cyan-accent"
            size="sm"
            onClick={handleExecute}
            isLoading={addAction.isPending}
          >
            <Zap className="mr-1.5 h-3.5 w-3.5 text-[#D90429]" /> EXECUTE SOAR ACTION
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
