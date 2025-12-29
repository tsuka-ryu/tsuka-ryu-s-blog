import Link from "next/link";
import { Hero } from "./page.client";

export default function HomePage() {
  return (
    <main className="relative flex flex-col items-center justify-center text-center flex-1 px-4">
      <Hero />
      <div className="z-0">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 bg-linear-to-b from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400 bg-clip-text text-transparent">
          tsukaryu's blog
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8 bg-linear-to-b from-neutral-800 to-neutral-600 dark:from-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent">
          Typing away at the machine, waiting for something to break.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/blog"
            className="px-6 py-3 rounded-lg font-medium bg-linear-to-b from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400 bg-clip-text text-transparent border border-neutral-300 dark:border-neutral-700 hover:border-neutral-600 dark:hover:border-neutral-400 transition-colors"
          >
            Read Blog
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 rounded-lg font-medium bg-linear-to-b from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400 bg-clip-text text-transparent border border-neutral-300 dark:border-neutral-700 hover:border-neutral-600 dark:hover:border-neutral-400 transition-colors"
          >
            About me
          </Link>
        </div>
      </div>
    </main>
  );
}
