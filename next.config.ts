import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google
      },
      {
        protocol: "https",
        hostname: "platform-lookaside.fbsbx.com", // Facebook
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com", // Twitter/X
      },
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
      },
    ],
  },
};

export default nextConfig;
