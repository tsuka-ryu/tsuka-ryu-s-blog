import { blog } from "@/lib/source";
import { PathUtils } from "fumadocs-core/source";
import { notFound } from "next/navigation";

import { Gimmick } from "@/components/gimmick";
import { PostListItem } from "@/components/post-list-item";
import { getTagSlug, getTagNameFromSlug } from "@/lib/tag-utils";

function getName(path: string) {
  return PathUtils.basename(path, PathUtils.extname(path));
}

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export async function generateStaticParams() {
  const posts = blog.getPages();
  const tags = new Set(posts.flatMap((post) => post.data.tags ?? []));

  return Array.from(tags).map((tag) => ({
    tag: getTagSlug(tag),
  }));
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag: slug } = await params;

  // 全てのタグを収集
  const allPosts = blog.getPages();
  const allTags = new Set(allPosts.flatMap((post) => post.data.tags ?? []));

  // スラッグから元のタグ名を取得
  const tagName = getTagNameFromSlug(slug, Array.from(allTags));

  if (!tagName) {
    notFound();
  }

  const posts = [...allPosts]
    .filter((post) => {
      const tags = post.data.tags as string[] | undefined;
      return tags?.includes(tagName);
    })
    .sort(
      (a, b) =>
        new Date(b.data.date ?? getName(b.path)).getTime() -
        new Date(a.data.date ?? getName(a.path)).getTime()
    );

  if (posts.length === 0) {
    notFound();
  }

  return (
    <main className="relative flex flex-col flex-1">
      <Gimmick />
      <div className="z-0 mx-auto max-w-page w-full px-4 3xl:px-8 py-8">
        <h1 className="mb-6 text-2xl font-bold">Posts for: #{tagName}</h1>
        <section className="space-y-4">
          {posts.map((post) => (
            <PostListItem key={post.url} post={post} />
          ))}
        </section>
      </div>
    </main>
  );
}
