import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/common/PageContainer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  ArrowLeft,
  ShieldAlert,
  Send,
  FileCheck,
  Clock,
  Radio,
  CheckCircle2,
  BellRing,
  Tag,
  Check,
  AlertTriangle
} from 'lucide-react';

interface ActiveDutyTask {
  id: string;
  threatTask: string;
  assignedTo: string;
  role: string;
  reportStatus: 'REQUESTED' | 'SUBMITTED' | 'PENDING';
  urgency: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  deadline: string;
}

export const DutyManagementPage: React.FC = () => {
  const navigate = useNavigate();

  // Duty Form State
  const [selectedThreat, setSelectedThreat] = useState('Ransomware Alert - EMR Database');
  const [selectedAssignee, setSelectedAssignee] = useState('Analyst A. Khan (ONLINE - 3 Tasks)');
  const [priority, setPriority] = useState<'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'>('CRITICAL');
  const [customInstructions, setCustomInstructions] = useState('[Isolate VLAN] Investigate suspicious SMB traffic on 10.45.2.14 immediately.');
  const [isDispatching, setIsDispatching] = useState(false);
  const [dispatchSuccess, setDispatchSuccess] = useState(false);
  const [slaSeconds, setSlaSeconds] = useState(0);

  // Incoming Analyst Workstation Modal Alert State
  const [showAnalystAlert, setShowAnalystAlert] = useState(false);

  // Report Request Form State
  const [reportTargetEmployee, setReportTargetEmployee] = useState('SOC Mgr. S. Ahmed (ONLINE)');
  const [reportTypes, setReportTypes] = useState<string[]>(['Incident Analysis', 'VLAN Isolation Log']);
  const [slaDeadline, setSlaDeadline] = useState('Within 1 Hour');
  const [isRequestingReport, setIsRequestingReport] = useState(false);
  const [reportRequestSuccess, setReportRequestSuccess] = useState(false);

  // Table Data
  const [activeTasks, setActiveTasks] = useState<ActiveDutyTask[]>([
    { id: 'TSK-9041', threatTask: 'Ransomware Alert - EMR Database (10.45.2.14)', assignedTo: 'Ali Khan', role: 'SECURITY ANALYST', reportStatus: 'PENDING', urgency: 'CRITICAL', deadline: 'Within 45 Mins' },
    { id: 'TSK-9042', threatTask: 'PACS DICOM Imaging Vault Encryption Anomaly', assignedTo: 'Dr. Shahbaz Ahmed', role: 'SOC MANAGER', reportStatus: 'REQUESTED', urgency: 'CRITICAL', deadline: 'Within 1 Hour' },
    { id: 'TSK-9043', threatTask: 'ICU Life Support Network Firmware Patching', assignedTo: 'Zainab Tariq', role: 'SYSTEMS ENGINEER', reportStatus: 'SUBMITTED', urgency: 'HIGH', deadline: 'End of Shift' },
    { id: 'TSK-9044', threatTask: 'Emergency Room Workstation Log Forensic Audit', assignedTo: 'Faisal Malik', role: 'SECURITY ANALYST', reportStatus: 'SUBMITTED', urgency: 'MEDIUM', deadline: 'Routine Daily' },
  ]);

  // SLA Live Counter Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (dispatchSuccess) {
      interval = setInterval(() => {
        setSlaSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setSlaSeconds(0);
    }
    return () => clearInterval(interval);
  }, [dispatchSuccess]);

  const formatTimer = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggleReportType = (type: string) => {
    if (reportTypes.includes(type)) {
      setReportTypes(reportTypes.filter((t) => t !== type));
    } else {
      setReportTypes([...reportTypes, type]);
    }
  };

  const handleTagClick = (tag: string) => {
    if (!customInstructions.includes(tag)) {
      setCustomInstructions((prev) => `${tag} ${prev}`);
    }
  };

  const handleDispatchDuty = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDispatching(true);
    setTimeout(() => {
      setIsDispatching(false);
      setDispatchSuccess(true);
      const newTask: ActiveDutyTask = {
        id: `TSK-${Math.floor(1000 + Math.random() * 9000)}`,
        threatTask: selectedThreat,
        assignedTo: selectedAssignee.split(' (')[0],
        role: 'SECURITY ANALYST',
        reportStatus: 'PENDING',
        urgency: priority,
        deadline: 'Within 1 Hour',
      };
      setActiveTasks([newTask, ...activeTasks]);

      // Automatically trigger Analyst Alert Screen preview after dispatch
      setTimeout(() => setShowAnalystAlert(true), 2500);
    }, 800);
  };

  const handleRequestReport = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRequestingReport(true);
    setTimeout(() => {
      setIsRequestingReport(false);
      setReportRequestSuccess(true);
      setTimeout(() => setReportRequestSuccess(false), 5000);
    }, 800);
  };

  return (
    <PageContainer
      title="DUTY MANAGEMENT & REPORT DISPATCH"
      description="Super Administrator sovereign dispatch console for threat mitigation duties & audit report dispatches"
      actions={
        <div className="flex items-center space-x-4 font-mono">
          <Link to="/dashboard/admin">
            <Button variant="outline" size="sm" className="border-[#2A2A2A] text-[#A0A0A0] hover:text-[#F5F5F5]">
              <ArrowLeft className="mr-1.5 h-3.5 w-3.5 text-[#D90429]" /> RETURN TO DASHBOARD
            </Button>
          </Link>

          <Button
            variant="cyan-accent"
            size="sm"
            onClick={() => setShowAnalystAlert(true)}
            className="text-xs"
          >
            <AlertTriangle className="mr-1.5 h-4 w-4 text-[#D90429]" /> PREVIEW ANALYST SCREEN
          </Button>

          <div className="flex items-center space-x-2 text-xs bg-[#171717] border border-[#2A2A2A] px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-[#00C853] animate-ping" />
            <span className="text-[#A0A0A0]">STATUS:</span>
            <span className="font-bold text-[#00C853]">ONLINE</span>
            <span className="text-[#2A2A2A]">|</span>
            <span className="text-[#A0A0A0]">ACTIVE PERSONNEL:</span>
            <span className="font-bold text-[#F5F5F5]">24</span>
          </div>
        </div>
      }
    >
      {/* Dynamic Toast Notification Container */}
      {dispatchSuccess && (
        <div className="bg-[#00C853]/15 border border-[#00C853] p-4 font-mono text-xs text-[#00C853] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xl">
          <div className="flex items-center space-x-3">
            <CheckCircle2 className="h-5 w-5 text-[#00C853] shrink-0" />
            <div>
              <p className="font-bold text-[#F5F5F5] uppercase">
                Alert sent via Push, Slack Webhook, and Emergency SMS to Analyst A. Khan
              </p>
              <p className="text-[11px] text-[#00C853] font-light">
                Delivery Confirmed — SLA Timer Active ({formatTimer(slaSeconds)})
              </p>
            </div>
          </div>
          <Badge variant="success" className="text-[9px] uppercase">
            DELIVERY CONFIRMED
          </Badge>
        </div>
      )}

      {reportRequestSuccess && (
        <div className="bg-[#D90429]/15 border border-[#D90429]/40 p-4 font-mono text-xs text-[#F5F5F5] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BellRing className="h-4 w-4 text-[#D90429] shrink-0" />
            <span className="font-bold uppercase">INCIDENT REPORT REQUEST DISPATCHED WITH SLA TIMER</span>
          </div>
          <Badge variant="warning" className="text-[8px]">SLA TIMER ACTIVE</Badge>
        </div>
      )}

      {/* Main 2-Column Split: Duty Assignment (Left) & Request Report (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono">
        
        {/* LEFT COLUMN: Duty & Threat Assignment Card (6 cols) */}
        <div className="lg:col-span-6">
          <Card className="h-full flex flex-col justify-between bg-[#1B1B1B] border-[#2A2A2A] p-6 space-y-5">
            <div className="space-y-2 border-b border-[#2A2A2A] pb-3">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-sm font-bold text-[#F5F5F5] uppercase flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-[#D90429]" /> DUTY & THREAT ASSIGNMENT CARD
                </h3>
                <Badge variant="critical" className="text-[8px]">PRIORITY DISPATCH</Badge>
              </div>
              <p className="text-[11px] text-[#A0A0A0] font-sans font-light">Assign live hospital threats and isolated VLAN playbooks to SOC staff</p>
            </div>

            <form onSubmit={handleDispatchDuty} className="space-y-4 text-xs">
              {/* Active Threat Selector */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#F5F5F5] uppercase tracking-wider">
                  1. SELECT TARGETED SYSTEM THREAT
                </label>
                <select
                  value={selectedThreat}
                  onChange={(e) => setSelectedThreat(e.target.value)}
                  className="w-full h-10 bg-[#0A0A0A] border border-[#2A2A2A] px-3 text-xs text-[#F5F5F5] focus:border-[#D90429] focus:outline-none"
                >
                  <option value="Ransomware Alert - EMR Database">Ransomware Alert - EMR Core Database (10.45.2.14)</option>
                  <option value="PACS DICOM Imaging Vault Encryption Anomaly">PACS DICOM Imaging Vault Encryption Anomaly</option>
                  <option value="ICU Life Support IoMT Network Anomaly">ICU Life Support IoMT Network Anomaly (VLAN 108)</option>
                  <option value="Emergency Room Workstation Unauthorized Access">Emergency Room Workstation Unauthorized Access</option>
                  <option value="Pathology Lab Info System Brute Force SSH">Pathology Lab Info System Brute Force SSH</option>
                </select>
              </div>

              {/* Assignee Selector */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#F5F5F5] uppercase tracking-wider">
                  2. ASSIGNEE PERSONNEL (FILTERED BY ROLE)
                </label>
                <select
                  value={selectedAssignee}
                  onChange={(e) => setSelectedAssignee(e.target.value)}
                  className="w-full h-10 bg-[#0A0A0A] border border-[#2A2A2A] px-3 text-xs text-[#F5F5F5] focus:border-[#D90429] focus:outline-none"
                >
                  <option value="Analyst A. Khan (ONLINE - 3 Tasks)">Ali Khan — SECURITY ANALYST (ONLINE • 3 Active Tasks)</option>
                  <option value="SOC Mgr. S. Ahmed (ONLINE - 5 Tasks)">Dr. Shahbaz Ahmed — SOC MANAGER (ONLINE • 5 Active Tasks)</option>
                  <option value="Eng. Z. Tariq (ONLINE - 2 Tasks)">Zainab Tariq — SYSTEMS ENGINEER (ONLINE • 2 Active Tasks)</option>
                  <option value="Analyst F. Malik (AWAY - 1 Task)">Faisal Malik — SECURITY ANALYST (AWAY • 1 Active Task)</option>
                </select>
              </div>

              {/* Priority Level Segmented Toggle */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#F5F5F5] uppercase tracking-wider">
                  3. PRIORITY URGENCY LEVEL
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'] as const).map((p) => (
                    <button
                      type="button"
                      key={p}
                      onClick={() => setPriority(p)}
                      className={`py-2 text-[10px] font-bold uppercase border transition-all ${
                        priority === p
                          ? p === 'CRITICAL'
                            ? 'bg-[#FF1744]/20 text-[#FF1744] border-[#FF1744]'
                            : p === 'HIGH'
                            ? 'bg-[#FFB300]/20 text-[#FFB300] border-[#FFB300]'
                            : 'bg-[#171717] text-[#F5F5F5] border-[#D90429]'
                          : 'bg-[#0A0A0A] text-[#707070] border-[#2A2A2A] hover:text-[#F5F5F5]'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Action Required Field with Pre-set Tag Buttons */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold text-[#F5F5F5] uppercase tracking-wider">
                    4. ACTION REQUIRED INSTRUCTIONS
                  </label>
                  <span className="text-[9px] text-[#707070]">CLICK TAG TO PRE-PEND</span>
                </div>

                <div className="flex flex-wrap gap-1.5 pb-1">
                  {['[Isolate VLAN]', '[Patch Vulnerability]', '[Investigate Log]', '[Rotate Keys]'].map((tag) => (
                    <button
                      type="button"
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className="px-2 py-0.5 bg-[#0A0A0A] border border-[#2A2A2A] text-[9px] text-[#D90429] hover:border-[#D90429] transition-colors"
                    >
                      <Tag className="h-2.5 w-2.5 inline mr-1" />
                      {tag}
                    </button>
                  ))}
                </div>

                <Input
                  value={customInstructions}
                  onChange={(e) => setCustomInstructions(e.target.value)}
                  placeholder="Enter detailed action instructions..."
                  className="bg-[#0A0A0A] border-[#2A2A2A] text-xs h-10"
                />
              </div>

              {/* DYNAMIC DISPATCH BUTTON WITH NEON GREEN SUCCESS STATE */}
              {dispatchSuccess ? (
                <div className="space-y-2">
                  <div className="w-full h-12 bg-[#00C853] text-[#0A0A0A] font-bold text-xs flex items-center justify-center space-x-2 uppercase shadow-[0_0_25px_rgba(0,200,83,0.5)]">
                    <Check className="h-5 w-5 text-[#0A0A0A]" />
                    <span>[ ✓ DISPATCHED & NOTIFIED ]</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-[#00C853] px-1 font-mono">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#00C853] animate-ping" />
                      Delivery Confirmed
                    </span>
                    <span className="font-bold">SLA TIMER ACTIVE ({formatTimer(slaSeconds)})</span>
                  </div>
                </div>
              ) : (
                <Button
                  type="submit"
                  variant="cyan-accent"
                  className="w-full h-11 text-xs shadow-[0_0_20px_rgba(217,4,41,0.3)]"
                  isLoading={isDispatching}
                >
                  <Send className="mr-2 h-4 w-4 text-[#D90429]" /> [ DISPATCH TASK & NOTIFY ]
                </Button>
              )}
            </form>
          </Card>
        </div>

        {/* RIGHT COLUMN: Request Incident & Status Reports (6 cols) */}
        <div className="lg:col-span-6">
          <Card className="h-full flex flex-col justify-between bg-[#1B1B1B] border-[#2A2A2A] p-6 space-y-5">
            <div className="space-y-2 border-b border-[#2A2A2A] pb-3">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-sm font-bold text-[#F5F5F5] uppercase flex items-center gap-2">
                  <FileCheck className="h-4 w-4 text-[#00C853]" /> REQUEST INCIDENT REPORT / AUDIT LOG
                </h3>
                <Badge variant="info" className="text-[8px]">MANDATORY GOVERNANCE</Badge>
              </div>
              <p className="text-[11px] text-[#A0A0A0] font-sans font-light">Commission formal SOC investigation documentation with active SLA timers</p>
            </div>

            <form onSubmit={handleRequestReport} className="space-y-4 text-xs">
              {/* Target Employee Selector */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#F5F5F5] uppercase tracking-wider">
                  1. TARGET PERSONNEL / REPORT SUBMITTER
                </label>
                <select
                  value={reportTargetEmployee}
                  onChange={(e) => setReportTargetEmployee(e.target.value)}
                  className="w-full h-10 bg-[#0A0A0A] border border-[#2A2A2A] px-3 text-xs text-[#F5F5F5] focus:border-[#D90429] focus:outline-none"
                >
                  <option value="SOC Mgr. S. Ahmed (ONLINE)">Dr. Shahbaz Ahmed — SOC MANAGER (ONLINE)</option>
                  <option value="Analyst A. Khan (ONLINE)">Ali Khan — SECURITY ANALYST (ONLINE)</option>
                  <option value="Eng. Z. Tariq (ONLINE)">Zainab Tariq — SYSTEMS ENGINEER (ONLINE)</option>
                  <option value="Analyst F. Malik (AWAY)">Faisal Malik — SECURITY ANALYST (AWAY)</option>
                </select>
              </div>

              {/* Report Type Checkboxes */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#F5F5F5] uppercase tracking-wider">
                  2. REQUIRED REPORT DOCUMENT TYPE
                </label>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {[
                    'Incident Analysis',
                    'Vulnerability Audit',
                    'VLAN Isolation Log',
                    'Shift Summary',
                  ].map((type) => {
                    const isChecked = reportTypes.includes(type);
                    return (
                      <div
                        key={type}
                        onClick={() => handleToggleReportType(type)}
                        className={`p-2.5 border cursor-pointer flex items-center space-x-2 transition-all ${
                          isChecked ? 'bg-[#171717] border-[#00C853] text-[#F5F5F5]' : 'bg-[#0A0A0A] border-[#2A2A2A] text-[#707070]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="rounded-none border-[#2A2A2A] bg-[#0A0A0A] text-[#00C853] focus:ring-[#00C853]"
                        />
                        <span className="text-[11px] font-bold uppercase">{type}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Deadline & SLA Timer Picker */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#F5F5F5] uppercase tracking-wider">
                  3. DEADLINE & SLA TIMER PICKER
                </label>
                <select
                  value={slaDeadline}
                  onChange={(e) => setSlaDeadline(e.target.value)}
                  className="w-full h-10 bg-[#0A0A0A] border border-[#2A2A2A] px-3 text-xs text-[#F5F5F5] focus:border-[#D90429] focus:outline-none"
                >
                  <option value="Within 1 Hour">Within 1 Hour (Urgent Critical SLA)</option>
                  <option value="Within 4 Hours">Within 4 Hours (Standard Operational)</option>
                  <option value="End of Shift">End of Shift Handover (08:00 Window)</option>
                  <option value="Custom Time">Custom Deadline Window</option>
                </select>
              </div>

              {/* Secondary Action Button */}
              <Button
                type="submit"
                variant="outline"
                className="w-full h-11 text-xs border-[#F5F5F5]/40 text-[#F5F5F5] hover:border-[#00C853] hover:text-[#00C853]"
                isLoading={isRequestingReport}
              >
                <Clock className="mr-2 h-4 w-4 text-[#00C853]" /> [ REQUEST REPORT SUBMISSION ]
              </Button>
            </form>
          </Card>
        </div>

      </div>

      {/* BOTTOM SECTION: Full-Width Active Dispatched Duties & Pending Reports Table */}
      <div className="bg-[#1B1B1B] border border-[#2A2A2A] p-5 space-y-4 font-mono">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#2A2A2A] pb-3">
          <div>
            <h3 className="font-heading text-sm font-bold text-[#F5F5F5] uppercase flex items-center gap-2">
              <Radio className="h-4 w-4 text-[#D90429] animate-pulse" /> ACTIVE DISPATCHED DUTIES & PENDING REPORTS
            </h3>
            <p className="text-[11px] text-[#A0A0A0] font-sans font-light">Real-time status tracking of all active staff assignments and SLA countdown timers</p>
          </div>

          <Badge variant="info" className="text-[9px]">
            {activeTasks.length} ACTIVE DISPATCHES
          </Badge>
        </div>

        {/* Datatable */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#2A2A2A] bg-[#0A0A0A] text-[#707070] uppercase text-[10px]">
                <th className="py-3 px-4">TASK ID</th>
                <th className="py-3 px-4">ASSIGNED THREAT / TASK</th>
                <th className="py-3 px-4">ASSIGNED TO (NAME & ROLE)</th>
                <th className="py-3 px-4">REPORT STATUS</th>
                <th className="py-3 px-4">URGENCY LEVEL</th>
                <th className="py-3 px-4">SLA DEADLINE</th>
                <th className="py-3 px-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2A2A]/60">
              {activeTasks.map((t) => (
                <tr key={t.id} className="hover:bg-[#171717] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#D90429]">{t.id}</td>

                  <td className="py-3.5 px-4 max-w-xs font-sans font-light">
                    <p className="font-bold text-[#F5F5F5] uppercase text-xs">{t.threatTask}</p>
                  </td>

                  <td className="py-3.5 px-4">
                    <p className="font-bold text-[#F5F5F5] uppercase">{t.assignedTo}</p>
                    <span className="text-[9px] text-[#707070]">{t.role}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <Badge
                      variant={
                        t.reportStatus === 'SUBMITTED'
                          ? 'success'
                          : t.reportStatus === 'REQUESTED'
                          ? 'warning'
                          : 'critical'
                      }
                      className="text-[8px]"
                    >
                      {t.reportStatus}
                    </Badge>
                  </td>

                  <td className="py-3.5 px-4">
                    <Badge variant={t.urgency === 'CRITICAL' ? 'critical' : t.urgency === 'HIGH' ? 'high' : 'info'} className="text-[8px]">
                      {t.urgency}
                    </Badge>
                  </td>

                  <td className="py-3.5 px-4 text-[#A0A0A0] text-[11px]">{t.deadline}</td>

                  <td className="py-3.5 px-4 text-right space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => alert(`Reassigning task ${t.id}`)} className="text-[#A0A0A0] hover:text-[#D90429]">
                      REASSIGN
                    </Button>

                    <Button variant="ghost" size="sm" onClick={() => alert(`Reminder sent to ${t.assignedTo}`)} className="text-[#A0A0A0] hover:text-[#00C853]">
                      REMIND
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* OPTION 2: ANALYST WORKSTATION INCOMING ALERT MODAL OVERLAY */}
      {showAnalystAlert && (
        <div className="fixed inset-0 bg-[#0A0A0A]/85 backdrop-blur-md z-50 flex items-center justify-center p-4 font-mono">
          <div className="bg-[#171717] border-2 border-[#FF1744] p-6 max-w-lg w-full space-y-5 shadow-[0_0_50px_rgba(255,23,68,0.4)] relative animate-in fade-in zoom-in-95">
            {/* Header */}
            <div className="flex items-center space-x-3 border-b border-[#2A2A2A] pb-3 text-[#FF1744]">
              <AlertTriangle className="h-6 w-6 animate-pulse shrink-0" />
              <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-[#F5F5F5]">
                🚨 CRITICAL TASK DISPATCHED BY SUPER ADMIN
              </h2>
            </div>

            {/* Task Details Card */}
            <div className="bg-[#0A0A0A] border border-[#2A2A2A] p-4 text-xs space-y-2.5">
              <div className="flex justify-between border-b border-[#2A2A2A] pb-1.5">
                <span className="text-[#707070]">TARGET ASSET:</span>
                <span className="font-bold text-[#F5F5F5]">EMR Core Database (10.45.2.14)</span>
              </div>

              <div className="flex justify-between border-b border-[#2A2A2A] pb-1.5">
                <span className="text-[#707070]">REQUIRED ACTIONS:</span>
                <div className="space-x-1">
                  <span className="px-1.5 py-0.5 bg-[#FF1744]/20 border border-[#FF1744] text-[#FF1744] font-bold text-[9px]">[Isolate VLAN]</span>
                  <span className="px-1.5 py-0.5 bg-[#171717] border border-[#2A2A2A] text-[#F5F5F5] font-bold text-[9px]">[Investigate Log]</span>
                </div>
              </div>

              <div className="flex justify-between border-b border-[#2A2A2A] pb-1.5">
                <span className="text-[#707070]">DISPATCHED BY:</span>
                <span className="font-bold text-[#D90429]">Super Administrator (Hadi Abbasi)</span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#707070]">RESPONSE TARGET:</span>
                <span className="font-bold text-[#00C853]">&lt; 5 Mins (CRITICAL SLA)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAnalystAlert(false)}
                className="w-full sm:w-auto border-[#2A2A2A] text-[#A0A0A0]"
              >
                [ SNOOZE / ESCALATE ]
              </Button>

              <Button
                variant="cyan-accent"
                size="sm"
                onClick={() => {
                  alert('Task Acknowledged by Analyst! Navigating to Investigation Canvas...');
                  setShowAnalystAlert(false);
                }}
                className="w-full sm:w-auto bg-[#FF1744] border-[#FF1744] text-[#F5F5F5] hover:bg-[#D90429] shadow-[0_0_20px_rgba(255,23,68,0.5)]"
              >
                [ ACKNOWLEDGE & START TASK ]
              </Button>
            </div>
          </div>
        </div>
      )}

    </PageContainer>
  );
};
