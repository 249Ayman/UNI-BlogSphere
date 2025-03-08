import { BlogPost } from "@/types/blog";
import BlogCard from "./blog-card";

interface FeaturedPostsProps {
  posts: BlogPost[];
}

export default function FeaturedPosts({ posts }: FeaturedPostsProps) {
  // Get the first post as featured and the rest as regular posts
  const featuredPost = posts[0];
  const regularPosts = posts.slice(1, 5); // Show only 4 regular posts

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Articles</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our latest insights, tutorials, and thought leadership
            pieces
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Featured post takes up more space */}
          <div className="lg:col-span-2 lg:row-span-2">
            <BlogCard post={featuredPost} featured={true} />
          </div>

          {/* Regular posts */}
          {regularPosts.map((post) => (
            <div key={post.id}>
              <BlogCard post={post} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/blog"
            className="inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Articles
          </a>
        </div>
      </div>
    </section>
  );
}
