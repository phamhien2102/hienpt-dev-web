'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  published: boolean;
  tags: string[];
  image?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogSectionProps {
  limit?: number;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ limit = 6 }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/posts?page=1&limit=${limit}`);
        const data = await response.json();
        
        if (data.success && data.data?.data) {
          // Filter only published posts
          const publishedPosts = data.data.data.filter((post: Post) => post.published);
          setPosts(publishedPosts);
        } else {
          setPosts([]);
        }
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [limit]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + '...';
  };

  if (loading) {
    return (
      <section id="blog" className="max-w-7xl mx-auto mb-16 px-4">
        <div className="flex justify-between items-center mb-8">
          <div className="h-12 bg-gray-200 rounded w-64 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 h-[600px] bg-gray-200 rounded-2xl animate-pulse"></div>
          <div className="space-y-6">
            <div className="h-64 bg-gray-200 rounded-2xl animate-pulse"></div>
            <div className="h-64 bg-gray-200 rounded-2xl animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="blog" className="max-w-7xl mx-auto mb-16 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Best of the week</h2>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section id="blog" className="max-w-7xl mx-auto mb-16 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Best of the week</h2>
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <p className="text-gray-500 text-lg">No blog posts available yet. Check back soon!</p>
        </div>
      </section>
    );
  }

  const formatShortDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <section id="blog" className="max-w-7xl mx-auto mb-16 px-4 scroll-mt-28">
      {/* Section Header */}
      <div className="flex justify-between items-center mb-8 pt-24">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Best of the week</h2>
        <Link
          href="/posts"
          className="text-gray-600 hover:text-gray-900 font-medium text-sm flex items-center gap-1 transition-colors"
        >
          See all posts →
        </Link>
      </div>

      {/* Featured Post + Grid Layout */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Featured Large Post */}
        {featuredPost && (
          <article className="md:col-span-2 group cursor-pointer">
            <Link href={`/posts/${featuredPost.id}`}>
              <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                <img
                  src={featuredPost.image || featuredPost.imageUrl || `https://picsum.photos/seed/${featuredPost.id}/800/600`}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  {/* Top Metadata */}
                  <div className="flex items-center gap-3 text-white/90 text-sm">
                    <time dateTime={featuredPost.createdAt} className="font-medium">
                      {formatShortDate(featuredPost.createdAt)}
                    </time>
                    {featuredPost.tags.length > 0 && (
                      <>
                        <span>•</span>
                        <span className="font-medium">{featuredPost.tags[0]}</span>
                      </>
                    )}
                  </div>

                  {/* Bottom Content */}
                  <div className="space-y-4">
                    {featuredPost.tags.length > 0 && (
                      <div className="inline-block">
                        <span className="bg-white/95 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full text-sm font-semibold">
                          • {featuredPost.tags[0]}
                        </span>
                      </div>
                    )}
                    <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                      {featuredPost.title}
                    </h3>
                  </div>
                </div>

                {/* Arrow Icon */}
                <div className="absolute bottom-6 right-6 w-12 h-12 bg-black rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </Link>
          </article>
        )}

        {/* Smaller Posts Grid */}
        <div className="space-y-6">
          {otherPosts.slice(0, 2).map((post) => {
            const imageUrl = post.image || post.imageUrl || `https://picsum.photos/seed/${post.id}/400/300`;
            
            return (
              <article key={post.id} className="group cursor-pointer">
                <Link href={`/posts/${post.id}`}>
                  <div className="relative h-64 rounded-2xl overflow-hidden bg-gray-100">
                    <img
                      src={imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    {/* Content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <div className="flex items-center gap-2 text-white/90 text-xs mb-2">
                        <time dateTime={post.createdAt}>
                          {formatShortDate(post.createdAt)}
                        </time>
                        {post.tags.length > 0 && (
                          <>
                            <span>•</span>
                            <span>{post.tags[0]}</span>
                          </>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-white line-clamp-2 mb-2">
                        {post.title}
                      </h3>
                    </div>

                    {/* Arrow Icon */}
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                      <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>

      {/* Additional Posts Grid */}
      {otherPosts.length > 2 && (
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {otherPosts.slice(2).map((post) => {
            const imageUrl = post.image || post.imageUrl || `https://picsum.photos/seed/${post.id}/400/300`;
            
            return (
              <article key={post.id} className="group cursor-pointer">
                <Link href={`/posts/${post.id}`}>
                  <div className="relative h-64 rounded-2xl overflow-hidden bg-gray-100">
                    <img
                      src={imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    {/* Content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <div className="flex items-center gap-2 text-white/90 text-xs mb-2">
                        <span>•</span>
                        {post.tags.length > 0 && <span>{post.tags[0]}</span>}
                      </div>
                      <h3 className="text-lg font-bold text-white line-clamp-2">
                        {post.title}
                      </h3>
                    </div>

                    {/* Arrow Icon */}
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                      <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

