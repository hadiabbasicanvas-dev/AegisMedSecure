import { hashPassword } from '../utils/password';

export interface UserRecord {
  id: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  role: 'SUPER_ADMINISTRATOR' | 'SOC_MANAGER' | 'SECURITY_ANALYST' | 'IT_ADMINISTRATOR' | 'COMPLIANCE_OFFICER';
  department: string;
  isEmailVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

class MemoryAuthStore {
  private users: Map<string, UserRecord> = new Map();
  private refreshTokens: Set<string> = new Set();
  private resetTokens: Map<string, { userId: string; expiresAt: number }> = new Map();
  private verifyTokens: Map<string, { userId: string; expiresAt: number }> = new Map();

  constructor() {
    this.seedDefaultUsers();
  }

  private async seedDefaultUsers() {
    const defaultHash = await hashPassword('Password123!');
    const bossHash = await hashPassword('shehraam123');
    const now = new Date().toISOString();

    const seedUsers: UserRecord[] = [
      {
        id: 'usr-boss-super-admin-01',
        email: 'hadiabbasicanvas@gmail.com',
        passwordHash: bossHash,
        firstName: 'Hadi',
        lastName: 'Abbasi (Boss Admin)',
        role: 'SUPER_ADMINISTRATOR',
        department: 'Executive Command & Sovereign SOC Leadership',
        isEmailVerified: true,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'usr-super-admin-01',
        email: 'superadmin@qih.hospital',
        passwordHash: defaultHash,
        firstName: 'Dr. Tariq',
        lastName: 'Khan',
        role: 'SUPER_ADMINISTRATOR',
        department: 'Executive Governance & SOC Leadership',
        isEmailVerified: true,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'usr-soc-mgr-01',
        email: 'socmanager@qih.hospital',
        passwordHash: defaultHash,
        firstName: 'Ayesha',
        lastName: 'Malik',
        role: 'SOC_MANAGER',
        department: 'Security Operations Center',
        isEmailVerified: true,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'usr-analyst-01',
        email: 'analyst@qih.hospital',
        passwordHash: defaultHash,
        firstName: 'Zain',
        lastName: 'Ahmed',
        role: 'SECURITY_ANALYST',
        department: 'Threat Monitoring & Response Unit',
        isEmailVerified: true,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'usr-it-admin-01',
        email: 'itadmin@qih.hospital',
        passwordHash: defaultHash,
        firstName: 'Usman',
        lastName: 'Raza',
        role: 'IT_ADMINISTRATOR',
        department: 'Hospital IT & Network Infrastructure',
        isEmailVerified: true,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'usr-compliance-01',
        email: 'compliance@qih.hospital',
        passwordHash: defaultHash,
        firstName: 'Fatima',
        lastName: 'Zahra',
        role: 'COMPLIANCE_OFFICER',
        department: 'HIPAA & ISO Regulatory Compliance',
        isEmailVerified: true,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
    ];

    seedUsers.forEach((u) => this.users.set(u.email.toLowerCase(), u));
  }

  public async findByEmail(email: string): Promise<UserRecord | undefined> {
    return this.users.get(email.toLowerCase());
  }

  public async findById(id: string): Promise<UserRecord | undefined> {
    return Array.from(this.users.values()).find((u) => u.id === id);
  }

  public async createUser(user: UserRecord): Promise<UserRecord> {
    this.users.set(user.email.toLowerCase(), user);
    return user;
  }

  public async updateUser(id: string, updates: Partial<UserRecord>): Promise<UserRecord | undefined> {
    const user = await this.findById(id);
    if (user) {
      Object.assign(user, updates, { updatedAt: new Date().toISOString() });
      this.users.set(user.email.toLowerCase(), user);
      return user;
    }
    return undefined;
  }

  public async saveRefreshToken(token: string): Promise<void> {
    this.refreshTokens.add(token);
  }

  public async isRefreshTokenValid(token: string): Promise<boolean> {
    return this.refreshTokens.has(token);
  }

  public async revokeRefreshToken(token: string): Promise<void> {
    this.refreshTokens.delete(token);
  }

  public async createResetToken(userId: string, token: string, ttlMs: number = 3600000): Promise<void> {
    this.resetTokens.set(token, { userId, expiresAt: Date.now() + ttlMs });
  }

  public async getResetToken(token: string): Promise<{ userId: string } | null> {
    const record = this.resetTokens.get(token);
    if (!record || record.expiresAt < Date.now()) {
      return null;
    }
    return { userId: record.userId };
  }

  public async deleteResetToken(token: string): Promise<void> {
    this.resetTokens.delete(token);
  }

  public async createVerifyToken(userId: string, token: string, ttlMs: number = 86400000): Promise<void> {
    this.verifyTokens.set(token, { userId, expiresAt: Date.now() + ttlMs });
  }

  public async getVerifyToken(token: string): Promise<{ userId: string } | null> {
    const record = this.verifyTokens.get(token);
    if (!record || record.expiresAt < Date.now()) {
      return null;
    }
    return { userId: record.userId };
  }

  public async deleteVerifyToken(token: string): Promise<void> {
    this.verifyTokens.delete(token);
  }
}

export const authStore = new MemoryAuthStore();
