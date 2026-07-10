# レビュー指摘全面修正 設計仕様

作成日: 2026-07-10

## 目的

レビューで確認した404復旧、QA/CI、初心者向け実践教材、公開前導線、モバイルヘッダーの問題を、表面的な文言修正ではなく再発防止を含めて解消する。

完了後は、初心者がトップページから実践へ入り、静的HTMLを作って実画面で確認し、公開前には対象コミット・Actions・公開URL・停止方法を確認できる。GitHub Pagesへ公開される成果物は、同じQAを通過したものだけに限定する。

## 採用方式

「動的base対応＋CIゲート＋実表示で完走する教材＋ネイティブモバイルメニュー」を採用する。

次の案は採用しない。

- 固定 `/VibeCoding` の直書きだけで404を直す案: `BASE_PATH` 変更時に再発する。
- モバイルナビ項目を削って高さだけ減らす案: ページへの到達性を落とす。
- 実践教材の完成条件をMarkdownへ弱める案: 「実際に作って表示を確認する」初回体験にならない。
- 404専用レイアウト、共通Navコンポーネント、Playwright常設CIまで広げる案: 今回の修正範囲に対して過剰である。

## 対象範囲

### 公開信頼性

- `src/content/docs/404.mdx`
- `scripts/check-built-site.mjs`
- `scripts/check-built-site.test.mjs`（新規）
- `.github/workflows/deploy.yml`
- `package.json`

### ヘッダーとレスポンシブ導線

- `astro.config.mjs`
- `src/pages/index.astro`
- `src/styles/custom.css`

### 教材と公開手順

- `src/content/docs/practice.mdx`
- `src/content/docs/publish-check.mdx`
- `src/content/docs/checklists.mdx`

## 非対象

- 新しいフレームワークや依存パッケージの導入
- GitHub Pagesへの実デプロイ、コミット、プッシュ
- 全ページのデザイン刷新
- 認証、バックエンド、決済機能の追加
- GitHubの画面構成を再現するスクリーンショット教材

## 1. 公開信頼性の設計

### 404ページ

`404.mdx` の `draft: true` を削除し、本番に下書き警告を出さない。

見出しは「ページがありません」とし、デスクトップで末尾1文字だけが改行される状態を避ける。復旧リンクはfrontmatterの固定actionを使わず、`@astrojs/starlight/components` の `LinkButton` と `import.meta.env.BASE_URL` を使って生成する。

- はじめの一歩: `${base}start/`
- トップ: `base`

`base` は末尾 `/` を必ず1つ持つ形に正規化する。深い不明URLから404が表示されても、現在URL基準の相対リンクにはしない。

### ビルド済みサイト検査

`check-built-site.mjs` は、生成HTMLに含まれるローカル `href` と `src` を次の順で検査する。

1. `mailto:`, `tel:`, `data:`, `javascript:`, 外部originを検査対象外にする。
2. 同一originのURLをページURL基準で解決する。
3. 解決後のpathnameが `BASE_PATH` の外へ出た場合は `escapedBaseReferences` として失敗する。
4. queryを除去し、ルートまたはアセットの実体ファイルを検査する。
5. fragmentがある場合は、対象HTMLに対応する `id` が存在するか検査する。Unicode fragmentはdecodeして比較する。
6. `dist/404.html` を必須とし、下書き警告文が含まれていたら失敗する。

検査結果は既存のJSON出力を維持し、成功時にはルート、HTML、ローカル参照、fragmentの検査件数を出す。失敗時はページ、参照URL、分類、期待ファイルまたはfragmentを出す。

### テスト

Node.js 22標準の `node:test` と一時ディレクトリfixtureを使い、依存を追加しない。

最低限のケース:

- baseが `/VibeCoding` のとき `/start/` をbase外参照として拒否する。
- `/VibeCoding/start/` を受理する。
- 存在しないルートとアセットを拒否する。
- 存在しないfragmentを拒否する。
- 日本語を含む有効なfragmentを受理する。
- 404内の下書き警告文を拒否する。

テスト可能にするため、参照収集・URL解決・実体検査は副作用のない関数としてexportし、CLI実行は直接実行時だけ行う。

