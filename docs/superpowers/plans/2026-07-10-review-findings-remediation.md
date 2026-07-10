# Review Findings Remediation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix every validated review finding and prevent recurrence through build-time validation, CI gating, a compact accessible mobile header, a genuinely completable beginner exercise, and source-backed publishing guidance.

**Architecture:** Three sequential write lanes own non-overlapping files: QA/CI, homepage UI, and documentation content. The QA lane exposes pure validation functions and Node test fixtures; later lanes add their own contract tests before changing production files. The main session integrates all lanes and performs browser verification plus independent read-only review.

**Tech Stack:** Astro 7, Starlight 0.41, MDX, Node.js 22 `node:test`, GitHub Actions, CSS, in-app browser.

## Global Constraints

- Work in `C:\dev\projects\VibeCoding` on the current user-approved `main` workspace.
- Do not commit, push, deploy, publish, delete unrelated files, or reset user changes.
- Do not add dependencies.
- Use `BASE_PATH` dynamically; do not hard-code `/VibeCoding` in the 404 implementation.
- Keep the hero CTA and Starlight sidebar route for `publish-check`; remove only the misleading header/GitHub affordances.
- The closed mobile homepage header at 375×844 must be at most 96px high.
- The mobile menu must expose all 10 navigation links and remain keyboard operable.
- The practice exercise must create `outputs/reading-note.html` and require real 375×844 browser verification before completion.
- GitHub workflow instructions must link to official GitHub documentation and distinguish unpublishing from deletion.
- New executable behavior follows RED → GREEN → refactor. Record the failing and passing command output in the task report.

---

### Task 1: Make built-site validation and Pages deployment fail closed

**Files:**
- Create: `scripts/check-built-site.test.mjs`
- Modify: `scripts/check-built-site.mjs`
- Modify: `package.json`
- Modify: `.github/workflows/deploy.yml`

**Interfaces:**
- Consumes: generated HTML under `dist`, `BASE_PATH`, and existing `requiredRoutes`.
- Produces: exported `inspectBuiltSite(options)` returning a JSON-serializable report with `errors`; exported `assertBuiltSite(report)` throwing when `errors.length > 0`; CLI JSON with route, HTML, local-reference, and fragment counts.

- [x] **Step 1: Write failing validator tests**

Create `scripts/check-built-site.test.mjs` with Node test fixtures. The tests must use real temporary HTML files and assert these exact behaviors:

