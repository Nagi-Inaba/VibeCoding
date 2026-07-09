# Content Review Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Vibe Coding Guide の各コンテンツを、バイブコーディング初心者が「何から読み、何をAIに頼み、どこで止まり、どう確認するか」を迷わず実行できる内容に整える。まず全ページを同じ基準でレビューし、次に修正が必要な箇所を優先度つきで整理し、最後に修正へ進む場合のバッチ単位を決める。

**Architecture:** レビューは 3 層で行う。最初にページ棚卸しと導線の事実確認を行い、次に読者体験・文章・アクセシビリティ・安全性・研究カバレッジの複数視点でページ単位に評価し、最後に修正バックログへ統合する。実装修正はレビュー結果の後で、初心者導線、プロンプト例、作業継続、リスク対策、発展ツール、ナビゲーションの順に小さく進める。

**Tech Stack:** Astro 7, Starlight 0.41, MDX, `astro.config.mjs` sidebar, `src/pages/index.astro`, `src/content/docs/*.mdx`, `src/styles/custom.css`, `public/copy-blocks.js`, `scripts/check-built-site.mjs`, PowerShell, npm scripts.

## Global Constraints

- レビュー中は本文を修正しない。レビュー成果物を作り、修正方針を合意できる状態にしてから編集へ進む。
- 初心者視点を最優先にする。上級者の作業環境、MCP、CLI、TDD、PRD、サブエージェントなどは、必要なら「慣れてから」「発展編」として扱う。
- 既存の強みである「作業場所を整える」「小さな要件メモ」「戻れる地点」「作業記録」「公開前確認」は残す。
- 既存の修正済みUI方針を壊さない。特にモバイルで常時上に張り付く表示を戻さない、`tools.mdx` を独立導線として扱う、トップページからツールへ飛べる状態を維持する。
- URL変更やページ削除は原則しない。必要な場合はリンク、サイドバー、ビルドチェック、既存アンカーへの影響をレビュー結果に明記する。
- 外部サービス、料金、無料枠、ログイン権限、データ利用、ツール機能は変わるため、本文で断定しない。必要な場合はレビュー日を記録し、公式ページで確認する。
- プロンプト例は原則 2-5 行を標準にする。長い例は「詳しく頼む版」「慣れてきたら」と明示する。
- 公開前・外部サービス・GitHub・音声入力・資料アップロードに関わる箇所では、個人情報、内部情報、秘密情報、権限の注意を近くに置く。
- レビュー結果は P0/P1/P2 で優先度を付ける。P0 は公開導線やQA証跡の不一致、P1 は初心者が実行に失敗しやすい問題、P2 は改善余地とする。
- 修正に進む場合は、各バッチ後に `npm run qa` と `git diff --check` を実行する。

## Subagent Inputs Already Incorporated

- `planner`: ページ棚卸し、研究メモとの照合、バッチ単位、`/tools/` がQA必須ルートに含まれていない可能性を指摘。
- `writing-voice-editor`: 初心者向けの芯は強いが、初学者ページと発展ページが混ざる点、短いプロンプト例を標準化する点、用語集拡張の必要性を指摘。
- `information-accessibility-reviewer`: Find / Receive / Understand / Participate / Continue の5観点、コピーUI、テーブル、モバイル、外部リンク、404、プライバシー警告をレビュー基準に入れるよう指摘。

## Review Targets

### Public Content Pages

- `src/pages/index.astro`
- `src/content/docs/what-is-vibe-coding.mdx`
- `src/content/docs/glossary.mdx`
- `src/content/docs/voice-input.mdx`
- `src/content/docs/start.mdx`
- `src/content/docs/practice.mdx`
- `src/content/docs/short-prompts.mdx`
- `src/content/docs/asking.mdx`
- `src/content/docs/templates.mdx`
- `src/content/docs/folder-structure.mdx`
- `src/content/docs/work-log.mdx`
- `src/content/docs/checklists.mdx`
- `src/content/docs/common-mistakes.mdx`
- `src/content/docs/recover.mdx`
- `src/content/docs/my-vibe-coding.mdx`
- `src/content/docs/tools.mdx`
- `src/content/docs/404.mdx`

