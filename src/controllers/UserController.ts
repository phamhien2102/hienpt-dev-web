// User controller handling user-related operations
import { BaseController } from "./BaseController";

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
import { SupabaseUserModel } from "@/models/SupabaseUserModel";
import { CreateUserForm, UpdateUserForm } from "@/types";

export class UserController extends BaseController {
  private userModel: SupabaseUserModel;

  constructor() {
    super();
    this.userModel = new SupabaseUserModel();
  }

  // Get all users
  getUsers = async (req: Request, res: Response): Promise<void> => {
    await this.handleAsync(async () => {
      const { page, limit } = this.getPaginationParams(req);
      const result = await this.userModel.findWithPagination(page, limit);
      return result;
    }, res, "Failed to fetch users");
  };

  // Get user by ID
  getUserById = async (req: Request, res: Response): Promise<void> => {
    await this.handleAsync(async () => {
      const { id } = req.params;
      const user = await this.userModel.findById(id);
      
      if (!user) {
        throw new Error("User not found");
      }
      
      return user;
    }, res, "Failed to fetch user");
  };

  // Create new user
  createUser = async (req: Request, res: Response): Promise<void> => {
    await this.handleAsync(async () => {
      const userData: CreateUserForm = req.body;
      
      // Validate required fields
      const validationError = this.validateRequired(userData, ["name", "email", "role"]);
      if (validationError) {
        throw new Error(validationError);
      }

      const user = await this.userModel.createUser(userData);
      return user;
    }, res, "Failed to create user");
  };

  // Update user
  updateUser = async (req: Request, res: Response): Promise<void> => {
    await this.handleAsync(async () => {
      const { id } = req.params;
      const userData: UpdateUserForm = req.body;

      const user = await this.userModel.updateUser(id, userData);
      if (!user) {
        throw new Error("User not found");
      }

      return user;
    }, res, "Failed to update user");
  };

  // Delete user
  deleteUser = async (req: Request, res: Response): Promise<void> => {
    await this.handleAsync(async () => {
      const { id } = req.params;
      const deleted = await this.userModel.delete(id);
      
      if (!deleted) {
        throw new Error("User not found");
      }

      return { message: "User deleted successfully" };
    }, res, "Failed to delete user");
  };

  // Get users by role
  getUsersByRole = async (req: Request, res: Response): Promise<void> => {
    await this.handleAsync(async () => {
      const { role } = req.params;
      const users = await this.userModel.findByRole(role as any);
      return users;
    }, res, "Failed to fetch users by role");
  };

  // Get active users
  getActiveUsers = async (req: Request, res: Response): Promise<void> => {
    await this.handleAsync(async () => {
      const users = await this.userModel.findActiveUsers();
      return users;
    }, res, "Failed to fetch active users");
  };

  // Search users
  searchUsers = async (req: Request, res: Response): Promise<void> => {
    await this.handleAsync(async () => {
      const { q } = req.query;
      if (!q || typeof q !== "string") {
        throw new Error("Search query is required");
      }

      const users = await this.userModel.search(q, ["name", "email"]);
      return users;
    }, res, "Failed to search users");
  };

  // Get user statistics
  getUserStatistics = async (req: Request, res: Response): Promise<void> => {
    await this.handleAsync(async () => {
      const stats = await this.userModel.getStatistics();
      return stats;
    }, res, "Failed to fetch user statistics");
  };

  // Deactivate user
  deactivateUser = async (req: Request, res: Response): Promise<void> => {
    await this.handleAsync(async () => {
      const { id } = req.params;
      const user = await this.userModel.deactivateUser(id);
      
      if (!user) {
        throw new Error("User not found");
      }

      return user;
    }, res, "Failed to deactivate user");
  };

  // Activate user
  activateUser = async (req: Request, res: Response): Promise<void> => {
    await this.handleAsync(async () => {
      const { id } = req.params;
      const user = await this.userModel.activateUser(id);
      
      if (!user) {
        throw new Error("User not found");
      }

      return user;
    }, res, "Failed to activate user");
  };
}