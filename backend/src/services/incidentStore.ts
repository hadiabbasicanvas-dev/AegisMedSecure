import { adminStore } from './adminStore';
import { threatStore } from './threatStore';

export interface IncidentTimelineRecord {
  id: string;
  incidentId: string;
  title: string;
  description: string;
  actor: string;
  timestamp: string;
}

export interface IncidentNoteRecord {
  id: string;
  incidentId: string;
  authorName: string;
  content: string;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IncidentEvidenceRecord {
  id: string;
  incidentId: string;
  fileName: string;
  fileType: 'SCREENSHOT' | 'LOG_FILE' | 'PDF_DOCUMENT' | 'IMAGE' | 'NETWORK_CAPTURE';
  fileSize: string;
  fileUrl: string;
  description: string;
  uploadedBy: string;
  createdAt: string;
}

export interface IncidentActionRecord {
  id: string;
  incidentId: string;
  actionType: 'VLAN_ISOLATION' | 'MALWARE_REMOVAL' | 'PASSWORD_RESET' | 'ACCOUNT_LOCK' | 'FIREWALL_RULE' | 'DEVICE_SCAN' | 'PATCH_APPLIED';
  actionName: string;
  performedBy: string;
  resultStatus: 'SUCCESS' | 'PENDING' | 'FAILED';
  comments?: string;
  createdAt: string;
}

export interface IncidentRecord {
  id: string;
  incidentCode: string;
  title: string;
  description: string;
  category: 'RANSOMWARE_CONTAINMENT' | 'DATA_EXFILTRATION_BREACH' | 'EMR_UNAUTHORIZED_ACCESS' | 'PACS_IMAGE_ENCRYPTION' | 'IOMT_MALWARE_INFECTION' | 'NETWORK_BRUTE_FORCE' | 'PHISHING_EXPLOIT';
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  priority: 'P1_CRITICAL' | 'P2_HIGH' | 'P3_MEDIUM' | 'P4_LOW';
  status: 'NEW' | 'ASSIGNED' | 'INVESTIGATING' | 'CONTAINED' | 'ERADICATED' | 'RECOVERED' | 'CLOSED';
  sourceSystem: string;
  departmentName: string;
  affectedAsset: string;
  sourceIp: string;
  destinationIp: string;
  threatId?: string;
  assignedToId?: string;
  assignedToName?: string;
  secondaryAnalystName?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
  resolutionTimeMinutes?: number;
  timelineEvents: IncidentTimelineRecord[];
  notes: IncidentNoteRecord[];
  evidenceItems: IncidentEvidenceRecord[];
  responseActions: IncidentActionRecord[];
}

const STAGE_SEQUENCE: IncidentRecord['status'][] = ['NEW', 'ASSIGNED', 'INVESTIGATING', 'CONTAINED', 'ERADICATED', 'RECOVERED', 'CLOSED'];

class MemoryIncidentStore {
  private incidents: Map<string, IncidentRecord> = new Map();

  constructor() {
    this.seedIncidents();
  }

