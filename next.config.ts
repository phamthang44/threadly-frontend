import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
    images: {
      remotePatterns: [
          {
            protocol: 'https',
            hostname: 'via.placeholder.com',
          },
          {
              protocol: 'https',
              hostname: 'api.dicebear.com', // Cho phép DiceBear (Avatar)
          },
          {
              protocol: 'https',
              hostname: 'images.unsplash.com', // Cho phép Unsplash (Ảnh bài viết)
          },
          {
                protocol: 'https',
                hostname: 'i.pravatar.cc',
          }
      ]
    }
};

export default nextConfig;
