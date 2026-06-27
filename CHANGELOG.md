# Changelog

All notable changes to Pole Position. Versions are git-tagged `v*`; a tag cuts a GitHub Release.
The `VERSION` constant in `service-worker.js` and `APP_VERSION` in `index.html` must match the tag.

## v1.6.0 — 2026-06-27

Lets Ben open the actual job posting for each lead.

- **"View posting" button** — every job lead now has a one-tap link to its real posting:
  a **↗** button on the Board card (opens directly), and a labelled **↗ View posting** button next to
  the link field in the lead editor. Shown only when the lead has a link.
- **Researched + verified links for all 13 positions** (checked live on 2026-06-27): 8 point at the
  specific live posting (AMAG Porsche Zürich, Sportec, Sauber/Audi F1 trainee, Emil Frey Racing,
  Porsche Zug, Eugster, Seegarage, Karl Graf), the other 5 at a durable employer careers page or a
  jobs.ch search that always resolves (where the specific posting had already expired — postings age
  fast). Verified links are in `seed()` and `import.example.json`.
- Note surfaced during verification: the **Porsche Zug** role onboards in Rotkreuz, then becomes a
  permanent post in **Kriens (LU)** from Q4 2026 — added to its notes.

## v1.5.0 — 2026-06-27

Populates the app from Benjamin's real job-market research (June 2026).

- **Board pre-loaded with real open positions**: the seed leads are now the actual researched
  vacancies within ~30 min of home, closest first — AMAG Porsche Zürich/Altstetten/Schlieren,
  Sauber/Audi F1 trainee (Hinwil), Sportec (apply by 13 Jul), Emil Frey, Eugster, Kanton Zürich,
  Seegarage Müller, Karl Graf, Porsche Zug (already applied → "Applied" stage) and Emil Frey Racing.
  **Job titles are kept in German on purpose**; each lead carries the employer's link, commute time,
  a realistic salary target and a next action.
- **Three new Guide sections** (translated EN + DE):
  - **Employers** — the premium groups worth watching (AMAG, Sportec, Emil Frey, Hedin, Binelli,
    Th. Willy, Merbag) plus the motorsport employers, each linking to its own jobs page so he can
    check live openings himself.
  - **Career paths** — first-job band (~CHF 65–73k), 5-year outlook (~82–88k) and the Swiss ladder
    with the **Automobildiagnostiker (eidg. Fachausweis)** route highlighted as the best-subsidised
    next step, ending in a sensible 0→5-year sequence.
  - **Motorsport** — the Audi F1 / Sauber trainee track, Emil Frey Racing (Ferrari 296 GT3) and
    Sportec, with how his AMG + HV profile maps to each and how to stand out.
- **import.example.json refreshed** with the full set of real positions + tasks, so an
  already-installed phone can pull them in via Menu → Import (seed only fills a fresh install).

## v1.4.0 — 2026-06-27

Makes the installed PWA reliably pick up updates.

- **Why it was needed**: an installed iOS home-screen PWA *resumes* its page instead of navigating,
  so the browser's passive service-worker update check almost never fired — the phone kept serving
  the cached old version.
- **Fix**: the app now actively asks the browser to check — on load, and (throttled) every time the
  app returns to the foreground (`visibilitychange`/`focus`). This transparently catches the
  "reopened from the home screen" case.
- **Manual control**: Menu → **⟳ Check for updates** forces a check and tells you whether you're on
  the latest version or an update is downloading. The existing "Update available" banner still shows
  (no surprise reloads); tap it to reload into the new version.
- The service worker accepts a skip-waiting message so a found update can activate immediately.
- iOS caveat: if it still won't update, fully closing the app (swipe it away in the app switcher) and
  reopening forces it — an Apple limitation, not a bug.

## v1.3.0 — 2026-06-27

Fixes duplicate entries on sync, and adds a real multi-device manager.

- **Duplicate fix (root cause)**: the starter data used random IDs generated per device, so a
  first-time sync merged two *different-ID* copies of the same seed → duplicates. Seed entries now
  use **stable, deterministic IDs**, so they merge to one. Every record already carried an `id` +
  `updatedAt`; merge stays last-write-wins. Tests reproduce the bug and prove the fix.
