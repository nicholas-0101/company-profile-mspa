"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu, X } from "lucide-react"; 
import axios from "axios";
import { useAccountStore } from "@/lib/store/accountStore";
import { usePathname } from "next/navigation";
import Image from "next/image";

function Navbar() {
  const pathname = usePathname();
  const account = useAccountStore((state) => state.account);
  const setAccount = useAccountStore((state) => state.setAccount);
  const signOut = useAccountStore((state) => state.signOut);
  const [isOpen, setIsOpen] = useState(false);

  //dropdown menu if we click username
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Click outside to close dropdown (desktop)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !(menuRef.current as any).contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // keep login
  const keeplogin = async () => {
    try {
      const id = localStorage.getItem("id");
      if (id) {
        const result = await axios.get(`/api/auth/me?id=${id}`);
        if (result.data.user) {
          setAccount(result.data.user);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    keeplogin();
  }, []);

  return (
    <>
      <nav className="sticky top-0 w-full backdrop-blur-md bg-[#ffffff66] z-[100] px-4 sm:px-8 md:px-10 whitespace-nowrap">
        <div className="max-w-screen mx-auto">
          <div className=" md:flex items-center justify-between py-3">
            <div className="flex justify-between">
              <a href="/">
                <div className="w-32">
                  <Image
                    src="/mspa-logo.webp"
                    alt="mspa-logo"
                    width={128}
                    height={39}
                    quality={70} // slightly lower if you want to reduce further
                  />
                </div>
              </a>

              {/* hamburger icon mobile */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-[#18182b]"
                  aria-label="hamburger-icon"
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </Button>
              </div>
            </div>

            {/* navbar desktop */}
            <div className="hidden md:flex lg:gap-18 gap-9 font-sans font-bold">
              {[
                { href: "/", label: "Beranda" },
                { href: "/about", label: "Tentang Kami" },
                { href: "/product", label: "Produk" },
                { href: "/blog", label: "Blog" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`hover:border-[#18182b] transition-all pb-1 border-b-2 ${
                    pathname === href
                      ? "border-[#18182b]"
                      : "border-transparent"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* sign in up button desktop */}
            <div className="hidden md:block">
              {account?.email ? (
                <div className="relative" ref={menuRef}>
                  <Button
                    onClick={() => setMenuOpen(!menuOpen)}
                    variant="link"
                    aria-label="username"
                  >
                    <p className="font-black font-sans text-[#18182b]">{`Halo, ${account.username}`}</p>
                  </Button>

                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-30 bg-white border border-gray-300 rounded-full z-50">
                      <Button
                        onClick={() => {
                          signOut();
                          setMenuOpen(false);
                        }}
                        className="w-full text-left rounded-full px-4 py-2 text-sm text-red-500 hover:bg-red-50 hover:text-red-500"
                        variant="ghost"
                        aria-label="sign-out"
                      >
                        Keluar
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex gap-4 font-sans">
                  <Link href="/signin">
                    <Button
                      variant="outline"
                      aria-label="sign-in"
                      className="text-[#18182b] font-bold w-20 h-10 rounded-full bg-transparent hover:bg-[#ffffff66] px-4 py-2"
                    >
                      Masuk
                    </Button>
                  </Link>

                  <Link href="/signup">
                    <Button
                      variant="default"
                      aria-label="sign-up"
                      className="bg-[#18182b] text-white hover:bg-[#2e2e45] hover:text-white w-20 h-10 rounded-full px-4 py-2"
                    >
                      Daftar
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* opened hamburger menu */}
            {isOpen && (
              <div className="md:hidden">
                {/* Mobile dropdown menu */}
                <div className="top-[60px] left-0 w-full z-50 font-sans font-bold text-[#18182b]">
                  <div className="flex items-center justify-between px-4 py-3 border-b">
                    <div className="flex flex-col gap-2">
                      {account?.email && (
                        <p className="font-black">{`Halo, ${account?.username}`}</p>
                      )}
                      <Link
                        href="/"
                        onClick={() => setIsOpen(false)}
                        className="hover:underline"
                      >
                        Beranda
                      </Link>
                      <Link
                        href="/about"
                        onClick={() => setIsOpen(false)}
                        className="hover:underline"
                      >
                        Tentang Kami
                      </Link>
                      <Link
                        href="/product"
                        onClick={() => setIsOpen(false)}
                        className="hover:underline"
                      >
                        Produk
                      </Link>
                      <Link
                        href="/blog"
                        onClick={() => setIsOpen(false)}
                        className="hover:underline"
                      >
                        Blog
                      </Link>
                    </div>
                  </div>

                  <div className="px-4 py-3 border-t">
                    {account?.email ? (
                      <Button
                        onClick={() => {
                          signOut();
                          setIsOpen(false);
                        }}
                        className="w-full text-left text-red-500 hover:bg-gray-100 hover:text-[#18182b]"
                        variant="ghost"
                        aria-label="sign-out"
                      >
                        Keluar
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Link
                          href="/signin"
                          className="w-full"
                          onClick={() => setIsOpen(false)}
                        >
                          <Button
                            variant="outline"
                            aria-label="sign-in"
                            className="text-[#18182b] font-bold w-full rounded-full bg-transparent hover:bg-[#ffffff66]"
                          >
                            Masuk
                          </Button>
                        </Link>
                        <Link
                          href="/signup"
                          className="w-full"
                          onClick={() => setIsOpen(false)}
                        >
                          <Button
                            variant="default"
                            aria-label="sign-up"
                            className="bg-[#18182b] text-white hover:bg-[#2e2e45] hover:text-white w-full rounded-full"
                          >
                            Daftar
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