### Supporting Files

- `astro.config.mjs`
- `scripts/check-built-site.mjs`
- `public/copy-blocks.js`
- `src/styles/custom.css`
- `research/vibe-coding-beginner-sites-2026-07-08.md`
- `research/vibe-coding-source-matrix-2026-07-08.md`

## Review Artifacts To Create

- `docs/content-review/README.md`: レビュー全体の入口、進行状況、対象範囲。
- `docs/content-review/page-inventory.md`: ページ一覧、導線、タイトル、説明、見出し、文字量、リンク、コードブロック、QAルート対応。
- `docs/content-review/rubric.md`: 評価基準、優先度定義、ページ単位スコアカード。
- `docs/content-review/journey-map.md`: 初心者の読書導線、困った時の導線、発展導線。
- `docs/content-review/page-review-table.md`: 全ページのレビュー結果。
- `docs/content-review/research-coverage-matrix.md`: 既存研究メモのテーマと現在ページの対応表。
- `docs/content-review/accessibility-review.md`: Find / Receive / Understand / Participate / Continue 観点の結果。
- `docs/content-review/rewrite-backlog.md`: 修正候補の優先度、対象ファイル、修正方向、検証方法。

## Review Perspectives

### 1. Beginner Journey

Check whether the reader can answer these questions on each page:

- 今このページで何をすればよいか。
- どの文章をAIに貼ればよいか。
- まだやらなくてよいことは何か。
- 困ったらどこで止まるか。
- 次に読むページ、戻るページ、確認するページはどこか。

Revision direction:

- 各ページの冒頭に「このページの役割」が自然に伝わるようにする。
- 各ページの末尾に「次の行動」を置く。次ページ、コピー用短文、チェックリスト、作業記録のいずれかにする。
- 発展ページは「最初の1ページを作ったあとで大丈夫」と明示する。

### 2. Voice And Tone

Check:

- 専門家の作業メモではなく、初心者に向けた案内になっているか。
- 「自分の環境では」「自分がよくやる」が多すぎないか。
- 初心者を怖がらせず、ただし公開や個人情報のリスクを軽く扱っていないか。
- 日本語が長すぎず、1文で複数の判断を求めていないか。

Revision direction:

- 個人的な作業語りは「慣れてきたら使える方法です」に変える。
- 難しい語は直後に短く説明するか、`glossary.mdx` へ移す。
- 抽象論は「使う場面」「頼み方」「確認すること」に変換する。

### 3. Prompt Example Policy

Check:

- 初心者がそのままコピーできる短い例になっているか。
- 長い例が最初に出てきて、読む前から疲れないか。
- 例文が実際の作業場面に対応しているか。
- 「検査して」「レビューして」「まだ編集しないで」など、AIに誤作動させない指示が入っているか。

Revision direction:

- すべてのプロンプト例を `最短版`, `標準版`, `詳しく頼む版` のどれかに分類する。
- 初回表示は 2-5 行の `最短版` を優先する。
- 長い例は必要な場面を説明したうえで後ろに置く。

### 4. Information Architecture

Check:

- トップページ、サイドバー、ページタイトル、description、見出しが同じ約束をしているか。
- 「はじめる」「作業する」「困ったら見る」「慣れてから広げる」のような読者ステージが見えるか。
- `my-vibe-coding.mdx` と `tools.mdx` が初心者必須に見えすぎていないか。
- 深いアンカーリンクが多すぎてサイドバーが重くなっていないか。

Revision direction:

- 最初の読書導線は短くする。
- 発展導線は見える場所に置くが、必須ルートとは分ける。
- ツールページは「ツール一覧」ではなく「何に困ったら使うか」で整理する。

### 5. Content Coverage

Compare each page against the research themes:

