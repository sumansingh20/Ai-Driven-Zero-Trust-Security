xport type UserRole = 'admin' | 'analyst' | 'user';
export type ModuleStatus = 'active' | 'inactive' | 'maintenance';
export type PriorityLevel = 'low' | 'medium' | 'high' | 'critical';
export type SeverityLevel = 'low' | 'medium' | 'high' | 'critical';
export type AlertType = 'critical' | 'warning' | 'info';
export type ScanStatus = 'pending' | 'running' | 'completed' | 'failed';
export type ToolCategory = 'reconnaissance' | 'exploitation' | 'post-exploitation' | 'forensics';
export type ParameterType = 'string' | 'number' | 'boolean' | 'select';
export type ScanType = 'port' | 'vulnerability' | 'full';
export type ResultType = 'open_port' | 'vulnerability' | 'service';
export type AnomalyType = 'login_time' | 'location' | 'access_pattern' | 'data_volume';
export type Theme = 'dark' | 'light';

export interface UserInfo {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  department: string;
  lastLogin?: string;
  permissions?: string[];
}

export interface SecurityModule {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: any; // LucideIcon type
  status: ModuleStatus;
  threats: number;
  priority: PriorityLevel;
}

export interface RealTimeStats {
  activeSessions: number;
  blockedThreats: number;
  vulnerabilities: number;
  systemUptime: number;
  networkTraffic: number;
  aiAccuracy: number;
  responseTime: number;
}

export interface ThreatAlert {
  id: string;
  type: AlertType;
  title: string;
  description: string;
  timestamp: string;
  actionUrl?: string;
  acknowledged: boolean;
}

export interface ExploitData {
  id: string;
  cve: string;
  name: string;
  description: string;
  severity: SeverityLevel;
  category: string;
  publishedDate: string;
  modifiedDate: string;
  cvssScore: number;
  affectedSystems: string[];
  exploitCode?: string;
  references: string[];
}

export interface NetworkScan {
  id: string;
  target: string;
  type: ScanType;
  status: ScanStatus;
  startTime: string;
  endTime?: string;
  results: ScanResult[];
}

export interface ScanResult {
  id: string;
  type: ResultType;
  severity: SeverityLevel;
  description: string;
  port?: number;
  service?: string;
  version?: string;
  recommendation?: string;
}

export interface PentestTool {
  id: string;
  name: string;
  category: ToolCategory;
  description: string;
  command: string;
  parameters: ToolParameter[];
  riskLevel: SeverityLevel;
}

export interface ToolParameter {
  name: string;
  type: ParameterType;
  required: boolean;
  description: string;
  options?: string[];
  defaultValue?: any;
}

export interface UserBehaviorPattern {
  userId: string;
  userName: string;
  department: string;
  riskScore: number;
  anomalies: BehaviorAnomaly[];
  lastActivity: string;
  normalPatterns: string[];
}

export interface BehaviorAnomaly {
  id: string;
  type: AnomalyType;
  severity: SeverityLevel;
  description: string;
  timestamp: string;
  confidence: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp: string;
}

export interface AuthContextType {
  user: UserInfo | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<UserInfo>) => void;
}

export interface DashboardConfig {
  refreshInterval: number;
  maxAlerts: number;
  defaultView: string;
  theme: Theme;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

export interface SystemMetrics {
  cpu: number;
  memory: number;
  disk: number;
  network: {
    inbound: number;
    outbound: number;
  };
  connections: number;
  uptime: number;
}

export interface OperationResult {
  success: boolean;
  message: string;
  data?: any;
  timestamp?: string;
  metadata?: {
    executionTime?: number;
    resourcesUsed?: string[];
    riskLevel?: SeverityLevel;
    detectionLikelihood?: number;
  };
}
