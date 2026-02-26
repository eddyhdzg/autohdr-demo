import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui"],
  async rewrites() {
    return [
      {
        source: "/docs",
        destination: "https://hubble-cc00cf1e.mintlify.dev/docs",
      },
      {
        source: "/docs/:match*",
        destination: "https://hubble-cc00cf1e.mintlify.dev/docs/:match*",
      },
    ];
  },
};

export default nextConfig;
