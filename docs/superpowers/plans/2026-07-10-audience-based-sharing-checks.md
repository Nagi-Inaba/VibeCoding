# Audience-Based Sharing Checks Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reframe the guide from publication-first messaging to audience-based checks, while preserving detailed GitHub Pages evidence and recovery guidance only inside the example for readers who select GitHub Pages.

**Architecture:** Keep the existing `/publish-check/` route for compatibility, but change its reader-facing identity to `人に使ってもらう前に`. Remove publication from the homepage’s primary learning path, introduce four usage scopes, place platform-neutral publication checks under a conditional section, and nest GitHub Pages as one selectable example. Contract tests lock the homepage hierarchy, audience scopes, artifact types, sidebar label, platform choice, and existing GitHub evidence.

**Tech Stack:** Astro 7, Starlight 0.41, MDX, Node.js 22 `node:test`, CSS, in-app browser.

## Global Constraints

- Work in `C:\dev\projects\VibeCoding` on the current approved, uncommitted `main` workspace.
- Preserve all existing review-remediation changes and unrelated user work.
- Do not reset, clean, checkout, delete unrelated files, commit, push, deploy, publish, or add dependencies.
- Keep the route `/publish-check/`; change only reader-facing labels and content hierarchy.
- Keep the GitHub Pages commit SHA, run URL, `build`, `deploy`, public URL, Unpublish, and three official GitHub documentation links inside the GitHub Pages example.
- Do not assume this guide site's current host. Vercel, GitHub Pages, or another suitable service may be selected.
- Use `人に使ってもらう前に` as the page and sidebar label.
- Do not require public-release checks for practice or self-only artifacts.
- Treat `ウェブサイト`, `ウェブツール`, `スキル`, and `エージェント` as explicit artifact types.
- Use RED → GREEN → refactor for testable behavior and record exact results.

---

### Task 1: Remove publication from the homepage’s primary path

**Files:**
- Modify: `scripts/homepage-structure.test.mjs`
- Modify: `astro.config.mjs`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: the existing `navItems`, `link()` base-path helper, and built `dist/index.html`.
- Produces: two primary hero CTAs, one conditional `/publish-check/` link in the explanatory copy, and the sidebar label `人に使ってもらう前に`.

- [x] **Step 1: Add failing homepage hierarchy assertions**

Extend the first test in `scripts/homepage-structure.test.mjs` after reading `html`:

```js
const heroActions = html.match(/<div class="hero-actions"[\s\S]*?<\/div>/)?.[0] ?? '';
const publishHref = `${basePath}/publish-check/`;
const publishLinkCount = html.split(`href="${publishHref}"`).length - 1;

assert.doesNotMatch(heroActions, /publish-check|公開する前/);
assert.equal(publishLinkCount, 1);
assert.match(html, /他の人に使ってもらうなら/);
assert.doesNotMatch(html, /公開前に確かめる/);
```

Add a separate source contract:

```js
test('sidebar names the route for the person using the artifact', () => {
  const config = fs.readFileSync(new URL('../astro.config.mjs', import.meta.url), 'utf8');
  assert.match(config, /label:\s*['"]人に使ってもらう前に['"],\s*slug:\s*['"]publish-check['"]/);
  assert.doesNotMatch(config, /label:\s*['"]公開する前に['"],\s*slug:\s*['"]publish-check['"]/);
});
```

- [x] **Step 2: Verify RED**

Run:

```powershell
npm run build
node --test scripts/homepage-structure.test.mjs
```

Expected: FAIL because the hero still contains `/publish-check/`, the old prominent wording remains, and the sidebar still says `公開する前に`.

- [x] **Step 3: Apply the exact homepage copy hierarchy**

In `src/pages/index.astro`, make the hero actions exactly:

```astro
<div class="hero-actions" aria-label="主要な導線">
  <a href={link('start/')}>はじめの一歩から始める <span aria-hidden="true">→</span></a>
  <a href={link('practice/')}>小さな実践例を1回通す <span aria-hidden="true">→</span></a>
</div>
```

Replace the conditional paragraph ending with:

```astro
だけで十分です。用語に迷ったら <a href={link('glossary/')}>用語集</a>、他の人に使ってもらうなら <a href={link('publish-check/')}>人に使ってもらう前に</a>、大きく近道したいときだけ <a href={link('tools/')}>ツール</a> を開きます。
```

Replace the third hero point with:

```astro
<div class="point">
  <strong>実際に触って確かめる</strong>
  <span>実画面、入力、リンク、エラー状態を見てから次へ進む。</span>
</div>
```

