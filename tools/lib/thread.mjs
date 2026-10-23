// The X thread lives between <!-- thread:start --> and <!-- thread:end --> in
// report/community-summary.md, one post per paragraph.
import { replaceCitations } from "./ledger.mjs";

export const X_LIMIT = 280;
const X_URL_WEIGHT = 23; // X shortens every link to 23 characters

export function threadPosts(summaryMd) {
  const m = summaryMd.match(/<!-- thread:start -->([\s\S]*?)<!-- thread:end -->/);
  if (!m) throw new Error("community-summary.md has no thread markers");
  return m[1].split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
}

export function postText(post, ledger) {
  return replaceCitations(post, ledger, (s) => s.url);
}

export function xLength(text) {
  const urls = text.match(/https?:\/\/\S+/g) || [];
  const rest = text.replace(/https?:\/\/\S+/g, "");
  return [...rest].length + urls.length * X_URL_WEIGHT;
}

export function paragraphsPart(summaryMd) {
  return summaryMd.split(/^### In a few paragraphs\s*$/m)[1]?.trim() ?? "";
}