```js
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { inspectBuiltSite } from './check-built-site.mjs';

function fixture(files) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'vibecoding-site-'));
  const dist = path.join(root, 'dist');
  fs.mkdirSync(dist, { recursive: true });
  for (const [relativePath, contents] of Object.entries(files)) {
    const filePath = path.join(dist, relativePath);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, contents, 'utf8');
  }
  return { root, dist };
}

test('rejects a same-origin reference that escapes BASE_PATH', () => {
  const { root, dist } = fixture({
    '404.html': '<a href="/start/">戻る</a>',
  });
  const report = inspectBuiltSite({ root, dist, basePath: '/VibeCoding', requiredRoutes: [] });
  assert.equal(report.errors.some((error) => error.type === 'escaped-base'), true);
});

test('accepts a valid unicode fragment inside BASE_PATH', () => {
  const { root, dist } = fixture({
    'index.html': '<a href="/VibeCoding/start/#確認">確認</a>',
    'start/index.html': '<h2 id="確認">確認</h2>',
    '404.html': '<p>ページがありません</p>',
  });
  const report = inspectBuiltSite({ root, dist, basePath: '/VibeCoding', requiredRoutes: [] });
  assert.deepEqual(report.errors, []);
  assert.equal(report.checkedFragments, 1);
});

test('rejects a missing fragment', () => {
  const { root, dist } = fixture({
    'index.html': '<a href="/VibeCoding/start/#missing">確認</a>',
    'start/index.html': '<h2 id="確認">確認</h2>',
    '404.html': '<p>ページがありません</p>',
  });
  const report = inspectBuiltSite({ root, dist, basePath: '/VibeCoding', requiredRoutes: [] });
  assert.equal(report.errors.some((error) => error.type === 'missing-fragment'), true);
});

test('rejects a link to a missing local route', () => {
  const { root, dist } = fixture({
    'index.html': '<a href="/VibeCoding/missing-route/">存在しないページ</a>',
    '404.html': '<p>ページがありません</p>',
  });
  const report = inspectBuiltSite({ root, dist, basePath: '/VibeCoding', requiredRoutes: [] });
  assert.equal(report.errors.some((error) => error.type === 'missing-target'), true);
});

test('rejects a reference to a missing local asset', () => {
  const { root, dist } = fixture({
    'index.html': '<img src="/VibeCoding/assets/missing.png" alt="" />',
    '404.html': '<p>ページがありません</p>',
  });
  const report = inspectBuiltSite({ root, dist, basePath: '/VibeCoding', requiredRoutes: [] });
  assert.equal(report.errors.some((error) => error.type === 'missing-target'), true);
});

test('rejects the Starlight draft warning in 404', () => {
  const { root, dist } = fixture({
    '404.html': '<p>このコンテンツは下書きです。プロダクションビルドには含まれません。</p>',
  });
  const report = inspectBuiltSite({ root, dist, basePath: '/VibeCoding', requiredRoutes: [] });
  assert.equal(report.errors.some((error) => error.type === 'draft-warning'), true);
});

test('requires dist/404.html even when route fixtures are otherwise valid', () => {
  const { root, dist } = fixture({
    'index.html': '<p>トップ</p>',
  });
  const report = inspectBuiltSite({ root, dist, basePath: '/VibeCoding', requiredRoutes: [] });
  assert.equal(
    report.errors.some((error) => error.type === 'missing-target' && error.ref === '/404.html'),
    true,
  );
});
```

- [x] **Step 2: Verify RED**

Run:

```powershell
node --test scripts/check-built-site.test.mjs
```

Expected: FAIL because `inspectBuiltSite` is not exported.

- [x] **Step 3: Implement pure inspection and CLI gating**

Refactor `scripts/check-built-site.mjs` so it exports:

```js
export function inspectBuiltSite({
  root,
  dist,
  basePath,
  requiredRoutes = REQUIRED_ROUTES,
  siteOrigin = 'https://example.test',
}) { /* return report; never call process.exit */ }

export function assertBuiltSite(report) {
  if (report.errors.length > 0) {
    throw new Error(JSON.stringify(report, null, 2));
  }
}
```

The report must contain:

```js
{
  checkedRoutes,
  checkedHtmlFiles,
  checkedLocalReferences,
  checkedFragments,
  errors,
  status: errors.length === 0 ? 'ok' : 'error',
}
```

Each error must contain `type`, `page`, `ref`, and the applicable `expected` or `fragment`. Supported error types are `escaped-base`, `missing-target`, `missing-fragment`, and `draft-warning`.

The direct CLI path must call `inspectBuiltSite`, call `assertBuiltSite`, print the report as JSON, and set exit code 1 on failure. Importing the module from a test must not execute the CLI path.

`dist/404.html` is a required file independently of `requiredRoutes`. Missing it must add a `missing-target` error with `page: '[required-files]'` and `ref: '/404.html'`. Test fixtures must remove their temporary root directory after each test.

- [x] **Step 4: Verify GREEN and regression output**

Run:

```powershell
node --test scripts/check-built-site.test.mjs
npm run build
node scripts/check-built-site.mjs
```

Expected: validator tests PASS; the real-site check FAILS on the current 404 root-relative links or draft warning, proving the production defect is detected.

- [x] **Step 5: Wire tests and QA into package scripts and Pages CI**

Set these exact scripts in `package.json`:

```json
"test": "node --test scripts/*.test.mjs",
"qa": "npm run build && npm test && npm run qa:site",
"qa:site": "node scripts/check-built-site.mjs"
```

Replace the workflow build step with:

