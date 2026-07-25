import React from 'react';
import { DashboardPlaceholder } from './DashboardPlaceholder';
import { Activity, AlertTriangle, AlertOctagon, Cpu, BarChart3, FileText, Server, Building2, Users, FileCode, Settings } from 'lucide-react';

export const ThreatMonitoringPage: React.FC = () => (
  <DashboardPlaceholder
    title="Real-Time Threat Monitoring"
    description="High-frequency telemetry stream inspector & packet analyzer"
    modulePhase="Phase 5"
    icon={Activity}
  />
);

export const AlertsPage: React.FC = () => (
  <DashboardPlaceholder
    title="Threat Alerts Matrix"
    description="Interactive alert triage, rule filtering, and alert correlation"
    modulePhase="Phase 6"
    icon={AlertTriangle}
  />
);

export const IncidentsPage: React.FC = () => (
  <DashboardPlaceholder
    title="SOAR Incident Containment"
    description="Autonomous VLAN micro-segmentation & quarantine management"
    modulePhase="Phase 7"
    icon={AlertOctagon}
  />
);

export const AIAssistantPage: React.FC = () => (
  <DashboardPlaceholder
    title="AI Security Copilot"
    description="OpenAI GPT-4o conversational threat analysis drawer"
    modulePhase="Phase 8"
    icon={Cpu}
  />
);

export const AnalyticsPage: React.FC = () => (
  <DashboardPlaceholder
    title="Security Analytics & Trends"
    description="Historical attack vector charting & MTTR performance metrics"
    modulePhase="Phase 9"
    icon={BarChart3}
  />
);

export const ReportsPage: React.FC = () => (
  <DashboardPlaceholder
    title="HIPAA Audit Reports Exporter"
    description="Automated forensic PDF & Markdown compliance report compiler"
    modulePhase="Phase 10"
    icon={FileText}
  />
);

export const AssetsPage: React.FC = () => (
  <DashboardPlaceholder
    title="Hospital Asset Inventory"
    description="IoMT, PACS imaging workstations, and EMR server inventory"
    modulePhase="Phase 5+"
    icon={Server}
  />
);

export const DepartmentsPage: React.FC = () => (
  <DashboardPlaceholder
    title="Hospital Wards & Subnets"
    description="Ward exposure profiling for ICU, Emergency, PACS & Labs"
    modulePhase="Phase 5+"
    icon={Building2}
  />
);

export const UsersPage: React.FC = () => (
  <DashboardPlaceholder
    title="User Identity & RBAC Controls"
    description="Operator provisioning and granular role assignments"
    modulePhase="Phase 2 IAM"
    icon={Users}
  />
);

export const AuditLogsPage: React.FC = () => (
  <DashboardPlaceholder
    title="System Audit Trail"
    description="Immutable security operation event logs"
    modulePhase="Phase 5+"
    icon={FileCode}
  />
);

export const SettingsPage: React.FC = () => (
  <DashboardPlaceholder
    title="Global SOC Configuration"
    description="SOAR automation mode toggles and threshold parameters"
    modulePhase="Phase 5+"
    icon={Settings}
  />
);
