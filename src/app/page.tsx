import Link from "next/link";
import { Navigation } from "@/views/components/Navigation";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              MVC Architecture Demo
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              A comprehensive Model-View-Controller implementation with Next.js, TypeScript, and Tailwind CSS
            </p>
          </div>

          {/* Architecture Overview */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">📊</div>
                <h3 className="text-xl font-semibold text-gray-900">Models</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Data structures and business logic layer. Handles data validation, persistence, and business rules.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• BaseModel with CRUD operations</li>
                <li>• UserModel with validation</li>
                <li>• PostModel with search capabilities</li>
                <li>• TypeScript interfaces for type safety</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">🎮</div>
                <h3 className="text-xl font-semibold text-gray-900">Controllers</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Handles HTTP requests, processes business logic, and coordinates between models and views.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• BaseController with common functionality</li>
                <li>• UserController for user operations</li>
                <li>• PostController for post operations</li>
                <li>• Error handling and validation</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">🎨</div>
                <h3 className="text-xl font-semibold text-gray-900">Views</h3>
              </div>
              <p className="text-gray-600 mb-4">
                React components that handle user interface and user interactions.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Reusable UI components</li>
                <li>• Form handling and validation</li>
                <li>• Loading and error states</li>
                <li>• Responsive design with Tailwind</li>
              </ul>
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Architecture Benefits</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Clear separation of concerns</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Scalable and maintainable code</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Reusable components and services</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Type-safe development with TypeScript</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Technical Stack</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Next.js 15 with App Router</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>TypeScript for type safety</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Tailwind CSS for styling</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>React 19 with modern hooks</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
