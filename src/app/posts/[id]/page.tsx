import Link from "next/link";
import { notFound } from "next/navigation";
import { Navigation } from "@/views/components/Navigation";

interface Post {
  id: string;
  title: string;
  content: string;
  authorId?: string;
  published?: boolean;
  tags?: string[];
  image?: string;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

async function fetchPost(postId: string): Promise<Post | null> {
  try {
    const response = await fetch(`/api/posts/${postId}`, {
      cache: "no-store",
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      console.error(`Failed to fetch post: ${response.status} ${response.statusText}`);
      return null;
    }

    const payload = await response.json();
    
    // Handle different response structures
    if (!payload) {
      console.error("Empty response payload");
      return null;
    }

    // Check if response indicates failure
    if (payload.success === false) {
      console.error("API returned error:", payload.error);
      return null;
    }

    // Extract post data - handle both { data: post } and direct post object
    const post: Post | undefined = payload?.data ?? payload;

    if (!post || !post.id) {
      console.error("Invalid post data structure:", payload);
      return null;
    }

    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

const formatDate = (date?: string) => {
  if (!date) {
    return "";
  }

  const postDate = new Date(date);
  return postDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const post = await fetchPost(resolvedParams.id);

  if (!post || post.published === false) {
    notFound();
  }

  const featureImage = post.image || post.imageUrl;
  const paragraphs =
    post.content
      ?.split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .filter((paragraph) => paragraph.length > 0) ?? [];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-28 pb-24">
        <div className="max-w-5xl mx-auto px-4">
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to all posts
          </Link>

          <article className="mt-10 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            {featureImage && (
              <div className="relative h-80 md:h-96">
                <img
                  src={featureImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  onError={(event) => {
                    const target = event.currentTarget;
                    target.style.display = "none";
                  }}
                />
              </div>
            )}

            <div className="p-8 md:p-12">
              <header className="mb-8">
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                  {post.createdAt && (
                    <time dateTime={post.createdAt} className="font-medium">
                      {formatDate(post.createdAt)}
                    </time>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <>
                      <span>•</span>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-full bg-blue-50 text-blue-600 px-3 py-1 text-xs font-semibold"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <h1 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                  {post.title}
                </h1>
              </header>

              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                {paragraphs.length > 0 ? (
                  paragraphs.map((paragraph, index) => (
                    <p key={index} className="mb-6 last:mb-0">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p>{post.content}</p>
                )}
              </div>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}


