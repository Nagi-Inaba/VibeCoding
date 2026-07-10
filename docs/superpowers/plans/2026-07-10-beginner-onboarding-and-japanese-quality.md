# Beginner Onboarding and Japanese Quality Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** AIコーディング未経験者が、契約関係を誤解せずにツールを1つ選び、作業フォルダを開くところまで進める導入と、読者向けに統一した日本語表現を実装する。

**Architecture:** `start.mdx` を導入の正本にし、`tools.mdx` と `glossary.mdx` は補足、`index.astro` は入口として役割を分ける。変動する製品情報は公式ページへのリンクと確認日を添え、入口となる月額だけを明記する。コンテンツ契約テストで導入順、製品の区別、確認済み価格、統合後の導線を固定する。

**Tech Stack:** Astro 7、Starlight、MDX、Node.js test runner、既存のビルド済みサイト検査。

## Global Constraints

- ChatGPT PlusとClaude Proの月20ドルは確認日、米国月払い、税・地域差の注意と一緒に書く。利用上限やモデル名は固定しない。
- ChatGPT/CodexとClaude/Claude Codeを別の利用経路として書く。
- 複数の有料契約を前提にしない。
- 一般公開は条件付きの一経路とし、サイト全体の開始条件にしない。
- 外部向け本文では、筆者だけに通じる習慣や曖昧な強調を避ける。
- ユーザーから今回のコミット指示は出ていないため、検証後もコミットしない。

---

### Task 1: 導入契約テストを追加する

**Files:**
- Modify: `scripts/content-contract.test.mjs`
- Test: `scripts/content-contract.test.mjs`

**Interfaces:**
- Consumes: 既存の `read(file)` ヘルパー。
- Produces: 導入順、3製品経路、契約分離、用語集、読者向け表現を検査するテスト。

- [x] **Step 1: 失敗するテストを書く**

`start.mdx` のAI選択見出しが作業フォルダ見出しより前にあること、2経路と公式URLがあること、用語集に4語があることを検査する。さらに対象本文に `適当にダラダラ`、`自分の環境では`、`たぶん動いています`、`かなり弱`、`やはりGitHub`、`仕上げ・公開前` が残っていないことを検査する。

ChatGPT PlusとClaude Proの月20ドル、価格確認日、地域差の注意、2026年7月9日のChatGPTデスクトップアプリ統合を検査する。

- [x] **Step 2: REDを確認する**

Run: `node --test scripts/content-contract.test.mjs`

Expected: 新しい導入テストが、AI選択見出しまたは2経路の不足で失敗する。

### Task 2: 最初のAI選択と利用開始を実装する

**Files:**
- Modify: `src/content/docs/start.mdx`
- Modify: `src/content/docs/glossary.mdx`
- Modify: `src/content/docs/tools.mdx`

**Interfaces:**
- Consumes: 設計書の2経路と公式リンク。
- Produces: 初心者が1つのツールを選び、導入完了を確認できる本文。

- [x] **Step 1: `start.mdx` の冒頭を差し替える**

AIを1つ選ぶ説明、2経路の比較、公式ページ確認、導入後の読み取り専用確認文を、既存の作業フォルダ節より前に置く。既存の手順番号を後ろへずらす。

- [x] **Step 2: `glossary.mdx` に必要語を追加する**

`コーディング支援AI`、`Codex`、`Claude Code`、`IDE` を日常語で説明する。

- [x] **Step 3: `tools.mdx` を補助ツールページとして明確化する**

最初に必要なAIの詳細は `はじめの一歩` へ案内し、Typelessなどは必要に応じて追加する補助ツールだと明記する。同時に指定した口語・内部向け表現を修正する。

- [x] **Step 4: GREENを確認する**

Run: `node --test scripts/content-contract.test.mjs`

Expected: 導入・用語・表現に関する新規テストを含め、全テストが成功する。

### Task 3: トップページと関連ページの日本語を整える

