export interface ThreatTimelineRecord {
  id: string;
  threatId: string;
  title: string;
  description: string;
  actor: string;
  timestamp: string;
}

export interface ThreatRecord {
  id: string;
  threatCode: string;
  name: string;
  description: string;
  category: 'MALWARE' | 'RANSOMWARE' | 'SQL_INJECTION' | 'BRUTE_FORCE' | 'DDOS' | 'PHISHING' | 'INSIDER_THREAT' | 'UNAUTHORIZED_ACCESS' | 'PORT_SCANNING' | 'DATA_EXFILTRATION' | 'SUSPICIOUS_USB';
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFORMATIONAL';
  status: 'OPEN' | 'INVESTIGATING' | 'CONTAINED' | 'RESOLVED' | 'CLOSED';
  sourceSystem: string;
  departmentName: string;
  affectedAsset: string;
  sourceIp: string;
  destinationIp: string;
  aiConfidence: number;
  aiRiskScore: number;
  aiSummary: string;
  assignedToId?: string;
  assignedToName?: string;
  createdAt: string;
  updatedAt: string;
  timelineEvents: ThreatTimelineRecord[];
}

class MemoryThreatStore {
  private threats: Map<string, ThreatRecord> = new Map();

  constructor() {
    this.seedThreats();
  }

  private seedThreats() {
    const categories: Array<ThreatRecord['category']> = [
      'RANSOMWARE', 'SQL_INJECTION', 'BRUTE_FORCE', 'MALWARE', 'PHISHING',
      'INSIDER_THREAT', 'DATA_EXFILTRATION', 'SUSPICIOUS_USB', 'PORT_SCANNING', 'UNAUTHORIZED_ACCESS'
    ];
    const severities: Array<ThreatRecord['severity']> = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'INFORMATIONAL'];
    const statuses: Array<ThreatRecord['status']> = ['OPEN', 'INVESTIGATING', 'CONTAINED', 'RESOLVED', 'CLOSED'];

    const hospitalAssets = [
      { dept: 'Radiology / PACS', system: 'PACS-SERVER-02', asset: 'CT-SCAN-WORKSTATION-04', srcIp: '10.45.12.89', dstIp: '10.45.12.1' },
      { dept: 'EMR Core Vault', system: 'EMR-DB-PRIMARY', asset: 'EMR-DATABASE-HOST-01', srcIp: '10.45.3.112', dstIp: '10.45.3.5' },
      { dept: 'Adult ICU', system: 'ICU-GATEWAY-01', asset: 'ICU-VENTILATOR-MONITOR-12', srcIp: '10.45.88.4', dstIp: '10.45.88.1' },
      { dept: 'Pathology Lab', system: 'LAB-ANALYZER-01', asset: 'BLOOD-ANALYZER-WORKSTATION', srcIp: '10.45.60.22', dstIp: '10.45.60.2' },
      { dept: 'OPD Pharmacy', system: 'PHARM-DISPENSE-03', asset: 'PHARMACY-POS-TERMINAL-02', srcIp: '10.45.18.90', dstIp: '10.45.18.1' },
      { dept: 'Emergency Care', system: 'ER-TRIAGE-SERVER', asset: 'ER-BEDSIDE-MONITOR-06', srcIp: '10.45.5.33', dstIp: '10.45.5.1' },
      { dept: 'Operating Theatre', system: 'OT-SURGICAL-GATEWAY', asset: 'SURGICAL-ROBOTIC-CONSOLE-01', srcIp: '10.45.75.14', dstIp: '10.45.75.1' },
    ];

