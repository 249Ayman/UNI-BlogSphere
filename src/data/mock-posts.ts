import { BlogPost } from "@/types/blog";

export const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with Next.js and Supabase",
    content:
      "<p>Next.js is a powerful React framework that enables functionality such as server-side rendering and static site generation. Supabase is an open-source Firebase alternative that provides all the backend services you need.</p><p>In this tutorial, we'll walk through setting up a Next.js project with Supabase authentication and database services. We'll create a simple blog application where users can sign up, create posts, and comment on other posts.</p><h2>Setting Up Your Project</h2><p>First, let's create a new Next.js project:</p><pre><code>npx create-next-app my-blog-app</code></pre><p>Next, let's install the Supabase client libraries:</p><pre><code>npm install @supabase/supabase-js @supabase/auth-helpers-nextjs</code></pre><h2>Configuring Supabase</h2><p>Create a new Supabase project from the Supabase dashboard. Once your project is created, you'll need the URL and anon key.</p><p>Create a .env.local file in your project root and add these values:</p><pre><code>NEXT_PUBLIC_SUPABASE_URL=your-supabase-url\nNEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key</code></pre><h2>Setting Up Authentication</h2><p>Now let's create a simple authentication system. First, create a client for Supabase:</p><pre><code>// lib/supabase.js\nimport { createClient } from '@supabase/supabase-js'\n\nconst supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL\nconst supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY\n\nexport const supabase = createClient(supabaseUrl, supabaseKey)</code></pre><p>Next, create a sign-up form component:</p><pre><code>// components/SignUpForm.js\nimport { useState } from 'react'\nimport { supabase } from '../lib/supabase'\n\nexport default function SignUpForm() {\n  const [email, setEmail] = useState('')\n  const [password, setPassword] = useState('')\n  const [loading, setLoading] = useState(false)\n  const [message, setMessage] = useState('')\n\n  const handleSignUp = async (e) => {\n    e.preventDefault()\n    setLoading(true)\n    \n    const { error } = await supabase.auth.signUp({\n      email,\n      password,\n    })\n    \n    setLoading(false)\n    \n    if (error) {\n      setMessage(error.message)\n    } else {\n      setMessage('Check your email for the confirmation link!')\n    }\n  }\n\n  return (\n    <form onSubmit={handleSignUp}>\n      <input\n        type=\"email\"\n        placeholder=\"Email\"\n        value={email}\n        onChange={(e) => setEmail(e.target.value)}\n        required\n      />\n      <input\n        type=\"password\"\n        placeholder=\"Password\"\n        value={password}\n        onChange={(e) => setPassword(e.target.value)}\n        required\n      />\n      <button type=\"submit\" disabled={loading}>\n        {loading ? 'Loading...' : 'Sign Up'}\n      </button>\n      {message && <p>{message}</p>}\n    </form>\n  )\n}</code></pre><h2>Creating the Database Schema</h2><p>In your Supabase dashboard, create the following tables:</p><ol><li>profiles - to store user profile information</li><li>posts - to store blog posts</li><li>comments - to store comments on posts</li></ol><p>For the profiles table, create columns for id (UUID, primary key), username (text), avatar_url (text), and website (text).</p><p>For the posts table, create columns for id (UUID, primary key), title (text), content (text), author_id (UUID, foreign key to profiles.id), and created_at (timestamp with time zone).</p><p>For the comments table, create columns for id (UUID, primary key), post_id (UUID, foreign key to posts.id), author_id (UUID, foreign key to profiles.id), content (text), and created_at (timestamp with time zone).</p><h2>Conclusion</h2><p>You now have a basic setup for a blog application with Next.js and Supabase. You can expand on this by adding features like post editing, comment moderation, and user profiles.</p><p>In the next tutorial, we'll look at how to implement the frontend for displaying posts and comments, as well as how to handle user authentication state in your application.</p>",
    excerpt:
      "Learn how to build a modern blog application using Next.js and Supabase with authentication and database features.",
    featured_image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    author: {
      id: "1",
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
    published_at: "2023-09-15T10:00:00Z",
    updated_at: "2023-09-16T14:30:00Z",
    slug: "getting-started-with-nextjs-and-supabase",
    tags: ["Next.js", "Supabase", "Tutorial"],
  },
  {
    id: "2",
    title: "Building Responsive UIs with Tailwind CSS",
    content:
      "<p>Tailwind CSS has revolutionized the way developers approach styling in web applications. Instead of writing custom CSS, Tailwind provides utility classes that can be composed to build any design directly in your markup.</p><p>In this article, we'll explore how to create responsive user interfaces using Tailwind CSS, focusing on practical examples and best practices.</p>",
    excerpt:
      "Discover how to create beautiful, responsive user interfaces using Tailwind CSS's utility-first approach.",
    featured_image:
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&q=80",
    author: {
      id: "2",
      name: "Michael Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    },
    published_at: "2023-10-05T09:15:00Z",
    slug: "building-responsive-uis-with-tailwind-css",
    tags: ["Tailwind CSS", "UI Design", "Frontend"],
  },
  {
    id: "3",
    title: "State Management in React: Context API vs. Redux",
    content:
      "<p>State management is a crucial aspect of building React applications, especially as they grow in complexity. Two popular options for managing state in React are the built-in Context API and the Redux library.</p><p>In this comparison, we'll look at the strengths and weaknesses of each approach, and provide guidance on when to use one over the other.</p>",
    excerpt:
      "Compare React's Context API with Redux for state management and learn which solution is best for your project.",
    featured_image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    author: {
      id: "3",
      name: "Alex Rodriguez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    },
    published_at: "2023-10-12T14:30:00Z",
    slug: "state-management-in-react-context-api-vs-redux",
    tags: ["React", "State Management", "Redux"],
  },
  {
    id: "4",
    title: "Optimizing Performance in Next.js Applications",
    content:
      "<p>Performance is a critical factor in user experience and SEO. Next.js provides several features and optimizations out of the box, but there are additional steps you can take to ensure your application runs as efficiently as possible.</p><p>In this guide, we'll explore various techniques for optimizing the performance of your Next.js applications, from code splitting to image optimization.</p>",
    excerpt:
      "Learn practical techniques to improve the performance of your Next.js applications for better user experience and SEO.",
    featured_image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    author: {
      id: "1",
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
    published_at: "2023-10-20T11:45:00Z",
    slug: "optimizing-performance-in-nextjs-applications",
    tags: ["Next.js", "Performance", "Optimization"],
  },
  {
    id: "5",
    title: "Introduction to TypeScript for JavaScript Developers",
    content:
      "<p>TypeScript has gained immense popularity in recent years as a superset of JavaScript that adds static typing. For JavaScript developers, making the transition to TypeScript can greatly improve code quality and developer experience.</p><p>This introduction will cover the basics of TypeScript, including types, interfaces, and other key features that make it a powerful tool for building robust applications.</p>",
    excerpt:
      "Get started with TypeScript and learn how it can improve your JavaScript development workflow with static typing.",
    featured_image:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80",
    author: {
      id: "2",
      name: "Michael Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    },
    published_at: "2023-11-02T10:20:00Z",
    slug: "introduction-to-typescript-for-javascript-developers",
    tags: ["TypeScript", "JavaScript", "Web Development"],
  },
  {
    id: "6",
    title: "Building a RESTful API with Node.js and Express",
    content:
      "<p>RESTful APIs are a standard way of enabling communication between systems on the web. Node.js, with the Express framework, provides a powerful and flexible platform for building these APIs.</p><p>In this tutorial, we'll walk through the process of creating a RESTful API from scratch using Node.js and Express, covering routing, middleware, error handling, and more.</p>",
    excerpt:
      "Follow this step-by-step guide to create a RESTful API using Node.js and Express with best practices for structure and security.",
    featured_image:
      "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&q=80",
    author: {
      id: "3",
      name: "Alex Rodriguez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    },
    published_at: "2023-11-15T13:10:00Z",
    slug: "building-a-restful-api-with-nodejs-and-express",
    tags: ["Node.js", "Express", "API Development"],
  },
];
