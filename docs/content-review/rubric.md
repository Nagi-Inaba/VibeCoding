# Content Review Rubric

Use this rubric for page-level review and for future edits.

## Priority Rules

| Priority | Meaning | Examples |
| --- | --- | --- |
| P0 | Breaks reachability, build confidence, or the user's ability to use the guide at all. | Linked public route not generated; broken primary nav; build check misses a required route. |
| P1 | Likely to make a beginner act incorrectly, lose time, expose private data, or misunderstand a core path. | First prompt too long; advanced content looks required; GitHub advice lacks privacy warning. |
| P2 | Improves clarity, consistency, maintainability, or future-proofing but does not block the current guide. | Add glossary entries; soften tool claims; group examples more clearly. |
| OK | Current content is working and should be preserved. | Clear beginner explanation, concise prompt, useful checklist. |

## Scorecard Template

| Page | Priority | Lens | Issue | Evidence | Affected reader | Fix direction | Verification |
| --- | --- | --- | --- | --- | --- | --- | --- |

Every finding must include evidence, affected reader, concrete fix direction, and verification.

## Review Lenses

### Beginner Journey

Ask:

- What should the reader do on this page?
- What can they copy into AI?
- What should they skip for now?
- Where do they go next?
- What should they do when stuck?

Good direction:

- Begin with a small action.
- End with a next action, reusable prompt, checklist, or work-log step.
- Keep advanced material optional.

### Voice And Tone

Ask:

- Does this sound like a calm beginner guide?
- Is it too much like a personal operator manual?
- Are sentences short enough?
- Are risks clear without scaring the reader away?

Good direction:

- Replace "自分の環境では" with reader-oriented phrasing.
- Convert abstract claims into "使う場面 / 頼み方 / 確認すること".

### Prompt Example Policy

Ask:

- Is the first copyable prompt 2-5 lines where possible?
- Is a longer prompt clearly labeled as expanded/detail mode?
- Does the prompt tell AI whether to inspect, draft, edit, or wait?
- Does it include "まだ編集しないで" when needed?

Good direction:

- Use `最短版`, `標準版`, and `詳しく頼む版`.
- Put the shortest useful prompt first.

### Information Architecture

Ask:

- Do top page, sidebar, title, description, and headings promise the same thing?
- Can a reader tell which pages are "first cycle" and which are "advanced"?
- Are deep anchors useful or too much for the sidebar?

Good direction:

- Make first cycle primary.
- Mark tools and advanced pages as optional or "慣れてから".

### Research Coverage

Check coverage for:

- Concept and mindset
- Tool selection
- Requirements / mini PRD / wireframe
- Prompt writing
- Generation / verification loop
- Debugging and repair
- UI/UX review
- Data / auth / backend / secrets
- GitHub / history / rollback
- Testing
- Security / public review
- Cost / credits
- Starter project ideas

### Information Accessibility

Use five gates:

| Gate | Question |
| --- | --- |
| Find | Can the reader find this page and the next needed page? |
| Receive | Does the same meaning work in text, mobile, keyboard, screen reader, tables, and code blocks? |
| Understand | Are language, jargon, prerequisites, and changing claims understandable? |
| Participate | Can the reader safely act, copy, inspect, and recover? |
| Continue | Can the reader resume later through logs, next links, or reusable prompts? |

### Safety, Privacy, And External Claims

Ask:

- Does this page warn before external upload/login/permissions?
- Does it distinguish practice, personal use, and public release?
- Does it avoid stale claims about prices, free tiers, tool capabilities, or draft specs?
- Does it keep human confirmation responsibility visible?

Good direction:

- Place privacy warnings near the risky action.
- Prefer selection criteria over fixed rankings.
- Add review dates only when live verification was actually done.
