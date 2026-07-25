import React from 'react';
import { PageContainer } from '@/components/common/PageContainer';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, ShieldCheck, Cpu, AlertTriangle } from 'lucide-react';

export const DashboardOverviewPage: React.FC = () => {
  return (
    <PageContainer
      title="Executive SOC Command Center"
      description="Quaid-e-Azam International Hospital Real-Time Autonomous Defense Engine"
      actions={
        <Button variant="cyan-accent" size="sm">
          Phase 1 Foundation Active
        </Button>
      }
    >
      {/* Metric Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Health Score</span>
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-slate-50">98 / 100</div>
            <Badge variant="success" className="mt-2">SYSTEM HEALTHY</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Threats</span>
            <AlertTriangle className="h-5 w-5 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-slate-50">0 Active</div>
            <Badge variant="info" className="mt-2">STANDBY</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Monitored Subnets</span>
            <Activity className="h-5 w-5 text-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-slate-50">12 Subnets</div>
            <p className="text-xs text-slate-400 mt-2">EMR, PACS, ICU, NICU, PICU</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">AI Engine</span>
            <Cpu className="h-5 w-5 text-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-slate-50">OpenAI GPT-4o</div>
            <Badge variant="success" className="mt-2">FOUNDATION READY</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Main Status Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Phase 1 Foundation Setup Verified</CardTitle>
          <CardDescription>Enterprise Monorepo, Tailwind CSS Tokens, Layout Shells, and Express API Engine</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-slate-300">
          <p>
            The foundation for <strong>Aegis Guardian AI</strong> is initialized and ready for Phase 2 (Authentication & IAM).
          </p>
          <div className="rounded-lg bg-navy-950 p-4 border border-slate-800 font-mono text-xs text-cyan-400">
            [SYS_INIT] React 19 SPA, Path Aliases (@/), Zustand UI Store, Radix primitives, Express API Gateway, and Prisma Postgres Config verified.
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
};
