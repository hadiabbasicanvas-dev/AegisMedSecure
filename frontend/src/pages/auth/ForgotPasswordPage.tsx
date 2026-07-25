import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, ForgotPasswordFormData } from '@/utils/validation';
import { authService } from '@/services/authService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Mail, CheckCircle2 } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [successInfo, setSuccessInfo] = useState<{ message: string; simulatedResetLink?: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      const res = await authService.forgotPassword(data.email);
      setSuccessInfo(res);
    } catch (e: any) {
      setSuccessInfo({ message: 'If the email exists in our records, a reset link has been dispatched.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-xl font-bold tracking-tight text-slate-50">Reset Password</h1>
        <p className="text-xs text-slate-400">Enter your operator email to receive reset instructions</p>
      </div>

      {successInfo ? (
        <div className="space-y-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-4 text-xs text-emerald-400">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <span className="font-semibold">{successInfo.message}</span>
          </div>

          {successInfo.simulatedResetLink && (
            <div className="pt-2 border-t border-emerald-500/20 space-y-1">
              <p className="text-[11px] text-slate-300">Demo Environment Simulated Link:</p>
              <a
                href={successInfo.simulatedResetLink}
                className="text-cyan-400 underline font-mono break-all block"
              >
                {successInfo.simulatedResetLink}
              </a>
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Email Address
            </label>
            <Input type="email" placeholder="analyst@qih.hospital" {...register('email')} />
            {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
          </div>

          <Button type="submit" variant="cyan-accent" className="w-full" isLoading={isLoading}>
            <Mail className="mr-2 h-4 w-4" /> Send Reset Link
          </Button>
        </form>
      )}

      <div className="pt-2 text-center text-xs">
        <Link to="/login" className="inline-flex items-center text-slate-400 hover:text-white">
          <ArrowLeft className="mr-1 h-3 w-3" /> Back to Sign In
        </Link>
      </div>
    </div>
  );
};
