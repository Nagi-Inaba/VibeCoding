# Content Review

Review date: 2026-07-09

This folder contains the executed content review for Vibe Coding Guide. It follows the plan in `docs/superpowers/plans/2026-07-09-content-review-plan.md`.

## Scope

Reviewed:

- `src/pages/index.astro`
- `src/content/docs/*.mdx`
- `astro.config.mjs`
- `scripts/check-built-site.mjs`
- `public/copy-blocks.js`
- `research/vibe-coding-beginner-sites-2026-07-08.md`
- `research/vibe-coding-source-matrix-2026-07-08.md`

Normal guide pages and the 404 page were reviewed separately. The 404 page is treated as recovery content, not as part of the normal reading path.

## Outputs

- `page-inventory.md`: page list, route coverage, page roles, and QA route status.
- `rubric.md`: review criteria and priority rules.
- `journey-map.md`: beginner, recovery, and advanced reading paths.
- `page-review-table.md`: page-level findings.
- `research-coverage-matrix.md`: comparison with prior research themes.
- `accessibility-review.md`: Find / Receive / Understand / Participate / Continue review.
- `rewrite-backlog.md`: consolidated fix backlog and batch plan.

## Executive Summary

The site has a strong beginner-oriented core: it is not just a prompt collection, but a guide about workspaces, small requirements notes, logs, rollback, and review. That is the most distinctive and valuable axis.

The main issues are:

- The first-time path and advanced/operator path are still close together.
- Some first prompts are longer than the site's "short prompt" promise suggests.
- `/tools/` is a real linked page but is not currently part of required route checks. This is classified as P0 because the build checker misses an intentional public route.
- GitHub, logs, external tools, and advanced workflows need more explicit privacy, permission, and "optional/advanced" framing.
- Several pages need clearer "what next" endings and a shared running example.

## Review Status

| Area | Status |
| --- | --- |
| Current state capture | Complete |
| Page inventory | Complete |
| Rubric | Complete |
| Reader journey map | Complete |
| Page review | Complete |
| Research coverage | Complete |
| Accessibility/browser review | Complete |
| Rewrite backlog | Complete |
| Site content implementation | Not started by design; requires explicit approval to proceed |

## Verification Evidence

Commands and checks used:

```powershell
git status --short --branch
rg --files src/content/docs
rg -n "^(title:|description:|#|##|###)" src/content/docs -g "*.mdx"
rg -n "個人情報|内部情報|ログイン|権限|無料|料金|GitHub CLI|MCP|TDD|PRD|AGENTS|CLAUDE|トークン|アクセシビリティ" src/content/docs src/pages/index.astro
npm run qa
```

Browser checks used local preview at `http://127.0.0.1:4322/VibeCoding/` with Playwright for desktop/mobile homepage, `/asking/`, `/templates/`, `/tools/`, and 404. Details are in `accessibility-review.md`.
