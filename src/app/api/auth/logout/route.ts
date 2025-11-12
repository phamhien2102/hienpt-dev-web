// Logout API route
import { NextRequest, NextResponse } from "next/server";
import { createCorsResponse, createCorsOptionsResponse } from "@/utils/cors";

// POST /api/auth/logout - User logout
export async function POST(request: NextRequest) {
  try {
    // Create response
    const response = createCorsResponse({
      success: true,
      message: "Logout successful"
    }, 200);
    
    // Clear the auth cookie
    response.cookies.set("auth-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0 // Expire immediately
    });

    return response;

  } catch (error) {
    console.error("Logout error:", error);
    return createCorsResponse({
      success: false,
      error: "Internal server error"
    }, 500);
  }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return createCorsOptionsResponse();
}