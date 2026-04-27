"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ISignUpValue, SignUpSchema } from "./SignupSchema";
import { Formik, Form, FormikProps, FormikValues } from "formik";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const SignupPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  // untuk menambah data user ke database
  const onSignup = async (values: ISignUpValue, { setSubmitting }: any) => {
    try {
      setSubmitting(true);
      await axios.post("/api/auth/signup", {
        username: values.username,
        email: values.email,
        password: values.password,
      });

      router.replace("/signin");
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="flex flex-col h-screen">
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col gap-4 w-full max-w-md px-4">
          <div className="flex flex-col gap-0">
            <h1 className="text-center text-[50px] max-w-3xl font-serif font-black text-[#18182b]">
              Buat akun!
            </h1>
            <p className="text-center text-gray-600 dark:text-gray-400">
              Buat akun untuk menulis blog
            </p>
          </div>

          <Formik
            initialValues={{ username: "", email: "", password: "" }}
            validationSchema={SignUpSchema}
            onSubmit={onSignup}
          >
            {(props: FormikProps<ISignUpValue>) => {
              const { errors, values, handleChange, isSubmitting } = props;
              return (
                <Form>
                  <div>
                    <Card className="p-6 bg-white dark:bg-gray-800 hover:shadow-md rounded-3xl">
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-3">
                          <div className="flex flex-col gap-0">
                            <label className="text-[#18182b]">
                              Nama lengkap anda
                            </label>
                            <span className="text-red-400 italic text-sm">
                              {errors.username}
                            </span>
                          </div>

                          <Input
                            type="name"
                            name="username"
                            placeholder="Nama anda..."
                            className="p-2 border border-gray-300 rounded-full dark:bg-gray-700 dark:border-gray-600"
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="flex flex-col gap-3">
                          <div className="flex flex-col gap-0">
                            <label className="text-[#18182b]">Email anda</label>
                            <span className="text-red-400 italic text-sm">
                              {errors.email}
                            </span>
                          </div>

                          <Input
                            type="email"
                            name="email"
                            placeholder="anda@email.com"
                            className="p-2 border border-gray-300 rounded-full dark:bg-gray-700 dark:border-gray-600"
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="flex flex-col gap-3">
                          <div className="flex flex-col gap-0">
                            <label className="text-[#18182b]">
                              Buat password
                            </label>
                            <span className="text-red-400 italic text-sm">
                              {errors.password}
                            </span>
                          </div>

                          <div className="relative w-full">
                            <Input
                              name="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Buat password anda..."
                              className="p-2 border border-gray-300 rounded-full dark:bg-gray-700 dark:border-gray-600"
                              onChange={handleChange}
                            />

                            <Button
                              type="button"
                              aria-label="eye"
                              onClick={() => setShowPassword((prev) => !prev)}
                              className="absolute right-2 top-2 text-gray-500 hover:text-[#18182b] w-1 h-1"
                              variant={"ghost"}
                            >
                              {showPassword ? (
                                <Eye size={20} />
                              ) : (
                                <EyeOff size={20} />
                              )}
                            </Button>
                          </div>
                        </div>

                        <Button
                          variant={"outline"}
                          type="submit"
                          disabled={isSubmitting}
                          className="text-white p-2 rounded-full cursor-pointer hover:bg-[#2e2e45] hover:text-white transition-colors border-gray-300 mt-[20px] bg-[#18182b] flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="size-4 animate-spin" />
                              Membuat akun...
                            </>
                          ) : (
                            "Daftar"
                          )}
                        </Button>
                      </div>
                    </Card>
                  </div>
                </Form>
              );
            }}
          </Formik>

          <div className="flex justify-center">
            <p className="text-gray-600 flex flex-col justify-center">
              Sudah memiliki akun?
            </p>
            <a href="/signin">
              <Button
                type="button"
                variant={"link"}
                className="text-gray-600 hover:text-grey-400 p-0 pl-1.5"
              >
                Masuk
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
