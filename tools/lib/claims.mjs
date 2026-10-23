// Breaks report.md into individual claims: each sentence or table row that
// carries a citation, labelled by the panel it sits in. The audit also uses
// this to find sentences in Confirmed panels that carry no citation.
import { CITE, citedIds } from "./ledger.mjs";

// Lines outside a status panel take their label from the section they are in.
const SECTION_LABEL = {
  "short-answer": "Analysis",
  "the-work": "Analysis",
  glossary: "Definition",
  method: "Method",
};

const plain = (s) =>
  s
    .replace(CITE, "")
    .replace(/\[([^\]]+)\]\{[^}]*\}/g, "$1")
    .replace(/\[([^\]]+)\]\(#[^)]*\)/g, "$1")
    .replace(/\*\*|`/g, "")
    .replace(/^\s*(?:[-*]|\d+\.)\s+/, "")
    .replace(/\s+([.,;:])/g, "$1")
    .replace(/\s{2,}/g, " ")
    .trim();

export function sentences(line) {
  return line.split(/(?<=[.!?:])\s+(?=[A-Z0-9*`"(\[])/);
}

export function walk(md, visit) {
  let section = "";
  let panel = null;
  for (const raw of md.split("\n")) {
    const line = raw.trimEnd();
    const h = line.match(/^##\s+.+\{#([\w-]+)\}/);
    if (h) section = h[1];
    const open = line.match(/^::: (confirmed|analysis|unknown|notice)$/);
    if (open) { panel = open[1]; continue; }
    if (line === ":::") { panel = null; continue; }
    if (!line || line.startsWith("#") || line.startsWith("@diagram") || /^\|[-| ]+\|$/.test(line)) continue;
    visit({ line, section, panel });
  }
}

export function extractClaims(md) {
  const claims = [];
  walk(md, ({ line, section, panel }) => {
    const label = panel
      ? { confirmed: "Confirmed", analysis: "Analysis", unknown: "Unknown", notice: "Context" }[panel]
      : SECTION_LABEL[section] || "Context";
    const parts = line.startsWith("|")
      ? [line.split("|").slice(1, -1).map((c) => c.trim()).join(" / ")]
      : sentences(line);
    for (const part of parts) {
      const ids = [...new Set(citedIds(part))];
      if (!ids.length) continue;
      claims.push({ id: `C${String(claims.length + 1).padStart(3, "0")}`, section, status: label, text: plain(part), sources: ids });
    }
  });
  return claims;
}

// Paragraphs and list items inside Confirmed panels must end with their
// citation: any text after the last source link would be an unsourced claim.
// Lead-ins that end with a colon introduce a list and are exempt.
export function unsourcedConfirmed(md) {
  const found = [];
  walk(md, ({ line, section, panel }) => {
    if (panel !== "confirmed" || line.startsWith("|") || /^\[.+\]\{\.panel-label\}$/.test(line)) return;
    const text = plain(line);
    if (text.endsWith(":")) return;
    const tail = line.split(CITE).pop();
    if (!citedIds(line).length) found.push({ section, text });
    else if (plain(tail).replace(/[.;,:)\s]/g, "").length > 0) found.push({ section, text: `...${plain(tail)}` });
  });
  return found;
}
