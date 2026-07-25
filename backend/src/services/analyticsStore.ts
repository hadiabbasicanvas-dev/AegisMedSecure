export interface AnalyticsSummary {
  securityScore: number;
  totalThreats: number;
  criticalThreats: number;
  activeAlerts: number;
  openIncidents: number;
  mttrLatencyMs: number;
  protectedAssetsCount: number;
  aiPrecisionScore: number;
  departmentRiskIndex: number;
}

export interface TimeSeriesTrendPoint {
  timestamp: string;
  attacks: number;
  mitigations: number;
  critical: number;
  high: number;
  medium: number;
}

export interface WardRiskPoint {
  department: string;
  riskScore: number;
  activeThreats: number;
  protectedAssets: number;
  status: 'OPTIMAL' | 'ELEVATED' | 'HIGH' | 'CRITICAL';
}

export interface AssetDistributionPoint {
  category: string;
  count: number;
  onlineCount: number;
  healthScore: number;
}

export interface ResolutionTrendPoint {
  date: string;
  mttrMinutes: number;
  targetMinutes: number;
}

class MemoryAnalyticsStore {
  public async getDashboardSummary(range: string = '24h'): Promise<AnalyticsSummary> {
    const is24h = range === '24h';
    return {
      securityScore: is24h ? 94 : 91,
      totalThreats: is24h ? 42 : 284,
      criticalThreats: is24h ? 3 : 18,
      activeAlerts: is24h ? 12 : 64,
      openIncidents: is24h ? 2 : 7,
      mttrLatencyMs: 420,
      protectedAssetsCount: 1248,
      aiPrecisionScore: 98.2,
      departmentRiskIndex: 74,
    };
  }

  public async getTimeSeriesTrends(range: string = '24h'): Promise<TimeSeriesTrendPoint[]> {
    if (range === '24h') {
      return [
        { timestamp: '00:00', attacks: 12, mitigations: 12, critical: 1, high: 3, medium: 8 },
        { timestamp: '04:00', attacks: 8, mitigations: 8, critical: 0, high: 2, medium: 6 },
        { timestamp: '08:00', attacks: 45, mitigations: 43, critical: 3, high: 12, medium: 30 },
        { timestamp: '12:00', attacks: 68, mitigations: 66, critical: 4, high: 18, medium: 46 },
        { timestamp: '16:00', attacks: 52, mitigations: 51, critical: 2, high: 14, medium: 36 },
        { timestamp: '20:00', attacks: 28, mitigations: 28, critical: 1, high: 6, medium: 21 },
      ];
    } else {
      return [
        { timestamp: 'Mon', attacks: 140, mitigations: 138, critical: 8, high: 35, medium: 97 },
        { timestamp: 'Tue', attacks: 195, mitigations: 192, critical: 12, high: 48, medium: 135 },
        { timestamp: 'Wed', attacks: 210, mitigations: 208, critical: 14, high: 52, medium: 144 },
        { timestamp: 'Thu', attacks: 180, mitigations: 178, critical: 9, high: 42, medium: 129 },
        { timestamp: 'Fri', attacks: 240, mitigations: 236, critical: 16, high: 60, medium: 164 },
        { timestamp: 'Sat', attacks: 110, mitigations: 110, critical: 4, high: 22, medium: 84 },
        { timestamp: 'Sun', attacks: 95, mitigations: 95, critical: 3, high: 18, medium: 74 },
      ];
    }
  }

  public async getDepartmentRiskMatrix(): Promise<WardRiskPoint[]> {
    return [
      { department: 'Radiology / PACS', riskScore: 92, activeThreats: 8, protectedAssets: 214, status: 'CRITICAL' },
      { department: 'Adult ICU', riskScore: 85, activeThreats: 5, protectedAssets: 342, status: 'HIGH' },
      { department: 'Emergency Care', riskScore: 78, activeThreats: 4, protectedAssets: 188, status: 'ELEVATED' },
      { department: 'EMR Core Vault', riskScore: 65, activeThreats: 2, protectedAssets: 98, status: 'ELEVATED' },
      { department: 'Pathology Lab', riskScore: 45, activeThreats: 1, protectedAssets: 156, status: 'OPTIMAL' },
      { department: 'OPD Pharmacy', riskScore: 38, activeThreats: 0, protectedAssets: 250, status: 'OPTIMAL' },
    ];
  }

  public async getAssetDistributions(): Promise<AssetDistributionPoint[]> {
    return [
      { category: 'IoMT Medical Devices (Ventilators, Infusion)', count: 842, onlineCount: 840, healthScore: 99.7 },
      { category: 'PACS DICOM Imaging Workstations', count: 214, onlineCount: 212, healthScore: 99.0 },
      { category: 'EMR Primary Database Servers', count: 98, onlineCount: 98, healthScore: 100.0 },
      { category: 'Quarantined Hosts (VLAN Isolated)', count: 14, onlineCount: 14, healthScore: 100.0 },
    ];
  }

  public async getResolutionTrends(): Promise<ResolutionTrendPoint[]> {
    return [
      { date: 'Week 1', mttrMinutes: 14.2, targetMinutes: 5.0 },
      { date: 'Week 2', mttrMinutes: 9.8, targetMinutes: 5.0 },
      { date: 'Week 3', mttrMinutes: 4.5, targetMinutes: 5.0 },
      { date: 'Week 4', mttrMinutes: 0.45, targetMinutes: 5.0 },
    ];
  }
}

export const analyticsStore = new MemoryAnalyticsStore();
