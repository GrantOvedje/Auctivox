import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co", // allow Supabase Storage
      },
    ],
  },
};

export default nextConfig;

