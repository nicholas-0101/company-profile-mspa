"use client";
import { useEffect, useState } from "react";
import { useBlogStore, BlogPost } from "@/lib/store/blogStore";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Calendar, 
  Search, 
  MoreVertical, 
  Pencil, 
  Trash2, 
  Eye, 
  EyeOff,
  AlertCircle
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAccountStore } from "@/lib/store/accountStore";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

export default function manageSection({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const [search, setSearch] = useState("");
  const { blogs, fetchBlogs, setEditingBlog } = useBlogStore();
  const { account } = useAccountStore();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (account?.objectId) {
      fetchBlogs(account.objectId);
    }
  }, [account, fetchBlogs]);

  const confirmDelete = async () => {
    if (!blogToDelete) return;
    try {
      setIsRefreshing(true);
      setIsDeleteDialogOpen(false);
      await axios.delete(`/api/blogs/id/${blogToDelete}`);
      if (account?.objectId) fetchBlogs(account.objectId);
      setBlogToDelete(null);
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setBlogToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleTogglePublish = async (blog: BlogPost) => {
    try {
      setIsRefreshing(true);
      await axios.patch(`/api/blogs/id/${blog.id}`, {
        published: !blog.published
      });
      if (account?.objectId) fetchBlogs(account.objectId);
    } catch (error) {
      console.error("Toggle publish error:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    const searchLower = search.toLowerCase();
    return (
      blog.title.toLowerCase().includes(searchLower) ||
      blog.categories.toLowerCase().includes(searchLower) ||
      blog.content.toLowerCase().includes(searchLower)
    );
  });

  if (!account) {
    return (
      <Card className="p-10 text-center rounded-3xl max-w-[1016px] w-full">
        <AlertCircle className="mx-auto size-12 text-gray-400 mb-4" />
        <p className="text-gray-500 font-medium">Silakan masuk untuk mengelola blog Anda.</p>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-[1016px] w-full">
      <Card className="p-6 md:p-8 text-left rounded-3xl shadow-sm border-gray-100">
        <div className="w-full flex justify-center mb-8">
          <div className="max-w-lg w-full flex gap-3">
            <div className="flex items-center">
              <Search className="text-gray-400 size-5" />
            </div>
            <Input
              placeholder="Cari blog Anda ..."
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-full hover:shadow-sm focus:ring-2 focus:ring-[#18182b] transition-all"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 relative">
          {isRefreshing && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-3xl">
              <div className="w-8 h-8 border-4 border-gray-200 border-t-[#18182b] rounded-full animate-spin"></div>
            </div>
          )}

          {filteredBlogs.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              <p className="text-gray-500 font-medium">Belum ada blog yang ditemukan.</p>
            </div>
          ) : (
            filteredBlogs.map((blog) => (
              <div key={blog.id} className="group relative">
                <Card className="p-4 rounded-3xl transition-all duration-300 hover:shadow-md border-gray-100 group-hover:border-[#18182b]/30">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Thumbnail */}
                    <Link href={`/blog-detail/${blog.slug}`} className="block w-full md:w-48 h-32 rounded-2xl overflow-hidden relative shrink-0">
                      <Image
                        src={blog.thumbnail}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform"
                      />
                      {!blog.published && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span className="bg-white/90 text-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">
                            Diarsipkan
                          </span>
                        </div>
                      )}
                    </Link>

                    {/* Content */}
                    <div className="flex flex-col justify-between flex-grow min-w-0 pr-10">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            {blog.categories}
                          </span>
                          {blog.published ? (
                            <span className="flex items-center gap-1 text-green-600 text-[10px] font-bold uppercase tracking-wider">
                              <Eye className="size-3" /> Ditampilkan
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-orange-500 text-[10px] font-bold uppercase tracking-wider">
                              <EyeOff className="size-3" /> Diarsipkan
                            </span>
                          )}
                        </div>
                        <h2 className="text-lg font-bold text-[#18182b] line-clamp-1 mb-1 transition-colors">
                          {blog.title}
                        </h2>
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {blog.content}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 mt-3 text-[11px] text-gray-400 font-medium">
                        <div className="flex items-center gap-1">
                          <Calendar className="size-3" />
                          {new Date(blog.createdAt).toLocaleDateString("id-ID", {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Actions Menu */}
                    <div className="absolute top-4 right-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100">
                            <MoreVertical className="size-5 text-gray-400" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 rounded-xl p-2 shadow-xl border-gray-100">
                          <DropdownMenuItem 
                            onClick={() => {
                              setEditingBlog(blog);
                              setActiveTab("create");
                            }} 
                            className="rounded-lg gap-2 cursor-pointer"
                          >
                            <Pencil className="size-4" /> Edit Blog
                          </DropdownMenuItem>
                          
                          <DropdownMenuItem onClick={() => handleTogglePublish(blog)} className="rounded-lg gap-2 cursor-pointer">
                            {blog.published ? (
                              <>
                                <EyeOff className="size-4" /> Arsipkan Blog
                              </>
                            ) : (
                              <>
                                <Eye className="size-4" /> Tampilkan Blog
                              </>
                            )}
                          </DropdownMenuItem>
                          
                          <DropdownMenuSeparator className="my-1" />
                          
                          <DropdownMenuItem 
                            onClick={() => handleDeleteClick(blog.id)} 
                            className="rounded-lg gap-2 text-red-500 focus:text-red-500 focus:bg-red-50 cursor-pointer"
                          >
                            <Trash2 className="size-4" /> Hapus Blog
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </Card>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="rounded-3xl max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center font-extrabold text-[#18182b]">Hapus Blog?</DialogTitle>
            <DialogDescription className="text-center text-gray-500 py-2">
              Tindakan ini tidak dapat dibatalkan. Blog Anda akan dihapus secara permanen dari server.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row gap-3 mt-4">
            <DialogClose asChild>
              <Button variant="ghost" className="flex-1 rounded-full border border-gray-200">
                Batal
              </Button>
            </DialogClose>
            <Button 
              onClick={confirmDelete} 
              className="flex-1 rounded-full bg-red-500 hover:bg-red-600 text-white"
            >
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
