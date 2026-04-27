"use client";

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

interface ICreateValue {
  title: string;
  thumbnail: string;
  content: string;
  categories: string;
}

export default function createSection() {
  const router = useRouter();
  const account = useAccountStore((state) => state.account);

  const defaultValues: ICreateValue = {
    title: "",
    thumbnail: "",
    categories: "",
    content: "",
  };

  const onPost = async (values: ICreateValue) => {
    try {
      if (!account?.objectId) {
        throw new Error("Account objectId is missing!");
      }

      await axios.post("/api/blogs", {
        ...values,
        accountId: account.objectId
      });

      router.replace("/blog");
    } catch (error: any) {
      console.error(
        "Error publishing blog:",
        error?.response?.data || error.message || error
      );
    }
  };

  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={CreateSchema}
      onSubmit={(values) => onPost(values)}
    >
      {(props: FormikProps<ICreateValue>) => {
        const { errors, handleChange, setFieldValue } = props;
        return (
          <Form>
            <Card className="px-6 md:px-10 py-6 text-left rounded-3xl max-w-[1016px] mx-auto">
              <section className="flex flex-col gap-6">
                {/* Title */}
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-0">
                    <label className="font-bold text-[#18182b]">
                      Judul Blog
                    </label>
                    <span className="text-red-400 italic text-sm">
                      {errors.title}
                    </span>
                  </div>
                  <Input
                    placeholder="Masukkan judul blog anda..."
                    type="text"
                    name="title"
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-full dark:bg-gray-700 dark:border-gray-600 hover:shadow-md"
                    required
                  />
                </div>

                {/* Thumbnail */}
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-0">
                    <label className="font-bold text-[#18182b]">
                      Thumbnail
                    </label>
                    <span className="text-red-400 italic text-sm">
                      {errors.thumbnail}
                    </span>
                  </div>
                  <Input
                    placeholder="Masukkan URL thumbnail..."
                    type="text"
                    name="thumbnail"
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-full dark:bg-gray-700 dark:border-gray-600 hover:shadow-md"
                    required
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-0">
                    <label className="font-bold text-[#18182b]">
                      Konten Blog
                    </label>
                    <span className="text-red-400 italic text-sm">
                      {errors.content}
                    </span>
                  </div>
                  <Textarea
                    placeholder="Mulai menulis blog anda..."
                    name="content"
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-2xl dark:bg-gray-700 dark:border-gray-600 h-100 hover:shadow-md"
                    required
                  />
                </div>

                {/* Category + Submit */}
                <div className="flex gap-4 max-w-[1016px]">
                  <div className="flex flex-col gap-1 w-full md:w-auto">
                    <Select
                      onValueChange={(value) =>
                        setFieldValue("categories", value)
                      }
                    >
                      <SelectTrigger className="w-full rounded-full hover:shadow-md">
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
                    <span className="text-red-400 italic text-sm">
                      {errors.categories}
                    </span>
                  </div>

                  <div className="w-full flex-1">
                    <Button
                      type="submit"
                      className="w-full  rounded-full bg-[#18182b] hover:bg-[#2e2e45]"
                    >
                      Unggah
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