```yaml
- name: Build and validate
  run: npm run qa
```

Keep artifact upload after this step.

- [x] **Step 6: Record checkpoint without committing**

Run `git diff --check` and write the RED/GREEN commands, results, changed files, and concerns to the assigned task report.

---

### Task 2: Replace misleading header actions with an accessible mobile menu

**Files:**
- Create: `scripts/homepage-structure.test.mjs`
- Modify: `astro.config.mjs`
- Modify: `src/pages/index.astro`
- Modify: `src/styles/custom.css`

**Interfaces:**
- Consumes: Astro `BASE_URL` helper and the existing 10 homepage navigation entries.
- Produces: one `navItems` array rendered into desktop navigation and a mobile `<details class="landing-menu">`; no GitHub-icon internal guide link.

- [x] **Step 1: Write the failing built-HTML contract test**

Create `scripts/homepage-structure.test.mjs`:

```js
import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

test('homepage header uses a mobile menu without the publish-check GitHub affordance', () => {
  const html = fs.readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
  const header = html.match(/<header class="landing-topbar">[\s\S]*?<\/header>/)?.[0] ?? '';
  const menu = header.match(/<details class="landing-menu">[\s\S]*?<\/details>/)?.[0] ?? '';
  const basePath = `/${String(process.env.BASE_PATH ?? '/VibeCoding').replace(/^\/+|\/+$/g, '')}`;

  assert.doesNotMatch(header, /公開前チェックを開く|github-button/);
  assert.match(menu, /<summary>メニュー<\/summary>/);

  for (const route of [
    'start/', 'what-is-vibe-coding/', 'short-prompts/', 'asking/',
    'folder-structure/', 'recover/', 'work-log/', 'common-mistakes/',
    'my-vibe-coding/', 'tools/',
  ]) {
    assert.equal(menu.includes(`${basePath}/${route}`), true);
  }
});
```

- [x] **Step 2: Verify RED**

Run:

```powershell
npm run build
node --test scripts/homepage-structure.test.mjs
```

Expected: FAIL because the header still contains `github-button` and no `landing-menu`.

- [x] **Step 3: Implement shared nav data and responsive markup**

Add this array to `src/pages/index.astro` frontmatter and render it in both nav surfaces:

```js
const navItems = [
  ['start/', 'はじめの一歩'],
  ['what-is-vibe-coding/', '考え方'],
  ['short-prompts/', '短い指示'],
  ['asking/', '場面別の頼み方'],
  ['folder-structure/', 'フォルダ構成'],
  ['recover/', '戻し方'],
  ['work-log/', '作業記録'],
  ['common-mistakes/', 'よくある失敗'],
  ['my-vibe-coding/', '近道'],
  ['tools/', 'ツール'],
];
```

Required markup:

```astro
<nav class="landing-nav landing-nav--desktop" aria-label="主要ナビゲーション">
  {navItems.map(([href, label]) => <a href={link(href)}>{label}</a>)}
</nav>
<details class="landing-menu">
  <summary>メニュー</summary>
  <nav class="landing-nav landing-nav--mobile" aria-label="モバイル主要ナビゲーション">
    {navItems.map(([href, label]) => <a href={link(href)}>{label}</a>)}
  </nav>
</details>
```

Remove the homepage `github-button` anchor and the Starlight `social` entry from `astro.config.mjs`.

- [x] **Step 4: Implement mobile CSS**

Desktop requirements:

```css
.landing-menu { display: none; }
```

At `max-width: 760px`, keep the brand and closed summary in the first row, hide `.landing-nav--desktop`, display `.landing-menu`, and show `.landing-nav--mobile` only when the details element is open. The summary must have `min-height: 44px`, visible border, and `:focus-visible` outline. The open menu must use the document flow, not absolute positioning. Remove `.github-button` rules and the old always-expanded mobile-nav rules.

Reset the desktop content-box `min-height` inside the mobile breakpoint so the closed 375×844 header remains at most 96px high.
Add an explicit `keydown` handler for Enter and Space on the summary, preventing the default action before toggling the parent details state, so keyboard behavior is consistent across browsers.

