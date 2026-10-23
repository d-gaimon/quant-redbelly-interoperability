## Read this first {#read-first}

This is feasibility research. It asks three things: whether Redbelly Network could connect to Quant's Overledger, what that would take, and what it could offer institutions that use Redbelly.

::: notice
**No partnership, talks or plans.** Redbelly and Quant have no announced partnership or talks, and nothing in this report suggests otherwise {S38}. Redbelly has not published an official position on bridging {S38}, so anything that is not in a public source is treated here as unknown.
:::

Every finding in this report sits in one of three labelled panels:

- **Confirmed.** Stated in a public source. The source is linked right next to the claim.
- **Analysis.** Our reasoning, built only on confirmed facts. It is not a statement by Redbelly, Quant or anyone else.
- **Unknown.** Not answered by any public source we could find. We name these gaps so that nobody fills them with guesses.

Research cut-off: 23 October 2026. Overledger's documentation says its list of supported networks can change and that the live list comes from its API {S07}, so parts of this picture can change quickly. The section [What would change the answer](#signals) lists what to watch.

## The short answer {#short-answer}

::: confirmed
- Overledger reaches blockchains through Connectors. Public, permissionless networks in six families, including EVM, can be added self-serve; permissioned and consortium networks need a managed engagement with Quant's team {S07}.
- Redbelly runs EVM smart contracts written in Solidity {S24} and its mainnet is chain ID 151 {S22}.
- On Redbelly, an account can only write to the network after it claims an access credential from an accredited issuer {S29,S17,S28}.
- Redbelly is not named in any of the Overledger documentation pages listed in this report {S05,S06,S07,S10,S11}, and it is not one of the networks Fusion Rollup connected at testnet launch {S11}.
:::

::: analysis
**Redbelly is not connected to Overledger today.** A thin link, where an Overledger account registers its own Redbelly node and passes signed transactions through, looks possible on paper because Redbelly is EVM-compatible and Overledger lets accounts add new EVM networks. It is untested, and it depends on Quant accepting an identity-gated chain on a route meant for permissionless networks. Anything deeper (a public listing, Quant-held signing, bridges, or a Fusion Rollup connection) is not possible yet unless Quant chooses to support Redbelly. Redbelly's compliance controls would not follow assets across chains by default; a connection would have to be designed to carry them.
:::

### Scorecard {#scorecard}

We split "connect" into three depths, because each one needs different work:

- **Reach:** Overledger can read Redbelly and pass on transactions that someone else has signed.
- **Orchestrate:** Overledger tools (workflows, signing, webhooks) act on Redbelly directly.
- **Move:** assets or messages travel between Redbelly and other chains through Overledger.

