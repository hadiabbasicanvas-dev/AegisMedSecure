import React, { useState } from 'react';
import {
  useDashboardAnalytics,
  useThreatAnalytics,
  useDepartmentAnalytics,
  useAssetAnalytics,
  useAIAnalytics,
} from '@/services/analyticsService';
import { PageContainer } from '@/components/common/PageContainer';
import { AnalyticsFilterBar } from '@/components/analytics/AnalyticsFilterBar';
import { AnalyticsKPICard } from '@/components/analytics/AnalyticsKPICard';
import { ThreatTrendAreaChart } from '@/components/charts/ThreatTrendAreaChart';
import { SeverityRadarChart } from '@/components/charts/SeverityRadarChart';
import { AssetDistributionPie } from '@/components/charts/AssetDistributionPie';
import { ResolutionTimeLine } from '@/components/charts/ResolutionTimeLine';
import { DepartmentRiskGrid } from '@/components/analytics/DepartmentRiskGrid';
import { AIAnalyticsPanel } from '@/components/analytics/AIAnalyticsPanel';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Activity, AlertOctagon, Clock, HardDrive, Cpu, CheckCircle2, Building2 } from 'lucide-react';
import { apiClient } from '@/services/apiClient';

export const AnalyticsPage: React.FC = () => {
  const [range, setRange] = useState('24h');
  const [department, setDepartment] = useState('');
  const [severity, setSeverity] = useState('');

  const { data: summary } = useDashboardAnalytics(range);
  const { data: threatTrends = [] } = useThreatAnalytics(range);
  const { data: departments = [] } = useDepartmentAnalytics();
  const { data: assets = [] } = useAssetAnalytics();
  const { data: aiResolutions = [] } = useAIAnalytics();

  const handleReset = () => {
    setRange('24h');
    setDepartment('');
    setSeverity('');
  };

  const handleExportCSV = async () => {
    try {
      const response = await apiClient.get('/threats/export', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `aegis_analytics_export_${range}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (e) {
      alert('Failed to export analytics CSV.');
    }
  };

  return (
    <PageContainer
      title="SECURITY OPERATIONS ANALYTICS & TELEMETRY"
      description="Multi-dimensional threat intelligence, ward exposure matrices & MTTR performance benchmarks"
      actions={
        <Badge variant="info" className="text-[9px]">
          SIMULATED DEMO TELEMETRY
        </Badge>
      }
    >
      {/* Global Filter Bar */}
      <AnalyticsFilterBar
        range={range}
        onRangeChange={setRange}
        department={department}
        onDepartmentChange={setDepartment}
        severity={severity}
        onSeverityChange={setSeverity}
        onReset={handleReset}
        onExport={handleExportCSV}
      />

      {/* KPI Banner Matrix (8 Metrics) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnalyticsKPICard
          title="Hospital Security Health"
          value={`${summary?.securityScore || 94} / 100`}
          subtext="Calculated across 12 QIH subnets"
          trend="+2.4% vs last week"
          isPositive={true}
          badgeText="OPTIMAL"
          badgeVariant="success"
          icon={ShieldCheck}
        />

        <AnalyticsKPICard
          title="Ingested Threat Vectors"
          value={summary?.totalThreats || 42}
          subtext={`Recorded in ${range} window`}
          trend="-12% attack velocity"
          isPositive={true}
          badgeText="MONITORED"
          badgeVariant="info"
          icon={Activity}
        />

        <AnalyticsKPICard
          title="Active Security Alerts"
          value={summary?.activeAlerts || 12}
          subtext="Flagged for analyst review"
          trend="+3 today"
          isPositive={false}
          badgeText="ATTENTION"
          badgeVariant="warning"
          icon={AlertOctagon}
        />

        <AnalyticsKPICard
          title="Mean Time to Respond (MTTR)"
          value={`${summary?.mttrLatencyMs || 420} ms`}
          subtext="Sub-second SOAR quarantine"
          trend="-85% response time"
          isPositive={true}
          badgeText="SUB-SECOND"
          badgeVariant="success"
          icon={Clock}
        />

        <AnalyticsKPICard
          title="Protected IoMT Assets"
          value={`${summary?.protectedAssetsCount || 1248} Nodes`}
          subtext="Ventilators, MRI, CT & Workstations"
          trend="99.8% Online"
          isPositive={true}
          badgeText="ACTIVE"
          badgeVariant="success"
          icon={HardDrive}
        />

        <AnalyticsKPICard
          title="AI Neural Precision"
          value={`${summary?.aiPrecisionScore || 98.2}%`}
          subtext="GPT-4o fine-tuned evaluation"
          trend="+0.5% benchmark"
          isPositive={true}
          badgeText="HIGH CONFIDENCE"
          badgeVariant="info"
          icon={Cpu}
        />

        <AnalyticsKPICard
          title="Resolved Incidents"
          value="18 Incidents"
          subtext="100% micro-segmentation success"
          trend="0 uncontained"
          isPositive={true}
          badgeText="RESOLVED"
          badgeVariant="success"
          icon={CheckCircle2}
        />

        <AnalyticsKPICard
          title="Department Risk Index"
          value={`${summary?.departmentRiskIndex || 74} / 100`}
          subtext="PACS Imaging highest exposure"
          trend="PACS Subnet Flagged"
          isPositive={false}
          badgeText="ELEVATED"
          badgeVariant="warning"
          icon={Building2}
        />
      </div>

      {/* Primary Analytics Grid Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ThreatTrendAreaChart data={threatTrends} />
        </div>
        <div className="lg:col-span-1">
          <SeverityRadarChart departments={departments} />
        </div>
      </div>

      {/* Primary Analytics Grid Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <AssetDistributionPie assets={assets} />
        </div>
        <div className="lg:col-span-1">
          <ResolutionTimeLine data={aiResolutions} />
        </div>
        <div className="lg:col-span-1">
          <AIAnalyticsPanel />
        </div>
      </div>

      {/* Hospital Department Risk Ranking Grid */}
      <DepartmentRiskGrid departments={departments} />
    </PageContainer>
  );
};
