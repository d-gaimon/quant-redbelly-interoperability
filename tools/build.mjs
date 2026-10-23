// Builds every deliverable from report/*.md and research/ledger.json:
//   site/index.html            the web page (plus site/downloads/*)
//   deliverables/*.pdf|docx    the report as PDF and Word
//   deliverables/*.md|csv|txt  Markdown copies, source list, claims table, X thread
// Needs pandoc and Playwright's Chromium. Run with: npm run build
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, statSync, rmSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { loadLedger, citationIndex, replaceCitations } from "./lib/ledger.mjs";
import { prepare, pandoc, headings } from "./lib/render.mjs";
import { diagramHtml, DIAGRAMS } from "./lib/diagrams.mjs";
import { threadPosts, postText, xLength, paragraphsPart, X_LIMIT } from "./lib/thread.mjs";
import { extractClaims } from "./lib/claims.mjs";
import { root } from "./lib/paths.mjs";
import { inputHash } from "./lib/stamp.mjs";

const NAME = "Overledger-Redbelly-Feasibility-Study";
const FILES = {
  pdf: `${NAME}.pdf`,
  docx: `${NAME}.docx`,
  md: `${NAME}.md`,
  summary: "Community-Summary.md",
  thread: "X-Thread.txt",
  sourcesMd: "Source-List.md",
  sourcesCsv: "Source-List.csv",
  claimsCsv: "Claims.csv",
};

const read = (p) => readFileSync(root(p), "utf8");
const write = (p, s) => { mkdirSync(root(p, ".."), { recursive: true }); writeFileSync(root(p), s); };
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const fill = (tpl, map) => tpl.replace(/\{\{(\w+)\}\}/g, (_, k) => (k in map ? map[k] : `{{${k}}}`));

const ledger = loadLedger();
const reportMd = read("report/report.md");
const summaryMd = read("report/community-summary.md");
const sections = headings(reportMd);
const index = citationIndex(reportMd);
const cutoffHuman = new Date(`${ledger.cutoff}T00:00:00Z`).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const pad = (n) => String(n).padStart(2, "0");

const citeHtml = (s) => `<a class="cite" href="${esc(s.url)}" data-src="${s.id}">${s.id}</a>`;
const citeTokens = (text) => replaceCitations(text, ledger, citeHtml, "");

// ---------- shared HTML body ----------
function reportFragment() {
  let html = pandoc(prepare(reportMd, ledger, "html"), ["-t", "html5", "--section-divs", "--wrap=none"]);
  html = html.replace(/<div data-diagram-slot="(\w+)">\s*<\/div>/g, (_, name) => diagramHtml(name, citeTokens));
  html = html.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, "</table></div>");
  html = html.replace(/<colgroup>[\s\S]*?<\/colgroup>/g, ""); // let tables size to their content
  let n = 0;
  html = html.replace(/<h2>/g, () => `<h2 data-split><span class="h-num">${pad(++n)}</span>`);
  return html;
}

function panelCounts(md) {
  const count = (k) => (md.match(new RegExp(`^::: ${k}[ \\t]*$`, "gm")) || []).length;
  return { confirmed: count("confirmed"), analysis: count("analysis"), unknown: count("unknown") };
}

function tocItems() {
  return sections.map((s) => `<li><a href="#${s.id}">${esc(s.title)}</a></li>`).join("");
}

