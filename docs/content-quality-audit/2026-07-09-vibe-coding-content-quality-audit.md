# Vibe Coding Guide 内容品質監査

監査日: 2026-07-09
対象: `src/pages/index.astro`, `src/content/docs/*.mdx`, `research/*.md`, `docs/content-review/*.md`
目的: 外部の Vibe Coding / AI coding 入門・公式ガイドと比較して、内容品質、不足、正確性を確認する。

## 実施方法

メイン監査に加えて、3つのサブエージェントで読み取り専用レビューを実施した。

| レーン | 担当 | 主な観点 |
| --- | --- | --- |
| 初心者教材品質 | writing-voice-editor | 読む順番、例の分かりやすさ、コピーして動けるか |
| 納品物・正確性 | consulting-delivery-auditor | 外部ベンチマーク、公開リスク、過大表現、現在性 |
| 情報アクセシビリティ | information-accessibility-reviewer | Find / Receive / Understand / Participate / Continue |

外部比較では、公式ドキュメントと信頼度の高い解説を優先した。主な比較対象は次の通り。

- VS Code AI best practices: https://code.visualstudio.com/docs/agents/best-practices
- Claude Code best practices: https://code.claude.com/docs/en/best-practices
- Claude Code common workflows: https://code.claude.com/docs/en/common-workflows
- Replit Vibe coding 101: https://docs.replit.com/learn/foundations/vibe-coding-101
- Lovable best practices: https://docs.lovable.dev/tips-tricks/best-practice
- Lovable from idea to app: https://docs.lovable.dev/tips-tricks/from-idea-to-app
- Lovable security best practices: https://docs.lovable.dev/tips-tricks/security-best-practices
- GitHub Pages official docs: https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- CSA Secure Vibe Coding Guide: https://cloudsecurityalliance.org/blog/2025/04/09/secure-vibe-coding-guide
- Checkmarx Vibe Coding Security: https://checkmarx.com/blog/security-in-vibe-coding/
- The Verge security risk article: https://www.theverge.com/ai-artificial-intelligence/950844/vibe-coding-security-risks-apps
- TechRadar deployment guide: https://www.techradar.com/pro/vibe-coding-guide-how-to-transition-from-ai-generation-to-live-deployment
- Typeless official site: https://www.typeless.com/
- Microsoft MarkItDown: https://github.com/microsoft/markitdown

## 総合判定

現サイトの品質は、一般的な日本語の Vibe Coding 入門より良い。特に「AIへの丸投げではなく、作業場所、要件メモ、確認、記録、戻し方を整える」という軸は強い。これは外部サイトがよく扱うプロンプト集やツール紹介より、実際の継続作業に近い。

一方で、外部の実務寄りガイドと比べると、まだ「最初の一周を完走する教材」と「公開・本番化の最低限チェック」が弱い。現状は、作業環境を整えるガイドとしては強いが、アプリやサイトを作って人に使わせる前のガイドとしては不足が残る。

短く言うと、品質は悪くない。むしろ土台はかなり良い。ただし、今のままだと「安全に始める」には強く、「作って検証して公開に近づける」にはまだ弱い。

## 比較スコア

| 領域 | 評価 | 現サイトの状態 | 外部ベンチマークとの差 |
| --- | --- | --- | --- |
| 概念と役割分担 | 良い | `what-is-vibe-coding.mdx` が人間の目的設定・確認責任を明示 | Replitの「人間が主導する」説明と整合 |
| 最初の一周 | 要改善 | `practice.mdx` はあるが、元メモ、要件メモ、出力例、完成例、検証ログが不足 | Tom's Guide / Replit は小さく作って試す一周を前面に出す |
| 作業場所と文脈設計 | 良い | `sources/`, `notes/`, `outputs/`, `logs/` の分離が明確 | 外部サイトより強い差別化点 |
| 頼み方・プロンプト | 良い | `asking.mdx`, `templates.mdx`, `short-prompts.mdx` が実用的 | ただし表が多く、各セクションに「迷ったらこれだけ」がほしい |
| 検証・テスト | 要改善 | Playwright とチェックリストはあるが初回サイクルに組み込まれていない | Claude Code は検証可能なチェック、VS Code はレビュー/検証を強く推奨 |
| 復旧・作業記録 | 良い | 3回直らなければ止まる、相談用メモ、秘密情報を伏せる説明がある | 外部入門記事より具体的 |
| UI/UX確認 | 要改善 | スマホ、リンク、分かりにくい表現はある | 空状態、エラー状態、読み込み中、権限なしなどが不足 |
| セキュリティ | 要改善 | 個人情報・秘密情報の注意はある | 認証、認可、入力検証、環境変数、依存関係、公開後対応が不足 |
| デプロイ・公開 | 弱い | GitHub Pages 公式リンクはあるが、公開前後の手順はない | GitHub Pages / TechRadar と比べると公開範囲・URL確認・非公開化が不足 |
| ツール紹介 | 普通 | Typeless, MarkItDown, Playwright, Product Starter などは有用 | ツール名・料金・仕様の現在性が弱いので、確認日と選定軸が必要 |

