import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['arara.rf.gd', 'a.ppy.sh', 'lh3.googleusercontent.com'], // tambahkan Google avatar
  },
};

export default nextConfig;
