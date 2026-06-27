// Unit tests for the transport-agnostic sync core (src/sync.js).
// Pure Node, no browser. Proves the convergence guarantees ISC-13/14 depend on.
import "../src/sync.js"; // side-effect: defines globalThis.PP_SYNC
const SYNC = globalThis.PP_SYNC;

let pass = 0,
  fail = 0;
const results = [];
function ok(name, cond) {
  if (cond) {
    pass++;
    results.push("  ✓ " + name);
  } else {
    fail++;
    results.push("  ✗ " + name);
  }
}

const t0 = "2026-06-27T10:00:00.000Z";
const t1 = "2026-06-27T11:00:00.000Z";
const t2 = "2026-06-27T12:00:00.000Z";

// --- mergeRecords: last-write-wins ---
{
  const local = [{ id: "a", v: 1, updatedAt: t0 }];
  const remote = [{ id: "a", v: 2, updatedAt: t1 }];
  const merged = SYNC.mergeRecords(local, remote);
  ok("LWW keeps the newer edit", merged.length === 1 && merged[0].v === 2);
}

// --- mergeRecords: older remote does NOT clobber newer local ---
{
  const local = [{ id: "a", v: 2, updatedAt: t2 }];
  const remote = [{ id: "a", v: 1, updatedAt: t0 }];
  const merged = SYNC.mergeRecords(local, remote);
  ok("older remote does not clobber newer local", merged[0].v === 2);
}

// --- tombstone deletes a record that exists on the other side ---
{
  const local = [{ id: "a", v: 1, updatedAt: t0 }];
  const remote = [{ id: "a", updatedAt: t1, deleted: true }];
  const merged = SYNC.mergeRecords(local, remote);
  ok("newer tombstone wins", merged[0].deleted === true);
  ok("live() hides tombstoned records", SYNC.live(merged).length === 0);
}

// --- union of disjoint records ---
{
  const local = [{ id: "a", updatedAt: t0 }];
  const remote = [{ id: "b", updatedAt: t0 }];
  const merged = SYNC.mergeRecords(local, remote);
  ok("disjoint records union together", merged.length === 2);
}

// --- commutativity: merge(a,b) === merge(b,a) by id/content ---
{
  const a = [
    { id: "x", v: 1, updatedAt: t0 },
    { id: "y", v: 9, updatedAt: t2 },
  ];
  const b = [
    { id: "x", v: 2, updatedAt: t1 },
    { id: "z", v: 5, updatedAt: t0 },
  ];
  const ab = SYNC.mergeRecords(a, b).sort((p, q) => p.id.localeCompare(q.id));
  const ba = SYNC.mergeRecords(b, a).sort((p, q) => p.id.localeCompare(q.id));
  ok("merge is commutative", JSON.stringify(ab) === JSON.stringify(ba));
  ok("commutative merge resolves x to newer (v2)", ab.find((r) => r.id === "x").v === 2);
}

// --- mergeState across collections + gamification meta ---
{
  const local = {
    leads: [{ id: "l1", updatedAt: t0 }],
    tasks: [{ id: "t1", updatedAt: t2 }],
    settings: { theme: "drift", updatedAt: t0 },
    meta: { xp: 120, streak: 3, bestStreak: 5, lastActiveDay: "2026-06-26" },
  };
  const remote = {
    leads: [{ id: "l1", updatedAt: t1, deleted: true }],
    contacts: [{ id: "c1", updatedAt: t0 }],
    settings: { theme: "porsche", updatedAt: t1 },
    meta: { xp: 80, streak: 7, bestStreak: 4, lastActiveDay: "2026-06-27" },
  };
  const m = SYNC.mergeState(local, remote);
  ok("state: newer lead tombstone applied", m.leads[0].deleted === true);
  ok("state: task carried through", SYNC.live(m.tasks).length === 1);
  ok("state: contact unioned in", SYNC.live(m.contacts).length === 1);
  ok("state: newer settings win", m.settings.theme === "porsche");
  ok("state: xp keeps the max (no progress lost)", m.meta.xp === 120);
  ok("state: streak keeps the max", m.meta.streak === 7);
  ok("state: lastActiveDay keeps the latest", m.meta.lastActiveDay === "2026-06-27");
}

// --- idempotence: merging a snapshot with itself changes nothing ---
{
  const s = [{ id: "a", v: 1, updatedAt: t1 }];
  const once = SYNC.mergeRecords(s, s);
  ok("merge is idempotent", once.length === 1 && once[0].v === 1);
}

console.log("sync core:");
console.log(results.join("\n"));
export default { pass, fail };
