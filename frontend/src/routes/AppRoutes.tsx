import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from '@/layouts/PublicLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ProtectedRoute } from '@/routes/ProtectedRoute';

// Static Eager-loaded pages (Landing & Auth)
import { HomePage } from '@/pages/landing/HomePage';
import { FeaturesPage } from '@/pages/landing/FeaturesPage';
import { SolutionsPage } from '@/pages/landing/SolutionsPage';
import { AboutPage } from '@/pages/landing/AboutPage';
import { ContactPage } from '@/pages/landing/ContactPage';

import { LoginPage } from '@/pages/auth/LoginPage';
import { AdminLoginPage } from '@/pages/auth/AdminLoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from '@/pages/auth/ResetPasswordPage';
import { VerifyEmailPage } from '@/pages/auth/VerifyEmailPage';
import { UnauthorizedPage } from '@/pages/auth/UnauthorizedPage';
import { ProfilePage } from '@/pages/profile/ProfilePage';
import { OverviewPage } from '@/pages/dashboard/OverviewPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

// Lazy-loaded heavy dashboard module pages
const ThreatListPage = lazy(() => import('@/pages/threats/ThreatListPage').then((m) => ({ default: m.ThreatListPage })));
const ThreatDetailPage = lazy(() => import('@/pages/threats/ThreatDetailPage').then((m) => ({ default: m.ThreatDetailPage })));
const AIAssistantPage = lazy(() => import('@/pages/dashboard/AIAssistantPage').then((m) => ({ default: m.AIAssistantPage })));
const AnalyticsPage = lazy(() => import('@/pages/dashboard/AnalyticsPage').then((m) => ({ default: m.AnalyticsPage })));
const ReportsPage = lazy(() => import('@/pages/dashboard/ReportsPage').then((m) => ({ default: m.ReportsPage })));
const IncidentListPage = lazy(() => import('@/pages/incidents/IncidentListPage').then((m) => ({ default: m.IncidentListPage })));
const IncidentDetailPage = lazy(() => import('@/pages/incidents/IncidentDetailPage').then((m) => ({ default: m.IncidentDetailPage })));

const AdminDashboardPage = lazy(() => import('@/pages/admin/AdminDashboardPage').then((m) => ({ default: m.AdminDashboardPage })));
const DutyManagementPage = lazy(() => import('@/pages/admin/DutyManagementPage').then((m) => ({ default: m.DutyManagementPage })));
const UserManagementPage = lazy(() => import('@/pages/admin/UserManagementPage').then((m) => ({ default: m.UserManagementPage })));
const RolePermissionsPage = lazy(() => import('@/pages/admin/RolePermissionsPage').then((m) => ({ default: m.RolePermissionsPage })));
const AssetManagementPage = lazy(() => import('@/pages/admin/AssetManagementPage').then((m) => ({ default: m.AssetManagementPage })));
const AuditLogsPage = lazy(() => import('@/pages/admin/AuditLogsPage').then((m) => ({ default: m.AuditLogsPage })));
const SecuritySettingsPage = lazy(() => import('@/pages/admin/SecuritySettingsPage').then((m) => ({ default: m.SecuritySettingsPage })));
const AIConfigPage = lazy(() => import('@/pages/admin/AIConfigPage').then((m) => ({ default: m.AIConfigPage })));
const IntegrationsPage = lazy(() => import('@/pages/admin/IntegrationsPage').then((m) => ({ default: m.IntegrationsPage })));
const SystemHealthPage = lazy(() => import('@/pages/admin/SystemHealthPage').then((m) => ({ default: m.SystemHealthPage })));

const RouteLoadingFallback = () => (
  <div className="py-20 text-center space-y-3">
    <div className="h-10 w-10 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent mx-auto" />
    <p className="text-xs font-mono text-slate-400">Loading Aegis Defense Workspace Module...</p>
  </div>
);

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<RouteLoadingFallback />}>
      <Routes>
        {/* Public Enterprise Landing Website */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        {/* Authentication Pages */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
        </Route>

        {/* Security Exception Routes */}
        <Route path="/403" element={<UnauthorizedPage />} />
        <Route path="/404" element={<NotFoundPage />} />

        {/* Protected SOC Dashboard Workspace */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<OverviewPage />} />
            <Route path="/profile" element={<ProfilePage />} />

            {/* Threat Monitoring & Alerts Routes */}
            <Route path="/dashboard/threats" element={<ThreatListPage />} />
            <Route path="/dashboard/threats/:id" element={<ThreatDetailPage />} />
            <Route path="/dashboard/alerts" element={<ThreatListPage />} />

            {/* AI Security Copilot Route */}
            <Route path="/dashboard/ai-assistant" element={<AIAssistantPage />} />

            {/* Analytics & Reporting Routes */}
            <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
            <Route path="/dashboard/reports" element={<ReportsPage />} />

            {/* Incident Management Routes */}
            <Route path="/dashboard/incidents" element={<IncidentListPage />} />
            <Route path="/dashboard/incidents/:id" element={<IncidentDetailPage />} />

            {/* Administration & System Management Routes */}
            <Route path="/dashboard/admin" element={<AdminDashboardPage />} />
            <Route path="/dashboard/duty-management" element={<DutyManagementPage />} />
            <Route path="/dashboard/admin/duty-management" element={<DutyManagementPage />} />
            <Route path="/dashboard/users" element={<UserManagementPage />} />
            <Route path="/dashboard/roles" element={<RolePermissionsPage />} />
            <Route path="/dashboard/assets" element={<AssetManagementPage />} />
            <Route path="/dashboard/departments" element={<AssetManagementPage />} />
            <Route path="/dashboard/audit-logs" element={<AuditLogsPage />} />
            <Route path="/dashboard/settings" element={<SecuritySettingsPage />} />
            <Route path="/dashboard/ai-config" element={<AIConfigPage />} />
            <Route path="/dashboard/integrations" element={<IntegrationsPage />} />
            <Route path="/dashboard/system-health" element={<SystemHealthPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  );
};
