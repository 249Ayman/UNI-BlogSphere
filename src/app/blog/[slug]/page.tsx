import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { mockPosts } from "@/data/mock-posts";
import { formatDate } from "@/utils/utils";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageSquare, Share2, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { createClient } from "../../../../supabase/server";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;
  const post = mockPosts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Get related posts (excluding current post)
  const relatedPosts = mockPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <article className="py-12">
        <div className="container mx-auto px-4">
          {/* Back button */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to all articles
            </Link>
          </div>

          {/* Article header */}
          <div className="max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <div className="relative h-12 w-12 rounded-full overflow-hidden bg-muted">
                <Image
                  src={
                    post.author.avatar ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author.id}`
                  }
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-medium">{post.author.name}</div>
                <div className="text-sm text-muted-foreground">
                  {formatDate(post.published_at)}
                </div>
              </div>
            </div>

            {/* Featured image */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl mb-12 bg-muted">
              <Image
                src={post.featured_image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Article content */}
          <div className="max-w-3xl mx-auto">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-12">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Article actions */}
            <div className="flex items-center justify-between mt-12 py-6 border-t border-gray-200">
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <ThumbsUp className="w-5 h-5" />
                  <span>Like</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <MessageSquare className="w-5 h-5" />
                  <span>Comment</span>
                </button>
              </div>
              <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>

            {/* Comments section */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6">Comments</h3>

              {user ? (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-medium mb-4">Leave a comment</h4>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                    placeholder="Share your thoughts..."
                  />
                  <div className="mt-4 flex justify-end">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Post Comment
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <p className="mb-4">Sign in to leave a comment</p>
                  <Link
                    href="/sign-in"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors inline-block"
                  >
                    Sign In
                  </Link>
                </div>
              )}

              <div className="mt-8">
                <p className="text-gray-500 italic">
                  No comments yet. Be the first to comment!
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related articles */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Related Articles</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <div key={relatedPost.id}>
                <Link
                  href={`/blog/${relatedPost.slug}`}
                  className="block group"
                >
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-4 bg-muted">
                    <Image
                      src={relatedPost.featured_image}
                      alt={relatedPost.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                    {relatedPost.title}
                  </h3>
                </Link>
                <p className="text-gray-600 line-clamp-2">
                  {relatedPost.excerpt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
