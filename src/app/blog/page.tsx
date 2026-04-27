"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, Filter, Pencil, Search, SearchX, User2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAccountStore } from "@/lib/store/accountStore";
import { useEffect } from "react";
import axios from "axios";
import { BlogPost } from "@/lib/store/blogStore";

export default function ExploreSection() {
  const account = useAccountStore((state) => state.account);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState("");
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const result = await axios.get("/api/blogs");
        setBlogs(result.data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  };

  const filteredBlogs = blogs.filter((blog) => {
    const searchLower = search.toLowerCase();
    const matchesSearch =
      blog.title.toLowerCase().includes(searchLower) ||
      blog.categories.toLowerCase().includes(searchLower) ||
      blog.content.toLowerCase().includes(searchLower) ||
      blog.account?.username?.toLowerCase().includes(searchLower);

    const matchesCategory = selectedCategory
      ? blog.categories.toLowerCase() === selectedCategory.toLowerCase()
      : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="min-h-screen bg-white pb-32">
      <div className="w-full flex justify-center px-4 sm:px-6">
        <div className="text-center mt-24 w-full max-w-[1016px]">
          <div>
            <h1 className="text-[40px] sm:text-[50px] font-serif font-black text-[#18182b]">
              Jelajahi Blog
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-8">
              Jelajahi blog dari para penulis
            </p>
          </div>

          {/* search and filter */}
          <div className="w-full flex flex-col lg:flex-row md:justify-between md:items-center gap-4 md:gap-6">
            {/* Search */}
            <div className="w-full md:max-w-lg flex gap-2">
              <div className="flex flex-col justify-center items-center">
                <Search color="#475569" />
              </div>
              <Input
                placeholder="Cari ..."
                type="text"
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-full hover:shadow-md"
              />
            </div>

            {/* Filter */}
            <div className="w-full md:w-auto flex flex-wrap md:flex-nowrap items-center gap-2">
              <div className="flex flex-col justify-center items-center">
                <Filter color="#475569" />
              </div>
              {[
                "Semua",
                "Teknologi",
                "Lingkungan",
                "Kesehatan",
                "Ekonomi",
                "Kegiatan",
              ].map((category) => (
                <Button
                  key={category}
                  className={`rounded-full cursor-pointer transition
            text-sm px-3 py-1
            md:text-base md:px-4 md:py-2
            ${
              selectedCategory === category ||
              (category === "Semua" && !selectedCategory)
                ? "bg-[#18182b] text-white hover:bg-[#2e2e45] hover:text-white"
                : "bg-transparent"
            }`}
                  variant="outline"
                  onClick={() =>
                    setSelectedCategory(category === "Semua" ? null : category)
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Blog Grid */}
          <div className="py-10">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center gap-4 py-20">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-[#18182b] rounded-full animate-spin"></div>
                <p className="text-gray-500 font-medium">Memuat blog...</p>
              </div>
            ) : filteredBlogs.length === 0 ? (
              <p className="text-gray-500 text-center text-lg font-medium flex flex-col gap-2 justify-center items-center">
                <SearchX color="#475569" size={100} /> Blog Tidak Ditemukan
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map((blog, i) => (
                  <Link
                    href={`/blog-detail/${blog.slug}`}
                    key={blog.objectId}
                    aria-label="blog-card"
                    className="h-full"
                  >
                    <Card className="p-4 rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-[#18182b] text-left cursor-pointer h-full flex flex-col">
                      <div className="flex flex-col gap-1 h-full">
                        <div className="w-full h-48 rounded-lg overflow-hidden mb-4 relative">
                          <Image
                            src={blog.thumbnail}
                            alt={blog.title}
                            fill
                            priority={i < 3}
                            className="object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </div>

                        <div className="justify-between">
                          <span className="bg-[#18182b] text-white text-xs font-semibold px-3 py-1 rounded-full w-fit">
                            {blog.categories}
                          </span>

                          <div className="flex flex-col gap-1">
                            <h2 className="text-lg font-semibold mt-2 line-clamp-2 break-words truncate whitespace-nowrap overflow-hidden">
                              {blog.title}
                            </h2>

                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2 break-words">
                              {blog.content}
                            </p>
                          </div>
                        </div>

                        <div className="text-xs text-muted-foreground mt-2 flex gap-1 flex-wrap">
                          <div className="flex flex-col items-center justify-center">
                            <Calendar className="size-3" />
                          </div>
                          {new Date(blog.createdAt).toLocaleDateString("id-ID")}
                          <p>•</p>
                          <div className="flex flex-col items-center justify-center">
                            <User2 className="size-3" />
                          </div>
                          <h2>{blog.account?.username}</h2>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tulis Button */}
      <div className="sticky bottom-10 flex justify-end px-10 z-50">
        <Button
          variant="default"
          className="bg-[#18182b] text-white text-lg hover:bg-[#2e2e45] hover:text-white w-25 h-12 rounded-full"
        >
          <Link
            href={account?.email ? "/create-blog" : "/signin"}
            className="flex justify-center items-center gap-2"
          >
            <Pencil />
            Tulis
          </Link>
        </Button>
      </div>
    </section>
  );
}
