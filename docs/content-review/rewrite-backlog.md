# Rewrite Backlog

Review date: 2026-07-09

## Consolidated Findings

| Priority | Batch | File | Issue | Fix direction | Verification | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| P0 | 6. Navigation/QA | `scripts/check-built-site.mjs` | `/tools/` linked page is missing from required route checks. | Add `/tools/` to `requiredRoutes`. | `npm run qa`; expect 16 checked routes after change. | Current checker passes with 15 routes. |
| P1 | 1. Foundation | `src/pages/index.astro` | AI URL shortcut lacks fallback for AI tools that cannot browse URLs. | Add fallback: paste relevant page text; start with `はじめの一歩` and `場面別の頼み方`. | Top page text check. | Keep shortcut, clarify responsibility. |
| P1 | 1. Foundation | `src/pages/index.astro` | Reading order skips concept, voice input, practice, and glossary. | Split into `まず理解する` and `すぐ始める` paths or add missing pages. | Browser/top page review. | Helps beginner path. |
| P1 | 1. Foundation | `src/content/docs/start.mdx` | First copyable prompt is too long. | Put short prompt first; move full setup to `必要なら詳しく頼む`. | First copy block is 2-5 lines where possible. | Aligns with short-prompt promise. |
| P1 | 1. Foundation | `src/content/docs/start.mdx` | Requirements memo appears after workspace setup. | Move or introduce small requirements memo before setup. | Page order review. | Avoids building before scope. |
| P1 | 1. Foundation | Multiple foundation pages | Running examples are inconsistent. | Choose one recurring beginner example or label examples as separate. | Search example names. | Household memo app or personal memo page are candidates. |
| P1 | 2. Prompt/request | `src/content/docs/asking.mdx` | Long prompt table is uninterrupted. | Group rows by stage: start, organize, fix, review, handoff. | No section over ~8 rows. | Keep examples; improve scanability. |
| P1 | 2. Prompt/request | `src/content/docs/asking.mdx` | Generic fallback template appears after the table. | Move or duplicate fallback near top. | Template visible before long table. | Reduces hunting. |
| P1 | 2. Prompt/request | `src/content/docs/templates.mdx` | Some templates are dense for first-time copying. | Split long templates into `最小版` plus optional detail lines. | Each card has short path. | Keep safety wording. |
| P1 | 3. Work continuity | `src/content/docs/work-log.mdx` | Logs lack sensitive-data guardrails. | Add "書かないこと" and redaction examples. | Grep for private data warning near log template. | Protects users documenting real work. |
| P1 | 3. Work continuity | `src/content/docs/recover.mdx`, `src/content/docs/glossary.mdx` | GitHub rollback framing lacks public/private/secrets caution. | Add private repo/no secrets/check changed files warning; adjust glossary. | Warning appears near GitHub mention. | Avoids accidental exposure. |
| P1 | 5. Advanced/tools | `src/content/docs/my-vibe-coding.mdx` | GitHub CLI/star-growth advice can overstate reliability and currency. | Soften as personal workflow; add maintenance/security/license caveats. | Read section and external link check. | Live web verification recommended before final copy. |
| P1 | 5. Advanced/tools | `src/content/docs/tools.mdx` | Accessibility subagent prompt assumes installed local skill/agent. | Add fallback prompt for normal AI chat. | Reader can act without installed agent. | Preserve short subagent prompt too. |
| P1 | 6. Navigation/QA | `src/pages/index.astro` | Homepage preview semantics are uneven for assistive tech. | Make preview a `section`/`figure` with heading/caption or mark decorative. | Accessibility tree/role check. | Browser layout currently OK. |
| P1 | 6. Navigation/QA | `public/copy-blocks.js` | Copy failure has no manual recovery instruction. | Add fallback status text telling user to select and copy manually. | Clipboard-denied test or source review. | Success path works today. |
| P2 | 1. Foundation | `src/content/docs/glossary.mdx` | Missing terms: PRD, private/public repository, secret/credential, branch, MCP, TDD. | Add short beginner definitions. | Grep terms and glossary rows. | Do before advanced copy expansion. |
| P2 | 1. Foundation | `src/content/docs/voice-input.mdx` | Typeless can look required. | Add "音声入力は任意; standard phone/OS input is enough". | Check wording near Typeless. | Tool guidance remains useful. |
| P2 | 2. Prompt/request | `src/content/docs/short-prompts.mdx` | Final matrix lacks concrete copyable examples. | Add one short prompt and one detailed prompt after matrix. | Page ends with examples. | Preserve concise concept. |
| P2 | 2. Prompt/request | `src/content/docs/templates.mdx` | Template cards are ungrouped. | Order by workflow and add headings. | Card order matches start -> plan -> build -> inspect/recover -> review -> handoff. | Helps scanning. |
| P2 | 3. Work continuity | `src/content/docs/folder-structure.mdx` | Private/draft/public-ready material is not labeled. | Add labels in folder table. | Table distinguishes draft/final/public. | Keep simple. |
| P2 | 3. Work continuity | `src/content/docs/recover.mdx`, `src/content/docs/common-mistakes.mdx` | No safe human/helper handoff after repeated failure. | Add safe handoff prompt. | Prompt excludes secrets and includes changed files/error/goal. | Useful under deadline. |
| P2 | 4. Risk/readiness | `src/content/docs/checklists.mdx` | Practice/personal/public levels are not separated. | Split or label checklist levels. | Page has level labels. | Current checklist itself is strong. |
| P2 | 5. Advanced/tools | `src/content/docs/my-vibe-coding.mdx` | OKF is draft/current-service sensitive. | Add "2026-07時点ではDraft" only after re-check, or avoid stable claim. | External source re-check. | Do not overstate spec status. |
| P2 | 5. Advanced/tools | `src/content/docs/tools.mdx` | MarkItDown needs security/fidelity caveats. | Add trusted-file and non-high-fidelity conversion warning. | Check against upstream README. | External source checked during review. |
| P2 | 5. Advanced/tools | `src/content/docs/tools.mdx` | Product Starter stack is version-sensitive. | Add "READMEを確認してから使う" or checked-date note. | External link/date check. | Avoid stale stack claims. |

