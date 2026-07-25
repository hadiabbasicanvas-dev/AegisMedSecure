import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileUpdateSchema, ProfileUpdateFormData, changePasswordSchema, ChangePasswordFormData } from '@/utils/validation';
import { useAuthStore } from '@/store/useAuthStore';
import { authService } from '@/services/authService';
import { PageContainer } from '@/components/common/PageContainer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RoleBadge } from '@/components/auth/RoleBadge';
import { UserAvatar } from '@/components/auth/UserAvatar';
import { PasswordField } from '@/components/auth/PasswordField';
import { Activity, KeyRound, CheckCircle2, AlertTriangle } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, setUser } = useAuthStore();
  const [profileMsg, setProfileMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const {
    register: regProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
  } = useForm<ProfileUpdateFormData>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      department: user?.department || '',
    },
  });

  const {
    register: regPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPasswordForm,
    formState: { errors: passwordErrors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onProfileSubmit = async (data: ProfileUpdateFormData) => {
    setIsUpdatingProfile(true);
    setProfileMsg(null);
    try {
      const updated = await authService.updateProfile(data);
      setUser(updated.user);
      setProfileMsg({ type: 'success', text: 'Operator profile details updated.' });
    } catch (err: any) {
      setProfileMsg({ type: 'error', text: err.response?.data?.message || 'Failed to update profile.' });
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const onPasswordSubmit = async (data: ChangePasswordFormData) => {
    setIsChangingPassword(true);
    setPasswordMsg(null);
    try {
      await authService.changePassword(data.currentPassword, data.newPassword);
      setPasswordMsg({ type: 'success', text: 'Security credentials updated.' });
      resetPasswordForm();
    } catch (err: any) {
      setPasswordMsg({ type: 'error', text: err.response?.data?.message || 'Password update failed.' });
    } finally {
      setIsChangingPassword(false);
    }
  };

  if (!user) return null;

  return (
    <PageContainer title="OPERATOR PROFILE & SECURITY CENTER" description="Manage credentials, view RBAC privileges, and monitor active sessions">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 font-mono">
        {/* Profile Overview Card */}
        <div className="space-y-6">
          <Card className="text-center">
            <CardContent className="pt-6 space-y-4">
              <UserAvatar firstName={user.firstName} lastName={user.lastName} size="lg" className="mx-auto" />
              <div>
                <h3 className="font-heading text-lg font-bold text-[#F5F5F5] uppercase">{user.firstName} {user.lastName}</h3>
                <p className="text-xs text-[#A0A0A0] mt-0.5">{user.email}</p>
              </div>
              <RoleBadge role={user.role} />
              <div className="pt-4 border-t border-[#2A2A2A] text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#707070] uppercase">DEPARTMENT:</span>
                  <span className="text-[#F5F5F5] font-bold uppercase">{user.department || 'Security Operations'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#707070] uppercase">EMAIL STATUS:</span>
                  <span className={`font-bold uppercase ${user.isEmailVerified ? 'text-[#00C853]' : 'text-[#FFB300]'}`}>
                    {user.isEmailVerified ? 'VERIFIED' : 'PENDING VERIFICATION'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#707070] uppercase">ACCOUNT STATUS:</span>
                  <span className="text-[#00C853] font-bold uppercase">ACTIVE OPERATOR</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Session Activity Log */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-[#D90429]" />
                <CardTitle>SESSION ACTIVITY LOG</CardTitle>
              </div>
              <CardDescription>Active SOC connections on QIH subnets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="p-3 bg-[#0A0A0A] border border-[#2A2A2A] space-y-1">
                <div className="flex justify-between font-bold text-[#F5F5F5] uppercase">
                  <span>CURRENT WORKSTATION</span>
                  <span className="text-[#00C853]">ACTIVE</span>
                </div>
                <p className="text-[#D90429] font-bold">192.168.10.45 (SOC Terminal A-1)</p>
                <p className="text-[10px] text-[#707070]">Authenticated 15 mins ago</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Edit & Security Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Edit Information Form */}
          <Card>
            <CardHeader>
              <CardTitle>OPERATOR DETAILS</CardTitle>
              <CardDescription>Update your personal information and hospital department</CardDescription>
            </CardHeader>
            <CardContent>
              {profileMsg && (
                <div className={`p-3 text-xs mb-4 flex items-center space-x-2 border ${
                  profileMsg.type === 'success' ? 'bg-[#00C853]/15 border-[#00C853]/40 text-[#00C853]' : 'bg-[#FF1744]/15 border-[#FF1744]/40 text-[#FF1744]'
                }`}>
                  {profileMsg.type === 'success' ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <AlertTriangle className="h-4 w-4 shrink-0" />}
                  <span>{profileMsg.text}</span>
                </div>
              )}

              <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-[#F5F5F5] uppercase tracking-wider">FIRST NAME</label>
                    <Input {...regProfile('firstName')} />
                    {profileErrors.firstName && <p className="text-[10px] text-[#FF1744]">{profileErrors.firstName.message}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-[#F5F5F5] uppercase tracking-wider">LAST NAME</label>
                    <Input {...regProfile('lastName')} />
                    {profileErrors.lastName && <p className="text-[10px] text-[#FF1744]">{profileErrors.lastName.message}</p>}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#F5F5F5] uppercase tracking-wider">HOSPITAL DEPARTMENT</label>
                  <Input {...regProfile('department')} />
                </div>

                <Button type="submit" variant="cyan-accent" size="sm" isLoading={isUpdatingProfile}>
                  SAVE PROFILE DETAILS
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Change Password Form */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <KeyRound className="h-4 w-4 text-[#D90429]" />
                <CardTitle>CHANGE SECURITY PASSWORD</CardTitle>
              </div>
              <CardDescription>Update your authentication password</CardDescription>
            </CardHeader>
            <CardContent>
              {passwordMsg && (
                <div className={`p-3 text-xs mb-4 flex items-center space-x-2 border ${
                  passwordMsg.type === 'success' ? 'bg-[#00C853]/15 border-[#00C853]/40 text-[#00C853]' : 'bg-[#FF1744]/15 border-[#FF1744]/40 text-[#FF1744]'
                }`}>
                  {passwordMsg.type === 'success' ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <AlertTriangle className="h-4 w-4 shrink-0" />}
                  <span>{passwordMsg.text}</span>
                </div>
              )}

              <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#F5F5F5] uppercase tracking-wider">CURRENT PASSWORD</label>
                  <PasswordField placeholder="••••••••••••" {...regPassword('currentPassword')} />
                  {passwordErrors.currentPassword && <p className="text-[10px] text-[#FF1744]">{passwordErrors.currentPassword.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-[#F5F5F5] uppercase tracking-wider">NEW PASSWORD</label>
                    <PasswordField placeholder="••••••••••••" {...regPassword('newPassword')} />
                    {passwordErrors.newPassword && <p className="text-[10px] text-[#FF1744]">{passwordErrors.newPassword.message}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-[#F5F5F5] uppercase tracking-wider">CONFIRM NEW PASSWORD</label>
                    <PasswordField placeholder="••••••••••••" {...regPassword('confirmPassword')} />
                    {passwordErrors.confirmPassword && <p className="text-[10px] text-[#FF1744]">{passwordErrors.confirmPassword.message}</p>}
                  </div>
                </div>

                <Button type="submit" variant="cyan-accent" size="sm" isLoading={isChangingPassword}>
                  UPDATE PASSWORD
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};
