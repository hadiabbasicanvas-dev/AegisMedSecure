import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DepartmentRiskItem } from '@/services/analyticsService';

interface SeverityRadarChartProps {
  departments: DepartmentRiskItem[];
}

export const SeverityRadarChart: React.FC<SeverityRadarChartProps> = ({ departments }) => {
  const data = departments.map((d) => ({
    subject: d.department,
    risk: d.riskScore,
    fullMark: 100,
  }));

  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <div className="flex items-center space-x-2">
            <CardTitle>Ward Risk Exposure Multi-Axis Radar</CardTitle>
            <Badge variant="info" className="text-[9px] font-mono">SIMULATED</Badge>
          </div>
          <CardDescription>Comparative risk index across QIH hospital wards</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pt-2 min-h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="#1F2937" />
            <PolarAngleAxis dataKey="subject" stroke="#94A3B8" fontSize={10} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" fontSize={8} />
            <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
            <Radar name="Subnet Risk Index" dataKey="risk" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.4} />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
