# Updating Ben's jobs — the maintenance process

How to push new jobs to the app and retire dead ones. For **how to find and verify jobs**, follow
`prompt/job-search.md`; this file covers what to do with the results. Last full run: 2026-07-30.

## The three places job data lives

| File | Who gets it | When to touch it |
|---|---|---|
| `jobs-feed.json` | **Every install, automatically.** The app polls it ~daily and on Menu → 🔥 Check for new jobs. | Every refresh. This is the primary channel. |
| `src/seed-data.js` | **Fresh installs only** (seed runs once, on empty storage). | When a seeded lead dies or its link goes stale. |
| `import.example.json` | Nobody automatically; it is the bulk-import example. | Keep it consistent when you change the other two. |

## Adding new jobs

1. Research and verify per `prompt/job-search.md` (deep links, German titles verbatim, curl 200 +
   title in the served HTML).
2. Append each job to the `jobs` array in `jobs-feed.json` with a **new, stable, descriptive id**:
   `feed-YYYY-MM-<employer-slug>`, e.g. `feed-2026-07-amag-porsche-schlieren`.
   - **Never reuse an id for a different job. Never change an id once pushed.** The id is the
     anti-duplicate key: the app adds a job only if it has never seen that id, so a deleted job
     never reappears.
   - Set `hotness` (`hot` = motorsport/F1, `medium` = premium brand, `normal` = standard garage),
     `priority` 1–5, at most 2–4 `favourite: true` per refresh, `nextDue` = application deadline.
3. Bump the top-level `"updated"` date.
4. `node tests/run.mjs` — the feed tests enforce shape, unique ids, hotness values, absolute links.
5. Commit and push to `main`. **A feed-only change needs no version bump** (the service worker
   fetches `jobs-feed.json` network-first, never from cache).
6. Verify live: `curl -s "https://harryf.github.io/pole-position/jobs-feed.json?cb=$RANDOM"` shows
   the new `updated` date and job count. Done — Ben's app picks it up on next open.

## Removing or archiving old jobs

The feed is **additive**: it can add cards to Ben's board but never remove them. So retiring a job
has two halves:

- **In the repo** (stops new installs and not-yet-synced devices from getting it):
  - Posting confirmed dead (404/410, or the page says closed): delete its entry from
    `jobs-feed.json`, and if it is a seed lead also from `src/seed-data.js` and
    `import.example.json`. Check `helpsWith` arrays in the seed contacts for references to a
    removed lead id (a test catches this).
  - Link stale but the employer/role still worth watching: **keep the id**, repoint `link` to the
    employer's live posting or careers page, and say what happened in `notes` (see the Sauber →
    audif1.com example from 2026-07-30).
- **On Ben's devices** (existing installs already imported the card): tell Harry which cards died.
  Ben deletes them by hand: card → edit → delete → confirm. Sync propagates the delete (tombstone),
  and because the id stays known, the feed will not re-add it even if the entry is still there.

There is no archive stage in the app; "archiving" = moving the card to stage `closed` on-device, or
deleting it. In the repo, the changelog entry is the archive.

## Version bump or not?

- `jobs-feed.json`, `prompt/*`, `README.md`, `import.example.json` only → **no bump**, plain commit.
- Anything the service worker caches (`index.html`, `src/seed-data.js`, `src/*.js`,
  `service-worker.js`, icons) → full release: bump `APP_VERSION` (index.html) + `VERSION`
  (service-worker.js), add a `CHANGELOG.md` entry, push, then `git tag vX.Y.Z && git push origin vX.Y.Z`.

## Checklist per refresh

- [ ] New jobs researched + verified per `prompt/job-search.md` (record the verification date in the commit).
- [ ] Existing feed/seed links re-checked; dead ones removed, stale ones repointed (keep ids).
- [ ] Ids new + stable; `updated` bumped; `node tests/run.mjs` green.
- [ ] Pushed; live feed URL serves the new `updated` + count; CI green.
- [ ] Harry told: what was added, what died (for manual deletion on Ben's board), any watch items,
      and the nearest application deadlines.