## Fix Batch Plan

### Batch 1: Foundation wording and top-page direction

Files:

- `src/pages/index.astro`
- `src/content/docs/what-is-vibe-coding.mdx`
- `src/content/docs/glossary.mdx`
- `src/content/docs/voice-input.mdx`
- `src/content/docs/start.mdx`
- `src/content/docs/practice.mdx`

Goals:

- Clarify first-time reading path.
- Add AI URL/text fallback.
- Put short prompt first in `start`.
- Move or introduce small requirements memo before setup.
- Expand glossary with needed terms.
- Clarify voice input is optional.

Verification:

```powershell
npm run qa
git diff --check
```

### Batch 2: Prompt/request examples

Files:

- `src/content/docs/short-prompts.mdx`
- `src/content/docs/asking.mdx`
- `src/content/docs/templates.mdx`

Goals:

- Group `asking` examples.
- Put fallback prompt before long table.
- Add inspect-vs-edit distinction.
- Split dense templates into short first path plus optional details.
- Add concrete short-vs-detailed examples to `short-prompts`.

Verification:

```powershell
npm run qa
git diff --check
```

### Batch 3: Work continuity and recovery

Files:

- `src/content/docs/folder-structure.mdx`
- `src/content/docs/work-log.mdx`
- `src/content/docs/recover.mdx`
- `src/content/docs/common-mistakes.mdx`

Goals:

- Add sensitive-data guardrails to logs.
- Add GitHub public/private/secrets caution.
- Clarify private/draft/public-ready folders.
- Add safe handoff prompt after repeated failures.
- Align normal and recovery logs.

Verification:

```powershell
npm run qa
git diff --check
```

### Batch 4: Risk, checklist, public-readiness

Files:

- `src/content/docs/checklists.mdx`
- `src/content/docs/common-mistakes.mdx`
- relevant glossary entries

Goals:

- Keep current public-review strength.
- Separate practice/personal/public checking levels.
- Add beginner-readable security/data/auth/secrets minimum checks.

Verification:

```powershell
npm run qa
git diff --check
```

### Batch 5: Advanced/tool framing

Files:

- `src/content/docs/my-vibe-coding.mdx`
- `src/content/docs/tools.mdx`

Goals:

- Keep advanced shortcut value but mark optional.
- Soften GitHub CLI and trend-search claims.
- Add current-service caveats.
- Add normal-AI fallback for accessibility review.
- Add MarkItDown and Product Starter caveats.

Verification:

```powershell
npm run qa
git diff --check
```

External live verification is required before final public copy for:

- MarkItDown security/fidelity wording
- Product Starter stack wording
- OKF draft/stability wording
- GitHub CLI behavior or search examples

### Batch 6: Navigation, route checker, cross-links, and QA

Files:

- `astro.config.mjs`
- `scripts/check-built-site.mjs`
- `src/pages/index.astro`
- cross-linking pages as needed
- `public/copy-blocks.js` if copy failure copy is changed

Goals:

- Add `/tools/` to route checker.
- Adjust top navigation/reading order after content decisions.
- Improve preview accessibility semantics.
- Improve copy failure recovery wording.

Verification:

```powershell
npm run qa
git diff --check
```

Browser smoke routes:

- `/`
- `/asking/`
- `/templates/`
- `/tools/`
- `/404.html`

Mobile width:

- 390 x 844

Desktop width:

- 1280 x 740

## Stop Condition

Do not edit site content until the user explicitly approves moving from review artifacts into implementation batches. This review execution is complete when all files in `docs/content-review/` are committed and pushed.
