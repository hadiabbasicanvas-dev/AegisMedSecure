import React, { useState } from 'react';
import { useAdminSettings, useUpdateAdminSettings } from '@/services/adminService';
import { PageContainer } from '@/components/common/PageContainer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, Building2, Save } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export const SecuritySettingsPage: React.FC = () => {
  const { user } = useAuthStore();
  const { data: settings } = useAdminSettings();
  const updateSettings = useUpdateAdminSettings();

  const [orgName, setOrgName] = useState('Quaid-e-Azam International Hospital');
  const [minPassLength, setMinPassLength] = useState('12');
  const [maxAttempts, setMaxAttempts] = useState('5');
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [mfaRequired, setMfaRequired] = useState(true);

  const isSuperAdmin = user?.role === 'SUPER_ADMINISTRATOR';

  const handleSave = () => {
    if (!isSuperAdmin) {
      alert('Only Super Administrators can update global security policies.');
      return;
    }

    updateSettings.mutate(
      {
        org_name: orgName,
        password_min_length: minPassLength,
        max_login_attempts: maxAttempts,
        session_timeout_minutes: sessionTimeout,
        mfa_required: mfaRequired.toString(),
      },
      {
        onSuccess: () => {
          alert('Global security settings saved successfully.');
        },
      }
    );
  };

  return (
    <PageContainer
      title="GLOBAL SECURITY POLICIES & IDENTITY SETTINGS"
      description="Configure password complexity, failed attempt lockouts, and MFA requirements"
      actions={
        <Button
          variant="cyan-accent"
          size="sm"
          disabled={!isSuperAdmin || updateSettings.isPending}
          onClick={handleSave}
        >
          <Save className="mr-1.5 h-4 w-4 text-[#D90429]" /> SAVE SECURITY POLICIES
        </Button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono text-xs">
        {/* Organization Details Card */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-[#D90429]" />
              <CardTitle>HOSPITAL FACILITY BRANDING</CardTitle>
            </div>
            <CardDescription>Target institution details displayed on PDF audit briefs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-[#F5F5F5] uppercase tracking-wider">HOSPITAL ENTITY NAME</label>
              <Input
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
              />
            </div>
            <div className="p-3 bg-[#0A0A0A] border border-[#2A2A2A] space-y-1 text-[#A0A0A0]">
              <span className="text-[9px] text-[#707070] uppercase">FACILITY SCOPE</span>
              <p className="text-[#F5F5F5] font-bold">Near Golra Morr, Islamabad, Pakistan (~400 Beds)</p>
            </div>
          </CardContent>
        </Card>

        {/* Security Policy Controls */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <Lock className="h-4 w-4 text-[#D90429]" />
              <CardTitle>AUTHENTICATION SAFEGUARDS</CardTitle>
            </div>
            <CardDescription>Password rules & active session timeouts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#F5F5F5] uppercase tracking-wider">MIN PASSWORD LENGTH</label>
                <Input
                  type="number"
                  value={minPassLength}
                  onChange={(e) => setMinPassLength(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#F5F5F5] uppercase tracking-wider">MAX FAILED LOCKOUT</label>
                <Input
                  type="number"
                  value={maxAttempts}
                  onChange={(e) => setMaxAttempts(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-[#F5F5F5] uppercase tracking-wider">INACTIVITY TIMEOUT (MINUTES)</label>
              <Input
                type="number"
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.value)}
              />
            </div>

            <div className="pt-2 flex items-center justify-between p-3 bg-[#0A0A0A] border border-[#2A2A2A]">
              <div>
                <p className="font-bold text-[#F5F5F5] uppercase">Enforce Multi-Factor Authentication (MFA)</p>
                <p className="text-[10px] text-[#A0A0A0] font-sans font-light">Require TOTP authenticator tokens for all admin roles.</p>
              </div>
              <input
                type="checkbox"
                checked={mfaRequired}
                onChange={(e) => setMfaRequired(e.target.checked)}
                className="rounded-none border-[#2A2A2A] bg-[#0A0A0A] text-[#D90429] focus:ring-[#D90429] h-4 w-4"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};
