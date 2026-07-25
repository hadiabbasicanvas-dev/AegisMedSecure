import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const ThreatTrendChart: React.FC = () => {
  const data = [
    { time: '00:00', attacks: 12, blocked: 12 },
    { time: '03:00', attacks: 8, blocked: 8 },
    { time: '06:00', attacks: 15, blocked: 14 },
    { time: '09:00', attacks: 42, blocked: 40 },
    { time: '12:00', attacks: 68, blocked: 66 },
    { time: '15:00', attacks: 54, blocked: 53 },
    { time: '18:00', attacks: 31, blocked: 31 },
    { time: '21:00', attacks: 19, blocked: 19 },
  ];

  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <div className="flex items-center space-x-2">
            <CardTitle>24-Hour Threat Telemetry Velocity</CardTitle>
            <Badge variant="info" className="text-[9px] font-mono">SIMULATED</Badge>
          </div>
          <CardDescription>Simulated attack attempts vs. autonomous AI mitigations</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pt-4 min-h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorAttacks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
            <XAxis dataKey="time" stroke="#64748B" fontSize={10} tickLine={false} />
            <YAxis stroke="#64748B" fontSize={10} tickLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
              itemStyle={{ color: '#F8FAFC' }}
            />
            <Area type="monotone" dataKey="attacks" stroke="#EF4444" fillOpacity={1} fill="url(#colorAttacks)" name="Attack Vector Attempts" />
            <Area type="monotone" dataKey="blocked" stroke="#06B6D4" fillOpacity={1} fill="url(#colorBlocked)" name="Autonomous Mitigations" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
