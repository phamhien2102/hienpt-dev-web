// API route for posts - demonstrating MVC pattern
import { NextRequest, NextResponse } from 'next/server';
import { PostController } from '@/controllers/PostController';
import { createCorsResponse, createCorsOptionsResponse } from '@/utils/cors';


const postController = new PostController();

// GET /api/posts - Get all posts
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  // Check if Supabase is properly configured
  const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && 
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co';

  if (!isSupabaseConfigured) {
    // Return sample data when Supabase is not configured
    const samplePosts = [
      {
        id: '1',
        title: 'Welcome to MVC Architecture',
        content: 'This is a comprehensive guide to understanding Model-View-Controller pattern in modern web development.',
        authorId: '1',
        published: true,
        tags: ['architecture', 'mvc', 'web-development'],
        image: 'https://picsum.photos/seed/mvc-architecture/600/400',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Getting Started with Supabase',
        content: 'Learn how to integrate Supabase with your Next.js application for a complete backend solution.',
        authorId: '2',
        published: true,
        tags: ['supabase', 'nextjs', 'database'],
        image: 'https://picsum.photos/seed/supabase/600/400',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '3',
        title: 'TypeScript Best Practices',
        content: 'Essential TypeScript patterns and practices for building scalable applications.',
        authorId: '3',
        published: false,
        tags: ['typescript', 'programming', 'best-practices'],
        image: 'https://picsum.photos/seed/typescript/600/400',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '4',
        title: 'React Hooks Deep Dive',
        content: 'Understanding React hooks and their advanced usage patterns.',
        authorId: '4',
        published: true,
        tags: ['react', 'hooks', 'frontend'],
        image: 'https://picsum.photos/seed/react-hooks/600/400',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '5',
        title: 'Building Scalable Web Applications',
        content: 'Learn the principles and patterns for building web applications that can grow with your business needs.',
        authorId: '1',
        published: true,
        tags: ['scalability', 'architecture', 'web-development'],
        image: 'https://picsum.photos/seed/scalable/600/400',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '6',
        title: 'Modern CSS Techniques',
        content: 'Explore the latest CSS features and techniques for creating beautiful, responsive designs.',
        authorId: '2',
        published: true,
        tags: ['css', 'design', 'frontend'],
        image: 'https://picsum.photos/seed/css/600/400',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = samplePosts.slice(startIndex, endIndex);

    return createCorsResponse({
      success: true,
      data: {
        data: paginatedPosts,
        total: samplePosts.length,
        page,
        limit,
        totalPages: Math.ceil(samplePosts.length / limit),
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

    await postController.getPosts(mockReq, customRes);
    
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

// POST /api/posts - Create new post
export async function POST(request: NextRequest) {
  const body = await request.json();

  // Check if Supabase is properly configured
  const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && 
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co';

  if (!isSupabaseConfigured) {
    return createCorsResponse({
      success: false,
      error: 'Supabase not configured. Please set up Supabase to create posts.'
    }, 400);
  }

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
    // Create a custom response handler to capture the data
    let responseData = null;
    const customRes = {
      status: (code: number) => ({
        json: (data: any) => {
          responseData = data;
          return createCorsResponse(data, code);
        },
      }),
    };

    await postController.createPost(mockReq, customRes);
    
    // If no response data was captured, return a default response
    if (!responseData) {
      return createCorsResponse({ 
        success: false, 
        error: 'No data returned from controller'
      }, 500);
    }
    
    return createCorsResponse(responseData);
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