### CIゲート

`package.json` は次の責務に分ける。

- `test`: `node --test scripts/check-built-site.test.mjs`
- `qa:site`: 既存のビルド成果物検査
- `qa`: build → test → qa:site

GitHub Pages workflowのartifact uploadは `npm run qa` 成功後だけ実行する。QA失敗時にdeploy jobへ進まない既存のjob依存関係を維持する。

## 2. ヘッダーとレスポンシブ導線の設計

### 公開前導線

次の2箇所から「公開する前に」を削除する。

- Starlightの `social` 設定
- トップページの `github-button`

GitHubアイコンはGitHub上のソースや公式ページへ進む意味に見えるため、内部の公開前ガイドには使わない。公開前ガイドへの導線は次に限定する。

- トップページheroの「公開する前に見る」
- Starlightサイドバーの「公開する前に」
- 関連する本文リンク

### ナビゲーション

トップページの10件のリンクを `navItems` 配列へ集約し、デスクトップナビとモバイルメニューの両方を同じ配列から描画する。

デスクトップ:

- 現在の横並びナビを維持する。
- GitHub風ボタン削除後の空きをナビに使う。

モバイル:

- ブランドと閉じた `<details>` の「メニュー」だけを初期表示する。
- `<summary>` は44px以上の操作領域を持つ。
- 開くと10件すべてを2列で表示する。
- Tab、Enter、Spaceで開閉・移動できるネイティブ挙動を使う。
- 320pxと375pxで横スクロールを発生させない。

閉じた状態のヘッダー高は375×844で96px以下とする。メニューを開いた状態で本文が下へ押し下げられることは許容し、本文を覆うoverlayにはしない。

不要になる `.github-button` と、モバイルで全リンクを常時展開する現行CSSは削除する。

## 3. 初心者向け実践教材の設計

### 成果物

実践成果物を `outputs/reading-note.md` から `outputs/reading-note.html` へ変更する。HTML、CSS、本文を1ファイルに含め、サーバーやビルドツールなしでブラウザから開ける静的ページにする。

要件メモの完成条件は次の4点にする。

- ブラウザで実際に開ける。
- 幅375pxで横スクロールがない。
- タイトル、読んだ日、印象に残った一文、次に読む本を読める。
- ログイン、保存、検索、公開設定を追加していない。

### 手順

教材は次の8段階にする。

1. 元メモを置く。
2. 小さな要件メモを書く。
3. 構成だけ出してもらう。
4. 静的HTMLの初稿を作る。
5. 直したい点を1つずつ伝える。
6. ブラウザでデスクトップ表示を確認する。
7. 375×844でスマホ表示を確認し、証拠を残す。
8. 作業記録を書く。

ブラウザを操作できない場合、AIは「未確認」と報告し、推測で「問題なし」にしない。未確認項目がある間は「次に進む」の完了扱いにしない。

作業記録例には次を含める。

- 確認したファイル
- 確認した画面幅
- 横スクロールの有無
- 主要内容の表示結果
- 未完了項目
- 次に直すこと

公開しない練習では引用確認を完走条件にしない。公開する場合のみ、公開前ページへ引き継ぐ。

## 4. 公開前手順の設計

`publish-check.mdx` に「公開操作」と「公開後確認」を追加する。

### 初回設定

- リポジトリの `Settings > Pages` で公開元がGitHub Actionsになっているか確認する。
- リポジトリが非公開でも、Pagesサイトまで非公開とは限らないことを説明する。

### 毎回の公開

1. ローカルで `npm run qa` を成功させる。
2. 公開対象のbranchとcommit SHAを記録する。
3. `main` へpushする。
4. Actionsの `Deploy to GitHub Pages` で対象runを開く。
5. buildとdeployの両jobが成功し、branchとcommitが対象と一致することを確認する。
6. workflowの公開URLから実画面を開く。
7. トップ、主要導線、404復旧、スマホ表示を確認する。
8. commit SHA、run URL、公開URL、確認日時を作業記録へ残す。

失敗時は再実行を連打せず、最初に失敗stepとログを確認する。

### 公開停止

