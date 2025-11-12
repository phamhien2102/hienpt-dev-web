// Base controller class that all other controllers extend
import { ApiResponse } from "@/types";

// Mock Express types for Next.js compatibility
interface Request {
  query: Record<string, string>;
  params: Record<string, string>;
  body: any;
}

interface Response {
  status: (code: number) => {
    json: (data: any) => void;
  };
}

export abstract class BaseController {
  // Success response helper
  protected success<T>(res: Response, data: T, message?: string, statusCode: number = 200): void {
    const response: ApiResponse<T> = {
      success: true,
      data,
      message,
    };
    res.status(statusCode).json(response);
  }

  // Error response helper
  protected error(res: Response, error: string, statusCode: number = 400): void {
    const response: ApiResponse<null> = {
      success: false,
      error,
    };
    res.status(statusCode).json(response);
  }

  // Validation helper
  protected validateRequired(data: any, fields: string[]): string | null {
    for (const field of fields) {
      if (data[field] === undefined || data[field] === null || data[field] === "") {
        return `${field} is required`;
      }
    }
    return null;
  }

  // Pagination helper
  protected getPaginationParams(req: Request): { page: number; limit: number } {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    return { page: Math.max(1, page), limit: Math.min(100, Math.max(1, limit)) };
  }

  // Handle async operations with error catching
  protected async handleAsync<T>(
    operation: () => Promise<T>,
    res: Response,
    errorMessage: string = "An error occurred"
  ): Promise<void> {
    try {
      const result = await operation();
      this.success(res, result);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : errorMessage;
      this.error(res, errorMsg, 500);
    }
  }
}