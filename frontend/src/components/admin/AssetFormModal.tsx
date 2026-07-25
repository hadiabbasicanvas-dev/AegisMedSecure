import React, { useState } from 'react';
import { useCreateAdminAsset } from '@/services/adminService';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Server, Plus } from 'lucide-react';

interface AssetFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AssetFormModal: React.FC<AssetFormModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('SERVER');
  const [departmentName, setDepartmentName] = useState('Radiology / PACS');
  const [ipAddress, setIpAddress] = useState('10.45.12.99');
  const [os, setOs] = useState('Windows Server 2022');
  const [owner, setOwner] = useState('Radiology IT Custodian');
  const [riskLevel, setRiskLevel] = useState('MEDIUM');

  const createAsset = useCreateAdminAsset();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    createAsset.mutate(
      {
        name: name.trim(),
        type: type as any,
        departmentName,
        ipAddress,
        os,
        owner,
        riskLevel: riskLevel as any,
      },
      {
        onSuccess: () => {
          onClose();
          setName('');
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-slate-900 border-slate-800 text-slate-100 backdrop-blur-xl">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <Server className="h-5 w-5 text-cyan-400" />
            <DialogTitle>Register Hospital Endpoint Asset</DialogTitle>
          </div>
          <DialogDescription className="text-xs text-slate-400">
            Add server, workstation, or IoMT medical device to autonomous telemetry monitoring
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2 text-xs">
          <div className="space-y-1">
            <label className="text-[11px] font-mono text-slate-300">Asset Display Name *</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. PACS Imaging DICOM Vault #3"
              required
              className="bg-slate-950 border-slate-800 text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-slate-300">Asset Category Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full h-9 rounded-lg border border-slate-800 bg-slate-950 px-3 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
              >
                <option value="SERVER">SERVER</option>
                <option value="WORKSTATION">WORKSTATION</option>
                <option value="MEDICAL_DEVICE">MEDICAL DEVICE (IoMT)</option>
                <option value="FIREWALL">FIREWALL</option>
                <option value="ROUTER">ROUTER</option>
                <option value="IMAGING_EQUIPMENT">IMAGING EQUIPMENT</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-slate-300">Baseline Risk Level</label>
              <select
                value={riskLevel}
                onChange={(e) => setRiskLevel(e.target.value)}
                className="w-full h-9 rounded-lg border border-slate-800 bg-slate-950 px-3 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
              >
                <option value="CRITICAL">CRITICAL</option>
                <option value="HIGH">HIGH</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="LOW">LOW</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-slate-300">IP Address</label>
              <Input
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                className="bg-slate-950 border-slate-800 text-xs font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-slate-300">Operating System</label>
              <Input
                value={os}
                onChange={(e) => setOs(e.target.value)}
                className="bg-slate-950 border-slate-800 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-slate-300">Hospital Ward</label>
              <Input
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                className="bg-slate-950 border-slate-800 text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-slate-300">Owner Custodian</label>
              <Input
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                className="bg-slate-950 border-slate-800 text-xs"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" size="sm" onClick={onClose} type="button" className="text-xs">
              Cancel
            </Button>
            <Button
              variant="cyan-accent"
              size="sm"
              type="submit"
              isLoading={createAsset.isPending}
              className="text-xs"
            >
              <Plus className="mr-1.5 h-3.5 w-3.5" /> Register Asset
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
