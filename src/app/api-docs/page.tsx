'use client';

import { swaggerSpec } from '@/lib/swagger';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Import Swagger UI CSS
import 'swagger-ui-react/swagger-ui.css';

// Dynamic import with no SSR
const DynamicSwaggerUI = dynamic(() => import('swagger-ui-react'), {
  ssr: false,
  loading: () => <LoadingSpinner message="Loading Swagger UI..." />,
});

// Custom hook for console warning suppression
function useConsoleSuppression() {
  useEffect(() => {
    const originalConsoleWarn = console.warn;
    const originalConsoleError = console.error;
    
    const suppressedMessages = [
      'UNSAFE_componentWillReceiveProps',
      'componentWillReceiveProps',
      'ModelCollapse',
      'OperationContainer',
      'Using UNSAFE_componentWillReceiveProps',
      'Move data fetching code',
      'refactor your code to use memoization',
      'strict mode is not recommended'
    ];
    
    console.warn = (...args) => {
      const message = args[0];
      if (typeof message === 'string' && suppressedMessages.some(msg => message.includes(msg))) {
        return;
      }
      originalConsoleWarn(...args);
    };

    console.error = (...args) => {
      const message = args[0];
      if (typeof message === 'string' && suppressedMessages.some(msg => message.includes(msg))) {
        return;
      }
      originalConsoleError(...args);
    };

    return () => {
      console.warn = originalConsoleWarn;
      console.error = originalConsoleError;
    };
  }, []);
}

// Custom hook for client-side rendering
function useClientSide() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

// Loading spinner component
function LoadingSpinner({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <span className="ml-3 text-gray-600">{message}</span>
    </div>
  );
}

// Full page loading component
function FullPageLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-lg text-gray-600">Loading API Documentation...</p>
      </div>
    </div>
  );
}

// Swagger UI wrapper component
function SwaggerUIWrapper() {
  useConsoleSuppression();

  return (
    <div suppressHydrationWarning>
      <DynamicSwaggerUI 
        spec={swaggerSpec}
        docExpansion="list"
        defaultModelsExpandDepth={2}
        defaultModelExpandDepth={2}
        displayRequestDuration={true}
        tryItOutEnabled={true}
        deepLinking={true}
        showExtensions={true}
        showCommonExtensions={true}
        requestInterceptor={(request: any) => request}
        responseInterceptor={(response: any) => response}
        onComplete={() => {}}
        plugins={[]}
        layout="BaseLayout"
      />
    </div>
  );
}

// API documentation header component
function ApiHeader() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
      <h1 className="text-3xl font-bold mb-2">API Documentation</h1>
      <p className="text-blue-100">
        Interactive API documentation for the MVC Architecture application
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {[
          { label: 'Next.js 15', color: 'bg-blue-500' },
          { label: 'Supabase', color: 'bg-green-500' },
          { label: 'TypeScript', color: 'bg-purple-500' },
          { label: 'MVC Pattern', color: 'bg-orange-500' }
        ].map(({ label, color }) => (
          <span key={label} className={`${color} text-white px-3 py-1 rounded-full text-sm`}>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

// Quick start section component
function QuickStartSection() {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Quick Start</h2>
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-gray-700 mb-2">
          <strong>Base URL:</strong> <code className="bg-gray-200 px-2 py-1 rounded">http://localhost:3002/api</code>
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Authentication:</strong> Currently not required (public API)
        </p>
        <p className="text-gray-700">
          <strong>Content-Type:</strong> <code className="bg-gray-200 px-2 py-1 rounded">application/json</code>
        </p>
      </div>
    </div>
  );
}

// Endpoints section component
function EndpointsSection() {
  const endpoints = [
    {
      title: 'Users API',
      color: 'blue',
      endpoints: [
        'GET /users - List all users',
        'POST /users - Create user',
        'GET /users/{id} - Get user by ID',
        'PUT /users/{id} - Update user',
        'DELETE /users/{id} - Delete user'
      ]
    },
    {
      title: 'Posts API',
      color: 'green',
      endpoints: [
        'GET /posts - List all posts',
        'POST /posts - Create post',
        'GET /posts/{id} - Get post by ID',
        'PUT /posts/{id} - Update post',
        'DELETE /posts/{id} - Delete post'
      ]
    }
  ];

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Available Endpoints</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {endpoints.map(({ title, color, endpoints }) => (
          <div key={title} className={`bg-${color}-50 p-4 rounded-lg`}>
            <h3 className={`font-semibold text-${color}-800 mb-2`}>{title}</h3>
            <ul className={`text-sm text-${color}-700 space-y-1`}>
              {endpoints.map((endpoint, index) => (
                <li key={index}>• <code>{endpoint}</code></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// Example usage section component
function ExampleUsageSection() {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Example Usage</h2>
      <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
        <pre className="text-sm">
{`# Get all users
curl http://localhost:3002/api/users

# Create a new user
curl -X POST http://localhost:3002/api/users \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }'

# Get posts with pagination
curl "http://localhost:3002/api/posts?page=1&limit=5"`}
        </pre>
      </div>
    </div>
  );
}

// Main API documentation content
function ApiDocsContent() {
  return (
    <div className="min-h-screen bg-gray-50" suppressHydrationWarning>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <ApiHeader />
          
          <div className="p-6">
            <QuickStartSection />
            <EndpointsSection />
            <ExampleUsageSection />
          </div>
        </div>

        {/* Swagger UI Component - Client Only */}
        <div className="mt-8" suppressHydrationWarning>
          <SwaggerUIWrapper />
        </div>
      </div>
    </div>
  );
}

// Main page component
export default function ApiDocsPage() {
  const isClient = useClientSide();

  // Prevent SSR
  if (typeof window === 'undefined') {
    return null;
  }

  if (!isClient) {
    return <FullPageLoading />;
  }

  return <ApiDocsContent />;
}