// Post service for handling post-related API calls
import { BaseService } from './BaseService';
import { Post, CreatePostForm, UpdatePostForm, PaginatedResponse } from '@/types';

export class PostService extends BaseService {
  constructor(baseUrl: string = '/api/posts') {
    super(baseUrl);
  }

  // Get all posts with pagination
  async getPosts(page: number = 1, limit: number = 10): Promise<{ success: boolean; data?: PaginatedResponse<Post>; error?: string }> {
    return this.get<PaginatedResponse<Post>>('', { page: page.toString(), limit: limit.toString() });
  }

  // Get post by ID
  async getPostById(id: string): Promise<{ success: boolean; data?: Post; error?: string }> {
    return this.get<Post>(`/${id}`);
  }

  // Create new post
  async createPost(postData: CreatePostForm, authorId: string): Promise<{ success: boolean; data?: Post; error?: string }> {
    return this.post<Post>('', { ...postData, authorId });
  }

  // Update post
  async updatePost(id: string, postData: UpdatePostForm): Promise<{ success: boolean; data?: Post; error?: string }> {
    return this.put<Post>(`/${id}`, postData);
  }

  // Delete post
  async deletePost(id: string): Promise<{ success: boolean; error?: string }> {
    return this.delete(`/${id}`);
  }

  // Get posts by author
  async getPostsByAuthor(authorId: string): Promise<{ success: boolean; data?: Post[]; error?: string }> {
    return this.get<Post[]>(`/author/${authorId}`);
  }

  // Get published posts
  async getPublishedPosts(): Promise<{ success: boolean; data?: Post[]; error?: string }> {
    return this.get<Post[]>('/published');
  }

  // Get posts by tag
  async getPostsByTag(tag: string): Promise<{ success: boolean; data?: Post[]; error?: string }> {
    return this.get<Post[]>(`/tag/${tag}`);
  }

  // Search posts
  async searchPosts(query: string): Promise<{ success: boolean; data?: Post[]; error?: string }> {
    return this.get<Post[]>('/search', { q: query });
  }

  // Publish post
  async publishPost(id: string): Promise<{ success: boolean; data?: Post; error?: string }> {
    return this.patch<Post>(`/${id}/publish`);
  }

  // Unpublish post
  async unpublishPost(id: string): Promise<{ success: boolean; data?: Post; error?: string }> {
    return this.patch<Post>(`/${id}/unpublish`);
  }

  // Get post statistics
  async getPostStatistics(): Promise<{ success: boolean; data?: any; error?: string }> {
    return this.get('/statistics');
  }
}