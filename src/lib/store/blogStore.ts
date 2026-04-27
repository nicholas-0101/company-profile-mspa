import { create } from "zustand";
import axios from "axios";

export interface BlogPost {
  objectId: string;
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  content: string;
  categories: string;
  published: boolean;
  createdAt: string;
  account: {
    username: string;
  };
}

interface BlogStore {
  blogs: BlogPost[];
  editingBlog: BlogPost | null;
  fetchBlogs: (accountId?: string) => Promise<void>;
  setEditingBlog: (blog: BlogPost | null) => void;
}

export const useBlogStore = create<BlogStore>((set) => ({
  blogs: [],
  editingBlog: null,
  setEditingBlog: (blog) => set({ editingBlog: blog }),
  fetchBlogs: async (accountId?: string) => {
    try {
      const url = accountId ? `/api/blogs?accountId=${accountId}` : "/api/blogs";
      const res = await axios.get(url);
      set({ blogs: res.data });
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  },
}));
