"use client";

import { useEffect, useState } from "react";
import { useBlogStore } from "@/lib/store/blogStore";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Filter, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function manageSection() {
  const [search, setSearch] = useState("");

  const { blogs, fetchBlogs } = useBlogStore();

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const filteredBlogs = blogs.filter((blog) => {
    const searchLower = search.toLowerCase();
    return (
      blog.title.toLowerCase().includes(searchLower) ||
      blog.categories.toLowerCase().includes(searchLower) ||
      blog.content.toLowerCase().includes(searchLower)
    );
  });

  return (
    <Card className="p-4 md:p-10 text-left rounded-3xl max-w-[1016px] w-full">
      <div className="w-full flex justify-center">
        <div className="max-w-lg w-full flex gap-2">
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
      </div>

      <div className="grid grid-cols-1  gap-6">
        {filteredBlogs.map((blog) => (
          <Link href={`/blog-detail/${blog.slug}`} key={blog.objectId}>
            <Card className="p-4 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#18182b] text-left cursor-pointer">
              <div className="flex flex-col md:flex-row gap-1 md:gap-4">
                <div className="w-full h-40 rounded-md overflow-hidden mb-3 relative md:flex-1/3 lg:flex-1/4">
                  <Image
                    src={blog.thumbnail}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="justify-between md:flex-2/3 lg:flex-3/4">
                  <span className="bg-[#18182b] text-white text-xs font-semibold px-3 py-1 rounded-full w-fit">
                    {blog.categories}
                  </span>

                  <div className="md:w-100 lg:w-165 min-w-0 flex flex-col">
                    <h2
                      className="text-lg font-semibold mt-2 line-clamp-2 break-words truncate whitespace-nowrap overflow-hidden"
                      rel="noopener noreferrer"
                    >
                      {blog.title}
                    </h2>

                    <p
                      className="text-sm text-muted-foreground mt-1 line-clamp-2 break-words truncate whitespace-nowrap overflow-hidden"
                      rel="noopener noreferrer"
                    >
                      {blog.content}
                    </p>
                  </div>

                  <div className="text-xs text-muted-foreground mt-2 flex gap-1 flex-wrap">
                    <div className="flex flex-col items-center justify-center">
                      <Calendar className="size-3" />
                    </div>
                    {new Date(blog.createdAt).toLocaleDateString("id-ID")}
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </Card>
  );
}
