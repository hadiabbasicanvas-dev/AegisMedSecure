import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-xl font-bold tracking-tight text-slate-50">Operator Login</h1>
        <p className="text-xs text-slate-400">Sign in to access Aegis Cyber Defense Center</p>
      </div>

      {/* Styled Phase 2 Indicator Card */}
      <div className="rounded-lg bg-cyan-500/10 border border-cyan-500/30 p-3 text-center">
        <p className="text-xs font-semibold text-cyan-400">⚡ Phase 2 Placeholder View: Authentication System</p>
        <p className="text-[11px] text-slate-400 mt-0.5">Click Sign In below to access the Phase 1 Foundation SOC Dashboard.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Email Address
          </label>
          <Input type="email" defaultValue="analyst@qih.hospital" required />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Password
            </label>
            <Link to="/forgot-password" className="text-xs text-cyan-400 hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input type="password" defaultValue="Password123!" required />
        </div>

        <Button type="submit" variant="cyan-accent" className="w-full">
          <Lock className="mr-2 h-4 w-4" /> Enter SOC Dashboard <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};
