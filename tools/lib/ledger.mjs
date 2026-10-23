// Loads research/ledger.json and resolves citation tokens such as {S07} or {S07,S11}.
import { readFileSync } from "node:fs";
import { root } from "./paths.mjs";

export const CITE = /\{(S\d{2}(?:\s*,\s*S\d{2})*)\}/g;

export function loadLedger() {
  const ledger = JSON.parse(readFileSync(root("research/ledger.json"), "utf8"));
  ledger.byId = new Map(ledger.sources.map((s) => [s.id, s]));
  return ledger;
}

export function citedIds(text) {
  const ids = [];
  for (const m of text.matchAll(CITE)) {
    for (const id of m[1].split(",")) ids.push(id.trim());
  }
  return ids;
}

// Replaces every citation token. `render(source)` returns the text for one id.
export function replaceCitations(text, ledger, render, join = " ") {
  return text.replace(CITE, (_, list) =>
    list
      .split(",")
      .map((id) => {
        const source = ledger.byId.get(id.trim());
        if (!source) throw new Error(`Unknown source ${id.trim()}`);
        return render(source);
      })
      .join(join),
  );
}

// Maps each source id to the report sections (h2 titles) that cite it.
export function citationIndex(markdown) {
  const index = new Map();
  let section = "";
  for (const line of markdown.split("\n")) {
    const h = line.match(/^##\s+(.+?)\s*(\{#([\w-]+)\})?\s*$/);
    if (h) section = { title: h[1], id: h[3] };
    for (const id of citedIds(line)) {
      if (!index.has(id)) index.set(id, []);
      const list = index.get(id);
      if (section && !list.some((s) => s.id === section.id)) list.push(section);
    }
  }
  return index;
}
