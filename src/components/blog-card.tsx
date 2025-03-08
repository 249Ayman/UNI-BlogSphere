import { BlogPost } from "@/types/blog";
import { formatDate } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <div
      className={`bg-white rounded-lg overflow-hidden shadow-sm border border-border transition-all hover:shadow-md ${featured ? "col-span-2 row-span-2" : ""}`}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        </div>
      </Link>

      <div className="p-5">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span>{formatDate(post.published_at)}</span>
          {post.tags && post.tags.length > 0 && (
            <>
              <span>•</span>
              <span>{post.tags[0]}</span>
            </>
          )}
        </div>

        <Link href={`/blog/${post.slug}`} className="block group">
          <h3
            className={`font-semibold tracking-tight group-hover:text-primary ${featured ? "text-2xl mb-3" : "text-xl mb-2"}`}
          >
            {post.title}
          </h3>
        </Link>

        <p className="text-muted-foreground line-clamp-2 mb-4">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8 rounded-full overflow-hidden bg-muted">
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
          <span className="text-sm font-medium">{post.author.name}</span>
        </div>
      </div>
    </div>
  );
}
