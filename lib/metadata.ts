import type { Metadata } from "next";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:3000";

export function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: baseUrl,
      images: "/og-image.webp",
      siteName: "tsuka-ryu's blog",
      ...override.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      images: "/og-image.webp",
      ...override.twitter,
    },
    alternates: {
      types: {
        "application/rss+xml": [
          {
            title: "tsuka-ryu's blog",
            url: `${baseUrl}/blog/rss.xml`,
          },
        ],
      },
      ...override.alternates,
    },
  };
}

export { baseUrl };
