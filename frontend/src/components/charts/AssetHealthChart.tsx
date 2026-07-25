import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const AssetHealthChart: React.FC = () => {
  const data = [
    { name: 'IoMT Medical Devices', value: 842, color: '#10B981' },
    { name: 'PACS/DICOM Workstations', value: 214, color: '#06B6D4' },
    { name: 'EMR & DB Servers', value: 98, color: '#3B82F6' },
    { name: 'Quarantined Hosts', value: 14, color: '#EF4444' },
  ];

  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <div className="flex items-center space-x-2">
            <CardTitle>Connected Asset Sentinel Status</CardTitle>
            <Badge variant="info" className="text-[9px] font-mono">SIMULATED</Badge>
          </div>
          <CardDescription>1,168 total connected devices breakdown</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pt-2 min-h-[260px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
            />
            <Legend verticalAlign="bottom" height={36} iconSize={10} wrapperStyle={{ fontSize: '11px', color: '#94A3B8' }} />
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
