// Verifies the research against the task's quality bar and failure criteria.
//
//   npm run audit            offline checks on the sources (always run these)
//   npm run audit:online     also fetches every source and re-checks its phrases
//   node tools/audit.mjs --built   also checks the generated files are current
//
// Writes research/AUDIT.md and exits non-zero when any check fails.
// AUDIT_DENY="name,handle" adds words that must not appear anywhere (personal credit).
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { loadLedger, citedIds } from "./lib/ledger.mjs";
import { unsourcedConfirmed, extractClaims, sentences } from "./lib/claims.mjs";
import { threadPosts, postText, xLength, X_LIMIT } from "./lib/thread.mjs";
import { root } from "./lib/paths.mjs";
import { inputHash } from "./lib/stamp.mjs";

const args = new Set(process.argv.slice(2));
const ONLINE = args.has("--online");
const BUILT = args.has("--built");

const read = (p) => readFileSync(root(p), "utf8");
const results = [];
const check = (group, name, problems, { warnOnly = false } = {}) =>
  results.push({ group, name, ok: problems.length === 0, warnOnly, problems });

const ledger = loadLedger();
const report = read("report/report.md");
const summary = read("report/community-summary.md");
const authored = { "report/report.md": report, "report/community-summary.md": summary, "research/ledger.json": read("research/ledger.json") };

