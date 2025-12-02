import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*", "192.168.1.10"],
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },

  /* config options here */
};

export default nextConfig;
