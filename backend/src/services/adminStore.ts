export interface UserAdminRecord {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  department: string;
  role: 'SUPER_ADMINISTRATOR' | 'SOC_MANAGER' | 'SECURITY_ANALYST' | 'IT_ADMINISTRATOR' | 'COMPLIANCE_OFFICER';
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AssetRecord {
  id: string;
  assetCode: string;
  name: string;
  type: 'SERVER' | 'WORKSTATION' | 'MEDICAL_DEVICE' | 'FIREWALL' | 'ROUTER' | 'SWITCH' | 'IMAGING_EQUIPMENT' | 'NETWORK_APPLIANCE';
  departmentName: string;
  ipAddress: string;
  macAddress: string;
  os: string;
  owner: string;
  riskLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  isMonitored: boolean;
  lastScanAt: string;
  createdAt: string;
}

export interface AuditLogRecord {
  id: string;
  action: string;
  module: string;
  details: string;
  ipAddress: string;
  result: 'SUCCESS' | 'FAILURE';
  userName: string;
  createdAt: string;
}

export interface SystemHealthStatus {
  status: 'OPTIMAL' | 'DEGRADED' | 'CRITICAL';
  uptimeSeconds: number;
  cpuUsagePercent: number;
  memoryUsagePercent: number;
  databaseLatencyMs: number;
  activeSocketsCount: number;
  storageUsedGb: number;
  storageTotalGb: number;
}

class MemoryAdminStore {
  private users: Map<string, UserAdminRecord> = new Map();
  private assets: Map<string, AssetRecord> = new Map();
  private auditLogs: AuditLogRecord[] = [];
  private settings: Map<string, { value: string; category: string }> = new Map();

  constructor() {
    this.seedUsers();
    this.seedAssets();
    this.seedAuditLogs();
    this.seedSettings();
  }

  private seedUsers() {
    const demoUsers: UserAdminRecord[] = [
      {
        id: 'usr-superadmin-01',
        email: 'superadmin@qih.hospital',
        firstName: 'Executive',
        lastName: 'Admin',
        department: 'Governance & SOC Leadership',
        role: 'SUPER_ADMINISTRATOR',
        isActive: true,
        isEmailVerified: true,
        createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'usr-soc-mgr-01',
        email: 'socmanager@qih.hospital',
        firstName: 'Ayesha',
        lastName: 'Malik',
        department: 'Security Operations Center',
        role: 'SOC_MANAGER',
        isActive: true,
        isEmailVerified: true,
        createdAt: new Date(Date.now() - 86400000 * 25).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'usr-analyst-01',
        email: 'analyst@qih.hospital',
        firstName: 'Zain',
        lastName: 'Ahmed',
        department: 'Threat Monitoring Unit',
        role: 'SECURITY_ANALYST',
        isActive: true,
        isEmailVerified: true,
        createdAt: new Date(Date.now() - 86400000 * 20).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'usr-itadmin-01',
        email: 'itadmin@qih.hospital',
        firstName: 'Usman',
        lastName: 'Tariq',
        department: 'Hospital IT & Network Infrastructure',
        role: 'IT_ADMINISTRATOR',
        isActive: true,
        isEmailVerified: true,
        createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'usr-compliance-01',
        email: 'compliance@qih.hospital',
        firstName: 'Tariq',
        lastName: 'Mahmood',
        department: 'HIPAA & Regulatory Audit',
        role: 'COMPLIANCE_OFFICER',
        isActive: true,
        isEmailVerified: true,
        createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    demoUsers.forEach((u) => this.users.set(u.id, u));
  }

  private seedAssets() {
    const demoAssets: AssetRecord[] = [
      {
        id: 'ast-101',
        assetCode: 'AST-QIH-0042',
        name: 'PACS Diagnostic Imaging Vault #2',
        type: 'SERVER',
        departmentName: 'Radiology / PACS',
        ipAddress: '10.45.12.89',
        macAddress: '00:1A:2B:3C:4D:5E',
        os: 'Windows Server 2022 Datacenter',
        owner: 'Dr. Hamza Siddiqui (Radiology Head)',
        riskLevel: 'CRITICAL',
        isMonitored: true,
        lastScanAt: new Date().toISOString(),
        createdAt: new Date(Date.now() - 86400000 * 40).toISOString(),
      },
      {
        id: 'ast-102',
        assetCode: 'AST-QIH-0043',
        name: 'EMR Primary Database Cluster Host #1',
        type: 'SERVER',
        departmentName: 'EMR Core Vault',
        ipAddress: '10.45.3.112',
        macAddress: '00:1A:2B:3C:4D:5F',
        os: 'Ubuntu 22.04 LTS Enterprise',
        owner: 'IT Database Admin Team',
        riskLevel: 'HIGH',
        isMonitored: true,
        lastScanAt: new Date().toISOString(),
        createdAt: new Date(Date.now() - 86400000 * 35).toISOString(),
      },
      {
        id: 'ast-103',
        assetCode: 'AST-QIH-0044',
        name: 'Adult ICU Bedside Ventilator Monitor Unit #12',
        type: 'MEDICAL_DEVICE',
        departmentName: 'Adult ICU Ward',
        ipAddress: '10.45.88.4',
        macAddress: '00:1A:2B:3C:4D:60',
        os: 'Embedded Linux RTOS',
        owner: 'ICU Clinical Engineering',
        riskLevel: 'HIGH',
        isMonitored: true,
        lastScanAt: new Date().toISOString(),
        createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
      },
      {
        id: 'ast-104',
        assetCode: 'AST-QIH-0045',
        name: 'Central Pathology Analyzer Workstation',
        type: 'WORKSTATION',
        departmentName: 'Pathology Lab',
        ipAddress: '10.45.60.22',
        macAddress: '00:1A:2B:3C:4D:61',
        os: 'Windows 11 Enterprise LTSC',
        owner: 'Pathology Lab Manager',
        riskLevel: 'MEDIUM',
        isMonitored: true,
        lastScanAt: new Date().toISOString(),
        createdAt: new Date(Date.now() - 86400000 * 25).toISOString(),
      },
      {
        id: 'ast-105',
        assetCode: 'AST-QIH-0046',
        name: 'QIH Core Gateway Firewall Appliance',
        type: 'FIREWALL',
        departmentName: 'Network Gateway',
        ipAddress: '10.45.0.1',
        macAddress: '00:1A:2B:3C:4D:62',
        os: 'Palo Alto PAN-OS 11.0',
        owner: 'Network Infrastructure Team',
        riskLevel: 'LOW',
        isMonitored: true,
        lastScanAt: new Date().toISOString(),
        createdAt: new Date(Date.now() - 86400000 * 50).toISOString(),
      },
    ];

    demoAssets.forEach((a) => this.assets.set(a.id, a));
  }

  private seedAuditLogs() {
    this.auditLogs = [
      {
        id: 'audit-01',
        action: 'SOAR_VLAN_ISOLATION',
        module: 'INCIDENT_MANAGEMENT',
        details: 'Software micro-segmentation executed on host 10.45.12.89 (PACS-SERVER-02)',
        ipAddress: '10.45.0.254',
        result: 'SUCCESS',
        userName: 'Aegis Autonomous Engine',
        createdAt: new Date(Date.now() - 1200000).toISOString(),
      },
      {
        id: 'audit-02',
        action: 'USER_LOGIN',
        module: 'AUTHENTICATION',
        details: 'Operator Zain Ahmed signed in via standard JWT identity check',
        ipAddress: '192.168.1.45',
        result: 'SUCCESS',
        userName: 'Zain Ahmed',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: 'audit-03',
        action: 'REPORT_GENERATED',
        module: 'REPORTS',
        details: 'Executive Security Summary PDF generated and downloaded',
        ipAddress: '192.168.1.45',
        result: 'SUCCESS',
        userName: 'Ayesha Malik',
        createdAt: new Date(Date.now() - 7200000).toISOString(),
      },
      {
        id: 'audit-04',
        action: 'SYSTEM_SETTING_UPDATED',
        module: 'ADMINISTRATION',
        details: 'AI Neural Model parameter updated to GPT-4o Enterprise RAG',
        ipAddress: '192.168.1.10',
        result: 'SUCCESS',
        userName: 'Executive Admin',
        createdAt: new Date(Date.now() - 14400000).toISOString(),
      },
    ];
  }

  private seedSettings() {
    this.settings.set('org_name', { value: 'Quaid-e-Azam International Hospital', category: 'ORGANIZATION' });
    this.settings.set('org_location', { value: 'Near Golra Morr, Islamabad, Pakistan', category: 'ORGANIZATION' });
    this.settings.set('password_min_length', { value: '12', category: 'SECURITY' });
    this.settings.set('max_login_attempts', { value: '5', category: 'SECURITY' });
    this.settings.set('session_timeout_minutes', { value: '30', category: 'SECURITY' });
    this.settings.set('mfa_required', { value: 'true', category: 'SECURITY' });
    this.settings.set('ai_model_name', { value: 'gpt-4o', category: 'AI_CONFIG' });
    this.settings.set('ai_temperature', { value: '0.3', category: 'AI_CONFIG' });
    this.settings.set('ai_max_tokens', { value: '1000', category: 'AI_CONFIG' });
  }

  // User CRUD
  public async getUsers(search?: string, role?: string): Promise<UserAdminRecord[]> {
    let list = Array.from(this.users.values());
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((u) => u.firstName.toLowerCase().includes(q) || u.lastName.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
    }
    if (role) {
      list = list.filter((u) => u.role === role);
    }
    return list;
  }

  public async createUser(data: Partial<UserAdminRecord>): Promise<UserAdminRecord> {
    const id = `usr-gen-${Date.now()}`;
    const newUser: UserAdminRecord = {
      id,
      email: data.email || `operator_${Date.now()}@qih.hospital`,
      firstName: data.firstName || 'New',
      lastName: data.lastName || 'Operator',
      department: data.department || 'SOC Operations',
      role: data.role || 'SECURITY_ANALYST',
      isActive: true,
      isEmailVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.users.set(id, newUser);
    this.logAction('USER_CREATED', 'ADMINISTRATION', `Created user account for ${newUser.email}`, 'SUCCESS', 'Super Admin');
    return newUser;
  }

  public async updateUser(id: string, data: Partial<UserAdminRecord>): Promise<UserAdminRecord | undefined> {
    const user = this.users.get(id);
    if (user) {
      Object.assign(user, data, { updatedAt: new Date().toISOString() });
      this.logAction('USER_UPDATED', 'ADMINISTRATION', `Updated profile/role for user ${user.email}`, 'SUCCESS', 'Super Admin');
      return user;
    }
    return undefined;
  }

  // Asset CRUD
  public async getAssets(search?: string, type?: string, risk?: string): Promise<AssetRecord[]> {
    let list = Array.from(this.assets.values());
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((a) => a.name.toLowerCase().includes(q) || a.assetCode.toLowerCase().includes(q) || a.ipAddress.includes(q));
    }
    if (type) {
      list = list.filter((a) => a.type === type);
    }
    if (risk) {
      list = list.filter((a) => a.riskLevel === risk);
    }
    return list;
  }

  public async createAsset(data: Partial<AssetRecord>): Promise<AssetRecord> {
    const id = `ast-${Date.now()}`;
    const code = data.assetCode || `AST-QIH-${Math.floor(1000 + Math.random() * 9000)}`;
    const newAsset: AssetRecord = {
      id,
      assetCode: code,
      name: data.name || 'New Hospital Endpoint',
      type: data.type || 'WORKSTATION',
      departmentName: data.departmentName || 'Radiology / PACS',
      ipAddress: data.ipAddress || '10.45.12.100',
      macAddress: data.macAddress || '00:1A:2B:3C:4D:99',
      os: data.os || 'Windows 11 Pro',
      owner: data.owner || 'Department IT Custodian',
      riskLevel: data.riskLevel || 'LOW',
      isMonitored: true,
      lastScanAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    this.assets.set(id, newAsset);
    this.logAction('ASSET_REGISTERED', 'ADMINISTRATION', `Registered hospital asset ${code} (${newAsset.name})`, 'SUCCESS', 'IT Administrator');
    return newAsset;
  }

  // Audit Logs
  public async getAuditLogs(search?: string): Promise<AuditLogRecord[]> {
    let list = [...this.auditLogs];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((l) => l.action.toLowerCase().includes(q) || l.details.toLowerCase().includes(q) || l.userName.toLowerCase().includes(q));
    }
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public logAction(action: string, module: string, details: string, result: 'SUCCESS' | 'FAILURE', userName: string) {
    this.auditLogs.unshift({
      id: `audit-${Date.now()}`,
      action,
      module,
      details,
      ipAddress: '10.45.0.254',
      result,
      userName,
      createdAt: new Date().toISOString(),
    });
  }

  // Settings
  public async getSettings(): Promise<Record<string, { value: string; category: string }>> {
    const res: Record<string, { value: string; category: string }> = {};
    this.settings.forEach((v, k) => {
      res[k] = v;
    });
    return res;
  }

  public async updateSettings(updates: Record<string, string>): Promise<Record<string, { value: string; category: string }>> {
    Object.entries(updates).forEach(([k, v]) => {
      const existing = this.settings.get(k);
      this.settings.set(k, { value: v, category: existing ? existing.category : 'SECURITY' });
    });
    this.logAction('SETTINGS_UPDATED', 'ADMINISTRATION', 'Updated global security & AI configuration parameters', 'SUCCESS', 'Super Admin');
    return this.getSettings();
  }

  // System Health
  public async getSystemHealth(): Promise<SystemHealthStatus> {
    return {
      status: 'OPTIMAL',
      uptimeSeconds: 1248000,
      cpuUsagePercent: 14.2,
      memoryUsagePercent: 32.8,
      databaseLatencyMs: 4,
      activeSocketsCount: 142,
      storageUsedGb: 148,
      storageTotalGb: 1024,
    };
  }
}

export const adminStore = new MemoryAdminStore();
