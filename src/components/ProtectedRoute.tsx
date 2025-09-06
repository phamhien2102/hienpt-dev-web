'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'moderator' | 'user';
  fallbackPath?: string;
}

export function ProtectedRoute({ 
  children, 
  requiredRole = 'user',
  fallbackPath = '/login'
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push(fallbackPath);
        return;
      }

      // Check role-based access
      if (requiredRole === 'admin' && user?.role !== 'admin') {
        router.push('/');
        return;
      }

      if (requiredRole === 'moderator' && !['admin', 'moderator'].includes(user?.role || '')) {
        router.push('/');
        return;
      }
    }
  }, [isAuthenticated, user, isLoading, router, requiredRole, fallbackPath]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render children if not authenticated or doesn't have required role
  if (!isAuthenticated || !user) {
    return null;
  }

  if (requiredRole === 'admin' && user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
            <p>You don't have permission to access this page.</p>
          </div>
        </div>
      </div>
    );
  }

  if (requiredRole === 'moderator' && !['admin', 'moderator'].includes(user.role)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
            <p>You need moderator or admin privileges to access this page.</p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}