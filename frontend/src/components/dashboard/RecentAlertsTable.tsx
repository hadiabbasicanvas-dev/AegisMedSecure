import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShieldAlert, ExternalLink, Check, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AlertItem {
  id: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  type: string;
  targetAsset: string;
  time: string;
  status: 'ACTIVE' | 'INVESTIGATING' | 'DISMISSED';
}

export const RecentAlertsTable: React.FC = () => {
  const navigate = useNavigate();

  const [alerts, setAlerts] = useState<AlertItem[]>([
    {
      id: 'ALT-8821',
      severity: 'CRITICAL',
      type: 'Ransomware SMB Encryption Vector',
      targetAsset: 'PACS-SERVER-02 (10.45.12.89)',
      time: '2 mins ago',
      status: 'ACTIVE',
    },
    {
      id: 'ALT-8820',
      severity: 'HIGH',
      type: 'Brute Force Auth Exploit',
      targetAsset: 'EMR-DB-PRIMARY (10.45.3.112)',
      time: '14 mins ago',
      status: 'INVESTIGATING',
    },
    {
      id: 'ALT-8819',
      severity: 'HIGH',
      type: 'Unauthorized Port Reconnaissance',
      targetAsset: 'LAB-ANALYZER-01 (10.45.60.22)',
      time: '35 mins ago',
      status: 'ACTIVE',
    },
    {
      id: 'ALT-8818',
      severity: 'MEDIUM',
      type: 'Outdated SSL Cipher Negotiation',
      targetAsset: 'OPD-PHARM-WORKSTATION-4',
      time: '1 hour ago',
      status: 'ACTIVE',
    },
    {
      id: 'ALT-8817',
      severity: 'LOW',
      type: 'Unregistered MAC Address Connection',
      targetAsset: 'ICU-GUEST-WIFI-AP-03',
      time: '2 hours ago',
      status: 'ACTIVE',
    },
  ]);

  const handleDismiss = (id: string) => {
    setAlerts((prev) => prev.map((item) => (item.id === id ? { ...item, status: 'DISMISSED' } : item)));
  };

  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <div className="flex items-center space-x-2">
            <ShieldAlert className="h-4 w-4 text-[#D90429]" />
            <CardTitle>RECENT THREAT ALERTS MATRIX</CardTitle>
            <Badge variant="info" className="text-[9px]">SIMULATED</Badge>
          </div>
          <CardDescription>High-priority security triggers across hospital subnets</CardDescription>
        </div>
        <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/alerts')} className="text-xs font-mono">
          VIEW ALL ALERTS <ExternalLink className="ml-1 h-3.5 w-3.5 text-[#D90429]" />
        </Button>
      </CardHeader>

      <CardContent className="flex-1 pt-2 overflow-x-auto font-mono">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-[#2A2A2A] text-[#707070] uppercase text-[10px] bg-[#171717]">
              <th className="py-2.5 px-3">ALERT ID</th>
              <th className="py-2.5 px-3">SEVERITY</th>
              <th className="py-2.5 px-3">THREAT TYPE</th>
              <th className="py-2.5 px-3">TARGET ASSET</th>
              <th className="py-2.5 px-3">TIME</th>
              <th className="py-2.5 px-3 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2A2A2A]/60">
            {alerts.map((item) => (
              <tr key={item.id} className="hover:bg-[#171717]/80 transition-colors">
                <td className="py-3 px-3 font-bold text-[#F5F5F5]">{item.id}</td>
                <td className="py-3 px-3">
                  <Badge
                    variant={
                      item.severity === 'CRITICAL'
                        ? 'critical'
                        : item.severity === 'HIGH'
                        ? 'high'
                        : item.severity === 'MEDIUM'
                        ? 'medium'
                        : 'low'
                    }
                  >
                    {item.severity}
                  </Badge>
                </td>
                <td className="py-3 px-3 text-[#F5F5F5] font-sans font-medium text-xs">{item.type}</td>
                <td className="py-3 px-3 text-[#D90429] text-[11px] font-bold">{item.targetAsset}</td>
                <td className="py-3 px-3 text-[#A0A0A0] text-[11px]">{item.time}</td>
                <td className="py-3 px-3 text-right space-x-1">
                  {item.status === 'DISMISSED' ? (
                    <span className="text-[10px] text-[#707070]">DISMISSED</span>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate('/dashboard/threats')}
                        className="px-2 py-1 h-7 text-[10px]"
                      >
                        <Eye className="h-3 w-3 mr-1 text-[#D90429]" /> INVESTIGATE
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDismiss(item.id)}
                        className="px-2 py-1 h-7 text-[10px] text-[#A0A0A0] hover:text-[#FF1744]"
                      >
                        <Check className="h-3 w-3 mr-1" /> DISMISS
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};
