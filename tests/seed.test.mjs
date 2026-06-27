// seed-data tests: the first-install dataset is well-formed, ids are stable &
// unique, hotness is explicit & valid, the relative-date convention is sound,
// and the new Merbag/Herr Gut tasks are present. Also guards the extraction:
// seed ids must still line up with the jobs-feed ids (anti-duplicate contract).
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import "../src/seed-data.js"; // side-effect: globalThis.PP_SEED

const SEED = globalThis.PP_SEED;
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
let pass = 0, fail = 0; const out = [];
const ok = (name, cond) => { cond ? pass++ : fail++; out.push(`  ${cond ? "✓" : "✗"} ${name}`); };

ok("PP_SEED loads", !!SEED);
const leads = (SEED && SEED.leads) || [];
const tasks = (SEED && SEED.tasks) || [];
const contacts = (SEED && SEED.contacts) || [];

// --- shape ---
ok("has leads / tasks / contacts arrays", Array.isArray(leads) && Array.isArray(tasks) && Array.isArray(contacts));
ok("has settings + meta defaults", !!(SEED && SEED.settings && SEED.meta));

// --- stable, unique ids on every record ---
const uniq = (arr) => { const ids = arr.map(r => r && r.id); return ids.every(Boolean) && new Set(ids).size === ids.length; };
ok("every lead has a unique non-empty id", uniq(leads));
ok("every task has a unique non-empty id", uniq(tasks));
ok("every contact has a unique non-empty id", uniq(contacts));
ok("ids look stable (seed- prefixed, no random uid)", [...leads, ...tasks, ...contacts].every(r => /^seed-/.test(r.id)));

// --- leads: required fields + explicit valid hotness ---
ok("every lead has company + role", leads.every(l => l.company && l.role));
const valid = new Set(["hot", "medium", "normal"]);
ok("every lead has an explicit valid hotness", leads.every(l => valid.has(l.hotness)));
ok("lead links (if set) are absolute http(s) URLs", leads.every(l => !l.link || /^https?:\/\//.test(l.link)));
// known hotness anchors (the racing/premium ones) survived the extraction
const hotById = Object.fromEntries(leads.map(l => [l.id, l.hotness]));
ok("Sauber F1 / Sportec / Emil Frey Racing are hot", ["seed-lead-sauber-f1","seed-lead-sportec","seed-lead-emilfreyracing"].every(id => hotById[id] === "hot"));
ok("AMAG Porsche / Porsche Zug are medium", ["seed-lead-amag-porsche-zh","seed-lead-porsche-zug"].every(id => hotById[id] === "medium"));

// --- relative-date convention is well-formed ("+N" | ISO | "") ---
const dateOk = (v) => v === "" || v == null || /^\+\d+$/.test(v) || /^\d{4}-\d{2}-\d{2}$/.test(v);
ok("lead nextDue values are +N | ISO | empty", leads.every(l => dateOk(l.nextDue)));
ok("task due values are +N | ISO | empty", tasks.every(t => dateOk(t.due)));

// --- tasks: valid categories/priorities + the new campaign tasks ---
const CATS = new Set(["setup","admin","skill","network","other"]);
const PRIS = new Set(["high","med","low"]);
ok("every task has a valid category", tasks.every(t => CATS.has(t.category)));
ok("every task has a valid priority", tasks.every(t => PRIS.has(t.priority)));
const taskIds = new Set(tasks.map(t => t.id));
for (const id of ["seed-task-gut-meeting","seed-task-gut-prep","seed-task-merbag-contacts","seed-task-interview-practice"])
  ok(`new task present: ${id}`, taskIds.has(id));
ok("the weekly Merbag-contacts goal is recurring", (tasks.find(t => t.id === "seed-task-merbag-contacts")||{}).recurring === true);

// --- contacts: Herr Gut added, helpsWith arrays valid against lead ids ---
ok("Herr Gut contact present", contacts.some(c => c.id === "seed-contact-gut"));
const leadIds = new Set(leads.map(l => l.id));
ok("contact helpsWith only references real lead ids", contacts.every(c => (c.helpsWith||[]).every(id => leadIds.has(id))));

// --- extraction guard: seed lead ids still match the jobs-feed ids ---
let feedIds = [];
try { feedIds = (JSON.parse(readFileSync(join(root, "jobs-feed.json"), "utf8")).jobs || []).map(j => j.id); } catch {}
ok("every jobs-feed id has a matching seed lead (anti-duplicate contract)", feedIds.length > 0 && feedIds.every(id => leadIds.has(id)));

console.log("seed:");
for (const line of out) console.log(line);
export default { pass, fail };
