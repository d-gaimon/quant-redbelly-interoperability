// A fingerprint of everything the build reads, so the audit can tell whether
// the generated files are older than their sources.
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { root } from "./paths.mjs";

const INPUTS = [
  "report/report.md",
  "report/community-summary.md",
  "research/ledger.json",
  "tools/templates/site.html",
  "tools/templates/print.html",
  "tools/templates/print.css",
  "site/assets/css/main.css",
  "tools/lib/diagrams.mjs",
];

export function inputHash() {
  const h = createHash("sha256");
  for (const f of INPUTS) h.update(readFileSync(root(f)));
  return h.digest("hex").slice(0, 16);
}
