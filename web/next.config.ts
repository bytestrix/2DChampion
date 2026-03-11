import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ksgeobljbtmmkedutjkz.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  experimental: {
    externalDir: true,
  },
  webpack: (config) => {
    config.resolve.modules.push(path.resolve('./node_modules'));
    return config;
  },
  turbopack: {},
};

export default nextConfig;