| Capability | Depth | Status on 23 October 2026 | What it depends on |
|---|---|---|---|
| Read Redbelly data through Overledger | Reach | [Possible on paper, untested]{.chip .chip-analysis} | An account registering a Redbelly node through self-serve, and Quant accepting it {S07} |
| Pass signed Redbelly transactions through Overledger | Reach | [Possible on paper, untested]{.chip .chip-analysis} | The same, plus every sending address holding Redbelly write access {S29,S36} |
| Redbelly listed for all Overledger users | Reach | [Not available today]{.chip .chip-no} | A public node from a whitelisted provider, or a Quant engagement {S07} |
| Quant-held keys signing on Redbelly | Orchestrate | [Unknown]{.chip .chip-unknown} | Quant support, and whose identity the signing address would be verified under {S09,S29} |
| Bridge flow in Quant Connect to Redbelly | Move | [Not available today]{.chip .chip-no} | Quant supporting Redbelly as a destination for the bridge flow {S12} |
| Redbelly as a Fusion Rollup base chain | Move | [Not possible yet]{.chip .chip-no} | A Quant project; no self-serve route is documented {S11} |
| Reaching TCH's On-Chain Money network | Move | [Unknown]{.chip .chip-unknown} | TCH and its banks; the network's ledgers are not public {S01} |
| Redbelly compliance carried to other chains | Move | [Not by default]{.chip .chip-no} | How a connection is designed (see [Credentials and assets across chains](#compliance)) |

## Why the question is being asked now {#why-now}

::: confirmed
On 24 September 2026, The Clearing House (TCH) announced that it had selected Quant to power its On-Chain Money Initiative, a network for clearing and settling tokenised deposits between financial institutions {S01}. Quant says its technology will provide the network's interoperability, orchestration and transaction-management layer, with connections to existing fiat payment systems such as RTP and CHIPS {S01,S02,S03}. TCH expects the network to be available to participating institutions in the first half of 2027 {S01}.

The initiative was first unveiled in June 2026 as a bank-led effort that TCH operates {S04}. Quant also says it will offer a shared Tokenised Deposits-as-a-Service platform to US institutions that process through TCH but do not yet have tokenised deposit capability {S02}.
:::

::: analysis
For Redbelly, the announcement matters indirectly. It shows a major US bank network choosing Quant's software as its connective layer. If Overledger becomes common plumbing for banks, the chains that Overledger can reach may become easier for those banks to reach. That is why the community is asking. It does not mean that TCH's network will connect to Redbelly, or to any public chain.
:::

::: unknown
The announcements we reviewed do not say which blockchains the On-Chain Money network will run on, or whether it will connect to public chains at all {S01,S02,S03}. Whether banks on that network could ever reach assets on Redbelly is therefore unknown.
:::

## Overledger in plain words {#overledger}

::: confirmed
Overledger is Quant's platform for building applications that span more than one blockchain. It gives developers one set of credentials and one API across networks {S05}. Its documentation describes these building blocks:

- **Gateway.** The front door. It checks who is calling, routes each request to a Connector or to the Fusion Rollup, applies rate limits and runs multi-step workflows called Flow Applications {S06}.
- **Connectors.** Adapters that speak each blockchain's own language. To a developer they look like one multi-DLT RPC endpoint. Behind it, each family of blockchains has its own pool of nodes, made up of nodes Quant runs and nodes that customers register {S07}.
- **Overledger Firewall.** Access control in two layers: an off-chain check of whether a user may reach a network, and an on-chain Fusion Firewall that allowlists addresses for contract calls, cross-chain messages and token bridging {S10}.
- **Fusion Rollup.** A rollup built as a fork of the OP Stack that anchors to several base chains at once, giving one EVM-compatible environment across them {S11}.
- **Signer.** Signing runs through a Signer Flow App. Either the customer holds the keys and signs, or Quant holds them (a testnet hot wallet, or a contracted mainnet KMS or HSM). The Gateway never sees private keys {S09}.
- **Quant Connect.** The portal users sign in to. Signing in gives the token used to create API keys {S08}, and Quant Connect hosts the bridge flow, which deploys a destination token contract and returns a Bridge ID {S12}.

Overledger also documents webhooks for smart contract events {S14} and publishes a full API reference {S13}.
:::

@diagram(stack)

### How a chain gets connected today {#how-chains-connect}

::: confirmed
Overledger's documentation describes two routes onto its Connectors {S07}:

1. **Self-serve.** For public, permissionless networks in six families: EVM, Solana, Cosmos, SUI, Hedera and Aptos. An account can add its own node to a network Overledger already lists, or add a network Overledger does not list yet, as long as the network belongs to a self-serve family. The first `POST /nodes` call registers both the new network and the node, and the network then becomes available to Overledger users. Each node is either public, which is only allowed from whitelisted providers, or private, which can come from any domain {S07}.
2. **Managed engagement.** For permissioned and consortium networks, and for new blockchain families, worked through with Quant's team. Named examples include Hyperledger Fabric, R3 Corda, Canton Network, permissioned Hyperledger Besu and Quorum. The documentation says that a network exposing RPC over HTTPS with bearer or API-key authentication can normally be onboarded {S07}.

The Gateway blocks administrative RPC methods; for EVM networks the examples are `personal_*`, `admin_*` and `txpool_*` {S07}. Each network has a visibility of public, permissioned or private, and the live list of networks comes from the API (`GET /networks`), not from a fixed page {S07}. For permissioned networks, the Firewall only lets through users who are on that network's allowlist {S10}.

Fusion Rollup has its own set of connected base chains. At testnet launch they were Ethereum Sepolia, Polygon Amoy and a Quant-run permissioned Besu testnet {S11}. Fusion's building blocks are deposit, unify, trigger and withdraw or mint, which cover moving value and calling contracts across chains {S11}. To send a cross-chain message, a sender on a connected chain must be allowlisted for the specific rollup contract it wants to reach, and the firewall is locked down on mainnet while being more permissive on testnet {S11}. Quant's own documentation lists the known risks of bridges built as separate contracts: lock-and-mint mismatches, custodian compromise and oracle failure {S11}.
:::

@diagram(routes)

::: unknown
We did not find a documented self-serve way to add a new base chain to Fusion Rollup. The pages we reviewed describe which chains Fusion connected, not how a chain is added {S11}.
:::

## Redbelly, in the terms that matter here {#redbelly}

::: confirmed
- **Purpose.** Redbelly describes itself as a layer 1 blockchain built for real world asset tokenisation {S15}.
- **EVM base.** Redbelly executes smart contracts written for the EVM in Solidity {S24}. Mainnet is chain ID 151 and Testnet is chain ID 153, and Redbelly publishes a public RPC address for each {S22}.
- **Consensus.** Redbelly uses DBFT, a leaderless Byzantine fault tolerant consensus algorithm, together with a "super block" optimisation of the EVM. Its developer portal credits these two for the network's security, finality and scalability {S23}.
- **Fees.** The unit price of gas is fixed in US dollar terms and converted to RBNT at execution through an on-chain price oracle {S25}.
- **Identity before writing.** Receptor is Redbelly's identity and verifiable credential protocol, built on the W3C verifiable credential data model {S16}. Only accredited issuers can issue the credentials that give network access {S16,S17}. Users must claim an access credential from an accredited issuer before they can enable their accounts with write access {S29}. The accredited issuer named in the Redbelly access app is Averer, which verifies identity before issuing the Redbelly Network Access Credential {S28}. Users prove a photo identity document through biometric checks {S27,S36}. Community builders report that unverified wallets cannot send any transaction ("Sender not authorised to write transactions") and that Mainnet and Testnet approvals are separate {S36}.
- **Institutions.** Companies and trusts can register through Redbelly's Business verification process {S30}.
- **Existing cross-chain routes.** Redbelly's developer portal lists routes for RBNT to Base via LayerZero and to Ethereum mainnet via Polymer, and points to Lucid Labs Bridge for moving RBNT back to Redbelly {S26}. Celer's cBridge connects Redbelly with Ethereum and BNB Chain using a pegged bridge model {S32}. Redbelly announced Wrapped RBNT on Ethereum at contract `0xb45ffb51984d626ee758b336c61cf20990c6bf13` {S33}. LayerZero lists Redbelly Mainnet among its V2 deployments {S34}.
- **Community bridges.** A winning DAO Task Board entry is a reference bridge that moves ETH from Ethereum Sepolia to Redbelly Testnet using lock-and-mint with a 2-of-3 relayer set {S35}. A DAO recovery playbook documents how bridged RBNT can get stuck, for example Polymer transfers to Ethereum that need to be relayed by hand {S37}.
:::

::: analysis
Two facts carry most of the weight for this question.

First, Redbelly speaks the same EVM language as Overledger's largest self-serve family. Connecting Redbelly to outside systems is also not new: LayerZero, Polymer, Celer and Lucid Labs already do it {S26,S32,S34}. That shows Redbelly's EVM base works with mainstream cross-chain tooling. It says nothing about Overledger specifically.

Second, Redbelly is open to read through its public RPC but gated to write: every sending account must be identity-verified {S22,S29}. Overledger sorts networks into public, permissionless ones (self-serve) and permissioned ones (engagement) {S07}. Redbelly does not sit cleanly in either box. How Quant would classify it is the first practical question any connection would face.
:::

## Can Redbelly connect now? {#connect-now}

Each Overledger route is tested below against what Redbelly's public documentation says.

### Route 1: self-serve node registration {#route-self-serve}

::: confirmed
Self-serve onboarding covers networks that Overledger does not list yet, if their family is supported, and EVM is a supported family {S07}. Redbelly runs EVM contracts {S24}. A private node can be added from any domain; a public node only from a whitelisted provider {S07}.
:::

::: analysis
On paper, an Overledger account holder could register a Redbelly RPC endpoint as a private node and reach Redbelly through Overledger's RPC interface. That would be a thin link at the **Reach** depth: the account could read Redbelly data and pass through transactions that a Redbelly-verified account had already signed, using the same credentials it uses for other networks. A listing visible to every Overledger user would also need a public node from a provider Quant has whitelisted. Even a working thin link would not change Redbelly's rule that only verified accounts can write {S29,S36}. Overledger would only carry the transaction.
:::

::: unknown
- Whether Quant would accept an identity-gated chain on the self-serve route at all, since that route is described as being for public, permissionless networks {S07}.
- Whether Overledger's EVM Connector works with Redbelly unchanged: its node health checks, its handling of Redbelly's dollar-fixed gas {S25}, and its handling of Redbelly blocks. No test has been published, and this research did not run one.
- Which node providers Quant has whitelisted, and whether any of them serves Redbelly.
- Whether Redbelly already appears in Overledger's live network list. That list is only available through the API with an account {S07}.
:::

### Route 2: managed engagement {#route-engagement}

::: confirmed
Quant's documentation uses managed engagement for permissioned and consortium networks and for new families, and says a network with HTTPS RPC and bearer or API-key authentication can normally be onboarded {S07}.
:::

::: analysis
Redbelly's public RPC fits the transport part of that description {S22}. An engagement is the route by which Redbelly could become a fully listed network with Quant-run nodes, firewall settings and Quant support. It needs Quant to choose to do it. Nothing public says that such work exists or is being considered.
:::

### Route 3: Fusion Rollup {#route-fusion}

::: confirmed
Fusion connected Ethereum Sepolia, Polygon Amoy and a Quant-run Besu testnet at launch {S11}. Fusion Firewall policies are mirrored inside the rollup and on each connected base chain {S06}.
:::

::: analysis
Joining Fusion would mean deploying Fusion's base-chain contracts on Redbelly and wiring Redbelly into the rollup's deposit and messaging paths. Those contracts, and every address that deposits or withdraws through them, would need Redbelly write access {S29}. This would be a project led by Quant, with parties on Redbelly taking part. It is not something the community can switch on.
:::

::: unknown
No public source describes the steps, cost or timeline for adding a base chain to Fusion Rollup.
:::

### Verdict {#verdict}

::: analysis
**Not connected today.** A thin **Reach** link through the self-serve route looks possible on paper, but it is untested and depends on how Quant classifies Redbelly. **Orchestrate** and **Move** (Quant-held signing, the bridge flow, Fusion Rollup) are not possible yet unless Quant chooses to support Redbelly.
:::

## What a connection would take {#the-work}

The table lists the work in the order it would happen, in plain words. Who acts is our analysis of the documented roles. It does not describe any actual plan.

| Step | In plain words | Who would have to act | Depends on |
|---|---|---|---|
| 1. Pick the route | Choose between a thin self-serve link, a full listing through an engagement, or Fusion Rollup {S07,S11} | An Overledger account holder, or Quant | How Quant classifies an identity-gated chain |
| 2. Provide a node | Someone runs or supplies a Redbelly RPC endpoint that Overledger calls. A public listing needs a whitelisted provider {S07} | A node operator or provider, and Quant | Quant's provider whitelist |
| 3. Verify every sender | Every address that signs Redbelly transactions needs a Redbelly access credential {S29}; companies can use Business verification {S30} | The institution, an accredited issuer, and Quant if Quant holds keys {S09} | Redbelly's access process |
| 4. Test the fit | Run the Connector against Redbelly Testnet (chain ID 153) {S22}: reads, signed writes, rejections for unverified senders, fees, contract event webhooks {S14} | Quant engineers, with Redbelly developers | An Overledger account and verified test accounts |
| 5. Decide how assets move | Keep assets on Redbelly and move instructions, or represent them on other chains through a bridge or Fusion {S11,S12} | Asset issuers and Quant | The compliance design in the next section |
| 6. Map compliance | Line up Overledger's allowlists {S10} with Redbelly eligibility {S16,S21}, including what happens when someone stops being eligible | Issuers, Quant and Redbelly | Legal and product decisions |
| 7. Agree terms | Commercial, legal and support arrangements between whoever would run it | The parties involved | Not public |

@diagram(depths)

::: analysis
Steps 1 to 4 are enough for a **Reach** link. Steps 5 and 6 are where most of the real effort would go, because they decide whether a Redbelly asset keeps its protections once it touches another chain. Step 3 is specific to Redbelly: on most EVM chains any funded address can send transactions, but on Redbelly every signing address is an identity decision as well as a technical one {S29,S36}.
:::

## What it could offer institutions {#offer}

::: analysis
**For institutions that already use Overledger:**

- **One integration.** Redbelly would sit behind the same credentials and API as their other networks {S05,S07}, instead of needing its own integration.
- **Workflows across chains.** Overledger's Flow Applications and smart contract webhooks {S06,S14} could tie a step on Redbelly to steps elsewhere, for example releasing a payment on one network when a Tokeniser asset changes hands on Redbelly. This needs Quant to support Redbelly in those tools.
- **Custody choices.** The Signer supports self-custody or Quant-held keys in a KMS or HSM {S09}, which suits institutions with different custody policies, as long as every signing address is Redbelly-verified {S29}.

**For institutions using Redbelly:**

- **A possible route toward bank networks that standardise on Quant**, if those networks ever connect to public chains. Today that condition is unknown {S01}.
- **Redbelly's own features would come along**: identity-verified counterparties {S16,S29}, fees fixed in dollar terms that make costs predictable {S25}, and leaderless BFT consensus {S23}. These are the qualities institutions would be weighing when they choose where to issue.

**What it would not offer:**

- **Compliance does not travel automatically.** Overledger's Firewall controls which users and addresses may act {S10}. Redbelly's controls decide who may hold and move assets on Redbelly {S29,S31}. They are separate systems, and nothing links them today.
- **No access to TCH's network follows from it.** That network's participants and ledgers are TCH's decision {S01,S04}.
- **A new dependency.** Institutions would rely on a third-party platform whose terms for such a connection are not public.
:::

## Credentials and assets across chains {#compliance}

This section explains how Redbelly's compliance tools work today, and where they could stop working once an asset or a claim on it leaves Redbelly.

::: confirmed
- **Receptor credentials** are W3C verifiable credentials. An issuer issues them, the user (the holder) keeps them, and a verifier checks them {S16}.
- **Proof by Query** checks a zero-knowledge proof in a verifier smart contract that the verifier deploys on Redbelly Network. The user submits the proof to that contract, and the verifier never sees or stores the personal data {S18}. **Selective Disclosure** reveals chosen facts off-chain instead {S19}.
- **Eligibility rules** are queries over credential types such as passport, proof of address and AML/CTF credentials. On-chain checks currently support single queries, with multi-query planned {S21}. Developers build them with the Eligibility SDK {S20}.
- **Tokeniser**, which runs on Redbelly, programs eligibility into every asset: identity, KYC, AML, CTF, wholesale and sophisticated investor tests, and target market determination (TMD). Every holder is verified and every transfer is checked against the asset's rules {S31}.
- **Overledger's Fusion Firewall** allowlists on-chain addresses; Overledger maps users to their authorised addresses off-chain {S10}, and policies are mirrored on each connected base chain {S06}.
:::

@diagram(journey)

::: analysis
The checks above all run **on Redbelly**. A Receptor proof is checked by a contract on Redbelly {S18}, and a Tokeniser transfer is checked by the asset's rules on Redbelly {S31}. Another chain, or a rollup, does not see those checks. It applies its own rules. So a connection either has to bring equivalent checks to the other side, or keep the asset where the checks are.

| Moment | On Redbelly today | Once it touches another chain | Where it could break |
|---|---|---|---|
| Holding | Every holder is verified against the asset's rules {S31} | The other chain applies its own rules | A wrapped token contract without the same checks lets anyone hold it |
| Transferring | Every transfer is checked {S31} | Transfers of a wrapped token happen out of Redbelly's sight | Secondary transfers skip eligibility entirely |
| Proving identity | A zero-knowledge proof is checked by a contract on Redbelly {S18} | A contract elsewhere cannot read that result unless it is relayed | Eligibility status goes stale, or is relayed wrongly |
| Losing eligibility | Redbelly's own records reflect the change | Any copy of the status held elsewhere must be updated as well | A holder who is no longer eligible stays allowlisted elsewhere |
| Who holds the key | One verified account per holder {S29} | The same asset may sit with a custodian, or behind a Quant-held key {S09} | It is unclear whose identity stands behind the address |
| Bridge mechanics | Not applicable | Lock-and-mint, custody and oracles come into play | Lock-and-mint mismatch, custodian compromise, oracle failure {S11} |
| Coming back | Only an eligible address can receive | Redeeming to Redbelly needs an eligible recipient | Funds get stuck when the recipient is not verified, a failure the DAO playbook already covers for RBNT {S37} |
:::

### Designs that would keep compliance intact {#designs}

::: analysis
Three designs follow from the facts above. They are options for discussion, not recommendations to any party.

1. **Keep the asset on Redbelly and move instructions.** Overledger coordinates the workflow, but the asset never leaves Redbelly, so every transfer still passes Tokeniser's and Receptor's checks {S31,S18}. A payment leg could settle elsewhere. This carries the least compliance risk. It needs careful design so that both legs complete or neither does.
2. **Represent the asset elsewhere, with eligibility mirrored.** The destination contract only allows transfers between addresses on an allowlist that mirrors Redbelly eligibility. Overledger's address allowlists {S10} are one place such a mirror could live. It needs a trusted way to keep the mirror up to date when people stop being eligible.
3. **Re-prove eligibility on the destination.** The holder proves eligibility again on the other chain, using the same credential. Today Receptor's on-chain verification is documented on Redbelly {S18}; whether verifier contracts and accredited-issuer trust could run on another chain is unknown.
:::

::: unknown
- Whether Receptor verifier contracts, or the trust in accredited issuers, can be deployed on chains other than Redbelly.
- How Tokeniser would treat a representation of one of its assets on another chain. Tokeniser's public material describes checks on Redbelly only {S31}.
- Whether Overledger's allowlists could be fed by Redbelly eligibility automatically. The documentation describes allowlists managed by Overledger and by contract deployers {S10,S11}, not by external credential systems.
:::

## Not possible yet, and unknown {#unknowns}

::: confirmed
**Not possible yet, based on public sources at the cut-off:**

- Using Redbelly as a listed Overledger network. Redbelly is not named in Overledger's documentation {S05,S06,S07}.
- Creating a Quant Connect bridge to Redbelly. The bridge flow deploys a destination token contract {S12}, and Redbelly is not named as a network in the documentation we reviewed {S07,S12}.
- Connecting Redbelly to Fusion Rollup. Redbelly is not among Fusion's connected networks, and no self-serve route is documented {S11}.
- Sending a Redbelly transaction from an unverified address by any route, Overledger included {S29,S36}.
:::

::: unknown
**Unknown:**

- How Quant would classify Redbelly: self-serve or managed engagement {S07}.
- Whether Overledger's EVM Connector works with Redbelly without changes.
- Whether any whitelisted node provider serves Redbelly.
- Whether Quant-held signing keys could be Redbelly-verified, and under whose identity {S09,S29}.
- Whether TCH's On-Chain Money network will connect to any public chain {S01}.
- The cost, timeline and commercial terms of any engagement.
- Whether Receptor verification can run on other chains.
- Redbelly's official position on bridging, which has not been published {S38}.
- Whether Redbelly appears in Overledger's live `GET /networks` list. Checking needs an Overledger account {S07}.
:::

## What would change the answer {#signals}

::: analysis
These public signals would move items from "unknown" to "confirmed". They are things to watch, not predictions:

- Redbelly appearing in Overledger's documentation or in the `GET /networks` list {S07}.
- A published test of an Overledger Connector against Redbelly Testnet, chain ID 153 {S22}.
- Redbelly publishing an official position on bridging {S38}.
- TCH publishing which ledgers the On-Chain Money network will use {S01}.
- Receptor documentation describing verification on chains other than Redbelly {S16,S18}.
:::

## Method and limits {#method}

- **Sources.** Quant's Overledger documentation and API reference, the TCH and Quant announcements, Redbelly's technical documentation and Vine developer portal, Tokeniser's website, Celer's and LayerZero's documentation, Redbelly's announcement of Wrapped RBNT, and three DAO community repositories, which were read in full. Every source is listed in the [source list](#sources) with what it supports.
- **Checking.** Each claim was checked against the source text available on 23 October 2026. The phrases each source supports are stored in `research/ledger.json`, and the audit (`npm run audit -- --online`) re-fetches every page and confirms that each phrase is still there. For Quant's pages it also confirms that Redbelly is still not named.
- **What we did not do.** We did not open an Overledger account, call Overledger's API or register a node. Every statement about how Overledger would behave with Redbelly is therefore analysis, not a test result.
- **Vendor material.** Product descriptions from Quant, Redbelly and Tokeniser are their own descriptions. We report what they say, and we label anything beyond that as analysis.
- **Neutrality.** This report takes no view on whether a connection should happen. It contains no price discussion and no investment advice.

## Glossary {#glossary}

| Term | Meaning |
|---|---|
| Overledger | Quant's platform for applications that span several blockchains {S05} |
| Gateway | Overledger's front door: authentication, routing, rate limits, workflows {S06} |
| Connector | Overledger's adapter for one family of blockchains {S07} |
| Fusion Rollup | Quant's rollup that anchors to several base chains at once {S11} |
| EVM | Ethereum Virtual Machine, the smart contract environment Redbelly supports {S24} |
| RPC endpoint | The address software calls to read from or send to a blockchain node |
| Receptor | Redbelly's identity and verifiable credential protocol {S16} |
| Verifiable credential | A signed digital statement about a person or company, held by them {S16} |
| Accredited issuer | An issuer that Redbelly allows to grant network access {S17} |
| Zero-knowledge proof | A way to prove a fact (for example, eligibility) without revealing the data behind it {S18} |
| Lock-and-mint | A bridge pattern that locks an asset on one chain and creates a copy on another {S35} |
| Tokenised deposit | A bank deposit represented on a ledger, the subject of TCH's initiative {S01} |
| KMS or HSM | Key management services and hardware security modules that protect signing keys {S09} |