- [x] **Step 5: Verify GREEN**

Run:

```powershell
npm run build
node --test scripts/homepage-structure.test.mjs
node scripts/check-built-site.mjs
git diff --check
```

Expected: build, homepage contract test, and diff check PASS. The built-site validator still exits 1 only for the three already-recorded 404 errors (`draft-warning` and two `escaped-base` errors); it must report no new homepage errors. Task 3 removes those remaining 404 errors.

- [x] **Step 6: Record checkpoint without committing**

Write the command results, changed files, and any CSS concerns to the assigned task report.

---

### Task 3: Complete the 404, beginner exercise, and publishing workflow content

**Files:**
- Create: `scripts/content-contract.test.mjs`
- Create: `src/pages/404.astro`
- Delete: `src/content/docs/404.mdx`
- Modify: `astro.config.mjs`
- Modify: `src/content/docs/practice.mdx`
- Modify: `src/content/docs/publish-check.mdx`
- Modify: `src/content/docs/checklists.mdx`

**Interfaces:**
- Consumes: `import.meta.env.BASE_URL`, Starlight `LinkButton`, official GitHub documentation URLs, and the QA command from Task 1.
- Produces: base-safe 404 actions, an eight-step static-HTML exercise, and evidence-based publish/unpublish instructions.

- [x] **Step 1: Write the failing content contract test**

Create `scripts/content-contract.test.mjs`:

```js
import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const read = (file) => fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');

test('404 uses a conflict-free custom route and stays base-aware', () => {
  const config = read('astro.config.mjs');
  const source = read('src/pages/404.astro');
  const legacyContentRoute = new URL('../src/content/docs/404.mdx', import.meta.url);
  assert.equal(fs.existsSync(legacyContentRoute), false);
  assert.match(config, /disable404Route:\s*true/);
  assert.match(source, /StarlightPage/);
  assert.match(source, /LinkButton/);
  assert.match(source, /import\.meta\.env\.BASE_URL/);
});

test('practice completes a real mobile HTML verification cycle', () => {
  const source = read('src/content/docs/practice.mdx');
  assert.doesNotMatch(source, /outputs\/reading-note\.md|スマホ表示の確認\s*\n- /);
  for (const phrase of ['outputs/reading-note.html', '375×844', '横スクロール', 'ブラウザで実際に']) {
    assert.match(source, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('publish checklist records deployment evidence and official recovery guidance', () => {
  const publish = read('src/content/docs/publish-check.mdx');
  const checklist = read('src/content/docs/checklists.mdx');
  for (const phrase of ['commit SHA', 'build', 'deploy', 'run URL', '公開URL', 'Unpublish']) {
    assert.match(publish, new RegExp(phrase));
  }
  assert.match(publish, /docs\.github\.com\/en\/pages\/getting-started-with-github-pages\/configuring-a-publishing-source/);
  assert.match(publish, /docs\.github\.com\/en\/actions\/monitoring-and-troubleshooting-workflows\/monitoring-workflows\/viewing-workflow-run-history/);
  assert.match(publish, /docs\.github\.com\/en\/pages\/getting-started-with-github-pages\/unpublishing-a-github-pages-site/);
  for (const phrase of ['対象commit', 'build', 'deploy', '公開URL']) {
    assert.match(checklist, new RegExp(phrase));
  }
});
```

- [x] **Step 2: Verify RED**

Run:

```powershell
node --test scripts/content-contract.test.mjs
```

Expected: FAIL on the current draft 404, Markdown exercise, and missing deployment evidence.

- [x] **Step 3: Implement the base-aware 404**

Implement `src/pages/404.astro` with `StarlightPage`, `LinkButton`, and the same dynamic `import.meta.env.BASE_URL` behavior. Set `disable404Route: true` in the Starlight config and remove the conflicting docs-collection `404.mdx`, so Astro emits one clean `/404.html` route without a route-priority warning.

