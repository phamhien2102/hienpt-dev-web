// Base model class that all other models extend
import { BaseEntity } from '@/types';

export abstract class BaseModel<T extends BaseEntity> {
  protected data: T[] = [];
  protected nextId = 1;

  // Generate a unique ID
  protected generateId(): string {
    return `id_${this.nextId++}_${Date.now()}`;
  }

  // Create a new entity
  async create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T> {
    const now = new Date();
    const entity: T = {
      ...data,
      id: this.generateId(),
      createdAt: now,
      updatedAt: now,
    } as T;

    this.data.push(entity);
    return entity;
  }

  // Find entity by ID
  async findById(id: string): Promise<T | null> {
    return this.data.find(item => item.id === id) || null;
  }

  // Find all entities
  async findAll(): Promise<T[]> {
    return [...this.data];
  }

  // Update entity by ID
  async update(id: string, data: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>): Promise<T | null> {
    const index = this.data.findIndex(item => item.id === id);
    if (index === -1) return null;

    this.data[index] = {
      ...this.data[index],
      ...data,
      updatedAt: new Date(),
    };

    return this.data[index];
  }

  // Delete entity by ID
  async delete(id: string): Promise<boolean> {
    const index = this.data.findIndex(item => item.id === id);
    if (index === -1) return false;

    this.data.splice(index, 1);
    return true;
  }

  // Find entities with pagination
  async findWithPagination(page: number = 1, limit: number = 10): Promise<{
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = this.data.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      total: this.data.length,
      page,
      limit,
      totalPages: Math.ceil(this.data.length / limit),
    };
  }

  // Search entities
  async search(query: string, fields: (keyof T)[]): Promise<T[]> {
    const searchTerm = query.toLowerCase();
    return this.data.filter(item =>
      fields.some(field => {
        const value = item[field];
        return value && String(value).toLowerCase().includes(searchTerm);
      })
    );
  }
}