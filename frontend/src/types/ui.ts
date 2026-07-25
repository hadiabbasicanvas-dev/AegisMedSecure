export type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export type UserRole = 'SUPER_ADMINISTRATOR' | 'SOC_MANAGER' | 'SECURITY_ANALYST' | 'IT_ADMINISTRATOR' | 'COMPLIANCE_OFFICER';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  department?: string;
  isEmailVerified?: boolean;
  isActive?: boolean;
}

export interface NavItem {
  title: string;
  href: string;
  icon: string;
  roles?: UserRole[];
}
