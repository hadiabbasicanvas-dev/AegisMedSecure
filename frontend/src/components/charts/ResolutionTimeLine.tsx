import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ResolutionTrendItem } from '@/services/analyticsService';

interface ResolutionTimeLineProps {
  data: ResolutionTrendItem[];
}

export const ResolutionTimeLine: React.FC<ResolutionTimeLineProps> = ({ data }) => {
  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <div className="flex items-center space-x-2">
            <CardTitle>MTTR Resolution Velocity Improvement</CardTitle>
            <Badge variant="info" className="text-[9px] font-mono">SIMULATED</Badge>
          </div>
          <CardDescription>Mean Time To Respond (minutes) over 4-week deployment</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pt-4 min-h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
            <XAxis dataKey="date" stroke="#64748B" fontSize={10} tickLine={false} />
            <YAxis stroke="#64748B" fontSize={10} tickLine={false} />
            <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
            <Line type="monotone" dataKey="mttrMinutes" stroke="#06B6D4" strokeWidth={3} dot={{ r: 5 }} name="Actual MTTR (mins)" />
            <Line type="monotone" dataKey="targetMinutes" stroke="#64748B" strokeDasharray="5 5" name="SLA Target (mins)" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
