// Authentication hook for client-side protection
"use client";

import { useEffect, useState } from 'react';
import { authService } from '@/src/services/auth';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  department: string;
  securityLevel: string;
  twoFactorEnabled: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for storage changes (login/logout from other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'authToken' || e.key === 'user') {
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const result = await authService.login(email, password);
      if (result.success) {
        setUser(result.user);
        setIsAuthenticated(true);
        return result;
      }
      throw new Error(result.message);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    user,
    loading,
    isAuthenticated,
    login,
    logout
  };
}

// Role-based access control
export function usePermissions() {
  const { user } = useAuth();

  const hasRole = (requiredRole: string | string[]) => {
    if (!user) return false;
    
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    return roles.includes(user.role);
  };

  const hasSecurityLevel = (requiredLevel: string) => {
    if (!user) return false;
    
    const levels = ['standard', 'high', 'critical'];
    const userLevelIndex = levels.indexOf(user.securityLevel);
    const requiredLevelIndex = levels.indexOf(requiredLevel);
    
    return userLevelIndex >= requiredLevelIndex;
  };

  const canAccess = (requiredPermissions: {
    roles?: string[];
    securityLevel?: string;
  }) => {
    if (!user) return false;

    if (requiredPermissions.roles && !hasRole(requiredPermissions.roles)) {
      return false;
    }

    if (requiredPermissions.securityLevel && !hasSecurityLevel(requiredPermissions.securityLevel)) {
      return false;
    }

    return true;
  };

  return {
    user,
    hasRole,
    hasSecurityLevel,
    canAccess,
    isAdmin: hasRole('admin'),
    isAnalyst: hasRole(['admin', 'analyst']),
    isResearcher: hasRole(['admin', 'analyst', 'researcher'])
  };
}
