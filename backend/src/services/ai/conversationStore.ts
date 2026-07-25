export interface StructuredDataPayload {
  executiveSummary: string;
  riskScore: number;
  riskClassification: string;
  playbookSteps: string[];
  affectedAssets: string[];
}

export interface MessageRecord {
  id: string;
  conversationId: string;
  role: 'USER' | 'ASSISTANT' | 'SYSTEM';
  content: string;
  structuredData?: StructuredDataPayload;
  createdAt: string;
}

export interface ConversationRecord {
  id: string;
  title: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  messages: MessageRecord[];
}

class MemoryConversationStore {
  private conversations: Map<string, ConversationRecord> = new Map();

  constructor() {
    // Seed an initial demo conversation
    const demoId = 'conv-demo-01';
    this.conversations.set(demoId, {
      id: demoId,
      title: 'PACS Ransomware Vector Investigation',
      userId: 'usr-analyst-01',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [
        {
          id: 'msg-1',
          conversationId: demoId,
          role: 'USER',
          content: 'Analyze recent ransomware SMB activity detected on PACS-SERVER-02 in Radiology.',
          createdAt: new Date(Date.now() - 3500000).toISOString(),
        },
        {
          id: 'msg-2',
          conversationId: demoId,
          role: 'ASSISTANT',
          content: `## Executive Summary & Threat Breakdown

Aegis Copilot has completed deep neural analysis of the SMB file encryption pattern detected on **PACS-SERVER-02 (10.45.12.89)** in the **Radiology / PACS Subnet**.

### Threat Diagnostics
- **Primary Vector:** SMBv2 Protocol File Extension Mutation
- **Affected Asset:** DICOM Imaging Archive Workstation #4
- **Risk Score:** 96/100 (CRITICAL RISK)
- **AI Confidence:** 98.4%

### MITRE ATT&CK Mapping
- **T1486 (Data Encrypted for Impact):** Accelerated file header modification targeting DICOM .dcm archives.
- **T1021.002 (Remote Services: SMB/Windows Admin Shares):** Lateral propagation attempt across internal PACS subnets.

### Recommended SOAR Mitigation Playbook
1. **Software VLAN Micro-segmentation:** Execute immediate sub-second isolation of host \`10.45.12.89\`.
2. **DICOM Vault Snapshot:** Freeze write permissions on primary PACS NAS vault to prevent encrypted payload sync.
3. **Session Revocation:** Terminate active Kerberos & NTLM tokens associated with target host handles.`,
          structuredData: {
            executiveSummary: 'SMB file encryption anomaly detected on PACS-SERVER-02 threatening DICOM imaging archives.',
            riskScore: 96,
            riskClassification: 'CRITICAL RISK',
            playbookSteps: [
              'Execute immediate sub-second VLAN isolation of 10.45.12.89.',
              'Freeze DICOM NAS write permissions.',
              'Revoke active host session handles.',
            ],
            affectedAssets: ['PACS-SERVER-02 (10.45.12.89)', 'CT-SCAN-WORKSTATION-04'],
          },
          createdAt: new Date(Date.now() - 3400000).toISOString(),
        },
      ],
    });
  }

  public async getConversationsForUser(userId: string): Promise<ConversationRecord[]> {
    const list = Array.from(this.conversations.values()).filter((c) => c.userId === userId || userId === 'default');
    return list.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  public async getConversationById(id: string): Promise<ConversationRecord | undefined> {
    return this.conversations.get(id);
  }

  public async createConversation(userId: string, title?: string): Promise<ConversationRecord> {
    const id = `conv-${Date.now()}`;
    const newConv: ConversationRecord = {
      id,
      title: title || 'New Security Investigation',
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [],
    };
    this.conversations.set(id, newConv);
    return newConv;
  }

  public async addMessage(
    conversationId: string,
    role: 'USER' | 'ASSISTANT' | 'SYSTEM',
    content: string,
    structuredData?: StructuredDataPayload
  ): Promise<MessageRecord> {
    let conv = this.conversations.get(conversationId);
    if (!conv) {
      conv = await this.createConversation('usr-analyst-01', 'Security Inquiry');
    }

    const msg: MessageRecord = {
      id: `msg-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      conversationId: conv.id,
      role,
      content,
      structuredData,
      createdAt: new Date().toISOString(),
    };

    conv.messages.push(msg);
    conv.updatedAt = new Date().toISOString();

    // Auto update title if first user message
    if (role === 'USER' && conv.messages.length <= 2) {
      conv.title = content.slice(0, 35) + (content.length > 35 ? '...' : '');
    }

    return msg;
  }

  public async renameConversation(id: string, newTitle: string): Promise<ConversationRecord | undefined> {
    const conv = this.conversations.get(id);
    if (conv) {
      conv.title = newTitle;
      conv.updatedAt = new Date().toISOString();
      return conv;
    }
    return undefined;
  }

  public async deleteConversation(id: string): Promise<boolean> {
    return this.conversations.delete(id);
  }
}

export const conversationStore = new MemoryConversationStore();