- 概念理解とマインドセット
- ツール選定
- 要件定義、ミニPRD、ワイヤーフレーム
- プロンプト作成
- 生成、確認、反復
- デバッグと修正依頼
- UI/UX確認
- データ、認証、バックエンド、secrets
- GitHub、履歴、ロールバック
- テストと動作確認
- セキュリティと公開前チェック
- 費用、クレジット、ツールの使い分け
- 学習ロードマップと小さな題材

Revision direction:

- 既に強い「フォルダ構成」「作業記録」「戻し方」は重複を整理して残す。
- 弱い可能性がある「費用/クレジット」「UI/UX確認」「公開レベル別の安全性」「データ/認証」は、必要なら既存ページへ短く追加する。
- 新ページ追加は最後の手段にする。まず既存ページへ自然に入るか確認する。

### 6. Information Accessibility

Use five gates:

- Find: 見つけられるか。トップ、サイドバー、検索、リンク、QAルートでたどれるか。
- Receive: 受け取れるか。モバイル、キーボード、スクリーンリーダー、テーブル、コードブロック、コピーUIで意味が失われないか。
- Understand: 理解できるか。短い文、用語説明、前提条件、日付や価格の変動、ツール権限が分かるか。
- Participate: 行動できるか。コピー用指示、AIに読ませる範囲、編集禁止指示、個人情報を出さない注意があるか。
- Continue: 続けられるか。次の行動、作業記録、戻し方、関連ページがあるか。

Revision direction:

- 長い表は「まず使う3つ」などの要約を足す。
- コピーUIはキーボード操作とステータス通知を確認する。
- ホームのプレビューが装飾なのか意味のある内容なのかを決め、アクセシビリティツリー上の扱いをそろえる。
- 404も迷子になった読者の導線として確認する。

### 7. Safety, Privacy, And External Claims

Check:

- 外部サービスへ入力する前に個人情報、内部情報、秘密情報の注意が近くにあるか。
- GitHub、CLI、ログイン、権限、公開に関わる注意が軽すぎないか。
- 価格、無料枠、利用制限、機能対応などの変動情報を断定していないか。
- 「AIに貼れば全部やってくれる」に寄りすぎず、人間の確認責任が残っているか。

Revision direction:

- 練習用、個人利用、公開用でチェックの重さを分ける。
- 外部ツール説明は「できること」より先に「使う前に確認すること」を短く置く。
- ツール固有の最新情報は公式ページ確認を促し、本文では選び方の軸を中心にする。

## Tasks

### Task 1: Pre-Flight And Current State Capture

- [ ] Run `git status --short --branch`.
- [ ] Confirm the working tree is clean or record unrelated changes before reviewing.
- [ ] Run `rg --files src/content/docs`.
- [ ] Run `rg -n "^(title:|description:|#|##|###)" src/content/docs -g "*.mdx"`.
- [ ] Run `Get-Content -Raw -Encoding UTF8 astro.config.mjs`.
- [ ] Run `Get-Content -Raw -Encoding UTF8 scripts/check-built-site.mjs`.
- [ ] Create `docs/content-review/README.md` with target scope and review status.

Expected output:

- A stable list of public content pages.
- A note that `src/content/docs/tools.mdx` exists and must be reconciled with route checking.

### Task 2: Page Inventory And Route Reconciliation

- [ ] Create `docs/content-review/page-inventory.md`.
- [ ] For each page, record: file path, route, sidebar group, title, description, primary role, line count, external links, internal links, table count, code/pre block count.
- [ ] Compare inventory with `astro.config.mjs` sidebar.
- [ ] Compare inventory with homepage links in `src/pages/index.astro`.
- [ ] Compare inventory with `requiredRoutes` in `scripts/check-built-site.mjs`.
- [ ] Flag mismatches as P0 if a public route is linked but not explicitly checked.

Required inventory columns:

| Page | Route | Sidebar group | Role | Reader state | Main promise | Evidence | QA route status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

