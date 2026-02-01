import { createMetadata } from "@/lib/metadata";
import { blog, getBlogImage } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";
import { notFound } from "next/navigation";

import type { Metadata } from "next";

export async function generateMetadata(props: PageProps<"/blog/[slug]/rss">): Promise<Metadata> {
  const params = await props.params;
  const page = blog.getPage([params.slug]);
  if (!page) notFound();

  const imageUrl = getBlogImage(page).url;

  return createMetadata({
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: imageUrl,
    },
    twitter: {
      images: imageUrl,
    },
  });
}

export function generateStaticParams(): { slug: string }[] {
  return blog.getPages().map((page) => ({
    slug: page.slugs[0],
  }));
}

export default async function RSSPage(props: PageProps<"/blog/[slug]/rss">) {
  const params = await props.params;
  const page = blog.getPage([params.slug]);

  if (!page) notFound();
  const { body: Mdx } = await page.data.load();

  const components = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
  };

  return (
    <main>
      <article className="prose max-w-full">
        <h1>{page.data.title}</h1>
        <Mdx components={getMDXComponents(components)} />
      </article>
    </main>
  );
}
