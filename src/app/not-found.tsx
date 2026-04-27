"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="fixed inset-0 z-[200] w-full flex items-center justify-center bg-[#18182b] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 -z-10"/>
        
      <div className="container px-4 flex flex-col items-center text-center">
        {/* Animated 404 Text */}
        <div className="relative mb-8">
          <h1 className="text-[120px] sm:text-[180px] md:text-[220px] font-serif font-black text-white/10 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white drop-shadow-2xl">
              Halaman Tidak Ditemukan
            </h2>
          </div>
        </div>

        {/* Description */}
        <p className="max-w-md text-gray-300 text-sm sm:text-lg font-sans mb-12">
          Maaf, halaman yang Anda cari tidak dapat ditemukan atau telah dipindahkan ke alamat lain.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/">
            <Button 
              className="h-14 px-8 rounded-full bg-white text-[#18182b] hover:bg-gray-100 font-bold flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-xl"
            >
              <Home className="size-5" />
              Kembali ke Beranda
            </Button>
          </Link>
         
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-blob" />
      <div className="absolute top-10 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
    </div>
  );
}
