-- Supabase Database Schema for MVC Architecture Demo
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('admin', 'user', 'moderator')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    published BOOLEAN DEFAULT false,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_is_active ON users(is_active);
CREATE INDEX IF NOT EXISTS idx_posts_author_id ON posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published);
CREATE INDEX IF NOT EXISTS idx_posts_tags ON posts USING GIN(tags);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at 
    BEFORE UPDATE ON posts 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO users (name, email, role, is_active) VALUES
('John Doe', 'john@example.com', 'admin', true),
('Jane Smith', 'jane@example.com', 'user', true),
('Bob Johnson', 'bob@example.com', 'moderator', true),
('Alice Brown', 'alice@example.com', 'user', false)
ON CONFLICT (email) DO NOTHING;

-- Insert sample posts
INSERT INTO posts (title, content, author_id, published, tags) VALUES
('Welcome to MVC Architecture', 'This is a comprehensive guide to understanding Model-View-Controller pattern in modern web development.', (SELECT id FROM users WHERE email = 'john@example.com'), true, ARRAY['architecture', 'mvc', 'web-development']),
('Getting Started with Supabase', 'Learn how to integrate Supabase with your Next.js application for a complete backend solution.', (SELECT id FROM users WHERE email = 'jane@example.com'), true, ARRAY['supabase', 'nextjs', 'database']),
('TypeScript Best Practices', 'Essential TypeScript patterns and practices for building scalable applications.', (SELECT id FROM users WHERE email = 'bob@example.com'), false, ARRAY['typescript', 'programming', 'best-practices']),
('React Hooks Deep Dive', 'Understanding React hooks and their advanced usage patterns.', (SELECT id FROM users WHERE email = 'alice@example.com'), true, ARRAY['react', 'hooks', 'frontend'])
ON CONFLICT DO NOTHING;

-- Create RLS (Row Level Security) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Allow all operations for authenticated users (adjust as needed for your security requirements)
CREATE POLICY "Allow all operations for authenticated users" ON users
    FOR ALL USING (true);

CREATE POLICY "Allow all operations for authenticated users" ON posts
    FOR ALL USING (true);

-- Allow public read access (optional - remove if you want authentication required)
CREATE POLICY "Allow public read access" ON users
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON posts
    FOR SELECT USING (true);