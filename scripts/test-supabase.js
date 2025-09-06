#!/usr/bin/env node

// Test Supabase connection and create sample data
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('🔧 Testing Supabase Connection...\n');

if (!supabaseUrl || !supabaseKey) {
  console.log('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    // Test connection by fetching users
    console.log('📊 Fetching users from Supabase...');
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .limit(5);

    if (usersError) {
      console.log('❌ Error fetching users:', usersError.message);
      
      // Check if tables exist
      console.log('\n🔍 Checking if tables exist...');
      const { data: tables, error: tablesError } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public');

      if (tablesError) {
        console.log('❌ Error checking tables:', tablesError.message);
      } else {
        console.log('📋 Available tables:', tables.map(t => t.table_name));
        console.log('\n💡 You may need to run the database schema:');
        console.log('   1. Go to your Supabase dashboard');
        console.log('   2. Navigate to SQL Editor');
        console.log('   3. Copy and paste the contents of supabase-schema.sql');
        console.log('   4. Run the SQL to create tables and sample data');
      }
      return;
    }

    console.log('✅ Successfully connected to Supabase!');
    console.log(`📊 Found ${users.length} users in database:`);
    
    users.forEach((user, index) => {
      console.log(`   ${index + 1}. ${user.name} (${user.email}) - ${user.role}`);
    });

    if (users.length === 0) {
      console.log('\n📝 No users found. Creating sample data...');
      await createSampleData();
    }

  } catch (error) {
    console.log('❌ Connection failed:', error.message);
  }
}

async function createSampleData() {
  const sampleUsers = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
      is_active: true
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'user',
      is_active: true
    },
    {
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'moderator',
      is_active: true
    },
    {
      name: 'Alice Brown',
      email: 'alice@example.com',
      role: 'user',
      is_active: false
    }
  ];

  try {
    const { data, error } = await supabase
      .from('users')
      .insert(sampleUsers)
      .select();

    if (error) {
      console.log('❌ Error creating sample users:', error.message);
    } else {
      console.log('✅ Created sample users successfully!');
      console.log(`   Created ${data.length} users`);
    }
  } catch (error) {
    console.log('❌ Error creating sample data:', error.message);
  }
}

testConnection();