import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const DepartmentRiskChart: React.FC = () => {
  const data = [
    { subject: 'Adult ICU', risk: 85, fullMark: 100 },
    { subject: 'PACS Imaging', risk: 92, fullMark: 100 },
    { subject: 'EMR Primary', risk: 65, fullMark: 100 },
    { subject: 'Emergency Care', risk: 78, fullMark: 100 },
    { subject: 'Central Lab', risk: 45, fullMark: 100 },
    { subject: 'Pharmacy Subnet', risk: 38, fullMark: 100 },
  ];

  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <div className="flex items-center space-x-2">
            <CardTitle>Subnet Threat Exposure Matrix</CardTitle>
            <Badge variant="info" className="text-[9px] font-mono">SIMULATED</Badge>
          </div>
          <CardDescription>Risk scoring across QIH hospital wards & subnets</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pt-2 min-h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="#1F2937" />
            <PolarAngleAxis dataKey="subject" stroke="#94A3B8" fontSize={10} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" fontSize={8} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
            />
            <Radar name="Risk Index" dataKey="risk" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.4} />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
