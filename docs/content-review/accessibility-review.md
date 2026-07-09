# Accessibility Review

Review date: 2026-07-09

Framework: Find / Receive / Understand / Participate / Continue.

## Browser Evidence

Local preview was started temporarily at `http://127.0.0.1:4322/VibeCoding/` and checked with Playwright.

| Path | Viewport | H1 | Tables | Copy buttons | Horizontal overflow | Result |
| --- | --- | --- | ---: | ---: | --- | --- |
| `/` | 1280 x 740 | `短い指示でAIが動ける環境を作る` | 1 | 0 | No | OK |
| `/` | 390 x 844 | `短い指示でAIが動ける環境を作る` | 1 | 0 | No | OK |
| `/asking/` | 390 x 844 | `場面別の頼み方` | 1 | 1 | No | OK layout, table still cognitively dense |
| `/templates/` | 390 x 844 | `依頼テンプレート` | 0 | 10 | No | OK layout, templates need grouping |
| `/tools/` | 390 x 844 | `よく使うツール` | 0 | 3 | No | OK layout, advanced framing needed |
| `/404.html` | 390 x 844 | `ページが見つかりません` | 0 | 0 | No | OK |

Keyboard copy check:

- Page: `/templates/`
- Action: focus first `.copy-block-button`, press `Enter`
- Result: status text `コピーしました`
- Focus after copy: returned to the same button

## Findings By Gate

### Find

| Priority | Finding | Evidence | Fix direction | Verification |
| --- | --- | --- | --- | --- |
| P0 | `/tools/` is linked and in sidebar but missing from required route checks. | Landing links and sidebar include tools; `requiredRoutes` does not. | Add `/tools/` to `scripts/check-built-site.mjs`. | `npm run qa` should report 16 checked routes after fix. |
| P1 | Homepage reading order skips important first-time pages. | Current order: start, asking, folder-structure, recover. | Add first-time path or split paths by reader state. | Read top page with nav and reading-order only. |

### Receive

| Priority | Finding | Evidence | Fix direction | Verification |
| --- | --- | --- | --- | --- |
| P1 | Homepage preview has mixed accessibility semantics. | `preview-shell` is a generic labeled div; preview nav is `aria-hidden`. | Make preview a real section/figure with heading/caption or mark whole preview decorative if duplicated. | Inspect accessibility tree or role-based Playwright checks. |
| P1 | Long table in `asking.mdx` is visually scroll-safe but cognitively dense. | Mobile browser had no overflow; table has 23 examples. | Add categories and "迷ったらこの形" before table. | Mobile check plus visible section labels. |

### Understand

| Priority | Finding | Evidence | Fix direction | Verification |
| --- | --- | --- | --- | --- |
| P1 | Advanced/tool path can look required because top nav promotes it beside beginner path. | `近道`, `ツール` in top nav. | Mark optional/advanced in navigation or page intro. | First-time route should be understandable without advanced pages. |
| P2 | Several advanced terms need glossary support. | PRD, MCP, TDD, AGENTS.md, CLAUDE.md, private repo, secrets. | Add glossary rows before relying on terms. | Grep terms and confirm glossary coverage. |

### Participate

| Priority | Finding | Evidence | Fix direction | Verification |
| --- | --- | --- | --- | --- |
| P1 | Copy success path works, but failure path has no manual recovery instruction. | `copy-blocks.js` says `コピーできませんでした`. | Add fallback status such as "本文を選択してコピーしてください". | Browser test with clipboard denied or source-level review. |
| P1 | Accessibility subagent prompt assumes installed local agent/skill. | `tools.mdx` only says `アクセシビリティのサブエージェントで検査して。` | Add fallback prompt usable in normal AI chat. | Test reader can act without installed agent. |
| P1 | Logs and GitHub flow lack explicit sensitive-data guardrails. | `work-log.mdx`, `recover.mdx`, glossary. | Add "書かないこと", private repo, no secrets/internal data. | Grep for warnings near log/GitHub actions. |

### Continue

| Priority | Finding | Evidence | Fix direction | Verification |
| --- | --- | --- | --- | --- |
| P2 | Recovery logs and normal work logs do not share a minimum state schema. | `work-log.mdx` and `recover.mdx` templates differ. | Align around current state, last verified good state, next action, open risks. | Confirm both templates support resuming safely. |
| P2 | 404 page works but should remain in future browser checks. | Browser found H1 and 5 links. | Keep 404 in accessibility smoke checks. | Browser check after route/nav changes. |

## Accessibility Repair Direction

Highest-value changes:

1. Add `/tools/` to route checker.
2. Add homepage first-time route and URL/text fallback instruction.
3. Group long prompt tables and templates.
4. Add copy failure recovery text.
5. Add privacy/secrets guidance near GitHub and work-log actions.
