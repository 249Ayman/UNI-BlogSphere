import DashboardNavbar from "@/components/dashboard-navbar";
import { Button } from "@/components/ui/button";
import {
  InfoIcon,
  UserCircle,
  BookOpen,
  Edit,
  BarChart,
  Settings,
} from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";
import Link from "next/link";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Fetch user's posts count
  const { count: postsCount, error: postsError } = await supabase
    .from("posts")
    .select("id", { count: "exact", head: true })
    .eq("author_id", user.id);

  // Fetch user's published posts count
  const { count: publishedCount, error: publishedError } = await supabase
    .from("posts")
    .select("id", { count: "exact", head: true })
    .eq("author_id", user.id)
    .eq("status", "published");

  // Fetch user's draft posts count
  const { count: draftCount, error: draftError } = await supabase
    .from("posts")
    .select("id", { count: "exact", head: true })
    .eq("author_id", user.id)
    .eq("status", "draft");

  return (
    <>
      <DashboardNavbar />
      <main className="w-full">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="bg-secondary/50 text-sm p-3 px-4 rounded-lg text-muted-foreground flex gap-2 items-center">
              <InfoIcon size="14" />
              <span>
                Welcome to your writer dashboard. Manage your posts and profile
                here.
              </span>
            </div>
          </header>

          {/* Stats Section */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-xl p-6 border shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Total Posts
                  </h3>
                  <p className="text-3xl font-bold mt-2">{postsCount || 0}</p>
                </div>
                <div className="bg-primary/10 p-2 rounded-full">
                  <BookOpen size={20} className="text-primary" />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Published
                  </h3>
                  <p className="text-3xl font-bold mt-2">
                    {publishedCount || 0}
                  </p>
                </div>
                <div className="bg-green-100 p-2 rounded-full">
                  <BookOpen size={20} className="text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Drafts
                  </h3>
                  <p className="text-3xl font-bold mt-2">{draftCount || 0}</p>
                </div>
                <div className="bg-yellow-100 p-2 rounded-full">
                  <Edit size={20} className="text-yellow-600" />
                </div>
              </div>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="bg-card rounded-xl p-6 border shadow-sm">
            <h2 className="font-semibold text-xl mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/dashboard/posts/new">
                <Button className="w-full justify-start" variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Create New Post
                </Button>
              </Link>
              <Link href="/dashboard/posts">
                <Button className="w-full justify-start" variant="outline">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Manage Posts
                </Button>
              </Link>
              <Link href="/dashboard/profile">
                <Button className="w-full justify-start" variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </Link>
            </div>
          </section>

          {/* User Profile Section */}
          <section className="bg-card rounded-xl p-6 border shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <UserCircle size={48} className="text-primary" />
              <div>
                <h2 className="font-semibold text-xl">User Profile</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 overflow-hidden">
              <pre className="text-xs font-mono max-h-48 overflow-auto">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
