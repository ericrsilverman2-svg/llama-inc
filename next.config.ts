import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cache Components adds prerender validation that a three-page demo does not need.
  cacheComponents: false,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
