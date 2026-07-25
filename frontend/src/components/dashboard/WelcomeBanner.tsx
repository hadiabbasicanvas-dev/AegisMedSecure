import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { RoleBadge } from '@/components/auth/RoleBadge';
import { Clock, HeartPulse } from 'lucide-react';

export const WelcomeBanner: React.FC = () => {
  const { user } = useAuthStore();
  const [timeString, setTimeString] = useState('');
  const [greeting, setGreeting] = useState('Welcome back');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      if (hours < 12) setGreeting('Good Morning');
      else if (hours < 18) setGreeting('Good Afternoon');
      else setGreeting('Good Evening');

      setTimeString(
        now.toLocaleString('en-US', {
          timeZone: 'Asia/Karachi',
          dateStyle: 'medium',
          timeStyle: 'medium',
        }) + ' PKT'
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!user) return null;

  return (
    <div className="bg-[#1B1B1B] border border-[#2A2A2A] p-6 md:p-8 shadow-2xl relative overflow-hidden font-mono">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 bg-[#D90429] animate-ping" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#D90429]">
              SOC LIVE TELEMETRY ENGINE ACTIVE
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#F5F5F5] uppercase tracking-wide">
              {greeting}, {user.firstName} {user.lastName}
            </h1>
            <RoleBadge role={user.role} />
          </div>

          <p className="text-xs text-[#A0A0A0] font-sans font-light">
            Quaid-e-Azam International Hospital Autonomous Defense Sentinel • {user.department || 'Security Operations Center'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 border-t lg:border-t-0 lg:border-l border-[#2A2A2A] pt-4 lg:pt-0 lg:pl-6 text-xs">
          <div className="flex items-center space-x-2.5 bg-[#0A0A0A] border border-[#2A2A2A] px-3.5 py-2">
            <Clock className="h-4 w-4 text-[#D90429]" />
            <div>
              <p className="text-[9px] text-[#707070] uppercase">STATION TIME</p>
              <p className="text-[#F5F5F5] font-bold">{timeString || 'Loading PKT...'}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 bg-[#0A0A0A] border border-[#2A2A2A] px-3.5 py-2">
            <HeartPulse className="h-4 w-4 text-[#00C853]" />
            <div>
              <p className="text-[9px] text-[#707070] uppercase">INFRASTRUCTURE SCOPE</p>
              <p className="font-bold text-[#00C853]">400 Beds | 12 Subnets Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
