import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    unoptimized: true,
  },

  allowedDevOrigins: [
    "192.168.1.40",
  ],
};

export default nextConfig;