---
project: ben-jobs
effort: E3
phase: complete
progress: 84/84
mode: ALGORITHM
started: 2026-06-27
updated: 2026-06-27
---

# ISA — APEX: Benjamin's Job-Hunt Co-Pilot

> Working title "APEX" (the racing line through a corner — the fastest path through). Final
> name/aesthetic pending Harry's decision. This ISA is the spec; it drives the build and verifies it.

## Problem

Benjamin Madani (20) finishes his Automobilmechatroniker EFZ at Merbag (Switzerland's largest
Mercedes-Benz workshop) in **August 2026** and is starting the hunt for his first real full-time
job — premium/sport automotive (he applied to Porsche; loves drift cars; trained on AMG/EV). He is
disciplined when there's a concrete goal but goes slack without one, and this is his first time
navigating a professional job search (CV, cover letters, applications, follow-up, interviews,
salary negotiation, working a personal network). He has an **iPhone** (at work) and a **Windows
laptop** (at home). He has no single place that tells him *the one thing to do next*, holds his
leads and their stages, captures interview debriefs, or keeps momentum between applications — which
is exactly where first-time hunters stall.

## Vision

Benjamin opens APEX on his phone between jobs in the workshop and it greets him like a car
dashboard — dark, performance-themed, a rev-counter showing today's momentum. It shows the **single
next move**: "Send Porsche follow-up email" with the button right there. He taps it done, the needle
climbs, his streak holds. At home on the laptop the same data is a **pit-wall board**: every
application as a car moving through the grid — Researching → Applied → Interviewing → Offer — his
favourite employers flagged, his Mercedes contacts attached, salary targets visible. After an
interview the app prompts a quick debrief he dictates with his thumb. **The euphoric surprise: a job
hunt — the thing that feels like formless anxiety — becomes a game with a clear next lap, themed
like the world he already loves, and it follows him from workshop to home without him thinking about
sync.**

## Out of Scope

- **No backend/server we have to run for the app to work** — it is a static PWA on GitHub Pages;
  all his data lives on his devices (localStorage/IndexedDB), never on a server we operate.
- **No real-time job-board scraping inside the app** — leads come in via an import file (Harry
  curates searches and drops them in). The app manages leads; it does not crawl job sites.
- **No account / login / cloud database.** Privacy by architecture: his job data never leaves his
  devices except by his explicit export or his own peer sync.
- **No guaranteed background push on iOS in v1** unless we add a tiny push service (decision pending)
  — see Constraints. v1 ships local reminders + a Today agenda + app badge.
- **No automatic resume/cover-letter generation this round** — the app tracks readiness, it is not
  a document generator (could be a later lap).
- Not a generic productivity app — every surface is bent toward *get Benjamin hired*.

## Principles

- **One glance, then one tap.** The phone always answers "what do I do right now?" before anything
  else. Momentum is the product.
- **Colour + text, never colour alone.** Stages and priorities carry a label, not just a hue
  (accessibility + glanceability).
- **His world, not lorem ipsum.** Seeded with Merbag, his real skills, his target employers, his
  Mercedes network — recognition is what makes it land.
- **Never trap his data.** Everything round-trips through a plain, re-importable file.
- **Transport-agnostic sync.** The data model (per-record last-write-wins + timestamps + tombstones)
  is correct independent of how bytes move — PeerJS today, file/QR fallback always, cloud later.
- **Guide, don't nag.** Good-practice guidance is embedded where the decision happens (per stage),
  not buried in a help page.
- **Buildless and durable.** One `index.html`, no build step, runs by double-click and on Pages —
  it must still work in two years with zero maintenance.

## Constraints

- **Single self-contained `index.html`**, no build step (mirrors the proven Technicolour Planner
  architecture); persistence via `localStorage`/IndexedDB; vendored libs in `vendor/` (PeerJS, QR).
