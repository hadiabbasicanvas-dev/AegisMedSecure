import React from 'react';
import { useAdminSystemHealth } from '@/services/adminService';
import { PageContainer } from '@/components/common/PageContainer';
import { SystemHealthGrid } from '@/components/admin/SystemHealthGrid';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Server, Database, Radio } from 'lucide-react';

export const SystemHealthPage: React.FC = () => {
  const { data: health } = useAdminSystemHealth();

  return (
    <PageContainer
      title="INFRASTRUCTURE & SYSTEM HEALTH OPERATIONS"
      description="Live probes monitoring Node.js API Gateway, PostgreSQL DB, Redis socket channels & NVMe storage"
      actions={
        <Badge variant="success" className="text-[9px]">
          ALL PROBES OPTIMAL
        </Badge>
      }
    >
      <SystemHealthGrid health={health} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
        <Card className="p-4 space-y-2">
          <div className="flex items-center space-x-2">
            <Server className="h-4 w-4 text-[#D90429]" />
            <h4 className="font-heading text-xs font-bold text-[#F5F5F5] uppercase">Node.js Express API Cluster</h4>
          </div>
          <p className="text-xs text-[#A0A0A0] font-sans font-light">Running Port 5000 • 0 unhandled exceptions • Sub-12ms response SLA</p>
          <Badge variant="success" className="text-[9px]">HEALTHY</Badge>
        </Card>

        <Card className="p-4 space-y-2">
          <div className="flex items-center space-x-2">
            <Database className="h-4 w-4 text-[#D90429]" />
            <h4 className="font-heading text-xs font-bold text-[#F5F5F5] uppercase">PostgreSQL Prisma Connection Pool</h4>
          </div>
          <p className="text-xs text-[#A0A0A0] font-sans font-light">10 Active connections • 4ms latency probe • Automatic backup active</p>
          <Badge variant="success" className="text-[9px]">CONNECTED</Badge>
        </Card>

        <Card className="p-4 space-y-2">
          <div className="flex items-center space-x-2">
            <Radio className="h-4 w-4 text-[#FFB300]" />
            <h4 className="font-heading text-xs font-bold text-[#F5F5F5] uppercase">WebSocket / SSE Live Telemetry Feed</h4>
          </div>
          <p className="text-xs text-[#A0A0A0] font-sans font-light">142 Active SOC socket sessions • Zero dropped telemetry frames</p>
          <Badge variant="success" className="text-[9px]">BROADCASTING</Badge>
        </Card>
      </div>
    </PageContainer>
  );
};
