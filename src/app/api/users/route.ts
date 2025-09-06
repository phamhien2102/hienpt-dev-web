// API route for users - demonstrating MVC pattern
import { NextRequest, NextResponse } from 'next/server';
import { UserController } from '@/controllers/UserController';
import { createCorsResponse, createCorsOptionsResponse } from '@/utils/cors';


const userController = new UserController();

// GET /api/users - Get all users
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  // Check if Supabase is properly configured
  const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && 
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co';

  if (!isSupabaseConfigured) {
    // Return sample data when Supabase is not configured
    const sampleUsers = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'user',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Bob Johnson',
        email: 'bob@example.com',
        role: 'moderator',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '4',
        name: 'Alice Brown',
        email: 'alice@example.com',
        role: 'user',
        isActive: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = sampleUsers.slice(startIndex, endIndex);

    return createCorsResponse({
      success: true,
      data: {
        data: paginatedUsers,
        total: sampleUsers.length,
        page,
        limit,
        totalPages: Math.ceil(sampleUsers.length / limit),
      },
      message: 'Sample data - Configure Supabase for real data'
    });
  }

  // Mock Express request/response for controller compatibility
  const mockReq = {
    query: { page: page.toString(), limit: limit.toString() },
    params: {},
    body: {},
  } as any;

  const mockRes = {
    status: (code: number) => ({
      json: (data: any) => NextResponse.json(data, { status: code }),
    }),
  } as any;

  try {
    // Create a custom response handler to capture the data
    let responseData = null;
    const customRes = {
      status: (code: number) => ({
        json: (data: any) => {
          responseData = data;
          return NextResponse.json(data, { status: code });
        },
      }),
    };

    await userController.getUsers(mockReq, customRes);
    
    // If no response data was captured, return a default response
    if (!responseData) {
      return createCorsResponse({ 
        success: true, 
        data: { data: [], total: 0, page: 1, limit: 10, totalPages: 0 },
        message: 'No data returned from controller'
      });
    }
    
    return createCorsResponse(responseData);
  } catch (error) {
    return createCorsResponse(
      { success: false, error: 'Internal server error' },
      500
    );
  }
}

// POST /api/users - Create new user
export async function POST(request: NextRequest) {
  const body = await request.json();

  const mockReq = {
    query: {},
    params: {},
    body,
  } as any;

  const mockRes = {
    status: (code: number) => ({
      json: (data: any) => createCorsResponse(data, code),
    }),
  } as any;

  try {
    await userController.createUser(mockReq, mockRes);
    return createCorsResponse({ success: true });
  } catch (error) {
    return createCorsResponse(
      { success: false, error: 'Internal server error' },
      500
    );
  }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return createCorsOptionsResponse();
}