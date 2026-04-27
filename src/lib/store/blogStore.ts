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
  createdAt: string;
  account: {
    username: string;
  };
}

interface BlogStore {
  blogs: BlogPost[];
  fetchBlogs: () => Promise<void>;
}

export const useBlogStore = create<BlogStore>((set) => ({
  blogs: [],
  fetchBlogs: async () => {
    try {
      const res = await axios.get("/api/blogs");
      set({ blogs: res.data });
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  },
}));
