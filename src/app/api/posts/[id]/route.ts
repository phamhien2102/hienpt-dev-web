// API route for individual post operations
import { NextRequest, NextResponse } from "next/server";
import { PostController } from "@/controllers/PostController";
import { createCorsResponse, createCorsOptionsResponse } from "@/utils/cors";


const postController = new PostController();

// GET /api/posts/[id] - Get post by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  
  // Check if Supabase is properly configured
  const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && 
    process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co";

  if (!isSupabaseConfigured) {
    // Return sample data when Supabase is not configured
    const samplePosts = [
      {
        id: "1",
        title: "Welcome to MVC Architecture",
        content: "This is a comprehensive guide to understanding Model-View-Controller pattern in modern web development.",
        authorId: "1",
        published: true,
        tags: ["architecture", "mvc", "web-development"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: "2",
        title: "Getting Started with Supabase",
        content: "Learn how to integrate Supabase with your Next.js application for a complete backend solution.",
        authorId: "2",
        published: true,
        tags: ["supabase", "nextjs", "database"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: "3",
        title: "TypeScript Best Practices",
        content: "Essential TypeScript patterns and practices for building scalable applications.",
        authorId: "3",
        published: false,
        tags: ["typescript", "programming", "best-practices"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: "4",
        title: "React Hooks Deep Dive",
        content: "Understanding React hooks and their advanced usage patterns.",
        authorId: "4",
        published: true,
        tags: ["react", "hooks", "frontend"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    const post = samplePosts.find(p => p.id === resolvedParams.id);
    
    if (!post) {
      return createCorsResponse(
        { success: false, error: "Post not found" },
        404
      );
    }

    return createCorsResponse({
      success: true,
      data: post,
      message: "Sample data - Configure Supabase for real data"
    });
  }

  const mockReq = {
    query: {},
    params: { id: resolvedParams.id },
    body: {},
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

    await postController.getPostById(mockReq, customRes);
    
    // If no response data was captured, return a default response
    if (!responseData) {
      return createCorsResponse({ 
        success: false, 
        error: "No data returned from controller"
      }, 500);
    }
    
    return createCorsResponse(responseData);
  } catch (error) {
    return createCorsResponse(
      { success: false, error: "Internal server error" },
      500
    );
  }
}

// PUT /api/posts/[id] - Update post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const body = await request.json();

  // Check if Supabase is properly configured
  const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && 
    process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co";

  if (!isSupabaseConfigured) {
    return createCorsResponse({
      success: false,
      error: "Supabase not configured. Please set up Supabase to update posts."
    }, 400);
  }

  const mockReq = {
    query: {},
    params: { id: resolvedParams.id },
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

    await postController.updatePost(mockReq, customRes);
    
    // If no response data was captured, return a default response
    if (!responseData) {
      return createCorsResponse({ 
        success: false, 
        error: "No data returned from controller"
      }, 500);
    }
    
    return createCorsResponse(responseData);
  } catch (error) {
    return createCorsResponse(
      { success: false, error: "Internal server error" },
      500
    );
  }
}

// DELETE /api/posts/[id] - Delete post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;

  // Check if Supabase is properly configured
  const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && 
    process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co";

  if (!isSupabaseConfigured) {
    return createCorsResponse({
      success: false,
      error: "Supabase not configured. Please set up Supabase to delete posts."
    }, 400);
  }

  const mockReq = {
    query: {},
    params: { id: resolvedParams.id },
    body: {},
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

    await postController.deletePost(mockReq, customRes);
    
    // If no response data was captured, return a default response
    if (!responseData) {
      return createCorsResponse({ 
        success: false, 
        error: "No data returned from controller"
      }, 500);
    }
    
    return createCorsResponse(responseData);
  } catch (error) {
    return createCorsResponse(
      { success: false, error: "Internal server error" },
      500
    );
  }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return createCorsOptionsResponse();
}