Acceptance:

- Every target page appears exactly once.
- `/tools/` is explicitly evaluated.
- `404.mdx` is treated separately as recovery content, not normal guide content.

### Task 3: Define Rubric And Scorecard

- [ ] Create `docs/content-review/rubric.md`.
- [ ] Define P0/P1/P2 priority rules.
- [ ] Add the seven review perspectives from this plan.
- [ ] Add the five information-accessibility gates.
- [ ] Add the prompt example policy.
- [ ] Add the external-claim policy.

Required scorecard template:

| Page | Priority | Lens | Issue | Evidence | Affected reader | Fix direction | Verification |
| --- | --- | --- | --- | --- | --- | --- | --- |

Acceptance:

- A reviewer can use the rubric without reading this plan again.
- The rubric distinguishes content problems from implementation/UI problems.

### Task 4: Reader Journey Map

- [ ] Create `docs/content-review/journey-map.md`.
- [ ] Map the first-time route: top page -> concept -> voice/input or start -> practice -> asking/templates -> checklist.
- [ ] Map the recovery route: common mistake -> recover -> work-log -> checklist.
- [ ] Map the advanced route: my-vibe-coding -> tools -> relevant anchors.
- [ ] Identify where the reader is asked to jump too far.
- [ ] Decide candidate reader-stage labels for later navigation review.

Candidate reader-stage labels:

- `まず読む`
- `作業する`
- `困ったら見る`
- `慣れてから広げる`

Acceptance:

- The map shows what each stage gives the reader.
- The map identifies optional/advanced content clearly.

### Task 5: Foundation Page Review

- [ ] Review `src/pages/index.astro`.
- [ ] Review `src/content/docs/what-is-vibe-coding.mdx`.
- [ ] Review `src/content/docs/glossary.mdx`.
- [ ] Review `src/content/docs/voice-input.mdx`.
- [ ] Review `src/content/docs/start.mdx`.
- [ ] Review `src/content/docs/practice.mdx`.
- [ ] Record findings in `docs/content-review/page-review-table.md`.

Specific checks:

- Does the top page explain that the site itself can be pasted into AI as context without implying blind trust?
- Does the first action stay small?
- Are `AGENTS.md`, `CLAUDE.md`, `PRD`, `GitHub`, and similar terms explained or linked?
- Is the first copyable prompt in `start.mdx` short enough?
- Is one sample project reused or at least compatible across the pages?

Likely revision directions:

- Add or clarify a single recurring sample project.
- Make the first prompt shorter and move detailed setup to an expanded version.
- Expand glossary before adding more advanced content.
- Add a short "このURLをAIに読ませてもよいが、最後は自分で確認する" note on the top page if the review supports it.

### Task 6: Prompt And Request Page Review

- [ ] Review `src/content/docs/short-prompts.mdx`.
- [ ] Review `src/content/docs/asking.mdx`.
- [ ] Review `src/content/docs/templates.mdx`.
- [ ] Record findings in `docs/content-review/page-review-table.md`.

Specific checks:

- Are prompt examples grouped by situation, not scattered?
- Are tables readable on mobile and understandable by screen readers?
- Are examples too long for the first option?
- Does each example tell AI whether to inspect, draft, edit, or wait?

Likely revision directions:

- Add `最短版` examples where current prompts are long.
- Add "まず使う3つ" summaries before dense tables.
- Make "編集しないで確認して" and "原因だけ見て" patterns consistent.

### Task 7: Work Continuity Page Review

- [ ] Review `src/content/docs/folder-structure.mdx`.
- [ ] Review `src/content/docs/work-log.mdx`.
- [ ] Review `src/content/docs/recover.mdx`.
- [ ] Record findings in `docs/content-review/page-review-table.md`.

Specific checks:

- Is `folder-structure.mdx` the canonical place for folder explanation?
- Do other pages duplicate folder explanations unnecessarily?
- Can a non-Git beginner understand "戻れる地点" before learning commits?
- Does `work-log.mdx` give enough detail to resume a stalled project?

