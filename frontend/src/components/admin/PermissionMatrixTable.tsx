import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X, Shield } from 'lucide-react';

export const PermissionMatrixTable: React.FC = () => {
  const permissions = [
    { module: 'Authentication', action: 'Login & Session Token Management', superAdmin: true, socManager: true, analyst: true, itAdmin: true, compliance: true },
    { module: 'Threat Monitoring', action: 'View Real-time Hospital Telemetry', superAdmin: true, socManager: true, analyst: true, itAdmin: true, compliance: true },
    { module: 'Threat Monitoring', action: 'Resolve Threat & Trigger SOAR Isolation', superAdmin: true, socManager: true, analyst: true, itAdmin: false, compliance: false },
    { module: 'AI Security Assistant', action: 'Query GPT-4o RAG Copilot & Playbooks', superAdmin: true, socManager: true, analyst: true, itAdmin: true, compliance: true },
    { module: 'Incident Management', action: 'Initialize, Assign & Close Incidents', superAdmin: true, socManager: true, analyst: false, itAdmin: false, compliance: false },
    { module: 'Incident Management', action: 'Add Investigation Notes & Log Evidence', superAdmin: true, socManager: true, analyst: true, itAdmin: true, compliance: true },
    { module: 'Analytics & Reports', action: 'Generate Audit Reports & Download CSV', superAdmin: true, socManager: true, analyst: true, itAdmin: true, compliance: true },
    { module: 'Administration', action: 'User Provisioning & Role Editing', superAdmin: true, socManager: false, analyst: false, itAdmin: false, compliance: false },
    { module: 'Administration', action: 'Asset Inventory & Micro-segmentation Rules', superAdmin: true, socManager: true, analyst: false, itAdmin: true, compliance: false },
    { module: 'Administration', action: 'Audit Logs & Security Setting Updates', superAdmin: true, socManager: false, analyst: false, itAdmin: false, compliance: true },
  ];

  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-[#D90429]" />
            <CardTitle>ROLE-BASED ACCESS CONTROL (RBAC) PERMISSION MATRIX</CardTitle>
          </div>
          <Badge variant="info" className="text-[9px]">QIH IAM ENGINE</Badge>
        </div>
        <CardDescription>Granular permission entitlements across all 5 system operator roles</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pt-2 overflow-x-auto font-mono text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#2A2A2A] bg-[#0A0A0A] text-[#707070] uppercase text-[10px]">
              <th className="py-3 px-3">MODULE CATEGORY</th>
              <th className="py-3 px-3">ENTITLEMENT ACTION</th>
              <th className="py-3 px-3 text-center">SUPER ADMIN</th>
              <th className="py-3 px-3 text-center">SOC MANAGER</th>
              <th className="py-3 px-3 text-center">ANALYST</th>
              <th className="py-3 px-3 text-center">IT ADMIN</th>
              <th className="py-3 px-3 text-center">COMPLIANCE</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2A2A2A]/60">
            {permissions.map((p, idx) => (
              <tr key={idx} className="hover:bg-[#171717] transition-colors">
                <td className="py-2.5 px-3 font-bold text-[#D90429] text-[11px] uppercase">{p.module}</td>
                <td className="py-2.5 px-3 text-[#F5F5F5] font-sans font-light text-[11px]">{p.action}</td>
                <td className="py-2.5 px-3 text-center">
                  {p.superAdmin ? <Check className="h-4 w-4 text-[#00C853] mx-auto" /> : <X className="h-4 w-4 text-[#707070] mx-auto" />}
                </td>
                <td className="py-2.5 px-3 text-center">
                  {p.socManager ? <Check className="h-4 w-4 text-[#00C853] mx-auto" /> : <X className="h-4 w-4 text-[#707070] mx-auto" />}
                </td>
                <td className="py-2.5 px-3 text-center">
                  {p.analyst ? <Check className="h-4 w-4 text-[#00C853] mx-auto" /> : <X className="h-4 w-4 text-[#707070] mx-auto" />}
                </td>
                <td className="py-2.5 px-3 text-center">
                  {p.itAdmin ? <Check className="h-4 w-4 text-[#00C853] mx-auto" /> : <X className="h-4 w-4 text-[#707070] mx-auto" />}
                </td>
                <td className="py-2.5 px-3 text-center">
                  {p.compliance ? <Check className="h-4 w-4 text-[#00C853] mx-auto" /> : <X className="h-4 w-4 text-[#707070] mx-auto" />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};
