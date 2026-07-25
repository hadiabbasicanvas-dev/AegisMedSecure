import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TimeSeriesTrendItem } from '@/services/analyticsService';

interface ThreatTrendAreaChartProps {
  data: TimeSeriesTrendItem[];
}

export const ThreatTrendAreaChart: React.FC<ThreatTrendAreaChartProps> = ({ data }) => {
  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <div className="flex items-center space-x-2">
            <CardTitle>Threat Telemetry Velocity & Mitigation Trends</CardTitle>
            <Badge variant="info" className="text-[9px] font-mono">SIMULATED</Badge>
          </div>
          <CardDescription>Visualizing attack vectors vs. autonomous AI SOAR mitigations</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pt-4 min-h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorAttacksArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorMitigationsArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
            <XAxis dataKey="timestamp" stroke="#64748B" fontSize={10} tickLine={false} />
            <YAxis stroke="#64748B" fontSize={10} tickLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
              itemStyle={{ color: '#F8FAFC' }}
            />
            <Area type="monotone" dataKey="attacks" stroke="#EF4444" fillOpacity={1} fill="url(#colorAttacksArea)" name="Detected Attack Vectors" />
            <Area type="monotone" dataKey="mitigations" stroke="#06B6D4" fillOpacity={1} fill="url(#colorMitigationsArea)" name="Autonomous SOAR Mitigations" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
