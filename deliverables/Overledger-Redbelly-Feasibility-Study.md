# Could Redbelly plug into Quant's Overledger?

Feasibility research for the Redbelly DAO Community Task Board (TASK-29). Research cut-off: 23 October 2026.

This is the Markdown copy of the report. The designed PDF and Word versions are in the same folder, and the full source list is in `Source-List.md`.

## Read this first

This is feasibility research. It asks three things: whether Redbelly Network could connect to Quant's Overledger, what that would take, and what it could offer institutions that use Redbelly.

> **Read before sharing**
>
> **No partnership, talks or plans.** Redbelly and Quant have no announced partnership or talks, and nothing in this report suggests otherwise [S38](https://taskboard.redbellydao.network/tasks/TASK-29). Redbelly has not published an official position on bridging [S38](https://taskboard.redbellydao.network/tasks/TASK-29), so anything that is not in a public source is treated here as unknown.


Every finding in this report sits in one of three labelled panels:

- **Confirmed.** Stated in a public source. The source is linked right next to the claim.
- **Analysis.** Our reasoning, built only on confirmed facts. It is not a statement by Redbelly, Quant or anyone else.
- **Unknown.** Not answered by any public source we could find. We name these gaps so that nobody fills them with guesses.

Research cut-off: 23 October 2026. Overledger's documentation says its list of supported networks can change and that the live list comes from its API [S07](https://docs.overledger.dev/docs/connectors), so parts of this picture can change quickly. The section [What would change the answer](#signals) lists what to watch.

## The short answer

> **Confirmed**
>
> - Overledger reaches blockchains through Connectors. Public, permissionless networks in six families, including EVM, can be added self-serve; permissioned and consortium networks need a managed engagement with Quant's team [S07](https://docs.overledger.dev/docs/connectors).
> - Redbelly runs EVM smart contracts written in Solidity [S24](https://vine.redbelly.network/sc-smart-contracts) and its mainnet is chain ID 151 [S22](https://vine.redbelly.network/environments/).
> - On Redbelly, an account can only write to the network after it claims an access credential from an accredited issuer [S29](https://redbelly.network/blog/devnet) [S17](https://docs.redbelly.network/pages/modules/issuer/) [S28](https://access.redbelly.network/).
> - Redbelly is not named in any of the Overledger documentation pages listed in this report [S05](https://docs.overledger.dev/docs/start-here) [S06](https://docs.overledger.dev/docs/overview) [S07](https://docs.overledger.dev/docs/connectors) [S10](https://docs.overledger.dev/docs/overledger-firewall) [S11](https://docs.overledger.dev/docs/fusion-rollup), and it is not one of the networks Fusion Rollup connected at testnet launch [S11](https://docs.overledger.dev/docs/fusion-rollup).


> **Analysis**
>
> **Redbelly is not connected to Overledger today.** A thin link, where an Overledger account registers its own Redbelly node and passes signed transactions through, looks possible on paper because Redbelly is EVM-compatible and Overledger lets accounts add new EVM networks. It is untested, and it depends on Quant accepting an identity-gated chain on a route meant for permissionless networks. Anything deeper (a public listing, Quant-held signing, bridges, or a Fusion Rollup connection) is not possible yet unless Quant chooses to support Redbelly. Redbelly's compliance controls would not follow assets across chains by default; a connection would have to be designed to carry them.


### Scorecard

We split "connect" into three depths, because each one needs different work:

- **Reach:** Overledger can read Redbelly and pass on transactions that someone else has signed.
- **Orchestrate:** Overledger tools (workflows, signing, webhooks) act on Redbelly directly.
- **Move:** assets or messages travel between Redbelly and other chains through Overledger.

| Capability | Depth | Status on 23 October 2026 | What it depends on |
|---|---|---|---|
| Read Redbelly data through Overledger | Reach | **Possible on paper, untested** | An account registering a Redbelly node through self-serve, and Quant accepting it [S07](https://docs.overledger.dev/docs/connectors) |
| Pass signed Redbelly transactions through Overledger | Reach | **Possible on paper, untested** | The same, plus every sending address holding Redbelly write access [S29](https://redbelly.network/blog/devnet) [S36](https://github.com/tycayomide/redbelly-testnet-bridge/blob/main/ARTICLE.md) |
| Redbelly listed for all Overledger users | Reach | **Not available today** | A public node from a whitelisted provider, or a Quant engagement [S07](https://docs.overledger.dev/docs/connectors) |
| Quant-held keys signing on Redbelly | Orchestrate | **Unknown** | Quant support, and whose identity the signing address would be verified under [S09](https://docs.overledger.dev/docs/signing) [S29](https://redbelly.network/blog/devnet) |
| Bridge flow in Quant Connect to Redbelly | Move | **Not available today** | Quant supporting Redbelly as a destination for the bridge flow [S12](https://docs.overledger.dev/docs/set-a-unilateral-bridge) |
| Redbelly as a Fusion Rollup base chain | Move | **Not possible yet** | A Quant project; no self-serve route is documented [S11](https://docs.overledger.dev/docs/fusion-rollup) |
| Reaching TCH's On-Chain Money network | Move | **Unknown** | TCH and its banks; the network's ledgers are not public [S01](https://www.theclearinghouse.org/payment-systems/Articles/2026/09/The-Clearing-House-Partners-with-Quant-to-Advance-the--On-Chain-Money-Initiative) |
| Redbelly compliance carried to other chains | Move | **Not by default** | How a connection is designed (see [Credentials and assets across chains](#compliance)) |

## Why the question is being asked now

> **Confirmed**
>
> On 24 September 2026, The Clearing House (TCH) announced that it had selected Quant to power its On-Chain Money Initiative, a network for clearing and settling tokenised deposits between financial institutions [S01](https://www.theclearinghouse.org/payment-systems/Articles/2026/09/The-Clearing-House-Partners-with-Quant-to-Advance-the--On-Chain-Money-Initiative). Quant says its technology will provide the network's interoperability, orchestration and transaction-management layer, with connections to existing fiat payment systems such as RTP and CHIPS [S01](https://www.theclearinghouse.org/payment-systems/Articles/2026/09/The-Clearing-House-Partners-with-Quant-to-Advance-the--On-Chain-Money-Initiative) [S02](https://quant.network/press-releases/the-clearing-house-partners-with-quant-to-advance-the-on-chain-money-initiative/) [S03](https://quant.network/news/quant-powers-the-clearing-houses-on-chain-money-initiative-in-the-us/). TCH expects the network to be available to participating institutions in the first half of 2027 [S01](https://www.theclearinghouse.org/payment-systems/Articles/2026/09/The-Clearing-House-Partners-with-Quant-to-Advance-the--On-Chain-Money-Initiative).
>
> The initiative was first unveiled in June 2026 as a bank-led effort that TCH operates [S04](https://www.theclearinghouse.org/payment-systems/Articles/2026/06/Major-Financial-Institutions-Unveil-Bank-Led-On-Chain-Money-Initiative). Quant also says it will offer a shared Tokenised Deposits-as-a-Service platform to US institutions that process through TCH but do not yet have tokenised deposit capability [S02](https://quant.network/press-releases/the-clearing-house-partners-with-quant-to-advance-the-on-chain-money-initiative/).


> **Analysis**
>
> For Redbelly, the announcement matters indirectly. It shows a major US bank network choosing Quant's software as its connective layer. If Overledger becomes common plumbing for banks, the chains that Overledger can reach may become easier for those banks to reach. That is why the community is asking. It does not mean that TCH's network will connect to Redbelly, or to any public chain.


> **Unknown**
>
> The announcements we reviewed do not say which blockchains the On-Chain Money network will run on, or whether it will connect to public chains at all [S01](https://www.theclearinghouse.org/payment-systems/Articles/2026/09/The-Clearing-House-Partners-with-Quant-to-Advance-the--On-Chain-Money-Initiative) [S02](https://quant.network/press-releases/the-clearing-house-partners-with-quant-to-advance-the-on-chain-money-initiative/) [S03](https://quant.network/news/quant-powers-the-clearing-houses-on-chain-money-initiative-in-the-us/). Whether banks on that network could ever reach assets on Redbelly is therefore unknown.


## Overledger in plain words

> **Confirmed**
>
> Overledger is Quant's platform for building applications that span more than one blockchain. It gives developers one set of credentials and one API across networks [S05](https://docs.overledger.dev/docs/start-here). Its documentation describes these building blocks:
>
> - **Gateway.** The front door. It checks who is calling, routes each request to a Connector or to the Fusion Rollup, applies rate limits and runs multi-step workflows called Flow Applications [S06](https://docs.overledger.dev/docs/overview).
> - **Connectors.** Adapters that speak each blockchain's own language. To a developer they look like one multi-DLT RPC endpoint. Behind it, each family of blockchains has its own pool of nodes, made up of nodes Quant runs and nodes that customers register [S07](https://docs.overledger.dev/docs/connectors).
> - **Overledger Firewall.** Access control in two layers: an off-chain check of whether a user may reach a network, and an on-chain Fusion Firewall that allowlists addresses for contract calls, cross-chain messages and token bridging [S10](https://docs.overledger.dev/docs/overledger-firewall).
> - **Fusion Rollup.** A rollup built as a fork of the OP Stack that anchors to several base chains at once, giving one EVM-compatible environment across them [S11](https://docs.overledger.dev/docs/fusion-rollup).
> - **Signer.** Signing runs through a Signer Flow App. Either the customer holds the keys and signs, or Quant holds them (a testnet hot wallet, or a contracted mainnet KMS or HSM). The Gateway never sees private keys [S09](https://docs.overledger.dev/docs/signing).
> - **Quant Connect.** The portal users sign in to. Signing in gives the token used to create API keys [S08](https://docs.overledger.dev/docs/authentication), and Quant Connect hosts the bridge flow, which deploys a destination token contract and returns a Bridge ID [S12](https://docs.overledger.dev/docs/set-a-unilateral-bridge).
>
> Overledger also documents webhooks for smart contract events [S14](https://docs.overledger.dev/docs/manage-webhooks-for-smart-contract-events-1) and publishes a full API reference [S13](https://docs.overledger.dev/reference).


*Diagram: How Overledger is put together. See the PDF or the web page.*

### How a chain gets connected today

> **Confirmed**
>
> Overledger's documentation describes two routes onto its Connectors [S07](https://docs.overledger.dev/docs/connectors):
>
> 1. **Self-serve.** For public, permissionless networks in six families: EVM, Solana, Cosmos, SUI, Hedera and Aptos. An account can add its own node to a network Overledger already lists, or add a network Overledger does not list yet, as long as the network belongs to a self-serve family. The first `POST /nodes` call registers both the new network and the node, and the network then becomes available to Overledger users. Each node is either public, which is only allowed from whitelisted providers, or private, which can come from any domain [S07](https://docs.overledger.dev/docs/connectors).
> 2. **Managed engagement.** For permissioned and consortium networks, and for new blockchain families, worked through with Quant's team. Named examples include Hyperledger Fabric, R3 Corda, Canton Network, permissioned Hyperledger Besu and Quorum. The documentation says that a network exposing RPC over HTTPS with bearer or API-key authentication can normally be onboarded [S07](https://docs.overledger.dev/docs/connectors).
>
> The Gateway blocks administrative RPC methods; for EVM networks the examples are `personal_*`, `admin_*` and `txpool_*` [S07](https://docs.overledger.dev/docs/connectors). Each network has a visibility of public, permissioned or private, and the live list of networks comes from the API (`GET /networks`), not from a fixed page [S07](https://docs.overledger.dev/docs/connectors). For permissioned networks, the Firewall only lets through users who are on that network's allowlist [S10](https://docs.overledger.dev/docs/overledger-firewall).
>
> Fusion Rollup has its own set of connected base chains. At testnet launch they were Ethereum Sepolia, Polygon Amoy and a Quant-run permissioned Besu testnet [S11](https://docs.overledger.dev/docs/fusion-rollup). Fusion's building blocks are deposit, unify, trigger and withdraw or mint, which cover moving value and calling contracts across chains [S11](https://docs.overledger.dev/docs/fusion-rollup). To send a cross-chain message, a sender on a connected chain must be allowlisted for the specific rollup contract it wants to reach, and the firewall is locked down on mainnet while being more permissive on testnet [S11](https://docs.overledger.dev/docs/fusion-rollup). Quant's own documentation lists the known risks of bridges built as separate contracts: lock-and-mint mismatches, custodian compromise and oracle failure [S11](https://docs.overledger.dev/docs/fusion-rollup).


*Diagram: Redbelly against each Overledger route. See the PDF or the web page.*

> **Unknown**
>
> We did not find a documented self-serve way to add a new base chain to Fusion Rollup. The pages we reviewed describe which chains Fusion connected, not how a chain is added [S11](https://docs.overledger.dev/docs/fusion-rollup).


## Redbelly, in the terms that matter here

> **Confirmed**
>
> - **Purpose.** Redbelly describes itself as a layer 1 blockchain built for real world asset tokenisation [S15](https://docs.redbelly.network/).
> - **EVM base.** Redbelly executes smart contracts written for the EVM in Solidity [S24](https://vine.redbelly.network/sc-smart-contracts). Mainnet is chain ID 151 and Testnet is chain ID 153, and Redbelly publishes a public RPC address for each [S22](https://vine.redbelly.network/environments/).
> - **Consensus.** Redbelly uses DBFT, a leaderless Byzantine fault tolerant consensus algorithm, together with a "super block" optimisation of the EVM. Its developer portal credits these two for the network's security, finality and scalability [S23](https://vine.redbelly.network/consensus/).
> - **Fees.** The unit price of gas is fixed in US dollar terms and converted to RBNT at execution through an on-chain price oracle [S25](https://vine.redbelly.network/network-fees/).
> - **Identity before writing.** Receptor is Redbelly's identity and verifiable credential protocol, built on the W3C verifiable credential data model [S16](https://docs.redbelly.network/pages/receptor/). Only accredited issuers can issue the credentials that give network access [S16](https://docs.redbelly.network/pages/receptor/) [S17](https://docs.redbelly.network/pages/modules/issuer/). Users must claim an access credential from an accredited issuer before they can enable their accounts with write access [S29](https://redbelly.network/blog/devnet). The accredited issuer named in the Redbelly access app is Averer, which verifies identity before issuing the Redbelly Network Access Credential [S28](https://access.redbelly.network/). Users prove a photo identity document through biometric checks [S27](https://vine.redbelly.network/id-accessing-the-network) [S36](https://github.com/tycayomide/redbelly-testnet-bridge/blob/main/ARTICLE.md). Community builders report that unverified wallets cannot send any transaction ("Sender not authorised to write transactions") and that Mainnet and Testnet approvals are separate [S36](https://github.com/tycayomide/redbelly-testnet-bridge/blob/main/ARTICLE.md).
> - **Institutions.** Companies and trusts can register through Redbelly's Business verification process [S30](https://vine.redbelly.network/nodes/operator-guide/).
> - **Existing cross-chain routes.** Redbelly's developer portal lists routes for RBNT to Base via LayerZero and to Ethereum mainnet via Polymer, and points to Lucid Labs Bridge for moving RBNT back to Redbelly [S26](https://vine.redbelly.network/native-currency/). Celer's cBridge connects Redbelly with Ethereum and BNB Chain using a pegged bridge model [S32](https://blog.celer.network/2025/08/01/celer-announces-cbridge-support-for-redbelly/). Redbelly announced Wrapped RBNT on Ethereum at contract `0xb45ffb51984d626ee758b336c61cf20990c6bf13` [S33](https://x.com/RedbellyNetwork/status/1890340030197166112). LayerZero lists Redbelly Mainnet among its V2 deployments [S34](https://docs.layerzero.network/v2/deployments/deployed-contracts).
> - **Community bridges.** A winning DAO Task Board entry is a reference bridge that moves ETH from Ethereum Sepolia to Redbelly Testnet using lock-and-mint with a 2-of-3 relayer set [S35](https://github.com/Redbelly-DAO-Community-Taskboard/TASK-08-bridge-integration-guide). A DAO recovery playbook documents how bridged RBNT can get stuck, for example Polymer transfers to Ethereum that need to be relayed by hand [S37](https://github.com/Redbelly-DAO-Community-Taskboard/TASK-16-cross-chain-recovery-playbook).


> **Analysis**
>
> Two facts carry most of the weight for this question.
>
> First, Redbelly speaks the same EVM language as Overledger's largest self-serve family. Connecting Redbelly to outside systems is also not new: LayerZero, Polymer, Celer and Lucid Labs already do it [S26](https://vine.redbelly.network/native-currency/) [S32](https://blog.celer.network/2025/08/01/celer-announces-cbridge-support-for-redbelly/) [S34](https://docs.layerzero.network/v2/deployments/deployed-contracts). That shows Redbelly's EVM base works with mainstream cross-chain tooling. It says nothing about Overledger specifically.
>
> Second, Redbelly is open to read through its public RPC but gated to write: every sending account must be identity-verified [S22](https://vine.redbelly.network/environments/) [S29](https://redbelly.network/blog/devnet). Overledger sorts networks into public, permissionless ones (self-serve) and permissioned ones (engagement) [S07](https://docs.overledger.dev/docs/connectors). Redbelly does not sit cleanly in either box. How Quant would classify it is the first practical question any connection would face.


## Can Redbelly connect now?

Each Overledger route is tested below against what Redbelly's public documentation says.

### Route 1: self-serve node registration

> **Confirmed**
>
> Self-serve onboarding covers networks that Overledger does not list yet, if their family is supported, and EVM is a supported family [S07](https://docs.overledger.dev/docs/connectors). Redbelly runs EVM contracts [S24](https://vine.redbelly.network/sc-smart-contracts). A private node can be added from any domain; a public node only from a whitelisted provider [S07](https://docs.overledger.dev/docs/connectors).


> **Analysis**
>
> On paper, an Overledger account holder could register a Redbelly RPC endpoint as a private node and reach Redbelly through Overledger's RPC interface. That would be a thin link at the **Reach** depth: the account could read Redbelly data and pass through transactions that a Redbelly-verified account had already signed, using the same credentials it uses for other networks. A listing visible to every Overledger user would also need a public node from a provider Quant has whitelisted. Even a working thin link would not change Redbelly's rule that only verified accounts can write [S29](https://redbelly.network/blog/devnet) [S36](https://github.com/tycayomide/redbelly-testnet-bridge/blob/main/ARTICLE.md). Overledger would only carry the transaction.


> **Unknown**
>
> - Whether Quant would accept an identity-gated chain on the self-serve route at all, since that route is described as being for public, permissionless networks [S07](https://docs.overledger.dev/docs/connectors).
> - Whether Overledger's EVM Connector works with Redbelly unchanged: its node health checks, its handling of Redbelly's dollar-fixed gas [S25](https://vine.redbelly.network/network-fees/), and its handling of Redbelly blocks. No test has been published, and this research did not run one.
> - Which node providers Quant has whitelisted, and whether any of them serves Redbelly.
> - Whether Redbelly already appears in Overledger's live network list. That list is only available through the API with an account [S07](https://docs.overledger.dev/docs/connectors).


### Route 2: managed engagement

> **Confirmed**
>
> Quant's documentation uses managed engagement for permissioned and consortium networks and for new families, and says a network with HTTPS RPC and bearer or API-key authentication can normally be onboarded [S07](https://docs.overledger.dev/docs/connectors).


> **Analysis**
>
> Redbelly's public RPC fits the transport part of that description [S22](https://vine.redbelly.network/environments/). An engagement is the route by which Redbelly could become a fully listed network with Quant-run nodes, firewall settings and Quant support. It needs Quant to choose to do it. Nothing public says that such work exists or is being considered.


### Route 3: Fusion Rollup

> **Confirmed**
>
> Fusion connected Ethereum Sepolia, Polygon Amoy and a Quant-run Besu testnet at launch [S11](https://docs.overledger.dev/docs/fusion-rollup). Fusion Firewall policies are mirrored inside the rollup and on each connected base chain [S06](https://docs.overledger.dev/docs/overview).


> **Analysis**
>
> Joining Fusion would mean deploying Fusion's base-chain contracts on Redbelly and wiring Redbelly into the rollup's deposit and messaging paths. Those contracts, and every address that deposits or withdraws through them, would need Redbelly write access [S29](https://redbelly.network/blog/devnet). This would be a project led by Quant, with parties on Redbelly taking part. It is not something the community can switch on.


> **Unknown**
>
> No public source describes the steps, cost or timeline for adding a base chain to Fusion Rollup.


### Verdict

> **Analysis**
>
> **Not connected today.** A thin **Reach** link through the self-serve route looks possible on paper, but it is untested and depends on how Quant classifies Redbelly. **Orchestrate** and **Move** (Quant-held signing, the bridge flow, Fusion Rollup) are not possible yet unless Quant chooses to support Redbelly.


## What a connection would take

The table lists the work in the order it would happen, in plain words. Who acts is our analysis of the documented roles. It does not describe any actual plan.

| Step | In plain words | Who would have to act | Depends on |
|---|---|---|---|
| 1. Pick the route | Choose between a thin self-serve link, a full listing through an engagement, or Fusion Rollup [S07](https://docs.overledger.dev/docs/connectors) [S11](https://docs.overledger.dev/docs/fusion-rollup) | An Overledger account holder, or Quant | How Quant classifies an identity-gated chain |
| 2. Provide a node | Someone runs or supplies a Redbelly RPC endpoint that Overledger calls. A public listing needs a whitelisted provider [S07](https://docs.overledger.dev/docs/connectors) | A node operator or provider, and Quant | Quant's provider whitelist |
| 3. Verify every sender | Every address that signs Redbelly transactions needs a Redbelly access credential [S29](https://redbelly.network/blog/devnet); companies can use Business verification [S30](https://vine.redbelly.network/nodes/operator-guide/) | The institution, an accredited issuer, and Quant if Quant holds keys [S09](https://docs.overledger.dev/docs/signing) | Redbelly's access process |
| 4. Test the fit | Run the Connector against Redbelly Testnet (chain ID 153) [S22](https://vine.redbelly.network/environments/): reads, signed writes, rejections for unverified senders, fees, contract event webhooks [S14](https://docs.overledger.dev/docs/manage-webhooks-for-smart-contract-events-1) | Quant engineers, with Redbelly developers | An Overledger account and verified test accounts |
| 5. Decide how assets move | Keep assets on Redbelly and move instructions, or represent them on other chains through a bridge or Fusion [S11](https://docs.overledger.dev/docs/fusion-rollup) [S12](https://docs.overledger.dev/docs/set-a-unilateral-bridge) | Asset issuers and Quant | The compliance design in the next section |
| 6. Map compliance | Line up Overledger's allowlists [S10](https://docs.overledger.dev/docs/overledger-firewall) with Redbelly eligibility [S16](https://docs.redbelly.network/pages/receptor/) [S21](https://docs.redbelly.network/pages/eligibility-sdk/configure-eligibility-criteria/), including what happens when someone stops being eligible | Issuers, Quant and Redbelly | Legal and product decisions |
| 7. Agree terms | Commercial, legal and support arrangements between whoever would run it | The parties involved | Not public |

*Diagram: Three depths of connection. See the PDF or the web page.*

> **Analysis**
>
> Steps 1 to 4 are enough for a **Reach** link. Steps 5 and 6 are where most of the real effort would go, because they decide whether a Redbelly asset keeps its protections once it touches another chain. Step 3 is specific to Redbelly: on most EVM chains any funded address can send transactions, but on Redbelly every signing address is an identity decision as well as a technical one [S29](https://redbelly.network/blog/devnet) [S36](https://github.com/tycayomide/redbelly-testnet-bridge/blob/main/ARTICLE.md).


## What it could offer institutions

> **Analysis**
>
> **For institutions that already use Overledger:**
>
> - **One integration.** Redbelly would sit behind the same credentials and API as their other networks [S05](https://docs.overledger.dev/docs/start-here) [S07](https://docs.overledger.dev/docs/connectors), instead of needing its own integration.
> - **Workflows across chains.** Overledger's Flow Applications and smart contract webhooks [S06](https://docs.overledger.dev/docs/overview) [S14](https://docs.overledger.dev/docs/manage-webhooks-for-smart-contract-events-1) could tie a step on Redbelly to steps elsewhere, for example releasing a payment on one network when a Tokeniser asset changes hands on Redbelly. This needs Quant to support Redbelly in those tools.
> - **Custody choices.** The Signer supports self-custody or Quant-held keys in a KMS or HSM [S09](https://docs.overledger.dev/docs/signing), which suits institutions with different custody policies, as long as every signing address is Redbelly-verified [S29](https://redbelly.network/blog/devnet).
>
> **For institutions using Redbelly:**
>
> - **A possible route toward bank networks that standardise on Quant**, if those networks ever connect to public chains. Today that condition is unknown [S01](https://www.theclearinghouse.org/payment-systems/Articles/2026/09/The-Clearing-House-Partners-with-Quant-to-Advance-the--On-Chain-Money-Initiative).
> - **Redbelly's own features would come along**: identity-verified counterparties [S16](https://docs.redbelly.network/pages/receptor/) [S29](https://redbelly.network/blog/devnet), fees fixed in dollar terms that make costs predictable [S25](https://vine.redbelly.network/network-fees/), and leaderless BFT consensus [S23](https://vine.redbelly.network/consensus/). These are the qualities institutions would be weighing when they choose where to issue.
>
> **What it would not offer:**
>
> - **Compliance does not travel automatically.** Overledger's Firewall controls which users and addresses may act [S10](https://docs.overledger.dev/docs/overledger-firewall). Redbelly's controls decide who may hold and move assets on Redbelly [S29](https://redbelly.network/blog/devnet) [S31](https://tokeniser.com/). They are separate systems, and nothing links them today.
> - **No access to TCH's network follows from it.** That network's participants and ledgers are TCH's decision [S01](https://www.theclearinghouse.org/payment-systems/Articles/2026/09/The-Clearing-House-Partners-with-Quant-to-Advance-the--On-Chain-Money-Initiative) [S04](https://www.theclearinghouse.org/payment-systems/Articles/2026/06/Major-Financial-Institutions-Unveil-Bank-Led-On-Chain-Money-Initiative).
> - **A new dependency.** Institutions would rely on a third-party platform whose terms for such a connection are not public.


## Credentials and assets across chains

This section explains how Redbelly's compliance tools work today, and where they could stop working once an asset or a claim on it leaves Redbelly.

> **Confirmed**
>
> - **Receptor credentials** are W3C verifiable credentials. An issuer issues them, the user (the holder) keeps them, and a verifier checks them [S16](https://docs.redbelly.network/pages/receptor/).
> - **Proof by Query** checks a zero-knowledge proof in a verifier smart contract that the verifier deploys on Redbelly Network. The user submits the proof to that contract, and the verifier never sees or stores the personal data [S18](https://docs.redbelly.network/pages/methods/proof-by-query/). **Selective Disclosure** reveals chosen facts off-chain instead [S19](https://docs.redbelly.network/pages/methods/selective-disclosure/).
> - **Eligibility rules** are queries over credential types such as passport, proof of address and AML/CTF credentials. On-chain checks currently support single queries, with multi-query planned [S21](https://docs.redbelly.network/pages/eligibility-sdk/configure-eligibility-criteria/). Developers build them with the Eligibility SDK [S20](https://docs.redbelly.network/pages/eligibility-sdk/getting-started/).
> - **Tokeniser**, which runs on Redbelly, programs eligibility into every asset: identity, KYC, AML, CTF, wholesale and sophisticated investor tests, and target market determination (TMD). Every holder is verified and every transfer is checked against the asset's rules [S31](https://tokeniser.com/).
> - **Overledger's Fusion Firewall** allowlists on-chain addresses; Overledger maps users to their authorised addresses off-chain [S10](https://docs.overledger.dev/docs/overledger-firewall), and policies are mirrored on each connected base chain [S06](https://docs.overledger.dev/docs/overview).


*Diagram: What happens to a Tokeniser asset's checks when it leaves Redbelly. See the PDF or the web page.*

> **Analysis**
>
> The checks above all run **on Redbelly**. A Receptor proof is checked by a contract on Redbelly [S18](https://docs.redbelly.network/pages/methods/proof-by-query/), and a Tokeniser transfer is checked by the asset's rules on Redbelly [S31](https://tokeniser.com/). Another chain, or a rollup, does not see those checks. It applies its own rules. So a connection either has to bring equivalent checks to the other side, or keep the asset where the checks are.
>
> | Moment | On Redbelly today | Once it touches another chain | Where it could break |
> |---|---|---|---|
> | Holding | Every holder is verified against the asset's rules [S31](https://tokeniser.com/) | The other chain applies its own rules | A wrapped token contract without the same checks lets anyone hold it |
> | Transferring | Every transfer is checked [S31](https://tokeniser.com/) | Transfers of a wrapped token happen out of Redbelly's sight | Secondary transfers skip eligibility entirely |
> | Proving identity | A zero-knowledge proof is checked by a contract on Redbelly [S18](https://docs.redbelly.network/pages/methods/proof-by-query/) | A contract elsewhere cannot read that result unless it is relayed | Eligibility status goes stale, or is relayed wrongly |
> | Losing eligibility | Redbelly's own records reflect the change | Any copy of the status held elsewhere must be updated as well | A holder who is no longer eligible stays allowlisted elsewhere |
> | Who holds the key | One verified account per holder [S29](https://redbelly.network/blog/devnet) | The same asset may sit with a custodian, or behind a Quant-held key [S09](https://docs.overledger.dev/docs/signing) | It is unclear whose identity stands behind the address |
> | Bridge mechanics | Not applicable | Lock-and-mint, custody and oracles come into play | Lock-and-mint mismatch, custodian compromise, oracle failure [S11](https://docs.overledger.dev/docs/fusion-rollup) |
> | Coming back | Only an eligible address can receive | Redeeming to Redbelly needs an eligible recipient | Funds get stuck when the recipient is not verified, a failure the DAO playbook already covers for RBNT [S37](https://github.com/Redbelly-DAO-Community-Taskboard/TASK-16-cross-chain-recovery-playbook) |


### Designs that would keep compliance intact

> **Analysis**
>
> Three designs follow from the facts above. They are options for discussion, not recommendations to any party.
>
> 1. **Keep the asset on Redbelly and move instructions.** Overledger coordinates the workflow, but the asset never leaves Redbelly, so every transfer still passes Tokeniser's and Receptor's checks [S31](https://tokeniser.com/) [S18](https://docs.redbelly.network/pages/methods/proof-by-query/). A payment leg could settle elsewhere. This carries the least compliance risk. It needs careful design so that both legs complete or neither does.
> 2. **Represent the asset elsewhere, with eligibility mirrored.** The destination contract only allows transfers between addresses on an allowlist that mirrors Redbelly eligibility. Overledger's address allowlists [S10](https://docs.overledger.dev/docs/overledger-firewall) are one place such a mirror could live. It needs a trusted way to keep the mirror up to date when people stop being eligible.
> 3. **Re-prove eligibility on the destination.** The holder proves eligibility again on the other chain, using the same credential. Today Receptor's on-chain verification is documented on Redbelly [S18](https://docs.redbelly.network/pages/methods/proof-by-query/); whether verifier contracts and accredited-issuer trust could run on another chain is unknown.


> **Unknown**
>
> - Whether Receptor verifier contracts, or the trust in accredited issuers, can be deployed on chains other than Redbelly.
> - How Tokeniser would treat a representation of one of its assets on another chain. Tokeniser's public material describes checks on Redbelly only [S31](https://tokeniser.com/).
> - Whether Overledger's allowlists could be fed by Redbelly eligibility automatically. The documentation describes allowlists managed by Overledger and by contract deployers [S10](https://docs.overledger.dev/docs/overledger-firewall) [S11](https://docs.overledger.dev/docs/fusion-rollup), not by external credential systems.


## Not possible yet, and unknown

> **Confirmed**
>
> **Not possible yet, based on public sources at the cut-off:**
>
> - Using Redbelly as a listed Overledger network. Redbelly is not named in Overledger's documentation [S05](https://docs.overledger.dev/docs/start-here) [S06](https://docs.overledger.dev/docs/overview) [S07](https://docs.overledger.dev/docs/connectors).
> - Creating a Quant Connect bridge to Redbelly. The bridge flow deploys a destination token contract [S12](https://docs.overledger.dev/docs/set-a-unilateral-bridge), and Redbelly is not named as a network in the documentation we reviewed [S07](https://docs.overledger.dev/docs/connectors) [S12](https://docs.overledger.dev/docs/set-a-unilateral-bridge).
> - Connecting Redbelly to Fusion Rollup. Redbelly is not among Fusion's connected networks, and no self-serve route is documented [S11](https://docs.overledger.dev/docs/fusion-rollup).
> - Sending a Redbelly transaction from an unverified address by any route, Overledger included [S29](https://redbelly.network/blog/devnet) [S36](https://github.com/tycayomide/redbelly-testnet-bridge/blob/main/ARTICLE.md).


> **Unknown**
>
> **Unknown:**
>
> - How Quant would classify Redbelly: self-serve or managed engagement [S07](https://docs.overledger.dev/docs/connectors).
> - Whether Overledger's EVM Connector works with Redbelly without changes.
> - Whether any whitelisted node provider serves Redbelly.
> - Whether Quant-held signing keys could be Redbelly-verified, and under whose identity [S09](https://docs.overledger.dev/docs/signing) [S29](https://redbelly.network/blog/devnet).
> - Whether TCH's On-Chain Money network will connect to any public chain [S01](https://www.theclearinghouse.org/payment-systems/Articles/2026/09/The-Clearing-House-Partners-with-Quant-to-Advance-the--On-Chain-Money-Initiative).
> - The cost, timeline and commercial terms of any engagement.
> - Whether Receptor verification can run on other chains.
> - Redbelly's official position on bridging, which has not been published [S38](https://taskboard.redbellydao.network/tasks/TASK-29).
> - Whether Redbelly appears in Overledger's live `GET /networks` list. Checking needs an Overledger account [S07](https://docs.overledger.dev/docs/connectors).


## What would change the answer

> **Analysis**
>
> These public signals would move items from "unknown" to "confirmed". They are things to watch, not predictions:
>
> - Redbelly appearing in Overledger's documentation or in the `GET /networks` list [S07](https://docs.overledger.dev/docs/connectors).
> - A published test of an Overledger Connector against Redbelly Testnet, chain ID 153 [S22](https://vine.redbelly.network/environments/).
> - Redbelly publishing an official position on bridging [S38](https://taskboard.redbellydao.network/tasks/TASK-29).
> - TCH publishing which ledgers the On-Chain Money network will use [S01](https://www.theclearinghouse.org/payment-systems/Articles/2026/09/The-Clearing-House-Partners-with-Quant-to-Advance-the--On-Chain-Money-Initiative).
> - Receptor documentation describing verification on chains other than Redbelly [S16](https://docs.redbelly.network/pages/receptor/) [S18](https://docs.redbelly.network/pages/methods/proof-by-query/).


## Method and limits

- **Sources.** Quant's Overledger documentation and API reference, the TCH and Quant announcements, Redbelly's technical documentation and Vine developer portal, Tokeniser's website, Celer's and LayerZero's documentation, Redbelly's announcement of Wrapped RBNT, and three DAO community repositories, which were read in full. Every source is listed in the [source list](#sources) with what it supports.
- **Checking.** Each claim was checked against the source text available on 23 October 2026. The phrases each source supports are stored in `research/ledger.json`, and the audit (`npm run audit -- --online`) re-fetches every page and confirms that each phrase is still there. For Quant's pages it also confirms that Redbelly is still not named.
- **What we did not do.** We did not open an Overledger account, call Overledger's API or register a node. Every statement about how Overledger would behave with Redbelly is therefore analysis, not a test result.
- **Vendor material.** Product descriptions from Quant, Redbelly and Tokeniser are their own descriptions. We report what they say, and we label anything beyond that as analysis.
- **Neutrality.** This report takes no view on whether a connection should happen. It contains no price discussion and no investment advice.

## Glossary

| Term | Meaning |
|---|---|
| Overledger | Quant's platform for applications that span several blockchains [S05](https://docs.overledger.dev/docs/start-here) |
| Gateway | Overledger's front door: authentication, routing, rate limits, workflows [S06](https://docs.overledger.dev/docs/overview) |
| Connector | Overledger's adapter for one family of blockchains [S07](https://docs.overledger.dev/docs/connectors) |
| Fusion Rollup | Quant's rollup that anchors to several base chains at once [S11](https://docs.overledger.dev/docs/fusion-rollup) |
| EVM | Ethereum Virtual Machine, the smart contract environment Redbelly supports [S24](https://vine.redbelly.network/sc-smart-contracts) |
| RPC endpoint | The address software calls to read from or send to a blockchain node |
| Receptor | Redbelly's identity and verifiable credential protocol [S16](https://docs.redbelly.network/pages/receptor/) |
| Verifiable credential | A signed digital statement about a person or company, held by them [S16](https://docs.redbelly.network/pages/receptor/) |
| Accredited issuer | An issuer that Redbelly allows to grant network access [S17](https://docs.redbelly.network/pages/modules/issuer/) |
| Zero-knowledge proof | A way to prove a fact (for example, eligibility) without revealing the data behind it [S18](https://docs.redbelly.network/pages/methods/proof-by-query/) |
| Lock-and-mint | A bridge pattern that locks an asset on one chain and creates a copy on another [S35](https://github.com/Redbelly-DAO-Community-Taskboard/TASK-08-bridge-integration-guide) |
| Tokenised deposit | A bank deposit represented on a ledger, the subject of TCH's initiative [S01](https://www.theclearinghouse.org/payment-systems/Articles/2026/09/The-Clearing-House-Partners-with-Quant-to-Advance-the--On-Chain-Money-Initiative) |
| KMS or HSM | Key management services and hardware security modules that protect signing keys [S09](https://docs.overledger.dev/docs/signing) |
