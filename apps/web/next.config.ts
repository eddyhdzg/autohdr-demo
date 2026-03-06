import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
  async rewrites() {
    const mintlifyBaseUrl =
      process.env.MINTLIFY_BASE_URL ||
      "https://hubble-cc00cf1e.mintlify.dev/docs";
    return [
      {
        source: "/docs",
        destination: mintlifyBaseUrl,
      },
      {
        source: "/docs/:match*",
        destination: `${mintlifyBaseUrl}/:match*`,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
