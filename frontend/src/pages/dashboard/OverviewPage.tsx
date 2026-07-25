import React from 'react';
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner';
import { QuickActionsBar } from '@/components/dashboard/QuickActionsBar';
import { KPICardMatrix } from '@/components/dashboard/KPICard';
import { ThreatTrendChart } from '@/components/charts/ThreatTrendChart';
import { SeverityDistChart } from '@/components/charts/SeverityDistChart';
import { DepartmentRiskChart } from '@/components/charts/DepartmentRiskChart';
import { AssetHealthChart } from '@/components/charts/AssetHealthChart';
import { LiveThreatFeed } from '@/components/dashboard/LiveThreatFeed';
import { RecentAlertsTable } from '@/components/dashboard/RecentAlertsTable';
import { AIInsightsPanel } from '@/components/dashboard/AIInsightsPanel';

export const OverviewPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-10">
      {/* Personalized Welcome Banner */}
      <WelcomeBanner />

      {/* Quick Action Shortcuts */}
      <QuickActionsBar />

      {/* KPI Metrics Matrix (6 Cards) */}
      <KPICardMatrix />

      {/* Primary Recharts Analytics Grid (Row 1) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ThreatTrendChart />
        </div>
        <div className="lg:col-span-1">
          <SeverityDistChart />
        </div>
      </div>

      {/* Secondary Recharts Analytics Grid (Row 2) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <DepartmentRiskChart />
        </div>
        <div className="lg:col-span-1">
          <AssetHealthChart />
        </div>
        <div className="lg:col-span-1">
          <AIInsightsPanel />
        </div>
      </div>

      {/* Real-time Feeds & Alerts Matrix (Row 3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <LiveThreatFeed />
        </div>
        <div className="lg:col-span-2">
          <RecentAlertsTable />
        </div>
      </div>
    </div>
  );
};
