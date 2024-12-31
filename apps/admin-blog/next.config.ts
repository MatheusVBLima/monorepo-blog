import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  clerk: {
    cookieName: "admin_blog_clerk_session",
    cookieOptions: {
      domain: "localhost",
      secure: process.env.NODE_ENV === "production",
    },
  },
};

export default nextConfig;
