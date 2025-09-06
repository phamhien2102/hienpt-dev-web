// Get current user profile API route
import { NextRequest, NextResponse } from 'next/server';
import { createCorsResponse, createCorsOptionsResponse } from '@/utils/cors';
import { User } from '@/types';

// Mock admin users - In production, this would be stored in a database
const ADMIN_USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123', // In production, this should be hashed
    role: 'admin' as const,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'user' as const,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Helper function to get user from token
function getUserFromToken(token: string): User | null {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [userId] = decoded.split(':');
    
    const user = ADMIN_USERS.find(u => u.id === userId);
    if (!user || !user.isActive) {
      return null;
    }

    // Return user without password
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  } catch (error) {
    return null;
  }
}

// GET /api/auth/me - Get current user profile
export async function GET(request: NextRequest) {
  try {
    // Get token from cookie
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      return createCorsResponse({
        success: false,
        error: 'No authentication token found'
      }, 401);
    }

    // Verify token and get user
    const user = getUserFromToken(token);
    
    if (!user) {
      return createCorsResponse({
        success: false,
        error: 'Invalid or expired token'
      }, 401);
    }

    return createCorsResponse({
      success: true,
      data: user,
      message: 'User profile retrieved successfully'
    }, 200);

  } catch (error) {
    console.error('Get user profile error:', error);
    return createCorsResponse({
      success: false,
      error: 'Internal server error'
    }, 500);
  }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return createCorsOptionsResponse();
}