import { blog } from "@/lib/source";
import { PathUtils } from "fumadocs-core/source";
import { notFound } from "next/navigation";

import { Gimmick } from "@/components/gimmick";
import { PostListItem } from "@/components/post-list-item";

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
  const tags = new Set<string>();

  posts.forEach((post) => {
    const postTags = post.data.tags as string[] | undefined;
    if (postTags) {
      postTags.forEach((tag) => tags.add(tag));
    }
  });

  return Array.from(tags).map((tag) => ({
    tag: encodeURIComponent(tag),
  }));
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag: encodedTag } = await params;
  const tag = decodeURIComponent(encodedTag);

  const posts = [...blog.getPages()]
    .filter((post) => {
      const tags = post.data.tags as string[] | undefined;
      return tags?.includes(tag);
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
        <h1 className="mb-6 text-2xl font-bold">Posts for: #{tag}</h1>
        <section className="space-y-4">
          {posts.map((post) => (
            <PostListItem key={post.url} post={post} />
          ))}
        </section>
      </div>
    </main>
  );
}