    const threatTemplates = [
      { name: 'Unusual SMB Encryption Traffic Behavior', desc: 'Ransomware SMB file extension mutation pattern detected targeting DICOM archives.', cat: 'RANSOMWARE' as const, sev: 'CRITICAL' as const, score: 96, conf: 98.4 },
      { name: 'Repeated SQL Injection Signatures on Web Gateway', desc: 'Automated SQL payload injection attempting error-based schema extraction.', cat: 'SQL_INJECTION' as const, sev: 'HIGH' as const, score: 82, conf: 94.1 },
      { name: 'Brute-Force SSH Authentication Surge', desc: 'Over 500 failed SSH login attempts detected within 30 seconds from suspicious IP.', cat: 'BRUTE_FORCE' as const, sev: 'HIGH' as const, score: 78, conf: 91.5 },
      { name: 'Unregistered USB Mass Storage Device Attached', desc: 'Direct USB storage connection detected on critical ICU monitoring station.', cat: 'SUSPICIOUS_USB' as const, sev: 'MEDIUM' as const, score: 64, conf: 89.0 },
      { name: 'Large Outbound Encrypted Data Transfer Anomaly', desc: 'Continuous 4GB egress data stream to unverified external IP address.', cat: 'DATA_EXFILTRATION' as const, sev: 'CRITICAL' as const, score: 94, conf: 96.8 },
      { name: 'Phishing Credential Harvester Link Interaction', desc: 'Host clicked known malicious domain link embedded in internal email attachment.', cat: 'PHISHING' as const, sev: 'MEDIUM' as const, score: 58, conf: 86.2 },
      { name: 'Subnet Port Reconnaissance & Network Mapping', desc: 'Rapid TCP port scan attempting service discovery on internal PACS VLAN.', cat: 'PORT_SCANNING' as const, sev: 'LOW' as const, score: 42, conf: 88.7 },
      { name: 'Unauthorized Privilege Escalation Attempt', desc: 'Local user process attempting kernel exploit injection via system driver.', cat: 'UNAUTHORIZED_ACCESS' as const, sev: 'CRITICAL' as const, score: 91, conf: 95.3 },
    ];