Likely revision directions:

- Deduplicate folder structure text into one canonical explanation.
- Name the "止まる" rule clearly, for example "3回直らなければ戻る".
- Add one non-Git rollback explanation before Git/GitHub language.

### Task 8: Risk And Public-Readiness Page Review

- [ ] Review `src/content/docs/checklists.mdx`.
- [ ] Review `src/content/docs/common-mistakes.mdx`.
- [ ] Review related glossary entries.
- [ ] Record findings in `docs/content-review/page-review-table.md`.

Specific checks:

- Are public/private/practice levels separated?
- Are security and privacy checks concrete but not overwhelming?
- Does the checklist include mobile, UI, links, copy text, data, auth, secrets, and external APIs where relevant?
- Are "AIが動かない" failures framed as conditions to inspect, not beginner blame?

Likely revision directions:

- Split checklist items into `練習用`, `自分だけで使う`, `公開する`.
- Add beginner-readable public-release minimum checks.
- Convert vague warnings into copyable review requests.

### Task 9: Advanced And Tool Page Review

- [ ] Review `src/content/docs/my-vibe-coding.mdx`.
- [ ] Review `src/content/docs/tools.mdx`.
- [ ] Record findings in `docs/content-review/page-review-table.md`.

Specific checks:

- Are advanced topics clearly optional?
- Are GitHub CLI, MCP, TDD, Product Starter, MarkItDown, Playwright, and accessibility subagents explained at the right depth?
- Does the tool page answer "when do I use this?" before "what is this?".
- Are external links current enough to recommend, or should the text use selection criteria instead?
- Is the accessibility subagent example short and aligned with the user's expected style: `アクセシビリティのサブエージェントで検査して。`

Likely revision directions:

- Convert `tools.mdx` into task-based sections: `資料を読む`, `画面を見る`, `型に乗る`, `公開前に確認する`.
- Add "ここから先は最初の1ページを作ったあとで大丈夫" near advanced sections.
- Remove or rephrase personal/internal operating-manual wording.
- Expand glossary entries for advanced terms before relying on them.

### Task 10: Research Coverage Matrix

- [ ] Create `docs/content-review/research-coverage-matrix.md`.
- [ ] Use `research/vibe-coding-beginner-sites-2026-07-08.md` as the theme source.
- [ ] Use `research/vibe-coding-source-matrix-2026-07-08.md` as source/context support.
- [ ] For each theme, record current coverage, gap, recommended page, and priority.
- [ ] Mark tool-price/current-feature claims as requiring live verification before writing final public copy.

Required matrix columns:

| Theme | Current coverage | Gap | Recommended location | Priority | Source note |
| --- | --- | --- | --- | --- | --- |

Acceptance:

- Every research theme appears once.
- The matrix does not introduce new unverified claims into site copy.

### Task 11: Accessibility And Browser Review

- [ ] Create `docs/content-review/accessibility-review.md`.
- [ ] Check homepage at desktop and mobile widths.
- [ ] Check one long table page, likely `/asking/`.
- [ ] Check one copy-heavy page, likely `/templates/` or `/start/`.
- [ ] Check `/tools/`.
- [ ] Check `404`.
- [ ] Test keyboard copy behavior on representative copy blocks.
- [ ] Confirm whether homepage preview is decorative or meaningful content.

Suggested browser widths:

- Desktop: 1280 x 740
- Tablet/narrow: 864 x 740
- Mobile: 390 x 844

Acceptance:

- Findings use Find / Receive / Understand / Participate / Continue gates.
- Mobile and keyboard findings include verification evidence.

### Task 12: Consolidate Findings Into Rewrite Backlog

- [ ] Create `docs/content-review/rewrite-backlog.md`.
- [ ] Merge duplicate findings from page review, journey map, research matrix, and accessibility review.
- [ ] Assign P0/P1/P2.
- [ ] Assign each item to one fix batch.
- [ ] For each item, record target file, fix direction, and verification command.

