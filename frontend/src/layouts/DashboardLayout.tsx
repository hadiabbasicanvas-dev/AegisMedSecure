import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  Shield,
  LayoutDashboard,
  Activity,
  AlertOctagon,
  Cpu,
  BarChart3,
  FileText,
  Server,
  Users,
  Settings,
  Bell,
  Search,
  Menu,
  X,
} from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { UserMenu } from '@/components/auth/UserMenu';

export const DashboardLayout: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const location = useLocation();

  const navItems = [
    { title: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { title: 'Threat Monitoring', href: '/threats', icon: Activity },
    { title: 'Incidents', href: '/incidents', icon: AlertOctagon },
    { title: 'AI Copilot', href: '/ai-assistant', icon: Cpu },
    { title: 'Analytics', href: '/analytics', icon: BarChart3 },
    { title: 'Reports', href: '/reports', icon: FileText },
    { title: 'Hospital Assets', href: '/assets', icon: Server },
    { title: 'User Access', href: '/users', icon: Users },
    { title: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-navy-950 text-slate-100 overflow-hidden">
      {/* Responsive Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 bg-slate-900 border-r border-slate-800 transition-all duration-300 flex flex-col ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-slate-800">
          <Link to="/dashboard" className="flex items-center space-x-3 overflow-hidden">
            <Shield className="h-8 w-8 text-cyan-400 shrink-0" />
            {sidebarOpen && <span className="font-bold text-base tracking-tight truncate">Aegis SOC</span>}
          </Link>
          <button
            onClick={toggleSidebar}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 focus:outline-none"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href || (item.href !== '/dashboard' && location.pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {sidebarOpen && <span>{item.title}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          {/* User profile avatar footer */}
          <div className="flex items-center space-x-3">
            <UserMenu />
          </div>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <div className={`flex flex-col flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Top Command Bar */}
        <header className="h-16 bg-slate-900/60 border-b border-slate-800 backdrop-blur-md px-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-xs text-slate-400 bg-slate-900 border border-slate-700/60 px-3 py-1.5 rounded-lg hover:border-slate-600 transition-all">
              <Search className="h-4 w-4 text-slate-500" />
              <span>Search threats or assets...</span>
              <kbd className="hidden sm:inline-block rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 border border-slate-700">Cmd+K</kbd>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            </button>
            <ThemeToggle />
            <div className="pl-2 border-l border-slate-800">
              <UserMenu />
            </div>
          </div>
        </header>

        {/* Child Outlet View */}
        <main className="flex-1 overflow-y-auto bg-navy-950">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