    let count = 1;
    for (let i = 0; i < 40; i++) {
      const template = threatTemplates[i % threatTemplates.length];
      const target = hospitalAssets[i % hospitalAssets.length];
      const threatId = `threat-uuid-${1000 + i}`;
      const code = `THREAT-2026-${1000 + count}`;
      count++;

      const createdAt = new Date(Date.now() - (i * 3600000 * 1.5)).toISOString();
      const status = i === 0 ? 'OPEN' : i === 1 ? 'INVESTIGATING' : i === 2 ? 'CONTAINED' : i % 5 === 0 ? 'RESOLVED' : statuses[i % statuses.length];

      const threat: ThreatRecord = {
        id: threatId,
        threatCode: code,
        name: template.name,
        description: template.desc,
        category: template.cat,
        severity: i === 0 ? 'CRITICAL' : template.sev,
        status,
        sourceSystem: target.system,
        departmentName: target.dept,
        affectedAsset: target.asset,
        sourceIp: target.srcIp,
        destinationIp: target.dstIp,
        aiConfidence: template.conf,
        aiRiskScore: template.score,
        aiSummary: `OpenAI GPT-4o analysis indicates ${template.desc} Target asset ${target.asset} requires immediate isolation.`,
        assignedToId: i % 2 === 0 ? 'usr-analyst-01' : 'usr-soc-mgr-01',
        assignedToName: i % 2 === 0 ? 'Zain Ahmed' : 'Ayesha Malik',
        createdAt,
        updatedAt: createdAt,
        timelineEvents: [
          {
            id: `evt-${i}-1`,
            threatId,
            title: 'Threat Detected by Aegis Sentinel',
            description: `High-frequency syslog log stream matched anomaly signature for ${template.name}.`,
            actor: 'Aegis Telemetry Engine',
            timestamp: createdAt,
          },
          {
            id: `evt-${i}-2`,
            threatId,
            title: 'AI Neural Risk Evaluation Complete',
            description: `OpenAI GPT-4o assigned risk score of ${template.score}/100 with ${template.conf}% confidence.`,
            actor: 'OpenAI GPT-4o Agent',
            timestamp: new Date(new Date(createdAt).getTime() + 120000).toISOString(),
          },
        ],
      };

      this.threats.set(threatId, threat);
    }
  }

  public async getAll(params: {
    page?: number;
    limit?: number;
    search?: string;
    severity?: string;
    status?: string;
    category?: string;
    department?: string;
  }): Promise<{ threats: ThreatRecord[]; total: number; page: number; limit: number; totalPages: number }> {
    let list = Array.from(this.threats.values());

    if (params.search) {
      const q = params.search.toLowerCase();
      list = list.filter(
        (t) =>
          t.threatCode.toLowerCase().includes(q) ||
          t.name.toLowerCase().includes(q) ||
          t.affectedAsset.toLowerCase().includes(q) ||
          t.departmentName.toLowerCase().includes(q) ||
          t.sourceIp.includes(q)
      );
    }

    if (params.severity) {
      list = list.filter((t) => t.severity === params.severity);
    }
    if (params.status) {
      if (params.status === 'ACTIVE') {
        list = list.filter((t) => t.status !== 'RESOLVED' && t.status !== 'CLOSED');
      } else if (params.status === 'HISTORY' || params.status === 'RESOLVED') {
        list = list.filter((t) => t.status === 'RESOLVED' || t.status === 'CLOSED');
      } else {
        list = list.filter((t) => t.status === params.status);
      }
    }
    if (params.category) {
      list = list.filter((t) => t.category === params.category);
    }
    if (params.department) {
      list = list.filter((t) => t.departmentName.toLowerCase().includes(params.department!.toLowerCase()));
    }

    list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const page = params.page || 1;
    const limit = params.limit || 10;
    const total = list.length;
    const totalPages = Math.ceil(total / limit);
    const paginated = list.slice((page - 1) * limit, page * limit);

    return { threats: paginated, total, page, limit, totalPages };
  }

  public async getById(id: string): Promise<ThreatRecord | undefined> {
    return this.threats.get(id);
  }

  public async updateStatus(id: string, status: ThreatRecord['status'], actor: string): Promise<ThreatRecord | undefined> {
    const threat = this.threats.get(id);
    if (threat) {
      threat.status = status;
      threat.updatedAt = new Date().toISOString();
      threat.timelineEvents.push({
        id: `evt-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        threatId: id,
        title: `Status Updated to ${status}`,
        description: `Threat status transitioned to ${status} by ${actor}.`,
        actor,
        timestamp: new Date().toISOString(),
      });
      return threat;
    }
    return undefined;
  }

  public async syncStatusFromIncident(threatIdOrCode: string, incidentStage: string, actor: string) {
    let threat = this.threats.get(threatIdOrCode);
    if (!threat) {
      for (const t of this.threats.values()) {
        if (t.threatCode === threatIdOrCode || t.id === threatIdOrCode) {
          threat = t;
          break;
        }
      }
    }

    if (threat) {
      let mappedStatus: ThreatRecord['status'] = 'OPEN';
      if (incidentStage === 'NEW') mappedStatus = 'OPEN';
      else if (incidentStage === 'ASSIGNED' || incidentStage === 'INVESTIGATING') mappedStatus = 'INVESTIGATING';
      else if (incidentStage === 'CONTAINED') mappedStatus = 'CONTAINED';
      else if (incidentStage === 'ERADICATED' || incidentStage === 'RECOVERED' || incidentStage === 'CLOSED') mappedStatus = 'RESOLVED';

      if (threat.status !== mappedStatus) {
        const prevStatus = threat.status;
        threat.status = mappedStatus;
        threat.updatedAt = new Date().toISOString();
        threat.timelineEvents.push({
          id: `evt-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          threatId: threat.id,
          title: `Threat Status Synchronized to ${mappedStatus}`,
          description: `Linked Incident stage changed to ${incidentStage}. Threat status updated from ${prevStatus} to ${mappedStatus}.`,
          actor: actor || 'Aegis Sync Engine',
          timestamp: new Date().toISOString(),
        });
      }
    }
  }

  public async assignAnalyst(id: string, analystId: string, analystName: string, actor: string): Promise<ThreatRecord | undefined> {
    const threat = this.threats.get(id);
    if (threat) {
      threat.assignedToId = analystId;
      threat.assignedToName = analystName;
      threat.updatedAt = new Date().toISOString();
      threat.timelineEvents.push({
        id: `evt-${Date.now()}`,
        threatId: id,
        title: `Assigned to ${analystName}`,
        description: `Threat assigned to operator ${analystName}.`,
        actor,
        timestamp: new Date().toISOString(),
      });
      return threat;
    }
    return undefined;
  }

  public async escalateSeverity(id: string, newSeverity: ThreatRecord['severity'], actor: string): Promise<ThreatRecord | undefined> {
    const threat = this.threats.get(id);
    if (threat) {
      const oldSev = threat.severity;
      threat.severity = newSeverity;
      threat.updatedAt = new Date().toISOString();
      threat.timelineEvents.push({
        id: `evt-${Date.now()}`,
        threatId: id,
        title: `Severity Escalated to ${newSeverity}`,
        description: `Threat risk level elevated from ${oldSev} to ${newSeverity}.`,
        actor,
        timestamp: new Date().toISOString(),
      });
      return threat;
    }
    return undefined;
  }

  public async exportCsv(): Promise<string> {
    const list = Array.from(this.threats.values());
    const header = 'Threat Code,Name,Category,Severity,Status,Department,Affected Asset,Source IP,AI Risk Score,AI Confidence %,Created At\n';
    const rows = list
      .map(
        (t) =>
          `"${t.threatCode}","${t.name}","${t.category}","${t.severity}","${t.status}","${t.departmentName}","${t.affectedAsset}","${t.sourceIp}",${t.aiRiskScore},${t.aiConfidence},"${t.createdAt}"`
      )
      .join('\n');
    return header + rows;
  }
}

export const threatStore = new MemoryThreatStore();
