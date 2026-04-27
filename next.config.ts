import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: { // config image agar tidak error (author image terblokir)
    qualities: [70, 75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      }
    ]
  }
};

export default nextConfig;