Replace the example row and closing reason with:

```astro
<tr><td>確認する</td><td>初めて見る人に分かりにくい表現を見て</td><td>確認観点が決まり、指摘が具体的になる。</td></tr>
```

```astro
<p>方針確認、戻れる地点、実画面と作業記録でやり直しを減らす。</p>
```

In `astro.config.mjs`, use:

```js
{ label: '人に使ってもらう前に', slug: 'publish-check' },
```

- [x] **Step 4: Verify GREEN**

Run:

```powershell
npm run build
node --test scripts/homepage-structure.test.mjs
node scripts/check-built-site.mjs
```

Expected: homepage structure tests PASS and built-site validation remains `status: ok`.

- [x] **Step 5: Read-only checkpoint review**

Review only the three Task 1 files against the design. Reject any change that removes the conditional route entirely or adds a replacement third primary CTA.

---

### Task 2: Rebuild the guide around usage scope and artifact type

**Files:**
- Modify: `scripts/content-contract.test.mjs`
- Modify: `src/content/docs/publish-check.mdx`
- Modify: `src/content/docs/checklists.mdx`
- Modify: `src/content/docs/practice.mdx`
- Modify: `src/content/docs/common-mistakes.mdx`
- Modify: `src/content/docs/work-log.mdx`
- Modify: `src/content/docs/tools.mdx`
- Modify: `src/content/docs/what-is-vibe-coding.mdx`

**Interfaces:**
- Consumes: the stable `/publish-check/` route, current GitHub Pages evidence sections, and official GitHub URLs.
- Produces: four usage scopes, four artifact-specific checks, a common other-user checklist, a platform-neutral public-release section, and a GitHub Pages example.

- [x] **Step 1: Add failing content contracts**

Add this test to `scripts/content-contract.test.mjs`:

```js
test('sharing guidance is audience-based and keeps publication as a conditional path', () => {
  const publish = read('src/content/docs/publish-check.mdx');
  const checklist = read('src/content/docs/checklists.mdx');

  assert.match(publish, /^title:\s*人に使ってもらう前に$/m);
  assert.match(publish, /自分だけで使うものに、公開操作や公開URLの確認は不要/);

  for (const phrase of [
    '練習', '自分だけで使う', '他の人に使ってもらう', '一般公開',
    'ウェブサイト', 'ウェブツール', 'スキル', 'エージェント',
    '秘密情報と設定', '必要な権限', '入力と実行範囲', '戻し方と停止方法',
    '一般公開する場合', '例: GitHub Pagesの場合',
  ]) {
    assert.match(publish, new RegExp(phrase));
  }

  for (const phrase of ['練習', '自分だけで使う', '他の人に使ってもらう', '一般公開する']) {
    assert.match(checklist, new RegExp(phrase));
  }

  assert.doesNotMatch(checklist, /<h3>公開前<\/h3>/);
  assert.match(checklist, /<h3>人に使ってもらう前<\/h3>/);
  assert.match(checklist, /<h3>一般公開する場合<\/h3>/);
});
```

Strengthen the deployment-evidence test so it extracts `### 例: GitHub Pagesの場合` only until the next level-3-or-higher heading (or EOF). Require the three child sections at `####`, preserve the evidence fields and official URLs, require `GitHub Pagesは一般公開方法の一例` and `GitHub Pagesを選んだ場合`, and prohibit current-host wording.

Add contracts that require:

- `Vercel`, GitHub Pages, and another hosting service as selectable website/web-tool destinations before the example.
- A suitable distribution destination/method for skills and agents.
- Platform-neutral public concepts in both usage-scope tables and the main AI prompt, without the generic summary `公開URL、公開停止`.
- Optional-media, packaged-file, and generated-behavior checks.
- Design and plan wording that keeps GitHub Actions run, run URL, deploy job, and Unpublish inside the example; allows generic build/public URL only when applicable; and uses `####` for nested GitHub subsections.

- [x] **Step 2: Verify RED**

Run:

```powershell
node --test scripts/content-contract.test.mjs
```

Expected: the final repair contracts FAIL before implementation on host choice, platform-neutral summaries, common content checks, bounded GitHub example wording, and design/plan synchronization while unrelated earlier contracts remain green.

- [x] **Step 3: Rewrite the page opening and scope table**

Start `src/content/docs/publish-check.mdx` with:

