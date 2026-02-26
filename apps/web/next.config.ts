import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui"],
  async rewrites() {
    return [
      {
        source: "/docs",
        destination: "https://autohdr.mintlify.dev/docs",
      },
      {
        source: "/docs/:match*",
        destination: "https://autohdr.mintlify.dev/docs/:match*",
      },
    ];
  },
};

export default nextConfig;
