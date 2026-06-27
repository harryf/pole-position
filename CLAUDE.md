# Pole Position — project guide

A single-file PWA that helps **Benjamin Madani** (20, finishing his Automobilmechatroniker EFZ at
Merbag/Mercedes in **Aug 2026**) run his first real job hunt in Switzerland. Built for Harry (his
dad). Car/JDM-drift themed, gamified, syncs phone↔laptop, all data client-side.

- **Live:** https://harryf.github.io/pole-position/
- **Repo:** `github.com/harryf/pole-position` (public) — Harry's account, `gh` authed as `harryf`.
- **Spec / source of truth:** `ISA.md` (every feature is a numbered ISC with verification evidence).
- **Current version:** 1.2.0.

## Architecture (don't fight it)

- **Buildless. One `index.html`** holds all UI + logic (vanilla JS, no framework, no build step).
  Inspired by `../sarah_project/technicolour-planner`.
- `src/sync.js` — pure, dependency-free **last-write-wins merge** (per-record `{id, updatedAt,
  deleted}` + tombstones). Loaded in the browser (`window.PP_SYNC`) AND importable in Node tests.
- `src/i18n.js` — **all** UI strings (`window.PP_I18N`). Nothing user-facing is hardcoded in
  `index.html` (a test enforces this).
- `service-worker.js` — cache-first offline shell + clean update banner (no surprise reload).
- `manifest.webmanifest`, `icons/` (generated from `icons/icon.svg` via inkscape).
- `vendor/` — PeerJS, qrcode, jsQR (vendored for offline; the only runtime third-party is the PeerJS
  signalling broker during a pair).
- `tests/` — `run.mjs` (runner), `merge.test.mjs`, `i18n.test.mjs`, `serve.ts` (bun static dev server).
- `import.example.json` — bulk-import format for leads + tasks (`Menu → Import`).

## Data model (localStorage key `pole_position_v1`)

`state = { leads[], tasks[], contacts[], debriefs[], settings, meta }`. Every record carries
`id / updatedAt / deleted`. Key relationships & fields:
- **lead**: company, role, link, location, salary, source, favourite, priority, `stage` (8 stages:
  researching→resume→cover→applied→contacted→interviewing→offer→closed), nextAction, nextDue, notes.
- **task**: title, category, due, priority, done, recurring, **notes**.
- **contact**: name, company, relationship, notes, **`helpsWith: [leadId]`** ← the network↔job link.
- **debrief**: leadId, date, went_well, improve, followups (structured JSON, in export for LLM).
- **settings** (DEVICE-LOCAL, not synced): theme, dailyGoal, name, lang.
- **meta**: xp, streak, bestStreak, lastActiveDay (synced via max — never lost on merge).

## Invariants / conventions (these bite — keep them)

1. **Every UI string goes through `t('key')`** from `src/i18n.js`. Add new keys to **both** `en` and
   `de` or `node tests/run.mjs` fails (parity + key-existence are tested).
2. **German is Swiss High German**: no `ß` (use `ss`), "Hoi/Grüezi" not "Servus". Default UI = **English**.
3. **Sync excludes `settings`** (`syncPayload()` strips it) so language/theme stay per-device. Merge
   uses `S.mergeState`; LWW + tombstones; idempotent + commutative (tested).
4. **Deletes**: no inline delete on list rows — delete lives only inside the edit modal and **always
   `confirm()`s** (tasks, contacts, leads).
5. **Version bump touches THREE places + tag**: `APP_VERSION` (index.html), `VERSION`
   (service-worker.js), a `CHANGELOG.md` entry, then `git tag vX.Y.Z && git push --tags`. The SW
   `SHELL` list must include any new asset file (e.g. a new `src/*.js`).
6. **Never break the buildless rule** — no bundler, no npm runtime deps. bun only for the test server.

## Release process

```bash
node tests/run.mjs                 # must be green
# bump APP_VERSION + SW VERSION + CHANGELOG.md
git add -A && git commit -m "vX.Y.Z — …"
git push origin main               # → Deploy + Tests workflows (GitHub Pages)
git tag vX.Y.Z && git push origin vX.Y.Z   # → Release workflow (GitHub Release)
```
CI: `.github/workflows/` = `tests.yml` (node), `deploy.yml` (Pages on push to main), `release.yml`
(GitHub Release on `v*` tag). Pages source = "GitHub Actions" (build_type=workflow).

## Verifying (no Interceptor CLI in this env)

- Run locally: `bun tests/serve.ts 8742` (background), then real Chrome.
- **Live DOM/behaviour checks**: the `mcp__claude-in-chrome` tools (open a tab, navigate, `javascript_tool`
  to query the DOM). Authoritative for responsive/behaviour.
- **Visual**: headless Chrome `--headless=new --window-size=W,H --screenshot=… --virtual-time-budget=2500 URL`.
- **Gotcha — SW cache**: Chrome caches `index.html` via the service worker, so edits look stale. Bust it:
  in MCP eval `getRegistrations()→unregister` + `caches.delete`, then reload; for headless, screenshot a
  freshly-named copy (`cp index.html _tmp.html`) so the SW cache-misses and fetches fresh.
- **Gotcha — macOS min window width**: headless `--window-size=390` is clamped wider then cropped to 390
  → false "clipping". Verify narrow layout with an intrinsic-width DOM probe (force element width, read
  `scrollWidth`), or screenshot at ≥600px. Live confirmed: zero overflow at 390.
- After any web change: confirm the **live** URL serves the new `APP_VERSION` (Pages CDN can lag a few s).

## Locked product decisions

- Theme: **JDM / Drift** default (others selectable: Porsche / Mercedes-AMG / BMW M).
- Sync: **PeerJS live pair (code + QR) + file/QR fallback**, no server.
- Reminders/push: **none in v1** (iOS background push needs a server; deferred by choice).
- Voice debriefs: rely on **iOS native keyboard dictation** into the textarea (no Web Speech API).

## Open / deferred (need Ben's hardware)

- Real two-device live PeerJS pair (code+single-device verified only).
- Install-to-home-screen on his actual iPhone + Windows laptop.
- Possible later: real push (tiny Cloudflare Worker + web-push/VAPID), resume/cover-letter generation.

## Salary anchor (seeded into the Guide)

Zürich GAV legal floor for 4-yr EFZ = CHF 5'000/mo ×13 (~65k); market entry median ~66k; **negotiation
anchor CHF 5'500/mo ×13 ≈ 71.5k**, walk-floor 5'300. Lead every conversation with the AGVS + Mercedes
HV/EV certification (the scarce, billable lever) + the Merbag reference.
