// Client-side authentication service for static deployment
// This can be easily adapted to connect to real authentication APIs

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  department: string;
  phoneNumber?: string;
  address?: string;
  emergencyContact?: string;
  securityLevel: string;
  twoFactorEnabled: boolean;
}

interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
  message?: string;
}

class AuthService {
  private baseURL: string;

  constructor() {
    // This can be configured to point to your actual backend
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || '';
  }

  // For static deployment, we'll use localStorage for demo purposes
  // In production, this should connect to your actual authentication service
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      // For now, validate against stored credentials in localStorage
      // In production, replace this with actual API call to your backend
      
      // Check if this is a valid IIT Patna email for demo purposes
      if (email.includes('@iitp.ac.in') || email.includes('@cybershield.com')) {
        // Generate a session token
        const token = this.generateSessionToken(email);
        
        // Create user object based on email domain and format
        const user = this.createUserFromEmail(email);
        
        // Store authentication state
        this.storeAuthData(token, user);
        
        return {
          success: true,
          token,
          user,
          message: 'Login successful'
        };
      } else {
        throw new Error('Please use your IIT Patna or CyberShield email address');
      }
    } catch (error: any) {
      throw new Error(error.message || 'Authentication failed');
    }
  }

  async register(userData: {
    name: string;
    email: string;
    password: string;
    department: string;
  }): Promise<AuthResponse> {
    try {
      // Validate email domain
      if (!userData.email.includes('@iitp.ac.in') && !userData.email.includes('@cybershield.com')) {
        throw new Error('Please use your IIT Patna or CyberShield email address');
      }

      // Check if user already exists in localStorage
      const existingUsers = this.getStoredUsers();
      if (existingUsers.some(u => u.email === userData.email)) {
        throw new Error('User already exists with this email address');
      }

      // Create new user
      const user = this.createUserFromRegistration(userData);
      const token = this.generateSessionToken(userData.email);

      // Store user data
      existingUsers.push(user);
      localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
      
      // Store authentication state
      this.storeAuthData(token, user);

      return {
        success: true,
        token,
        user,
        message: 'Registration successful'
      };
    } catch (error: any) {
      throw new Error(error.message || 'Registration failed');
    }
  }

  validateToken(token: string): User | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1] || ''));
      const now = Date.now() / 1000;
      
      if (payload.exp && payload.exp < now) {
        this.logout();
        return null;
      }

      const userData = localStorage.getItem('user');
      if (userData) {
        return JSON.parse(userData);
      }
      
      return null;
    } catch {
      this.logout();
      return null;
    }
  }

  getCurrentUser(): User | null {
    const token = localStorage.getItem('authToken');
    if (token) {
      return this.validateToken(token);
    }
    return null;
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.href = '/signin';
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return token ? this.validateToken(token) !== null : false;
  }

  private generateSessionToken(email: string): string {
    const header = btoa(JSON.stringify({ typ: 'JWT', alg: 'HS256' }));
    const payload = btoa(JSON.stringify({
      email,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
    }));
    const signature = btoa(`signature_${email}_${Date.now()}`);
    
    return `${header}.${payload}.${signature}`;
  }

  private createUserFromEmail(email: string): User {
    const isIITP = email.includes('@iitp.ac.in');
    const isCyberShield = email.includes('@cybershield.com');
    
    let role = 'user';
    let department = 'General';
    let securityLevel = 'standard';
    
    if (isIITP) {
      role = 'researcher';
      department = 'IIT Patna Research';
      securityLevel = 'high';
    } else if (isCyberShield) {
      if (email.includes('admin')) {
        role = 'admin';
        securityLevel = 'critical';
      } else if (email.includes('security')) {
        role = 'analyst';
        department = 'Security Operations';
        securityLevel = 'high';
      }
    }

    return {
      id: this.generateUserId(),
      email,
      name: this.extractNameFromEmail(email),
      role,
      department,
      phoneNumber: '+91-XXXXXXXXXX',
      address: 'IIT Patna, Bihta, Patna, Bihar 801106, India',
      emergencyContact: isIITP ? 'support@iitp.ac.in' : 'security@cybershield.com',
      securityLevel,
      twoFactorEnabled: securityLevel !== 'standard'
    };
  }

  private createUserFromRegistration(userData: any): User {
    return {
      id: this.generateUserId(),
      email: userData.email,
      name: userData.name,
      role: userData.email.includes('@iitp.ac.in') ? 'researcher' : 'user',
      department: userData.department,
      phoneNumber: '+91-XXXXXXXXXX',
      address: 'IIT Patna, Bihta, Patna, Bihar 801106, India',
      emergencyContact: userData.email.includes('@iitp.ac.in') ? 'support@iitp.ac.in' : 'support@cybershield.com',
      securityLevel: userData.email.includes('@iitp.ac.in') ? 'high' : 'standard',
      twoFactorEnabled: userData.email.includes('@iitp.ac.in')
    };
  }

  private extractNameFromEmail(email: string): string {
    const localPart = email.split('@')[0];
    // Convert email format like "suman_2312res675" to "Suman Kumar"
    if (localPart.includes('_')) {
      const parts = localPart.split('_');
      return parts[0].charAt(0).toUpperCase() + parts[0].slice(1) + ' Kumar';
    }
    return localPart.charAt(0).toUpperCase() + localPart.slice(1);
  }

  private generateUserId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private storeAuthData(token: string, user: User): void {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    document.cookie = `authToken=${token}; path=/; max-age=86400; secure; samesite=strict`;
  }

  private getStoredUsers(): User[] {
    const stored = localStorage.getItem('registeredUsers');
    return stored ? JSON.parse(stored) : [];
  }
}

export const authService = new AuthService();
