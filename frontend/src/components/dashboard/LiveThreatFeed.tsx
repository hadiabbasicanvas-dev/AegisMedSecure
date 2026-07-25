import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Terminal } from 'lucide-react';

interface TelemetryEvent {
  id: string;
  timestamp: string;
  severity: 'CRITICAL' | 'HIGH' | 'INFO';
  event: string;
  sourceIp: string;
  department: string;
}

export const LiveThreatFeed: React.FC = () => {
  const [events, setEvents] = useState<TelemetryEvent[]>([
    {
      id: 'EVT-9041',
      timestamp: new Date().toLocaleTimeString(),
      severity: 'CRITICAL',
      event: 'Unusual SMB encryption traffic on PACS-SERVER-02',
      sourceIp: '10.45.12.89',
      department: 'Radiology / PACS',
    },
    {
      id: 'EVT-9040',
      timestamp: new Date(Date.now() - 5000).toLocaleTimeString(),
      severity: 'HIGH',
      event: 'Multiple failed SSH authentication attempts on EMR-DB-PRIMARY',
      sourceIp: '10.45.3.112',
      department: 'EMR Core Vault',
    },
    {
      id: 'EVT-9039',
      timestamp: new Date(Date.now() - 12000).toLocaleTimeString(),
      severity: 'INFO',
      event: 'IoMT Infusion Pump Firmware Verification OK',
      sourceIp: '10.45.88.4',
      department: 'Adult ICU Bed #12',
    },
    {
      id: 'EVT-9038',
      timestamp: new Date(Date.now() - 25000).toLocaleTimeString(),
      severity: 'HIGH',
      event: 'Unauthorized port sweep detected on Central Lab Analyzer',
      sourceIp: '10.45.60.22',
      department: 'Pathology Lab',
    },
    {
      id: 'EVT-9037',
      timestamp: new Date(Date.now() - 38000).toLocaleTimeString(),
      severity: 'INFO',
      event: 'SOAR VLAN isolation rule synchronized with Gateway #1',
      sourceIp: '10.45.0.1',
      department: 'Network Core',
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const simulatedEvents: Array<{ event: string; severity: 'CRITICAL' | 'HIGH' | 'INFO'; dept: string; ip: string }> = [
        { event: 'Suspicious TLS 1.3 payload size on DICOM Workstation #4', severity: 'HIGH', dept: 'Radiology / PACS', ip: '10.45.12.44' },
        { event: 'Heartbeat ping received from NICU Ventilator Unit #8', severity: 'INFO', dept: 'NICU Ward', ip: '10.45.90.8' },
        { event: 'Potential WannaCry beacon pattern detected on Billing-PC-09', severity: 'CRITICAL', dept: 'Administration', ip: '10.45.2.9' },
        { event: 'VLAN 104 software isolation rule confirmed by Core Router', severity: 'INFO', dept: 'Network Gateway', ip: '10.45.0.254' },
      ];

      const randomEvt = simulatedEvents[Math.floor(Math.random() * simulatedEvents.length)];
      const newEvt: TelemetryEvent = {
        id: `EVT-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toLocaleTimeString(),
        severity: randomEvt.severity,
        event: randomEvt.event,
        sourceIp: randomEvt.ip,
        department: randomEvt.dept,
      };

      setEvents((prev) => [newEvt, ...prev.slice(0, 7)]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <div className="flex items-center space-x-2">
            <Terminal className="h-4 w-4 text-[#D90429]" />
            <CardTitle>LIVE TELEMETRY STREAM</CardTitle>
            <Badge variant="info" className="text-[9px]">LIVE FEED</Badge>
          </div>
          <CardDescription>Real-time syslog stream from QIH hospital subnets</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pt-2 space-y-2 overflow-hidden font-mono text-xs">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="p-2.5 bg-[#0A0A0A] border border-[#2A2A2A] flex flex-col sm:flex-row sm:items-center justify-between gap-2 animate-in fade-in-50"
          >
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="text-[10px] text-[#707070] shrink-0">{evt.timestamp}</span>
              <span
                className={`text-[9px] font-bold px-1.5 py-0.5 border uppercase tracking-wider shrink-0 ${
                  evt.severity === 'CRITICAL'
                    ? 'bg-[#FF1744]/15 text-[#FF1744] border-[#FF1744]/40'
                    : evt.severity === 'HIGH'
                    ? 'bg-[#FF9100]/15 text-[#FF9100] border-[#FF9100]/40'
                    : 'bg-[#D90429]/15 text-[#F5F5F5] border-[#D90429]/40'
                }`}
              >
                {evt.severity}
              </span>
              <span className="text-[#F5F5F5] truncate">{evt.event}</span>
            </div>

            <div className="flex items-center space-x-2 text-[10px] text-[#A0A0A0] shrink-0">
              <span className="text-[#D90429] font-bold">{evt.sourceIp}</span>
              <span>•</span>
              <span>{evt.department}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
