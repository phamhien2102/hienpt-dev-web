#!/usr/bin/env node

console.log('📝 Posts List - MVC Architecture Demo');
console.log('=====================================\n');

console.log('📊 Sample Posts (from database):');
console.log('');

const samplePosts = [
  {
    id: '92a1d978-ba17-4fd7-af9f-5010bd75c48f',
    title: 'Welcome to MVC Architecture',
    content: 'This is a comprehensive guide to understanding Model-View-Controller pattern in modern web development.',
    authorId: 'ea270bdb-888d-48f9-aaee-3ba81a3078d0',
    published: true,
    tags: ['architecture', 'mvc', 'web-development'],
    createdAt: '2025-09-06T15:18:03.828Z',
    updatedAt: '2025-09-06T15:18:03.828Z'
  },
  {
    id: '67638b54-1d7a-40a4-929b-c51587c3d253',
    title: 'Getting Started with Supabase',
    content: 'Learn how to integrate Supabase with your Next.js application for a complete backend solution.',
    authorId: 'e2a2c6fb-546a-4853-8e51-4701871a1674',
    published: true,
    tags: ['supabase', 'nextjs', 'database'],
    createdAt: '2025-09-06T15:18:03.828Z',
    updatedAt: '2025-09-06T15:18:03.828Z'
  },
  {
    id: '96cb03d2-0ce5-4fd4-9399-216ac83ba83e',
    title: 'TypeScript Best Practices',
    content: 'Essential TypeScript patterns and practices for building scalable applications.',
    authorId: '6188c3a4-8053-4f0c-88fa-7af7456cdf4e',
    published: false,
    tags: ['typescript', 'programming', 'best-practices'],
    createdAt: '2025-09-06T15:18:03.828Z',
    updatedAt: '2025-09-06T15:18:03.828Z'
  },
  {
    id: '6fabb131-04b7-45c8-a070-e332fe089a1c',
    title: 'React Hooks Deep Dive',
    content: 'Understanding React hooks and their advanced usage patterns.',
    authorId: '37761dac-c62d-4ec0-8fa1-1cb5f68a13e1',
    published: true,
    tags: ['react', 'hooks', 'frontend'],
    createdAt: '2025-09-06T15:18:03.828Z',
    updatedAt: '2025-09-06T15:18:03.828Z'
  }
];

samplePosts.forEach((post, index) => {
  console.log(`${index + 1}. ${post.title}`);
  console.log(`   📝 Content: ${post.content.substring(0, 80)}...`);
  console.log(`   👤 Author ID: ${post.authorId}`);
  console.log(`   ${post.published ? '✅' : '❌'} Status: ${post.published ? 'Published' : 'Draft'}`);
  console.log(`   🏷️  Tags: ${post.tags.join(', ')}`);
  console.log(`   📅 Created: ${new Date(post.createdAt).toLocaleDateString()}`);
  console.log('');
});

console.log('🌐 View Posts in Browser:');
console.log('   http://localhost:3000/posts');
console.log('   http://localhost:3001/posts');
console.log('');

console.log('🔧 API Endpoints:');
console.log('   GET  /api/posts        - List all posts');
console.log('   GET  /api/posts/[id]   - Get post by ID');
console.log('   POST /api/posts        - Create new post');
console.log('   PUT  /api/posts/[id]   - Update post');
console.log('   DELETE /api/posts/[id] - Delete post');