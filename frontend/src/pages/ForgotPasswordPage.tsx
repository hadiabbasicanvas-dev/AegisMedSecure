import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, ArrowLeft } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-xl font-bold tracking-tight text-slate-50">Reset Password</h1>
        <p className="text-xs text-slate-400">Enter your operator email to receive reset instructions</p>
      </div>

      <div className="rounded-lg bg-slate-800/80 border border-slate-700 p-3 text-center">
        <p className="text-xs font-semibold text-cyan-400">⚡ Phase 2 Placeholder View: Password Reset Flow</p>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Operator Email
          </label>
          <Input type="email" placeholder="analyst@qih.hospital" required />
        </div>

        <Button variant="cyan-accent" className="w-full">
          <Mail className="mr-2 h-4 w-4" /> Send Reset Link
        </Button>
      </form>

      <div className="pt-2 text-center text-xs">
        <Link to="/login" className="inline-flex items-center text-slate-400 hover:text-white">
          <ArrowLeft className="mr-1 h-3 w-3" /> Back to Login
        </Link>
      </div>
    </div>
  );
};
