// User model extending BaseModel
import { BaseModel } from './BaseModel';
import { User, CreateUserForm, UpdateUserForm } from '@/types';

export class UserModel extends BaseModel<User> {
  // Find user by email
  async findByEmail(email: string): Promise<User | null> {
    return this.data.find(user => user.email === email) || null;
  }

  // Find users by role
  async findByRole(role: User['role']): Promise<User[]> {
    return this.data.filter(user => user.role === role);
  }

  // Find active users
  async findActiveUsers(): Promise<User[]> {
    return this.data.filter(user => user.isActive);
  }

  // Create user with validation
  async createUser(userData: CreateUserForm): Promise<User> {
    // Check if email already exists
    const existingUser = await this.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      throw new Error('Invalid email format');
    }

    // Validate name
    if (!userData.name.trim()) {
      throw new Error('Name is required');
    }

    return this.create({
      ...userData,
      isActive: true,
    });
  }

  // Update user with validation
  async updateUser(id: string, userData: UpdateUserForm): Promise<User | null> {
    // If email is being updated, check for duplicates
    if (userData.email) {
      const existingUser = await this.findByEmail(userData.email);
      if (existingUser && existingUser.id !== id) {
        throw new Error('User with this email already exists');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        throw new Error('Invalid email format');
      }
    }

    // Validate name if being updated
    if (userData.name !== undefined && !userData.name.trim()) {
      throw new Error('Name cannot be empty');
    }

    return this.update(id, userData);
  }

  // Deactivate user (soft delete)
  async deactivateUser(id: string): Promise<User | null> {
    return this.update(id, { isActive: false });
  }

  // Activate user
  async activateUser(id: string): Promise<User | null> {
    return this.update(id, { isActive: true });
  }

  // Get user statistics
  async getStatistics(): Promise<{
    total: number;
    active: number;
    inactive: number;
    byRole: Record<string, number>;
  }> {
    const total = this.data.length;
    const active = this.data.filter(user => user.isActive).length;
    const inactive = total - active;

    const byRole = this.data.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return { total, active, inactive, byRole };
  }
}