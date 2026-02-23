import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  serverExternalPackages: [
    "@takumi-rs/image-response",
    "parse5",
    "hast-util-raw",
    "hast-util-from-parse5",
    "hast-util-to-parse5",
    "rehype-raw",
    "remark",
    "remark-parse",
    "remark-stringify",
    "remark-rehype",
    "mdast-util-from-markdown",
    "mdast-util-to-markdown",
    "unified",
    "feed",
    "fumadocs-mdx",
  ],

  experimental: {
    optimizeCss: true,
    cssChunking: "strict",
  },

  compress: true,
};

export default withMDX(config);
