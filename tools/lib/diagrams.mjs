// Diagrams are plain HTML and CSS, not images, so they reflow on phones, stay
// selectable and pick up the light or dark theme. The Word file gets PNG
// renders of the same markup (see build.mjs).

const ICON = {
  fits: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  miss: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  open: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5.6 6a2.5 2.5 0 1 1 3.4 2.3c-.6.3-1 .8-1 1.5v.4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="8" cy="12.6" r="1.1" fill="currentColor"/></svg>',
  shield: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.8l5 2v3.6c0 3.2-2.1 5.6-5 6.8-2.9-1.2-5-3.6-5-6.8V3.8z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
};

const mark = (kind, label) =>
  `<span class="mk mk-${kind}">${ICON[kind]}<span>${label}</span></span>`;

const META = {
  stack: {
    title: "How Overledger is put together",
    note: "Simplified from Quant's documentation. Redbelly is shown where an EVM network would sit; it is not listed today.",
    cite: "{S05,S06,S07,S10,S11}",
  },
  routes: {
    title: "Redbelly against each Overledger route",
    note: "Each line compares a documented Overledger rule with a documented Redbelly fact. The verdict on each line is our analysis.",
    cite: "{S07,S11,S22,S24,S29}",
  },
  depths: {
    title: "Three depths of connection",
    note: "Our framework for this report, not Quant terminology.",
    cite: "{S07,S09,S11,S12}",
  },
  journey: {
    title: "What happens to a Tokeniser asset's checks when it leaves Redbelly",
    note: "On Redbelly the checks are documented. On the other side they exist only if a connection is built to carry them.",
    cite: "{S11,S18,S31}",
  },
};

