import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*'
      },
      {
        source: '/:path*',
        destination: '/'
      }
    ];
  }
};

export default nextConfig;