```mdx
---
title: 人に使ってもらう前に
description: 自分用、限定共有、一般公開で確認量を分け、他の人へ渡す前に必要な確認を選べるようにする。
---

<p className="lead">Vibe Codingで作ったものは、必ず公開する必要はありません。自分だけで使うものに、公開操作や公開URLの確認は不要です。ただし、後で他の人に使ってもらう可能性があるなら、秘密情報、権限、入力範囲、戻し方を最初から分けておくと広げやすくなります。</p>

## まず、誰が使うかを決める

<table className="prompt-matrix">
  <thead>
    <tr><th>利用範囲</th><th>主に確認すること</th><th>目安</th></tr>
  </thead>
  <tbody>
    <tr><td>練習（継続利用しない）</td><td>目的どおり小さく動くか、要件外の機能が増えていないか</td><td>手元やプレビューだけで試す。</td></tr>
    <tr><td>自分だけで使う（継続利用する）</td><td>秘密情報を外部へ送らないか、壊れたとき戻れるか、記録から再開できるか</td><td>あとで再開できる状態にする。公開手順や公開URLの確認は不要。</td></tr>
    <tr><td>他の人に使ってもらう（特定の人）</td><td>説明、権限、入力、データ、エラー、外部操作、停止方法</td><td>相手が使い方と、問題が起きたときに止める方法を確認できる状態にする。</td></tr>
    <tr><td>一般公開する</td><td>公開先・配布先、公開対象を特定する情報、その成果物で定めたQA（品質確認）、権利、停止・撤回</td><td>知らない人が使っても問題が起きにくい状態にする。</td></tr>
  </tbody>
</table>
```

- [x] **Step 4: Add common boundaries and artifact-specific checks**

Add these exact headings and labels before any GitHub Pages material:

```mdx
## 最初から分けておくもの

<div className="check-grid">
  <div className="check-card"><h3>秘密情報と設定</h3><p>APIキー、トークン、個人情報、内部資料を成果物へ直接書かず、必要な設定と分けます。</p></div>
  <div className="check-card"><h3>必要な権限</h3><p>読む場所、書く場所、実行できる操作を必要な範囲だけにします。</p></div>
  <div className="check-card"><h3>入力と実行範囲</h3><p>何を受け取り、何を変更し、どこへ送る可能性があるかを決めます。</p></div>
  <div className="check-card"><h3>データと記録</h3><p>保存する内容、ログに残る内容、削除や再開に必要な記録を確認します。</p></div>
  <div className="check-card"><h3>エラー表示とログ</h3><p>失敗理由は分かるようにし、秘密情報や内部パスは表示しません。</p></div>
  <div className="check-card"><h3>戻し方と停止方法</h3><p>問題が起きたときに止める操作と、直前の状態へ戻す候補を用意します。</p></div>
</div>

## 作ったものに合わせて追加する

<table className="prompt-matrix">
  <thead><tr><th>成果物</th><th>追加して見るもの</th></tr></thead>
  <tbody>
    <tr><td>ウェブサイト</td><td>リンク、スマホ表示、画像や引用の権利、404、アクセシビリティ</td></tr>
    <tr><td>ウェブツール</td><td>ログイン、権限、入力値、データ分離、API、削除、バックアップ</td></tr>
    <tr><td>スキル</td><td>読み書きするファイル、実行コマンド、外部送信、必要な前提、失敗時の扱い</td></tr>
    <tr><td>エージェント</td><td>自動実行の範囲、外部サービス、確認が必要な操作、秘密情報、停止条件、ログ</td></tr>
  </tbody>
</table>

## 他の人に使ってもらうなら
```

Under `## 他の人に使ってもらうなら`, preserve and generalize the current security table. Use reader-facing `使ってもらう`; remove `使わせる`.

- [x] **Step 5: Make general publication platform-neutral and keep GitHub Pages as an example**

Create a platform-neutral public-release section before any GitHub-specific material:

```mdx
## 一般公開する場合

一般公開では、公開方法にかかわらず、公開先または配布先、版・commit、プロジェクトで定めたQA、公開後の実利用、停止・撤回方法を確認します。
```

Include this platform-neutral checklist:

```mdx
- 誰がアクセスまたは入手できる公開先・配布先か
- 公開対象を特定する情報のうち、版番号、commit（変更を記録した番号）、release（公開・配布する版）など該当するものを記録できるか
- その成果物で定めたテスト、QA（品質確認）、build（公開用ファイルの生成）、検証が成功したか
- 公開後のURL、インストール方法、配布物のうち、該当するものを実際に利用できるか
- 権利、個人情報、秘密情報、アクセシビリティ、説明が公開範囲に合っているか
- 公開停止、配布停止、無効化、前版への復帰ができるか
```

