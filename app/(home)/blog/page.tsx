import { blog } from "@/lib/source";
import { PathUtils } from "fumadocs-core/source";
import Link from "next/link";

import { Gimmick } from "@/components/gimmick";

function getName(path: string) {
  return PathUtils.basename(path, PathUtils.extname(path));
}

export default function Page() {
  const posts = [...blog.getPages()].sort(
    (a, b) =>
      new Date(b.data.date ?? getName(b.path)).getTime() -
      new Date(a.data.date ?? getName(a.path)).getTime(),
  );

  return (
    <main className="relative flex flex-col flex-1">
      <Gimmick />
      <div className="z-0 mx-auto max-w-page w-full px-4 3xl:px-8 py-8">
        <h1 className="mb-6 text-2xl font-bold">Recent Posts</h1>
        <section className="space-y-4">
          {posts.map((post) => (
            <div key={post.url}>
              <Link
                href={post.url}
                className="text-lg text-accent-foreground underline decoration-fd-primary hover:opacity-80"
              >
                {post.data.title}
              </Link>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {new Date(post.data.date ?? getName(post.path))
                  .toLocaleString("ja-JP")
                  .replace(/\//g, "/")}
              </p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