**Files:**
- Modify: `astro.config.mjs`
- Modify: `src/pages/index.astro`
- Modify: `src/content/docs/what-is-vibe-coding.mdx`
- Modify: `src/content/docs/asking.mdx`
- Modify: `src/content/docs/templates.mdx`
- Modify: `src/content/docs/short-prompts.mdx`
- Modify: `src/content/docs/my-vibe-coding.mdx`
- Modify: `src/content/docs/common-mistakes.mdx`
- Modify: `src/content/docs/recover.mdx`
- Modify: `src/content/docs/folder-structure.mdx`
- Modify: `src/content/docs/publish-check.mdx`

**Interfaces:**
- Consumes: `start.mdx` の新しい導入順。
- Produces: サイト入口と関連説明が同じ開始順・読者視点で読める状態。

- [x] **Step 1: トップの開始順を合わせる**

最初の行動を「AIを1つ選ぶ」に変更し、その後に作業フォルダ、要件、確認が続くことが分かる説明へ直す。

- [x] **Step 2: 責任分担を具体語で書く**

`what-is-vibe-coding.mdx` の「気分で丸投げ」を、目的・判断・結果確認までAIへ任せない説明へ変更する。

- [x] **Step 3: 公開前提の一般見出しを直す**

`asking.mdx` と `templates.mdx` の一般的な仕上げ依頼を「仕上げる・人に渡す」「人に使ってもらう前」に変更する。

- [x] **Step 4: 高度なページの内部語りを直す**

`my-vibe-coding.mdx` の `やはりGitHub`、`プロのエンジニア`、`かなり大事` などを、用途、判断条件、確認可能な理由で説明する。

- [x] **Step 5: 関連する正確性とリスク表現を揃える**

GitHub検索は「直近1か月に作成され、現在のスター数が多い」と説明する。最初のテンプレートはREADME 1ファイルに限定する。権利とアクセシビリティを一般公開だけの条件にせず、高リスク判断では一次情報または専門家を確認する。

- [x] **Step 6: 見出しアンカーを同期する**

`my-vibe-coding.mdx` の見出し変更に合わせて、`astro.config.mjs` のサイドバーラベルとフラグメントを更新する。

- [x] **Step 7: 対象テストを再実行する**

Run: `node --test scripts/content-contract.test.mjs`

Expected: 全テストが成功する。

### Task 4: 監査結果と表示を検証する

**Files:**
- Create: `docs/content-quality-audit/2026-07-10-onboarding-and-japanese-quality-review.md`
- Verify: `src/content/docs/*.mdx`, `src/pages/index.astro`

**Interfaces:**
- Consumes: 実装差分、機械検査、ブラウザ確認結果。
- Produces: 変更理由、対応済み、継続監視項目を分けた監査記録。

- [x] **Step 1: 全体QAを実行する**

Run: `npm run qa`

Expected: build、Nodeテスト、ビルド済みサイト検査がすべて成功する。

- [x] **Step 2: 別のbase pathを検証する**

Run: `$env:BASE_PATH='/preview-base/'; npm run build; Remove-Item Env:BASE_PATH`

Expected: `/preview-base/` を使ったビルドが成功する。

- [x] **Step 3: 差分の空白・文字化けを検査する**

Run: `git diff --check`

Expected: エラーなし。

Run: `rg -n '譁|縺|繧|蜿|隕|迚' src docs/content-quality-audit`

Expected: 文字化け候補なし。

- [x] **Step 4: ブラウザで確認する**

`/start/` と `/tools/` をデスクトップ幅1280×740、モバイル幅390×844で開き、2経路のカード、公式リンク、横スクロール、見出し順、コピー欄を確認する。

- [x] **Step 5: 監査記録を書く**

監査範囲、重大所見、実施修正、公式情報の確認日、未対応または継続監視事項、QA結果を記録する。

## Self-Review

- Spec coverage: 2経路、導入完了、用語、日本語、条件付き公開、検証のすべてをTask 1〜4へ割り当てた。
- Placeholder scan: `TBD`、`TODO`、`implement later`、抽象的な「適切に処理」はない。
- Interface consistency: 新規コードAPIはなく、既存の `read(file)` と静的コンテンツ契約だけを使う。
