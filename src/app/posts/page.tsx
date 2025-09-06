// Posts page demonstrating MVC pattern
'use client';

import React, { useState } from 'react';
import { PostList, PostForm } from '@/views/components/PostView';
import { Post, CreatePostForm, UpdatePostForm } from '@/types';
import { PostService } from '@/services/PostService';

export default function PostsPage() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const postService = new PostService();

  const handlePostSelect = (post: Post) => {
    setSelectedPost(post);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleCreatePost = () => {
    setSelectedPost(null);
    setIsEditing(false);
    setShowForm(true);
  };

  const handleFormSubmit = async (postData: CreatePostForm | UpdatePostForm) => {
    setFormLoading(true);
    try {
      let response;
      if (isEditing && selectedPost) {
        response = await postService.updatePost(selectedPost.id, postData as UpdatePostForm);
      } else {
        // For demo purposes, using a mock author ID
        response = await postService.createPost(postData as CreatePostForm, 'demo-author-id');
      }

      if (response.success) {
        setShowForm(false);
        setSelectedPost(null);
        setIsEditing(false);
        // Refresh the post list would happen here
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
    setSelectedPost(null);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Post Management</h1>
          <button
            onClick={handleCreatePost}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Create New Post
          </button>
        </div>

        {showForm ? (
          <PostForm
            post={selectedPost || undefined}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            loading={formLoading}
          />
        ) : (
          <PostList onPostSelect={handlePostSelect} />
        )}
      </div>
    </div>
  );
}