## 良い点

### 1. Vibe Coding をプロンプト芸ではなく作業設計として扱えている

`what-is-vibe-coding.mdx` は、AIが担当することと人間が担当することを分けている。これはReplitの公式説明と同じ方向で、初心者にとって健全な入り口になっている。

### 2. フォルダ構成、作業記録、戻し方が強い

`folder-structure.mdx`, `work-log.mdx`, `recover.mdx` は、外部入門記事では薄くなりがちな「次回再開」「相談用メモ」「戻れる地点」を具体化している。これはこのサイトの一番強い独自価値。

### 3. 「見るだけ」と「直す」を分ける説明が事故防止に効く

`asking.mdx` の「まだ編集しないで」「原因候補だけ」「この範囲だけ修正」は、初心者がAIに勝手に進められて混乱する事故を減らす。AIコーディングの実務上かなり大事。

### 4. 秘密情報の注意がかなり入ってきている

`work-log.mdx`, `recover.mdx`, `tools.mdx` には、個人情報、APIキー、内部資料、限定公開URLを伏せる説明がある。これは正しい方向。

## 主な不足

### P1: 最初の完走教材が足りない

`practice.mdx` は「自分用メモから1ページを作る」という題材が良い。ただし、教材としてはまだ薄い。

不足しているもの:

- `sources/` に置く元メモ例
- `notes/` の小さな要件メモ例
- AIへの初回依頼
- AIが返したページ構成例
- 初稿例
- 修正依頼例
- 公開前チェック後の完成例
- `logs/` に残す作業記録例

修正方向:

- `practice.mdx` を「1時間で一周するページ」にする。
- 1つの題材を通し例として固定する。
- `start.mdx` から `practice.mdx` へ自然に進ませる。

### P1: トップ導線が読者状態別になっていない

トップの「まず読む4つ」は `はじめの一歩 -> 頼み方 -> フォルダ構成 -> 戻し方` で、かなり実践寄り。完全初学者には、概念、用語、小さな実践が後ろに回っている。

修正方向:

- トップ導線を次の4群に分ける。
  - まず理解する: `バイブコーディングとは`, `用語集`
  - すぐ始める: `はじめの一歩`, `小さな実践例`
  - 困ったら見る: `戻し方`, `よくある失敗`
  - 慣れてから広げる: `近道`, `ツール`
- `近道` と `ツール` は強いが、初心者本線とは分けて見せる。

### P1: 公開・デプロイ前後の実務が足りない

GitHub Pages 公式リンクがトップにあるため、読者は「公開まで扱うサイト」と受け取る可能性がある。一方で、現本文には公開直前の具体手順がない。

不足しているもの:

- 公開リポジトリか非公開リポジトリかの確認
- GitHub Pages が静的ファイルを公開する仕組みの短い説明
- 公開URLの確認
- 公開後に非公開化・削除する方法への導線
- 公開前に見てはいけないファイルが混ざっていないかの確認
- Actions / build / deploy の成功確認

修正方向:

- `公開する前に` ページを追加する。
- GitHub Pages 公式リンクは、単独ボタンではなく、このページ経由にする方が安全。

### P1: セキュリティが「秘密情報を出さない」に寄りすぎている

現サイトはログやGitHubに秘密情報を書かない注意は良い。しかし、他人に使わせるアプリではそれだけでは足りない。

不足しているもの:

- APIキーをフロントエンドへ直書きしない
- 環境変数を使う
- ログインと権限を分ける
- ユーザーごとのデータ分離
- 入力値検証
- 依存関係の確認
- 管理画面やデータ削除の確認
- バックアップと戻し方
- 専門家レビューが必要になる条件

修正方向:

- `checklists.mdx` に「他人に使わせるなら10項目」を追加する。
- 練習、自分用、公開用の3段階で確認の重さを分ける。

### P1: 検証が初回フローに組み込まれていない

Claude Code best practices は、AIにテスト、ビルド、スクリーンショットなど「合否が読める確認」を渡すことを重視している。現サイトも Playwright やチェックリストには触れているが、`start.mdx` と `practice.mdx` の最初の一周に十分入っていない。

修正方向:

