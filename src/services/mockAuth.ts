// Mock authentication for static deployment
const mockUsers = [
  {
    id: 1,
    email: "admin@cybershield.com",
    password: "admin123", // In real app, this would be hashed
    name: "Administrator",
    role: "admin",
    department: "IT Security",
    phoneNumber: "+917903835951",
    address: "IIT Patna, Bihta, Patna, Bihar 801106, India",
    emergencyContact: "security-team@cybershield.com",
    securityLevel: "critical",
    twoFactorEnabled: true
  },
  {
    id: 2,
    email: "security@cybershield.com", 
    password: "security123",
    name: "Security Analyst",
    role: "analyst",
    department: "SOC",
    phoneNumber: "+917903835951",
    address: "IIT Patna, Bihta, Patna, Bihar 801106, India",
    emergencyContact: "soc-team@cybershield.com",
    securityLevel: "high",
    twoFactorEnabled: false
  },
  {
    id: 3,
    email: "suman@iitp.ac.in",
    password: "suman123",
    name: "Suman Kumar", 
    role: "researcher",
    department: "AI Research",
    phoneNumber: "+917903835951",
    address: "IIT Patna, Bihta, Patna, Bihar 801106, India",
    emergencyContact: "research-team@iitp.ac.in",
    securityLevel: "high",
    twoFactorEnabled: true
  }
];

export const mockAuthService = {
  login: async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      const token = btoa(`${user.id}:${Date.now()}`); // Simple token generation
      const userWithoutPassword = { ...user };
      delete (userWithoutPassword as any).password;
      
      return {
        success: true,
        token,
        user: userWithoutPassword
      };
    } else {
      throw new Error('Invalid email or password');
    }
  },

  register: async (userData: any) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('User already exists with this email');
    }
    
    // Create new user
    const newUser = {
      id: mockUsers.length + 1,
      ...userData,
      role: 'user',
      securityLevel: 'standard',
      twoFactorEnabled: false,
      createdAt: new Date().toISOString()
    };
    
    mockUsers.push(newUser);
    
    const token = btoa(`${newUser.id}:${Date.now()}`);
    const userWithoutPassword = { ...newUser };
    delete (userWithoutPassword as any).password;
    
    return {
      success: true,
      token,
      user: userWithoutPassword
    };
  },

  validateToken: (token: string) => {
    try {
      const decoded = atob(token);
      const [userId, timestamp] = decoded.split(':');
      const tokenAge = Date.now() - parseInt(timestamp);
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours
      
      if (tokenAge > maxAge) {
        return null;
      }
      
      const user = mockUsers.find(u => u.id === parseInt(userId));
      if (user) {
        const userWithoutPassword = { ...user };
        delete (userWithoutPassword as any).password;
        return userWithoutPassword;
      }
      
      return null;
    } catch {
      return null;
    }
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  },

  getCurrentUser: () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      return mockAuthService.validateToken(token);
    }
    return null;
  },

  // Demo credentials for easy access
  getDemoCredentials: () => ({
    admin: { email: "admin@cybershield.com", password: "admin123" },
    analyst: { email: "security@cybershield.com", password: "security123" },
    researcher: { email: "suman@iitp.ac.in", password: "suman123" }
  })
};
