import path from "node:path";

import { TOCProvider, TOCScrollArea } from "@/components/toc";
import * as TocClerk from "@/components/toc/clerk";
import * as TocDefault from "@/components/toc/default";
import { createMetadata } from "@/lib/metadata";
import { blog, getBlogImage } from "@/lib/source";
import { getTagSlug } from "@/lib/tag-utils";
import { getMDXComponents } from "@/mdx-components";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import Link from "next/link";

import { PageTOCPopover, PageTOCPopoverContent, PageTOCPopoverTrigger } from "./client";

import type { Metadata } from "next";

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
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

export default async function Page(props: PageProps<"/blog/[slug]">) {
  const params = await props.params;
  const page = blog.getPage([params.slug]);
  // TODO: 型をちゃんとしたほうがいい
  const tocPopoverOptions = {
    style: "clerk",
    header: undefined,
    footer: undefined,
  };
  const tocOptions = {
    style: "clerk",
    header: undefined,
    footer: undefined,
    single: true,
  };

  if (!page) notFound();
  const { body: Mdx, toc } = await page.data.load();

  const wrapper = (children: ReactNode) => (
    <TOCProvider single={tocOptions.single} toc={toc}>
      {children}
    </TOCProvider>
  );

  return wrapper(
    <main>
      <PageTOCPopover>
        <PageTOCPopoverTrigger />
        <PageTOCPopoverContent>
          {tocPopoverOptions.header}
          <TOCScrollArea>
            {tocPopoverOptions.style === "clerk" ? <TocClerk.TOCItems /> : <TocDefault.TOCItems />}
          </TOCScrollArea>
          {tocPopoverOptions.footer}
        </PageTOCPopoverContent>
      </PageTOCPopover>
      <div
        className="mx-auto max-w-page w-full grid grid-cols-1 xl:grid-cols-[1fr_234px] [--fd-docs-height:100dvh] [--fd-toc-width:234px]"
        style={
          {
            "--fd-docs-row-1": "var(--fd-banner-height, 0px)",
            gridTemplate: `"toc-popover toc-popover"
                         "main toc" 1fr`,
          } as React.CSSProperties
        }
      >
        <article className="flex flex-col mx-auto w-full max-w-200 px-4 py-8 [grid-area:main]">
          <div className="flex flex-row gap-4 text-sm mb-8">
            <div>
              <p className="mb-1 text-fd-muted-foreground">Written by</p>
              <p className="font-medium">{page.data.author}</p>
            </div>
            <div>
              <p className="mb-1 text-sm text-fd-muted-foreground">At</p>
              <p className="font-medium">
                {new Date(
                  page.data.date ?? path.basename(page.path, path.extname(page.path)),
                ).toDateString()}
              </p>
            </div>
          </div>

          <h1 className="text-3xl font-semibold mb-4">{page.data.title}</h1>
          <p className="text-fd-muted-foreground mb-8">{page.data.description}</p>

          {page.data.tags && (page.data.tags as string[]).length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {(page.data.tags as string[]).map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${getTagSlug(tag)}`}
                  className="text-xs text-fd-muted-foreground underline decoration-fd-primary hover:opacity-80"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          <div className="prose max-w-[calc(100vw-2rem)] md:max-w-full min-w-0 flex-1">
            <Mdx components={getMDXComponents()} />
          </div>
        </article>

        <div
          id="nd-toc"
          className="sticky top-[calc(var(--fd-docs-row-1)+1rem)] h-[calc(var(--fd-docs-height)-var(--fd-docs-row-1)-1rem)] flex flex-col [grid-area:toc] w-(--fd-toc-width) pt-12 ps-4 pb-2 max-xl:hidden"
        >
          {tocOptions.header}
          <h3
            id="toc-title"
            className="inline-flex items-center gap-1.5 text-sm text-fd-muted-foreground"
          >
            {/* TODO: 有効化したい */}
            {/* <Texx className="size-4" /> */}
            {/* <I18nLabel label="toc" /> */}
          </h3>
          {/* TODO: スクロール位置の判定が微妙なので、一番したまでいくように修正したい */}
          <TOCScrollArea>
            {tocOptions.style === "clerk" ? <TocClerk.TOCItems /> : <TocDefault.TOCItems />}
          </TOCScrollArea>
          {tocOptions.footer}
        </div>
      </div>
    </main>,
  );
}