  private seedIncidents() {
    const statuses: Array<IncidentRecord['status']> = [
      'NEW', 'ASSIGNED', 'INVESTIGATING', 'CONTAINED', 'ERADICATED', 'RECOVERED', 'CLOSED'
    ];

    const templates = [
      {
        code: 'INC-2026-0801',
        title: 'PACS Radiology Ransomware Vector Containment',
        desc: 'SMB file extension mutation signature detected on DICOM workstation threatening Radiology imaging archives.',
        cat: 'PACS_IMAGE_ENCRYPTION' as const,
        sev: 'CRITICAL' as const,
        prio: 'P1_CRITICAL' as const,
        sys: 'PACS-SERVER-02',
        dept: 'Radiology / PACS',
        asset: 'CT-SCAN-WORKSTATION-04',
        srcIp: '10.45.12.89',
        dstIp: '10.45.12.1',
        assigned: 'Zain Ahmed (Security Analyst)',
      },
      {
        code: 'INC-2026-0802',
        title: 'EMR Primary Database Brute-Force Authentication Attempt',
        desc: 'Sustained 500+ failed SSH login attempts targeting EMR database host credentials.',
        cat: 'EMR_UNAUTHORIZED_ACCESS' as const,
        sev: 'HIGH' as const,
        prio: 'P2_HIGH' as const,
        sys: 'EMR-DB-PRIMARY',
        dept: 'EMR Core Vault',
        asset: 'EMR-DATABASE-HOST-01',
        srcIp: '10.45.3.112',
        dstIp: '10.45.3.5',
        assigned: 'Ayesha Malik (SOC Manager)',
      },
      {
        code: 'INC-2026-0803',
        title: 'ICU Ventilator Bedside Storage Device Anomaly',
        desc: 'Unregistered USB mass storage device connected directly to Adult ICU life-support telemetry workstation.',
        cat: 'IOMT_MALWARE_INFECTION' as const,
        sev: 'HIGH' as const,
        prio: 'P2_HIGH' as const,
        sys: 'ICU-GATEWAY-01',
        dept: 'Adult ICU Ward',
        asset: 'ICU-VENTILATOR-MONITOR-12',
        srcIp: '10.45.88.4',
        dstIp: '10.45.88.1',
        assigned: 'Usman Tariq (IT Administrator)',
      },
      {
        code: 'INC-2026-0804',
        title: 'Pathology Lab Data Exfiltration Stream Flagged',
        desc: 'High-volume outbound encrypted data transfer anomaly detected on Central Blood Analyzer server.',
        cat: 'DATA_EXFILTRATION_BREACH' as const,
        sev: 'CRITICAL' as const,
        prio: 'P1_CRITICAL' as const,
        sys: 'LAB-ANALYZER-01',
        dept: 'Pathology Lab',
        asset: 'BLOOD-ANALYZER-WORKSTATION',
        srcIp: '10.45.60.22',
        dstIp: '10.45.60.2',
        assigned: 'Zain Ahmed (Security Analyst)',
      },
      {
        code: 'INC-2026-0805',
        title: 'OPD Pharmacy POS Terminal Phishing Credential Harvest',
        desc: 'Phishing domain link clicked in pharmacy staff email attachment triggering credential harvest warning.',
        cat: 'PHISHING_EXPLOIT' as const,
        sev: 'MEDIUM' as const,
        prio: 'P3_MEDIUM' as const,
        sys: 'PHARM-DISPENSE-03',
        dept: 'OPD Pharmacy',
        asset: 'PHARMACY-POS-TERMINAL-02',
        srcIp: '10.45.18.90',
        dstIp: '10.45.18.1',
        assigned: 'Ayesha Malik (SOC Manager)',
      },
      {
        code: 'INC-2026-0806',
        title: 'Emergency Room Bedside Monitor Network Port Scan',
        desc: 'Rapid TCP port scan discovery attempt originating from guest Wi-Fi access point in ER Triage.',
        cat: 'NETWORK_BRUTE_FORCE' as const,
        sev: 'LOW' as const,
        prio: 'P4_LOW' as const,
        sys: 'ER-TRIAGE-SERVER',
        dept: 'Emergency Care',
        asset: 'ER-BEDSIDE-MONITOR-06',
        srcIp: '10.45.5.33',
        dstIp: '10.45.5.1',
        assigned: 'Zain Ahmed (Security Analyst)',
      },
    ];

    for (let i = 0; i < 30; i++) {
      const template = templates[i % templates.length];
      const incId = `inc-uuid-${1000 + i}`;
      const code = i < templates.length ? template.code : `INC-2026-${1000 + i + 1}`;
      const status = i === 0 ? 'INVESTIGATING' : i === 1 ? 'CONTAINED' : i === 2 ? 'ASSIGNED' : i === 3 ? 'NEW' : statuses[i % statuses.length];
      const createdAt = new Date(Date.now() - i * 3600000 * 3).toISOString();
      const closedAt = status === 'CLOSED' ? new Date(new Date(createdAt).getTime() + 7200000).toISOString() : undefined;
      const resolutionMins = status === 'CLOSED' ? 120 : undefined;
      const threatId = `threat-uuid-${1000 + (i % 5)}`;

      const inc: IncidentRecord = {
        id: incId,
        incidentCode: code,
        title: template.title,
        description: template.desc,
        category: template.cat,
        severity: template.sev,
        priority: template.prio,
        status,
        sourceSystem: template.sys,
        departmentName: template.dept,
        affectedAsset: template.asset,
        sourceIp: template.srcIp,
        destinationIp: template.dstIp,
        threatId,
        assignedToId: 'usr-analyst-01',
        assignedToName: template.assigned,
        secondaryAnalystName: 'Tariq Mahmood (Compliance Officer)',
        createdBy: 'Aegis Autonomous SOAR Engine',
        createdAt,
        updatedAt: createdAt,
        closedAt,
        resolutionTimeMinutes: resolutionMins,
        timelineEvents: [
          {
            id: `timeline-${i}-1`,
            incidentId: incId,
            title: 'Incident Record Created',
            description: `SOAR Rule #882 triggered incident escalation for ${template.title}.`,
            actor: 'Aegis Autonomous Engine',
            timestamp: createdAt,
          },
          {
            id: `timeline-${i}-2`,
            incidentId: incId,
            title: 'Primary Analyst Assigned',
            description: `Incident assigned to ${template.assigned} for SOC investigation.`,
            actor: 'SOC Manager',
            timestamp: new Date(new Date(createdAt).getTime() + 300000).toISOString(),
          },
          {
            id: `timeline-${i}-3`,
            incidentId: incId,
            title: 'Software VLAN Isolation Rule Applied',
            description: `Executed micro-segmentation rule isolating ${template.srcIp} on Gateway Router #1.`,
            actor: 'Aegis SOAR VLAN Engine',
            timestamp: new Date(new Date(createdAt).getTime() + 600000).toISOString(),
          },
        ],
        notes: [
          {
            id: `note-${i}-1`,
            incidentId: incId,
            authorName: template.assigned,
            content: 'Initial packet dump confirms ransomware file header signatures. Host VLAN 104 software-isolated. No patient care disruption observed.',
            isPinned: true,
            createdAt: new Date(new Date(createdAt).getTime() + 900000).toISOString(),
            updatedAt: new Date(new Date(createdAt).getTime() + 900000).toISOString(),
          },
        ],
        evidenceItems: [
          {
            id: `evid-${i}-1`,
            incidentId: incId,
            fileName: `pcap_capture_${template.code.toLowerCase()}.pcap`,
            fileType: 'NETWORK_CAPTURE',
            fileSize: '4.2 MB',
            fileUrl: `/evidence/pcap_${template.code.toLowerCase()}.pcap`,
            description: 'Raw Wireshark packet capture recording initial SMB payload handshake.',
            uploadedBy: template.assigned,
            createdAt: new Date(new Date(createdAt).getTime() + 450000).toISOString(),
          },
          {
            id: `evid-${i}-2`,
            incidentId: incId,
            fileName: `syslog_audit_${template.code.toLowerCase()}.log`,
            fileType: 'LOG_FILE',
            fileSize: '1.8 MB',
            fileUrl: `/evidence/syslog_${template.code.toLowerCase()}.log`,
            description: 'Host event log transcript showing process injection attempts.',
            uploadedBy: template.assigned,
            createdAt: new Date(new Date(createdAt).getTime() + 750000).toISOString(),
          },
        ],
        responseActions: [
          {
            id: `act-${i}-1`,
            incidentId: incId,
            actionType: 'VLAN_ISOLATION',
            actionName: 'Software-Defined Subnet Isolation',
            performedBy: 'Aegis SOAR Engine',
            resultStatus: 'SUCCESS',
            comments: 'Sub-450ms VLAN isolation confirmed by QIH Gateway Router.',
            createdAt: new Date(new Date(createdAt).getTime() + 600000).toISOString(),
          },
          {
            id: `act-${i}-2`,
            incidentId: incId,
            actionType: 'DEVICE_SCAN',
            actionName: 'Full Antivirus & Malware Deep Scan',
            performedBy: template.assigned,
            resultStatus: 'SUCCESS',
            comments: 'Threat quarantine verified. Zero secondary payloads found.',
            createdAt: new Date(new Date(createdAt).getTime() + 1200000).toISOString(),
          },
        ],
      };

      if (status === 'CLOSED') {
        inc.timelineEvents.push({
          id: `timeline-${i}-4`,
          incidentId: incId,
          title: 'Incident Closed Successfully',
          description: 'Incident investigation & remediation closed successfully. Total resolution time: 2.0 hours.',
          actor: 'SOC Manager',
          timestamp: closedAt!,
        });
      }

      this.incidents.set(incId, inc);
    }
  }

