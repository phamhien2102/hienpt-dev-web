# MVC Architecture Demo

A comprehensive Model-View-Controller (MVC) implementation built with Next.js 15, TypeScript, and Tailwind CSS. This project demonstrates proper separation of concerns and modern web development practices.

## 🏗️ Architecture Overview

This project implements a clean MVC architecture with the following structure:

```
src/
├── types/           # TypeScript interfaces and type definitions
├── models/          # Data models and business logic
├── controllers/     # Request handling and business logic coordination
├── services/        # External API calls and data management
├── views/           # React components and UI logic
└── app/            # Next.js app router pages and API routes
```

## 📁 Project Structure

### Models Layer
- **BaseModel**: Abstract base class with common CRUD operations
- **UserModel**: User-specific business logic and validation
- **PostModel**: Post-specific business logic and search capabilities

### Controllers Layer
- **BaseController**: Common controller functionality and error handling
- **UserController**: Handles all user-related HTTP operations
- **PostController**: Handles all post-related HTTP operations

### Views Layer
- **BaseView**: Common UI components (loading, error states)
- **UserView**: User management components (list, forms)
- **PostView**: Post management components (list, forms)
- **Navigation**: Application navigation component

### Services Layer
- **BaseService**: Generic HTTP request handling
- **UserService**: User-specific API calls
- **PostService**: Post-specific API calls

## 🚀 Features

### Core MVC Benefits
- ✅ **Clear Separation of Concerns**: Each layer has a specific responsibility
- ✅ **Scalable Architecture**: Easy to extend and maintain
- ✅ **Reusable Components**: DRY principle throughout the codebase
- ✅ **Type Safety**: Full TypeScript support with interfaces
- ✅ **Error Handling**: Comprehensive error handling at all layers

### Technical Features
- 🔧 **Next.js 15** with App Router
- 🔧 **TypeScript** for type safety
- 🔧 **Tailwind CSS** for responsive design
- 🔧 **React 19** with modern hooks
- 🔧 **RESTful API** design
- 🔧 **Form Validation** and error handling
- 🔧 **Pagination** support
- 🔧 **Search** functionality

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hienpt-dev-web
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Usage

### User Management
- Navigate to `/users` to manage users
- Create, read, update, and delete users
- Search and filter users
- View user statistics

### Post Management
- Navigate to `/posts` to manage posts
- Create, read, update, and delete posts
- Search posts by title and content
- Filter by tags and publication status

### API Endpoints

#### Users
- `GET /api/users` - Get all users (with pagination)
- `GET /api/users/[id]` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/[id]` - Update user
- `DELETE /api/users/[id]` - Delete user

#### Posts
- `GET /api/posts` - Get all posts (with pagination)
- `GET /api/posts/[id]` - Get post by ID
- `POST /api/posts` - Create new post
- `PUT /api/posts/[id]` - Update post
- `DELETE /api/posts/[id]` - Delete post

## 🏛️ Architecture Patterns

### Model Layer
```typescript
// Example: UserModel extends BaseModel
class UserModel extends BaseModel<User> {
  async createUser(userData: CreateUserForm): Promise<User> {
    // Validation logic
    // Business rules
    // Data persistence
  }
}
```

### Controller Layer
```typescript
// Example: UserController handles HTTP requests
class UserController extends BaseController {
  async createUser(req: Request, res: Response): Promise<void> {
    // Request validation
    // Call model methods
    // Return response
  }
}
```

### View Layer
```typescript
// Example: React component for user management
const UserList: React.FC = () => {
  // State management
  // Service calls
  // UI rendering
};
```

## 🔧 Development

### Adding New Features

1. **Create Types**: Define interfaces in `src/types/`
2. **Create Model**: Extend `BaseModel` in `src/models/`
3. **Create Controller**: Extend `BaseController` in `src/controllers/`
4. **Create Service**: Extend `BaseService` in `src/services/`
5. **Create Views**: Build React components in `src/views/`
6. **Add API Routes**: Create route handlers in `src/app/api/`

### Code Style
- Use TypeScript for all new code
- Follow the existing naming conventions
- Add proper error handling
- Include JSDoc comments for complex functions

## 📝 License

This project is for educational purposes and demonstrates MVC architecture patterns.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MVC Pattern](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)