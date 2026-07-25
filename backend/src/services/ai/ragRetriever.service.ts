import { threatStore, ThreatRecord } from '../threatStore';

export interface RAGContextResult {
  contextPrompt: string;
  matchedThreats: ThreatRecord[];
}

export class RAGRetrieverService {
  public static async retrieveContext(userQuery: string, threatId?: string): Promise<RAGContextResult> {
    let matchedThreats: ThreatRecord[] = [];

    // If specific threat ID requested
    if (threatId) {
      const threat = await threatStore.getById(threatId);
      if (threat) {
        matchedThreats.push(threat);
      }
    }

    // Keyword search in threat store if query has keywords
    const keywords = ['ransomware', 'sql', 'pacs', 'emr', 'icu', 'brute', 'phishing', 'usb', 'exfiltration', 'critical'];
    const lowerQuery = userQuery.toLowerCase();

    for (const kw of keywords) {
      if (lowerQuery.includes(kw) && matchedThreats.length < 5) {
        const results = await threatStore.getAll({ search: kw, limit: 3 });
        for (const t of results.threats) {
          if (!matchedThreats.some((existing) => existing.id === t.id)) {
            matchedThreats.push(t);
          }
        }
      }
    }

    // If still empty, fetch top 3 critical threats
    if (matchedThreats.length === 0) {
      const topCritical = await threatStore.getAll({ limit: 3 });
      matchedThreats = topCritical.threats;
    }

    const contextPrompt = `
=== RETRIEVED QIH TELEMETRY CONTEXT (SIMULATED DEMO DATA) ===
Active Hospital Subnets Monitored: 12 Subnets (PACS, EMR, ICU, Pathology Lab, OPD Pharmacy, ER, OT)
Hospital Infrastructure Scope: Quaid-e-Azam Int. Hospital (400 Beds)

MATCHED RECENT THREAT RECORDS:
${JSON.stringify(
  matchedThreats.map((t) => ({
    threatCode: t.threatCode,
    name: t.name,
    category: t.category,
    severity: t.severity,
    status: t.status,
    department: t.departmentName,
    affectedAsset: t.affectedAsset,
    sourceIp: t.sourceIp,
    aiRiskScore: t.aiRiskScore,
    aiConfidence: t.aiConfidence,
    aiSummary: t.aiSummary,
  })),
  null,
  2
)}
=============================================================
`.trim();

    return { contextPrompt, matchedThreats };
  }
}