ウェブサイトやウェブツールの公開先はGitHub Pagesに限らない。Vercel、GitHub Pages、または別のホスティングサービスから成果物と想定する利用者に合うものを選ぶ。スキルやエージェントは適切な配布先・配布方法を選ぶ。

Then add:

```mdx
### 例: GitHub Pagesの場合

GitHub Pagesは一般公開方法の一例です。公開先としてGitHub Pagesを選んだ場合の、版・QA・公開先・公開停止の確認例を示します。
```

Under the example, keep these subsections and all their current evidence fields:

```text
#### 初回だけ: 公開元を設定する
#### 毎回: 8ステップで公開を確認する
#### 問題が出たら公開を止める
```

The example must still contain the exact phrases `commit SHA`, `run URL`, `build`, `deploy`, `公開URL`, and `Unpublish`, plus the existing three official GitHub URLs. These terms must not be presented as requirements for every public artifact. GitHub Actionsのrun、run URL、deploy job、UnpublishはGitHub Pages例にだけ置く。一般的なbuildと公開URLは、該当する成果物や公開方法の場合だけ共通確認に置ける。

`build` と `deploy` はjob名の例であり、実際のjob名はworkflowごとに異なる。`jobs.<job_id>` の定義と処理内容から役割を特定し、公式仕様は [Workflow syntax for GitHub Actions](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_id) で確認する。ステップ3、6、7では、`build`、`deploy` という固定名ではなく、ビルド役と公開反映役のjobを特定して依存関係と成功を確認する。

- [x] **Step 6: Rewrite the AI prompt for usage scope**

Use this lead and opening prompt:

```mdx
## AIへの頼み方

最初に、利用範囲と作ったものの種類を伝えます。確認が終わるまで、修正、外部送信、公開操作を始めさせません。

<div className="copy-block">
<pre>{`人に使ってもらう前の確認をしてください。
まだ修正、外部送信、公開操作はしないでください。

- 利用範囲: 自分だけ / 特定の人 / 一般公開
- 作ったもの: ウェブサイト / ウェブツール / スキル / エージェント

確認してほしいこと:
- 秘密情報や内部情報が混ざっていないか
- 必要以上に広い権限や外部操作がないか
- 入力、保存、エラー、ログの扱いに危ない点がないか
- 初めて使う人に必要な説明があるか
- 問題があったときに止める方法と戻す候補があるか
- 権利とアクセシビリティを、作ったものと想定する利用者に応じて確認したか

作ったものに合う確認:
- ウェブサイト: リンク、スマホ表示、画面表示
- ウェブツール: 画面、入力、権限、データ
- スキル: 読み書きするファイル、実行コマンド
- エージェント: 自動実行、外部操作、停止条件

- 一般公開する場合だけ、公開先・配布先、公開する版、停止・撤回方法を確認したか

問題がある場所、理由、直し方を分けてください。`}</pre>
</div>
```

- [x] **Step 7: Split the checklist by usage scope**

In `src/content/docs/checklists.mdx`, use this frontmatter and four-level table:

```mdx
---
title: チェックリスト
description: 作業前、作業中、人に使ってもらう前に見る確認項目。
---
```

```mdx
<tbody>
  <tr><td>練習（継続利用しない）</td><td>目的、今回やること、動くかどうか</td><td>まず小さく動かす。</td></tr>
  <tr><td>自分だけで使う（継続利用する）</td><td>戻し方、作業記録、秘密情報の外部送信</td><td>あとで再開できる状態にする。</td></tr>
  <tr><td>他の人に使ってもらう（特定の人）</td><td>説明、権限、入力、データ、エラー、停止方法</td><td>相手が使い方と、問題が起きたときに止める方法を確認できる状態にする。</td></tr>
  <tr><td>一般公開する</td><td>公開先・配布先、公開対象を特定する情報、その成果物で定めたQA（品質確認）、権利、停止・撤回</td><td>詳細は <a href="../publish-check/">人に使ってもらう前に</a> で確認する。</td></tr>
</tbody>
```

Rename the current `公開前` card to `人に使ってもらう前` and keep common content, security, permissions, input, external-operation, display/execution-result, and recovery checks there. Add a platform-neutral `一般公開する場合` card:

