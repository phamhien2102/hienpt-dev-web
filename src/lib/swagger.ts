// OpenAPI specification for MVC Architecture API
export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'MVC Architecture API',
    version: '1.0.0',
    description: 'A comprehensive API built with Next.js MVC architecture and Supabase integration',
    contact: {
      name: 'API Support',
      email: 'support@example.com',
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Development server',
    },
    {
      url: 'https://hienpt-dev.vercel.app/api',
      description: 'Production server',
    },
  ],
  paths: {
    '/users': {
      get: {
        summary: 'Get all users',
        description: 'Retrieve a paginated list of all users',
        tags: ['Users'],
        parameters: [
          {
            in: 'query',
            name: 'page',
            schema: { type: 'integer', minimum: 1, default: 1 },
            description: 'Page number for pagination',
          },
          {
            in: 'query',
            name: 'limit',
            schema: { type: 'integer', minimum: 1, maximum: 100, default: 10 },
            description: 'Number of users per page',
          },
        ],
        responses: {
          '200': {
            description: 'Successfully retrieved users',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: {
                      type: 'object',
                      properties: {
                        data: {
                          type: 'array',
                          items: { $ref: '#/components/schemas/User' },
                        },
                        pagination: { $ref: '#/components/schemas/PaginationInfo' },
                      },
                    },
                  },
                },
              },
            },
          },
          '500': { $ref: '#/components/responses/InternalServerError' },
        },
      },
      post: {
        summary: 'Create a new user',
        description: 'Create a new user with the provided information',
        tags: ['Users'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateUserRequest' },
            },
          },
        },
        responses: {
          '200': {
            description: 'User created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: { $ref: '#/components/schemas/User' },
                  },
                },
              },
            },
          },
          '400': { $ref: '#/components/responses/BadRequest' },
          '500': { $ref: '#/components/responses/InternalServerError' },
        },
      },
    },
    '/users/{id}': {
      get: {
        summary: 'Get user by ID',
        description: 'Retrieve a specific user by their unique identifier',
        tags: ['Users'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string', format: 'uuid' },
            description: 'Unique identifier of the user',
            example: '039d00ef-e027-4bc9-b8ac-d62642201bff',
          },
        ],
        responses: {
          '200': {
            description: 'User found successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: { $ref: '#/components/schemas/User' },
                  },
                },
              },
            },
          },
          '404': { $ref: '#/components/responses/NotFound' },
          '500': { $ref: '#/components/responses/InternalServerError' },
        },
      },
      put: {
        summary: 'Update user by ID',
        description: 'Update a specific user\'s information',
        tags: ['Users'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string', format: 'uuid' },
            description: 'Unique identifier of the user',
            example: '039d00ef-e027-4bc9-b8ac-d62642201bff',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateUserRequest' },
            },
          },
        },
        responses: {
          '200': {
            description: 'User updated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: { $ref: '#/components/schemas/User' },
                  },
                },
              },
            },
          },
          '404': { $ref: '#/components/responses/NotFound' },
          '400': { $ref: '#/components/responses/BadRequest' },
          '500': { $ref: '#/components/responses/InternalServerError' },
        },
      },
      delete: {
        summary: 'Delete user by ID',
        description: 'Delete a specific user by their unique identifier',
        tags: ['Users'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string', format: 'uuid' },
            description: 'Unique identifier of the user',
            example: '039d00ef-e027-4bc9-b8ac-d62642201bff',
          },
        ],
        responses: {
          '200': {
            description: 'User deleted successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'User deleted successfully' },
                  },
                },
              },
            },
          },
          '404': { $ref: '#/components/responses/NotFound' },
          '500': { $ref: '#/components/responses/InternalServerError' },
        },
      },
    },
    '/posts': {
      get: {
        summary: 'Get all posts',
        description: 'Retrieve a paginated list of all posts',
        tags: ['Posts'],
        parameters: [
          {
            in: 'query',
            name: 'page',
            schema: { type: 'integer', minimum: 1, default: 1 },
            description: 'Page number for pagination',
          },
          {
            in: 'query',
            name: 'limit',
            schema: { type: 'integer', minimum: 1, maximum: 100, default: 10 },
            description: 'Number of posts per page',
          },
          {
            in: 'query',
            name: 'authorId',
            schema: { type: 'string', format: 'uuid' },
            description: 'Filter posts by author ID',
            example: 'ea270bdb-888d-48f9-aaee-3ba81a3078d0',
          },
        ],
        responses: {
          '200': {
            description: 'Successfully retrieved posts',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: {
                      type: 'object',
                      properties: {
                        data: {
                          type: 'array',
                          items: { $ref: '#/components/schemas/Post' },
                        },
                        pagination: { $ref: '#/components/schemas/PaginationInfo' },
                      },
                    },
                  },
                },
              },
            },
          },
          '500': { $ref: '#/components/responses/InternalServerError' },
        },
      },
      post: {
        summary: 'Create a new post',
        description: 'Create a new post with the provided information',
        tags: ['Posts'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreatePostRequest' },
            },
          },
        },
        responses: {
          '200': {
            description: 'Post created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: { $ref: '#/components/schemas/Post' },
                  },
                },
              },
            },
          },
          '400': { $ref: '#/components/responses/BadRequest' },
          '500': { $ref: '#/components/responses/InternalServerError' },
        },
      },
    },
    '/posts/{id}': {
      get: {
        summary: 'Get post by ID',
        description: 'Retrieve a specific post by its unique identifier',
        tags: ['Posts'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string', format: 'uuid' },
            description: 'Unique identifier of the post',
            example: '92a1d978-ba17-4fd7-af9f-5010bd75c48f',
          },
        ],
        responses: {
          '200': {
            description: 'Post found successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: { $ref: '#/components/schemas/Post' },
                  },
                },
              },
            },
          },
          '404': { $ref: '#/components/responses/NotFound' },
          '500': { $ref: '#/components/responses/InternalServerError' },
        },
      },
      put: {
        summary: 'Update post by ID',
        description: 'Update a specific post\'s information',
        tags: ['Posts'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string', format: 'uuid' },
            description: 'Unique identifier of the post',
            example: '92a1d978-ba17-4fd7-af9f-5010bd75c48f',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdatePostRequest' },
            },
          },
        },
        responses: {
          '200': {
            description: 'Post updated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: { $ref: '#/components/schemas/Post' },
                  },
                },
              },
            },
          },
          '404': { $ref: '#/components/responses/NotFound' },
          '400': { $ref: '#/components/responses/BadRequest' },
          '500': { $ref: '#/components/responses/InternalServerError' },
        },
      },
      delete: {
        summary: 'Delete post by ID',
        description: 'Delete a specific post by its unique identifier',
        tags: ['Posts'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string', format: 'uuid' },
            description: 'Unique identifier of the post',
            example: '92a1d978-ba17-4fd7-af9f-5010bd75c48f',
          },
        ],
        responses: {
          '200': {
            description: 'Post deleted successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Post deleted successfully' },
                  },
                },
              },
            },
          },
          '404': { $ref: '#/components/responses/NotFound' },
          '500': { $ref: '#/components/responses/InternalServerError' },
        },
      },
    },
  },
  components: {
    schemas: {
      User: {
        type: 'object',
        required: ['name', 'email', 'role'],
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            description: 'Unique identifier for the user',
            example: '039d00ef-e027-4bc9-b8ac-d62642201bff',
          },
          name: {
            type: 'string',
            description: 'Full name of the user',
            example: 'John Doe',
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'Email address of the user',
            example: 'john@example.com',
          },
          role: {
            type: 'string',
            enum: ['admin', 'moderator', 'user'],
            description: 'Role of the user',
            example: 'user',
          },
          isActive: {
            type: 'boolean',
            description: 'Whether the user is active',
            example: true,
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Creation timestamp',
            example: '2025-09-06T15:18:03.828Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Last update timestamp',
            example: '2025-09-06T15:26:35.312Z',
          },
        },
      },
      Post: {
        type: 'object',
        required: ['title', 'content', 'authorId'],
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            description: 'Unique identifier for the post',
            example: '92a1d978-ba17-4fd7-af9f-5010bd75c48f',
          },
          title: {
            type: 'string',
            description: 'Title of the post',
            example: 'Welcome to MVC Architecture',
          },
          content: {
            type: 'string',
            description: 'Content of the post',
            example: 'This is a comprehensive guide to understanding Model-View-Controller pattern.',
          },
          authorId: {
            type: 'string',
            format: 'uuid',
            description: 'ID of the author',
            example: 'ea270bdb-888d-48f9-aaee-3ba81a3078d0',
          },
          published: {
            type: 'boolean',
            description: 'Whether the post is published',
            example: true,
          },
          tags: {
            type: 'array',
            items: {
              type: 'string',
            },
            description: 'Tags associated with the post',
            example: ['architecture', 'web-development'],
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Creation timestamp',
            example: '2025-09-06T15:18:03.828Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Last update timestamp',
            example: '2025-09-06T15:43:31.490Z',
          },
        },
      },
      CreateUserRequest: {
        type: 'object',
        required: ['name', 'email', 'role'],
        properties: {
          name: {
            type: 'string',
            description: 'Full name of the user',
            example: 'John Doe',
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'Email address of the user',
            example: 'john@example.com',
          },
          role: {
            type: 'string',
            enum: ['admin', 'moderator', 'user'],
            description: 'Role of the user',
            example: 'user',
          },
          isActive: {
            type: 'boolean',
            description: 'Whether the user is active',
            example: true,
            default: true,
          },
        },
      },
      UpdateUserRequest: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Full name of the user',
            example: 'John Doe Updated',
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'Email address of the user',
            example: 'john.updated@example.com',
          },
          role: {
            type: 'string',
            enum: ['admin', 'moderator', 'user'],
            description: 'Role of the user',
            example: 'moderator',
          },
          isActive: {
            type: 'boolean',
            description: 'Whether the user is active',
            example: true,
          },
        },
      },
      CreatePostRequest: {
        type: 'object',
        required: ['title', 'content', 'authorId'],
        properties: {
          title: {
            type: 'string',
            description: 'Title of the post',
            example: 'My New Post',
          },
          content: {
            type: 'string',
            description: 'Content of the post',
            example: 'This is the content of my new post.',
          },
          authorId: {
            type: 'string',
            format: 'uuid',
            description: 'ID of the author',
            example: 'ea270bdb-888d-48f9-aaee-3ba81a3078d0',
          },
          published: {
            type: 'boolean',
            description: 'Whether the post is published',
            example: false,
            default: false,
          },
          tags: {
            type: 'array',
            items: {
              type: 'string',
            },
            description: 'Tags associated with the post',
            example: ['tag1', 'tag2'],
          },
        },
      },
      UpdatePostRequest: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            description: 'Title of the post',
            example: 'Updated Post Title',
          },
          content: {
            type: 'string',
            description: 'Content of the post',
            example: 'Updated content of the post.',
          },
          published: {
            type: 'boolean',
            description: 'Whether the post is published',
            example: true,
          },
          tags: {
            type: 'array',
            items: {
              type: 'string',
            },
            description: 'Tags associated with the post',
            example: ['updated', 'tag'],
          },
        },
      },
      PaginationInfo: {
        type: 'object',
        properties: {
          page: {
            type: 'integer',
            description: 'Current page number',
            example: 1,
          },
          limit: {
            type: 'integer',
            description: 'Number of items per page',
            example: 10,
          },
          total: {
            type: 'integer',
            description: 'Total number of items',
            example: 100,
          },
          totalPages: {
            type: 'integer',
            description: 'Total number of pages',
            example: 10,
          },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: false,
          },
          error: {
            type: 'string',
            description: 'Error message',
            example: 'Internal server error',
          },
        },
      },
    },
    responses: {
      NotFound: {
        description: 'Resource not found',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorResponse',
            },
          },
        },
      },
      BadRequest: {
        description: 'Bad request',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorResponse',
            },
          },
        },
      },
      InternalServerError: {
        description: 'Internal server error',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorResponse',
            },
          },
        },
      },
    },
  },
  tags: [
    {
      name: 'Users',
      description: 'User management operations',
    },
    {
      name: 'Posts',
      description: 'Post management operations',
    },
  ],
};