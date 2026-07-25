import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterFormData } from '@/utils/validation';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordField } from '@/components/auth/PasswordField';
import { AlertTriangle, UserPlus, ShieldCheck } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register: registerAuth, isLoading } = useAuthStore();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'SECURITY_ANALYST',
      department: 'Security Operations Center',
    },
  });

  const passwordValue = watch('password', '');

  // Live Password Strength Calculation
  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const strength = getPasswordStrength(passwordValue);

  const onSubmit = async (data: RegisterFormData) => {
    setErrorMessage(null);
    try {
      await registerAuth(data);
      navigate('/dashboard');
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message || 'Registration failed. Please review inputs.'
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-xl font-bold tracking-tight text-slate-50">Operator Registration</h1>
        <p className="text-xs text-slate-400">Request access to Aegis SOC for QIH Subnets</p>
      </div>

      {errorMessage && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 flex items-center space-x-3 text-xs text-red-400">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              First Name
            </label>
            <Input placeholder="Zain" {...register('firstName')} />
            {errors.firstName && <p className="text-xs text-red-400">{errors.firstName.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Last Name
            </label>
            <Input placeholder="Ahmed" {...register('lastName')} />
            {errors.lastName && <p className="text-xs text-red-400">{errors.lastName.message}</p>}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Hospital Email
          </label>
          <Input type="email" placeholder="analyst@qih.hospital" {...register('email')} />
          {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Department
            </label>
            <Input placeholder="Adult ICU" {...register('department')} />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Assign System Role
            </label>
            <select
              {...register('role')}
              className="flex h-10 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-100 focus:border-cyan-500 focus:outline-none"
            >
              <option value="SECURITY_ANALYST">Security Analyst</option>
              <option value="SOC_MANAGER">SOC Manager</option>
              <option value="IT_ADMINISTRATOR">IT Administrator</option>
              <option value="COMPLIANCE_OFFICER">Compliance Officer</option>
              <option value="SUPER_ADMINISTRATOR">Super Administrator</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Password
          </label>
          <PasswordField placeholder="••••••••••••" {...register('password')} />
          {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}

          {/* Live Password Strength Meter */}
          {passwordValue && (
            <div className="space-y-1 pt-1">
              <div className="flex h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    strength <= 2
                      ? 'w-1/3 bg-red-500'
                      : strength <= 4
                      ? 'w-2/3 bg-amber-500'
                      : 'w-full bg-emerald-500'
                  }`}
                />
              </div>
              <p className="text-[10px] text-slate-400 text-right font-mono">
                Strength: {strength <= 2 ? 'Weak' : strength <= 4 ? 'Moderate' : 'Strong'}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Confirm Password
          </label>
          <PasswordField placeholder="••••••••••••" {...register('confirmPassword')} />
          {errors.confirmPassword && (
            <p className="text-xs text-red-400">{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button type="submit" variant="cyan-accent" className="w-full" isLoading={isLoading}>
          <UserPlus className="mr-2 h-4 w-4" /> Create Operator Account
        </Button>
      </form>

      <div className="pt-2 text-center text-xs text-slate-400">
        Already registered?{' '}
        <Link to="/login" className="text-cyan-400 font-semibold hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
};
