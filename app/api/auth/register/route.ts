import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { findUserByEmail, addUser } from '@/lib/auth/users';

export async function POST(request: Request) {
  try {
    const { name, email, password, department } = await request.json();

    // Input validation
    if (!name || !email || !password || !department) {
      return NextResponse.json(
        { message: 'Name, email, password, and department are required' },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Password strength validation
    if (password.length < 8) {
      return NextResponse.json(
        { message: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Advanced password validation
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);

    if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
      return NextResponse.json(
        { message: 'Password must contain uppercase, lowercase, and numeric characters' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = findUserByEmail(email);
    
    if (existingUser) {
      return NextResponse.json(
        { message: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user with comprehensive data
    const newUser = addUser({
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
      role: 'analyst', // Default role for new users
      department,
      lastLogin: null
    });

    // Return success response (don't include password or sensitive data)
    return NextResponse.json({
      message: 'Account created successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        department: newUser.department,
        createdAt: newUser.createdAt,
        phoneNumber: newUser.phoneNumber,
        address: newUser.address,
        securityLevel: newUser.securityLevel,
        isActive: newUser.isActive
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed. Use POST to register a new user.' },
    { status: 405 }
  );
}
