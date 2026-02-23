import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  serverExternalPackages: [
    "@takumi-rs/image-response",
    "parse5",
    "hast-util-raw",
    "rehype-raw",
  ],

  experimental: {
    optimizeCss: true,
    cssChunking: "strict",
  },

  compress: true,
};

export default withMDX(config);
