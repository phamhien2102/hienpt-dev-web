// Post controller handling post-related operations
import { BaseController } from "./BaseController";

// Mock Express types for Next.js compatibility
interface Request {
  query: Record<string, string>;
  params: Record<string, string>;
  body: any;
  user?: { id: string };
}

interface Response {
  status: (code: number) => {
    json: (data: any) => void;
  };
}
import { SupabasePostModel } from "@/models/SupabasePostModel";
import { CreatePostForm, UpdatePostForm } from "@/types";

export class PostController extends BaseController {
  private postModel: SupabasePostModel;

  constructor() {
    super();
    this.postModel = new SupabasePostModel();
  }

  // Get all posts
  getPosts = async (req: Request, res: Response): Promise<void> => {
    await this.handleAsync(async () => {
      const { page, limit } = this.getPaginationParams(req);
      const result = await this.postModel.findWithPagination(page, limit);
      return result;
    }, res, "Failed to fetch posts");
  };

  // Get post by ID
  getPostById = async (req: Request, res: Response): Promise<void> => {
    await this.handleAsync(async () => {
      const { id } = req.params;
      const post = await this.postModel.findById(id);
      
      if (!post) {
        throw new Error("Post not found");
      }
      
      return post;
    }, res, "Failed to fetch post");
  };

  // Create new post
  createPost = async (req: Request, res: Response): Promise<void> => {
    await this.handleAsync(async () => {
      const postData: CreatePostForm = req.body;
      const authorId = req.body.authorId || req.user?.id; // Assuming user is attached to request
      
      if (!authorId) {
        throw new Error("Author ID is required");
      }

      // Validate required fields
      const validationError = this.validateRequired(postData, ["title", "content"]);
      if (validationError) {
        throw new Error(validationError);
      }

      const post = await this.postModel.createPost(postData, authorId);
      return post;
    }, res, "Failed to create post");
  };

  // Update post
  updatePost = async (req: Request, res: Response): Promise<void> => {
    await this.handleAsync(async () => {
      const { id } = req.params;
      const postData: UpdatePostForm = req.body;

      const post = await this.postModel.updatePost(id, postData);
      if (!post) {
        throw new Error("Post not found");
      }

      return post;
    }, res, "Failed to update post");
  };

  // Delete post
  deletePost = async (req: Request, res: Response): Promise<void> => {
    await this.handleAsync(async () => {
      const { id } = req.params;
      const deleted = await this.postModel.delete(id);
      
      if (!deleted) {
        throw new Error("Post not found");
      }

      return { message: "Post deleted successfully" };
    }, res, "Failed to delete post");
  };

  // Get posts by author
  getPostsByAuthor = async (req: Request, res: Response): Promise<void> => {
    await this.handleAsync(async () => {
      const { authorId } = req.params;
      const posts = await this.postModel.findByAuthor(authorId);
      return posts;
    }, res, "Failed to fetch posts by author");
  };

  // Get published posts
  getPublishedPosts = async (req: Request, res: Response): Promise<void> => {
    await this.handleAsync(async () => {
      const posts = await this.postModel.findPublished();
      return posts;
    }, res, "Failed to fetch published posts");
  };

  // Get posts by tag
  getPostsByTag = async (req: Request, res: Response): Promise<void> => {
    await this.handleAsync(async () => {
      const { tag } = req.params;
      const posts = await this.postModel.findByTag(tag);
      return posts;
    }, res, "Failed to fetch posts by tag");
  };

  // Search posts
  searchPosts = async (req: Request, res: Response): Promise<void> => {
    await this.handleAsync(async () => {
      const { q } = req.query;
      if (!q || typeof q !== "string") {
        throw new Error("Search query is required");
      }

      const posts = await this.postModel.searchPosts(q);
      return posts;
    }, res, "Failed to search posts");
  };

  // Publish post
  publishPost = async (req: Request, res: Response): Promise<void> => {
    await this.handleAsync(async () => {
      const { id } = req.params;
      const post = await this.postModel.publishPost(id);
      
      if (!post) {
        throw new Error("Post not found");
      }

      return post;
    }, res, "Failed to publish post");
  };

  // Unpublish post
  unpublishPost = async (req: Request, res: Response): Promise<void> => {
    await this.handleAsync(async () => {
      const { id } = req.params;
      const post = await this.postModel.unpublishPost(id);
      
      if (!post) {
        throw new Error("Post not found");
      }

      return post;
    }, res, "Failed to unpublish post");
  };

  // Get post statistics
  getPostStatistics = async (req: Request, res: Response): Promise<void> => {
    await this.handleAsync(async () => {
      const stats = await this.postModel.getStatistics();
      return stats;
    }, res, "Failed to fetch post statistics");
  };
}