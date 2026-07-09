# Page Inventory

Review date: 2026-07-09

## Inventory

| Page | Route | Sidebar group | Title | Description | H2 | Internal links | External links | Tables | Code/pre | Role | Reader state | Main promise | QA route status | Notes |
| --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- |
| `src/pages/index.astro` | `/` | はじめる | Vibe Coding Guide | 短い指示でAIが動ける環境を作る、バイブコーディング初心者向けガイド。 | 3 | 24 | 1 | 1 | 0 | Landing page and path selector | First visit | Short instructions work when workspace and request style are prepared | Required | Reading order needs broader foundation path |
| `src/content/docs/what-is-vibe-coding.mdx` | `/what-is-vibe-coding/` | はじめる | バイブコーディングとは | AIに丸投げするのではなく、人間が目的と確認を持ちながら一緒に作る進め方。 | 4 | 0 | 0 | 0 | 0 | Concept anchor | Unsure what vibe coding means | Human keeps purpose and checks | Required | Strong conceptual anchor |
| `src/content/docs/glossary.mdx` | `/glossary/` | はじめる | 用語集 | 初心者がつまずきやすい言葉を短く説明。 | 0 | 0 | 0 | 1 | 0 | Term support | Seeing unfamiliar terms | Beginner-safe definitions | Required | Needs more advanced/safety terms |
| `src/content/docs/voice-input.mdx` | `/voice-input/` | 最初の一周 | 音声入力で下書きする | 頭の中にあることを、まず話してからAIに渡せる形へ整える。 | 4 | 0 | 1 | 1 | 2 | Drafting with voice | Has rough ideas | Speak first, then organize for AI | Required | Typeless should be clearly optional |
| `src/content/docs/start.mdx` | `/start/` | 最初の一周 | はじめの一歩 | 最初にやることは、作業フォルダを1つ作って、そこで何をしたいかAIに伝えること。 | 12 | 0 | 0 | 0 | 7 | First setup | Ready to begin | Make one workspace and tell AI what to do | Required | First prompt long; requirements memo after setup |
| `src/content/docs/practice.mdx` | `/practice/` | 最初の一周 | 小さな実践例 | 1サイクルを体験して、AIとの作業の流れをつかむ。 | 4 | 0 | 0 | 0 | 3 | Tiny practice loop | Needs small success cycle | Try one complete cycle | Required | Good homepage path candidate |
| `src/content/docs/short-prompts.mdx` | `/short-prompts/` | AIへの頼み方 | 短い指示が効く理由 | 一言二言の指示が通じるのは、才能ではなく前提整理の結果。 | 3 | 0 | 0 | 1 | 1 | Why short prompts work | Wants shorter AI instructions | Short prompts work when context exists | Required | Needs final concrete examples |
| `src/content/docs/asking.mdx` | `/asking/` | AIへの頼み方 | 場面別の頼み方 | こういう場面ではこう頼む、が分かる実用例。 | 3 | 0 | 0 | 1 | 1 | Situation examples | Needs current-situation prompt | Pick one row by situation | Required | Table too uninterrupted |
| `src/content/docs/templates.mdx` | `/templates/` | AIへの頼み方 | 依頼テンプレート | コピーして使える短い頼み方の型。 | 1 | 0 | 0 | 0 | 10 | Copyable request cards | Wants reusable templates | Copy and adapt short templates | Required | Needs grouping and shorter first options |
| `src/content/docs/folder-structure.mdx` | `/folder-structure/` | 作業を続ける土台 | AIが迷わないフォルダ構成 | 最初は作業フォルダを1つだけ作り、必要な構成はAIに作らせながら育てる。 | 5 | 0 | 0 | 1 | 8 | Workspace structure | Needs file placement rules | Separate materials, notes, outputs, logs | Required | Needs private/draft/public-ready labels |
| `src/content/docs/work-log.mdx` | `/work-log/` | 作業を続ける土台 | 作業記録の残し方 | 作業記録は反省文ではなく、次回の自分とAIへの引き継ぎ。 | 9 | 0 | 0 | 0 | 2 | Continuation log | Needs to resume later | Logs are handoff notes | Required | Needs secret redaction guidance |
| `src/content/docs/checklists.mdx` | `/checklists/` | 失敗を減らす | チェックリスト | 作業前、作業中、公開前に見る確認項目。 | 2 | 0 | 0 | 0 | 1 | Review checklist | Preparing or publishing | Check before, during, before release | Required | Strong central checklist |
| `src/content/docs/common-mistakes.mdx` | `/common-mistakes/` | 失敗を減らす | よくある失敗 | AIが迷う原因を、能力不足ではなく作業条件から見直す。 | 1 | 0 | 0 | 0 | 0 | Failure patterns | Diagnosing mistakes | Fix working conditions | Required | Needs safe help handoff |
| `src/content/docs/recover.mdx` | `/recover/` | 失敗を減らす | うまく動かなくなったときの戻し方 | AIの変更で崩れたときは、続けて直させる前に戻れる地点を確認する。 | 8 | 0 | 0 | 1 | 3 | Rollback and pause guide | AI-made change broke something | Stop before adding changes | Required | Needs GitHub/privacy warning |
| `src/content/docs/my-vibe-coding.mdx` | `/my-vibe-coding/` | 一気にステップアップ | 大きく近道する考え方 | 一から全部やろうとせず、既存の道具、型、スクリプトを使って一気にステップアップするための考え方。 | 6 | 1 | 5 | 0 | 7 | Advanced shortcut philosophy | Completed basics | Use tools, patterns, docs, scripts | Required | Advanced/personal claims need softer framing |
| `src/content/docs/tools.mdx` | `/tools/` | 一気にステップアップ | よく使うツール | バイブコーディング初心者が、資料読み取り、画面確認、開発の型、公開前レビューを一気に進めるための道具。 | 4 | 0 | 4 | 0 | 3 | Tool reference | Needs a specific tool | Use known tools for specific jobs | **Missing from required route list** | P0: linked but absent from `requiredRoutes` |
| `src/content/docs/404.mdx` | `/404.html` | Not normal guide flow | ページが見つかりません |  | 0 | 0 | 0 | 0 | 0 | Bad URL recovery | Lost reader | Explain page not found and offer return | Not normal required route | Browser check OK |

## Route Reconciliation

`scripts/check-built-site.mjs` currently checks 15 required routes:

- `/`
- `/start/`
- `/what-is-vibe-coding/`
- `/voice-input/`
- `/short-prompts/`
- `/asking/`
- `/templates/`
- `/folder-structure/`
- `/work-log/`
- `/recover/`
- `/common-mistakes/`
- `/practice/`
- `/checklists/`
- `/glossary/`
- `/my-vibe-coding/`

Mismatch:

- `/tools/` is linked from `src/pages/index.astro` and listed in `astro.config.mjs`, but it is not in `requiredRoutes`.

Review classification:

- Priority: P0
- Reason: `/tools/` is an intentional linked public route, and the current build checker can still pass without explicitly requiring it. This matches the rubric's P0 rule for a build check missing a required route.

Recommended fix:

- Add `/tools/` to `requiredRoutes`.
- Optionally create a future checker that derives expected routes from content inventory or sidebar config.
