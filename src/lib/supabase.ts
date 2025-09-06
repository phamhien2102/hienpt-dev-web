// Supabase client configuration
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Only throw error in production if variables are missing
if (process.env.NODE_ENV === 'production' && (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)) {
  throw new Error('Missing Supabase environment variables');
}

// Create Supabase client for client-side operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create Supabase client for server-side operations with service role
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string;
          email: string;
          role: 'admin' | 'user' | 'moderator';
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          role?: 'admin' | 'user' | 'moderator';
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          role?: 'admin' | 'user' | 'moderator';
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          title: string;
          content: string;
          author_id: string;
          published: boolean;
          tags: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          author_id: string;
          published?: boolean;
          tags?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          author_id?: string;
          published?: boolean;
          tags?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}