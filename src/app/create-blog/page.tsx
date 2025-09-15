"use client";
import React from "react";
import Tab from "../coreComponents/tab-create";

export default function WritePage() {
  return (
    <section className="min-h-screen bg-white pb-40">
      <div className="text-center mt-24 px-4">
        <h1 className="text-[50px] font-serif font-black text-[#18182b]">
          Tulis Blog
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
          Mulai menulis blog...
        </p>
        <div className="w-full flex justify-center">
          <div className="w-[1016px]">
            <Tab />
          </div>
        </div>
      </div>
    </section>
  );
}
