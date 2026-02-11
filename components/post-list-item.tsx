import type { InferPageType } from "fumadocs-core/source";
import { PathUtils } from "fumadocs-core/source";
import Link from "next/link";

import type { blog } from "@/lib/source";

function getName(path: string) {
  return PathUtils.basename(path, PathUtils.extname(path));
}

interface PostListItemProps {
  post: InferPageType<typeof blog>;
}

export function PostListItem({ post }: PostListItemProps) {
  return (
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
  );
}