緊急時はGitHub PagesのUnpublishを使えること、再公開には新しい成功deploymentが必要であることを説明する。削除と公開停止を同じ操作として説明しない。

### 公式情報

変化しやすいGitHub UIを文章だけで断定せず、次を正本としてリンクする。

- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows/monitoring-workflows/viewing-workflow-run-history
- https://docs.github.com/en/pages/getting-started-with-github-pages/unpublishing-a-github-pages-site

`checklists.mdx` の公開前項目にも、Actionsの対象commit、build/deploy、公開URLの確認を追加し、詳細は `publish-check.mdx` へ誘導する。

## 5. マルチエージェント実装設計

書き込み可能なエージェントは、同時に重複ファイルを編集しない。

### レーンA: QA/CI

所有ファイル:

- `scripts/check-built-site.mjs`
- `scripts/check-built-site.test.mjs`
- `package.json`
- `.github/workflows/deploy.yml`

先にテストを失敗させ、checkerとworkflowを修正する。404本文は編集しない。

### レーンB: ヘッダー/UI

所有ファイル:

- `astro.config.mjs`
- `src/pages/index.astro`
- `src/styles/custom.css`

デスクトップとモバイルの導線だけを変更し、教材本文は編集しない。

### レーンC: コンテンツ

所有ファイル:

- `src/content/docs/404.mdx`
- `src/content/docs/practice.mdx`
- `src/content/docs/publish-check.mdx`
- `src/content/docs/checklists.mdx`

checker、workflow、トップページCSSは編集しない。

### 統合と検査

主セッションが3レーンの差分を確認し、競合・重複・仕様逸脱を解消する。書き込み担当とは別のread-only reviewerが、欠陥を見つける目的で最終差分と実画面を検査する。

## 6. 受入条件

### 機械検証

- `npm run qa` が成功する。
- `git diff --check` が成功する。
- `npm audit --audit-level=high` がhigh/critical 0件で終了する。
- checkerの単体テストがすべて成功する。
- 意図的なbase外参照、欠落fragment、404下書き警告fixtureが失敗する。
- PowerShellで `$env:BASE_PATH='/PreviewBase'; npm run qa; Remove-Item Env:BASE_PATH` を実行し、別base検証が成功する。
- `dist/404.html` に下書き警告、`href="/start/"`、`href="/"` が存在しない。

### 実画面

- 1440×1000のトップヘッダーにGitHubアイコン付き「公開する前に」がない。
- heroの「公開する前に見る」は残る。
- 375×844の閉じたトップヘッダーが96px以下である。
- モバイルメニューを開くと10リンクすべて表示され、キーボードで操作できる。
- 320px、375px、1440pxで横スクロールがない。
- 404の2つの復旧リンクがbase配下の正しいページへ進む。
- 404見出しに末尾1文字だけの孤立改行がない。

### コンテンツ

- `practice.mdx` に `outputs/reading-note.md` が残らない。
- 実践教材が実HTML表示と375×844確認まで進む。
- スマホ表示を未確認のまま「完了」「次に進む」としない。
- `publish-check.mdx` に公開元、対象commit、Actionsのbuild/deploy、実URL、証跡、公開停止、公式リンクが揃う。

## 7. 失敗時の扱い

- MDXで `import.meta.env.BASE_URL` と `LinkButton` がビルドできない場合、固定baseへ戻さず、同じ動的base要件を満たす `src/pages/404.astro` 案へ切り替える。
- checkerのURL正規化で既存の有効リンクを拒否した場合、例外を増やす前に生成HTMLと参照分類を記録する。
- モバイルメニューが320pxで切れる場合、リンクを削らず1列表示へ落とす。
- GitHub UIの表示名が変わっても、公式リンクと「対象run・commit・job成功・公開URL」という確認対象は維持する。

## 8. セキュリティとファイル境界

- 外部送信、公開、コミット、プッシュは行わない。
- 秘密情報や認証情報を追加しない。
- GitHubの手順確認は公式ドキュメントだけを根拠にする。
- 既存のユーザー変更が発生した場合、対象ファイルとの重複を確認してから統合する。
- 生成物 `dist/` は検査対象であり、正本は `src/`, `scripts/`, `.github/`, `package.json` とする。
