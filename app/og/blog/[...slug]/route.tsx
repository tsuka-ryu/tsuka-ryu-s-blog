import fs from "fs/promises";
import path from "path";

import BlogPost from "@/components/og-image";
import { blog, getBlogImage } from "@/lib/source";
import { ImageResponse } from "@takumi-rs/image-response";
import { notFound } from "next/navigation";

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<"/og/blog/[...slug]">) {
  const { slug } = await params;
  const page = blog.getPage(slug.slice(0, -1));
  if (!page) notFound();

  // Load Noto Sans JP font
  const fontPath = path.join(process.cwd(), "public/fonts/NotoSansJP.ttf");
  const fontData = await fs.readFile(fontPath);

  // Format date for display
  const formattedDate = page.data.date
    ? new Date(page.data.date).toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return new ImageResponse(
    <BlogPost
      title={page.data.title}
      author={page.data.author}
      date={formattedDate}
      // category={""} TODO: カテゴリ実装したら追加
      avatar={"https://avatars.githubusercontent.com/u/69495387"}
    />,
    {
      width: 1200,
      height: 630,
      format: "webp",
      fonts: [
        {
          name: "Noto Sans JP",
          data: fontData,
          weight: 400,
          style: "normal",
        },
      ],
    },
  );
}

export function generateStaticParams() {
  return blog.getPages().map((page) => ({
    lang: page.locale,
    slug: getBlogImage(page).segments,
  }));
}
