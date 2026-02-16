export const APP_CONFIG = {
  name: 'CyberShield',
  version: '2.0.0',
  description: 'AI-Driven Zero Trust Cybersecurity Platform',
  author: 'Suman Kumar - IIT Patna',
  repository: 'AI-driven Zero Trust',
} as const;

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 30000,
  retries: 3,
} as const;

export const DASHBOARD_CONFIG = {
  refreshInterval: 3000,
  maxAlerts: 50,
  defaultView: 'overview',
  theme: 'dark',
  notifications: {
    email: true,
    push: true,
    sms: false,
  },
} as const;

export const SECURITY_CONFIG = {
  passwordMinLength: 8,
  sessionTimeout: 1800000, // 30 minutes
  maxLoginAttempts: 5,
  lockoutDuration: 900000, // 15 minutes
} as const;

export const THREAT_LEVELS = {
  LOW: { value: 1, color: 'green', label: 'Low' },
  MEDIUM: { value: 2, color: 'yellow', label: 'Medium' },
  HIGH: { value: 3, color: 'orange', label: 'High' },
  CRITICAL: { value: 4, color: 'red', label: 'Critical' },
} as const;

export const SCAN_TYPES = {
  PORT: 'port',
  VULNERABILITY: 'vulnerability',
  FULL: 'full',
} as const;

export const USER_ROLES = {
  ADMIN: 'admin',
  ANALYST: 'analyst',
  USER: 'user',
} as const;

export const MODULE_CATEGORIES = {
  RECONNAISSANCE: 'reconnaissance',
  EXPLOITATION: 'exploitation',
  POST_EXPLOITATION: 'post-exploitation',
  FORENSICS: 'forensics',
} as const;

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
  },
  DASHBOARD: {
    STATS: '/dashboard/stats',
    ALERTS: '/dashboard/alerts',
  },
  EXPLOITS: {
    LIST: '/exploits',
    SEARCH: '/exploits/search',
    EXECUTE: '/exploits/execute',
  },
  SCANS: {
    CREATE: '/scans',
    LIST: '/scans',
    RESULTS: '/scans/{id}/results',
  },
  USERS: {
    PROFILE: '/users/profile',
    BEHAVIOR: '/users/behavior',
  },
} as const;

export const STORAGE_KEYS = {
  USER: 'cybershield_user',
  TOKEN: 'cybershield_token',
  SETTINGS: 'cybershield_settings',
  THEME: 'cybershield_theme',
} as const;

export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  IP_ADDRESS: /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
  DOMAIN: /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)*[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/,
  PORT: /^(?:[1-9]\d{0,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
} as const;

export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
} as const;

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network connection failed. Please check your internet connection.',
  UNAUTHORIZED: 'Authentication failed. Please log in again.',
  FORBIDDEN: 'Access denied. You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Internal server error. Please try again later.',
  VALIDATION_ERROR: 'Invalid input data. Please check your entries.',
} as const;

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Successfully logged in',
  LOGOUT_SUCCESS: 'Successfully logged out',
  SCAN_STARTED: 'Security scan initiated successfully',
  EXPLOIT_EXECUTED: 'Exploit executed successfully',
  SETTINGS_SAVED: 'Settings saved successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
} as const;

export const ENVIRONMENT = {
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
} as const;
