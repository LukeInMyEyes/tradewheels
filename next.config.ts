import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.easyquote-dcs.co.za',
      },
      {
        protocol: 'http',
        hostname: '**.easyquote-dcs.co.za',
      },
    ],
  },
};

export default nextConfig;