Required backlog columns:

| Priority | Batch | File | Issue | Fix direction | Verification | Notes |
| --- | --- | --- | --- | --- | --- | --- |

Acceptance:

- No item says only "improve wording" without a direction.
- Every P0/P1 has a concrete verification step.
- Items that require live web verification are labeled before implementation.

### Task 13: Fix Batch Design

- [ ] Create a final section in `docs/content-review/rewrite-backlog.md` named `Fix Batch Plan`.
- [ ] Batch 1: Foundation wording and top-page direction.
- [ ] Batch 2: Prompt/request examples.
- [ ] Batch 3: Work continuity and recovery.
- [ ] Batch 4: Risk, checklist, public-readiness.
- [ ] Batch 5: Advanced/tool framing.
- [ ] Batch 6: Navigation, route checker, cross-links, and QA.

Batch order:

1. Foundation wording: `src/pages/index.astro`, `what-is-vibe-coding.mdx`, `glossary.mdx`, `voice-input.mdx`, `start.mdx`, `practice.mdx`.
2. Prompt/request examples: `short-prompts.mdx`, `asking.mdx`, `templates.mdx`.
3. Work continuity: `folder-structure.mdx`, `work-log.mdx`, `recover.mdx`.
4. Risk/readiness: `checklists.mdx`, `common-mistakes.mdx`, relevant glossary entries.
5. Advanced/tools: `my-vibe-coding.mdx`, `tools.mdx`.
6. Navigation/QA: `astro.config.mjs`, `scripts/check-built-site.mjs`, cross-links, browser smoke checks.

Acceptance:

- The fix plan does not require editing all pages at once.
- Each batch can be reviewed and committed independently if the user asks.

### Task 14: Optional Implementation After Review Approval

- [ ] Do not start this task until the user explicitly says `修正へ進む`.
- [ ] Use subagent-driven development for independent batches when edits are bounded.
- [ ] Use `writing-voice-editor` for copy-heavy batches.
- [ ] Use `information-accessibility-reviewer` after accessibility-sensitive UI/content changes.
- [ ] Use `security-reviewer` if public-release, secrets, GitHub permissions, auth, data, or external APIs are materially changed.
- [ ] Use `code-reviewer` before commit if code/config files changed.
- [ ] Run `npm run qa`.
- [ ] Run `git diff --check`.
- [ ] Run targeted browser checks for changed routes.

Acceptance:

- Review artifacts explain why each edit exists.
- Build and site checks pass.
- No unrelated files are swept into the commit.

## Verification Commands

Use these commands during review and implementation:

```powershell
git status --short --branch
rg --files src/content/docs
rg -n "^(title:|description:|#|##|###)" src/content/docs -g "*.mdx"
rg -n "個人情報|内部情報|ログイン|権限|無料|料金|GitHub CLI|MCP|TDD|PRD|AGENTS|CLAUDE|トークン|アクセシビリティ" src/content/docs src/pages/index.astro
npm run qa
git diff --check
```

When checking the built route coverage:

```powershell
npm run build
node scripts/check-built-site.mjs
```

Expected current risk to verify:

- `scripts/check-built-site.mjs` currently reports 15 required routes, while `/tools/` is an intentional linked public page. The review should decide whether to add `/tools/` to `requiredRoutes`.

## Final Review Completion Criteria

- Every target page has one inventory row.
- Every target page has at least one explicit review status: `OK`, `P0`, `P1`, or `P2`.
- Every finding has evidence, affected reader, fix direction, and verification.
- Research coverage matrix covers all themes from `research/vibe-coding-beginner-sites-2026-07-08.md`.
- Accessibility review covers Find / Receive / Understand / Participate / Continue.
- Rewrite backlog is grouped by fix batch.
- No current-service claim is proposed for public copy without either live verification or wording that avoids date-sensitive claims.
- The plan clearly separates "review complete" from "implementation complete".