// ---------- Markdown, CSV and text deliverables ----------
function sourcesMarkdown(claims) {
  const lines = [
    "# Source list",
    "",
    `Feasibility research: could Redbelly plug into Quant's Overledger? Research cut-off: ${cutoffHuman}.`,
    "",
    "Part 1 lists every claim in the report that cites a source, with its label and links. Part 2 lists every source, what it supports, and the exact phrases `npm run audit -- --online` re-checks on the live page.",
    "",
    "Labels: **Confirmed** is stated in the linked source. **Analysis** is reasoning built on the linked sources. **Unknown** names a gap; any link shows where the question was checked. **Context**, **Definition** and **Method** lines frame the report.",
    "",
    `## Part 1: claims and their sources (${claims.length})`,
    "",
    "| # | Section | Label | Claim | Sources |",
    "|---|---|---|---|---|",
    ...claims.map((c) => `| ${c.id} | ${c.section} | ${c.status} | ${c.text.replace(/\|/g, "/")} | ${c.sources.map((id) => `[${id}](${ledger.byId.get(id).url})`).join(" ")} |`),
    "",
    `## Part 2: sources (${ledger.sources.length})`,
    "",
  ];
  for (const s of ledger.sources) {
    const cited = (index.get(s.id) || []).map((c) => c.title).join("; ") || "Community summary";
    lines.push(
      `### ${s.id}. ${s.title}`,
      "",
      `- Publisher: ${s.publisher}`,
      `- Date: ${s.date}`,
      `- Link: <${s.url}>`,
      `- Supports: ${s.supports}`,
      `- Phrases checked: ${s.excerpts.map((x) => `"${x}"`).join(", ")}${s.absent ? `; must not contain: ${s.absent.map((x) => `"${x}"`).join(", ")}` : ""}`,
      ...(s.manual ? [`- Note: ${s.manual}`] : []),
      `- Cited in: ${cited}`,
      "",
    );
  }
  return lines.join("\n");
}

const csvCell = (v) => `"${String(v).replace(/"/g, '""')}"`;
const csv = (rows) => rows.map((r) => r.map(csvCell).join(",")).join("\n") + "\n";

function sourcesCsv() {
  return csv([
    ["id", "group", "title", "publisher", "date", "url", "supports", "phrases_checked", "cited_in"],
    ...ledger.sources.map((s) => [s.id, ledger.groups[s.group], s.title, s.publisher, s.date, s.url, s.supports, s.excerpts.join(" | "), (index.get(s.id) || []).map((c) => c.title).join(" | ")]),
  ]);
}

function claimsCsv(claims) {
  return csv([
    ["claim", "section", "label", "text", "source_ids", "source_urls"],
    ...claims.map((c) => [c.id, c.section, c.status, c.text, c.sources.join(" "), c.sources.map((id) => ledger.byId.get(id).url).join(" ")]),
  ]);
}

function summaryMarkdown(posts) {
  const linked = (md) => replaceCitations(md, ledger, (s) => `[${s.id}](${s.url})`);
  return [
    "# Community summary",
    "",
    `Could Redbelly plug into Quant's Overledger? Plain-language summary of the feasibility research. Research cut-off: ${cutoffHuman}. Redbelly and Quant have no announced partnership, talks or plans.`,
    "",
    "## X thread",
    "",
    `Ready to post. Links are written out in full; X counts each one as 23 characters, and every post below is within ${X_LIMIT}.`,
    "",
    ...posts.flatMap((p) => {
      const text = postText(p, ledger);
      return [text, "", `<sub>${xLength(text)} / ${X_LIMIT}</sub>`, ""];
    }),
    "## In a few paragraphs",
    "",
    linked(paragraphsPart(summaryMd)),
    "",
  ].join("\n");
}

