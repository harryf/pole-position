// Test runner. Aggregates suites and exits non-zero on any failure (CI gate).
import merge from "./merge.test.mjs";

const suites = [{ name: "merge", ...merge }];
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
