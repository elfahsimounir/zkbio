import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_URL: "http://192.168.100.77:3000/api",
    API_URL2: "http://192.168.100.77:8080",

  },
};

export default nextConfig;
