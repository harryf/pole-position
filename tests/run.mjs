// Test runner. Aggregates suites and exits non-zero on any failure (CI gate).
import merge from "./merge.test.mjs";
import i18n from "./i18n.test.mjs";

const suites = [{ name: "merge", ...merge }, { name: "i18n", ...i18n }];
let pass = 0,
  fail = 0;
for (const s of suites) {
  pass += s.pass;
  fail += s.fail;
}

console.log("\n────────────────────────────");
console.log(`Pole Position tests: ${pass} passed, ${fail} failed`);
console.log("────────────────────────────");
process.exit(fail === 0 ? 0 : 1);
