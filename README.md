# 🏁 Pole Position

**Benjamin's drift-spec job-hunt cockpit.** A single-file, installable PWA that turns a first-time
job search into something with a clear next lap — themed like the cars he loves, syncing between his
iPhone (in the workshop) and his Windows laptop (at home). His data lives only on his devices.

🔗 **Live:** https://harryf.github.io/pole-position/

## What it does

- **Fokus** (phone) — the single next thing to do, a rev-counter for today's momentum, XP + streak.
- **Board** (laptop) — a Kanban of every application through 8 stages, dream employers flagged,
  each stage carrying good-practice guidance.
- **Tasks** — general setup/admin/network to-dos, separate from any one application.
- **Netzwerk** — contacts & referrals (his Merbag network is the turbo).
- **Debriefs** — quick post-interview reflection, dictatable, stored for later analysis.
- **Guide** — first-job playbook, real Zürich salary numbers, and a salary-negotiation guide.

## Install

- **iPhone:** open the link in Safari → Share → *Zum Home-Bildschirm*. Launches full-screen, works offline.
- **Windows:** open the link in Edge/Chrome → install icon in the address bar (or ⋮ → *App installieren*).

## Sync between phone & laptop

Both devices online → open **⇄ → Code erzeugen** on one, enter/scan the code on the other → live
two-way sync. Not both online → **Export** a JSON file on one device and **Import** it on the other.
Either way a last-write-wins merge keeps both devices consistent and never loses XP/streak.

## Add jobs in bulk

Drop found jobs and to-dos into a JSON file (see [`import.example.json`](./import.example.json)) and
**Menü → Import**. Format: `{ "_format":"pole-position-import@1", "leads":[…], "tasks":[…] }`.
Stages: `researching · resume · cover · applied · contacted · interviewing · offer · closed`.

## Architecture

- Buildless **single `index.html`** (no framework, no build step) + `manifest.webmanifest` +
  `service-worker.js`. Vendored libs in `vendor/` (PeerJS, qrcode, jsQR). Sync core in `src/sync.js`.
- Persistence: `localStorage`. Sync: transport-agnostic per-record LWW + tombstones (`src/sync.js`).
- **No backend.** Static hosting on GitHub Pages; all personal data stays client-side.

## Develop

```bash
node tests/run.mjs       # sync-merge unit suite (the convergence guarantees)
# serve locally for the service worker / PeerJS:
python3 -m http.server 8000   # then open http://localhost:8000
```

Release: bump `APP_VERSION` (index.html) + `VERSION` (service-worker.js) + `CHANGELOG.md`, push to
`main` (auto-deploys to Pages), then `git tag vX.Y.Z && git push --tags` (cuts a GitHub Release).

The full spec / design rationale lives in [`ISA.md`](./ISA.md).
