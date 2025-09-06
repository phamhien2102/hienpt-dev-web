// Users page demonstrating MVC pattern
'use client';

import React, { useState } from 'react';
import { UserList, UserForm } from '@/views/components/UserView';
import { User, CreateUserForm, UpdateUserForm } from '@/types';
import { UserService } from '@/services/UserService';

export default function UsersPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const userService = new UserService();

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleCreateUser = () => {
    setSelectedUser(null);
    setIsEditing(false);
    setShowForm(true);
  };

  const handleFormSubmit = async (userData: CreateUserForm | UpdateUserForm) => {
    setFormLoading(true);
    try {
      let response;
      if (isEditing && selectedUser) {
        response = await userService.updateUser(selectedUser.id, userData as UpdateUserForm);
      } else {
        response = await userService.createUser(userData as CreateUserForm);
      }

      if (response.success) {
        setShowForm(false);
        setSelectedUser(null);
        setIsEditing(false);
        // Refresh the user list would happen here
        window.location.reload(); // Simple refresh for demo
      } else {
        alert(response.error || 'An error occurred');
      }
    } catch (error) {
      alert('An unexpected error occurred');
    } finally {
      setFormLoading(false);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setSelectedUser(null);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <button
            onClick={handleCreateUser}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Create New User
          </button>
        </div>

        {showForm ? (
          <UserForm
            user={selectedUser || undefined}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            loading={formLoading}
          />
        ) : (
          <UserList onUserSelect={handleUserSelect} />
        )}
      </div>
    </div>
  );
}