- `practice.mdx` に「確認したこと」ブロックを入れる。
- AIへの依頼文に「確認結果も報告してください」を入れる。
- `checklists.mdx` に正常系、空状態、エラー、読み込み中、権限なし、再読み込み後のデータ保持を追加する。

## 正確性の監査

### 正しい、または大きな問題がない内容

- 「AIに丸投げせず、人間が目的・確認・公開判断を持つ」という説明は妥当。
- 「短い指示が効くのは、前提整理があるから」という説明は妥当。
- 「3回直らなければ止まる」「原因候補だけ出させる」「戻れる地点を確認する」は、外部実務系記事とも整合する。
- Typeless のフィラー除去、繰り返し除去、自動整形の説明は公式サイトの説明と整合する。
- MarkItDown は多形式を Markdown 化する用途として妥当。ただし、図表やスキャンPDFの完全再現を期待させない今の注意は必要。

### 正確性リスクがある内容

| 箇所 | リスク | 修正方向 |
| --- | --- | --- |
| `tools.mdx` の個別ツール紹介 | 料金、無料枠、仕様、プライバシーが変わる | 各ツールに「使う前に公式README/料金/プライバシーを見る」を定型で入れる |
| `Product Starter` のスタック説明 | 依存技術や構成が変わる | 「2026-07-09確認」または「READMEで確認」と書く |
| `my-vibe-coding.mdx` の GitHub スター数・伸び検索 | スター数は品質保証ではない | ライセンス、更新日、Issue、セキュリティ注意を同格に置く |
| GitHub Pages 公式リンク | 公開できることだけが目立つ | 公開範囲と秘密情報確認を先に置く |
| `docs/content-review/*.md` | 過去の未対応指摘が現本文とずれている | `未対応`, `対応済み`, `再確認必要` に分けて更新する |

重大な事実誤認は見つからない。ただし、外部ツールや公開手順に関する説明は、将来の更新で古くなりやすい。

## 優先修正ロードマップ

### Batch 1: 初心者の最初の一周を強化

対象:

- `src/pages/index.astro`
- `src/content/docs/start.mdx`
- `src/content/docs/practice.mdx`
- `src/content/docs/glossary.mdx`

内容:

- トップ導線を読者状態別にする。
- `practice.mdx` を初回導線に昇格する。
- 1つの通し例を追加する。
- 元メモ、要件メモ、初回依頼、修正依頼、完成例、ログ例を入れる。

### Batch 2: 検証・UI状態チェックを追加

対象:

- `src/content/docs/checklists.mdx`
- `src/content/docs/tools.mdx`
- `src/content/docs/practice.mdx`

内容:

- 「実際に触って確かめる表」を追加する。
- 空状態、エラー状態、読み込み中、権限なし、再読み込み、データ保存を入れる。
- Playwright は発展扱いにしつつ、通常の手動確認でも使える形にする。

### Batch 3: 公開・安全の最低限を追加

対象:

- 新規 `src/content/docs/publish-check.mdx` など
- `src/content/docs/checklists.mdx`
- `src/pages/index.astro`

内容:

- GitHub Pages 公式への導線を、公開前チェックページ経由にする。
- 静的公開、公開URL、非公開化、削除、秘密情報確認を扱う。
- 他人に使わせるアプリの安全チェックを追加する。

### Batch 4: ツール紹介を用途別に整える

対象:

- `src/content/docs/tools.mdx`
- `src/content/docs/my-vibe-coding.mdx`

内容:

- 先頭に用途別選定表を置く。
- 個別ツールは例示扱いにする。
- 確認日、公式README、料金/プライバシー確認を定型化する。

### Batch 5: 既存レビュー資料を現状に合わせる

対象:

- `docs/content-review/*.md`
- `docs/content-quality-audit/*.md`

内容:

- 古い未対応事項を対応済み/再確認必要へ分ける。
- 今回の監査結果を次の修正バックログに統合する。

## 次の実装時の受け入れ条件

- トップページだけで、完全初学者が次の1ページを選べる。
- `practice.mdx` だけで、初心者が1つの小さな作業を完走できる。
- 公開前チェックに、秘密情報、リンク、事実、スマホ、UI状態、権限、入力検証が含まれる。
- ツール紹介は、特定ツールの宣伝ではなく用途別選定として読める。
- `npm run qa` と `git diff --check` が通る。

## 結論

このサイトは、Vibe Coding の入門として「かなり良い土台」になっている。特に、作業場所、記録、戻し方、AIへの頼み方は外部サイトより実務的。

次にやるべきことは、新しい抽象論を足すことではなく、初心者が1回完走できる実践教材と、公開前の安全チェックを入れること。そこまで入ると、単なるプロンプト集ではなく「AIと安全に作業を進める日本語ガイド」としてかなり強くなる。
