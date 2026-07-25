import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AssetDistributionItem } from '@/services/analyticsService';

interface AssetDistributionPieProps {
  assets: AssetDistributionItem[];
}

export const AssetDistributionPie: React.FC<AssetDistributionPieProps> = ({ assets }) => {
  const colors = ['#10B981', '#06B6D4', '#3B82F6', '#EF4444'];

  const data = assets.map((a, idx) => ({
    name: a.category,
    value: a.count,
    color: colors[idx % colors.length],
  }));

  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <div className="flex items-center space-x-2">
            <CardTitle>Connected IoMT & Infrastructure Health</CardTitle>
            <Badge variant="info" className="text-[9px] font-mono">SIMULATED</Badge>
          </div>
          <CardDescription>Breakdown of 1,248 hospital nodes by category</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pt-2 min-h-[280px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
            <Legend verticalAlign="bottom" height={40} iconSize={10} wrapperStyle={{ fontSize: '10px', color: '#94A3B8' }} />
            <Pie data={data} cx="50%" cy="45%" innerRadius={60} outerRadius={85} paddingAngle={4} dataKey="value">
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
