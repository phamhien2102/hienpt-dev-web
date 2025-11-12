// Post model extending BaseModel
import { BaseModel } from "./BaseModel";
import { Post, CreatePostForm, UpdatePostForm } from "@/types";

export class PostModel extends BaseModel<Post> {
  // Find posts by author
  async findByAuthor(authorId: string): Promise<Post[]> {
    return this.data.filter(post => post.authorId === authorId);
  }

  // Find published posts
  async findPublished(): Promise<Post[]> {
    return this.data.filter(post => post.published);
  }

  // Find posts by tag
  async findByTag(tag: string): Promise<Post[]> {
    return this.data.filter(post => post.tags.includes(tag));
  }

  // Find posts by multiple tags
  async findByTags(tags: string[]): Promise<Post[]> {
    return this.data.filter(post => 
      tags.some(tag => post.tags.includes(tag))
    );
  }

  // Create post with validation
  async createPost(postData: CreatePostForm, authorId: string): Promise<Post> {
    // Validate title
    if (!postData.title.trim()) {
      throw new Error("Title is required");
    }

    // Validate content
    if (!postData.content.trim()) {
      throw new Error("Content is required");
    }

    // Validate tags
    if (!Array.isArray(postData.tags)) {
      throw new Error("Tags must be an array");
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
      throw new Error("Title cannot be empty");
    }

    // Validate content if being updated
    if (postData.content !== undefined && !postData.content.trim()) {
      throw new Error("Content cannot be empty");
    }

    // Validate tags if being updated
    if (postData.tags !== undefined && !Array.isArray(postData.tags)) {
      throw new Error("Tags must be an array");
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
    const posts = authorId ? this.findByAuthor(authorId) : this.data;
    return posts;
  }

  // Search posts by title and content
  async searchPosts(query: string): Promise<Post[]> {
    const searchTerm = query.toLowerCase();
    return this.data.filter(post => 
      post.title.toLowerCase().includes(searchTerm) ||
      post.content.toLowerCase().includes(searchTerm)
    );
  }

  // Get post statistics
  async getStatistics(): Promise<{
    total: number;
    published: number;
    unpublished: number;
    byTag: Record<string, number>;
  }> {
    const total = this.data.length;
    const published = this.data.filter(post => post.published).length;
    const unpublished = total - published;

    const byTag = this.data.reduce((acc, post) => {
      post.tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    return { total, published, unpublished, byTag };
  }
}