  public async getAll(params: {
    page?: number;
    limit?: number;
    search?: string;
    severity?: string;
    priority?: string;
    status?: string;
    category?: string;
    department?: string;
  }): Promise<{ incidents: IncidentRecord[]; total: number; page: number; limit: number; totalPages: number }> {
    let list = Array.from(this.incidents.values());

    if (params.search) {
      const q = params.search.toLowerCase();
      list = list.filter(
        (inc) =>
          inc.incidentCode.toLowerCase().includes(q) ||
          inc.title.toLowerCase().includes(q) ||
          inc.affectedAsset.toLowerCase().includes(q) ||
          inc.departmentName.toLowerCase().includes(q) ||
          inc.sourceIp?.includes(q)
      );
    }

    if (params.severity) {
      list = list.filter((inc) => inc.severity === params.severity);
    }
    if (params.priority) {
      list = list.filter((inc) => inc.priority === params.priority);
    }
    if (params.status) {
      if (params.status === 'ACTIVE') {
        list = list.filter((inc) => inc.status !== 'CLOSED');
      } else {
        list = list.filter((inc) => inc.status === params.status);
      }
    }
    if (params.category) {
      list = list.filter((inc) => inc.category === params.category);
    }
    if (params.department) {
      list = list.filter((inc) => inc.departmentName.toLowerCase().includes(params.department!.toLowerCase()));
    }

    list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const page = params.page || 1;
    const limit = params.limit || 10;
    const total = list.length;
    const totalPages = Math.ceil(total / limit);
    const paginated = list.slice((page - 1) * limit, page * limit);

    return { incidents: paginated, total, page, limit, totalPages };
  }

