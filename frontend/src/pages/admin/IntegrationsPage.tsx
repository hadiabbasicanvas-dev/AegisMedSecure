import React from 'react';
import { PageContainer } from '@/components/common/PageContainer';
import { IntegrationCard } from '@/components/admin/IntegrationCard';
import { Badge } from '@/components/ui/badge';
import { Network, Database, Shield, Lock } from 'lucide-react';

export const IntegrationsPage: React.FC = () => {
  const integrations = [
    { name: 'Active Directory / LDAP IAM Sync', category: 'Identity & Access', description: 'Synchronize QIH medical staff credentials & group memberships with Microsoft AD.', status: 'CONNECTED' as const, icon: Lock },
    { name: 'Splunk / IBM QRadar SIEM Forwarder', category: 'SIEM Log Export', description: 'Stream syslog & security events directly to central enterprise SIEM analytics.', status: 'CONNECTED' as const, icon: Database },
    { name: 'CrowdStrike Falcon EDR Connector', category: 'Endpoint Protection', description: 'Deep process telemetry ingestion from workstations & radiology hosts.', status: 'CONNECTED' as const, icon: Shield },
    { name: 'Palo Alto PAN-OS Firewall Driver', category: 'SOAR Micro-segmentation', description: 'Automated VLAN isolation rule execution on QIH core gateway router.', status: 'CONNECTED' as const, icon: Network },
  ];

  return (
    <PageContainer
      title="ENTERPRISE SYSTEM CONNECTORS & INTEGRATIONS"
      description="Configure Active Directory LDAP, SIEM log forwarding, EDR agents & gateway drivers"
      actions={
        <Badge variant="info" className="text-[9px]">
          SIMULATED INTEGRATION CONNECTORS
        </Badge>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono">
        {integrations.map((item, idx) => (
          <IntegrationCard key={idx} {...item} />
        ))}
      </div>
    </PageContainer>
  );
};
