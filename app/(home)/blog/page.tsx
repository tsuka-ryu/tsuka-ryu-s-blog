import { Gimmick } from "@/components/gimmick";
import { PostListItem } from "@/components/post-list-item";
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
    <main className="relative flex flex-col flex-1">
      <Gimmick />
      <div className="z-0 mx-auto max-w-page w-full px-4 3xl:px-8 py-8">
        <h1 className="mb-6 text-2xl font-bold">Recent Posts</h1>
        <section className="space-y-4">
          {posts.map((post) => (
            <PostListItem key={post.url} post={post} />
          ))}
        </section>
      </div>
    </main>
  );
}
