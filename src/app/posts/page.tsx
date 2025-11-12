'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Navigation } from '@/views/components/Navigation';

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

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [filteredCount, setFilteredCount] = useState(0);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [featuredArticleIndex, setFeaturedArticleIndex] = useState(0);

  const focusSearchInput = () => {
    if (typeof window === 'undefined') return;
    const selector = window.matchMedia('(min-width: 768px)').matches
      ? 'input[data-search-input="desktop"]'
      : 'input[data-search-input="mobile"]';
    const input = document.querySelector(selector) as HTMLInputElement | null;
    input?.focus();
  };

  const articleMetrics = useMemo(() => {
    const map = new Map<string, { readTime: number; views: number }>();
    allPosts.forEach((post, index) => {
      const seed = (index + 1) * (post.title.length + post.id.length);
      const readTime = 3 + (seed % 6);
      const views = 900 + ((seed * 137) % 6200);
      map.set(post.id, { readTime, views });
    });
    return map;
  }, [allPosts]);

  useEffect(() => {
    if (allPosts.length === 0) {
      setFeaturedArticleIndex(0);
      return;
    }

    const totalFeatured = Math.min(5, allPosts.length);
    const maxFeaturedIndex = Math.max(0, totalFeatured - 1);
    setFeaturedArticleIndex((prev) => Math.min(prev, maxFeaturedIndex));
  }, [allPosts.length]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/posts?page=${page}&limit=100`);
        const data = await response.json();

        if (data.success && data.data?.data) {
          const publishedPosts = data.data.data.filter((post: Post) => post.published);
          setAllPosts(publishedPosts);

          // Extract all unique tags
          const tags = new Set<string>();
          publishedPosts.forEach((post: Post) => {
            post.tags.forEach(tag => tags.add(tag));
          });
          setAllTags(Array.from(tags));
      } else {
          setAllPosts([]);
        }
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  // Filter posts based on search query and category
  useEffect(() => {
    let filtered = [...allPosts];

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((post: Post) => post.tags.includes(selectedCategory));
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((post: Post) =>
        post.title.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Set filtered count for display
    setFilteredCount(filtered.length);

    // Pagination
    const itemsPerPage = 12;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedPosts = filtered.slice(startIndex, endIndex);

    setPosts(paginatedPosts);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
  }, [allPosts, selectedCategory, searchQuery, page]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const truncateContent = (content: string, maxLength: number = 120) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + '...';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 py-16">
          <div className="h-12 bg-gray-200 rounded w-64 mb-8 animate-pulse"></div>
          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(9)].map((_, index) => (
              <div key={index} className="h-64 bg-gray-200 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 py-16">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        {/* New Articles & Popular Articles Section */}
        {allPosts.length > 0 && (
          <section className="mb-16 pt-26">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.75fr)_minmax(0,1.25fr)] items-stretch">
              {/* Featured Article */}
              <div className="relative">
                <div className="absolute top-8 -left-4 origin-left -rotate-16 lg:-rotate-6 xl:-rotate-12 z-20">
                  <span className="inline-block rounded-lg bg-gradient-to-r from-[#7eaaff] via-[#a78bff] to-[#d086ff] px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-gray-900 shadow-lg">
                    New Articles
                  </span>
                </div>

                {allPosts[featuredArticleIndex] && (() => {
                  const featuredPost = allPosts[featuredArticleIndex];
                  const imageUrl =
                    featuredPost.image ||
                    featuredPost.imageUrl ||
                    `https://picsum.photos/seed/${featuredPost.id}/1200/900`;
                  const metrics = articleMetrics.get(featuredPost.id) ?? {
                    readTime: 5,
                    views: 2400,
                  };
                  const totalFeatured = Math.min(5, allPosts.length);

                  return (
                    <article className="relative overflow-hidden rounded-[40px] bg-white shadow-[0_35px_70px_rgba(15,23,42,0.15)]">
                      <div className="relative z-10 flex flex-col lg:h-[720px]">
                        <div className="flex flex-col gap-10 px-10 pt-16 pb-12 lg:pr-[45%] flex-1">
                          <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-white font-semibold">
                              {featuredPost.authorId
                                ? featuredPost.authorId.charAt(0).toUpperCase()
                                : 'A'}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">Author</p>
                              <p className="text-sm text-gray-500">Editorial Team</p>
                            </div>
                          </div>

                          <div className="space-y-6 overflow-hidden flex-1">
                            <h2 className="text-4xl font-black leading-tight text-gray-900 md:text-5xl line-clamp-3">
                              {featuredPost.title}
                            </h2>

                            {featuredPost.tags.length > 0 && (
                              <div className="flex items-center gap-3">
                                <span className="h-px w-16 bg-gray-300" />
                                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-600">
                                  {featuredPost.tags[0]}
                                </span>
                              </div>
                            )}

                            <p className="text-base text-gray-600 md:text-lg line-clamp-3">
                              {featuredPost.content}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-gray-500">
                            <div className="flex items-center gap-2">
                              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              <span>{metrics.views.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>{metrics.readTime} min</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>{formatDate(featuredPost.createdAt)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="relative z-10 flex flex-col gap-6 border-t border-gray-200 px-10 py-10 lg:flex-row lg:items-center lg:justify-between">
                          <div className="flex items-center gap-6">
                            <div className="text-4xl font-black text-gray-900 md:text-5xl">
                              {String(featuredArticleIndex + 1).padStart(2, '0')}
                              <span className="ml-2 text-2xl font-bold text-gray-300">
                                /{String(totalFeatured).padStart(2, '0')}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-500">
                              <button
                                onClick={() =>
                                  setFeaturedArticleIndex((prev) =>
                                    prev === 0 ? Math.min(totalFeatured - 1, Math.max(0, totalFeatured - 1)) : prev - 1
                                  )
                                }
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition-colors hover:border-gray-500 hover:text-gray-900"
                                aria-label="Previous featured article"
                              >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                              </button>
                              <button
                                onClick={() =>
                                  setFeaturedArticleIndex((prev) =>
                                    prev >= totalFeatured - 1 ? 0 : prev + 1
                                  )
                                }
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition-colors hover:border-gray-500 hover:text-gray-900"
                                aria-label="Next featured article"
                              >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </button>
                            </div>
                            <div className="hidden items-center gap-1 lg:flex">
                              {Array.from({ length: totalFeatured }).map((_, idx) => (
                                <span
                                  key={idx}
                                  className={`h-2 w-2 rounded-full transition-colors ${
                                    idx === featuredArticleIndex ? 'bg-gray-900' : 'bg-gray-300'
                                  }`}
                                ></span>
                              ))}
                            </div>
                          </div>
                          <Link href={`/posts/${featuredPost.id}`}>
                            <span className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03] hover:bg-orange-600">
                              Read More
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                            </span>
                          </Link>
                        </div>
                      </div>

                      <div className="absolute inset-y-0 right-0 hidden w-[48%] overflow-hidden lg:block">
                        <img
                          src={imageUrl}
                          alt={featuredPost.title}
                          className="h-full w-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-l from-white via-white/40 to-transparent" />
                      </div>
                    </article>
                  );
                })()}
              </div>

              {/* Popular Articles */}
              <aside className="relative overflow-hidden rounded-[36px] bg-[#0f141b] shadow-[0_28px_60px_rgba(15,23,42,0.45)] lg:h-[720px]">
                <span className="absolute left-0 top-0 h-full w-2 bg-orange-500" />
                <div className="relative z-10 h-full px-8 py-10 flex flex-col">
                  <div className="mb-10 flex-shrink-0">
                    <h3 className="text-6xl font-black tracking-tight text-white">Blog.</h3>
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                      Popular Articles
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto pr-1">
                    <div className="flex flex-col gap-3">
                    {allPosts.map((post, idx) => {
                      const metrics = articleMetrics.get(post.id) ?? { readTime: 5, views: 2400 };
                      const imageUrl =
                        post.image || post.imageUrl || `https://picsum.photos/seed/${post.id}/400/300`;
                      const isHighlighted = idx === 0;
                      return (
                        <Link key={post.id} href={`/posts/${post.id}`}>
                          <div
                            className={`group flex items-center gap-4 rounded-2xl border border-white/5 px-4 py-4 transition-colors ${
                              isHighlighted ? 'bg-white/8' : 'bg-white/[0.02]'
                            } hover:bg-white/10`}
                          >
                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-white/10">
                              <img
                                src={imageUrl}
                                alt={post.title}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                }}
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-white/90 line-clamp-2">
                                {truncateContent(post.content, 120)}
                              </p>
                              <div className="mt-3 flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-white/50">
                                <span className="flex items-center gap-1">
                                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  {metrics.readTime} min
                                </span>
                                <span className="flex items-center gap-1">
                                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                  {metrics.views.toLocaleString()}
                                </span>
                              </div>
                            </div>
                            <span className="ml-auto flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition-all group-hover:border-orange-500 group-hover:text-orange-400">
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </section>
        )}

        {/* Header - All Articles */}
        {allPosts.length > 0 && (
          <div className="mb-12">
            {/* Title and Search Bar Row */}
            <div className="flex justify-between items-start gap-4 mb-4">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  All Articles
                </h1>
                <p className="text-gray-600 text-lg">
                  Discover our latest blog posts and articles
                </p>
              </div>

              {/* Search and Filter Icons */}
              <div className="flex items-center gap-2 relative pt-1">
                {/* Search Icon Button */}
                <div className="relative flex-shrink-0" data-search-container="true">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (!showSearchBar) {
                        setShowSearchBar(true);
                        requestAnimationFrame(() => {
                          setTimeout(() => {
                            focusSearchInput();
                          }, 50);
                        });
                      } else if (!searchQuery) {
                        setShowSearchBar(false);
                      }
                    }}
                    className="mt-1 w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-200 hover:scale-110"
                    aria-label="Toggle search"
                  >
                    <svg
                      className="w-5 h-5 text-gray-600 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>

                  <div className="hidden md:block absolute -left-[19rem] top-1/2 -translate-y-1/2 w-[18rem]">
                    <div
                      className={`transform origin-right transition-all duration-200 ${showSearchBar ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-2 pointer-events-none'
                        }`}
                      style={{ willChange: 'transform, opacity' }}
                    >
                      <div className="relative bg-white border-2 border-gray-200 rounded-full shadow-sm">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 pointer-events-none">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </span>
                        <input
                          data-search-input="desktop"
                          type="text"
                          placeholder="Search articles..."
                          value={searchQuery}
                          onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setPage(1);
                          }}
                          onBlur={(e) => {
                            const relatedTarget = e.relatedTarget as HTMLElement | null;
                            if (relatedTarget && (
                              relatedTarget.closest('[data-search-container="true"]') ||
                              relatedTarget.closest('[data-filter-button="true"]')
                            )) {
                              return;
                            }
                            setTimeout(() => {
                              if (!searchQuery) {
                                setShowSearchBar(false);
                              }
                            }, 100);
                          }}
                          className="w-full bg-transparent pl-12 pr-12 py-3 text-sm text-gray-900 placeholder-gray-400 rounded-full focus:outline-none focus:border-gray-400"
                        />
                        {searchQuery && (
                          <button
                            onClick={() => {
                              setSearchQuery('');
                              setPage(1);
                              setShowSearchBar(false);
                            }}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filter Button */}
                {allTags.length > 0 && (
                  <div className="relative flex-shrink-0" data-filter-button="true">
                    <button
                      onClick={() => setShowFilterPopup(!showFilterPopup)}
                      className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-200 hover:scale-110 flex-shrink-0 relative"
                    >
                      <svg
                        className="w-5 h-5 text-gray-600 transition-transform duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                      </svg>
                      {selectedCategory && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                      )}
                    </button>

                    {/* Filter Popup */}
                    {showFilterPopup && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setShowFilterPopup(false)}
                        ></div>
                        <div className="absolute top-full right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 min-w-[200px] max-w-xs animate-in fade-in slide-in-from-top-2 duration-200">
                          <div className="px-3 py-2 border-b border-gray-100">
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Categories</h3>
                          </div>
                          <div className="max-h-64 overflow-y-auto">
                            <button
                              onClick={() => {
                                setSelectedCategory(null);
                                setPage(1);
                                setShowFilterPopup(false);
                              }}
                              className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors flex items-center justify-between ${selectedCategory === null
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                              <span>All</span>
                              {selectedCategory === null && (
                                <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </button>
                            {allTags.map((tag) => (
          <button
                                key={tag}
                                onClick={() => {
                                  setSelectedCategory(tag);
                                  setPage(1);
                                  setShowFilterPopup(false);
                                }}
                                className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors flex items-center justify-between ${selectedCategory === tag
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700 hover:bg-gray-50'
                                  }`}
                              >
                                <span>{tag}</span>
                                {selectedCategory === tag && (
                                  <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                )}
          </button>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
        </div>

            {/* Search Bar - Appears below text description on mobile */}
            {showSearchBar && (
              <div className="mb-4 animate-in fade-in slide-in-from-top-2 duration-200 md:hidden">
                <div className="relative max-w-2xl">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg 
                      className="w-5 h-5 text-gray-400" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    data-search-input="mobile"
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setPage(1);
                    }}
                    onBlur={(e) => {
                      const relatedTarget = e.relatedTarget as HTMLElement | null;
                      if (relatedTarget && (
                        relatedTarget.closest('[data-search-container="true"]') ||
                        relatedTarget.closest('[data-filter-button="true"]')
                      )) {
                        return;
                      }
                      setTimeout(() => {
                        if (!searchQuery) {
                          setShowSearchBar(false);
                        }
                      }, 100);
                    }}
                    className="w-full pl-12 pr-10 py-3 bg-white border-2 border-gray-200 rounded-full text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-0 transition-all duration-200"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setPage(1);
                        setShowSearchBar(false);
                      }}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Search Results Count - Fixed Height to Prevent Layout Shift */}
            <div className="h-6 mt-4">
              {(searchQuery || selectedCategory) && (
                <div className="flex items-center gap-3 text-sm text-gray-600 animate-in fade-in slide-in-from-top-1 duration-300">
                  <div className="flex items-center gap-2">
                    {searchQuery && (
                      <span>Found {filteredCount} {filteredCount === 1 ? 'article' : 'articles'} for "{searchQuery}"</span>
                    )}
                    {searchQuery && selectedCategory && <span> • </span>}
                    {selectedCategory && (
                      <span>Filtered by: <strong>{selectedCategory}</strong></span>
                    )}
                  </div>
                  {selectedCategory && (
                    <button
                      onClick={() => {
                        setSelectedCategory(null);
                        setPage(1);
                      }}
                      className="flex items-center gap-1 px-2 py-1 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                      aria-label="Clear filter"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>Clear</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <p className="text-gray-500 text-lg">No blog posts available yet. Check back soon!</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {posts.map((post) => {
                const imageUrl = post.image || post.imageUrl || `https://picsum.photos/seed/${post.id}/600/400`;

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
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                        {/* Content */}
                        <div className="absolute inset-0 p-6 flex flex-col justify-end">
                          <div className="flex items-center gap-2 text-white/90 text-xs mb-2">
                            <time dateTime={post.createdAt}>
                              {formatDate(post.createdAt)}
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
                          <p className="text-white/80 text-sm line-clamp-2">
                            {truncateContent(post.content)}
                          </p>
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={() => setPage(prev => Math.max(1, prev - 1))}
                  disabled={page === 1}
                  className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <span className="text-gray-600 font-medium">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={page === totalPages}
                  className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Hien Pham. All rights reserved.
          </p>
      </div>
      </footer>
    </div>
  );
}
