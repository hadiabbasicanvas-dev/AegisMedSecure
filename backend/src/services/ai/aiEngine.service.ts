import { SYSTEM_PROMPT } from './prompts';
import { RAGRetrieverService } from './ragRetriever.service';
import { conversationStore, StructuredDataPayload } from './conversationStore';

export class AIEngineService {
  public static async processChat(
    userId: string,
    userQuery: string,
    conversationId?: string,
    threatId?: string
  ) {
    // 1. Ensure conversation exists
    let convId = conversationId;
    if (!convId) {
      const newConv = await conversationStore.createConversation(userId, userQuery.slice(0, 30));
      convId = newConv.id;
    }

    // 2. Add user message
    await conversationStore.addMessage(convId, 'USER', userQuery);

    // 3. RAG Retrieval
    const { contextPrompt, matchedThreats } = await RAGRetrieverService.retrieveContext(userQuery, threatId);

    let assistantResponseText = '';
    let structuredData: StructuredDataPayload | undefined;

    const apiKey = process.env.OPENAI_API_KEY;

    // 4. Call OpenAI API if key exists, otherwise fallback to local intelligent RAG engine
    if (apiKey) {
      try {
        const history = await conversationStore.getConversationById(convId);
        const messagesPayload: Array<{ role: string; content: string }> = [
          { role: 'system', content: `${SYSTEM_PROMPT}\n\n${contextPrompt}` },
        ];

        if (history) {
          for (const m of history.messages.slice(-6)) {
            messagesPayload.push({
              role: m.role === 'USER' ? 'user' : 'assistant',
              content: m.content,
            });
          }
        }

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o',
            messages: messagesPayload,
            temperature: 0.3,
            max_tokens: 1000,
          }),
        });

        if (response.ok) {
          const data: any = await response.json();
          assistantResponseText = data.choices?.[0]?.message?.content || 'Analysis complete.';
        } else {
          assistantResponseText = this.generateFallbackResponse(userQuery, matchedThreats);
        }
      } catch (err: any) {
        assistantResponseText = this.generateFallbackResponse(userQuery, matchedThreats);
      }
    } else {
      assistantResponseText = this.generateFallbackResponse(userQuery, matchedThreats);
    }

    // Extract or build structured card data
    const topThreat = matchedThreats[0];
    structuredData = {
      executiveSummary: topThreat
        ? `Analysis of ${topThreat.name} targeting ${topThreat.affectedAsset} in ${topThreat.departmentName}.`
        : `Neural analysis completed for QIH hospital subnets in response to prompt: "${userQuery.slice(0, 45)}"`,
      riskScore: topThreat ? topThreat.aiRiskScore : 88,
      riskClassification: topThreat ? `${topThreat.severity} RISK` : 'HIGH RISK',
      playbookSteps: [
        'Isolate target asset software VLAN.',
        'Verify EMR database backup integrity.',
        'Rotate operator session tokens on affected host handles.',
      ],
      affectedAssets: topThreat ? [topThreat.affectedAsset, topThreat.sourceSystem] : ['PACS-SERVER-02', 'EMR-DB-PRIMARY'],
    };

    // 5. Store assistant message
    const savedMsg = await conversationStore.addMessage(convId, 'ASSISTANT', assistantResponseText, structuredData);

    return {
      conversationId: convId,
      message: savedMsg,
    };
  }

  private static generateFallbackResponse(userQuery: string, matchedThreats: any[]): string {
    const top = matchedThreats[0];
    const qLower = userQuery.toLowerCase();

    if (qLower.includes('ransomware') || qLower.includes('pacs') || (top && top.category === 'RANSOMWARE')) {
      return `## Executive Threat Assessment & RAG Diagnostics

Aegis Copilot has evaluated the telemetry query against Quaid-e-Azam Int. Hospital (QIH) subnets.

### Threat Signature Analysis
- **Target Subnet:** Radiology / PACS Diagnostic Vault
- **Primary Asset:** ${top ? top.affectedAsset : 'PACS-SERVER-02 (10.45.12.89)'}
- **Vector:** SMBv2 Protocol Payload Encryption Signature
- **Simulated AI Risk Score:** ${top ? top.aiRiskScore : 96}/100 (CRITICAL RISK)
- **AI Confidence Score:** ${top ? top.aiConfidence : 98.4}%

### MITRE ATT&CK Framework Mapping
- **T1486 (Data Encrypted for Impact):** Rapid file extension mutation targeting DICOM image vaults.
- **T1021.002 (Remote Services - SMB):** Lateral propagation attempt across local subnet.

### Recommended SOAR Response Playbook
1. **Software VLAN Micro-segmentation:** Execute immediate sub-second isolation rule on host \`10.45.12.89\`.
2. **DICOM Vault Write-Lock:** Freeze PACS NAS secondary sync targets.
3. **Session Token Revocation:** Invalidate active NTLM & Kerberos session handles.`;
    }

    if (qLower.includes('sql') || qLower.includes('emr') || (top && top.category === 'SQL_INJECTION')) {
      return `## EMR Database SQL Injection Vulnerability Analysis

Aegis Copilot has analyzed web application telemetry for **EMR-DB-PRIMARY**.

### Key Findings
- **Target System:** EMR Clinical Database Gateway (10.45.3.112)
- **Exploit Technique:** Error-based SQL schema enumeration attempt
- **AI Risk Score:** 82/100 (HIGH RISK)

### Recommended Playbook
1. Enforce Parameterized SQL Queries across Web API Controllers.
2. Enable Web Application Firewall (WAF) SQLi Inspection Rule #942100.
3. Isolate database connections from non-authenticated OPD subnets.`;
    }

    return `## Aegis Copilot Analysis Summary

Aegis Copilot processed your request: **"${userQuery}"** using QIH RAG context.

### QIH Infrastructure Telemetry Overview
- **Monitored Scope:** 400 Inpatient Beds, 12 Active Subnets (PACS, EMR, ICU, Labs, Pharmacy)
- **Active Critical Incidents:** 3 Threats Flagged
- **System Telemetry Ingestion Velocity:** 10,400 events/sec

### Recommended Defensive Steps
1. Review high-severity alerts in the **Threat Monitoring** module.
2. Execute automated micro-segmentation playbooks for flagged ransomware vectors.
3. Export HIPAA audit logs for SOC Compliance documentation.`;
  }
}
