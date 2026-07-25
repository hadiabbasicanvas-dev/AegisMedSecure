import React, { useState } from 'react';
import { useCreateAdminUser, UserAdminItem } from '@/services/adminService';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserPlus } from 'lucide-react';

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserFormModal: React.FC<UserFormModalProps> = ({ isOpen, onClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('SOC Operations');
  const [role, setRole] = useState<'SUPER_ADMINISTRATOR' | 'SOC_MANAGER' | 'SECURITY_ANALYST' | 'IT_ADMINISTRATOR' | 'COMPLIANCE_OFFICER'>('SECURITY_ANALYST');

  const createUser = useCreateAdminUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !firstName.trim()) return;

    createUser.mutate(
      {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        department,
        role,
      },
      {
        onSuccess: () => {
          onClose();
          setFirstName('');
          setLastName('');
          setEmail('');
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-slate-900 border-slate-800 text-slate-100 backdrop-blur-xl">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <UserPlus className="h-5 w-5 text-cyan-400" />
            <DialogTitle>Provision System Operator Account</DialogTitle>
          </div>
          <DialogDescription className="text-xs text-slate-400">
            Create user identity record and assign RBAC role permissions
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-slate-300">First Name *</label>
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="e.g. Tariq"
                required
                className="bg-slate-950 border-slate-800 text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-slate-300">Last Name *</label>
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="e.g. Khan"
                required
                className="bg-slate-950 border-slate-800 text-xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono text-slate-300">Hospital Email Address *</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. tkhan@qih.hospital"
              required
              className="bg-slate-950 border-slate-800 text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-slate-300">RBAC Role Assignment</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full h-9 rounded-lg border border-slate-800 bg-slate-950 px-3 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
              >
                <option value="SUPER_ADMINISTRATOR">SUPER ADMINISTRATOR</option>
                <option value="SOC_MANAGER">SOC MANAGER</option>
                <option value="SECURITY_ANALYST">SECURITY ANALYST</option>
                <option value="IT_ADMINISTRATOR">IT ADMINISTRATOR</option>
                <option value="COMPLIANCE_OFFICER">COMPLIANCE OFFICER</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-slate-300">Department</label>
              <Input
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
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
              isLoading={createUser.isPending}
              className="text-xs"
            >
              <UserPlus className="mr-1.5 h-3.5 w-3.5" /> Provision User
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
