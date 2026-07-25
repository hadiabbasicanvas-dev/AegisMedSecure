import React, { useState } from 'react';
import { useAdminUsers, useAdminAuditLogs } from '@/services/adminService';
import { PageContainer } from '@/components/common/PageContainer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { generateExecutiveDashboardPDF } from '@/utils/pdfExporter';
import { useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  CheckCircle2,
  AlertOctagon,
  Users,
  Plus,
  Search,
  Activity,
  UserCheck,
  Radio,
  Download
} from 'lucide-react';

interface RiskItem {
  id: string;
  assetName: string;
  category: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  assignedTo: string;
  status: 'PENDING' | 'INVESTIGATING' | 'RESOLVED';
  timestamp: string;
}

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: users = [] } = useAdminUsers();
  const { data: auditLogs = [] } = useAdminAuditLogs();

  const [riskFilter, setRiskFilter] = useState<'ALL' | 'PENDING' | 'RESOLVED' | 'CRITICAL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock Risks Data for Super Admin Panel
  const initialRisks: RiskItem[] = [
    { id: 'RSK-8490', assetName: 'PACS DICOM Imaging Server #4', category: 'Imaging Vault', severity: 'CRITICAL', assignedTo: 'Analyst A. Khan', status: 'INVESTIGATING', timestamp: '14:22:10' },
    { id: 'RSK-8491', assetName: 'EMR Core Patient Database', category: 'Database', severity: 'CRITICAL', assignedTo: 'SOC Mgr. S. Ahmed', status: 'PENDING', timestamp: '14:15:32' },
    { id: 'RSK-8492', assetName: 'ICU Ventilator IoMT Gateway', category: 'Life Support', severity: 'HIGH', assignedTo: 'Eng. Z. Tariq', status: 'RESOLVED', timestamp: '13:58:04' },
    { id: 'RSK-8493', assetName: 'ER Central Workstation #12', category: 'Endpoint', severity: 'MEDIUM', assignedTo: 'Analyst F. Malik', status: 'RESOLVED', timestamp: '13:42:19' },
    { id: 'RSK-8494', assetName: 'Lab Info System (LIS) Server', category: 'Lab Net', severity: 'HIGH', assignedTo: 'Analyst A. Khan', status: 'PENDING', timestamp: '13:30:11' },
    { id: 'RSK-8495', assetName: 'Pharmacy Dispensing Kiosk', category: 'Endpoint', severity: 'LOW', assignedTo: 'SOC Mgr. S. Ahmed', status: 'RESOLVED', timestamp: '12:45:00' },
  ];

  const filteredRisks = initialRisks.filter((risk) => {
    if (riskFilter === 'PENDING' && risk.status === 'RESOLVED') return false;
    if (riskFilter === 'RESOLVED' && risk.status !== 'RESOLVED') return false;
    if (riskFilter === 'CRITICAL' && risk.severity !== 'CRITICAL') return false;
    if (searchQuery && !risk.assetName.toLowerCase().includes(searchQuery.toLowerCase()) && !risk.id.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleExportPDF = () => {
    generateExecutiveDashboardPDF({
      title: 'SUPER ADMIN EXECUTIVE COMMAND DASHBOARD REPORT',
      facilityName: 'Quaid-e-Azam International Hospital (QIH), Islamabad',
      reportType: 'EXECUTIVE COMMAND GOVERNANCE BRIEF',
      generatedBy: 'Hadi Abbasi (Super Administrator)',
      metrics: [
        { label: 'TOTAL SYSTEM RISKS', value: '142 Recorded' },
        { label: 'PENDING THREATS', value: '12 Critical Pending' },
        { label: 'RESOLVED RISKS', value: '130 Contained' },
        { label: 'ACTIVE STAFF ON-DUTY', value: '22 SOC Personnel' },
      ],
      items: filteredRisks.map((r) => ({
        code: r.id,
        asset: r.assetName,
        severity: r.severity,
        status: r.status,
      })),
    });
  };

  // Online Staff List for Duty Manager
  const staffMembers = [
    { id: '1', name: 'Dr. Shahbaz Ahmed', role: 'SOC MANAGER', shift: 'DAY SHIFT (08:00 - 16:00)', tasksAssigned: 3, status: 'ONLINE' },
    { id: '2', name: 'Ali Khan', role: 'SECURITY ANALYST', shift: 'DAY SHIFT (08:00 - 16:00)', tasksAssigned: 5, status: 'ONLINE' },
    { id: '3', name: 'Zainab Tariq', role: 'SYSTEMS ENGINEER', shift: 'ON-CALL DUTY', tasksAssigned: 2, status: 'ONLINE' },
    { id: '4', name: 'Faisal Malik', role: 'SECURITY ANALYST', shift: 'NIGHT SHIFT (16:00 - 00:00)', tasksAssigned: 1, status: 'AWAY' },
  ];

  return (
    <PageContainer
      title="SUPER ADMINISTRATOR EXECUTIVE COMMAND DASHBOARD"
      description="Real-time governance, duty assignment, risk tracking, and system audit log streaming for QIH"
      actions={
        <div className="flex items-center space-x-3 font-mono">
          <Badge variant="critical" className="text-[9px]">
            <Radio className="mr-1 h-3 w-3 animate-pulse text-[#FF1744]" /> SUPER ADMIN MODE
          </Badge>

          {/* REAL DOWNLOADABLE PDF EXPORT BUTTON */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportPDF}
            className="text-xs border-[#2A2A2A] text-[#F5F5F5] hover:border-[#D90429]"
          >
            <Download className="mr-1.5 h-3.5 w-3.5 text-[#D90429]" /> EXPORT DASHBOARD PDF
          </Button>

          <Button
            variant="cyan-accent"
            size="sm"
            onClick={() => navigate('/dashboard/duty-management')}
          >
            <Plus className="mr-1.5 h-4 w-4 text-[#D90429]" /> ASSIGN NEW DUTY
          </Button>
        </div>
      }
    >
      {/* Top Search & Filter Bar */}
      <div className="bg-[#171717] border border-[#2A2A2A] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#D90429]" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search risk ID, asset name, or SOC staff..."
            className="pl-9 text-xs h-9 bg-[#0A0A0A] border-[#2A2A2A] focus:border-[#D90429]"
          />
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="text-[#707070] uppercase">SYSTEM ALERTS:</span>
          <span className="px-2.5 py-1 bg-[#FF1744]/15 border border-[#FF1744]/40 text-[#FF1744] font-bold">
            12 ACTIVE THREATS
          </span>
          <span className="px-2.5 py-1 bg-[#00C853]/15 border border-[#00C853]/40 text-[#00C853] font-bold">
            VLAN ISOLATION READY
          </span>
        </div>
      </div>

      {/* Top 4 KPI Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        {/* Card 1: Total System Risks */}
        <div className="p-4 bg-[#1B1B1B] border border-[#2A2A2A] space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#A0A0A0] uppercase tracking-wider font-bold">TOTAL SYSTEM RISKS</span>
            <AlertOctagon className="h-4 w-4 text-[#F5F5F5]" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-heading text-2xl font-bold text-[#F5F5F5]">142</span>
            <span className="text-xs text-[#A0A0A0]">Total Recorded</span>
          </div>
          <p className="text-[10px] text-[#00C853]">+1.4% vulnerability scans</p>
        </div>

        {/* Card 2: Active / Pending Threats */}
        <div className="p-4 bg-[#1B1B1B] border border-[#FF1744]/40 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#FF1744] uppercase tracking-wider font-bold">PENDING THREATS</span>
            <ShieldAlert className="h-4 w-4 text-[#FF1744] animate-pulse" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-heading text-2xl font-bold text-[#FF1744]">12</span>
            <span className="text-xs text-[#FF1744]">Critical Pending</span>
          </div>
          <p className="text-[10px] text-[#FF1744]">Action required by Analyst</p>
        </div>

        {/* Card 3: Resolved Risks */}
        <div className="p-4 bg-[#1B1B1B] border border-[#00C853]/40 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#00C853] uppercase tracking-wider font-bold">RESOLVED RISKS</span>
            <CheckCircle2 className="h-4 w-4 text-[#00C853]" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-heading text-2xl font-bold text-[#00C853]">130</span>
            <span className="text-xs text-[#00C853]">Contained & Mitigated</span>
          </div>
          <p className="text-[10px] text-[#00C853]">91.5% auto-mitigation rate</p>
        </div>

        {/* Card 4: Active Staff On-Duty */}
        <div className="p-4 bg-[#1B1B1B] border border-[#2A2A2A] space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#A0A0A0] uppercase tracking-wider font-bold">ACTIVE STAFF ON-DUTY</span>
            <Users className="h-4 w-4 text-[#D90429]" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-heading text-2xl font-bold text-[#F5F5F5]">22</span>
            <span className="text-xs text-[#A0A0A0]">SOC Staff</span>
          </div>
          <p className="text-[10px] text-[#A0A0A0]">8 SOC Managers, 14 Analysts</p>
        </div>
      </div>

      {/* Main Grid: Central Risk Tracker & Right Duty Assignment Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* CENTRAL PANEL: Risk & Incident Status Tracker (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-[#1B1B1B] border border-[#2A2A2A] p-5 space-y-4 font-mono">
            {/* Header & Quick Filter Toggles */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#2A2A2A] pb-3">
              <div>
                <h3 className="font-heading text-sm font-bold text-[#F5F5F5] uppercase flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-[#D90429]" /> RISK & INCIDENT STATUS TRACKER
                </h3>
                <p className="text-[11px] text-[#A0A0A0] font-sans font-light">Real-time hospital asset exposure & assigned mitigation status</p>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center space-x-1 text-[10px]">
                <button
                  onClick={() => setRiskFilter('ALL')}
                  className={`px-2.5 py-1 uppercase font-bold border transition-colors ${
                    riskFilter === 'ALL' ? 'bg-[#171717] text-[#F5F5F5] border-[#D90429]' : 'text-[#707070] border-[#2A2A2A] hover:text-[#F5F5F5]'
                  }`}
                >
                  ALL (142)
                </button>

                <button
                  onClick={() => setRiskFilter('PENDING')}
                  className={`px-2.5 py-1 uppercase font-bold border transition-colors ${
                    riskFilter === 'PENDING' ? 'bg-[#171717] text-[#FF1744] border-[#FF1744]' : 'text-[#707070] border-[#2A2A2A] hover:text-[#F5F5F5]'
                  }`}
                >
                  PENDING (12)
                </button>

                <button
                  onClick={() => setRiskFilter('RESOLVED')}
                  className={`px-2.5 py-1 uppercase font-bold border transition-colors ${
                    riskFilter === 'RESOLVED' ? 'bg-[#171717] text-[#00C853] border-[#00C853]' : 'text-[#707070] border-[#2A2A2A] hover:text-[#F5F5F5]'
                  }`}
                >
                  RESOLVED (130)
                </button>

                <button
                  onClick={() => setRiskFilter('CRITICAL')}
                  className={`px-2.5 py-1 uppercase font-bold border transition-colors ${
                    riskFilter === 'CRITICAL' ? 'bg-[#171717] text-[#FF1744] border-[#FF1744]' : 'text-[#707070] border-[#2A2A2A] hover:text-[#F5F5F5]'
                  }`}
                >
                  CRITICAL
                </button>
              </div>
            </div>

            {/* Risk Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#2A2A2A] bg-[#0A0A0A] text-[#707070] uppercase text-[10px]">
                    <th className="py-2.5 px-3">RISK ID</th>
                    <th className="py-2.5 px-3">ASSET NAME & SUBNET</th>
                    <th className="py-2.5 px-3">SEVERITY</th>
                    <th className="py-2.5 px-3">ASSIGNED TO</th>
                    <th className="py-2.5 px-3">STATUS</th>
                    <th className="py-2.5 px-3 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2A2A2A]/60">
                  {filteredRisks.map((item) => (
                    <tr key={item.id} className="hover:bg-[#171717] transition-colors">
                      <td className="py-3 px-3 font-bold text-[#D90429]">{item.id}</td>
                      <td className="py-3 px-3">
                        <p className="font-bold text-[#F5F5F5] uppercase">{item.assetName}</p>
                        <span className="text-[10px] text-[#707070]">{item.category}</span>
                      </td>
                      <td className="py-3 px-3">
                        <Badge variant={item.severity === 'CRITICAL' ? 'critical' : item.severity === 'HIGH' ? 'high' : 'info'} className="text-[8px]">
                          {item.severity}
                        </Badge>
                      </td>
                      <td className="py-3 px-3 text-[#F5F5F5] font-bold text-[11px]">{item.assignedTo}</td>
                      <td className="py-3 px-3">
                        <Badge variant={item.status === 'RESOLVED' ? 'success' : item.status === 'PENDING' ? 'critical' : 'warning'} className="text-[8px]">
                          {item.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/duty-management')} className="text-[#A0A0A0] hover:text-[#D90429]">
                          MANAGE
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Role & Duty Assignment Manager (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#1B1B1B] border border-[#2A2A2A] p-5 space-y-4 font-mono">
            <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-3">
              <h3 className="font-heading text-sm font-bold text-[#F5F5F5] uppercase flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-[#00C853]" /> DUTY & STAFF MANAGER
              </h3>
              <Badge variant="success" className="text-[8px]">ONLINE (4)</Badge>
            </div>

            <p className="text-[11px] text-[#A0A0A0] font-sans font-light">Assign active shift duties and monitor SOC personnel workload</p>

            <div className="space-y-3">
              {staffMembers.map((staff) => (
                <div key={staff.id} className="p-3 bg-[#0A0A0A] border border-[#2A2A2A] space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-[#F5F5F5] text-xs uppercase">{staff.name}</p>
                      <p className="text-[9px] text-[#D90429]">{staff.role}</p>
                    </div>
                    <span className={`h-2 w-2 rounded-full ${staff.status === 'ONLINE' ? 'bg-[#00C853]' : 'bg-[#FFB300]'}`} />
                  </div>

                  <div className="text-[10px] text-[#707070] space-y-0.5">
                    <p>SHIFT: <span className="text-[#F5F5F5]">{staff.shift}</span></p>
                    <p>LOAD: <span className="text-[#00C853] font-bold">{staff.tasksAssigned} Tasks Assigned</span></p>
                  </div>

                  <div className="pt-1 flex items-center justify-between">
                    <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/duty-management')} className="text-[9px] h-6 px-2">
                      ASSIGN THREAT
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/duty-management')} className="text-[9px] h-6 px-2 text-[#A0A0A0]">
                      LOGS
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM SECTION: Live Streaming System Activity Log Feed */}
      <div className="bg-[#1B1B1B] border border-[#2A2A2A] p-5 space-y-3 font-mono">
        <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-3">
          <div className="flex items-center space-x-2">
            <Activity className="h-4 w-4 text-[#D90429] animate-pulse" />
            <h3 className="font-heading text-xs font-bold text-[#F5F5F5] uppercase">
              LIVE SYSTEM AUDIT TRAIL STREAM
            </h3>
          </div>
          <Badge variant="info" className="text-[8px]">
            REAL-TIME STREAMING
          </Badge>
        </div>

        <div className="bg-[#0A0A0A] border border-[#2A2A2A] p-4 font-mono text-xs space-y-2 max-h-48 overflow-y-auto">
          <div className="flex items-center justify-between text-[#00C853]">
            <span>14:22:10 - SOC Analyst [A. Khan] resolved Incident #8490 (PACS DICOM isolation)</span>
            <span className="text-[10px] text-[#707070]">SUCCESS</span>
          </div>

          <div className="flex items-center justify-between text-[#F5F5F5]">
            <span>14:18:45 - Super Admin provisioned new account for Analyst [M. Riaz]</span>
            <span className="text-[10px] text-[#707070]">IAM AUDIT</span>
          </div>

          <div className="flex items-center justify-between text-[#FFB300]">
            <span>14:05:12 - SOC Manager [S. Ahmed] updated shift duty assignment for VLAN 104</span>
            <span className="text-[10px] text-[#707070]">DUTY LOG</span>
          </div>

          <div className="flex items-center justify-between text-[#D90429]">
            <span>13:52:30 - Aegis Guardian AI quarantined Ransomware SMB vector on EMR Host #10.45.2.14</span>
            <span className="text-[10px] text-[#FF1744]">AUTO CONTAINED</span>
          </div>

          <div className="flex items-center justify-between text-[#A0A0A0]">
            <span>13:30:00 - Routine HIPAA Title II compliance audit check completed</span>
            <span className="text-[10px] text-[#707070]">SYSTEM</span>
          </div>
        </div>
      </div>

    </PageContainer>
  );
};