```mdx
<div className="check-card">
  <h3>一般公開する場合</h3>
  <ul>
    <li>公開先または配布先と、アクセスできる人を確認したか</li>
    <li>公開対象を特定する情報のうち、版番号、commit（変更を記録した番号）、release（公開・配布する版）など該当するものを記録したか</li>
    <li>その成果物で定めたテスト、QA（品質確認）、build（公開用ファイルの生成）、検証が成功したか</li>
    <li>公開後のURL、インストール方法、配布物のうち、該当するものを実際に利用したか</li>
    <li>権利、個人情報、秘密情報、アクセシビリティを確認したか</li>
    <li>公開停止、配布停止、無効化、前版への復帰方法を確認したか</li>
  </ul>
</div>
```

`src/content/docs/checklists.mdx` の主プロンプトにも、専用ページと同じ4成果物それぞれに合う確認項目を入れる。権利とアクセシビリティは、成果物と想定する利用者に応じて確認し、一般公開の場合だけの条件は公開先・配布先・公開する版・停止・撤回方法に限定する。

- [x] **Step 8: Apply exact related-page wording replacements**

Make these replacements without changing unrelated paragraphs:

| File | Old | New |
| --- | --- | --- |
| `practice.mdx` | `公開する場合は、先に [公開する前に]` | `他の人に使ってもらう場合は、先に [人に使ってもらう前に]` |
| `common-mistakes.mdx` | `公開前チェックの観点` | `利用範囲に応じた確認の観点` |
| `work-log.mdx` | `公開前に確認すること:` | `人に渡す前に確認すること:` |
| `what-is-vibe-coding.mdx` | `公開してよいかの最終判断` | `他の人に渡してよいかの最終判断` |
| `tools.mdx` | `公開前レビュー` | `人に使ってもらう前のレビュー` |
| `tools.mdx` | `公開前の抜け` | `共有前の抜け` |
| `tools.mdx` | `公開前チェックの抜け` | `人に使ってもらう前の確認漏れ` |

Keep legitimate `公開URL`, `公開リポジトリ`, and GitHub Pages terminology unchanged.

- [x] **Step 9: Verify GREEN**

Run:

```powershell
node --test scripts/content-contract.test.mjs
npm run qa
git diff --check
```

Expected: all tests PASS, built-site report has zero errors, and no whitespace errors are reported.

- [x] **Step 10: Outward-language checkpoint**

Read the modified pages as a beginner who may never publish. Confirm:

- The opening does not assume deployment.
- `使わせる` is absent from the modified user-facing copy.
- GitHub Pages detail appears only after the platform-neutral conditional heading and is labeled as an example for cases where GitHub Pages is selected.
- Internal terms such as `publish-check`, local paths, test names, and review history are not shown to readers.

---

### Task 3: Integration verification and independent review

**Files:**
- Modify only if a verified integration defect requires a focused repair.

**Interfaces:**
- Consumes: completed Task 1 and Task 2 working-tree changes.
- Produces: deterministic QA evidence, responsive-browser evidence, and a clean independent review.

- [x] **Step 1: Run the complete deterministic stack**

```powershell
npm run qa
git diff --check
npm audit --audit-level=high --json
git status --short --branch
```

Expected: QA exit 0, zero test failures, zero built-site errors, zero high/critical vulnerabilities, and only scoped files changed.

- [x] **Step 2: Verify an alternate base and restore the default build**

```powershell
$env:BASE_PATH='/PreviewBase'
npm run qa
Remove-Item Env:BASE_PATH
npm run build
```

Expected: alternate-base QA exit 0, `/PreviewBase/publish-check/` remains valid, and the final `dist` returns to `/VibeCoding`.

- [x] **Step 3: Verify visible hierarchy and responsive behavior**

At 1440×1000:

- Hero has two primary CTAs and no publication CTA.
- The conditional `人に使ってもらう前に` link exists lower in the copy.
- Sidebar label and page title use `人に使ってもらう前に`.

At 375×844 and 320×700:

- Closed homepage header is at most 96px.
- Enter and Space open and close the 10-link mobile menu.
- Homepage, checklist, and sharing guide have no horizontal overflow.
- Usage-scope and artifact-type tables remain readable through responsive table behavior.

- [x] **Step 4: Dispatch a fresh read-only reviewer**

The reviewer must compare the design, this plan, source diff, tests, and browser evidence. It must return separate spec-compliance and code-quality verdicts with Critical, Important, and Minor findings.

- [x] **Step 5: Repair findings and re-review**

Fix all Critical and Important findings. Fix small Minor contract gaps when they directly prevent the design from being regression-tested. Re-run the smallest affected test, then the full QA stack, and obtain a clean re-review.

- [x] **Step 6: Final handoff without commit or push**

Report changed files, exact test/build/browser counts, independent-review verdict, remaining judgement calls, and that commit/push/deploy were not performed.
