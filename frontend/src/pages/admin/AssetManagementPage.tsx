import React, { useState } from 'react';
import { useAdminAssets, AssetAdminItem } from '@/services/adminService';
import { PageContainer } from '@/components/common/PageContainer';
import { AssetFormModal } from '@/components/admin/AssetFormModal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import { formatDate } from '@/utils/formatters';

export const AssetManagementPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [risk, setRisk] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: assets = [], isLoading } = useAdminAssets({ search, type, risk });

  return (
    <PageContainer
      title="HOSPITAL ASSET INVENTORY & ENDPOINT MANAGEMENT"
      description="Register and monitor DICOM servers, EMR databases, and IoMT medical devices"
      actions={
        <Button variant="cyan-accent" size="sm" onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-1.5 h-4 w-4 text-[#D90429]" /> REGISTER ASSET
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
            placeholder="Search code, asset name, IP address..."
            className="pl-9 text-xs h-9 bg-[#0A0A0A] border-[#2A2A2A] focus:border-[#D90429]"
          />
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="h-9 bg-[#0A0A0A] border border-[#2A2A2A] px-3 text-xs text-[#F5F5F5] focus:border-[#D90429] focus:outline-none"
          >
            <option value="">ALL CATEGORIES</option>
            <option value="SERVER">SERVER</option>
            <option value="WORKSTATION">WORKSTATION</option>
            <option value="MEDICAL_DEVICE">MEDICAL DEVICE (IoMT)</option>
            <option value="FIREWALL">FIREWALL</option>
            <option value="ROUTER">ROUTER</option>
            <option value="IMAGING_EQUIPMENT">IMAGING EQUIPMENT</option>
          </select>

          <select
            value={risk}
            onChange={(e) => setRisk(e.target.value)}
            className="h-9 bg-[#0A0A0A] border border-[#2A2A2A] px-3 text-xs text-[#F5F5F5] focus:border-[#D90429] focus:outline-none"
          >
            <option value="">ALL RISK LEVELS</option>
            <option value="CRITICAL">CRITICAL</option>
            <option value="HIGH">HIGH</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="LOW">LOW</option>
          </select>
        </div>
      </div>

      {/* Asset Inventory Datatable */}
      <div className="bg-[#1B1B1B] border border-[#2A2A2A] overflow-hidden shadow-2xl font-mono text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#2A2A2A] bg-[#0A0A0A] text-[#707070] uppercase text-[10px]">
                <th className="py-3 px-4">ASSET CODE</th>
                <th className="py-3 px-4">NAME & CATEGORY</th>
                <th className="py-3 px-4">HOSPITAL WARD</th>
                <th className="py-3 px-4">IP ADDRESS & OS</th>
                <th className="py-3 px-4">RISK TIER</th>
                <th className="py-3 px-4">MONITORED STATUS</th>
                <th className="py-3 px-4 text-right">LAST SCAN</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2A2A]/60">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-xs text-[#A0A0A0]">
                    Loading Asset Inventory...
                  </td>
                </tr>
              ) : assets.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-xs text-[#707070]">
                    No hospital assets found.
                  </td>
                </tr>
              ) : (
                assets.map((a: AssetAdminItem) => (
                  <tr key={a.id} className="hover:bg-[#171717] transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#D90429]">{a.assetCode}</td>

                    <td className="py-3.5 px-4">
                      <p className="font-bold text-[#F5F5F5] uppercase">{a.name}</p>
                      <span className="text-[10px] text-[#A0A0A0]">{a.type}</span>
                    </td>

                    <td className="py-3.5 px-4 text-[#F5F5F5] font-sans">{a.departmentName}</td>

                    <td className="py-3.5 px-4">
                      <p className="font-bold text-[#F5F5F5] text-[11px]">{a.ipAddress}</p>
                      <p className="text-[10px] text-[#707070]">{a.os}</p>
                    </td>

                    <td className="py-3.5 px-4">
                      <Badge
                        variant={
                          a.riskLevel === 'CRITICAL'
                            ? 'critical'
                            : a.riskLevel === 'HIGH'
                            ? 'high'
                            : 'info'
                        }
                        className="text-[9px]"
                      >
                        {a.riskLevel}
                      </Badge>
                    </td>

                    <td className="py-3.5 px-4">
                      <Badge variant={a.isMonitored ? 'success' : 'critical'} className="text-[9px]">
                        {a.isMonitored ? 'MONITORED' : 'UNMONITORED'}
                      </Badge>
                    </td>

                    <td className="py-3.5 px-4 text-right text-[11px] text-[#A0A0A0]">
                      {formatDate(a.lastScanAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AssetFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </PageContainer>
  );
};
