import Link from "next/link";
import { blog } from "@/lib/source";
import { PathUtils } from "fumadocs-core/source";

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
    <main>
      <h1>tsukaryu blog</h1>
      <section>
        {posts.map((post) => (
          <Link key={post.url} href={post.url}>
            <p>{post.data.title}</p>
            <p>{new Date(post.data.date ?? getName(post.path)).toDateString()}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
