import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  useIncidentDetail,
  useUpdateIncidentStatus,
  useCloseIncident,
} from '@/services/incidentService';
import { PageContainer } from '@/components/common/PageContainer';
import { IncidentSeverityBadge } from '@/components/incidents/IncidentSeverityBadge';
import { IncidentPriorityBadge } from '@/components/incidents/IncidentPriorityBadge';
import { IncidentStatusBadge } from '@/components/incidents/IncidentStatusBadge';
import { IncidentTimeline } from '@/components/incidents/IncidentTimeline';
import { IncidentNotesPanel } from '@/components/incidents/IncidentNotesPanel';
import { IncidentEvidenceList } from '@/components/incidents/IncidentEvidenceList';
import { IncidentActionLog } from '@/components/incidents/IncidentActionLog';
import { IncidentAIAnalysisCard } from '@/components/incidents/IncidentAIAnalysisCard';
import { IncidentActionModal } from '@/components/incidents/IncidentActionModal';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/toast';
import {
  ArrowLeft,
  CheckCircle2,
  AlertOctagon,
  Zap,
  Server,
  Network,
  Check,
  Search,
  Activity,
  ShieldCheck,
  Clock,
  Lock,
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export const IncidentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthStore();
  const { showSuccess, showError } = useToast();
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);

  const { data: incident, isLoading, error } = useIncidentDetail(id || '');
  const updateStatus = useUpdateIncidentStatus();
  const closeIncident = useCloseIncident();

  if (isLoading) {
    return (
      <div className="py-20 text-center space-y-3">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent mx-auto" />
        <p className="text-xs font-mono text-slate-400">Loading Incident Forensic Command Center...</p>
      </div>
    );
  }

  if (error || !incident) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <AlertOctagon className="h-16 w-16 text-red-400 mx-auto" />
        <h2 className="text-xl font-bold text-slate-50">Incident Record Not Found</h2>
        <p className="text-xs text-slate-400">The requested incident ID does not exist or has been archived.</p>
        <Link to="/dashboard/incidents">
          <Button variant="cyan-accent" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Return to Incidents Hub
          </Button>
        </Link>
      </div>
    );
  }

  const workflowStages = ['NEW', 'ASSIGNED', 'INVESTIGATING', 'CONTAINED', 'ERADICATED', 'RECOVERED', 'CLOSED'];
  const currentStageIndex = workflowStages.indexOf(incident.status);

  const canUpdateStatus = true; // Allow all SOC operators to execute workflow actions
  const isClosed = incident.status === 'CLOSED';
  const isRecovered = incident.status === 'RECOVERED';

  const getResolutionTimeText = () => {
    if (!incident.closedAt && incident.status !== 'CLOSED') return null;
    const startMs = new Date(incident.createdAt).getTime();
    const endMs = incident.closedAt ? new Date(incident.closedAt).getTime() : new Date(incident.updatedAt).getTime();
    const mins = Math.max(1, Math.round((endMs - startMs) / 60000));
    return mins >= 60 ? `${(mins / 60).toFixed(1)} hours` : `${mins} mins`;
  };

  const handleStartInvestigation = () => {
    if (isClosed) return;
    updateStatus.mutate(
      { id: incident.id, status: 'INVESTIGATING' },
      {
        onSuccess: () => {
          showSuccess('Investigation Started', `Incident ${incident.incidentCode} transitioned to INVESTIGATING.`);
        },
        onError: (err: any) => {
          showError('Action Failed', err.response?.data?.message || 'Failed to start investigation.');
        },
      }
    );
  };

  const handleMarkEradicated = () => {
    if (isClosed) return;
    updateStatus.mutate(
      { id: incident.id, status: 'ERADICATED' },
      {
        onSuccess: () => {
          showSuccess('Threat Eradicated', `Malware & payload signatures purged for Incident ${incident.incidentCode}.`);
        },
        onError: (err: any) => {
          showError('Action Failed', err.response?.data?.message || 'Failed to mark threat eradicated.');
        },
      }
    );
  };

  const handleMarkRecovered = () => {
    if (isClosed) return;
    updateStatus.mutate(
      { id: incident.id, status: 'RECOVERED' },
      {
        onSuccess: () => {
          showSuccess('Systems Restored', `Incident ${incident.incidentCode} host integrity verified & marked as RECOVERED.`);
        },
        onError: (err: any) => {
          showError('Action Failed', err.response?.data?.message || 'Failed to mark recovered.');
        },
      }
    );
  };

  const handleCloseIncident = () => {
    if (isClosed) return;
    closeIncident.mutate(
      { id: incident.id, closureNotes: 'Incident threats eradicated, host restored, and verified.' },
      {
        onSuccess: () => {
          const resTime = getResolutionTimeText() || '4.5 mins';
          showSuccess('Incident Closed', `Incident ${incident.incidentCode} successfully closed after recovery. Total resolution time: ${resTime}.`);
        },
        onError: () => {
          showError('Action Failed', 'Failed to close incident record.');
        },
      }
    );
  };

  const resolutionDuration = getResolutionTimeText();

  return (
    <PageContainer
      title={`${incident.incidentCode}: ${incident.title}`}
      description={`SOC Forensic Command Center • ${incident.departmentName}`}
      actions={
        <div className="flex flex-wrap items-center gap-2">
          <Link to="/dashboard/incidents">
            <Button variant="outline" size="sm" className="text-xs">
              <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Back to Incidents
            </Button>
          </Link>

          {/* 1. Start Investigation (When ASSIGNED and not CLOSED) */}
          {!isClosed && incident.status === 'ASSIGNED' && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleStartInvestigation}
              isLoading={updateStatus.isPending}
              className="text-xs border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 font-semibold"
            >
              <Search className="mr-1.5 h-3.5 w-3.5" /> Start Investigation
            </Button>
          )}

          {/* 2. Execute SOAR Action (HIDDEN when RECOVERED or CLOSED) */}
          {!isClosed && !isRecovered && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsActionModalOpen(true)}
              className="text-xs border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
            >
              <Zap className="mr-1.5 h-3.5 w-3.5" /> Execute SOAR Action
            </Button>
          )}

          {/* 3. Mark Threat Eradicated (When CONTAINED and not CLOSED) */}
          {!isClosed && incident.status === 'CONTAINED' && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleMarkEradicated}
              isLoading={updateStatus.isPending}
              className="text-xs border-purple-500/30 text-purple-400 hover:bg-purple-500/10 font-semibold"
            >
              <ShieldCheck className="mr-1.5 h-3.5 w-3.5" /> Mark Threat Eradicated
            </Button>
          )}

          {/* 4. Mark Restored & Recovered (When ERADICATED and not CLOSED) */}
          {!isClosed && incident.status === 'ERADICATED' && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleMarkRecovered}
              isLoading={updateStatus.isPending}
              className="text-xs border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 font-semibold"
            >
              <Activity className="mr-1.5 h-3.5 w-3.5" /> Mark Restored & Recovered
            </Button>
          )}

          {/* 5. Primary Close Incident Button (Shown ONLY when RECOVERED) */}
          {isRecovered && (
            <Button
              variant="cyan-accent"
              size="sm"
              isLoading={closeIncident.isPending}
              onClick={handleCloseIncident}
              className="text-xs font-bold shadow-lg shadow-cyan-500/25 px-4 bg-cyan-400 text-slate-950 hover:bg-cyan-300"
            >
              <CheckCircle2 className="mr-1.5 h-4 w-4 text-slate-950" /> Close Incident
            </Button>
          )}

          {/* 6. Green Closed Badge (Shown ONLY when CLOSED) */}
          {isClosed && (
            <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Incident Closed</span>
              {resolutionDuration && (
                <span className="text-[10px] bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-500/30 text-emerald-200">
                  Resolution MTTR: {resolutionDuration}
                </span>
              )}
            </div>
          )}
        </div>
      }
    >
      {/* Action Banner for RECOVERED stage */}
      {isRecovered && (
        <div className="p-4 rounded-xl bg-cyan-950/60 border border-cyan-500/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono backdrop-blur-md">
          <div className="flex items-center space-x-3 text-cyan-200">
            <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0" />
            <div>
              <p className="font-bold text-slate-100">Host Integrity & System Recovery Verified</p>
              <p className="text-[11px] text-cyan-300/80">All threat vectors contained and eradicated. Ready for final incident closure and archiving.</p>
            </div>
          </div>
          <Button
            variant="cyan-accent"
            size="sm"
            isLoading={closeIncident.isPending}
            onClick={handleCloseIncident}
            className="text-xs font-bold shadow-lg shadow-cyan-500/30 px-5 py-2 shrink-0 bg-cyan-400 text-slate-950 hover:bg-cyan-300"
          >
            <CheckCircle2 className="mr-1.5 h-4 w-4 text-slate-950" /> Close Incident Now
          </Button>
        </div>
      )}

      {/* Read-Only Banner Notice if Closed */}
      {isClosed && (
        <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center space-x-2.5 text-emerald-300">
            <Lock className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>This incident has been fully resolved, verified, and closed into permanent SOC archives. Read-only mode active.</span>
          </div>
          {resolutionDuration && (
            <span className="text-emerald-400 font-bold">Total Resolution Time: {resolutionDuration}</span>
          )}
        </div>
      )}

      {/* Read-Only Workflow Stage Progress Indicator */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-md space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400 uppercase tracking-wider font-semibold">INCIDENT WORKFLOW LIFECYCLE (ACTION-DRIVEN PROGRESSION)</span>
          <span className="text-cyan-400 font-bold">Current Stage: {incident.status}</span>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {workflowStages.map((stage, idx) => {
            const isCompleted = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;
            return (
              <div
                key={stage}
                className={`py-3 px-2 rounded-xl text-center border relative flex flex-col items-center justify-center space-y-1 transition-all ${
                  isCurrent
                    ? isClosed
                      ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200 shadow-lg shadow-emerald-500/10'
                      : 'bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-lg shadow-cyan-500/10'
                    : isCompleted
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-600'
                }`}
              >
                <div className="flex items-center space-x-1">
                  {isCompleted && <Check className="h-3 w-3 text-emerald-400 shrink-0" />}
                  {isCurrent && (
                    <span
                      className={`h-2 w-2 rounded-full ${
                        isClosed ? 'bg-emerald-400' : 'bg-cyan-400 animate-ping'
                      } shrink-0`}
                    />
                  )}
                  <span className="text-[10px] font-mono font-bold">{stage}</span>
                </div>
                <span className="text-[8px] font-mono opacity-70">
                  {isCurrent ? (isClosed ? 'Archived' : 'Active Stage') : isCompleted ? 'Completed' : 'Pending'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Header Info Badges */}
      <div className="flex flex-wrap items-center gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-md text-xs font-mono">
        <Badge variant="info" className="text-[10px]">
          SIMULATED DEMO TELEMETRY
        </Badge>
        <IncidentSeverityBadge severity={incident.severity} />
        <IncidentPriorityBadge priority={incident.priority} />
        <IncidentStatusBadge status={incident.status} />
        <span className="text-slate-400">Category: <strong className="text-slate-200">{incident.category.replace(/_/g, ' ')}</strong></span>
        <span className="text-slate-400">Primary Analyst: <strong className="text-cyan-400">{incident.assignedToName || 'Unassigned'}</strong></span>
        {resolutionDuration && (
          <span className="text-emerald-400 flex items-center space-x-1 font-bold">
            <Clock className="h-3.5 w-3.5 inline" />
            <span>Resolution MTTR: <strong>{resolutionDuration}</strong></span>
          </span>
        )}
      </div>

      {/* Main Command Center Grid (Row 1) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left (2 cols): Payload Details & Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Network className="h-5 w-5 text-cyan-400" />
                <CardTitle>Technical Payload & Endpoint Parameters</CardTitle>
              </div>
              <CardDescription>Target subnet details & forensic description</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <p className="text-slate-300 leading-relaxed bg-navy-950 p-4 rounded-xl border border-slate-800 font-mono text-xs">
                {incident.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono">SOURCE IP</span>
                  <p className="font-mono font-bold text-cyan-400">{incident.sourceIp || '10.45.12.89'}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono">DESTINATION IP</span>
                  <p className="font-mono font-bold text-slate-200">{incident.destinationIp || '10.45.0.1'}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono">HOSPITAL WARD</span>
                  <p className="font-mono font-bold text-slate-200">{incident.departmentName}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono">LINKED THREAT</span>
                  <p className="font-mono font-bold text-amber-400">{incident.threatId || 'THREAT-1002'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Incident Timeline */}
          <Card className="p-6">
            <IncidentTimeline events={incident.timelineEvents || []} />
          </Card>
        </div>

        {/* Right (1 col): AI Synthesis & Asset Profile */}
        <div className="space-y-6">
          <IncidentAIAnalysisCard
            incidentCode={incident.incidentCode}
            departmentName={incident.departmentName}
            affectedAsset={incident.affectedAsset}
          />

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Server className="h-5 w-5 text-cyan-400" />
                <CardTitle>Affected Asset Metadata</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-400">HOSTNAME / ENDPOINT ID</span>
                <p className="font-mono font-bold text-slate-100">{incident.affectedAsset}</p>
              </div>

              <div className="space-y-2 pt-1 text-slate-300">
                <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                  <span className="text-slate-400">Department:</span>
                  <span className="font-semibold text-slate-200">{incident.departmentName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                  <span className="text-slate-400">Primary Analyst:</span>
                  <span className="font-semibold text-cyan-400">{incident.assignedToName || 'Unassigned'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Secondary Analyst:</span>
                  <span className="font-mono text-slate-300">{incident.secondaryAnalystName || 'N/A'}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Secondary Workspace Grid (Row 2): Notes, Evidence & SOAR Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <IncidentNotesPanel incidentId={incident.id} notes={incident.notes || []} />
        </div>
        <div className="lg:col-span-1">
          <IncidentEvidenceList incidentId={incident.id} evidenceItems={incident.evidenceItems || []} />
        </div>
        <div className="lg:col-span-1">
          <IncidentActionLog actions={incident.responseActions || []} />
        </div>
      </div>

      {/* Action Modal */}
      {!isClosed && (
        <IncidentActionModal
          isOpen={isActionModalOpen}
          onClose={() => setIsActionModalOpen(false)}
          incidentId={incident.id}
        />
      )}
    </PageContainer>
  );
};
