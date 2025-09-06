// API route for individual user operations
import { NextRequest, NextResponse } from 'next/server';
import { UserController } from '@/controllers/UserController';

const userController = new UserController();

// GET /api/users/[id] - Get user by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  
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

    const user = sampleUsers.find(u => u.id === resolvedParams.id);
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user,
      message: 'Sample data - Configure Supabase for real data'
    });
  }

  const mockReq = {
    query: {},
    params: { id: resolvedParams.id },
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

    await userController.getUserById(mockReq, customRes);
    
    // If no response data was captured, return a default response
    if (!responseData) {
      return NextResponse.json({ 
        success: false, 
        error: 'No data returned from controller'
      }, { status: 500 });
    }
    
    return NextResponse.json(responseData);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/users/[id] - Update user
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const body = await request.json();

  const mockReq = {
    query: {},
    params: { id: resolvedParams.id },
    body,
  } as any;

  const mockRes = {
    status: (code: number) => ({
      json: (data: any) => NextResponse.json(data, { status: code }),
    }),
  } as any;

  try {
    await userController.updateUser(mockReq, mockRes);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/users/[id] - Delete user
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const mockReq = {
    query: {},
    params: { id: resolvedParams.id },
    body: {},
  } as any;

  const mockRes = {
    status: (code: number) => ({
      json: (data: any) => NextResponse.json(data, { status: code }),
    }),
  } as any;

  try {
    await userController.deleteUser(mockReq, mockRes);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}