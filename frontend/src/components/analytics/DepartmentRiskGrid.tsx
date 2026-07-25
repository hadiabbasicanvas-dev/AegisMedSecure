import React from 'react';
import { DepartmentRiskItem } from '@/services/analyticsService';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Building2, ShieldAlert } from 'lucide-react';

interface DepartmentRiskGridProps {
  departments: DepartmentRiskItem[];
}

export const DepartmentRiskGrid: React.FC<DepartmentRiskGridProps> = ({ departments }) => {
  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <div className="flex items-center space-x-2">
            <Building2 className="h-4 w-4 text-cyan-400" />
            <CardTitle>Hospital Ward Risk Ranking</CardTitle>
            <Badge variant="info" className="text-[9px] font-mono">SIMULATED</Badge>
          </div>
          <CardDescription>Risk scoring & active threat density across QIH departments</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pt-2 overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px]">
              <th className="py-2.5 px-3">Rank & Department</th>
              <th className="py-2.5 px-3">Risk Score</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3">Active Threats</th>
              <th className="py-2.5 px-3 text-right">Protected Assets</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {departments.map((dept, idx) => (
              <tr key={dept.department} className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-3 font-semibold text-slate-200 flex items-center space-x-2">
                  <span className="h-5 w-5 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-cyan-400 flex items-center justify-center font-bold">
                    #{idx + 1}
                  </span>
                  <span>{dept.department}</span>
                </td>
                <td className="py-3 px-3">
                  <div className="flex items-center space-x-2 font-mono">
                    <span className="font-bold text-slate-100">{dept.riskScore}/100</span>
                    <div className="h-1.5 w-16 bg-slate-950 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          dept.riskScore >= 80 ? 'bg-red-500' : dept.riskScore >= 60 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${dept.riskScore}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="py-3 px-3">
                  <Badge
                    variant={
                      dept.status === 'CRITICAL'
                        ? 'critical'
                        : dept.status === 'HIGH'
                        ? 'warning'
                        : dept.status === 'ELEVATED'
                        ? 'info'
                        : 'success'
                    }
                    className="text-[9px]"
                  >
                    {dept.status}
                  </Badge>
                </td>
                <td className="py-3 px-3 font-mono font-bold text-slate-300">{dept.activeThreats}</td>
                <td className="py-3 px-3 font-mono text-cyan-400 text-right font-semibold">{dept.protectedAssets} units</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};
