import { getBlogImage, blog } from "@/lib/source";
import { notFound } from "next/navigation";
import { ImageResponse } from "@takumi-rs/image-response";
import BlogPost from "@/components/og-image";
import fs from "fs/promises";
import path from "path";

// FIXME: コンテンツ数が4以上になると、ビルドがハングするようになる
// export const revalidate = 0;

export async function GET(_req: Request, { params }: RouteContext<"/og/blog/[...slug]">) {
  const { slug } = await params;
  const page = blog.getPage(slug.slice(0, -1));
  if (!page) notFound();

  // Load Noto Sans JP font
  const fontPath = path.join(process.cwd(), "public/fonts/NotoSansJP.ttf");
  const fontData = await fs.readFile(fontPath);

  // Load background image directly from filesystem
  const backgroundImagePath = path.join(process.cwd(), "public/og-background-image.webp");
  const backgroundImageData = await fs.readFile(backgroundImagePath);
  const backgroundImageBase64 = `data:image/webp;base64,${backgroundImageData.toString("base64")}`;

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

// export function generateStaticParams() {
//   return blog.getPages().map((page) => ({
//     lang: page.locale,
//     slug: getBlogImage(page).segments,
//   }));
// }
