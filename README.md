# Could Redbelly plug into Quant's Overledger?

Feasibility research for the Redbelly DAO Community Task Board, **TASK-29: Quant Overledger and Redbelly Interoperability Research**. It asks whether Redbelly Network could connect to Quant's Overledger, what that would take, what it could offer institutions using Redbelly, and where compliance could break when Receptor credentials or Tokeniser assets meet other chains.

> **Notice.** Redbelly and Quant have no announced partnership, talks or plans, and nothing here suggests otherwise. This is feasibility research only. It contains no price talk and no investment advice.

## The answer in brief

- **Not connected today.** Redbelly is not named in Overledger's documentation and is not one of Fusion Rollup's connected chains.
- **A thin link looks possible on paper.** Overledger lets accounts register new networks in its EVM family, and Redbelly is EVM-compatible. It is untested, and Redbelly only lets identity-verified accounts write, which does not fit Overledger's "public, permissionless" self-serve category cleanly. Quant would decide.
- **Anything deeper needs Quant**: a public listing, Quant-held signing, the bridge flow or Fusion Rollup.
- **Compliance does not cross chains by default.** Receptor proofs and Tokeniser transfer checks run on Redbelly. Another chain applies its own rules unless a connection is designed to carry them.

Every claim behind these lines is linked to its source in the report and in the source list.

## Deliverables

| Deliverable required by the task | File |
|---|---|
| 1. The report (Word file or PDF) | [`deliverables/Overledger-Redbelly-Feasibility-Study.pdf`](deliverables/Overledger-Redbelly-Feasibility-Study.pdf) and [`.docx`](deliverables/Overledger-Redbelly-Feasibility-Study.docx), plus a [Markdown copy](deliverables/Overledger-Redbelly-Feasibility-Study.md) |
| 2. Community summary (X thread or paragraphs) | [`deliverables/Community-Summary.md`](deliverables/Community-Summary.md) (both forms) and [`deliverables/X-Thread.txt`](deliverables/X-Thread.txt) (paste-ready) |
| 3. Source list with a link for every factual claim | [`deliverables/Source-List.md`](deliverables/Source-List.md): every cited claim with its links, then every source in detail. Also [`Source-List.csv`](deliverables/Source-List.csv) and [`Claims.csv`](deliverables/Claims.csv) |

The same material is published as a single web page in [`site/`](site/), with a status lens that highlights Confirmed, Analysis or Unknown findings, a source panel behind every citation, and copy buttons for each post in the thread.

## How the findings are labelled

| Label | Meaning |
|---|---|
| Confirmed | Stated in a public source, linked right next to the claim. |
| Analysis | Our reasoning, built only on confirmed facts. Not a statement by Redbelly, Quant or anyone else. |
| Unknown | Not answered by any public source we could find. |

Each label is a separate panel in the report, so the three never mix inside one paragraph.

## How to verify it

All facts trace back to one file, [`research/ledger.json`](research/ledger.json). For each of the 38 sources it records the link, what the source supports, and short phrases copied from the source that the claim relies on.

```bash
npm run audit           # offline checks, no network needed
npm run audit:online    # also fetches every source and re-checks its phrases
```

The audit writes [`research/AUDIT.md`](research/AUDIT.md) and fails if any of these breaks:

- every citation points to a real source, and every source is cited;
- every paragraph in a Confirmed panel ends with its source link;
- no wording suggests a partnership, talks or plans between Redbelly and Quant;
- no price talk, investment advice or promised returns;
- no personal credit: no names, handles, signature lines or email addresses;
- no em dashes, en dashes or emoji, as the brand kit requires;
- every post in the X thread fits in 280 characters as X counts them;
- online: every link loads, still contains the phrases it supports, and Quant's pages still do not name Redbelly.

Run the online audit from a machine with ordinary internet access. A few sites, such as x.com, need a browser; the audit lists those for a manual check instead of failing.

## Rebuilding

The PDF, Word file, Markdown copies, CSV files and web page are all generated from `report/report.md`, `report/community-summary.md` and `research/ledger.json`, so they cannot drift apart.

```bash
npm install            # Playwright, for the PDF and diagram images
npx playwright install chromium
npm run build          # needs pandoc 3 on the PATH
npm run check          # offline audit plus a check that the outputs are current
npm run serve          # preview at http://localhost:4173
```

`tools/docx-reference.py` regenerates the Word styles (`tools/templates/reference.docx`) and needs `python-docx`; it only has to run when a Word style changes.

## Repository layout

```
report/            report.md and community-summary.md: the text, written once
research/          ledger.json (sources and checked phrases), AUDIT.md
deliverables/      generated PDF, Word, Markdown, CSV and thread files
site/              the generated web page with its assets and downloads
tools/             build.mjs, audit.mjs, serve.mjs and their templates
deploy/            nginx, Caddy and Docker setups for a VPS
```

## Deploying

`site/` is static. See [`deploy/README.md`](deploy/README.md) for nginx, Caddy and Docker.

## Brand

Follows the Redbelly DAO Task Board brand kit: Be Vietnam Pro for text and JetBrains Mono for machine values (both under the SIL Open Font License, files in `site/assets/fonts`), the dark theme with the single accent `#EF5350`, the official DAO logo PNGs without a plate, and no em dashes, en dashes or emoji. Animation is decoration only and switches off for readers who ask for reduced motion.
