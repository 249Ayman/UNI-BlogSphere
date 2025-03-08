import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { mockPosts } from "@/data/mock-posts";
import BlogCard from "@/components/blog-card";
import { createClient } from "../../../supabase/server";

export default async function BlogPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Blog Header */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
            <p className="text-xl text-gray-600">
              Insights, tutorials, and stories from our community of writers
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Want to contribute?</h2>
            <p className="text-gray-600 mb-8">
              Share your knowledge and insights with our growing community of
              readers.
            </p>
            <a
              href={user ? "/dashboard" : "/sign-up"}
              className="inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {user ? "Write an Article" : "Sign Up to Write"}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