function reportMarkdown() {
  const body = prepare(reportMd, ledger, "md");
  return [
    "# Could Redbelly plug into Quant's Overledger?",
    "",
    `Feasibility research for the Redbelly DAO Community Task Board (TASK-29). Research cut-off: ${cutoffHuman}.`,
    "",
    "This is the Markdown copy of the report. The designed PDF and Word versions are in the same folder, and the full source list is in `Source-List.md`.",
    "",
    body.replace(/\s*\{#[\w-]+\}/g, ""),
  ].join("\n");
}

// ---------- browser work (PDF, PNG diagrams, social card) ----------
async function browser() {
  let mod;
  try { mod = await import("playwright"); } catch {
    try { mod = await import("playwright-core"); } catch {
      throw new Error("Playwright is required for the PDF: npm install, then npm run build");
    }
  }
  return mod.chromium.launch();
}

async function renderPdf(page, fragment) {
  const sourcesHtml = ledger.sources
    .map((s) => `<div class="ps" id="ps-${s.id}"><span class="ps-id">${s.id}</span><div>
      <h4>${esc(s.title)}</h4>
      <p class="ps-meta">${esc(s.publisher)} / ${esc(s.date)}</p>
      <p>${esc(s.supports)}</p>
      <p class="ps-url"><a href="${esc(s.url)}">${esc(s.url)}</a></p>
      <p class="ps-phr">Phrases checked: ${s.excerpts.map((x) => `"${esc(x)}"`).join(", ")}</p></div></div>`)
    .join("");
  const html = fill(read("tools/templates/print.html"), {
    SITE: pathToFileURL(root("site")).href,
    CUTOFF_HUMAN: cutoffHuman,
    SOURCE_COUNT: ledger.sources.length,
    TOC: tocItems() + `<li><a href="#sources">Source list</a></li>`,
    CONTENT: fragment,
    SOURCES_NUM: pad(sections.length + 1),
    SOURCES: sourcesHtml,
  });
  write("build/print/index.html", html);
  copyFileSync(root("tools/templates/print.css"), root("build/print/print.css"));
  await page.goto(pathToFileURL(root("build/print/index.html")).href, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({
    path: root("deliverables", FILES.pdf),
    printBackground: true,
    preferCSSPageSize: true,
    displayHeaderFooter: true,
    headerTemplate: "<span></span>",
    footerTemplate: `<div style="width:100%;padding:0 17mm;font:7px monospace;color:#4E606C;display:flex;justify-content:space-between"><span>Could Redbelly plug into Quant's Overledger? Feasibility research, cut-off ${ledger.cutoff}</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
    tagged: true,
    outline: true,
  });
}

async function renderDiagrams(page) {
  const figures = DIAGRAMS.map((name) => diagramHtml(name, citeTokens)).join("\n");
  write("build/diagrams/index.html", `<!doctype html><html data-theme="light"><head><meta charset="utf-8">
    <link rel="stylesheet" href="${pathToFileURL(root("site/assets/css/main.css")).href}">
    <style>body{background:#fff;padding:12px;width:860px}.dg{margin:0 0 24px;background:#fff}</style></head>
    <body><div class="report">${figures}</div></body></html>`);
  await page.setViewportSize({ width: 900, height: 1200 });
  await page.goto(pathToFileURL(root("build/diagrams/index.html")).href, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  for (const name of DIAGRAMS) {
    await page.locator(`[data-diagram="${name}"]`).screenshot({ path: root("build/diagrams", `${name}.png`) });
  }
}

async function renderOg(page) {
  write("build/og/index.html", `<!doctype html><html data-theme="dark"><head><meta charset="utf-8">
    <link rel="stylesheet" href="${pathToFileURL(root("site/assets/css/main.css")).href}">
    <style>
      body{margin:0;width:1200px;height:630px;overflow:hidden;background:#0c1317;display:flex;flex-direction:column;justify-content:space-between;padding:64px 72px;box-sizing:border-box;position:relative}
      body::before{content:"";position:absolute;right:-220px;top:-240px;width:760px;height:760px;background:radial-gradient(circle,rgba(239,83,80,.24),transparent 62%)}
      .row{display:flex;justify-content:space-between;align-items:center;position:relative}
      img{height:84px}
      h1{font-size:68px;line-height:1.02;letter-spacing:-.035em;margin:0;max-width:960px;position:relative}
      h1 em{font-style:normal;background:linear-gradient(#EF5350,#EF5350) 0 92%/100% .12em no-repeat}
      .tags{display:flex;gap:10px;position:relative}
      .tags span{font:600 18px var(--mono);border:1px solid #34444f;border-radius:99px;padding:10px 16px;color:#c2ced6}
      .tags span:first-child{color:#ffb3ae;border-color:#7a3533}
    </style></head><body>
    <div class="row"><img src="${pathToFileURL(root("site/assets/img/dao-logo-on-dark.png")).href}" alt=""><span class="eyebrow"><span>TASK-29</span></span></div>
    <h1>Could Redbelly plug into <em>Quant's Overledger?</em></h1>
    <div class="tags"><span>Feasibility research</span><span>${ledger.sources.length} sources</span><span>Confirmed / Analysis / Unknown</span></div>
    </body></html>`);
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.goto(pathToFileURL(root("build/og/index.html")).href, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: root("site/assets/img/og.png") });
}

function renderDocx() {
  const front = [
    "---",
    `title: "Could Redbelly plug into Quant's Overledger?"`,
    `subtitle: "Feasibility research for the Redbelly DAO Community Task Board (TASK-29)"`,
    `date: "Research cut-off: ${cutoffHuman}"`,
    "---",
    "",
  ].join("\n");
  const sourcesSection = [
    "",
    "## Source list {#sources}",
    "",
    "Every factual claim in this report links to one of these sources.",
    "",
    ...ledger.sources.map((s) => `- **${s.id}.** ${s.title}. ${s.publisher}, ${s.date}. <${s.url}>`),
    "",
  ].join("\n");
  const md = front + prepare(reportMd, ledger, "docx", { diagramPng: (n) => root("build/diagrams", `${n}.png`) }) + sourcesSection;
  pandoc(md, ["-t", "docx", "--reference-doc", root("tools/templates/reference.docx"), "-o", root("deliverables", FILES.docx)]);
}

// ---------- the web page ----------
function siteHtml(posts, sizes) {
  const counts = panelCounts(reportMd);
  const quantPages = ledger.sources.filter((s) => s.absent).length;
  const stat = (n, text, cite) => `<div class="stat"><span class="stat-n" data-count="${n}">${n}</span><span class="stat-t">${text}</span>${citeTokens(cite)}</div>`;
  const stats = [
    stat(6, "blockchain families Overledger lets accounts add themselves, EVM among them", "{S07}"),
    stat(2, "documented routes onto Overledger's Connectors: self-serve or managed engagement", "{S07}"),
    stat(3, "base chains Fusion Rollup connected at testnet launch, none of them Redbelly", "{S11}"),
    stat(0, `of the ${quantPages} Overledger documentation pages in this report that name Redbelly`, "{S07}"),
  ].join("");

  const groups = Object.entries(ledger.groups);
  const filters = [`<button type="button" data-group="all" aria-pressed="true">All ${ledger.sources.length}</button>`]
    .concat(groups.map(([k, v]) => `<button type="button" data-group="${k}" aria-pressed="false">${esc(v)} ${ledger.sources.filter((s) => s.group === k).length}</button>`))
    .join("");
  const cards = ledger.sources
    .map((s) => {
      const cited = index.get(s.id) || [];
      return `<article class="src" id="src-${s.id}" data-group="${s.group}">
        <div class="src-top"><span class="id">${s.id}</span><span>${esc(ledger.groups[s.group])}</span></div>
        <h3><a href="${esc(s.url)}" rel="noopener" target="_blank">${esc(s.title)}</a></h3>
        <p class="url">${esc(s.publisher)} / ${esc(s.date)}<br>${esc(s.url)}</p>
        <p>${esc(s.supports)}</p>
        <div class="phr">${s.excerpts.map((x) => `<code>${esc(x)}</code>`).join("")}${s.absent ? s.absent.map((x) => `<code>not: ${esc(x)}</code>`).join("") : ""}</div>
        <p class="used">Cited in: ${cited.length ? cited.map((c) => `<a href="#${c.id}">${esc(c.title)}</a>`).join(", ") : "Community summary"}</p>
      </article>`;
    })
    .join("");

  const thread = posts
    .map((p, i) => {
      const text = postText(p, ledger);
      const shown = esc(p.replace(/\s*\{S\d{2}(?:\s*,\s*S\d{2})*\}/g, ""));
      const links = citeTokens((p.match(/\{S\d{2}(?:\s*,\s*S\d{2})*\}/g) || []).join(""));
      return `<li class="post" data-text="${esc(text)}">
        <div class="post-head"><span class="n">${i + 1} / ${posts.length}</span><span>${xLength(text)} / ${X_LIMIT}</span></div>
        <p>${shown.replace(/^\d+\/\d+\s*/, "")}</p>
        ${links ? `<div class="links">${links}</div>` : ""}
        <div><button type="button" class="post-copy">Copy post</button></div>
      </li>`;
    })
    .join("");
  const paras = pandoc(replaceCitations(paragraphsPart(summaryMd), ledger, (s) => `[${s.id}](${s.url}){.cite data-src="${s.id}"}`), ["-t", "html5", "--wrap=none"]);

  const dl = (file, title, text) => `<a class="dl" href="downloads/${file}" download><b>${title}</b><span>${text}</span><small>${file} / ${sizes[file]}</small></a>`;
  const downloads = [
    dl(FILES.pdf, "Report (PDF)", "The designed report with cover, diagrams and source list."),
    dl(FILES.docx, "Report (Word)", "Editable copy for the DAO, with the same text and links."),
    dl(FILES.md, "Report (Markdown)", "Plain-text copy that reads well on GitHub."),
    dl(FILES.summary, "Community summary", "X thread and paragraph version, links written out."),
    dl(FILES.thread, "X thread (plain text)", "Paste-ready posts, one per block."),
    dl(FILES.sourcesMd, "Source list", "Every claim with its links, then every source in detail."),
    dl(FILES.sourcesCsv, "Sources (CSV)", "Spreadsheet-friendly list of all sources."),
    dl(FILES.claimsCsv, "Claims (CSV)", "Every cited claim with its label and source links."),
  ].join("");

  const data = {};
  for (const s of ledger.sources) {
    data[s.id] = {
      id: s.id, title: s.title, publisher: s.publisher, date: s.date, url: s.url, supports: s.supports,
      excerpts: s.excerpts, absent: s.absent || null, groupName: ledger.groups[s.group],
      citedIn: (index.get(s.id) || []).map((c) => ({ id: c.id, title: c.title })),
    };
  }

  return fill(read("tools/templates/site.html"), {
    DESCRIPTION: esc("Feasibility research on whether Redbelly Network could connect to Quant's Overledger, what it would take, what it could offer institutions and where compliance could break. Every claim sourced and labelled Confirmed, Analysis or Unknown."),
    CUTOFF: ledger.cutoff,
    CUTOFF_HUMAN: cutoffHuman,
    BUILT: new Date().toISOString().slice(0, 10),
    PDF_NAME: FILES.pdf,
    SOURCE_COUNT: ledger.sources.length,
    COUNT_CONFIRMED: counts.confirmed,
    COUNT_ANALYSIS: counts.analysis,
    COUNT_UNKNOWN: counts.unknown,
    STATS: stats,
    TOC: tocItems(),
    CONTENT: reportFragment(),
    THREAD: thread,
    PARAS: paras,
    SOURCE_FILTERS: filters,
    SOURCES: cards,
    DOWNLOADS: downloads,
    LEDGER_JSON: JSON.stringify(data).replace(/</g, "\\u003c"),
  });
}

function size(file) {
  const b = statSync(root("deliverables", file)).size;
  return b > 1 << 20 ? `${(b / (1 << 20)).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`;
}

// ---------- run ----------
rmSync(root("build"), { recursive: true, force: true });
mkdirSync(root("deliverables"), { recursive: true });

const claims = extractClaims(reportMd);
const posts = threadPosts(summaryMd);
write(`deliverables/${FILES.md}`, reportMarkdown());
write(`deliverables/${FILES.summary}`, summaryMarkdown(posts));
write(`deliverables/${FILES.thread}`, posts.map((p) => postText(p, ledger)).join("\n\n") + "\n");
write(`deliverables/${FILES.sourcesMd}`, sourcesMarkdown(claims));
write(`deliverables/${FILES.sourcesCsv}`, sourcesCsv());
write(`deliverables/${FILES.claimsCsv}`, claimsCsv(claims));

const b = await browser();
try {
  const page = await b.newPage({ deviceScaleFactor: 2 });
  await renderDiagrams(page);
  renderDocx();
  const pdfPage = await b.newPage();
  await renderPdf(pdfPage, reportFragment());
  await renderOg(page);
} finally {
  await b.close();
}

const sizes = Object.fromEntries(Object.values(FILES).map((f) => [f, size(f)]));
mkdirSync(root("site/downloads"), { recursive: true });
for (const f of Object.values(FILES)) copyFileSync(root("deliverables", f), root("site/downloads", f));
write("site/index.html", siteHtml(posts, sizes));
write("research/build-stamp.json", JSON.stringify({ inputs: inputHash(), cutoff: ledger.cutoff }, null, 2) + "\n");

console.log(`Built ${Object.keys(FILES).length} deliverables, ${claims.length} cited claims, ${ledger.sources.length} sources, ${posts.length} posts.`);