// ---------- 1. ledger ----------
{
  const problems = [];
  const ids = ledger.sources.map((s) => s.id);
  if (new Set(ids).size !== ids.length) problems.push("Duplicate source ids");
  ledger.sources.forEach((s, i) => {
    if (s.id !== `S${String(i + 1).padStart(2, "0")}`) problems.push(`${s.id} is out of sequence`);
    for (const f of ["title", "publisher", "date", "url", "supports", "group"]) if (!s[f]) problems.push(`${s.id} has no ${f}`);
    if (!/^https:\/\//.test(s.url)) problems.push(`${s.id} link is not https`);
    if (!ledger.groups[s.group]) problems.push(`${s.id} has unknown group ${s.group}`);
    if (!Array.isArray(s.excerpts) || !s.excerpts.length) problems.push(`${s.id} has no phrases to check`);
  });
  const urls = ledger.sources.map((s) => s.url);
  urls.forEach((u, i) => { if (urls.indexOf(u) !== i) problems.push(`Duplicate link ${u}`); });
  check("Sources", "Ledger entries are complete, unique and use https", problems);
}

// ---------- 2. citations ----------
{
  const cited = new Set([...citedIds(report), ...citedIds(summary)]);
  const unknown = [...cited].filter((id) => !ledger.byId.has(id));
  check("Sources", "Every citation points to a source in the ledger", unknown.map((id) => `Unknown source ${id}`));
  const unused = ledger.sources.filter((s) => !cited.has(s.id)).map((s) => `${s.id} is never cited`);
  check("Sources", "Every source in the ledger is cited", unused);
}

// ---------- 3. separation of confirmed, analysis and unknown ----------
{
  const loose = unsourcedConfirmed(report).map((x) => `[${x.section}] ${x.text}`);
  check("Benchmarks", "Every paragraph in a Confirmed panel ends with its source link", loose);

  const problems = [];
  const opened = (report.match(/^::: (confirmed|analysis|unknown|notice)[ \t]*$/gm) || []).length;
  const closed = (report.match(/^:::[ \t]*$/gm) || []).length;
  if (opened !== closed) problems.push(`${opened} panels opened but ${closed} closed`);
  for (const sec of [...report.matchAll(/^##\s+(.+?)\s*\{#([\w-]+)\}/gm)]) {
    if (!/^[\w-]+$/.test(sec[2])) problems.push(`Bad section id ${sec[2]}`);
  }
  check("Benchmarks", "Status panels are balanced", problems);
}

// ---------- 4. failure criteria ----------
const NEGATION = /\b(no|not|nothing|none|never|neither|nor|without)\b/i;

function scan(text, file, test) {
  const hits = [];
  text.split("\n").forEach((line, n) => {
    for (const s of sentences(line)) {
      const why = test(s);
      if (why) hits.push(`${file}:${n + 1} ${why}: "${s.trim().slice(0, 140)}"`);
    }
  });
  return hits;
}

const generated = () => {
  const out = {};
  if (existsSync(root("deliverables"))) {
    for (const f of readdirSync(root("deliverables"))) if (/\.(md|csv|txt)$/.test(f)) out[`deliverables/${f}`] = read(`deliverables/${f}`);
  }
  if (existsSync(root("site/index.html"))) out["site/index.html"] = read("site/index.html").replace(/<script[\s\S]*?<\/script>/g, "");
  for (const f of ["README.md", "deploy/README.md"]) if (existsSync(root(f))) out[f] = read(f);
  return out;
};
const everything = () => ({ ...authored, ...generated() });

{
  // Partnership, talks or plans between Redbelly and Quant.
  const PARTNER = /\b(partner(?:ed|ing|ship|s)?|talks|negotiat\w*|collaborat\w*|working (?:together|with)|agreement|MoU|plans? to|planned|roadmap|will (?:connect|integrate|support|list|join|onboard))\b/i;
  const hits = [];
  for (const [file, text] of Object.entries(everything())) {
    hits.push(...scan(text, file, (s) =>
      /Redbelly/i.test(s) && /\bQuant\b/.test(s) && PARTNER.test(s) && !NEGATION.test(s) ? "possible partnership wording" : null));
  }
  check("Failure criteria", "No wording suggests a partnership, talks or plans between Redbelly and Quant", hits);
}
{
  // Price talk, investment advice or promised returns. Gas-fee mechanics are
  // allowed ("unit price of gas", "price oracle"); denials are allowed.
  const PRICE = /\b(token price|price of (?:RBNT|QNT|wRBNT)|price (?:target|action|prediction)|buy(?:ing)? (?:RBNT|QNT)|sell(?:ing)? (?:RBNT|QNT)|invest(?:ors?|ing)\b(?!\s+tests)|returns? on|profit|moon|pump|bullish|bearish|market ?cap|ROI|APY|APR|QNT)\b|[$€£]\s?\d|US\$\s?\d/i;
  const hits = [];
  for (const [file, text] of Object.entries(everything())) {
    hits.push(...scan(text, file, (s) => (PRICE.test(s) && !NEGATION.test(s) ? "possible price or investment talk" : null)));
  }
  check("Failure criteria", "No price talk, investment advice or promised returns", hits);
}
{
  // Personal credit: names, handles, signatures or "made by" lines.
  const deny = (process.env.AUDIT_DENY || "").split(",").map((x) => x.trim()).filter(Boolean);
  const CREDIT = /\b(made|built|created|written|prepared|authored|designed|compiled) by\b|\bauthor:|^\s*signed[:,]|(^|[\s(])@[A-Za-z0-9_]{2,}\b(?![/(])|[\w.+-]+@[\w-]+\.[a-z]{2,}/i;
  const hits = [];
  for (const [file, text] of Object.entries(everything())) {
    hits.push(...scan(text, file, (s) => {
      if (CREDIT.test(s.replace(/https?:\/\/\S+/g, ""))) return "possible personal credit";
      const d = deny.find((n) => s.toLowerCase().includes(n.toLowerCase()));
      return d ? `contains denied name "${d}"` : null;
    }));
  }
  check("Failure criteria", "No personal credit inside the deliverables", hits);
}

// ---------- 5. brand kit ----------
{
  const hits = [];
  for (const [file, text] of Object.entries(everything())) {
    text.split("\n").forEach((line, n) => {
      if (/[–—]/.test(line)) hits.push(`${file}:${n + 1} em or en dash`);
      if (/\p{Extended_Pictographic}/u.test(line.replace(/[©®™]/g, ""))) hits.push(`${file}:${n + 1} emoji`);
    });
  }
  check("Brand kit", "No em dashes, en dashes or emoji", hits);
}

// ---------- 6. community thread ----------
{
  const posts = threadPosts(summary);
  const problems = posts
    .map((p, i) => ({ i: i + 1, n: xLength(postText(p, ledger)) }))
    .filter((x) => x.n > X_LIMIT)
    .map((x) => `Post ${x.i} is ${x.n} characters as X counts them`);
  check("Deliverables", `Every X post fits in ${X_LIMIT} characters (links count as 23)`, problems);
}

// ---------- 7. built files ----------

if (BUILT) {
  const problems = [];
  const want = ["Overledger-Redbelly-Feasibility-Study.pdf", "Overledger-Redbelly-Feasibility-Study.docx", "Overledger-Redbelly-Feasibility-Study.md", "Community-Summary.md", "X-Thread.txt", "Source-List.md", "Source-List.csv", "Claims.csv"];
  for (const f of want) {
    if (!existsSync(root("deliverables", f))) problems.push(`Missing deliverables/${f}`);
    if (!existsSync(root("site/downloads", f))) problems.push(`Missing site/downloads/${f}`);
  }
  const stamp = existsSync(root("research/build-stamp.json")) ? JSON.parse(read("research/build-stamp.json")) : {};
  if (stamp.inputs !== inputHash()) problems.push("Sources changed since the last build: run npm run build");
  const html = existsSync(root("site/index.html")) ? read("site/index.html") : "";
  for (const s of ledger.sources) if (!html.includes(`id="src-${s.id}"`)) problems.push(`site/index.html lacks ${s.id}`);
  const pdf = root("deliverables", want[0]);
  if (existsSync(pdf)) {
    const text = spawnSync("pdftotext", [pdf, "-"], { encoding: "utf8" });
    if (text.status === 0) {
      if (/[–—]/.test(text.stdout)) problems.push("PDF contains an em or en dash");
      for (const s of ledger.sources) if (!text.stdout.includes(s.id)) problems.push(`PDF lacks ${s.id}`);
    }
  }
  check("Deliverables", "Generated files exist and match the current sources", problems);
}

// ---------- 8. live sources ----------
const strip = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&amp;/g, "&").replace(/&#x27;|&#39;|&rsquo;|&lsquo;|[‘’]/g, "'").replace(/&quot;|&ldquo;|&rdquo;|[“”]/g, '"')
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .toLowerCase();

async function fetchText(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 25000);
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: ctrl.signal,
      headers: { "user-agent": "Mozilla/5.0 (compatible; source-audit/1.0)", accept: "text/html,application/xhtml+xml,*/*" },
    });
    return { status: res.status, text: res.ok ? strip(await res.text()) : "" };
  } catch (e) {
    return { status: 0, error: e.cause?.code || e.cause?.message || (e.name === "AbortError" ? "timed out" : e.message) };
  } finally {
    clearTimeout(timer);
  }
}

const live = [];
if (ONLINE) {
  const problems = [];
  const manual = [];
  for (const s of ledger.sources) {
    const r = await fetchText(s.url);
    const missing = r.text ? s.excerpts.filter((x) => !r.text.includes(x.toLowerCase().replace(/[‘’]/g, "'"))) : [];
    const present = r.text && s.absent ? s.absent.filter((x) => r.text.includes(x.toLowerCase())) : [];
    const row = { id: s.id, url: s.url, status: r.status || r.error, missing, present };
    live.push(row);
    const line = `${s.id} ${s.url}`;
    if (!r.text) (s.manual ? manual : problems).push(`${line} did not load (${r.status || r.error})${s.manual ? `: ${s.manual}` : ""}`);
    else {
      if (missing.length) problems.push(`${line} no longer contains ${missing.map((x) => `"${x}"`).join(", ")}`);
      if (present.length) problems.push(`${line} now mentions ${present.map((x) => `"${x}"`).join(", ")}: re-check the report`);
    }
    process.stdout.write(".");
  }
  process.stdout.write("\n");
  check("Live sources", "Every source link loads and still contains the phrases it supports", problems);
  check("Live sources", "Sources that need a browser to confirm", manual, { warnOnly: true });
}

// ---------- report ----------
const failed = results.filter((r) => !r.ok && !r.warnOnly);
const claims = extractClaims(report);
const now = new Date().toISOString().replace("T", " ").slice(0, 16) + " UTC";
const lines = [
  "# Audit",
  "",
  `Run: ${now}. Mode: ${ONLINE ? "online (sources fetched)" : "offline"}${BUILT ? ", built files checked" : ""}.`,
  "",
  `${ledger.sources.length} sources, ${claims.length} cited claims, ${results.length} checks, ${failed.length} failed.`,
  "",
  "| Group | Check | Result |",
  "|---|---|---|",
  ...results.map((r) => `| ${r.group} | ${r.name} | ${r.ok ? "Pass" : r.warnOnly ? `Review (${r.problems.length})` : `Fail (${r.problems.length})`} |`),
  "",
];
for (const r of results.filter((x) => !x.ok)) {
  lines.push(`## ${r.name}`, "", ...r.problems.map((p) => `- ${p}`), "");
}
if (live.length) {
  lines.push("## Live source results", "", "| Source | HTTP | Phrases missing |", "|---|---|---|");
  for (const r of live) lines.push(`| ${r.id} | ${r.status} | ${r.missing.length ? r.missing.join("; ") : "none"} |`);
  lines.push("");
}
writeFileSync(root("research/AUDIT.md"), lines.join("\n"));

for (const r of results) {
  const tag = r.ok ? "PASS" : r.warnOnly ? "NOTE" : "FAIL";
  console.log(`${tag}  ${r.group}: ${r.name}`);
  if (!r.ok) r.problems.slice(0, 12).forEach((p) => console.log(`      ${p}`));
}
console.log(`\n${failed.length ? `${failed.length} check(s) failed` : "All checks passed"}. Details in research/AUDIT.md`);
process.exit(failed.length ? 1 : 0);
