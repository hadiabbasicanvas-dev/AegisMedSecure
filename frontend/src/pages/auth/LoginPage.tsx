import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '@/utils/validation';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordField } from '@/components/auth/PasswordField';
import { AlertTriangle, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'analyst@qih.hospital',
      password: 'Password123!',
      rememberMe: true,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setErrorMessage(null);
    try {
      await login(data);
      navigate('/dashboard');
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message || 'Authentication failed. Please check operator credentials.'
      );
    }
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="space-y-2 text-center">
        <h1 className="font-heading text-xl font-bold uppercase tracking-wider text-[#F5F5F5]">OPERATOR AUTHENTICATION</h1>
        <p className="text-xs text-[#A0A0A0] font-sans font-light">Sign in to access Aegis Cyber Defense Center</p>
      </div>

      {errorMessage && (
        <div className="bg-[#FF1744]/10 border border-[#FF1744]/40 p-3 flex items-center space-x-3 text-xs text-[#FF1744]">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-[#F5F5F5] uppercase tracking-wider">
            EMAIL ADDRESS
          </label>
          <Input type="email" placeholder="analyst@qih.hospital" {...register('email')} />
          {errors.email && <p className="text-[10px] text-[#FF1744]">{errors.email.message}</p>}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold text-[#F5F5F5] uppercase tracking-wider">
              PASSWORD
            </label>
            <Link to="/forgot-password" className="text-[11px] text-[#D90429] hover:underline">
              Forgot password?
            </Link>
          </div>
          <PasswordField placeholder="••••••••••••" {...register('password')} />
          {errors.password && <p className="text-[10px] text-[#FF1744]">{errors.password.message}</p>}
        </div>

        <div className="flex items-center space-x-2 pt-1">
          <input
            type="checkbox"
            id="rememberMe"
            {...register('rememberMe')}
            className="h-4 w-4 rounded-none border-[#2A2A2A] bg-[#0A0A0A] text-[#D90429] focus:ring-[#D90429]"
          />
          <label htmlFor="rememberMe" className="text-[11px] text-[#A0A0A0] cursor-pointer">
            Remember me on this workstation
          </label>
        </div>

        <Button type="submit" variant="cyan-accent" className="w-full h-11" isLoading={isLoading}>
          <Lock className="mr-2 h-4 w-4 text-[#D90429]" /> AUTHENTICATE & ENTER SOC <ArrowRight className="ml-2 h-4 w-4 text-[#D90429]" />
        </Button>
      </form>

      <div className="pt-3 text-center text-xs text-[#A0A0A0] border-t border-[#2A2A2A] space-y-2">
        <div>
          Don&apos;t have an operator account?{' '}
          <Link to="/register" className="text-[#D90429] font-bold hover:underline">
            REQUEST ACCESS
          </Link>
        </div>

        <div className="pt-1">
          <Link to="/admin-login" className="inline-flex items-center space-x-1.5 text-[10px] text-[#00C853] hover:underline font-bold">
            <ShieldCheck className="h-3 w-3 text-[#00C853]" />
            <span>SOVEREIGN EXECUTIVE ADMIN LOGIN →</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
