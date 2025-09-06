// Authentication API route
import { NextRequest, NextResponse } from 'next/server';
import { createCorsResponse, createCorsOptionsResponse } from '@/utils/cors';
import { LoginRequest, LoginResponse, User } from '@/types';

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

// POST /api/auth/login - User login
export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return createCorsResponse({
        success: false,
        error: 'Email and password are required'
      }, 400);
    }

    // Find user by email
    const user = ADMIN_USERS.find(u => u.email === email);
    
    if (!user) {
      return createCorsResponse({
        success: false,
        error: 'Invalid email or password'
      }, 401);
    }

    // Check password
    if (user.password !== password) {
      return createCorsResponse({
        success: false,
        error: 'Invalid email or password'
      }, 401);
    }

    // Check if user is active
    if (!user.isActive) {
      return createCorsResponse({
        success: false,
        error: 'Account is deactivated'
      }, 401);
    }

    // Create user response (without password)
    const userResponse: User = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    // Generate a simple token (in production, use JWT)
    const token = Buffer.from(`${user.id}:${Date.now()}`).toString('base64');

    const response: LoginResponse = {
      success: true,
      user: userResponse,
      token,
      message: 'Login successful'
    };

    // Create response with CORS headers
    const corsResponse = createCorsResponse(response, 200);
    
    // Set HTTP-only cookie for token (more secure than localStorage)
    corsResponse.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return corsResponse;

  } catch (error) {
    console.error('Login error:', error);
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