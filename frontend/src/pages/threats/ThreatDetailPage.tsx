import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useThreatDetail, useUpdateThreatStatus, useEscalateThreat, useCreateIncidentFromThreat } from '@/services/threatService';
import { PageContainer } from '@/components/common/PageContainer';
import { ThreatSeverityBadge } from '@/components/threats/ThreatSeverityBadge';
import { ThreatStatusBadge } from '@/components/threats/ThreatStatusBadge';
import { ThreatTimeline } from '@/components/threats/ThreatTimeline';
import { ThreatAIInsightCard } from '@/components/threats/ThreatAIInsightCard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/toast';
import { ArrowLeft, ShieldAlert, CheckCircle2, AlertOctagon, ArrowUpRight, Server, Network } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export const ThreatDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { showSuccess, showError } = useToast();

  const { data: threat, isLoading, error } = useThreatDetail(id || '');
  const updateStatus = useUpdateThreatStatus();
  const escalateThreat = useEscalateThreat();
  const createIncident = useCreateIncidentFromThreat();

  const handleConvertToIncident = () => {
    if (!threat) return;
    createIncident.mutate(threat.id, {
      onSuccess: (res: any) => {
        const incData = res?.data || res;
        const code = incData?.incidentCode || 'INC-2026-001';
        const incId = incData?.id || incData?.incidentId || 'inc-uuid-1000';
        showSuccess('Incident Created', `Incident ${code} created successfully.`);
        navigate(`/dashboard/incidents/${incId}`);
      },
      onError: (err: any) => {
        showError('Conversion Failed', err.response?.data?.message || 'Failed to convert threat into incident.');
      },
    });
  };

  if (isLoading) {
    return (
      <div className="py-20 text-center space-y-3">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent mx-auto" />
        <p className="text-xs font-mono text-slate-400">Fetching Threat Payload & Forensic Logs...</p>
      </div>
    );
  }

  if (error || !threat) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <ShieldAlert className="h-16 w-16 text-red-400 mx-auto" />
        <h2 className="text-xl font-bold text-slate-50">Threat Record Not Found</h2>
        <p className="text-xs text-slate-400">The requested threat ID does not exist or has been cleared from active cache.</p>
        <Link to="/dashboard/threats">
          <Button variant="cyan-accent" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Return to Threat List
          </Button>
        </Link>
      </div>
    );
  }

  const canUpdateStatus = user?.role === 'SUPER_ADMINISTRATOR' || user?.role === 'SOC_MANAGER' || user?.role === 'SECURITY_ANALYST';

  return (
    <PageContainer
      title={`${threat.threatCode}: ${threat.name}`}
      description={`Forensic threat investigation canvas • ${threat.departmentName}`}
      actions={
        <div className="flex flex-wrap items-center gap-2">
          <Link to="/dashboard/threats">
            <Button variant="outline" size="sm" className="text-xs">
              <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Back to Feed
            </Button>
          </Link>

          {canUpdateStatus && threat.status !== 'CONTAINED' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                updateStatus.mutate(
                  { id: threat.id, status: 'CONTAINED' },
                  { onSuccess: () => showSuccess('Threat Contained', `Threat ${threat.threatCode} marked as CONTAINED.`) }
                );
              }}
              className="text-xs border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
            >
              <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" /> Mark Contained
            </Button>
          )}

          {canUpdateStatus && threat.severity !== 'CRITICAL' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                escalateThreat.mutate(
                  { id: threat.id, severity: 'CRITICAL' },
                  { onSuccess: () => showSuccess('Severity Escalated', `Threat ${threat.threatCode} escalated to CRITICAL.`) }
                );
              }}
              className="text-xs border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
            >
              <ArrowUpRight className="mr-1.5 h-3.5 w-3.5" /> Escalate Severity
            </Button>
          )}

          {canUpdateStatus && (
            <Button
              variant="cyan-accent"
              size="sm"
              isLoading={createIncident.isPending}
              onClick={handleConvertToIncident}
              className="text-xs font-semibold"
            >
              <AlertOctagon className="mr-1.5 h-3.5 w-3.5" /> Convert to Incident
            </Button>
          )}
        </div>
      }
    >
      {/* Header Info Badges */}
      <div className="flex flex-wrap items-center gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
        <Badge variant="info" className="font-mono text-[10px]">
          SIMULATED DEMO TELEMETRY
        </Badge>
        <ThreatSeverityBadge severity={threat.severity} />
        <ThreatStatusBadge status={threat.status} />
        <span className="text-xs font-mono text-slate-400">Category: <strong className="text-slate-200">{threat.category}</strong></span>
        <span className="text-xs font-mono text-slate-400">Source: <strong className="text-cyan-400">{threat.sourceSystem}</strong></span>
      </div>

      {/* Main Investigation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 cols): Payload Details & Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Technical Details Panel */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Network className="h-5 w-5 text-cyan-400" />
                <CardTitle>Technical Telemetry Payload</CardTitle>
              </div>
              <CardDescription>Network socket parameters & host vector details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <p className="text-slate-300 leading-relaxed bg-navy-950 p-4 rounded-xl border border-slate-800 font-mono text-xs">
                {threat.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono">SOURCE IP</span>
                  <p className="font-mono font-bold text-cyan-400">{threat.sourceIp || '10.45.12.89'}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono">DESTINATION IP</span>
                  <p className="font-mono font-bold text-slate-200">{threat.destinationIp || '10.45.0.1'}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono">SUBNET WARD</span>
                  <p className="font-mono font-bold text-slate-200">{threat.departmentName}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono">INGRESS PROTOCOL</span>
                  <p className="font-mono font-bold text-emerald-400">SMB / TCP 445</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Timeline */}
          <Card className="p-6">
            <ThreatTimeline events={threat.timelineEvents || []} />
          </Card>
        </div>

        {/* Right Column (1 col): AI Insights & Asset Profile */}
        <div className="space-y-6">
          {/* AI Neural Insight Card */}
          <ThreatAIInsightCard
            threatCode={threat.threatCode}
            aiRiskScore={threat.aiRiskScore}
            aiConfidence={threat.aiConfidence}
            aiSummary={threat.aiSummary}
          />

          {/* Affected Asset Card */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Server className="h-5 w-5 text-cyan-400" />
                <CardTitle>Affected Asset Profile</CardTitle>
              </div>
              <CardDescription>Target endpoint hardware metadata</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-400">HOSTNAME / ASSET ID</span>
                <p className="font-mono font-bold text-slate-100">{threat.affectedAsset}</p>
              </div>

              <div className="space-y-2 pt-1 text-slate-300">
                <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                  <span className="text-slate-400">Department:</span>
                  <span className="font-semibold text-slate-200">{threat.departmentName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                  <span className="text-slate-400">Assigned Analyst:</span>
                  <span className="font-semibold text-cyan-400">{threat.assignedToName || 'Unassigned'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Operating System:</span>
                  <span className="font-mono text-slate-200">Windows Server 2022</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};
