#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Supabase for MVC Architecture Demo\n');

// Check if .env.local already exists
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  console.log('⚠️  .env.local already exists. Please update it manually with your Supabase credentials.');
  console.log('   Required variables:');
  console.log('   - NEXT_PUBLIC_SUPABASE_URL');
  console.log('   - NEXT_PUBLIC_SUPABASE_ANON_KEY');
  console.log('   - SUPABASE_SERVICE_ROLE_KEY\n');
} else {
  // Create .env.local from .env.example
  const envExamplePath = path.join(process.cwd(), '.env.example');
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ Created .env.local from .env.example');
    console.log('📝 Please update .env.local with your Supabase project credentials\n');
  } else {
    // Create .env.local with template
    const envTemplate = `# Supabase Configuration
# Get these values from your Supabase project dashboard
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
`;
    fs.writeFileSync(envPath, envTemplate);
    console.log('✅ Created .env.local template');
    console.log('📝 Please update .env.local with your Supabase project credentials\n');
  }
}

console.log('📋 Next steps:');
console.log('1. Create a Supabase project at https://supabase.com');
console.log('2. Go to Settings > API in your Supabase dashboard');
console.log('3. Copy your project URL and anon key to .env.local');
console.log('4. Get your service role key from Settings > API > service_role');
console.log('5. Run the database schema:');
console.log('   - Go to SQL Editor in your Supabase dashboard');
console.log('   - Copy and paste the contents of supabase-schema.sql');
console.log('   - Run the SQL to create tables and sample data');
console.log('6. Start the development server: npm run dev\n');

console.log('🎉 Happy coding!');