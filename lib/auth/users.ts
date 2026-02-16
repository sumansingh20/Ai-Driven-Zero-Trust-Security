import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  department: string;
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  loginCount: number;
  lastIpAddress: string | null;
  profilePicture: string | null;
  phoneNumber: string | null;
  address: string | null;
  emergencyContact: string | null;
  securityLevel: 'low' | 'medium' | 'high' | 'critical';
  twoFactorEnabled: boolean;
  failedLoginAttempts: number;
  accountLockedUntil: string | null;
}

// Data file path
const DATA_FILE = join(process.cwd(), 'data', 'users.json');

// Ensure data directory exists
const ensureDataDirectory = () => {
  const dataDir = join(process.cwd(), 'data');
  if (!existsSync(dataDir)) {
    require('fs').mkdirSync(dataDir, { recursive: true });
  }
};

// Default users with comprehensive data
export const defaultUsers: User[] = [
  {
    id: 1,
    email: 'admin@cybershield.com',
    password: '$2b$12$CKprj0l0Utd9ju7qBGMEledIxjjHD0xhCOQqkW7LfKKw6jMqdSZuG', // hashed: admin123
    name: 'Administrator',
    role: 'admin',
    department: 'IT Security',
    lastLogin: null,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    isActive: true,
    loginCount: 0,
    lastIpAddress: null,
    profilePicture: null,
    phoneNumber: '+917903835951',
    address: 'IIT Patna, Bihta, Patna, Bihar 801106, India',
    emergencyContact: 'security-team@cybershield.com',
    securityLevel: 'critical',
    twoFactorEnabled: true,
    failedLoginAttempts: 0,
    accountLockedUntil: null
  },
  {
    id: 2,
    email: 'security@cybershield.com',
    password: '$2b$12$QwPvvbu56y6L8tizdMfn.ek5VF1rCkLAaVtnQv87herdTetMvhJ72', // hashed: security123
    name: 'Security Analyst',
    role: 'analyst',
    department: 'SOC',
    lastLogin: null,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    isActive: true,
    loginCount: 0,
    lastIpAddress: null,
    profilePicture: null,
    phoneNumber: '+917903835951',
    address: 'IIT Patna, Bihta, Patna, Bihar 801106, India',
    emergencyContact: 'soc-team@cybershield.com',
    securityLevel: 'high',
    twoFactorEnabled: false,
    failedLoginAttempts: 0,
    accountLockedUntil: null
  }
];

// Load users from file or use defaults
const loadUsers = (): User[] => {
  try {
    if (existsSync(DATA_FILE)) {
      const data = readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(data);
    } else {
      // Save default users to file
      ensureDataDirectory();
      saveUsers(defaultUsers);
      return [...defaultUsers];
    }
  } catch (error) {
    console.error('Error loading users:', error);
    return [...defaultUsers];
  }
};

// Save users to file
const saveUsers = (users: User[]): void => {
  try {
    ensureDataDirectory();
    writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error saving users:', error);
  }
};

// Initialize users array
export let users: User[] = loadUsers();

// Helper functions for user management
export const findUserByEmail = (email: string): User | undefined => {
  return users.find(u => u.email.toLowerCase() === email.toLowerCase());
};

export const findUserById = (id: number): User | undefined => {
  return users.find(u => u.id === id);
};

export const getAllUsers = (): Omit<User, 'password'>[] => {
  return users.map(user => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });
};

export const addUser = (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'isActive' | 'loginCount' | 'lastIpAddress' | 'profilePicture' | 'phoneNumber' | 'address' | 'emergencyContact' | 'securityLevel' | 'twoFactorEnabled' | 'failedLoginAttempts' | 'accountLockedUntil'>): User => {
  const now = new Date().toISOString();
  const newUser: User = {
    ...userData,
    id: Math.max(...users.map(u => u.id), 0) + 1,
    createdAt: now,
    updatedAt: now,
    isActive: true,
    loginCount: 0,
    lastIpAddress: null,
    profilePicture: null,
    phoneNumber: null,
    address: null,
    emergencyContact: null,
    securityLevel: 'medium',
    twoFactorEnabled: false,
    failedLoginAttempts: 0,
    accountLockedUntil: null
  };
  users.push(newUser);
  saveUsers(users);
  return newUser;
};

export const updateUserLastLogin = (userId: number, ipAddress?: string): void => {
  const user = users.find(u => u.id === userId);
  if (user) {
    user.lastLogin = new Date().toISOString();
    user.updatedAt = new Date().toISOString();
    user.loginCount += 1;
    user.failedLoginAttempts = 0; // Reset failed attempts on successful login
    if (ipAddress) {
      user.lastIpAddress = ipAddress;
    }
    saveUsers(users);
  }
};

export const updateUserProfile = (userId: number, updates: Partial<Pick<User, 'name' | 'department' | 'phoneNumber' | 'address' | 'emergencyContact'>>): boolean => {
  const user = users.find(u => u.id === userId);
  if (user) {
    Object.assign(user, updates);
    user.updatedAt = new Date().toISOString();
    saveUsers(users);
    return true;
  }
  return false;
};

export const incrementFailedLoginAttempts = (email: string): void => {
  const user = findUserByEmail(email);
  if (user) {
    user.failedLoginAttempts += 1;
    user.updatedAt = new Date().toISOString();
    
    // Lock account after 5 failed attempts for 15 minutes
    if (user.failedLoginAttempts >= 5) {
      const lockUntil = new Date();
      lockUntil.setMinutes(lockUntil.getMinutes() + 15);
      user.accountLockedUntil = lockUntil.toISOString();
    }
    
    saveUsers(users);
  }
};

export const isAccountLocked = (user: User): boolean => {
  if (!user.accountLockedUntil) return false;
  
  const lockUntil = new Date(user.accountLockedUntil);
  const now = new Date();
  
  if (now < lockUntil) {
    return true;
  } else {
    // Auto-unlock expired lock
    user.accountLockedUntil = null;
    user.failedLoginAttempts = 0;
    saveUsers(users);
    return false;
  }
};

export const toggleUserStatus = (userId: number): boolean => {
  const user = users.find(u => u.id === userId);
  if (user) {
    user.isActive = !user.isActive;
    user.updatedAt = new Date().toISOString();
    saveUsers(users);
    return true;
  }
  return false;
};

export const getUserStats = () => {
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.isActive).length;
  const adminUsers = users.filter(u => u.role === 'admin').length;
  const analystUsers = users.filter(u => u.role === 'analyst').length;
  const recentLogins = users.filter(u => {
    if (!u.lastLogin) return false;
    const lastLogin = new Date(u.lastLogin);
    const dayAgo = new Date();
    dayAgo.setDate(dayAgo.getDate() - 1);
    return lastLogin > dayAgo;
  }).length;

  return {
    totalUsers,
    activeUsers,
    adminUsers,
    analystUsers,
    recentLogins,
    inactiveUsers: totalUsers - activeUsers
  };
};
