import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "localhost:3001"],
    },
  },
  async headers() {
    return [
      {
        // Permitir requisições do admin-blog
        source: '/api/revalidate',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'http://localhost:3001',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'POST',
          },
        ],
      },
    ]
  },
};

export default nextConfig;
