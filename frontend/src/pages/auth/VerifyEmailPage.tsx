import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { authService } from '@/services/authService';
import { CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState<string>('Verifying email token...');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('No verification token provided in request URL.');
      return;
    }

    authService
      .verifyEmail(token)
      .then((res: any) => {
        setStatus('success');
        setMessage(res.message || 'Email address successfully verified.');
      })
      .catch((err: any) => {
        setStatus('error');
        setMessage(err.response?.data?.message || 'Verification token is invalid or expired.');
      });
  }, [token]);

  return (
    <div className="space-y-6 text-center">
      <h1 className="text-xl font-bold tracking-tight text-slate-50">Email Verification</h1>

      {status === 'loading' && (
        <div className="py-8 space-y-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent mx-auto" />
          <p className="text-xs text-slate-400">Communicating with Aegis Identity Provider...</p>
        </div>
      )}

      {status === 'success' && (
        <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-6 space-y-4 text-emerald-400">
          <CheckCircle2 className="h-12 w-12 mx-auto text-emerald-400" />
          <p className="text-sm font-semibold">{message}</p>
          <Link to="/login" className="inline-block">
            <Button variant="cyan-accent" size="sm">
              Proceed to Operator Login
            </Button>
          </Link>
        </div>
      )}

      {status === 'error' && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-6 space-y-4 text-red-400">
          <AlertTriangle className="h-12 w-12 mx-auto text-red-400" />
          <p className="text-sm font-semibold">{message}</p>
          <Link to="/login" className="inline-block">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> Return to Login
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
