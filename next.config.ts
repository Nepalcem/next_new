import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //allow images from certain external domain
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
};

export default nextConfig;
