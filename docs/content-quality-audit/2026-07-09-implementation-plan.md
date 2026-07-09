# 内容品質改善 実装メモ

作成日: 2026-07-09

このメモは、`2026-07-09-vibe-coding-content-quality-audit.md` の内容を実装に移すための対応表です。監査レポート本体は原本として残し、実装状況はこちらで管理します。

## 今回の実装範囲

| 監査指摘 | 対応 | 主なファイル |
| --- | --- | --- |
| 最初の完走教材が足りない | 小さな実践例を、元メモ、要件メモ、構成、初稿、修正、確認、作業記録までの1サイクルに拡張 | `src/content/docs/practice.mdx`, `src/content/docs/start.mdx` |
| トップ導線が読者状態別になっていない | トップを「まず理解する」「すぐ始める」「困ったら見る」「慣れてから広げる」に整理 | `src/pages/index.astro` |
| 公開・デプロイ前後の実務が足りない | 公開前チェックページを追加し、GitHub Pages導線を内部ページ経由に変更 | `src/content/docs/publish-check.mdx`, `src/pages/index.astro`, `astro.config.mjs` |
| セキュリティが秘密情報注意に寄りすぎている | Webアプリ公開前の認証、認可、環境変数、入力値、依存関係確認を追加 | `src/content/docs/checklists.mdx`, `src/content/docs/publish-check.mdx`, `src/content/docs/glossary.mdx` |
| 検証が初回フローに組み込まれていない | 実践例に確認結果の出力形を追加し、チェックリストにUI状態確認を追加 | `src/content/docs/practice.mdx`, `src/content/docs/checklists.mdx` |
| ツール紹介が個別ツール先行で現在性に弱い | 用途別選定表と、使う前に確認することを追加 | `src/content/docs/tools.mdx`, `src/content/docs/my-vibe-coding.mdx`, `src/content/docs/voice-input.mdx` |

## 後回しにするP2

今回のバッチは、監査レポートのP1と、P1に直結するP2を中心にした。以下は別バッチで扱う。

- `asking.mdx` の各カテゴリ冒頭に「迷ったらこれだけ」を追加する
- `templates.mdx` の全カードを「最小」「足すなら」で統一する
- `folder-structure.mdx` の素材/下書き/公開候補ラベルをさらに整理する
- `common-mistakes.mdx` と `recover.mdx` の復旧ログ項目を完全に揃える
- `docs/content-review/*.md` の古いバックログを対応済み/再確認必要に分ける

## 実装時の注意

- GitHub Pages公式へ直接誘導する前に、公開前チェックを読ませる。
- ツール名、料金、無料枠、スター数、スタック構成を現在事実として断定しない。
- `practice.mdx` はプロンプト集ではなく、1本の流れとして読める状態にする。
- 公開前チェックは怖がらせるためではなく、練習、自分用、他人に使わせるものを分けるために置く。

## 完了確認

- [x] `npm run qa` が通る
- [x] `git diff --check` が通る
- [x] `publish-check` がビルド必須ルートに入っている
- [x] トップページから初回導線と公開前チェックに移動できる
- [x] 実践例に元メモ、要件メモ、確認結果、作業記録が入っている
- [x] ツールページに用途別選定表と確認事項が入っている

## 検証結果

- `npm run qa`: pass。`checkedRoutes: 17`, `checkedHtmlFiles: 18`。
- `git diff --check`: pass。WindowsのCRLF警告のみ。
- Playwright: `/`, `/practice/`, `/publish-check/` を desktop 1280x740 と mobile 390x844 で確認し、横スクロールなし。

## サブエージェントレビュー対応

- 計画レビュー: `planner` サブエージェントで確認。監査原本を更新対象にしないこと、GitHub Pages導線を公開前チェック経由にすることを反映済み。
- 最終レビュー: `code-reviewer` サブエージェントで確認。静的フロントエンドの環境変数が安全に見える表現、GitHub Pagesを制限共有のように読める表現を修正済み。
