import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema, ResetPasswordFormData } from '@/utils/validation';
import { authService } from '@/services/authService';
import { Button } from '@/components/ui/button';
import { PasswordField } from '@/components/auth/PasswordField';
import { KeyRound, CheckCircle2, AlertTriangle } from 'lucide-react';

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tokenFromUrl = searchParams.get('token') || '';

  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: tokenFromUrl,
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    setStatusMessage(null);
    try {
      await authService.resetPassword({ token: data.token, newPassword: data.newPassword });
      setStatusMessage({ type: 'success', message: 'Password reset successful! Redirecting to login...' });
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        message: err.response?.data?.message || 'Failed to reset password. Token may be invalid or expired.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-xl font-bold tracking-tight text-slate-50">Set New Password</h1>
        <p className="text-xs text-slate-400">Enter your new security credentials below</p>
      </div>

      {statusMessage && (
        <div
          className={`rounded-lg p-3 text-xs flex items-center space-x-2 border ${
            statusMessage.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
              : 'bg-red-500/10 border-red-500/20 text-red-400'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="h-4 w-4 shrink-0" />
          ) : (
            <AlertTriangle className="h-4 w-4 shrink-0" />
          )}
          <span>{statusMessage.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input type="hidden" {...register('token')} />

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            New Password
          </label>
          <PasswordField placeholder="••••••••••••" {...register('newPassword')} />
          {errors.newPassword && <p className="text-xs text-red-400">{errors.newPassword.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Confirm New Password
          </label>
          <PasswordField placeholder="••••••••••••" {...register('confirmPassword')} />
          {errors.confirmPassword && (
            <p className="text-xs text-red-400">{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button type="submit" variant="cyan-accent" className="w-full" isLoading={isLoading}>
          <KeyRound className="mr-2 h-4 w-4" /> Save New Password
        </Button>
      </form>
    </div>
  );
};
