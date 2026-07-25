import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '@/utils/validation';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordField } from '@/components/auth/PasswordField';
import { Badge } from '@/components/ui/badge';
import { ShieldAlert, Lock, ArrowRight, Radio, KeyRound } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
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
      email: 'hadiabbasicanvas@gmail.com',
      password: 'shehraam123',
      rememberMe: true,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setErrorMessage(null);
    try {
      await login(data);
      navigate('/dashboard/admin');
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message || 'Authentication failed. Access restricted to Super Administrator.'
      );
    }
  };

  return (
    <div className="space-y-6 font-mono text-xs max-w-md mx-auto">
      {/* Executive Header Banner */}
      <div className="space-y-3 text-center">
        <div className="inline-flex items-center space-x-2 bg-[#171717] border border-[#D90429] px-3.5 py-1 text-[10px] text-[#F5F5F5] uppercase tracking-widest">
          <Radio className="h-3 w-3 text-[#D90429] animate-pulse" />
          <span>SOVEREIGN EXECUTIVE ADMIN PORTAL</span>
        </div>

        <h1 className="font-heading text-2xl font-bold uppercase tracking-wider text-[#F5F5F5]">
          SUPER ADMIN ACCESS
        </h1>
        <p className="text-xs text-[#A0A0A0] font-sans font-light">
          Restricted sovereign entry point for Executive Command & SOC Leadership
        </p>
      </div>

      {errorMessage && (
        <div className="bg-[#FF1744]/15 border border-[#FF1744]/40 p-3.5 flex items-center space-x-3 text-xs text-[#FF1744]">
          <ShieldAlert className="h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Admin Form Container */}
      <div className="bg-[#171717] border border-[#D90429]/50 p-6 space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2 bg-[#D90429] text-[#F5F5F5] text-[9px] font-bold tracking-widest">
          BOSS MODE ONLY
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-[#F5F5F5] uppercase tracking-wider">
              SUPER ADMIN EMAIL
            </label>
            <Input type="email" placeholder="hadiabbasicanvas@gmail.com" {...register('email')} />
            {errors.email && <p className="text-[10px] text-[#FF1744]">{errors.email.message}</p>}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold text-[#F5F5F5] uppercase tracking-wider">
                ADMIN AUTH PASSWORD
              </label>
              <span className="text-[10px] text-[#00C853] font-mono">ENCRYPTED 256-BIT</span>
            </div>
            <PasswordField placeholder="••••••••••••" {...register('password')} />
            {errors.password && <p className="text-[10px] text-[#FF1744]">{errors.password.message}</p>}
          </div>

          <div className="flex items-center space-x-2 pt-1">
            <input
              type="checkbox"
              id="rememberMeAdmin"
              {...register('rememberMe')}
              className="h-4 w-4 rounded-none border-[#2A2A2A] bg-[#0A0A0A] text-[#D90429] focus:ring-[#D90429]"
            />
            <label htmlFor="rememberMeAdmin" className="text-[11px] text-[#A0A0A0] cursor-pointer">
              Maintain secure sovereign admin session
            </label>
          </div>

          <Button type="submit" variant="cyan-accent" className="w-full h-12 text-xs" isLoading={isLoading}>
            <KeyRound className="mr-2 h-4 w-4 text-[#D90429]" /> AUTHENTICATE SUPER ADMIN <ArrowRight className="ml-2 h-4 w-4 text-[#D90429]" />
          </Button>
        </form>
      </div>

      <div className="pt-2 text-center text-xs text-[#A0A0A0] border-t border-[#2A2A2A] flex items-center justify-between">
        <Link to="/login" className="text-[#A0A0A0] hover:text-[#F5F5F5]">
          ← Regular Staff Login
        </Link>
        <Badge variant="info" className="text-[9px]">
          PORTAL ID: #SA-BOSS-01
        </Badge>
      </div>
    </div>
  );
};
