import { blog } from "@/lib/source";
import Link from "next/link";

import { Gimmick } from "@/components/gimmick";
import { getTagSlug } from "@/lib/tag-utils";

export default function TagsPage() {
  const posts = blog.getPages();

  // タグごとに記事数をカウント
  const tagCounts = new Map<string, number>();

  posts.forEach((post) => {
    const tags = post.data.tags as string[] | undefined;
    if (tags) {
      tags.forEach((tag) => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      });
    }
  });

  // タグを記事数の多い順にソート
  const sortedTags = Array.from(tagCounts.entries()).sort(
    (a, b) => b[1] - a[1]
  );

  return (
    <main className="relative flex flex-col flex-1">
      <Gimmick />
      <div className="z-0 mx-auto max-w-page w-full px-4 3xl:px-8 py-8">
        <h1 className="mb-6 text-2xl font-bold">Tags</h1>
        <ul className="space-y-2">
          {sortedTags.map(([tag, count]) => (
            <li key={tag} className="before:content-['-'] before:mr-2">
              <Link
                href={`/tags/${getTagSlug(tag)}`}
                className="text-accent-foreground underline decoration-fd-primary hover:opacity-80"
              >
                {tag} [{count}]
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
