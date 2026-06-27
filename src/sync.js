/* =========================================================================
   Pole Position — transport-agnostic sync core.
   Pure functions, zero DOM, zero deps. Works in the browser (attaches to
   window.PP_SYNC) AND in Node (module.exports) so the merge can be unit-tested
   without a browser.

   Model: every record carries { id, updatedAt (ISO string), deleted (bool) }.
   Merge is per-record Last-Write-Wins by updatedAt, tombstones win ties only
   when newer. The same merge is correct whether bytes arrive via PeerJS, a
   QR/file handoff, or a future cloud relay — the transport is just plumbing.
   ========================================================================= */
(function () {
  "use strict";

  // Collections that are arrays of records merged by id.
  const RECORD_COLLECTIONS = ["leads", "tasks", "contacts", "debriefs"];

  function uid() {
    // Sortable-ish, collision-resistant enough for a single user's two devices.
    return (
      Date.now().toString(36) +
      "-" +
      Math.random().toString(36).slice(2, 8) +
      Math.random().toString(36).slice(2, 8)
    );
  }

  function nowISO() {
    return new Date().toISOString();
  }

  // Newer wins. Missing/!valid timestamps are treated as oldest.
  function isNewer(a, b) {
    const ta = a && a.updatedAt ? Date.parse(a.updatedAt) : 0;
    const tb = b && b.updatedAt ? Date.parse(b.updatedAt) : 0;
    if (ta !== tb) return ta > tb;
    // Deterministic tie-break so two devices converge identically: tombstone
    // wins a tie (a delete that raced an edit should stick), else stable by id.
    if (!!a.deleted !== !!b.deleted) return !!a.deleted;
    return String(a.id) >= String(b.id);
  }

  // Merge two arrays of records by id, last-write-wins, keeping tombstones.
  function mergeRecords(localArr, remoteArr) {
    const byId = new Map();
    for (const r of localArr || []) if (r && r.id != null) byId.set(r.id, r);
    for (const r of remoteArr || []) {
      if (!r || r.id == null) continue;
      const cur = byId.get(r.id);
      if (!cur || isNewer(r, cur)) byId.set(r.id, r);
    }
    return Array.from(byId.values());
  }

  // Merge two whole snapshots. settings is a single LWW record.
  function mergeState(local, remote) {
    local = local || {};
    remote = remote || {};
    const out = {};
    for (const key of RECORD_COLLECTIONS) {
      out[key] = mergeRecords(local[key], remote[key]);
    }
    // settings: single record, LWW on its updatedAt.
    const ls = local.settings || {};
    const rs = remote.settings || {};
    out.settings = isNewer(rs, ls) ? rs : ls;
    // gamification meta: take the higher XP / longer streak so progress is never
    // lost on a merge (additive identity for a single human across two devices).
    const lm = local.meta || {};
    const rm = remote.meta || {};
    out.meta = Object.assign({}, lm, rm, {
      xp: Math.max(lm.xp || 0, rm.xp || 0),
      streak: Math.max(lm.streak || 0, rm.streak || 0),
      bestStreak: Math.max(lm.bestStreak || 0, rm.bestStreak || 0),
      lastActiveDay:
        (lm.lastActiveDay || "") > (rm.lastActiveDay || "")
          ? lm.lastActiveDay
          : rm.lastActiveDay,
    });
    return out;
  }

  // Strip tombstoned + non-displayable records for rendering.
  function live(arr) {
    return (arr || []).filter((r) => r && !r.deleted);
  }

  // Browser: self === window → window.PP_SYNC. Node (ESM import): self is
  // undefined → globalThis.PP_SYNC. One file, both worlds, no module syntax.
  const root = typeof self !== "undefined" ? self : globalThis;
  root.PP_SYNC = {
    RECORD_COLLECTIONS,
    uid,
    nowISO,
    isNewer,
    mergeRecords,
    mergeState,
    live,
    VERSION: "1.0.0",
  };
})();
