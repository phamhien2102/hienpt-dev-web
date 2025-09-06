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
    await userController.getUserById(mockReq, mockRes);
    return NextResponse.json({ success: true });
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