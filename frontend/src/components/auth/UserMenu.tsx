import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAvatar } from './UserAvatar';
import { useAuthStore } from '@/store/useAuthStore';
import { User, LogOut, Settings } from 'lucide-react';

export const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="relative font-mono" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2.5 p-1 bg-[#171717] border border-[#2A2A2A] hover:border-[#D90429] transition-all focus:outline-none"
      >
        <UserAvatar firstName={user.firstName} lastName={user.lastName} size="sm" />
        <span className="hidden md:block text-xs font-bold text-[#F5F5F5] uppercase tracking-wider">{user.firstName} {user.lastName}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-60 border border-[#2A2A2A] bg-[#1B1B1B] shadow-2xl p-2 z-50 animate-in fade-in-80">
          <div className="px-3 py-2 border-b border-[#2A2A2A] space-y-1">
            <p className="text-xs font-bold text-[#F5F5F5] uppercase tracking-wider">{user.firstName} {user.lastName}</p>
            <p className="text-[10px] text-[#A0A0A0] truncate">{user.email}</p>
            <span className="inline-block mt-1 text-[9px] uppercase tracking-widest px-2 py-0.5 bg-[#0A0A0A] text-[#D90429] border border-[#D90429]/40 font-bold">
              {user.role}
            </span>
          </div>

          <div className="py-1">
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-2.5 px-3 py-2 text-xs text-[#A0A0A0] hover:text-[#F5F5F5] hover:bg-[#171717] transition-colors"
            >
              <User className="h-3.5 w-3.5 text-[#D90429]" />
              <span className="uppercase">Operator Profile</span>
            </Link>

            <Link
              to="/dashboard/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-2.5 px-3 py-2 text-xs text-[#A0A0A0] hover:text-[#F5F5F5] hover:bg-[#171717] transition-colors"
            >
              <Settings className="h-3.5 w-3.5 text-[#D90429]" />
              <span className="uppercase">SOC Preferences</span>
            </Link>
          </div>

          <div className="pt-1 border-t border-[#2A2A2A]">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2.5 px-3 py-2 text-xs text-[#FF1744] hover:bg-[#FF1744]/10 w-full text-left transition-colors font-bold uppercase"
            >
              <LogOut className="h-3.5 w-3.5 text-[#FF1744]" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
