# Reader Journey Map

Review date: 2026-07-09

## Current Visible Paths

Homepage primary buttons:

1. `はじめの一歩`
2. `場面別に見る`
3. `よく使うツールを見る`

Homepage reading order:

1. `はじめの一歩`
2. `頼み方`
3. `フォルダ構成`
4. `戻し方`

Issue:

- This path is practical, but it skips the conceptual anchor, voice-input draft path, small practice loop, and glossary.
- Advanced/tool links are visible very early, which is useful for power users but can distract first-time beginners.

## Recommended Journeys

### 1. First-Time Understanding Path

Purpose: The reader wants to know what this site is and how to think.

Suggested path:

1. Top page
2. `バイブコーディングとは`
3. `用語集`
4. `音声入力で下書きする`
5. `はじめの一歩`
6. `小さな実践例`

Why:

- Concept comes before commands.
- Voice input helps non-engineers turn rough intent into text.
- Practice gives one completed cycle before advanced material.

Finding:

- P1: The current recommended reading order skips `what-is-vibe-coding`, `voice-input`, `practice`, and `glossary`.

### 2. Fast Start Path

Purpose: The reader wants to start immediately.

Suggested path:

1. `はじめの一歩`
2. `場面別の頼み方`
3. `依頼テンプレート`
4. `フォルダ構成`
5. `作業記録`

Why:

- This preserves the current practical path.
- It should show the shortest prompt first, then give expanded setup only after that.

Finding:

- P1: `start.mdx` currently puts the long setup prompt before the shorter version.
- P1: The small requirements note appears after the first workspace prompt.

### 3. Recovery Path

Purpose: The reader says "it broke" or "AI keeps making it worse."

Suggested path:

1. `よくある失敗`
2. `うまく動かなくなったときの戻し方`
3. `作業記録の残し方`
4. `チェックリスト`

Why:

- The guide already has a strong "stop before more edits" rule.
- This path should add safe context handoff and private-data redaction.

Finding:

- P1: GitHub rollback language needs public/private/secrets caution.
- P1: Work logs need "書かないこと" examples.

### 4. Advanced Shortcut Path

Purpose: The reader has completed the first cycle and wants to skip ahead using tools and established workflows.

Suggested path:

1. `大きく近道する考え方`
2. `よく使うツール`
3. Relevant anchors for MarkItDown, Playwright, Product Starter, accessibility review

Why:

- `my-vibe-coding.mdx` and `tools.mdx` are useful but dense.
- They should remain visible but clearly optional.

Finding:

- P2: Optional framing exists in page bodies, but advanced links are promoted in top-level nav beside core beginner links.

## Candidate Stage Labels

- `まず理解する`
- `すぐ始める`
- `困ったら見る`
- `慣れてから広げる`

These labels are clearer than mixing all pages under a single linear "recommended order".

## Top-Page AI Shortcut

Current idea:

- Paste the site URL into AI and ask it to read the guide and prepare the user's workspace.

Finding:

- P1: Some AI tools cannot browse URLs. Beginners may not know whether to paste the top URL, a page URL, or page text.

Recommended direction:

- Keep the shortcut.
- Add fallback wording: if the AI cannot open the URL, paste the relevant page text, starting with `はじめの一歩` and `場面別の頼み方`.
- Include a reminder that AI can prepare the workflow, but the user still confirms generated files, permissions, and public/private data.
