// Turns report/*.md into the three targets: the web page and PDF (html),
// the Word file (docx) and the Markdown copies in deliverables/ (md).
import { spawnSync } from "node:child_process";
import { replaceCitations } from "./ledger.mjs";
import { diagramTitle } from "./diagrams.mjs";

const PANEL_LABEL = {
  confirmed: "Confirmed",
  analysis: "Analysis",
  unknown: "Unknown",
  notice: "Read before sharing",
};

// Pandoc's "smart" extension would turn -- into an en dash, which the brand
// kit does not allow, so it stays off.
const FROM = "markdown-smart+fenced_divs+bracketed_spans+link_attributes+pipe_tables";

export function pandoc(input, args) {
  const run = spawnSync("pandoc", ["-f", FROM, ...args], { input, encoding: "utf8", maxBuffer: 64 << 20 });
  if (run.error) throw new Error(`pandoc is required: ${run.error.message}`);
  if (run.status !== 0) throw new Error(run.stderr);
  return run.stdout;
}

function panels(md, target) {
  return md.replace(/^::: (confirmed|analysis|unknown|notice)[ \t]*$/gm, (_, kind) => {
    const label = PANEL_LABEL[kind];
    if (target === "docx") {
      const style = kind[0].toUpperCase() + kind.slice(1);
      return `::: {custom-style="Label ${style}"}\n${label.toUpperCase()}\n:::\n\n::: {custom-style="Panel ${style}"}`;
    }
    if (target === "md") return `> **${label}**\n>`;
    return `::: {.panel .panel-${kind} data-status="${kind}"}\n[${label}]{.panel-label}\n`;
  });
}

// Markdown has no closing marker for blockquotes, so for the md target the
// panel body is quoted line by line and the closing fence dropped.
function quotePanels(md) {
  const out = [];
  let inside = false;
  for (const line of md.split("\n")) {
    if (line.startsWith("> **") && line.endsWith("**")) inside = true;
    if (inside && line.trim() === ":::") {
      inside = false;
      out.push("");
      continue;
    }
    out.push(inside && !line.startsWith(">") ? `> ${line}`.trimEnd() : line);
  }
  return out.join("\n");
}

export function prepare(md, ledger, target, { diagramPng } = {}) {
  let text = panels(md, target);
  if (target === "md") text = quotePanels(text);

  text = replaceCitations(text, ledger, (s) =>
    target === "html" ? `[${s.id}](${s.url}){.cite data-src="${s.id}"}` : `[${s.id}](${s.url})`,
  );

  text = text.replace(/^@diagram\((\w+)\)[ \t]*$/gm, (_, name) => {
    if (target === "html") return `<div data-diagram-slot="${name}"></div>`;
    if (target === "docx") return `![${diagramTitle(name)}](${diagramPng(name)}){width=100%}`;
    return `*Diagram: ${diagramTitle(name)}. See the PDF or the web page.*`;
  });

  if (target !== "html") text = text.replace(/\[([^\]]+)\]\{\.chip[^}]*\}/g, "**$1**");
  return text;
}

export function headings(md) {
  return [...md.matchAll(/^##\s+(.+?)\s*\{#([\w-]+)\}\s*$/gm)].map((m) => ({ title: m[1], id: m[2] }));
}
