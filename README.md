# tsukaryu's blog

個人ブログサイトのプロトタイプです。[Fumadocs](https://fumadocs.dev)を使用してドキュメント機能とブログ機能を実装し、[Paper Shaders](https://github.com/paper-design/shaders)のGrainGradientを使って美しいグラデーション背景を実現しています。

## 技術スタック

- **Next.js** - Reactフレームワーク
- **Fumadocs** - ドキュメント・ブログ機能
- **Paper Shaders** - WebGLベースのグラデーション背景エフェクト
- **Tailwind CSS** - スタイリング

## セットアップ

このプロジェクトは**pnpm**を使用しています。[@antfu/ni](https://github.com/antfu/ni)を使うと便利です。

```bash
# 依存関係のインストール
nci

# 開発サーバーの起動
nr dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## プロジェクト構成

### 主要ファイル

- `lib/source.ts` - コンテンツソースアダプター。[`loader()`](https://fumadocs.dev/docs/headless/source-api)でコンテンツにアクセス
- `lib/layout.shared.tsx` - レイアウトの共通設定
- `source.config.ts` - Fumadocs MDXの設定（frontmatterスキーマなど）

### ルート構成

| ルート                    | 説明                               |
| ------------------------- | ---------------------------------- |
| `app/(home)`              | ランディングページとその他のページ |
| `app/(home)/blog`         | ブログ一覧・詳細ページ             |
| `app/(home)/about`        | Aboutページ                        |
| `app/docs`                | ドキュメントレイアウトとページ     |
| `app/api/search/route.ts` | 検索機能のRoute Handler            |

## 参考リンク

- [Next.js Documentation](https://nextjs.org/docs)
- [Fumadocs](https://fumadocs.dev)
- [Paper Shaders](https://github.com/paper-design/shaders)