  public async getById(id: string): Promise<IncidentRecord | undefined> {
    return this.incidents.get(id);
  }

  private autoAdvanceStage(
    inc: IncidentRecord,
    targetStage: IncidentRecord['status'],
    actor: string,
    reasonTitle: string,
    reasonDesc: string
  ) {
    const currentIndex = STAGE_SEQUENCE.indexOf(inc.status);
    const targetIndex = STAGE_SEQUENCE.indexOf(targetStage);

    if (targetIndex > currentIndex) {
      const prevStatus = inc.status;
      inc.status = targetStage;
      inc.updatedAt = new Date().toISOString();

      let closureInfoText = '';
      if (targetStage === 'CLOSED') {
        const closedIso = new Date().toISOString();
        inc.closedAt = closedIso;
        const startMs = new Date(inc.createdAt).getTime();
        const closedMs = new Date(closedIso).getTime();
        const mins = Math.max(1, Math.round((closedMs - startMs) / 60000));
        inc.resolutionTimeMinutes = mins;
        const durationText = mins >= 60 ? `${(mins / 60).toFixed(1)} hours` : `${mins} minutes`;
        closureInfoText = `. Total resolution time: ${durationText}`;

        inc.timelineEvents.push({
          id: `timeline-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          incidentId: inc.id,
          title: 'Incident Closed Successfully',
          description: `Incident investigation & remediation closed successfully by ${actor}${closureInfoText}.`,
          actor,
          timestamp: closedIso,
        });

        adminStore.logAction(
          'INCIDENT_CLOSED',
          'INCIDENT_MANAGEMENT',
          `Incident ${inc.incidentCode} closed successfully by ${actor}${closureInfoText}`,
          'SUCCESS',
          actor
        );
      } else {
        inc.timelineEvents.push({
          id: `timeline-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          incidentId: inc.id,
          title: `Lifecycle Stage Advanced to ${targetStage}`,
          description: `${reasonTitle}: ${reasonDesc} (Transitioned from ${prevStatus} to ${targetStage}).`,
          actor,
          timestamp: new Date().toISOString(),
        });

        adminStore.logAction(
          'INCIDENT_STAGE_ADVANCED',
          'INCIDENT_MANAGEMENT',
          `Incident ${inc.incidentCode} stage advanced from ${prevStatus} to ${targetStage}`,
          'SUCCESS',
          actor
        );
      }

      // Synchronize Threat Status in threatStore
      if (inc.threatId) {
        threatStore.syncStatusFromIncident(inc.threatId, targetStage, actor);
      }
    }
  }

