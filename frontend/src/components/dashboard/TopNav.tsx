import React, { useState } from 'react';
import { Search, Bell, X } from 'lucide-react';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { UserMenu } from '@/components/auth/UserMenu';
import { BreadcrumbNav } from './BreadcrumbNav';

export const TopNav: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  const notifications = [
    { id: 1, title: 'Critical Threat Flagged', desc: 'PACS-SERVER-02 ransomware SMB vector', time: '2m ago' },
    { id: 2, title: 'SOAR VLAN Isolated', desc: 'Host 10.45.12.89 placed in software quarantine', time: '5m ago' },
    { id: 3, title: 'GPT-4o Evaluation Complete', desc: 'Risk matrix calculated for ICU Subnet', time: '12m ago' },
  ];

  return (
    <header className="h-16 bg-[#0A0A0A] border-b border-[#2A2A2A] px-6 flex items-center justify-between sticky top-0 z-30 font-mono">
      {/* Left: Breadcrumbs & Brand */}
      <div className="flex items-center space-x-4">
        <BreadcrumbNav />
      </div>

      {/* Right: Search, Notifications, ThemeToggle, UserMenu */}
      <div className="flex items-center space-x-4">
        {/* Global Search Trigger */}
        <button
          onClick={() => alert('Global Search active. Type IP address, hostname, or threat ID.')}
          className="flex items-center space-x-2 text-xs text-[#A0A0A0] bg-[#171717] border border-[#2A2A2A] px-3 py-1.5 hover:border-[#D90429] transition-all"
        >
          <Search className="h-3.5 w-3.5 text-[#D90429]" />
          <span className="hidden sm:inline">Search threats, assets, logs...</span>
          <kbd className="hidden sm:inline-block bg-[#0A0A0A] px-1.5 py-0.5 text-[10px] text-[#A0A0A0] border border-[#2A2A2A]">Cmd+K</kbd>
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setUnreadCount(0);
            }}
            className="relative p-2 text-[#A0A0A0] hover:text-[#F5F5F5] bg-[#171717] border border-[#2A2A2A] hover:border-[#D90429] transition-colors"
            aria-label="View Notifications"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#D90429] animate-ping" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 border border-[#2A2A2A] bg-[#1B1B1B] shadow-2xl p-4 z-50 animate-in fade-in-80">
              <div className="flex items-center justify-between pb-3 border-b border-[#2A2A2A]">
                <span className="text-xs font-bold text-[#F5F5F5] uppercase">SOC Sentinel Notifications</span>
                <button onClick={() => setShowNotifications(false)} className="text-[#A0A0A0] hover:text-[#D90429]">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="py-2 space-y-2 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2.5 bg-[#0A0A0A] border border-[#2A2A2A] space-y-1 text-xs">
                    <div className="flex justify-between font-bold text-[#F5F5F5] uppercase">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-[#707070]">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-[#A0A0A0] font-sans font-light">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* User Menu */}
        <div className="pl-2 border-l border-[#2A2A2A]">
          <UserMenu />
        </div>
      </div>
    </header>
  );
};
