import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const SeverityDistChart: React.FC = () => {
  const data = [
    { category: 'Critical', count: 3, color: '#EF4444' },
    { category: 'High', count: 12, color: '#F59E0B' },
    { category: 'Medium', count: 28, color: '#06B6D4' },
    { category: 'Low', count: 64, color: '#10B981' },
  ];

  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <div className="flex items-center space-x-2">
            <CardTitle>Threat Severity Distribution</CardTitle>
            <Badge variant="info" className="text-[9px] font-mono">SIMULATED</Badge>
          </div>
          <CardDescription>Breakdown across Critical, High, Medium, Low tiers</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pt-4 min-h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
            <XAxis dataKey="category" stroke="#64748B" fontSize={10} tickLine={false} />
            <YAxis stroke="#64748B" fontSize={10} tickLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
              itemStyle={{ color: '#F8FAFC' }}
            />
            <Bar dataKey="count" radius={[6, 6, 0, 0]} name="Detected Events">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