  public async create(data: Partial<IncidentRecord>): Promise<IncidentRecord> {
    const count = this.incidents.size + 1;
    const id = `inc-uuid-${Date.now()}`;
    const code = data.incidentCode || `INC-2026-${1000 + count}`;
    const createdAt = new Date().toISOString();

    const newInc: IncidentRecord = {
      id,
      incidentCode: code,
      title: data.title || 'Untitled Hospital Security Incident',
      description: data.description || 'Simulated operational security incident.',
      category: data.category || 'RANSOMWARE_CONTAINMENT',
      severity: data.severity || 'HIGH',
      priority: data.priority || 'P2_HIGH',
      status: 'NEW',
      sourceSystem: data.sourceSystem || 'PACS-SERVER-02',
      departmentName: data.departmentName || 'Radiology / PACS',
      affectedAsset: data.affectedAsset || 'CT-SCAN-WORKSTATION-04',
      sourceIp: data.sourceIp || '10.45.12.89',
      destinationIp: data.destinationIp || '10.45.12.1',
      assignedToId: data.assignedToId || 'usr-analyst-01',
      assignedToName: data.assignedToName || 'Zain Ahmed (Security Analyst)',
      createdBy: data.createdBy || 'Operator Manual Action',
      createdAt,
      updatedAt: createdAt,
      timelineEvents: [
        {
          id: `timeline-${Date.now()}`,
          incidentId: id,
          title: 'Incident Record Created',
          description: `Manual incident record ${code} initialized by operator. Initial stage set to NEW.`,
          actor: data.createdBy || 'Operator',
          timestamp: createdAt,
        },
      ],
      notes: [],
      evidenceItems: [],
      responseActions: [],
    };

    if (newInc.assignedToName) {
      this.autoAdvanceStage(
        newInc,
        'ASSIGNED',
        data.createdBy || 'System',
        'Analyst Pre-Assigned',
        `Assigned primary analyst ${newInc.assignedToName}`
      );
    }

    this.incidents.set(id, newInc);
    adminStore.logAction('INCIDENT_CREATED', 'INCIDENT_MANAGEMENT', `Incident ${code} created`, 'SUCCESS', data.createdBy || 'Operator');

    return newInc;
  }

  public async updateStatus(id: string, status: IncidentRecord['status'], actor: string): Promise<IncidentRecord | undefined> {
    const inc = this.incidents.get(id);
    if (!inc) return undefined;

    if (inc.status === status) {
      return inc;
    }

    const currentIndex = STAGE_SEQUENCE.indexOf(inc.status);
    const newIndex = STAGE_SEQUENCE.indexOf(status);

    if (newIndex < currentIndex) {
      throw new Error(`Backward stage transitions are not permitted. Incident ${inc.incidentCode} is currently at stage ${inc.status}.`);
    }

    this.autoAdvanceStage(inc, status, actor, 'Lifecycle Action', `Transitioned to ${status}`);
    return inc;
  }

  public async assignAnalyst(
    id: string,
    analystId: string,
    analystName: string,
    secondaryName: string | undefined,
    actor: string
  ): Promise<IncidentRecord | undefined> {
    const inc = this.incidents.get(id);
    if (inc) {
      inc.assignedToId = analystId;
      inc.assignedToName = analystName;
      if (secondaryName) inc.secondaryAnalystName = secondaryName;

      this.autoAdvanceStage(inc, 'ASSIGNED', actor, 'Analyst Assignment', `Assigned primary analyst ${analystName}`);

      inc.updatedAt = new Date().toISOString();
      return inc;
    }
    return undefined;
  }

