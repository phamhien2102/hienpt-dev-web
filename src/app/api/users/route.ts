// API route for users - demonstrating MVC pattern
import { NextRequest, NextResponse } from 'next/server';
import { UserController } from '@/controllers/UserController';

const userController = new UserController();

// GET /api/users - Get all users
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

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
    await userController.getUsers(mockReq, mockRes);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
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
      json: (data: any) => NextResponse.json(data, { status: code }),
    }),
  } as any;

  try {
    await userController.createUser(mockReq, mockRes);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}