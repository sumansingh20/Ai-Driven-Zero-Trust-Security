import { NextResponse } from 'next/server';
import { getAllUsers, getUserStats, findUserById } from '@/lib/auth/users';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';

// Middleware to verify admin access
const verifyAdminAccess = (request: Request) => {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  try {
    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const user = findUserById(decoded.userId);
    
    if (!user || user.role !== 'admin') {
      return null;
    }
    
    return user;
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
};

export async function GET(request: Request) {
  try {
    const user = verifyAdminAccess(request);
    
    if (!user) {
      return NextResponse.json(
        { message: 'Admin access required' },
        { status: 403 }
      );
    }

    const users = getAllUsers();
    const stats = getUserStats();

    return NextResponse.json({
      message: 'Users retrieved successfully',
      users,
      statistics: stats
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
