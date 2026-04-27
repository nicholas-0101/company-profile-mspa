"use client";

import React, { Suspense, useEffect } from "react";
import Tab from "../coreComponents/tab-create";
import { useAccountStore } from "@/lib/store/accountStore";
import { useRouter } from "next/navigation";

export default function WritePage() {
  const account = useAccountStore((state) => state.account);
  const router = useRouter();

  useEffect(() => {
    // Check localStorage first for a faster immediate redirect if not logged in at all
    const id = localStorage.getItem("id");
    if (!id && !account) {
      router.push("/signin");
    }
  }, [account, router]);

  // Optionally show nothing while checking auth or let it render if id exists
  if (!account && typeof window !== "undefined" && !localStorage.getItem("id")) {
    return null;
  }
  return (
    <section className="min-h-screen bg-white pb-40">
      <div className="text-center mt-24 px-4">
        <h1 className="text-[50px] font-serif font-black text-[#18182b]">
          Tulis Blog
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
          Mulai menulis atau mengelola blog...
        </p>
        <div className="w-full flex justify-center">
          <div className="w-[1016px]">
            <Suspense fallback={<div className="h-40 flex items-center justify-center">Memuat...</div>}>
              <Tab />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
