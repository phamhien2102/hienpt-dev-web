# Supabase Setup Guide

This guide will help you set up Supabase for the MVC Architecture Demo project.

## 🚀 Quick Start

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/sign in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `mvc-architecture-demo` (or any name you prefer)
   - **Database Password**: Choose a strong password
   - **Region**: Select the closest region to you
5. Click "Create new project"
6. Wait for the project to be created (usually takes 1-2 minutes)

### 2. Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like `https://your-project-id.supabase.co`)
   - **anon public** key (starts with `eyJ...`)
   - **service_role** key (starts with `eyJ...`)

### 3. Configure Environment Variables

1. In your project root, copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Update `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

### 4. Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy the entire contents of `supabase-schema.sql` from this project
4. Paste it into the SQL Editor
5. Click "Run" to execute the SQL

This will create:
- `users` table with sample data
- `posts` table with sample data
- Indexes for better performance
- Row Level Security (RLS) policies
- Triggers for automatic `updated_at` timestamps

### 5. Verify Setup

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000)
3. Navigate to the Users or Posts pages
4. You should see the sample data from your Supabase database

## 🔧 Alternative Setup Methods

### Using the Setup Script

Run the automated setup script:

```bash
npm run setup:supabase
```

This will:
- Create `.env.local` if it doesn't exist
- Provide step-by-step instructions
- Guide you through the setup process

### Manual Database Setup

If you prefer to set up the database manually:

1. **Create Tables**:
   ```sql
   -- Users table
   CREATE TABLE users (
       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       email VARCHAR(255) UNIQUE NOT NULL,
       role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('admin', 'user', 'moderator')),
       is_active BOOLEAN DEFAULT true,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
       updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Posts table
   CREATE TABLE posts (
       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
       title VARCHAR(500) NOT NULL,
       content TEXT NOT NULL,
       author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
       published BOOLEAN DEFAULT false,
       tags TEXT[] DEFAULT '{}',
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
       updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

2. **Add Sample Data**:
   ```sql
   INSERT INTO users (name, email, role, is_active) VALUES
   ('John Doe', 'john@example.com', 'admin', true),
   ('Jane Smith', 'jane@example.com', 'user', true),
   ('Bob Johnson', 'bob@example.com', 'moderator', true);

   INSERT INTO posts (title, content, author_id, published, tags) VALUES
   ('Welcome to MVC', 'This is a comprehensive guide...', (SELECT id FROM users WHERE email = 'john@example.com'), true, ARRAY['architecture', 'mvc']);
   ```

## 🔐 Security Configuration

### Row Level Security (RLS)

The project includes RLS policies for security:

- **Public Read Access**: Anyone can read users and posts
- **Authenticated Operations**: Full CRUD for authenticated users
- **Custom Policies**: You can modify these based on your needs

### Environment Variables

- **NEXT_PUBLIC_SUPABASE_URL**: Safe to expose (used in client-side)
- **NEXT_PUBLIC_SUPABASE_ANON_KEY**: Safe to expose (used in client-side)
- **SUPABASE_SERVICE_ROLE_KEY**: Keep secret (server-side only)

## 🐛 Troubleshooting

### Common Issues

1. **"Missing Supabase environment variables"**
   - Make sure `.env.local` exists and has the correct values
   - Restart your development server after updating environment variables

2. **"Failed to fetch users/posts"**
   - Check that the database schema was created correctly
   - Verify your Supabase credentials are correct
   - Check the Supabase dashboard for any errors

3. **"Invalid API key"**
   - Double-check your API keys in `.env.local`
   - Make sure you're using the correct keys (anon vs service_role)

4. **Database connection issues**
   - Check your internet connection
   - Verify your Supabase project is active
   - Check the Supabase status page for any outages

### Debug Mode

To enable debug logging, add this to your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_DEBUG=true
```

## 📚 Next Steps

Once Supabase is set up:

1. **Explore the Supabase Dashboard**: Check out the Table Editor, API docs, and Authentication
2. **Customize the Schema**: Add more tables or modify existing ones
3. **Add Authentication**: Implement user login/signup with Supabase Auth
4. **Enable Real-time**: Use Supabase's real-time features for live updates
5. **Deploy**: Deploy your app with Vercel, Netlify, or your preferred platform

## 🔗 Useful Links

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

## 💡 Tips

- Use the Supabase dashboard to explore your data
- Check the API documentation for advanced queries
- Use the SQL Editor for complex database operations
- Monitor your usage in the Supabase dashboard
- Set up database backups for production use