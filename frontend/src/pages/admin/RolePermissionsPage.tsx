import React from 'react';
import { PageContainer } from '@/components/common/PageContainer';
import { PermissionMatrixTable } from '@/components/admin/PermissionMatrixTable';
import { Badge } from '@/components/ui/badge';

export const RolePermissionsPage: React.FC = () => {
  return (
    <PageContainer
      title="ROLE-BASED ACCESS CONTROL (RBAC) GOVERNANCE"
      description="Granular entitlement policies and module capabilities across QIH operator roles"
      actions={
        <Badge variant="info" className="text-[9px]">
          5 ACTIVE SYSTEM ROLES
        </Badge>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 font-mono">
        <div className="p-4 bg-[#1B1B1B] border border-[#2A2A2A] space-y-1">
          <span className="text-[10px] text-[#FF1744] font-bold">SUPER ADMINISTRATOR</span>
          <p className="text-xs text-[#A0A0A0] font-sans font-light">Full system access, user provisioning, global settings, & AI params.</p>
        </div>

        <div className="p-4 bg-[#1B1B1B] border border-[#2A2A2A] space-y-1">
          <span className="text-[10px] text-[#FFB300] font-bold">SOC MANAGER</span>
          <p className="text-xs text-[#A0A0A0] font-sans font-light">Full operational SOC access, incident assignment, & report admin.</p>
        </div>

        <div className="p-4 bg-[#1B1B1B] border border-[#2A2A2A] space-y-1">
          <span className="text-[10px] text-[#D90429] font-bold">SECURITY ANALYST</span>
          <p className="text-xs text-[#A0A0A0] font-sans font-light">Threat monitoring, SOAR isolation, notes & evidence uploads.</p>
        </div>

        <div className="p-4 bg-[#1B1B1B] border border-[#2A2A2A] space-y-1">
          <span className="text-[10px] text-[#F5F5F5] font-bold">IT ADMINISTRATOR</span>
          <p className="text-xs text-[#A0A0A0] font-sans font-light">Asset inventory registration, network health, & micro-segmentation.</p>
        </div>

        <div className="p-4 bg-[#1B1B1B] border border-[#2A2A2A] space-y-1">
          <span className="text-[10px] text-[#00C853] font-bold">COMPLIANCE OFFICER</span>
          <p className="text-xs text-[#A0A0A0] font-sans font-light">Read-only audit trail viewer & HIPAA report export capabilities.</p>
        </div>
      </div>

      <PermissionMatrixTable />
    </PageContainer>
  );
};