- **Clean up duplicates**: Menu → 🧹 collapses entries with the same name (lead company+role, task
  title, contact name+company), keeping the most-recently-edited — for data already duplicated by an
  older version. Confirms first.
- **Multi-device manager**: each device now has a **stable ID** and an **auto-generated name** (from
  device/browser, editable). Paired devices are **remembered** and **auto-reconnect** on open. The
  sync screen lists **your devices** with online/offline status, a **Forget** button, and an **Add a
  device** field + QR of this device's code. A device can pair with **several** at once (e.g. phone ↔
  two laptops); changes broadcast to all and gossip onward so everyone converges.
- The connection indicator shows how many devices are connected.

## v1.2.0 — 2026-06-27

Network ↔ jobs relationships, tappable Focus items, and task notes.

- **Network ↔ job links**: a contact can be marked as able to help with one or more jobs. Edit the
  link from either side — checkboxes in the contact editor ("which jobs can this person help with?")
  or in the job detail ("who in your network can help here?"). The board card shows a 🤝 badge with
  the helper count, and the Network list shows how many jobs each contact supports. Stored on the
  contact record (syncs via last-write-wins); deleted leads are ignored.
- **Tappable Focus items**: tapping a next-action now opens the underlying task or job (so you can see
  details / notes); the ✓ still completes a task in one tap.
- **Task notes**: tasks now have a notes field in the editor, with a 📝 indicator in the list.
- Seeded link: the Merbag reference is pre-linked to the Mercedes-AMG lead as a live example.

## v1.1.0 — 2026-06-27

Internationalisation, install guide, live sync UX, and safer deletes.

- **i18n**: all UI strings moved to a single translations file (`src/i18n.js`); **defaults to English**;
  switch language in Settings. German locale is **Swiss High German** (Hoi/Grüezi, no `ß`) — "Servus" gone.
  Tests enforce en/de key parity and that every `t()` key used in the app exists.
- **Install guide**: a dismissible overlay explains how to install the PWA (iOS Share → Add to Home
  Screen; desktop Install button / address-bar icon). Auto-shows in a browser, hidden once installed,
  re-openable from the menu.
- **Live two-way sync**: pairing now exchanges device names, so **both** devices show a "connected to
  <device>" state; a header indicator shows live/connected status; once paired, changes on one device
  **auto-sync** to the other. Theme/language stay device-local (not synced).
- **Sync screen** now explains where data lives: local-first, peer-to-peer over encrypted WebRTC, no
  server ever stores it.
- **Safer deletes**: removed the inline delete button from task and contact rows (accidental-tap
  hazard); delete now lives only inside the edit screen and **always asks for confirmation** (tasks,
  contacts, and leads).

## v1.0.0 — 2026-06-27

First release. Benjamin's drift-spec job-hunt cockpit.

- **Focus view** (mobile-first): tachometer momentum gauge, XP / level / streak, and a single
  "what now" list combining lead next-actions and due tasks. Tap ✓ to complete and earn XP.
- **Board view** (desktop): Kanban across 8 stages (Recherche → Angebot/Verhandlung → Abgeschlossen),
  drag-and-drop on desktop + stage dropdown everywhere, favourite-employer prioritisation, per-stage
  good-practice guidance, full lead detail editor.
- **Tasks**: general (non-application) to-do list with categories, priority, due dates, recurring flag.
- **Network**: contacts / referral tracker (seeded with the Merbag reference).
- **Debriefs**: post-interview reflection (what went well / what to improve / follow-ups), thumb-
  dictatable, stored as structured JSON inside the export for later LLM analysis.
- **Guide**: first-job playbook, real Zürich salary expectations (GAV floor CHF 5'000 ×13;
  anchor ask CHF 5'500 ×13 ≈ 71.5k), and a 6-rule negotiation guide.
- **Gamification**: XP per action, daily streak, level curve, rev-counter gauge.
- **Sync**: transport-agnostic last-write-wins merge — PeerJS live pairing (code + QR) when both
  devices are online, JSON file export/import as the always-available fallback.
- **Import**: bulk-add leads + tasks from a documented JSON file (`import.example.json`).
- **PWA**: installable on iOS (Add to Home Screen) and Windows; offline after first load; clean
  "Update available" banner on new versions (no surprise reload).
- Seeded with Benjamin's real profile (Merbag, AMG/HV experience, Porsche/AMG/Kessel target leads).
