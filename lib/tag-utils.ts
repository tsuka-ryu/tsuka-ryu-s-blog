import { slugify } from "transliteration";

/**
 * タグ名からURLスラッグを生成
 */
export function getTagSlug(tagName: string): string {
  return slugify(tagName);
}

/**
 * スラッグから元のタグ名を取得
 */
export function getTagNameFromSlug(slug: string, allTags: string[]): string | undefined {
  return allTags.find((tag) => getTagSlug(tag) === slug);
}
