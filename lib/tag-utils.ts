import { slugify } from "transliteration";

/**
 * タグスラッグ変換ユーティリティ
 *
 * 日本語のタグ名を読みやすいURLスラッグに変換します。
 * - カスタム定義がある場合: そのスラッグを使用
 * - それ以外: transliterationで自動変換
 *
 * 例:
 * - "ブログ盆栽" → "blog-bonsai" (カスタム)
 * - "Next.js" → "nextjs" (カスタム)
 * - "RSSフィード" → "rsshuido" (自動変換)
 */

/**
 * カスタムスラッグマッピング
 *
 * 自動変換が不適切な場合や、より意味のあるスラッグにしたい場合にここに追加します。
 * 新しいタグを記事に追加した際、自動変換の結果が気に入らない場合はここに追加してください。
 */
const CUSTOM_TAG_SLUGS: Record<string, string> = {
  ブログ盆栽: "blog-bonsai",
  "Next.js": "nextjs",
  開発環境: "dev-env",
  ツール: "tools",
  生産性UP: "productivity",
  // 必要に応じて追加
};

/**
 * タグ名からURLスラッグを生成
 * カスタムスラッグが定義されていればそれを使い、なければtransliterationで自動生成
 */
export function getTagSlug(tagName: string): string {
  if (CUSTOM_TAG_SLUGS[tagName]) {
    return CUSTOM_TAG_SLUGS[tagName];
  }

  return slugify(tagName);
}

/**
 * スラッグから元のタグ名を取得
 * 全記事をスキャンして該当するタグ名を見つける
 */
export function getTagNameFromSlug(
  slug: string,
  allTags: string[]
): string | undefined {
  // カスタムスラッグから検索
  const customEntry = Object.entries(CUSTOM_TAG_SLUGS).find(
    ([, customSlug]) => customSlug === slug
  );
  if (customEntry) {
    return customEntry[0];
  }

  // 自動生成スラッグから検索
  return allTags.find((tag) => getTagSlug(tag) === slug);
}
