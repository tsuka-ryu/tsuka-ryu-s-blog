module.exports = {
  ci: {
    collect: {
      // Next.jsアプリケーションを起動
      startServerCommand: "pnpm start",
      startServerReadyPattern: "Ready",
      // テストするURL
      url: ["http://localhost:3000", "http://localhost:3000/blog"],
      // 各URLを3回テストして中央値を取得
      numberOfRuns: 3,
    },
    assert: {
      preset: "lighthouse:recommended",
      assertions: {
        // パフォーマンススコアの基準値
        "categories:performance": ["warn", { minScore: 0.8 }],
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "categories:best-practices": ["error", { minScore: 0.9 }],
        "categories:seo": ["error", { minScore: 0.9 }],
      },
    },
    upload: {
      // 一時的なパブリックストレージにアップロード（結果を共有可能）
      target: "temporary-public-storage",
    },
  },
};
