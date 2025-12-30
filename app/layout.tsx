import { RootProvider } from "fumadocs-ui/provider/next";
import "./global.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "tsuka-ryu's blog",
  description: "tsuka-ryuの個人ブログ",
  openGraph: {
    images: {
      url: "/og-image.webp",
      width: 1200,
      height: 630,
      alt: "tsuka-ryu's blog",
    },
    siteName: "tsuka-ryu's blog",
  },
  twitter: {
    card: "summary_large_image",
    images: "/og-image.webp",
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
  },
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
