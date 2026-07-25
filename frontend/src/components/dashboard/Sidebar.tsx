import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Shield,
  LayoutDashboard,
  Activity,
  AlertOctagon,
  Cpu,
  BarChart3,
  FileText,
  Server,
  Building2,
  Users,
  FileCode,
  Settings,
  Menu,
  X,
  LogOut,
  AlertTriangle,
} from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import { useAuthStore } from '@/store/useAuthStore';

export const Sidebar: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const { logout } = useAuthStore();
  const location = useLocation();

  const navGroups = [
    {
      group: 'Overview',
      items: [
        { title: 'SOC Overview', href: '/dashboard', icon: LayoutDashboard },
      ],
    },
    {
      group: 'Security Ops',
      items: [
        { title: 'Threat Monitoring', href: '/dashboard/threats', icon: Activity },
        { title: 'Threat Alerts', href: '/dashboard/alerts', icon: AlertTriangle },
        { title: 'SOAR Incidents', href: '/dashboard/incidents', icon: AlertOctagon },
      ],
    },
    {
      group: 'Intelligence',
      items: [
        { title: 'AI Assistant', href: '/dashboard/ai-assistant', icon: Cpu },
        { title: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
        { title: 'Audit Reports', href: '/dashboard/reports', icon: FileText },
      ],
    },
    {
      group: 'Administration',
      items: [
        { title: 'Hospital Assets', href: '/dashboard/assets', icon: Server },
        { title: 'Hospital Wards', href: '/dashboard/departments', icon: Building2 },
        { title: 'User Controls', href: '/dashboard/users', icon: Users },
        { title: 'Audit Logs', href: '/dashboard/audit-logs', icon: FileCode },
        { title: 'SOC Settings', href: '/dashboard/settings', icon: Settings },
      ],
    },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 bg-[#0A0A0A] border-r border-[#2A2A2A] transition-all duration-300 flex flex-col ${
        sidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-[#2A2A2A] shrink-0">
        <Link to="/dashboard" className="flex items-center space-x-3 overflow-hidden group">
          <div className="flex items-center justify-center h-9 w-9 bg-[#171717] border border-[#2A2A2A] text-[#D90429] shrink-0 group-hover:border-[#D90429] transition-colors">
            <Shield className="h-5 w-5 group-hover:scale-110 transition-transform" />
          </div>
          {sidebarOpen && (
            <div className="flex flex-col truncate font-mono">
              <span className="font-heading font-bold text-xs tracking-wider text-[#F5F5F5] uppercase">AEGIS SOC</span>
              <span className="text-[9px] text-[#D90429] tracking-widest uppercase">QIH Defense</span>
            </div>
          )}
        </Link>
        <button
          onClick={toggleSidebar}
          className="p-1.5 text-[#A0A0A0] hover:text-[#F5F5F5] bg-[#171717] border border-[#2A2A2A] hover:border-[#D90429] transition-colors"
        >
          {sidebarOpen ? <X className="h-4 w-4 text-[#D90429]" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Nav Groups */}
      <nav className="flex-grow p-3 space-y-5 overflow-y-auto font-mono">
        {navGroups.map((group, idx) => (
          <div key={idx} className="space-y-1">
            {sidebarOpen && (
              <h4 className="text-[9px] font-bold uppercase tracking-widest text-[#707070] px-3 mb-1">
                {group.group}
              </h4>
            )}
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href || (item.href !== '/dashboard' && location.pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`relative flex items-center space-x-3 px-3 py-2 text-xs font-semibold tracking-wider transition-all duration-200 group ${
                    isActive
                      ? 'bg-[#171717] text-[#F5F5F5] border-r-2 border-[#D90429] shadow-lg shadow-[#D90429]/10'
                      : 'text-[#A0A0A0] hover:bg-[#171717]/60 hover:text-[#F5F5F5]'
                  }`}
                >
                  <Icon className={`h-4 w-4 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 ${isActive ? 'text-[#D90429]' : 'text-[#707070]'}`} />
                  {sidebarOpen && <span className="truncate uppercase">{item.title}</span>}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer Signout */}
      <div className="p-3 border-t border-[#2A2A2A] shrink-0 font-mono">
        <button
          onClick={() => logout()}
          className="flex items-center space-x-3 px-3 py-2 text-xs text-[#A0A0A0] hover:text-[#FF1744] hover:bg-[#FF1744]/10 transition-colors w-full border border-transparent hover:border-[#FF1744]/40"
        >
          <LogOut className="h-4 w-4 shrink-0 text-[#FF1744]" />
          {sidebarOpen && <span className="uppercase font-bold">Sign Out</span>}
        </button>
      </div>
    </aside>
  );
};
