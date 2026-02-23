import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  serverExternalPackages: ["@takumi-rs/image-response"],

  experimental: {
    optimizeCss: true,
    cssChunking: "strict",
  },

  compress: true,
};

export default withMDX(config);