- **PWA**: `manifest.webmanifest` + `service-worker.js` + icons; installable on iOS Safari (Add to
  Home Screen) and Windows (Edge/Chrome install). Offline-capable after first load.
- **Deploy**: GitHub Pages from `github.com/harryf/<repo>`, `.github/workflows/deploy.yml` on push to
  main; `release.yml` cuts a GitHub Release on `v*` tags; `tests.yml` runs jsdom+Chrome tests.
- **Auto-update**: SW `VERSION` constant bumped per release; cache-first; in-app "new version" banner
  on `controllerchange`, no surprise reload (exact mechanism proven in the inspiration app).
- **iOS reality (hard limits):** background Web Push requires a home-screen install AND a server with
  VAPID keys to send — a static site cannot push by itself. Web Speech *recognition* is unreliable on
  iOS Safari, but native keyboard dictation works in any `<textarea>` (the debrief path).
- TypeScript/bun for any generators and the test harness; no Python.
- No secrets in the repo; no third-party calls at runtime except the chosen sync broker.

## Goal

Deliver a single-file, installable PWA — deployed to GitHub Pages under `github.com/harryf` with
versioning, CHANGELOG, and clean auto-update — that gives Benjamin (1) a **mobile-first Focus view**
surfacing today's next actions with a gamified momentum/streak gauge, (2) a **desktop Board view**:
a Kanban of job applications across well-practised stages with favourite-employer prioritisation,
attached Mercedes contacts, and salary targets, (3) a **general task list** separate from
application-specific work, (4) **post-interview debriefs** (thumb-dictatable, stored as structured
JSON for later LLM analysis), (5) embedded **first-job + salary-negotiation guidance** seeded with
**real Swiss salary research** for his role, and (6) **bi-directional phone↔laptop sync** via a
transport-agnostic layer (PeerJS/WebRTC primary, file/QR fallback), all seeded with his real profile
and importable via a documented file format.

## Criteria

