import { create } from "zustand";
import axios from "axios";

interface Blog {
  objectId: string;
  title: string;
  thumbnail: string;
  content: string;
  categories: string;
  created: string;
}

interface BlogStore {
  blogs: Blog[];
  fetchBlogs: () => Promise<void>;
}

export const useBlogStore = create<BlogStore>((set) => ({
  blogs: [],
  fetchBlogs: async () => {
    try {
      const res = await axios.get(
        "https://awesomebucket-us.backendless.app/api/data/blogs"
      );
      set({ blogs: res.data });
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  },
}));
