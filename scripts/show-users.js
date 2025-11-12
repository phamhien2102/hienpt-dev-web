#!/usr/bin/env node

console.log("👥 Users List - MVC Architecture Demo");
console.log("=====================================\n");

console.log("📊 Sample Users (from database schema):");
console.log("");

const sampleUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "2", 
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "3",
    name: "Bob Johnson", 
    email: "bob@example.com",
    role: "moderator",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice@example.com", 
    role: "user",
    isActive: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

sampleUsers.forEach((user, index) => {
  console.log(`${index + 1}. ${user.name}`);
  console.log(`   📧 Email: ${user.email}`);
  console.log(`   🏷️  Role: ${user.role}`);
  console.log(`   ${user.isActive ? "✅" : "❌"} Status: ${user.isActive ? "Active" : "Inactive"}`);
  console.log(`   📅 Created: ${new Date(user.createdAt).toLocaleDateString()}`);
  console.log("");
});

console.log("🌐 View Users in Browser:");
console.log("   http://localhost:3000/users");
console.log("   http://localhost:3001/users");
console.log("");

console.log("📝 Database Setup:");
console.log("   These users are created when you run the Supabase schema.");
console.log("   To set up Supabase: npm run setup:supabase");
console.log("");

console.log("🔧 API Endpoints:");
console.log("   GET  /api/users        - List all users");
console.log("   GET  /api/users/[id]   - Get user by ID");
console.log("   POST /api/users        - Create new user");
console.log("   PUT  /api/users/[id]   - Update user");
console.log("   DELETE /api/users/[id] - Delete user");