  public async addNote(id: string, authorName: string, content: string, isPinned: boolean = false): Promise<IncidentNoteRecord | undefined> {
    const inc = this.incidents.get(id);
    if (inc) {
      const note: IncidentNoteRecord = {
        id: `note-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        incidentId: id,
        authorName,
        content,
        isPinned,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      inc.notes.unshift(note);

      this.autoAdvanceStage(inc, 'INVESTIGATING', authorName, 'Investigation Note Added', `Analyst ${authorName} recorded investigation findings`);

      inc.updatedAt = new Date().toISOString();
      return note;
    }
    return undefined;
  }

  public async addEvidence(
    id: string,
    fileName: string,
    fileType: IncidentEvidenceRecord['fileType'],
    fileSize: string,
    description: string,
    uploadedBy: string
  ): Promise<IncidentEvidenceRecord | undefined> {
    const inc = this.incidents.get(id);
    if (inc) {
      const evidence: IncidentEvidenceRecord = {
        id: `evid-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        incidentId: id,
        fileName,
        fileType,
        fileSize,
        fileUrl: `/evidence/${fileName}`,
        description,
        uploadedBy,
        createdAt: new Date().toISOString(),
      };
      inc.evidenceItems.unshift(evidence);

      this.autoAdvanceStage(inc, 'INVESTIGATING', uploadedBy, 'Forensic Evidence Added', `Uploaded evidence file: ${fileName}`);

      inc.updatedAt = new Date().toISOString();
      return evidence;
    }
    return undefined;
  }

  public async addAction(
    id: string,
    actionType: IncidentActionRecord['actionType'],
    actionName: string,
    performedBy: string,
    comments?: string
  ): Promise<IncidentActionRecord | undefined> {
    const inc = this.incidents.get(id);
    if (inc) {
      const action: IncidentActionRecord = {
        id: `act-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        incidentId: id,
        actionType,
        actionName,
        performedBy,
        resultStatus: 'SUCCESS',
        comments,
        createdAt: new Date().toISOString(),
      };
      inc.responseActions.unshift(action);
      inc.updatedAt = new Date().toISOString();

      inc.timelineEvents.push({
        id: `timeline-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        incidentId: id,
        title: `SOAR Action Executed: ${actionName}`,
        description: comments || `Action ${actionType} executed by ${performedBy}.`,
        actor: performedBy,
        timestamp: new Date().toISOString(),
      });

      if (['VLAN_ISOLATION', 'FIREWALL_RULE', 'ACCOUNT_LOCK'].includes(actionType)) {
        this.autoAdvanceStage(inc, 'CONTAINED', performedBy, 'Containment Action Executed', `SOAR Action ${actionName} applied`);
      } else if (['MALWARE_REMOVAL', 'PASSWORD_RESET', 'PATCH_APPLIED'].includes(actionType)) {
        this.autoAdvanceStage(inc, 'ERADICATED', performedBy, 'Eradication Action Executed', `SOAR Action ${actionName} applied`);
      } else if (actionType === 'DEVICE_SCAN') {
        this.autoAdvanceStage(inc, 'RECOVERED', performedBy, 'Recovery Scan Executed', `SOAR Action ${actionName} verified host integrity`);
      }

      adminStore.logAction('SOAR_ACTION_EXECUTED', 'INCIDENT_MANAGEMENT', `Executed SOAR Action ${actionName} on incident ${inc.incidentCode}`, 'SUCCESS', performedBy);

      return action;
    }
    return undefined;
  }

  public async exportCsv(): Promise<string> {
    const list = Array.from(this.incidents.values());
    const header = 'Incident Code,Title,Category,Severity,Priority,Status,Department,Affected Asset,Source IP,Assigned Analyst,Created At\n';
    const rows = list
      .map(
        (inc) =>
          `"${inc.incidentCode}","${inc.title}","${inc.category}","${inc.severity}","${inc.priority}","${inc.status}","${inc.departmentName}","${inc.affectedAsset}","${inc.sourceIp}","${inc.assignedToName}","${inc.createdAt}"`
      )
      .join('\n');
    return header + rows;
  }
}

export const incidentStore = new MemoryIncidentStore();
