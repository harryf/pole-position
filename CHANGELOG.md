# Changelog

All notable changes to Pole Position. Versions are git-tagged `v*`; a tag cuts a GitHub Release.
The `VERSION` constant in `service-worker.js` and `APP_VERSION` in `index.html` must match the tag.

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