const BODY = {
  stack: () => `
    <div class="st-row st-clients">
      <span class="st-tag">Who calls</span>
      <div class="st-chips"><span>Your application</span><span>Quant Connect portal</span><span>Back-end services</span></div>
    </div>
    <div class="st-flow" aria-hidden="true"></div>
    <div class="st-row st-gateway">
      <span class="st-tag">Gateway</span>
      <div class="st-chips"><span>Authentication</span><span>Routing</span><span>Rate limits</span><span>Flow Applications</span><span>Firewall: may this user reach this network?</span></div>
    </div>
    <div class="st-flow st-flow-split" aria-hidden="true"></div>
    <div class="st-split">
      <div class="st-row st-connectors">
        <span class="st-tag">Connectors</span>
        <p class="st-sub">Self-serve families</p>
        <div class="st-chips"><span class="hot">EVM</span><span>Solana</span><span>Cosmos</span><span>SUI</span><span>Hedera</span><span>Aptos</span></div>
        <p class="st-sub">Managed engagement, for example</p>
        <div class="st-chips"><span>Hyperledger Fabric</span><span>R3 Corda</span><span>Canton</span><span>Besu (permissioned)</span><span>Quorum</span></div>
        <div class="st-ghost">${mark("open", "Redbelly is EVM-compatible but not listed")}</div>
      </div>
      <div class="st-row st-fusion">
        <span class="st-tag">Fusion Rollup</span>
        <p class="st-sub">OP Stack fork anchored to several base chains</p>
        <div class="st-chips"><span>Deposit</span><span>Unify</span><span>Trigger</span><span>Withdraw or mint</span></div>
        <p class="st-sub">Base chains at testnet launch</p>
        <div class="st-chips"><span>Ethereum Sepolia</span><span>Polygon Amoy</span><span>Quant Besu testnet</span></div>
        <p class="st-sub">Fusion Firewall: address allowlists, mirrored on each base chain</p>
      </div>
    </div>`,

  routes: () => {
    const col = (name, sub, rows, verdict) => `
      <div class="rt-col">
        <h4>${name}</h4>
        <p class="rt-sub">${sub}</p>
        <ul>${rows.map(([kind, rule, fact]) => `<li>${mark(kind, rule)}<span class="rt-fact">${fact}</span></li>`).join("")}</ul>
        <p class="rt-verdict">${verdict}</p>
      </div>`;
    return `<div class="rt-grid">
      ${col("Self-serve", "Account registers a node with POST /nodes", [
        ["fits", "Family must be self-serve", "Redbelly runs EVM contracts; EVM is self-serve"],
        ["miss", "Network should be public and permissionless", "Redbelly is open to read but only verified accounts can write"],
        ["fits", "Private node from any domain", "Redbelly publishes a public RPC address"],
        ["open", "Public node only from whitelisted providers", "Whether any whitelisted provider serves Redbelly"],
      ], "Thin link possible on paper. Untested.")}
      ${col("Managed engagement", "Worked through with Quant's team", [
        ["fits", "For permissioned or consortium networks", "Identity-gated writing resembles a permissioned network"],
        ["fits", "RPC over HTTPS", "Redbelly publishes HTTPS RPC addresses"],
        ["open", "Quant chooses to take it on", "Nothing public either way"],
      ], "Route to a full listing. Needs Quant.")}
      ${col("Fusion Rollup", "Redbelly as a base chain", [
        ["miss", "Listed as a connected base chain", "Testnet launch: Sepolia, Amoy, Quant Besu"],
        ["miss", "Documented self-serve way to join", "None found"],
        ["open", "Steps, cost and timeline", "Not public"],
      ], "Not possible yet.")}
    </div>`;
  },

  depths: () => {
    const card = (n, name, what, needs, chip, kind) => `
      <div class="dp-card dp-${n}">
        <span class="dp-n">0${n}</span>
        <h4>${name}</h4>
        <p>${what}</p>
        <ul>${needs.map((x) => `<li>${x}</li>`).join("")}</ul>
        <span class="chip chip-${kind}">${chip}</span>
      </div>`;
    return `<div class="dp-track">
      ${card(1, "Reach", "Overledger reads Redbelly and carries transactions that verified Redbelly accounts have already signed.", ["A Redbelly node registered with Overledger", "Quant accepting the network", "Senders verified on Redbelly"], "Possible on paper", "analysis")}
      ${card(2, "Orchestrate", "Overledger tools act on Redbelly: workflows, Quant-held signing, contract webhooks.", ["Quant supporting Redbelly in those tools", "Signing addresses verified on Redbelly", "Testing on chain ID 153"], "Needs Quant", "unknown")}
      ${card(3, "Move", "Assets or messages travel between Redbelly and other chains through Overledger.", ["Bridge flow or Fusion support for Redbelly", "Eligibility carried across chains", "Contracts with Redbelly write access"], "Not possible yet", "no")}
    </div>`;
  },

  journey: () => {
    const stops = [
      ["Holding", "Every holder verified", "Only if the other chain checks"],
      ["Transferring", "Every transfer checked", "Out of Redbelly's sight"],
      ["Proving identity", "ZK proof checked on Redbelly", "Needs the result relayed"],
      ["Losing eligibility", "Reflected on Redbelly", "Copies must be updated"],
      ["Who holds the key", "One verified account", "Custodian or Quant-held key"],
      ["Bridge mechanics", "Not involved", "Mint, custody and oracle risk"],
      ["Coming back", "Eligible recipient only", "Can get stuck"],
    ];
    return `<div class="jr-lanes">
      <div class="jr-head"><span></span><span>${ICON.shield} On Redbelly</span><span>On another chain</span></div>
      ${stops
        .map(
          ([name, here, there], i) => `<div class="jr-stop" style="--i:${i}">
            <span class="jr-name"><b>${String(i + 1).padStart(2, "0")}</b>${name}</span>
            <span class="jr-here">${mark("fits", here)}</span>
            <span class="jr-there">${mark("open", there)}</span>
          </div>`,
        )
        .join("")}
    </div>`;
  },
};

export const DIAGRAMS = Object.keys(META);

export function diagramHtml(name, renderCites) {
  const meta = META[name];
  if (!meta) throw new Error(`Unknown diagram ${name}`);
  return `<figure class="dg dg-${name}" data-diagram="${name}">
  <figcaption><span class="dg-title">${meta.title}</span><span class="dg-cite">${renderCites(meta.cite)}</span></figcaption>
  <div class="dg-body">${BODY[name]()}</div>
  <p class="dg-note">${meta.note}</p>
</figure>`;
}

export const diagramTitle = (name) => META[name].title;
