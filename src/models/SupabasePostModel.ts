// Supabase Post model extending BaseModel
import { BaseModel } from './BaseModel';
import { Post, CreatePostForm, UpdatePostForm } from '@/types';
import { supabaseAdmin } from '@/lib/supabase';

export class SupabasePostModel extends BaseModel<Post> {
  // Override the data property to use Supabase instead
  protected data: Post[] = [];

  // Create a new post in Supabase
  async create(data: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Promise<Post> {
    const now = new Date();
    const postData = {
      title: data.title,
      content: data.content,
      author_id: data.authorId,
      published: data.published,
      tags: data.tags,
      created_at: now.toISOString(),
      updated_at: now.toISOString(),
    };

    const { data: result, error } = await supabaseAdmin
      .from('posts')
      .insert(postData)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create post: ${error.message}`);
    }

    return {
      id: result.id,
      title: result.title,
      content: result.content,
      authorId: result.author_id,
      published: result.published,
      tags: result.tags,
      createdAt: new Date(result.created_at),
      updatedAt: new Date(result.updated_at),
    };
  }

  // Find post by ID in Supabase
  async findById(id: string): Promise<Post | null> {
    const { data, error } = await supabaseAdmin
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return null;
    }

    return {
      id: data.id,
      title: data.title,
      content: data.content,
      authorId: data.author_id,
      published: data.published,
      tags: data.tags,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }

  // Find all posts with pagination
  async findAll(): Promise<Post[]> {
    const { data, error } = await supabaseAdmin
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch posts: ${error.message}`);
    }

    return data.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      authorId: post.author_id,
      published: post.published,
      tags: post.tags,
      createdAt: new Date(post.created_at),
      updatedAt: new Date(post.updated_at),
    }));
  }

  // Update post in Supabase
  async update(id: string, data: Partial<Omit<Post, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Post | null> {
    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (data.title !== undefined) updateData.title = data.title;
    if (data.content !== undefined) updateData.content = data.content;
    if (data.authorId !== undefined) updateData.author_id = data.authorId;
    if (data.published !== undefined) updateData.published = data.published;
    if (data.tags !== undefined) updateData.tags = data.tags;

    const { data: result, error } = await supabaseAdmin
      .from('posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error || !result) {
      return null;
    }

    return {
      id: result.id,
      title: result.title,
      content: result.content,
      authorId: result.author_id,
      published: result.published,
      tags: result.tags,
      createdAt: new Date(result.created_at),
      updatedAt: new Date(result.updated_at),
    };
  }

  // Delete post from Supabase
  async delete(id: string): Promise<boolean> {
    const { error } = await supabaseAdmin
      .from('posts')
      .delete()
      .eq('id', id);

    return !error;
  }

  // Find posts with pagination
  async findWithPagination(page: number = 1, limit: number = 10): Promise<{
    data: Post[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabaseAdmin
      .from('posts')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) {
      throw new Error(`Failed to fetch posts: ${error.message}`);
    }

    const posts = data.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      authorId: post.author_id,
      published: post.published,
      tags: post.tags,
      createdAt: new Date(post.created_at),
      updatedAt: new Date(post.updated_at),
    }));

    return {
      data: posts,
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    };
  }

  // Search posts
  async search(query: string, fields: (keyof Post)[]): Promise<Post[]> {
    const { data, error } = await supabaseAdmin
      .from('posts')
      .select('*')
      .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to search posts: ${error.message}`);
    }

    return data.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      authorId: post.author_id,
      published: post.published,
      tags: post.tags,
      createdAt: new Date(post.created_at),
      updatedAt: new Date(post.updated_at),
    }));
  }

  // Find posts by author
  async findByAuthor(authorId: string): Promise<Post[]> {
    const { data, error } = await supabaseAdmin
      .from('posts')
      .select('*')
      .eq('author_id', authorId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch posts by author: ${error.message}`);
    }

    return data.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      authorId: post.author_id,
      published: post.published,
      tags: post.tags,
      createdAt: new Date(post.created_at),
      updatedAt: new Date(post.updated_at),
    }));
  }

  // Find published posts
  async findPublished(): Promise<Post[]> {
    const { data, error } = await supabaseAdmin
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch published posts: ${error.message}`);
    }

    return data.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      authorId: post.author_id,
      published: post.published,
      tags: post.tags,
      createdAt: new Date(post.created_at),
      updatedAt: new Date(post.updated_at),
    }));
  }

  // Find posts by tag
  async findByTag(tag: string): Promise<Post[]> {
    const { data, error } = await supabaseAdmin
      .from('posts')
      .select('*')
      .contains('tags', [tag])
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch posts by tag: ${error.message}`);
    }

    return data.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      authorId: post.author_id,
      published: post.published,
      tags: post.tags,
      createdAt: new Date(post.created_at),
      updatedAt: new Date(post.updated_at),
    }));
  }

  // Find posts by multiple tags
  async findByTags(tags: string[]): Promise<Post[]> {
    const { data, error } = await supabaseAdmin
      .from('posts')
      .select('*')
      .overlaps('tags', tags)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch posts by tags: ${error.message}`);
    }

    return data.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      authorId: post.author_id,
      published: post.published,
      tags: post.tags,
      createdAt: new Date(post.created_at),
      updatedAt: new Date(post.updated_at),
    }));
  }

  // Create post with validation
  async createPost(postData: CreatePostForm, authorId: string): Promise<Post> {
    // Validate title
    if (!postData.title.trim()) {
      throw new Error('Title is required');
    }

    // Validate content
    if (!postData.content.trim()) {
      throw new Error('Content is required');
    }

    // Validate tags
    if (!Array.isArray(postData.tags)) {
      throw new Error('Tags must be an array');
    }

    return this.create({
      ...postData,
      authorId,
    });
  }

  // Update post with validation
  async updatePost(id: string, postData: UpdatePostForm): Promise<Post | null> {
    // Validate title if being updated
    if (postData.title !== undefined && !postData.title.trim()) {
      throw new Error('Title cannot be empty');
    }

    // Validate content if being updated
    if (postData.content !== undefined && !postData.content.trim()) {
      throw new Error('Content cannot be empty');
    }

    // Validate tags if being updated
    if (postData.tags !== undefined && !Array.isArray(postData.tags)) {
      throw new Error('Tags must be an array');
    }

    return this.update(id, postData);
  }

  // Publish post
  async publishPost(id: string): Promise<Post | null> {
    return this.update(id, { published: true });
  }

  // Unpublish post
  async unpublishPost(id: string): Promise<Post | null> {
    return this.update(id, { published: false });
  }

  // Get posts with author information
  async getPostsWithAuthor(authorId?: string): Promise<Post[]> {
    const posts = authorId ? this.findByAuthor(authorId) : this.findAll();
    return posts;
  }

  // Search posts by title and content
  async searchPosts(query: string): Promise<Post[]> {
    return this.search(query, ['title', 'content']);
  }

  // Get post statistics
  async getStatistics(): Promise<{
    total: number;
    published: number;
    unpublished: number;
    byTag: Record<string, number>;
  }> {
    const { data, error } = await supabaseAdmin
      .from('posts')
      .select('published, tags');

    if (error) {
      throw new Error(`Failed to fetch post statistics: ${error.message}`);
    }

    const total = data.length;
    const published = data.filter(post => post.published).length;
    const unpublished = total - published;

    const byTag = data.reduce((acc, post) => {
      post.tags.forEach((tag: string) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    return { total, published, unpublished, byTag };
  }
}