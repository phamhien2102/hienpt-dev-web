// Global type definitions for the MVC architecture

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User extends BaseEntity {
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  isActive: boolean;
}

export interface Post extends BaseEntity {
  title: string;
  content: string;
  authorId: string;
  published: boolean;
  tags: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form types
export interface CreateUserForm {
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
}

export interface UpdateUserForm extends Partial<CreateUserForm> {
  isActive?: boolean;
}

export interface CreatePostForm {
  title: string;
  content: string;
  published: boolean;
  tags: string[];
}

export interface UpdatePostForm extends Partial<CreatePostForm> {
  authorId?: string;
}