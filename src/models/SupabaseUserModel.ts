// Supabase User model extending BaseModel
import { BaseModel } from './BaseModel';
import { User, CreateUserForm, UpdateUserForm } from '@/types';
import { supabaseAdmin } from '@/lib/supabase';

export class SupabaseUserModel extends BaseModel<User> {
  // Override the data property to use Supabase instead
  protected data: User[] = [];

  // Create a new user in Supabase
  async create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const now = new Date();
    const userData = {
      name: data.name,
      email: data.email,
      role: data.role,
      is_active: data.isActive,
      created_at: now.toISOString(),
      updated_at: now.toISOString(),
    };

    const { data: result, error } = await supabaseAdmin
      .from('users')
      .insert(userData)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }

    return {
      id: result.id,
      name: result.name,
      email: result.email,
      role: result.role,
      isActive: result.is_active,
      createdAt: new Date(result.created_at),
      updatedAt: new Date(result.updated_at),
    };
  }

  // Find user by ID in Supabase
  async findById(id: string): Promise<User | null> {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return null;
    }

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
      isActive: data.is_active,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }

  // Find all users with pagination
  async findAll(): Promise<User[]> {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }

    return data.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.is_active,
      createdAt: new Date(user.created_at),
      updatedAt: new Date(user.updated_at),
    }));
  }

  // Update user in Supabase
  async update(id: string, data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>): Promise<User | null> {
    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (data.name !== undefined) updateData.name = data.name;
    if (data.email !== undefined) updateData.email = data.email;
    if (data.role !== undefined) updateData.role = data.role;
    if (data.isActive !== undefined) updateData.is_active = data.isActive;

    const { data: result, error } = await supabaseAdmin
      .from('users')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error || !result) {
      return null;
    }

    return {
      id: result.id,
      name: result.name,
      email: result.email,
      role: result.role,
      isActive: result.is_active,
      createdAt: new Date(result.created_at),
      updatedAt: new Date(result.updated_at),
    };
  }

  // Delete user from Supabase
  async delete(id: string): Promise<boolean> {
    const { error } = await supabaseAdmin
      .from('users')
      .delete()
      .eq('id', id);

    return !error;
  }

  // Find users with pagination
  async findWithPagination(page: number = 1, limit: number = 10): Promise<{
    data: User[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabaseAdmin
      .from('users')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }

    const users = data.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.is_active,
      createdAt: new Date(user.created_at),
      updatedAt: new Date(user.updated_at),
    }));

    return {
      data: users,
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    };
  }

  // Search users
  async search(query: string, fields: (keyof User)[]): Promise<User[]> {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .or(`name.ilike.%${query}%,email.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to search users: ${error.message}`);
    }

    return data.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.is_active,
      createdAt: new Date(user.created_at),
      updatedAt: new Date(user.updated_at),
    }));
  }

  // Find user by email
  async findByEmail(email: string): Promise<User | null> {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) {
      return null;
    }

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
      isActive: data.is_active,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }

  // Find users by role
  async findByRole(role: User['role']): Promise<User[]> {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('role', role)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch users by role: ${error.message}`);
    }

    return data.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.is_active,
      createdAt: new Date(user.created_at),
      updatedAt: new Date(user.updated_at),
    }));
  }

  // Find active users
  async findActiveUsers(): Promise<User[]> {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch active users: ${error.message}`);
    }

    return data.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.is_active,
      createdAt: new Date(user.created_at),
      updatedAt: new Date(user.updated_at),
    }));
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
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('is_active, role');

    if (error) {
      throw new Error(`Failed to fetch user statistics: ${error.message}`);
    }

    const total = data.length;
    const active = data.filter(user => user.is_active).length;
    const inactive = total - active;

    const byRole = data.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return { total, active, inactive, byRole };
  }
}