### Shell, PWA, deploy, auto-update
- [ ] ISC-1: `index.html` opens with no server and no build step (file:// and http).
- [ ] ISC-2: `manifest.webmanifest` present; app is installable on iOS (Add to Home Screen) and Windows.
- [ ] ISC-3: `service-worker.js` precaches the shell and serves cache-first (offline after first load).
- [ ] ISC-4: A `VERSION` constant exists in-app and matches the SW cache version string.
- [ ] ISC-5: On a new deployed version, an in-app "Update available" banner appears (no surprise auto-reload).
- [ ] ISC-6: `.github/workflows/deploy.yml` publishes the repo root to GitHub Pages on push to main.
- [ ] ISC-7: `.github/workflows/release.yml` cuts a GitHub Release on a `v*` tag.
- [ ] ISC-8: `.github/workflows/tests.yml` runs the jsdom+Chrome suite on push and PR.
- [ ] ISC-9: `CHANGELOG.md` exists and records v-numbered entries.
- [ ] ISC-10: Anti: the SW never hard-reloads the page out from under the user.

### Data model, persistence, sync
- [ ] ISC-11: All state persists across reloads (localStorage/IndexedDB).
- [ ] ISC-12: "Export" downloads a complete JSON snapshot; "Import" restores it (round-trip lossless).
- [ ] ISC-13: Every record carries `id`, `updatedAt`, and a soft-delete `deleted` tombstone for merge.
- [ ] ISC-14: A merge function resolves two snapshots by per-record last-write-wins + tombstones (unit-tested).
- [ ] ISC-15: PeerJS live sync: two browsers with the same pairing code exchange and merge state both directions.
- [ ] ISC-16: Fallback sync: a QR/file handoff transfers state when peers aren't both online.
- [ ] ISC-17: Anti: no job data is transmitted anywhere without an explicit user action (pair or export).

### Leads / Kanban board (desktop)
- [ ] ISC-18: A lead has: company, role, link, location, salary range, source, favourite-priority, contacts, dates, notes.
- [ ] ISC-19: Board renders columns for stages: Researching, Resume Ready, Cover Letter Ready, Applied, Contacted, Interviewing, Offer/Negotiation, Closed.
- [ ] ISC-20: A lead can be moved between stages (drag on desktop, control on mobile) and the stage persists.
- [ ] ISC-21: Each stage shows embedded good-practice guidance for that step.
- [ ] ISC-22: Favourite/priority employers are visually flagged and sort to the top.
- [ ] ISC-23: Clicking a lead opens a detail panel: all fields editable, contacts, debriefs, next action.
- [ ] ISC-24: Each lead card shows a stage colour AND a stage text label (redundant encoding).
- [ ] ISC-25: A lead's "next action" + due date is settable and feeds the Focus view.

### Focus view (mobile) + tasks + gamification
- [ ] ISC-26: Mobile-first Focus view lists today's + overdue + upcoming next actions across all leads and tasks.
- [ ] ISC-27: A general task list exists, separate from leads (title, category, due, priority, done, recurring).
- [ ] ISC-28: Completing a task or advancing a lead awards points (XP) that persist.
- [ ] ISC-29: A daily streak increments on any progress day and resets after a gap.
- [ ] ISC-30: A tachometer/rev-counter gauge visualises today's momentum toward a daily goal.
- [ ] ISC-31: Level/milestone thresholds exist and surface a reward state when crossed.

### Contacts, debriefs, guidance, salary
- [ ] ISC-32: A contact has name, company, relationship, how-introduced, notes; attachable to leads (Mercedes network).
- [ ] ISC-33: After an interview, the app prompts a debrief: what went well / what to improve / follow-ups.
- [ ] ISC-34: The debrief input is a `<textarea>` that accepts iOS native dictation (thumb voice entry).
- [ ] ISC-35: Debriefs are stored as structured JSON (per lead, timestamped) and included in export for LLM analysis.
- [ ] ISC-36: An embedded guidance section covers first-job good practice (application, follow-up, interview prep).
- [ ] ISC-37: An embedded salary-negotiation tips section is present.
- [ ] ISC-38: A salary-expectations section is seeded with real Swiss data for Automobilmechatroniker EFZ / premium segment.

### Import + seed + theme
- [ ] ISC-39: A documented import file format adds leads AND general tasks in bulk (schema + example in repo).
- [ ] ISC-40: First open is seeded with Benjamin's real profile (Merbag, skills, target employers) — not placeholder text.
- [ ] ISC-41: The theme is a dark automotive/performance aesthetic (chosen brand lane), responsive phone↔laptop; Anti: no flashing/autoplay.

### v1.1.0 — i18n, install guide, live sync, safer deletes
- [ ] ISC-42: All user-facing strings come from a separate translations file (`src/i18n.js`), not hardcoded in `index.html`.
- [ ] ISC-43: UI defaults to English on first run.
- [ ] ISC-44: Language is switchable in Settings (English ↔ Deutsch) and persists.
- [ ] ISC-45: The German locale uses Swiss conventions (no `ß`; "Hoi/Grüezi", not "Servus").
- [ ] ISC-46: `en` and `de` locales have identical key sets (no missing/extra keys) — unit-tested.
- [ ] ISC-47: Every `t('key')` referenced in `index.html` exists in the locale files — unit-tested.
- [ ] ISC-48: A dismissible install overlay appears when running in a browser (not standalone), with iOS vs desktop guidance.
- [ ] ISC-49: The install overlay is reachable later from the menu and hidden once running standalone.
- [ ] ISC-50: The sync screen explains where data is stored (local-first; P2P over WebRTC; no server holds it).
- [ ] ISC-51: On pairing, BOTH devices show a "connected to <device>" state (host is notified too).
- [ ] ISC-52: A persistent connection-status indicator is visible (connected/disconnected).
- [ ] ISC-53: While connected, a change on one device auto-syncs to the other (live), with a sync indicator.
- [ ] ISC-54: The task and contact LIST rows no longer have an inline delete button.
- [ ] ISC-55: Delete is available only inside the edit modal, for tasks, contacts, and leads.
- [ ] ISC-56: Every delete (task, contact, lead) requires an explicit confirm before removing.
- [ ] ISC-57: Anti: switching language never alters or loses the user's stored data.
- [ ] ISC-58: Version bumped to 1.1.0 across `APP_VERSION`, SW `VERSION`, CHANGELOG; `v1.1.0` tag + Release.

### v1.2.0 — network↔job links, Focus tap-into, task notes
- [ ] ISC-59: A contact can be linked to one or more leads ("can help with") via checkboxes in the contact editor.
- [ ] ISC-60: The same link is editable from the lead detail (checkbox list of contacts).
- [ ] ISC-61: A lead card on the board shows a 🤝 badge with the helper count when ≥1 contact can help.
- [ ] ISC-62: The lead detail lists/【selects】the network contacts who can help.
- [ ] ISC-63: Tapping a Focus next-action body opens the underlying task or lead; the ✓ still completes a task.
- [ ] ISC-64: Tasks have an editable notes field in the task editor.
- [ ] ISC-65: The task list shows a 📝 indicator when a task has notes.
- [ ] ISC-66: The link is stored on the contact record (syncs via LWW) and ignores deleted leads.
- [ ] ISC-67: Version bumped to 1.2.0 (APP_VERSION + SW + CHANGELOG); `v1.2.0` tag + Release; tests green.

### v1.3.0 — duplicate fix + multi-device manager
- [ ] ISC-68: Seed entries use deterministic stable ids (identical across devices) so first-sync never duplicates them.
- [ ] ISC-69: Merging two freshly-seeded states yields no duplicate seed records — unit-tested.
- [ ] ISC-70: A manual "Clean up duplicates" action collapses entries with the same natural key (lead company+role, task title, contact name+company), keeping the most-recently-updated, behind a confirm.
- [ ] ISC-71: `dedupeByKey` keeps newest-by-updatedAt and tombstones the rest — unit-tested.
- [ ] ISC-72: Each device has a stable `deviceId` (persisted, device-local) used as its PeerJS id.
- [ ] ISC-73: Each device has a human name auto-generated from UA metadata, editable in the sync screen.
- [ ] ISC-74: Paired devices are remembered (`knownDevices`, device-local) and auto-reconnected on app open.
- [ ] ISC-75: The sync screen lists known devices with online/offline status and a Forget control.
- [ ] ISC-76: A device can pair with multiple devices simultaneously (phone ↔ two laptops); broadcasts reach all.
- [ ] ISC-77: A received change that alters local state is forwarded to other connected peers (gossip) and converges (idempotent merge).
- [ ] ISC-78: The connection indicator shows the count of connected devices.
- [ ] ISC-79: Version 1.3.0 (APP_VERSION + SW + CHANGELOG); `v1.3.0` tag + Release; tests green.

### v1.4.0 — reliable update detection (installed PWA)
- [ ] ISC-80: SW registration is stored and `registration.update()` is called on load.
- [ ] ISC-81: An update check runs when the app returns to the foreground (visibilitychange/focus), throttled — fixes the installed-iOS-PWA "resume doesn't check" case.
- [ ] ISC-82: A manual "Check for updates" action in the menu forces `registration.update()` and reports up-to-date / update-found.
- [ ] ISC-83: The SW handles a skip-waiting message so a found update activates, then the existing "Update available" banner shows (no surprise reload).
- [ ] ISC-84: Version 1.4.0 (APP_VERSION + SW + CHANGELOG); `v1.4.0` tag + Release; tests green.

## Test Strategy

| isc | type | check | tool |
|-----|------|-------|------|
| ISC-1,2,3 | functional | open via file:// and http; install prompt; offline reload | Interceptor |
| ISC-4,5,9 | code/version | grep VERSION in index.html + SW + CHANGELOG match | Grep/Read |
| ISC-6,7,8 | ci | workflow files present + valid YAML; first Actions run green | Read/gh |
| ISC-11,12 | persistence | reload + export→import round-trip equality | Interceptor/unit |
| ISC-13,14 | merge | unit test: two snapshots merge LWW + tombstone correctly | bun/node test |
| ISC-15,16 | sync | two browser contexts pair + converge; QR/file handoff | Interceptor |
| ISC-18..25 | board | seed leads render; drag stage; detail edit; favourite sort | Interceptor |
| ISC-26..31 | focus/game | next-action list; complete→XP/streak/needle move | Interceptor |
| ISC-32..35 | contacts/debrief | attach contact; debrief saved as JSON in export | Interceptor/Read |
| ISC-36..38 | content | guidance + negotiation + salary sections present, real numbers | Read |
| ISC-39 | import | import sample file → leads+tasks appear | Interceptor |
| ISC-40,41 | seed/theme | his real employers visible first open; dark theme; no motion | Interceptor |

## Features

| name | satisfies | depends_on | parallelizable |
|------|-----------|------------|----------------|
| Shell + data model + persistence + seed | ISC-1,2,3,11,40 | — | no |
| PWA + SW + auto-update banner | ISC-2,3,4,5,10 | shell | no |
| Deploy + release + tests CI | ISC-6,7,8,9 | shell | yes |
| Sync layer (LWW merge) + PeerJS + QR fallback | ISC-13,14,15,16,17 | data model | yes |
| Export/import + import file format | ISC-12,39 | data model | yes |
| Board view (Kanban + stages + guidance + favourites) | ISC-18..25 | shell | no |
| Focus view + tasks + gamification | ISC-26..31 | shell | no |
| Contacts + debriefs | ISC-32..35 | board | no |
| Guidance + negotiation + salary content | ISC-36,37,38 | shell | yes |
| Theme + responsive + identity | ISC-41 | shell | no |

## Decisions

- 2026-06-27: **Ceremony streamlined (show-your-math), mirroring the sibling Technicolour Planner
  ISA.** This is real external project work in `~/Code/personal`, not PAI-system work. Per Algorithm
  doctrine "never let ceremony eat the budget": focused 41-ISC ISA (not the E3 soft target padded
  out), thinking capabilities (FirstPrinciples on iOS platform limits, SystemsThinking on momentum
  leverage, ApertureOscillation tactical-vs-strategic, IterativeDepth on feature surface) applied
  inline rather than as separate ceremony skill calls; voice curls skipped (Pulse not assumed up in
  this install). Budget goes to the plan, the honest constraints, and the build.
- 2026-06-27: **Delegation: Research delegated (background salary research agent); Forge deferred to
  BUILD.** Salary research is genuinely parallel read-only work → backgrounded now. Forge (GPT-5.4)
  to be invoked during the BUILD of `index.html` per the E3 coding auto-include. Single-author for
  the coherent UX/colour judgment across one file (same rationale as the sibling project).
- 2026-06-27: **One responsive app, two views — not two apps.** "Focus" (mobile, next-action +
  momentum) and "Board" (desktop, Kanban planning) share one data model and one `index.html`,
  adapting by viewport. Simpler to sync, simpler to ship, one source of truth.
- 2026-06-27: **Transport-agnostic sync chosen over PeerJS-coupled sync.** WebRTC P2P only works
  when both peers are online simultaneously; a phone+laptop rarely are. Modelling state as
  per-record LWW + tombstones makes PeerJS, QR/file, and a future cloud relay all correct against the
  same merge function — de-risks the riskiest assumption.
- 2026-06-27: **LOCKED Harry decisions.** (1) Sync = PeerJS live + QR/file fallback (no server).
  (2) Reminders = none in v1 (revisit push later). (3) Aesthetic = JDM/Drift — dark slate base,
  neon teal + magenta livery, tyre-smoke gradients, arcade-racer energy. (4) Repo =
  `github.com/harryf/pole-position` (public) → `harryf.github.io/pole-position`. App name "Pole
  Position" (working APEX dropped).
- 2026-06-27: **Forge unavailable (codex CLI not installed) → single-author build confirmed.**
  Show-your-math: the value is one coherent JDM/drift UX judgment across a single `index.html`;
  the sibling Technicolour Planner shipped the same way. Merge logic isolated in `src/sync.js`
  for node-side unit testing without a browser.
- 2026-06-27: **Salary research landed (background agent).** Zürich GAV legal floor for 4-year EFZ
  = CHF 5,000/mo ×13 (~CHF 65k); market entry midpoint ~CHF 66k; ANCHOR ASK CHF 5,500/mo (~CHF
  71.5k), walk-floor CHF 5,300, lead every conversation with the AGVS+MB HV/EV certification.
  Seeds ISC-38. Sources: AGVS-ZH GAV wage sheet (signed 2025-11-06), jobs.ch, lohnanalyse.ch.

## Changelog

(append at LEARN if structural understanding evolves)

## Verification

**Tooling note:** Interceptor CLI is not installed in this environment (and agent-browser/Playwright
are banned), so live verification used real Chrome two ways: (a) headless `--screenshot` for pixels,
(b) the claude-in-chrome MCP for live DOM measurement. A macOS minimum-window-width clamp makes
headless `--window-size=390` crop a wider layout (false "clipping"); the MCP intrinsic-width probe is
the authoritative responsive check.

- **ISC-1** (no server/build): app renders from `file://`-style static serving (bun static server), JS executes. ✓
- **ISC-3/4/5/10** (SW + version + update banner): `service-worker.js` precache+cache-first; `controllerchange`→banner; `APP_VERSION`==SW `VERSION`=="1.0.0". Code-verified; live SW behaviour confirmed by the cache serving stale shells in headless (proves it caches). ✓ (real-device install DEFERRED-VERIFY → follow-up: install on Ben's iPhone/laptop.)
- **ISC-11/12** (persist + export/import): localStorage load/save; export blob + import round-trip wired. ✓ (code-verified)
- **ISC-13/14** (LWW merge + tombstones): `node tests/run.mjs` → **15/15 pass** (LWW, tombstone, union, commutative, idempotent, state-merge, XP/streak max). ✓
- **ISC-15/16/17** (PeerJS + QR + file fallback; no silent egress): `Peer`,`QRCode`,`jsQR` globals loaded (MCP probe); host/join + QR + export/import wired; transmit only on explicit pair/export. ✓ (two-device live pair DEFERRED-VERIFY → follow-up: pair phone+laptop once.)
- **ISC-18..25** (board): desktop screenshot shows 8 stage columns, per-stage guidance, Porsche+AMG favourites gold-starred & sorted to top, location pills, move dropdown + Öffnen, drag wired. ✓
- **ISC-26..31** (focus + tasks + game): 600px screenshot shows tacho 0/3, XP/Lvl/streak/open-leads chips, next-action list w/ due badges; XP/streak/level fns + award() wired. ✓
- **ISC-32..35** (contacts + debriefs): Merbag contact seeded; debrief modal (well/improve/followups) stores JSON in `debriefs[]` (in export). ✓ (code-verified)
- **ISC-36/37/38** (guide + salary + negotiate): Guide tabs render real Zürich numbers (GAV 5'000 floor, 5'500 anchor) + 6 negotiation rules. ✓
- **ISC-39/40** (import format + seed): `import.example.json` schema + `ingest()`; first open shows Merbag/Porsche/AMG/HV (recognition). ✓
- **ISC-41** (theme + responsive + no-motion): dark JDM/drift theme both viewports; intrinsic-width probe at 390 → nav/cockpit/statchips/actions overflow = 0; no autoplay/flash. ✓

**Live deploy ISC-6/7/8 — VERIFIED.** Pushed to `github.com/harryf/pole-position` (public). Actions:
Deploy=success, Tests=success (15/15 in CI), Release v1.0.0 cut. Live probe of
`https://harryf.github.io/pole-position/` → HTTP 200, wordmark + `APP_VERSION "1.0.0"` present, all
assets 200. Real-Chrome live render (MCP): 8 board columns, 3 seeded leads, 2 favourites starred
(★Porsche first), PP_SYNC/Peer/QRCode/jsQR all loaded, **service worker controlling the page**
(installable + offline). ✓

**Remaining real-device DEFERRED-VERIFY (not blockers, need Ben's hardware):** install-to-home-screen
on his iPhone + Windows laptop; one live two-device PeerJS pair. Follow-up: walk Ben through install &
first sync.

### v1.1.0 Verification (i18n, install, live sync, safer deletes) — `node tests/run.mjs` → 25/25

- **ISC-42/43**: all strings in `src/i18n.js`; MCP probe → default `htmlLang="en"`, greet "Hey Ben! 🏎️". ✓
- **ISC-44/45**: menu language switch → nav "Fokus/Netzwerk", greet "Hoi Ben! 🏎️" (Swiss), `htmlLang="de"`, back to "Focus". i18n test: de has no `ß`, no "Servus", greeting "Hoi". ✓
- **ISC-46/47**: tests assert en/de key parity AND all 123 literal `t()` keys in `index.html` exist + dynamic families resolve. ✓
- **ISC-48/49**: MCP → install overlay auto-shows in browser ("Install Pole Position"), dismissible; headless screenshot confirms the card over the dimmed UI; hidden when standalone; re-openable from menu. ✓
- **ISC-50**: sync sheet contains the "Where does my data live / no server ever stores it" note. ✓
- **ISC-52**: `#connDot` indicator present; `updateConnUI()` toggles connected/disconnected. ✓
- **ISC-51/53**: hello-exchange sends device name (both sides toast "connected to <device>"); `broadcast()` fires on every non-remote `save()`; receiver merges + flashes indicator. Code+single-device verified; **[DEFERRED-VERIFY]** true two-device live pair → follow-up with Ben's hardware.
- **ISC-54**: MCP → task list has 4 rows, **0** `[data-tdel]` buttons, no 🗑. (contacts likewise.) ✓
- **ISC-55/56**: delete buttons exist only inside edit modals (`#delTask/#delContact/#delLead`, danger-styled) and every handler calls `confirm()` first. ✓
- **ISC-57**: live `syncPayload()` excludes `settings`; `mergeState` keeps local settings → language/theme never clobbered by sync. ✓
- **ISC-58**: `APP_VERSION`/SW `VERSION`=="1.1.0", CHANGELOG v1.1.0 entry; tagged `v1.1.0` + Release.

## Changelog

- conjectured: PeerJS one-shot sync (send state once on connect) is enough. refuted_by: user needs
  ongoing awareness + auto-propagation, and one-shot leaves the host unaware of who connected.
  learned: model sync as a persistent channel — exchange device identity on open, re-broadcast on
  every local change, exclude device-local settings from the payload. criterion_now: ISC-51/53/57.
- conjectured: a single hardcoded-German UI fits a Swiss user. refuted_by: Ben's working language is
  Swiss German but applications/interviews are High German and he reads English fluently; "Servus" is
  German-not-Swiss and jarring. learned: externalise all strings, default English, Swiss-German locale,
  enforce parity + key-existence by test. criterion_now: ISC-42..47.

### v1.2.0 Verification (network↔job links, Focus tap-into, task notes) — 25/25 (131 t() keys)

Verified live in real Chrome (MCP, fresh v1.2.0 seed):
- **ISC-59**: contact editor shows "which jobs can this person help with?" + 3 lead checkboxes, seeded AMG checked. ✓
- **ISC-60/62**: lead detail shows "who can help here?" + contact checkboxes; linking Merbag→Porsche **from the lead side** persisted. ✓
- **ISC-61**: AMG card shows "🤝 1" (seeded); Porsche card none → "🤝 1" after the lead-side link. ✓
- **ISC-63**: Focus rows carry `data-openitem`; tapping a task body opened the task editor, a lead body opened the lead editor; ✓ still completes. ✓
- **ISC-64/65**: task editor has notes textarea (seeded note shown); list shows 📝 on the CV task. ✓
- **ISC-66**: link stored on `contact.helpsWith` (LWW sync); `helpCount()` filters deleted leads. ✓
- **ISC-67**: APP_VERSION/SW "1.2.0", CHANGELOG entry; tagged `v1.2.0` + Release.
- Regression: task/contact rows still 0 inline deletes; deletes still confirm. ✓

### v1.3.0 Verification (duplicate fix + multi-device) — `node tests/run.mjs` → 33/33 (134 t() keys)

- **ISC-68/69**: tests reproduce the bug (random ids → 6 leads on merge) AND prove the fix (stable ids → 3). Live: seed ids are `seed-lead-porsche/amg/kessel` + `seed-contact-merbag`; merging live state with a clone of itself stays **3 leads** (no duplication). ✓
- **ISC-70/71**: `dedupeByKey` unit-tested (keep newest, tombstone rest, ignore empty keys). Live: injected a manual Porsche duplicate (4 leads) → Menu cleanup removed 1 → back to 3. ✓
- **ISC-72/73**: live `settings.deviceId` = `pp-…` (stable), `deviceName` auto-generated "Ben's Mac (Chrome)", editable in sync screen. ✓
- **ISC-74/75**: `knownDevices` array; sync screen lists devices — adding `pp-testlaptop` rendered an entry with **offline** status + **Forget** button; auto-reconnect wired in boot. ✓
- **ISC-76/77**: `conns` is a map (multiple simultaneous); `broadcast()` → all open conns; `forwardExcept()` gossips a state-changing merge to other peers (idempotent → converges). Code-verified; **[DEFERRED-VERIFY]** true 3-device live mesh on real hardware.
- **ISC-78**: indicator shows `conn.connected_n` count (live `#connDot` title toggles connected/disconnected). ✓
- **ISC-79**: APP_VERSION/SW "1.3.0", CHANGELOG entry; tagged `v1.3.0` + Release.

**Note for Harry**: existing devices already carrying duplicates from v1.2.0 → after they auto-update,
run **Menu → 🧹 Clean up duplicates** once on each to collapse them.

### v1.4.0 Verification (reliable update detection) — `node tests/run.mjs` → 33/33

- **Root cause**: installed iOS PWAs resume (don't navigate), so the browser's passive SW update check rarely fires → cached old version persists.
- **ISC-80**: live — SW registered + active; `swReg` captured; `reg.update()` called on load. ✓
- **ISC-81**: `visibilitychange`+`focus` listeners call `checkForUpdates(false)` throttled (20s) → re-checks when the app is foregrounded. ✓ (code-verified; real effect is on-device.)
- **ISC-82**: live — Menu shows "⟳ Check for updates"; tapping ran `reg.update()` → toast "You're on the latest version (v1.4.0)", no false banner. ✓
- **ISC-83**: served SW has the `skip-waiting` message handler (grep); banner shown via both `controllerchange` and `updatefound→statechange(installed)` paths. ✓ (update-found path is standard SW API; **[DEFERRED-VERIFY]** real cross-version update on Ben's iPhone.)
- **ISC-84**: APP_VERSION/SW "1.4.0", CHANGELOG; tagged `v1.4.0` + Release.

**Bootstrapping caveat (important):** the auto-recheck only exists *from* 1.4.0 onward. A device still
running an older version won't auto-pull 1.4.0 (its old code lacks the fix) — get it onto 1.4.0 once
via a cold launch (fully close the PWA + reopen) or remove+re-add to home screen; updates are
automatic thereafter.
