import DashboardNavbar from "@/components/dashboard-navbar";
import { Button } from "@/components/ui/button";
import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import { Edit, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/utils/utils";

export default async function PostsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Fetch user's posts
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .eq("author_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
  }

  return (
    <>
      <DashboardNavbar />
      <main className="w-full">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">My Posts</h1>
            <Link href="/dashboard/posts/new">
              <Button className="flex items-center gap-2">
                <Plus size={16} />
                New Post
              </Button>
            </Link>
          </header>

          {/* Posts List */}
          <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
            {posts && posts.length > 0 ? (
              <div className="divide-y">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="p-6 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-medium text-lg">{post.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span>
                          {post.status === "published" ? "Published" : "Draft"}
                        </span>
                        <span>•</span>
                        <span>
                          {post.created_at
                            ? formatDate(post.created_at)
                            : "No date"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link href={`/dashboard/posts/${post.id}/edit`}>
                        <Button variant="outline" size="icon">
                          <Edit size={16} />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-destructive"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <h3 className="text-xl font-medium mb-2">No posts yet</h3>
                <p className="text-muted-foreground mb-6">
                  Create your first blog post to get started
                </p>
                <Link href="/dashboard/posts/new">
                  <Button className="flex items-center gap-2">
                    <Plus size={16} />
                    Create New Post
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