Core link behavior:

```astro
const basePath = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

<StarlightPage frontmatter={frontmatter} hasSidebar={false}>
<div class="sl-flex actions">
  <LinkButton href={`${basePath}start/`} icon="right-arrow">はじめの一歩へ戻る</LinkButton>
  <LinkButton href={basePath}>トップへ戻る</LinkButton>
</div>
</StarlightPage>
```

Do not hard-code the base.

- [x] **Step 4: Rewrite the practice completion path**

Change all output references to `outputs/reading-note.html`. The completion criteria and prompts must require:

```text
- ブラウザで実際に開ける
- 375×844で横スクロールがない
- タイトル、読んだ日、印象に残った一文、次に読む本を読める
- ログイン、保存、検索、公開設定を追加していない
```

Add distinct desktop and mobile verification steps. The work-log example must record file, viewport, horizontal-overflow result, visible content, unresolved items, and next fix. Do not call the cycle complete while mobile verification is unresolved.

- [x] **Step 5: Add official publish and recovery evidence**

Add a first-time setup section, an eight-step per-release section, and an unpublish section to `publish-check.mdx`. Include these exact official links:

```text
https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows/monitoring-workflows/viewing-workflow-run-history
https://docs.github.com/en/pages/getting-started-with-github-pages/unpublishing-a-github-pages-site
```

The release record must include `commit SHA`, `run URL`, `公開URL`, and confirmation time. Require both `build` and `deploy` success and matching branch/commit. Explain that Unpublish removes the current deployment but does not delete the repository or files. Add the condensed Actions/commit/public-URL check to `checklists.mdx`.

- [x] **Step 6: Verify GREEN**

Run:

```powershell
npm run qa
git diff --check
$env:BASE_PATH='/PreviewBase'; npm run qa; Remove-Item Env:BASE_PATH
```

Expected: all tests and both base builds PASS. `dist/404.html` contains neither the draft warning nor root-absolute `/start/` and `/` actions.

- [x] **Step 7: Record checkpoint without committing**

Write the RED/GREEN commands, changed files, generated route counts, and concerns to the assigned task report.

---

### Task 4: Integration verification and independent review

**Files:**
- Modify only if a verified integration defect requires a focused fix.

**Interfaces:**
- Consumes: all task reports and the integrated working-tree diff.
- Produces: final QA evidence, accepted desktop/mobile screenshots, and a read-only whole-change review.

- [x] **Step 1: Run the complete deterministic verification stack**

```powershell
npm run qa
git diff --check
npm audit --audit-level=high --json
git status --short --branch
```

Expected: QA PASS; diff check PASS; high/critical vulnerabilities 0; only scoped files changed.

- [x] **Step 2: Verify alternate base**

```powershell
$env:BASE_PATH='/PreviewBase'
npm run qa
Remove-Item Env:BASE_PATH
```

Expected: PASS and generated 404 links under `/PreviewBase/`.

- [x] **Step 3: Verify the user-visible flows in the in-app browser**

At 1440×1000:

- Homepage header has no GitHub-icon `公開する前に` action.
- Hero `公開する前に見る` remains.
- 404 recovery links navigate under the configured base.

At 375×844 and 320×700:

- Closed header height is at most 96px.
- Details menu opens and exposes all 10 links.
- Tab, Enter, and Space operate the menu.
- No horizontal overflow exists on homepage, practice, publish-check, or 404.

- [x] **Step 4: Dispatch a fresh read-only reviewer**

The reviewer receives the spec, this task plan, task reports, and a full working-tree diff package. It must return separate verdicts for spec compliance and code quality, ordered by severity with file/line evidence.

- [x] **Step 5: Fix and re-review any Critical or Important findings**

Use one focused fix agent for the complete findings list. Re-run the tests covering each fix, append evidence to the task report, and obtain a clean re-review.

- [x] **Step 6: Final handoff without commit or push**

Report changed files, exact test counts/results, screenshots, residual risk, and that commit/push were not performed.
