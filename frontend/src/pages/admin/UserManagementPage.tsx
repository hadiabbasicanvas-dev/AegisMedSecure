import React, { useState } from 'react';
import { useAdminUsers, useUpdateAdminUser, useResetAdminUserPassword, UserAdminItem } from '@/services/adminService';
import { PageContainer } from '@/components/common/PageContainer';
import { UserFormModal } from '@/components/admin/UserFormModal';
import { UserAvatar } from '@/components/auth/UserAvatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserPlus, Search, KeyRound } from 'lucide-react';
import { formatDate } from '@/utils/formatters';
import { useAuthStore } from '@/store/useAuthStore';

export const UserManagementPage: React.FC = () => {
  const { user: currentUser } = useAuthStore();
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: users = [], isLoading } = useAdminUsers({ search, role });
  const updateUser = useUpdateAdminUser();
  const resetPassword = useResetAdminUserPassword();

  const isSuperAdmin = currentUser?.role === 'SUPER_ADMINISTRATOR';

  const handleResetPassword = (id: string, email: string) => {
    if (!isSuperAdmin) {
      alert('Only Super Administrators can trigger account credential resets.');
      return;
    }
    resetPassword.mutate(id, {
      onSuccess: (data) => {
        alert(`Password reset successful for ${email}.\nTemporary Password: ${data.tempPassword}`);
      },
    });
  };

  const handleToggleActive = (id: string, currentStatus: boolean) => {
    if (!isSuperAdmin) {
      alert('Only Super Administrators can modify account status.');
      return;
    }
    updateUser.mutate({ id, updates: { isActive: !currentStatus } });
  };

  return (
    <PageContainer
      title="USER IDENTITY & IAM ACCESS MANAGEMENT"
      description="Provision accounts, assign RBAC role permissions, and reset credentials for QIH staff"
      actions={
        <Button
          variant="cyan-accent"
          size="sm"
          disabled={!isSuperAdmin}
          onClick={() => setIsModalOpen(true)}
        >
          <UserPlus className="mr-1.5 h-4 w-4 text-[#D90429]" /> PROVISION NEW USER
        </Button>
      }
    >
      {/* Filter Bar */}
      <div className="bg-[#171717] border border-[#2A2A2A] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#D90429]" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, department..."
            className="pl-9 text-xs h-9 bg-[#0A0A0A] border-[#2A2A2A] focus:border-[#D90429]"
          />
        </div>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="h-9 bg-[#0A0A0A] border border-[#2A2A2A] px-3 text-xs text-[#F5F5F5] focus:border-[#D90429] focus:outline-none"
        >
          <option value="">ALL RBAC TIERS</option>
          <option value="SUPER_ADMINISTRATOR">SUPER ADMINISTRATOR</option>
          <option value="SOC_MANAGER">SOC MANAGER</option>
          <option value="SECURITY_ANALYST">SECURITY ANALYST</option>
          <option value="IT_ADMINISTRATOR">IT ADMINISTRATOR</option>
          <option value="COMPLIANCE_OFFICER">COMPLIANCE OFFICER</option>
        </select>
      </div>

      {/* User Datatable */}
      <div className="bg-[#1B1B1B] border border-[#2A2A2A] overflow-hidden shadow-2xl font-mono text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#2A2A2A] bg-[#0A0A0A] text-[#707070] uppercase text-[10px]">
                <th className="py-3 px-4">OPERATOR USER</th>
                <th className="py-3 px-4">RBAC ROLE TIER</th>
                <th className="py-3 px-4">DEPARTMENT / UNIT</th>
                <th className="py-3 px-4">ACCOUNT STATUS</th>
                <th className="py-3 px-4">CREATED DATE</th>
                <th className="py-3 px-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2A2A]/60">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-xs text-[#A0A0A0]">
                    Loading User Identity Accounts...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-xs text-[#707070]">
                    No operator accounts found.
                  </td>
                </tr>
              ) : (
                users.map((u: UserAdminItem) => (
                  <tr key={u.id} className="hover:bg-[#171717] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <UserAvatar firstName={u.firstName} lastName={u.lastName} size="sm" />
                        <div>
                          <p className="font-bold text-[#F5F5F5] uppercase">{u.firstName} {u.lastName}</p>
                          <p className="text-[10px] text-[#A0A0A0]">{u.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <Badge
                        variant={
                          u.role === 'SUPER_ADMINISTRATOR'
                            ? 'critical'
                            : u.role === 'SOC_MANAGER'
                            ? 'warning'
                            : 'info'
                        }
                        className="text-[9px]"
                      >
                        {u.role.replace(/_/g, ' ')}
                      </Badge>
                    </td>

                    <td className="py-3.5 px-4 text-[#F5F5F5] font-sans">{u.department}</td>

                    <td className="py-3.5 px-4">
                      <Badge variant={u.isActive ? 'success' : 'critical'} className="text-[9px]">
                        {u.isActive ? 'ACTIVE' : 'LOCKED'}
                      </Badge>
                    </td>

                    <td className="py-3.5 px-4 text-[#A0A0A0] text-[11px]">{formatDate(u.createdAt)}</td>

                    <td className="py-3.5 px-4 text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={!isSuperAdmin}
                        onClick={() => handleResetPassword(u.id, u.email)}
                        className="text-[#A0A0A0] hover:text-[#D90429]"
                      >
                        <KeyRound className="h-3.5 w-3.5 mr-1 text-[#D90429]" /> RESET PASS
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={!isSuperAdmin}
                        onClick={() => handleToggleActive(u.id, u.isActive)}
                        className={u.isActive ? 'text-[#A0A0A0] hover:text-[#FF1744]' : 'text-[#A0A0A0] hover:text-[#00C853]'}
                      >
                        {u.isActive ? 'DEACTIVATE' : 'ACTIVATE'}
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <UserFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </PageContainer>
  );
};
