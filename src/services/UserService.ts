// User service for handling user-related API calls
import { BaseService } from './BaseService';
import { User, CreateUserForm, UpdateUserForm, PaginatedResponse } from '@/types';

export class UserService extends BaseService {
  constructor(baseUrl: string = '/api/users') {
    super(baseUrl);
  }

  // Get all users with pagination
  async getUsers(page: number = 1, limit: number = 10): Promise<{ success: boolean; data?: PaginatedResponse<User>; error?: string }> {
    return this.get<PaginatedResponse<User>>('', { page: page.toString(), limit: limit.toString() });
  }

  // Get user by ID
  async getUserById(id: string): Promise<{ success: boolean; data?: User; error?: string }> {
    return this.get<User>(`/${id}`);
  }

  // Create new user
  async createUser(userData: CreateUserForm): Promise<{ success: boolean; data?: User; error?: string }> {
    return this.post<User>('', userData);
  }

  // Update user
  async updateUser(id: string, userData: UpdateUserForm): Promise<{ success: boolean; data?: User; error?: string }> {
    return this.put<User>(`/${id}`, userData);
  }

  // Delete user
  async deleteUser(id: string): Promise<{ success: boolean; error?: string }> {
    return this.delete(`/${id}`);
  }

  // Get users by role
  async getUsersByRole(role: string): Promise<{ success: boolean; data?: User[]; error?: string }> {
    return this.get<User[]>(`/role/${role}`);
  }

  // Get active users
  async getActiveUsers(): Promise<{ success: boolean; data?: User[]; error?: string }> {
    return this.get<User[]>('/active');
  }

  // Search users
  async searchUsers(query: string): Promise<{ success: boolean; data?: User[]; error?: string }> {
    return this.get<User[]>('/search', { q: query });
  }

  // Get user statistics
  async getUserStatistics(): Promise<{ success: boolean; data?: any; error?: string }> {
    return this.get('/statistics');
  }

  // Deactivate user
  async deactivateUser(id: string): Promise<{ success: boolean; data?: User; error?: string }> {
    return this.patch<User>(`/${id}/deactivate`);
  }

  // Activate user
  async activateUser(id: string): Promise<{ success: boolean; data?: User; error?: string }> {
    return this.patch<User>(`/${id}/activate`);
  }
}