# Changelog

All notable changes to Pole Position. Versions are git-tagged `v*`; a tag cuts a GitHub Release.
The `VERSION` constant in `service-worker.js` and `APP_VERSION` in `index.html` must match the tag.

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
