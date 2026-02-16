import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUserByEmail, updateUserLastLogin, incrementFailedLoginAttempts, isAccountLocked } from '@/lib/auth/users';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';

    // Input validation
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = findUserByEmail(email);
    
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check if user is active
    if (!user.isActive) {
      return NextResponse.json(
        { message: 'Account is disabled. Contact administrator.' },
        { status: 403 }
      );
    }

    // Check if account is locked
    if (isAccountLocked(user)) {
      return NextResponse.json(
        { message: 'Account is temporarily locked due to multiple failed attempts. Try again later.' },
        { status: 423 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      // Increment failed login attempts
      incrementFailedLoginAttempts(email);
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Update last login with comprehensive tracking
    updateUserLastLogin(user.id, clientIP);

    // Create JWT token with extended user info
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role,
        name: user.name,
        department: user.department,
        securityLevel: user.securityLevel
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return success response with comprehensive user data
    return NextResponse.json({
      message: 'Authentication successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        department: user.department,
        lastLogin: user.lastLogin,
        loginCount: user.loginCount,
        securityLevel: user.securityLevel,
        twoFactorEnabled: user.twoFactorEnabled,
        phoneNumber: user.phoneNumber,
        address: user.address,
        isActive: user.isActive
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed. Use POST to authenticate.' },
    { status: 405 }
  );
}
