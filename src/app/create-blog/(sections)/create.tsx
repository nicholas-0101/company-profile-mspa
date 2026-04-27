"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Formik, Form, FormikProps } from "formik";
import { CreateSchema } from "./CreateSchema";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAccountStore } from "@/lib/store/accountStore";
import { useBlogStore } from "@/lib/store/blogStore";

interface ICreateValue {
  title: string;
  thumbnail: string;
  content: string;
  categories: string;
}

export default function createSection({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const router = useRouter();
  const account = useAccountStore((state) => state.account);
  const { editingBlog, setEditingBlog } = useBlogStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues: ICreateValue = {
    title: editingBlog?.title || "",
    thumbnail: editingBlog?.thumbnail || "",
    categories: editingBlog?.categories || "",
    content: editingBlog?.content || "",
  };

  const onPost = async (values: ICreateValue) => {
    try {
      setIsSubmitting(true);
      if (!account?.objectId) {
        throw new Error("Account objectId is missing!");
      }

      if (editingBlog) {
        await axios.patch(`/api/blogs/id/${editingBlog.id}`, values);
        setEditingBlog(null);
        setActiveTab("manage");
      } else {
        await axios.post("/api/blogs", {
          ...values,
          accountId: account.objectId
        });
        router.replace("/blog");
      }
    } catch (error: any) {
      console.error(
        "Error publishing blog:",
        error?.response?.data || error.message || error
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={defaultValues}
      enableReinitialize
      validationSchema={CreateSchema}
      onSubmit={(values) => onPost(values)}
    >
      {(props: FormikProps<ICreateValue>) => {
        const { errors, handleChange, setFieldValue, values } = props;
        return (
          <Form>
            <Card className="px-6 md:px-10 py-6 text-left rounded-3xl max-w-[1016px] mx-auto border-gray-100 shadow-sm relative overflow-hidden">
              {isSubmitting && (
                <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-gray-200 border-t-[#18182b] rounded-full animate-spin"></div>
                </div>
              )}
              
              <section className="flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-[#18182b]">
                    {editingBlog ? "Edit Blog" : "Buat Blog Baru"}
                  </h2>
                  {editingBlog && (
                    <Button 
                      type="button" 
                      variant="ghost" 
                      onClick={() => setEditingBlog(null)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full"
                    >
                      Batal Edit
                    </Button>
                  )}
                </div>

                {/* Title */}
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-0">
                    <label className="font-bold text-[#18182b] text-sm">
                      Judul Blog
                    </label>
                    <span className="text-red-400 italic text-sm h-3">
                      {errors.title}
                    </span>
                  </div>
                  <Input
                    placeholder="Masukkan judul blog anda..."
                    type="text"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-200 rounded-full hover:shadow-sm focus:ring-2 focus:ring-[#18182b] transition-all"
                    required
                  />
                </div>

                {/* Thumbnail */}
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-0">
                    <label className="font-bold text-[#18182b] text-sm">
                      Thumbnail URL
                    </label>
                    <span className="text-red-400 italic text-sm h-3">
                      {errors.thumbnail}
                    </span>
                  </div>
                  <Input
                    placeholder="Masukkan URL thumbnail..."
                    type="text"
                    name="thumbnail"
                    value={values.thumbnail}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-200 rounded-full hover:shadow-sm focus:ring-2 focus:ring-[#18182b] transition-all"
                    required
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-0">
                    <label className="font-bold text-[#18182b] text-sm">
                      Konten Blog
                    </label>
                    <span className="text-red-400 italic text-sm h-3">
                      {errors.content}
                    </span>
                  </div>
                  <Textarea
                    placeholder="Mulai menulis blog anda..."
                    name="content"
                    value={values.content}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-200 rounded-2xl h-80 hover:shadow-sm focus:ring-2 focus:ring-[#18182b] transition-all resize-none"
                    required
                  />
                </div>

                {/* Category + Submit */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex flex-col gap-1 w-full md:w-64">
                    <Select
                      value={values.categories}
                      onValueChange={(value) =>
                        setFieldValue("categories", value)
                      }
                    >
                      <SelectTrigger className="w-full h-12 rounded-full border-gray-200 hover:shadow-sm">
                        <SelectValue placeholder="Pilih Kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup className="text-[#18182b]">
                          <SelectItem value="Teknologi">Teknologi</SelectItem>
                          <SelectItem value="Lingkungan">Lingkungan</SelectItem>
                          <SelectItem value="Kesehatan">Kesehatan</SelectItem>
                          <SelectItem value="Ekonomi">Ekonomi</SelectItem>
                          <SelectItem value="Kegiatan">Kegiatan</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <span className="text-red-400 italic text-sm h-3 px-2">
                      {errors.categories}
                    </span>
                  </div>

                  <div className="w-full">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-9 rounded-full bg-[#18182b] hover:bg-[#2e2e45] text-white shadow-lg shadow-[#18182b]/20 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Memproses...
                        </>
                      ) : (
                        editingBlog ? "Simpan Perubahan" : "Unggah Sekarang"
                      )}
                    </Button>
                  </div>
                </div>
              </section>
            </Card>
          </Form>
        );
      }}
    </Formik>
  );
}
