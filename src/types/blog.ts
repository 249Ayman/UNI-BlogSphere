export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  featured_image: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  published_at: string;
  updated_at?: string;
  slug: string;
  tags?: string[];
}
