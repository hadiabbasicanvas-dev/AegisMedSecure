import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useUIStore();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-slate-400 hover:text-slate-100 transition-colors rounded-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-cyan-400" />}
    </button>
  );
};
