import { Feed } from "feed";
import { blog } from "@/lib/source";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:3000";

export function getRSS() {
  const feed = new Feed({
    title: "tsuka-ryu's blog",
    id: `${baseUrl}/blog`,
    link: `${baseUrl}/blog`,
    language: "ja",
    description: "tsuka-ryu's personal blog",
    image: `${baseUrl}/banner.png`,
    favicon: `${baseUrl}/favicon.ico`,
    copyright: "All rights reserved 2026, tsuka-ryu",
  });

  for (const page of blog.getPages()) {
    feed.addItem({
      id: page.url,
      title: page.data.title,
      description: page.data.description,
      link: `${baseUrl}${page.url}?view=rss`,
      date: new Date(page.data.date),
      author: [
        {
          name: "tsuka-ryu",
        },
      ],
    });
  }

  return feed.rss2();
}
