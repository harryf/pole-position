// jobs-feed.json tests: valid shape, unique stable ids, required fields, valid hotness.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
let pass = 0, fail = 0; const out = [];
const ok = (name, cond) => { cond ? pass++ : fail++; out.push(`  ${cond ? "✓" : "✗"} ${name}`); };

let feed = null, parseErr = null;
try { feed = JSON.parse(readFileSync(join(root, "jobs-feed.json"), "utf8")); }
catch (e) { parseErr = e.message; }

ok("jobs-feed.json parses as JSON", !parseErr);
if (feed) {
  ok('format is "pole-position-feed@1"', feed._format === "pole-position-feed@1");
  ok("has a jobs array", Array.isArray(feed.jobs));

  const jobs = feed.jobs || [];
  ok("feed has at least one job", jobs.length > 0);

  // every job has a non-empty id
  ok("every job has a non-empty id", jobs.every(j => j && typeof j.id === "string" && j.id.length > 0));

  // ids are unique (the anti-duplicate guarantee)
  const ids = jobs.map(j => j && j.id);
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  ok("job ids are unique (no duplicates on import)", dupes.length === 0);
  if (dupes.length) out.push("    duplicate ids: " + [...new Set(dupes)].join(", "));

  // every job has the fields the board needs
  ok("every job has company + role", jobs.every(j => j.company && j.role));

  // hotness, when present, is one of the three levels
  const valid = new Set(["hot", "medium", "normal"]);
  ok("hotness (if set) is hot|medium|normal", jobs.every(j => j.hotness == null || valid.has(j.hotness)));

  // links, when present, are absolute URLs (deep links, not bare portals is a research concern, not testable here)
  ok("links (if set) are absolute http(s) URLs", jobs.every(j => !j.link || /^https?:\/\//.test(j.link)));
}

console.log("feed:");
for (const line of out) console.log(line);
export default { pass, fail };
