// i18n tests: locale parity, key-usage coverage, Swiss-German conventions.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import "../src/i18n.js"; // side-effect: globalThis.PP_I18N
const I = globalThis.PP_I18N;
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

let pass = 0, fail = 0; const out = [];
const ok = (name, cond) => { cond ? pass++ : fail++; out.push(`  ${cond ? "✓" : "✗"} ${name}`); };

// flatten nested locale object to dotted keys
function flat(obj, prefix = "", acc = []) {
  for (const k of Object.keys(obj)) {
    const v = obj[k], key = prefix ? prefix + "." + k : k;
    if (v && typeof v === "object" && !Array.isArray(v)) flat(v, key, acc);
    else acc.push(key);
  }
  return acc;
}

const enKeys = flat(I.DICT.en).sort();
const deKeys = flat(I.DICT.de).sort();

// ISC-46: identical key sets
const missingInDe = enKeys.filter(k => !deKeys.includes(k));
const missingInEn = deKeys.filter(k => !enKeys.includes(k));
ok("en and de have identical key sets", missingInDe.length === 0 && missingInEn.length === 0);
if (missingInDe.length) out.push("    missing in de: " + missingInDe.join(", "));
if (missingInEn.length) out.push("    missing in en: " + missingInEn.join(", "));

// ISC-43: default language is English
ok("default language is en", I.default === "en");

// ISC-45: Swiss conventions — no ß anywhere in de, no "Servus", greeting is Swiss
const deBlob = JSON.stringify(I.DICT.de);
ok("de locale uses no ß (Swiss)", !deBlob.includes("ß"));
ok('de locale has no "Servus"', !/servus/i.test(deBlob));
ok('de greeting is Swiss ("Hoi")', I.DICT.de.focus.greet.startsWith("Hoi"));

// ISC-47: every literal t('key') used in index.html exists in en
const html = readFileSync(join(root, "index.html"), "utf8");
const used = new Set();
const re = /[^\w]t\(\s*(['"])([\w.]+)\1\s*[),]/g; // only complete string literals (skips t('x.'+k))
let m; while ((m = re.exec(html))) used.add(m[2]);
const enFlatSet = new Set(enKeys);
const unknown = [...used].filter(k => !enFlatSet.has(k));
ok(`all ${used.size} literal t() keys in index.html exist (${unknown.length} unknown)`, unknown.length === 0);
if (unknown.length) out.push("    unknown keys: " + unknown.join(", "));

// dynamic key families that index.html builds at runtime (t('stages.'+k+'.label'), etc.)
const STAGE_KEYS = ["researching","resume","cover","applied","contacted","interviewing","offer","closed"];
const CAT_KEYS = ["setup","admin","skill","network","other"];
const THEMES = ["drift","porsche","amg","mblue"];
function exists(lang, key) { return I.lookup(lang, key) != null; }
let dynOk = true;
for (const lang of ["en","de"]) {
  for (const s of STAGE_KEYS) { if (!exists(lang, `stages.${s}.label`) || !exists(lang, `stages.${s}.tip`)) dynOk = false; }
  for (const c of CAT_KEYS) { if (!exists(lang, `cats.${c}`)) dynOk = false; }
  for (const th of THEMES) { if (!exists(lang, `themes.${th}`)) dynOk = false; }
  for (const g of ["guide.pipeline_html","guide.salary_html","guide.negotiate_html"]) { if (!exists(lang, g)) dynOk = false; }
}
ok("all dynamic key families (stages/cats/themes/guide) resolve in both locales", dynOk);

// interpolation works
I.setLang("en");
ok("interpolation fills {name}", I.t("focus.greet", { name: "Ben" }).includes("Ben"));
I.setLang("de");
ok("switching to de changes output", I.t("nav.network") === "Netzwerk");
I.setLang("xx");
ok("unknown lang falls back to en", I.getLang() === "en");

console.log("i18n:");
console.log(out.join("\n"));
export default { pass, fail };
