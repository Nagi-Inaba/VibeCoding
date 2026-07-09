# Content Quality Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the content quality audit into concrete site improvements so beginners can complete one small cycle, verify results, and understand public-release risk before using advanced shortcuts.

**Architecture:** Keep the existing Astro/Starlight structure. Improve content and navigation without adding new dependencies or changing the visual system. Add one new public-readiness page, strengthen the existing practice/checklist/tool pages, and keep review artifacts synchronized with the implementation.

**Tech Stack:** Astro 7, Starlight, MDX content pages, PowerShell verification, `npm run qa`, `git diff --check`.

## Global Constraints

- Preserve existing Japanese beginner-friendly tone.
- Do not add new npm dependencies.
- Do not commit unless the user explicitly asks.
- Use `apply_patch` for manual file edits.
- Keep advanced/tool content optional; the first-time path must work without `my-vibe-coding.mdx`.
- Do not claim current prices, free plans, or tool feature guarantees without official-source verification.
- Run `npm run qa` and `git diff --check` before reporting implementation completion.

---

## File Structure

- Modify `src/pages/index.astro`: change top page reading paths from a flat "まず読む4つ" into reader-state paths.
- Modify `astro.config.mjs`: add the new public-readiness page to Starlight sidebar.
- Modify `scripts/check-built-site.mjs`: add the new route to required build checks.
- Modify `src/content/docs/start.mdx`: link the initial cycle to the improved practice page and make verification visible.
- Modify `src/content/docs/practice.mdx`: expand into a complete beginner cycle with source memo, requirements memo, prompts, expected outputs, verification, and work log.
- Modify `src/content/docs/checklists.mdx`: add UI state checks and "public app" safety checks.
- Create `src/content/docs/publish-check.mdx`: explain GitHub Pages/public-release checks in beginner language.
- Modify `src/content/docs/tools.mdx`: add a use-case-first selection table and currentness checks for tool-specific sections.
- Modify `src/content/docs/my-vibe-coding.mdx`: soften trend/star and external-tool claims and route tool discovery through verification.
- Modify `src/content/docs/voice-input.mdx`: clarify that voice input is optional for old-link readers.
- Create/update `docs/content-quality-audit/2026-07-09-implementation-plan.md`: short implementation companion that maps audit findings to changed files.

## Task 1: Planning Artifacts And Navigation Skeleton

**Files:**
- Create: `docs/content-quality-audit/2026-07-09-implementation-plan.md`
- Modify: `src/pages/index.astro`
- Modify: `astro.config.mjs`
- Modify: `scripts/check-built-site.mjs`

**Interfaces:**
- Produces a new route: `/publish-check/`
- Produces top page groups: `まず理解する`, `すぐ始める`, `困ったら見る`, `慣れてから広げる`

- [ ] Step 1: Add implementation companion doc summarizing audit-to-change mapping.
- [ ] Step 2: Add `publish-check` to sidebar under `失敗を減らす`.
- [ ] Step 3: Add `/publish-check/` to `requiredRoutes`.
- [ ] Step 4: Update top page reading order to reader-state paths and route GitHub Pages guidance through `publish-check`.
- [ ] Step 5: Verify route references with `rg -n "publish-check|まず理解する|すぐ始める" src astro.config.mjs scripts/check-built-site.mjs`.

## Task 2: Complete First Practice Cycle

**Files:**
- Modify: `src/content/docs/start.mdx`
- Modify: `src/content/docs/practice.mdx`

**Interfaces:**
- `start.mdx` links readers into `../practice/`
- `practice.mdx` contains a complete small cycle: source memo, requirements memo, page outline, first draft instruction, review instruction, verification log, fixed output shape, work log

- [ ] Step 1: Add a small "次は1回だけ通す" link in `start.mdx`.
- [ ] Step 2: Rewrite `practice.mdx` into a copyable small cycle.
- [ ] Step 3: Include a source memo example and small requirements memo example.
- [ ] Step 4: Include prompts for structure, draft, fix, verify, and log.
- [ ] Step 5: Include expected output shapes without pretending AI output is deterministic.
- [ ] Step 6: Verify with `rg -n "元メモ例|小さな要件メモ例|確認したこと|作業記録例" src/content/docs/practice.mdx`.

## Task 3: Verification, Public Readiness, And Safety

**Files:**
- Create: `src/content/docs/publish-check.mdx`
- Modify: `src/content/docs/checklists.mdx`
- Modify: `src/content/docs/glossary.mdx` if new terms need explanation

**Interfaces:**
- `checklists.mdx` links to `../publish-check/`
- `publish-check.mdx` covers GitHub Pages/public URL, public/private repo, secrets, generated files, build/deploy status, mobile/link check, and rollback/non-publication path

- [ ] Step 1: Add "触って確かめる" state table to `checklists.mdx`.
- [ ] Step 2: Add "他人に使わせるなら10項目" public-app safety table.
- [ ] Step 3: Create `publish-check.mdx` with beginner-safe GitHub Pages guidance.
- [ ] Step 4: Add links between `checklists.mdx`, `recover.mdx` if useful, and `publish-check.mdx`.
- [ ] Step 5: Verify with `rg -n "公開する前|他人に使わせるなら|空状態|権限なし|GitHub Pages" src/content/docs`.

## Task 4: Tool And Advanced Content Framing

**Files:**
- Modify: `src/content/docs/tools.mdx`
- Modify: `src/content/docs/my-vibe-coding.mdx`
- Modify: `src/content/docs/voice-input.mdx`

**Interfaces:**
- `tools.mdx` starts with use-case-first selection before individual tool descriptions.
- Individual tools have a "使う前に確認すること" note.
- `voice-input.mdx` clearly says voice input is optional.

- [ ] Step 1: Add a use-case table at the top of `tools.mdx`.
- [ ] Step 2: Add currentness/privacy/license checks to Typeless, MarkItDown, Playwright, Product Starter, and accessibility sections.
- [ ] Step 3: Soften `my-vibe-coding.mdx` star-growth and external-format claims.
- [ ] Step 4: Clarify `voice-input.mdx` so old-link readers know they can start without voice input.
- [ ] Step 5: Verify with `rg -n "使う前に確認|任意|スター数|README|料金|プライバシー" src/content/docs/tools.mdx src/content/docs/my-vibe-coding.mdx src/content/docs/voice-input.mdx`.

## Task 5: Review Artifact Sync And Final Verification

**Files:**
- Create/Modify: `docs/content-quality-audit/2026-07-09-implementation-plan.md`

**Interfaces:**
- Audit report remains a record of findings and is not rewritten for implementation status.
- Implementation companion records what was changed, what remains, and which older P2 items are out of scope for this batch.

- [ ] Step 1: Update the implementation companion with completion status per audit batch and note deferred P2 items.
- [ ] Step 2: Run `npm run qa`.
- [ ] Step 3: Run `git diff --check`.
- [ ] Step 4: Run `git status --short --branch`.
- [ ] Step 5: Dispatch a final read-only subagent review for content quality and safety before reporting completion.

## Completion Criteria

- The first-time path is visible from the top page.
- `practice.mdx` is a complete beginner cycle, not just a prompt list.
- Public-readiness guidance exists and is linked from navigation and checklist content.
- Checklists include UI state checks and public-app safety checks.
- Tool pages are use-case-first and include currentness/privacy caveats.
- External tool claims are either verified against official sources in this run or written as non-current, user-checked guidance.
- QA passes with the new route.
- No unrelated files are modified.
