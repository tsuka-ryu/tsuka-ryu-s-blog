import { getBlogImage, blog } from "@/lib/source";
import { notFound } from "next/navigation";
import { ImageResponse } from "@takumi-rs/image-response";
import type { Font } from "@takumi-rs/core";
import BlogPost from "@/components/og-image";
import fs from "fs/promises";
import path from "path";

const [fontBuffer, backgroundImageBuffer] = await Promise.all([
  fs.readFile(path.join(process.cwd(), "public/fonts/NotoSansJP.ttf")),
  fs.readFile(path.join(process.cwd(), "public/og-background-image.webp")),
]);

const fonts: Font[] = [
  {
    name: "Noto Sans JP",
    data: fontBuffer,
    weight: 400,
    style: "normal",
  },
];

// Convert image to base64 data URL
const backgroundImageBase64 = `data:image/webp;base64,${backgroundImageBuffer.toString('base64')}`;

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<"/og/blog/[...slug]">) {
  const { slug } = await params;
  const page = blog.getPage(slug.slice(0, -1));
  if (!page) notFound();

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
      backgroundImage={`url(${backgroundImageBase64})`}
    />,
    {
      width: 1200,
      height: 630,
      format: "webp",
      fonts,
    },
  );
}

export function generateStaticParams() {
  return blog.getPages().map((page) => ({
    lang: page.locale,
    slug: getBlogImage(page).segments,
  }));
}
