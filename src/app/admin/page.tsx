"use client";

import Link from "next/link";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Welcome back, {user?.name}! Manage your application from here.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Users Management */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">👥</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Users</h3>
                  <p className="text-sm text-gray-600">Manage user accounts</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-gray-900">4</div>
                <div className="text-sm text-gray-600">Total users</div>
              </div>
              <div className="mt-4">
                <Link
                  href="/users"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View all users →
                </Link>
              </div>
            </div>

            {/* Posts Management */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">📝</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Posts</h3>
                  <p className="text-sm text-gray-600">Manage blog posts</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-gray-900">4</div>
                <div className="text-sm text-gray-600">Total posts</div>
              </div>
              <div className="mt-4">
                <Link
                  href="/posts"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View all posts →
                </Link>
              </div>
            </div>

            {/* API Documentation */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">📚</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">API Docs</h3>
                  <p className="text-sm text-gray-600">Interactive API documentation</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-gray-900">8</div>
                <div className="text-sm text-gray-600">API endpoints</div>
              </div>
              <div className="mt-4">
                <Link
                  href="/api-docs"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View API docs →
                </Link>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">✅</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
                  <p className="text-sm text-gray-600">All systems operational</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">API Server</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Database</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Authentication</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                  <p className="text-sm text-gray-600">Latest system events</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-600">
                  <div className="font-medium">User logged in</div>
                  <div className="text-xs text-gray-500">2 minutes ago</div>
                </div>
                <div className="text-sm text-gray-600">
                  <div className="font-medium">New post created</div>
                  <div className="text-xs text-gray-500">1 hour ago</div>
                </div>
                <div className="text-sm text-gray-600">
                  <div className="font-medium">User registered</div>
                  <div className="text-xs text-gray-500">3 hours ago</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                  <p className="text-sm text-gray-600">Common admin tasks</p>
                </div>
              </div>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                  Create new user
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                  Create new post
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                  View system logs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}