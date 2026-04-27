"use client";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

function Footer() {
  const pathname = usePathname();

  // Hide footer on signin, signup, and create-blog pages
  const isAuthPage = pathname === "/signin" || pathname === "/signup";
  const isCreatePage = pathname.startsWith("/create-blog");

  if (isAuthPage || isCreatePage) {
    return null;
  }

  return (
    <footer className="bg-[#18182b] px-4 sm:px-10 lg:px-15 py-10 flex flex-col gap-8 text-white">
      <div className="text-left flex flex-col gap-6">
        <h1 className="text-[20px] sm:text-[24px] md:text-[35px] max-w-3xl font-sans font-black">
          MS Putra Abadi
        </h1>

        <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
          {/* Address and Contact */}
          <div className="flex flex-col gap-2 max-w-lg">
            <p className="font-sans">
              Gondang Legi, RT 02 RW 05, Ngasem, Tegalrejo, Magelang, Jawa
              Tengah. 56192
            </p>

            <div className="flex flex-col gap-0">
              <div className="flex items-start gap-2">
                <a
                  href="https://api.whatsapp.com/send/?phone=6289691706777&text=Halo.."
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact via WhatsApp"
                  className="flex items-center gap-2 text-white font-sans min-h-[48px] min-w-[48px] hover:underline"
                >
                  <img
                    className="size-5"
                    src="/icons8-telephone-50.webp"
                    alt="phone icon"
                  />
                  (+62) 851-0527-9777
                </a>
              </div>

              <div className="flex items-start gap-2">
                <a
                  href="mailto:jorsantosa@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Send email to jorsantosa@gmail.com"
                  className="flex items-center gap-2 text-white font-sans min-h-[48px] min-w-[48px] hover:underline"
                >
                  <img
                    className="size-5"
                    src="/icons8-mail.webp"
                    alt="email icon"
                  />
                  jorsantosa@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex flex-wrap gap-4">
            {[
              {
                href: "https://www.linkedin.com/",
                alt: "linkedin",
                src: "/icons8-linkedin.svg",
              },
              {
                href: "https://api.whatsapp.com/send/?phone=6289691706777&text=Halo..",
                alt: "whatsapp",
                src: "/icons8-whatsapp.svg",
              },
              {
                href: "https://www.instagram.com/",
                alt: "instagram",
                src: "/icons8-instagram.svg",
              },
              {
                href: "https://www.youtube.com/@jorsanable",
                alt: "youtube",
                src: "/icons8-youtube.svg",
              },
            ].map(({ href, alt, src }, idx) => (
              <a
                key={idx}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={alt}
                className="w-12 h-12"
              >
                <Button
                  className="bg-transparent hover:opacity-80 p-0"
                  size="icon"
                  aria-label="social-media-icon"
                >
                  <img src={src} alt={`contact-${alt}`} className="w-10 h-10" />
                </Button>
              </a>
            ))}
          </div>
        </div>
      </div>

      <hr className="border-white" />

      <div>
        <p className="font-sans text-[12px] text-center md:text-left">
          Copyright © {new Date().getFullYear()} MS Putra Abadi. Seluruh hak
          cipta dilindungi.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
